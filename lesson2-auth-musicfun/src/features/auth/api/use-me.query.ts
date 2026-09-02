import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/shared/api/client'

// GET /auth/me — who am I? Needs a valid access token (Bearer).
export const useMeQuery = () => {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const { data, error } = await apiClient.GET('/auth/me')
      if (error) throw error
      return data
    },
  })
}
