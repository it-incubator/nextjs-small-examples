import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api } from './api'

export function VerifyEmailForm() {
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email')
  const code = searchParams.get('code')

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showResend, setShowResend] = useState(false)

  // Auto-submit verification on mount
  useEffect(() => {
    if (!email || !code) {
      setError('Missing email or code in the URL')
      return
    }

    const verify = async () => {
      setLoading(true)
      try {
        await api.verifyEmail(email, code)
        setMessage('Email verified!')
      } catch (err: any) {
        const message = err.response?.data?.message || 'Something went wrong'
        setError(message)
        if (message.includes('expired')) {
          setShowResend(true)
        }
      } finally {
        setLoading(false)
      }
    }

    verify()
  }, [email, code])

  const handleResend = async () => {
    setLoading(true)
    setMessage('')
    setError('')

    try {
      await api.resendCode(email!)
      setMessage('New verification email sent. Check your inbox.')
      setShowResend(false)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Email Verification</h1>

      {loading && <p>Verifying...</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {showResend && (
        <button onClick={handleResend} disabled={loading}>
          Resend verification email
        </button>
      )}
    </div>
  )
}
