import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {StoreWrapper} from "@/store/store-wrapper";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={`${geistSans.variable} ${geistMono.variable}`}>
    <header>Header
    <hr />
      <Link href="/">Home</Link> | <Link  href="/posts">Posts</Link> | <Link href="/auth/login">Login</Link> | <Link href="/auth/registration">Registration</Link>
    <hr />
    </header>
    <StoreWrapper>
      {children}
    </StoreWrapper>
    <header>Footer</header>
    </body>
    </html>
  );
}

