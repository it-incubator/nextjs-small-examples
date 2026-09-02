// Tiny wrapper around localStorage for our two tokens.
// Step later: this is where access/refresh tokens live for the OAuth flow.

const keys = {
  accessToken: 'musicfun-access-token',
  refreshToken: 'musicfun-refresh-token',
} as const

export const authStorage = {
  async getAccessToken(): Promise<string | null> {
    if (typeof window === 'undefined') return null // no localStorage on the server
    return localStorage.getItem(keys.accessToken)
  },
  async saveAccessToken(token: string) {
    localStorage.setItem(keys.accessToken, token)
  },
  async getRefreshToken(): Promise<string | null> {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(keys.refreshToken)
  },
  async saveRefreshToken(token: string) {
    localStorage.setItem(keys.refreshToken, token)
  },
  async clearTokens() {
    localStorage.removeItem(keys.accessToken)
    localStorage.removeItem(keys.refreshToken)
  },
}
