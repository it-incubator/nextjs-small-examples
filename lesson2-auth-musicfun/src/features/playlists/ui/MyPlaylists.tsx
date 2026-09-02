'use client'

import { useMeQuery } from '@/features/auth/api/use-me.query'
import { useMyPlaylistsQuery } from '@/features/playlists/api/use-my-playlists.query'

export function MyPlaylists() {
  const { isSuccess: isLoggedIn } = useMeQuery()
  const { data, isPending, isError, error } = useMyPlaylistsQuery(isLoggedIn)

  return (
    <section>
      <h2>GET /playlists/my</h2>
      {!isLoggedIn && <p>need authorization</p>}
      {isLoggedIn && isPending && <p>loading…</p>}
      {isLoggedIn && isError && <pre style={{ color: 'crimson' }}>{JSON.stringify(error, null, 2)}</pre>}
      {isLoggedIn && data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </section>
  )
}
