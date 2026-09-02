'use client'

import { useMeQuery } from '@/features/auth/api/use-me.query'

export function Me() {
  const { data, isPending, isError, error } = useMeQuery()

  return (
    <section>
      <h2>GET /auth/me</h2>
      {isPending && <p>loading…</p>}
      {isError && <pre style={{ color: 'crimson' }}>{JSON.stringify(error, null, 2)}</pre>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </section>
  )
}
