import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { users, codes } from '../data'
import { sendVerificationEmail } from '../email'

// --- POST /register ---
export async function registerHandler(req: Request, res: Response) {
  const { email, password } = req.body

  // 1. Validate input
  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' })
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Invalid email format' })
    return
  }

  // 2. Check user doesn't already exist
  if (users[email]) {
    res.status(409).json({ message: 'User already exists' })
    return
  }

  // 3. Hash password with bcrypt
  const passwordHash = await bcrypt.hash(password, 10)

  // 4. Save user with isVerified: false
  users[email] = { email, passwordHash, isVerified: false }

  // 5. Generate 6-digit verification code
  const code = Math.random().toString().slice(2, 8)

  // 6. Save code with 10-minute expiration
  codes[email] = { code, expiresAt: Date.now() + 10 * 60 * 1000 }

  // 7. Send verification email
  await sendVerificationEmail(email, code)

  // 8. Return success
  res.status(201).json({ message: 'User registered. Check your email for verification link.' })
}
