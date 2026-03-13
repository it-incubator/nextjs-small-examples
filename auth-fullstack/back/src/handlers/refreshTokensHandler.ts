import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { refreshTokens } from '../data'

const ACCESS_TOKEN_SECRET = 'access-secret-key-for-learning'
const REFRESH_TOKEN_SECRET = 'refresh-secret-key-for-learning'

// --- POST /refresh-tokens ---
// C4 diagram: c4-level4-refresh-tokens.puml
//
// This endpoint implements TOKEN ROTATION:
// Each time client refreshes, the old refresh token is deleted
// and a brand new pair (access + refresh) is issued.
// This means a stolen refresh token can only be used ONCE.
export async function refreshTokensHandler(req: Request, res: Response) {
  // 1. Read refresh token from cookie
  const refreshToken = req.cookies?.refreshToken
  if (!refreshToken) {
    res.status(401).json({ message: 'No refresh token' })
    return
  }

  // 2. Verify the refresh token JWT
  let decoded: { email: string }
  try {
    decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as { email: string }
  } catch {
    // Token is invalid or expired — clear the cookie
    res.clearCookie('refreshToken')
    res.status(401).json({ message: 'Invalid refresh token' })
    return
  }

  const { email } = decoded

  // 3. Check if this token exists in our store
  //    If someone tries to reuse an old (already rotated) token, we detect it here
  if (refreshTokens[email] !== refreshToken) {
    // Token reuse detected! Someone might have stolen the old token.
    // Delete the token from store to force re-login.
    delete refreshTokens[email]
    res.clearCookie('refreshToken')
    res.status(401).json({ message: 'Token reuse detected' })
    return
  }

  // 4. Delete old refresh token from store
  delete refreshTokens[email]

  // 5. Generate new access token (15 min)
  const newAccessToken = jwt.sign({ email }, ACCESS_TOKEN_SECRET, { expiresIn: '30s' })

  // 6. Generate new refresh token (7 days)
  const newRefreshToken = jwt.sign({ email }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' })

  // 7. Save new refresh token in store
  refreshTokens[email] = newRefreshToken

  // 8. Set new httpOnly cookie
  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })

  // 9. Return new access token
  res.status(200).json({ accessToken: newAccessToken })
}
