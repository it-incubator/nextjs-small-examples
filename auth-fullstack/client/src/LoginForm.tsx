import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from './hooks'

// --- LoginForm ---
// Uses useLoginMutation() instead of AuthContext.
// TanStack Query handles loading/error states automatically.
export function LoginForm() {
  const [email, setEmail] = useState('test@example.com')
  const [password, setPassword] = useState('123456')

  const navigate = useNavigate()
  const loginMutation = useLoginMutation()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => navigate('/protected'),
      },
    )
  }

  const error = loginMutation.error as any
  const errorMessage = error?.response?.status === 401
    ? 'Invalid email or password'
    : error?.response?.status === 403
      ? 'Please verify your email first'
      : error
        ? 'Something went wrong'
        : ''

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  )
}
