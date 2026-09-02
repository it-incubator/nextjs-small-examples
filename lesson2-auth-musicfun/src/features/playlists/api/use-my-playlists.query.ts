import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/shared/api/client'

// GET /playlists/my — the playlists that belong to the current user.
// Also needs a valid access token (Bearer).
export const useMyPlaylistsQuery = () => {
  return useQuery({
    queryKey: ['playlists', 'my'],
    queryFn: async () => {
      const { data, error } = await apiClient.GET('/playlists/my')
      if (error) throw error
      return data
    },
  })
}
