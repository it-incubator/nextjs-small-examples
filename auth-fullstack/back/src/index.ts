import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { registerHandler } from './handlers/registerHandler'
import { verifyEmailHandler } from './handlers/verifyEmailHandler'
import { resendCodeHandler } from './handlers/resendCodeHandler'
import { loginHandler } from './handlers/loginHandler'
import { refreshTokensHandler } from './handlers/refreshTokensHandler'
import { logoutHandler } from './handlers/logoutHandler'
import { authMiddleware } from './middleware/authMiddleware'

const app = express()
const PORT = 3001
const CLIENT_URL = 'http://localhost:5173'

// --- Middleware ---
// credentials: true — allows the browser to send/receive cookies cross-origin
app.use(cors({ origin: CLIENT_URL, credentials: true }))
app.options('{*path}', cors({ origin: CLIENT_URL, credentials: true }))
app.use(express.json())
app.use(cookieParser())

// --- Registration flow ---
app.post('/register', registerHandler)
app.post('/verify-email', verifyEmailHandler)
app.post('/resend-code', resendCodeHandler)

// --- Authorization flow ---
app.post('/login', loginHandler)
app.post('/refresh-tokens', refreshTokensHandler)
app.post('/logout', logoutHandler)

// --- Protected routes ---
// authMiddleware checks the access token before allowing access

// GET /me — returns the current user's email
// This is how the client checks "am I logged in?"
app.get('/me', authMiddleware, (req, res) => {
  const email = (req as any).user
  res.json({ email })
})

app.get('/protected', authMiddleware, (req, res) => {
  const email = (req as any).user
  res.json({ message: `Hello, ${email}` })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
