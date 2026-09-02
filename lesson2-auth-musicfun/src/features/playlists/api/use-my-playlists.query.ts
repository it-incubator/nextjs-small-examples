import { useQuery } from '@tanstack/react-query'

import { apiClient } from '@/shared/api/client'

export const useMyPlaylistsQuery = (enabled: boolean) => {
  return useQuery({
    queryKey: ['playlists', 'my'],
    queryFn: async () => {
      const { data, error } = await apiClient.GET('/playlists/my')
      if (error) throw error
      return data
    },
    // enabled,
  })
}
