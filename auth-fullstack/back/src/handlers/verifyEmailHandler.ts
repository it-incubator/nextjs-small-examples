import { Request, Response } from 'express'
import { users, codes } from '../data'

// --- POST /verify-email ---
export async function verifyEmailHandler(req: Request, res: Response) {
  const { email, code } = req.body

  // 1. Validate input
  if (!email || !code) {
    res.status(400).json({ message: 'Email and code are required' })
    return
  }

  // 2. Look up stored code
  const storedCode = codes[email]
  if (!storedCode) {
    res.status(400).json({ message: 'Verification code not found' })
    return
  }

  // 3. Check expiration
  if (Date.now() > storedCode.expiresAt) {
    delete codes[email]
    res.status(400).json({ message: 'Verification code has expired' })
    return
  }

  // 4. Validate code matches
  if (storedCode.code !== code) {
    res.status(400).json({ message: 'Invalid verification code' })
    return
  }

  // 5. Mark user as verified
  users[email].isVerified = true

  // 6. Delete used code
  delete codes[email]

  // 7. Return success
  res.status(200).json({ message: 'Email verified successfully!' })
}
