import type { ReactNode } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import styles from './page.module.css';
import "./globals.css";
import Link from 'next/link';
import Image from 'next/image';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Rewrites as multi-zones",
  description: "Example with multi-zones using rewrites config",
};

export default function RootLayout({children}: Readonly<{ children: ReactNode }>) {
  return (
      <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <div className={styles.page}>
        <header>
          {/** Use 'a' tag instead of the <Link> component. Prefetching any relative path in Next.js <Link> component will not work across zones. */}
          <a href={process.env.HOST_DOMAIN || '/'}>
            <Image
                className={styles.logo}
                src="/next.svg"
                alt="Next.js logo"
                width={180}
                height={38}
                priority
            />
          </a>
        </header>
        <main className={styles.main}>
          {children}
        </main>
      </div>
      </body>
      </html>
  );
}
