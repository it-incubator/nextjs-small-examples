'use client'

import { Me } from '@/features/auth/ui/Me'
import { MyPlaylists } from '@/features/playlists/ui/MyPlaylists'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.page} style={{ padding: 24, gap: 24, display: 'flex', flexDirection: 'column' }}>
      <h1>MusicFun auth — queries</h1>
      <Me />
      <MyPlaylists />
    </div>
  )
}
