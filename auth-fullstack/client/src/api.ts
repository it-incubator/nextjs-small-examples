import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
})

// --- Module-level token storage ---
// Mutations (login, refresh) update this variable.
// The request interceptor reads it to attach the Authorization header.
let _accessToken: string | null = null

export function setAccessToken(token: string | null) {
  _accessToken = token
}

export function getAccessToken() {
  return _accessToken
}

// --- Request interceptor ---
// Automatically attaches "Authorization: Bearer <token>" to every request.
axiosInstance.interceptors.request.use((config) => {
  if (_accessToken) {
    config.headers.Authorization = `Bearer ${_accessToken}`
  }
  return config
})

// --- Response interceptor ---
// If a request gets 401, try to refresh tokens and retry the original request.
// This handles the case when access token expires mid-session.
// We skip retry for auth endpoints to avoid infinite loops.
let isRefreshing = false
let refreshPromise: Promise<string | null> | null = null

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Don't retry auth endpoints (would cause infinite loop)
    const skipUrls = ['/login', '/refresh-tokens', '/logout', '/me']
    if (skipUrls.some((url) => originalRequest.url?.includes(url))) {
      return Promise.reject(error)
    }

    // Only retry on 401 and only once per request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      // If already refreshing, wait for the ongoing refresh
      if (!isRefreshing) {
        isRefreshing = true
        refreshPromise = refreshTokensSilently()
      }

      const newToken = await refreshPromise
      isRefreshing = false
      refreshPromise = null

      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return axiosInstance(originalRequest)
      }
    }

    return Promise.reject(error)
  },
)

async function refreshTokensSilently(): Promise<string | null> {
  try {
    const response = await axiosInstance.post<{ accessToken: string }>(
      '/refresh-tokens',
      null,
      { withCredentials: true },
    )
    const token = response.data.accessToken
    setAccessToken(token)
    return token
  } catch {
    setAccessToken(null)
    return null
  }
}

export const api = {
  register(email: string, password: string) {
    return axiosInstance.post('/register', { email, password })
  },
  verifyEmail(email: string, code: string) {
    return axiosInstance.post('/verify-email', { email, code })
  },
  resendCode(email: string) {
    return axiosInstance.post('/resend-code', { email })
  },
  login(email: string, password: string) {
    return axiosInstance.post<{ accessToken: string }>('/login', { email, password }, { withCredentials: true })
  },
  refreshTokens() {
    return axiosInstance.post<{ accessToken: string }>('/refresh-tokens', null, { withCredentials: true })
  },
  logout() {
    return axiosInstance.post('/logout', null, { withCredentials: true })
  },
  me() {
    return axiosInstance.get<{ email: string }>('/me')
  },
  getProtected() {
    return axiosInstance.get<{ message: string }>('/protected')
  },
}
