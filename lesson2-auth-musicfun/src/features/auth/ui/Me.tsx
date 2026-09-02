'use client'

import { useMeQuery } from '@/features/auth/api/use-me.query'
import { getOAuthUrl } from '@/features/auth/lib/oauth'

export function Me() {
  const { data, isPending, isError } = useMeQuery()

  return (
    <section>
      <h2>GET /auth/me</h2>
      {isPending && <p>loading…</p>}
      {isError && <a href={getOAuthUrl()}>Login</a>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </section>
  )
}
