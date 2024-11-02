import {ROUTES} from '@/shared/constants';
import styles from './page.module.css'

/**
 * Use 'a' tag instead of the <Link> component for navigating to another zone.
 * Prefetching any relative path in Next.js <Link> component will not work across zones.
 */
export default function Home() {
    return (
        <div className={styles.nav}>
            <a href={ROUTES.Zone}>Go to another zone (different app)</a>
            <a href={ROUTES.ItIncubator}>Go to another zone (different app IT-INCUBATOR)</a>
        </div>
    )
}
