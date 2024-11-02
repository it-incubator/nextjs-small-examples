import {ROUTES} from '@/shared/constants';
import Link from 'next/link';
import styles from './page.module.css'

export default function Home() {
  return (
      <>
        <nav className={styles.nav}>
          <Link href={ROUTES.DynamicRequest}>Dynamic request</Link>
          <Link href={ROUTES.StaticGeneration}>Static generation</Link>
          <Link href={ROUTES.TimeBasedRevalidation}>Time based revalidation</Link>
          <Link href={ROUTES.RevalidationOnDemand}>Revalidation on demand</Link>
          <Link href={ROUTES.ClientSideRequest}>Client side request</Link>
        </nav>
        <div className={styles.link}>
          {/** Use 'a' tag instead of the <Link> component. Prefetching any relative path in Next.js <Link> component will not work across zones. */}
          <a href={ROUTES.Zone}>Go to another zone (different app)</a>
        </div>
      </>
  )
}
