import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMe, useLogoutMutation, useProtectedQuery } from './hooks'

// --- ProtectedPage ---
// Uses TanStack Query instead of AuthContext:
// - useMe() checks if the user is logged in
// - useProtectedQuery() fetches protected data
// - useLogoutMutation() handles logout
export function ProtectedPage() {
  const navigate = useNavigate()
  const { data: me, isLoading: isMeLoading } = useMe()
  const { data: protectedData, error } = useProtectedQuery(!!me)
  const logoutMutation = useLogoutMutation()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isMeLoading && !me) {
      navigate('/login')
    }
  }, [isMeLoading, me, navigate])

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => navigate('/login'),
    })
  }

  if (isMeLoading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>Protected Page</h1>
      {protectedData && <p style={{ color: 'green' }}>{protectedData.message}</p>}
      {error && <p style={{ color: 'red' }}>Something went wrong</p>}
      <button onClick={handleLogout} disabled={logoutMutation.isPending}>
        {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
      </button>
    </div>
  )
}
