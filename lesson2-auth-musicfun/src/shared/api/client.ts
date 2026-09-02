import createClient, { type Middleware } from 'openapi-fetch'

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

async function refreshTokens() {
  const refreshToken = await authStorage.getRefreshToken()
  if (!refreshToken) return

  const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'API-KEY': API_KEY,
    },
    body: JSON.stringify({ refreshToken }),
  })

  const { accessToken, refreshToken: newRefreshToken } = await res.json()
  await authStorage.saveAccessToken(accessToken)
  await authStorage.saveRefreshToken(newRefreshToken)

  return accessToken as string
}

const authMiddleware: Middleware = {
  async onRequest({ request }) {
    const token = await authStorage.getAccessToken()
    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`)
    }
    return request
  },
  async onResponse({ request, response }) {
    if (response.status === 401) {
      const token = await authStorage.getAccessToken();

      if (token) {
        const newToken = await refreshTokens()
        if (newToken) {
          const retryRequest = new Request(request)
          retryRequest.headers.set('Authorization', `Bearer ${newToken}`)
           const newResponse = await fetch(retryRequest)
           return newResponse
        }
      } else {
        // do nothing
      }
    }
    return response
  },
}

apiClient.use(authMiddleware)
