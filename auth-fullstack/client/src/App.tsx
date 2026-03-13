import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { RegistrationForm } from './RegistrationForm'
import { VerifyEmailForm } from './VerifyEmailForm'
import { LoginForm } from './LoginForm'
import { ProtectedPage } from './ProtectedPage'
import { useMe } from './hooks'

const queryClient = new QueryClient()

function Header() {
  const { data: me } = useMe()

  return (
    <nav style={{ display: 'flex', gap: '16px', padding: '12px', borderBottom: '1px solid #ccc' }}>
      <Link to="/">Register</Link>
      <Link to="/login">Login</Link>
      <Link to="/protected">Protected</Link>
      {me && <span style={{ marginLeft: 'auto', color: 'green' }}>Logged in as {me.email}</span>}
    </nav>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <div style={{ padding: '16px' }}>
          <Routes>
            <Route path="/" element={<RegistrationForm />} />
            <Route path="/verify-email" element={<VerifyEmailForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/protected" element={<ProtectedPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
