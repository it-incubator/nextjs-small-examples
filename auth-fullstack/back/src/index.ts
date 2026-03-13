import express from 'express'
import cors from 'cors'
import { registerHandler } from './handlers/registerHandler'
import { verifyEmailHandler } from './handlers/verifyEmailHandler'
import { resendCodeHandler } from './handlers/resendCodeHandler'

const app = express()
const PORT = 3001
const CLIENT_URL = 'http://localhost:5173'

app.use(cors({ origin: CLIENT_URL }))
app.options('{*path}', cors({ origin: CLIENT_URL }))
app.use(express.json())

app.post('/register', registerHandler)
app.post('/verify-email', verifyEmailHandler)
app.post('/resend-code', resendCodeHandler)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
