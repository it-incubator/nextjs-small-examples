import {ROUTES} from '@/shared/constants';
import Link from 'next/link';

export default function Home() {
  return (
      <>
        <Link href={ROUTES.DynamicRequest}>Dynamic request</Link>
        <Link href={ROUTES.StaticGeneration}>Static generation</Link>
        <Link href={ROUTES.TimeBasedRevalidation}>Time based revalidation</Link>
        <Link href={ROUTES.RevalidationOnDemand}>Revalidation on demand</Link>
        <Link href={ROUTES.ClientSideRequest}>Client side request</Link>
      </>
  )
}
