'use client'

import { useMeQuery } from '@/features/auth/api/use-me.query'
import { useMyPlaylistsQuery } from '@/features/playlists/api/use-my-playlists.query'
import styles from './page.module.css'

export default function Home() {
  const meQuery = useMeQuery()
  const myPlaylistsQuery = useMyPlaylistsQuery()

  return (
    <div className={styles.page} style={{ padding: 24, gap: 24, display: 'flex', flexDirection: 'column' }}>
      <h1>MusicFun auth — queries</h1>

      <section>
        <h2>GET /auth/me</h2>
        {meQuery.isPending && <p>loading…</p>}
        {meQuery.isError && <pre style={{ color: 'crimson' }}>{JSON.stringify(meQuery.error, null, 2)}</pre>}
        {meQuery.data && <pre>{JSON.stringify(meQuery.data, null, 2)}</pre>}
      </section>

      <section>
        <h2>GET /playlists/my</h2>
        {myPlaylistsQuery.isPending && <p>loading…</p>}
        {myPlaylistsQuery.isError && (
          <pre style={{ color: 'crimson' }}>{JSON.stringify(myPlaylistsQuery.error, null, 2)}</pre>
        )}
        {myPlaylistsQuery.data && <pre>{JSON.stringify(myPlaylistsQuery.data, null, 2)}</pre>}
      </section>
    </div>
  )
}
