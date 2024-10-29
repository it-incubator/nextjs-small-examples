import Link from 'next/link';

export default function Home() {
  return (
      <>
        <Link href="/dynamic-request">Dynamic request</Link>
        <Link href="/static-generation">Static generation</Link>
        <Link href="/time-based-revalidation">Time based revalidation</Link>
        <Link href="/revalidation-on-demand">Revalidation on demand</Link>
        <Link href="/client-side-request">Client side request</Link>
      </>
  )
}
