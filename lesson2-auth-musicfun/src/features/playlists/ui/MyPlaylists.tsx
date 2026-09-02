'use client'

import { useMyPlaylistsQuery } from '@/features/playlists/api/use-my-playlists.query'

export function MyPlaylists() {
  const { data, isPending, isError, error } = useMyPlaylistsQuery()

  return (
    <section>
      <h2>GET /playlists/my</h2>
      {isPending && <p>loading…</p>}
      {isError && <pre style={{ color: 'crimson' }}>{JSON.stringify(error, null, 2)}</pre>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </section>
  )
}
