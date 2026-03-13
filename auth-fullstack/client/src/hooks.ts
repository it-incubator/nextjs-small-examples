import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api, setAccessToken } from './api'

// --- useMe ---
// Replaces AuthContext for checking "am I logged in?"
// On app load, TanStack Query automatically calls GET /me.
// If the user has a valid access token → returns { email }.
// If not → the response interceptor tries to refresh first,
//   but /me is in skipUrls so it won't auto-retry.
//   Instead, we try to refresh manually in queryFn.
export function useMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      // First try GET /me with current access token
      try {
        const response = await api.me()
        return response.data
      } catch {
        // If failed, try to refresh tokens and retry
        try {
          const refreshResponse = await api.refreshTokens()
          setAccessToken(refreshResponse.data.accessToken)
          const response = await api.me()
          return response.data
        } catch {
          // No valid session
          setAccessToken(null)
          return null
        }
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // consider "me" data fresh for 5 minutes
  })
}

// --- useLoginMutation ---
// On success: saves the access token and refetches "me" query.
export function useLoginMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const response = await api.login(email, password)
      return response.data
    },
    onSuccess: (data) => {
      setAccessToken(data.accessToken)
      // Invalidate "me" query so it refetches with the new token
      queryClient.invalidateQueries({ queryKey: ['me'] })
    },
  })
}

// --- useLogoutMutation ---
// On success: clears the access token and refetches "me" query.
export function useLogoutMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      await api.logout()
    },
    onSuccess: () => {
      setAccessToken(null)
      // Reset "me" query to null (logged out)
      queryClient.setQueryData(['me'], null)
    },
  })
}

// --- useRegisterMutation ---
export function useRegisterMutation() {
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const response = await api.register(email, password)
      return response.data
    },
  })
}

// --- useProtectedQuery ---
// Fetches data from GET /protected. Only runs when user is logged in.
export function useProtectedQuery(enabled: boolean) {
  return useQuery({
    queryKey: ['protected'],
    queryFn: async () => {
      const response = await api.getProtected()
      return response.data
    },
    enabled,
    retry: false,
  })
}
