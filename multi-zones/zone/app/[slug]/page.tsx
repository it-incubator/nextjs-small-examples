'use client'

import styles from '../page.module.css';
import Link from 'next/link';
import {useParams} from 'next/navigation';

/**
 * Use Link component from next/link to navigate inside one zone
 */
export default function Zone() {
  const {slug} = useParams()

  return (
      <>
        <div className={styles.heading}>Zone {slug}</div>
        <div className={styles.nav}>
          <Link href="/">Go to zone home page</Link>
        </div>
      </>
  )
}
