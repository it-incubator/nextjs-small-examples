import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { refreshTokens } from '../data'

const REFRESH_TOKEN_SECRET = 'refresh-secret-key-for-learning'

// --- POST /logout ---
// C4 diagram: c4-level4-logout.puml
export async function logoutHandler(req: Request, res: Response) {
  // 1. Read refresh token from cookie
  const refreshToken = req.cookies?.refreshToken
  if (!refreshToken) {
    res.status(200).json({ message: 'Already logged out' })
    return
  }

  // 2. Try to verify the token (ignore expiration — we want to clean up even if expired)
  try {
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, {
      ignoreExpiration: true,
    }) as { email: string }

    // 3. Delete refresh token from store
    if (decoded.email) {
      delete refreshTokens[decoded.email]
    }
  } catch {
    // Token is completely invalid — that's fine, we still clear the cookie
  }

  // 4. Clear the cookie
  res.clearCookie('refreshToken')

  // 5. Return success
  res.status(200).json({ message: 'Logged out' })
}
