// --- In-memory data store ---
// This is NOT for production — just for learning purposes.
// In a real app, you'd use a database (PostgreSQL, MongoDB, etc.)

export type User = {
  email: string
  passwordHash: string
  isVerified: boolean
}

export type Code = {
  code: string
  expiresAt: number
}

export const users: Record<string, User> = {}
export const codes: Record<string, Code> = {}

// refreshTokens: email -> token string
// When a user logs in, we save their refresh token here.
// On /refresh-tokens, we delete the old one and save a new one (token rotation).
export const refreshTokens: Record<string, string> = {}
