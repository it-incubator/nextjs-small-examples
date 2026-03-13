import nodemailer from 'nodemailer'

const CLIENT_URL = 'http://localhost:5173'

// --- Email transport (mock — logs to console) ---
const transporter = nodemailer.createTransport({
  jsonTransport: true, // doesn't actually send — outputs JSON to console
})

export async function sendVerificationEmail(email: string, code: string) {
  const verificationLink = `${CLIENT_URL}/verify-email?code=${code}&email=${encodeURIComponent(email)}`

  const info = await transporter.sendMail({
    from: '"Auth App" <noreply@example.com>',
    to: email,
    subject: 'Verify your email',
    html: `
      <h1>Email Verification</h1>
      <p>Your verification code: <strong>${code}</strong></p>
      <p>Or click the link: <a href="${verificationLink}">${verificationLink}</a></p>
    `,
  })

  // Since we use jsonTransport, we log the email to console
  console.log('📧 Email sent:', JSON.parse(info.message))
}
