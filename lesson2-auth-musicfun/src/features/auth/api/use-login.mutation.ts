import { useMutation, useQueryClient } from '@tanstack/react-query'

import { apiClient } from '@/shared/api/client'
import { authStorage } from '@/shared/api/authStorage'

type LoginArgs = {
  code: string
  redirectUri: string
}

export const useLoginMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ code, redirectUri }: LoginArgs) => {
      const { data, error } = await apiClient.POST('/auth/login', {
        body: {
          code,
          redirectUri,
          rememberMe: true,
        },
      })
      if (error) throw error
      return data
    },
    onSuccess: async (data) => {
      await authStorage.saveAccessToken(data.accessToken)
      await authStorage.saveRefreshToken(data.refreshToken)
      await queryClient.invalidateQueries()
    },
  })
}
