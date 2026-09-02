'use client'

import { Suspense, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { useLoginMutation } from '@/features/auth/api/use-login.mutation'

function Callback() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')

  const router = useRouter()
  const loginMutation = useLoginMutation()
  const exchanged = useRef(false)

  useEffect(() => {
    if (code && !exchanged.current) {
      exchanged.current = true
      loginMutation.mutate(
        {
          code,
          redirectUri: `${window.location.origin}/oauth/callback`,
        },
        {
          onSuccess: () => router.replace('/'),
        },
      )
    }
  }, [code, loginMutation, router])

  return (
    <div style={{ padding: 24 }}>
      <h1>OAuth callback</h1>
      <p>Received code:</p>
      <pre>{code ?? 'no code in URL'}</pre>

      {loginMutation.isPending && <p>exchanging code for tokens…</p>}
      {loginMutation.isSuccess && <pre style={{ color: 'green' }}>{JSON.stringify(loginMutation.data, null, 2)}</pre>}
      {loginMutation.isError && (
        <pre style={{ color: 'crimson' }}>{JSON.stringify(loginMutation.error, null, 2)}</pre>
      )}
    </div>
  )
}

export default function OAuthCallbackPage() {
  return (
    <Suspense>
      <Callback />
    </Suspense>
  )
}
