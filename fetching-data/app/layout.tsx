import type {ReactNode} from 'react';
import styles from './page.module.css';
import type {Metadata} from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Link from 'next/link';
import Image from 'next/image';
import {ROUTES} from "@/shared/constants";

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export const metadata: Metadata = {
    title: 'Fetching data example',
    description: 'Example with different variants of fetching data. Includes static generation, dynamic request, revalidation on demand, time-based revalidation and client-side request',
};

export default function RootLayout({children}: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className={styles.page}>
            <header>
                <Link href="/">
                    <Image
                        className={styles.logo}
                        src="/next.svg"
                        alt="Next.js logo"
                        width={180}
                        height={38}
                        priority
                    />
                </Link>
            </header>
            <main className={styles.main}>
                <nav className={styles.nav}>
                    <Link href={ROUTES.DynamicRequest} prefetch={false}>Dynamic request</Link>
                    <Link href={ROUTES.StaticGeneration} prefetch={false}>Static generation</Link>
                    <Link href={ROUTES.TimeBasedRevalidation} prefetch={false}>Time based revalidation</Link>
                    <Link href={ROUTES.RevalidationOnDemand} prefetch={false}>Revalidation on demand</Link>
                    <Link href={ROUTES.ClientSideRequest} prefetch={false}>Client side request</Link>
                </nav>
                {children}
            </main>
        </div>
        </body>
        </html>
    );
}
