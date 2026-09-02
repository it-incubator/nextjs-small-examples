'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function Callback() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')

  return (
    <div style={{ padding: 24 }}>
      <h1>OAuth callback</h1>
      <p>Received code:</p>
      <pre>{code ?? 'no code in URL'}</pre>
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
