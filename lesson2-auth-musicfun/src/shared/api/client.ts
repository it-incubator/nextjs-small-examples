import createClient, { type Middleware } from 'openapi-fetch'
import { Mutex } from 'async-mutex'

import type { paths } from './schema'
import { authStorage } from './authStorage'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!

export const apiClient = createClient<paths>({
  baseUrl: API_BASE_URL,
  headers: {
    'API-KEY': API_KEY
  },
})

const mutex = new Mutex()

async function refreshTokens() {
  const refreshToken = await authStorage.getRefreshToken()
  if (!refreshToken) return null

  const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'API-KEY': API_KEY,
    },
    body: JSON.stringify({ refreshToken }),
  })
  if (!res.ok) return null

  const { accessToken, refreshToken: newRefreshToken } = await res.json()
  await authStorage.saveAccessToken(accessToken)
  await authStorage.saveRefreshToken(newRefreshToken)
  return accessToken as string
}

async function retryWithToken(request: Request, token: string) {
  const retryRequest = new Request(request)
  retryRequest.headers.set('Authorization', `Bearer ${token}`)
  return fetch(retryRequest)
}

const authMiddleware: Middleware = {
  async onRequest({ request }) {
    // wait until any in-progress refresh finishes (without locking the mutex)
    await mutex.waitForUnlock()

    const token = await authStorage.getAccessToken()
    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`)
    }
    return request
  },
  async onResponse({ request, response }) {
    if (response.status !== 401) return response

    // no refresh in progress → this request owns the refresh
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const newToken = await refreshTokens()
        if (newToken) {
          return await retryWithToken(request, newToken)
        }
        // refresh failed → log out
        await authStorage.clearTokens()
        return response
      } finally {
        release()
      }
    } else {
      // a refresh is already happening → wait for it, then retry with the fresh token
      await mutex.waitForUnlock()
      const newToken = await authStorage.getAccessToken()
      if (newToken) {
        return await retryWithToken(request, newToken)
      }
      return response
    }
  },
}

apiClient.use(authMiddleware)
