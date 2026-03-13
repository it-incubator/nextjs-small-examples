import { Request, Response } from 'express'
import { users, codes } from '../data'
import { sendVerificationEmail } from '../email'

// --- POST /resend-code ---
export async function resendCodeHandler(req: Request, res: Response) {
  const { email } = req.body

  // 1. Validate input
  if (!email) {
    res.status(400).json({ message: 'Email is required' })
    return
  }

  // 2. Check user exists
  const user = users[email]
  if (!user) {
    res.status(404).json({ message: 'User not found' })
    return
  }

  // 3. Check user is NOT already verified
  if (user.isVerified) {
    res.status(400).json({ message: 'Email is already verified' })
    return
  }

  // 4. Generate new code
  const code = Math.random().toString().slice(2, 8)

  // 5. Save code with 10-minute expiration
  codes[email] = { code, expiresAt: Date.now() + 10 * 60 * 1000 }

  // 6. Send email
  await sendVerificationEmail(email, code)

  // 7. Return success
  res.status(200).json({ message: 'Verification code resent. Check your email.' })
}
