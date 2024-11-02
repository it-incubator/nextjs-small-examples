import Link from 'next/link';
import styles from './page.module.css'

/**
 * Use Link component from next/link to navigate inside one zone
 */
export default async function Home() {
  return (
      <>
        <div className={styles.heading}>Zone in another app</div>
        <div className={styles.nav}>
          <Link href="/1">Zone slug 1</Link>
          <Link href="/2">Zone slug 2</Link>
        </div>
      </>
  )
}
