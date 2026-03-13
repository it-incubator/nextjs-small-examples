import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { users, refreshTokens } from '../data'

const ACCESS_TOKEN_SECRET = 'access-secret-key-for-learning'
const REFRESH_TOKEN_SECRET = 'refresh-secret-key-for-learning'

// --- POST /login ---
// C4 diagram: c4-level4-login.puml
export async function loginHandler(req: Request, res: Response) {
  const { email, password } = req.body

  // 1. Validate input
  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' })
    return
  }

  // 2. Find user by email
  const user = users[email]
  if (!user) {
    res.status(401).json({ message: 'Invalid email or password' })
    return
  }

  // 3. Check if user is verified
  if (!user.isVerified) {
    res.status(403).json({ message: 'Email not verified' })
    return
  }

  // 4. Compare password with hash
  const passwordMatch = await bcrypt.compare(password, user.passwordHash)
  if (!passwordMatch) {
    res.status(401).json({ message: 'Invalid email or password' })
    return
  }

  // 5. Generate access token (short-lived — 15 minutes)
  const accessToken = jwt.sign({ email }, ACCESS_TOKEN_SECRET, { expiresIn: '30s' })

  // 6. Generate refresh token (long-lived — 7 days)
  const refreshToken = jwt.sign({ email }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' })

  // 7. Save refresh token in store
  refreshTokens[email] = refreshToken

  // 8. Set refresh token as httpOnly cookie
  //    httpOnly: true  — JavaScript can't access it (XSS protection)
  //    secure: true    — only sent over HTTPS (disabled for localhost)
  //    sameSite: 'strict' — not sent with cross-site requests (CSRF protection)
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: false, // set to true in production (HTTPS)
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  })

  // 9. Return access token
  res.status(200).json({ accessToken })
}
