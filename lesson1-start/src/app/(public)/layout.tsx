import Link from "next/link";

export default function SimpleLayout({
                                               children,
                                             }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
          <header>Header
              <hr />
              <Link href="/">Home</Link> | <Link  href="/posts">Posts</Link> | <Link href="/auth/login">Login</Link> | <Link href="/auth/registration">Registration</Link>
              <hr />
          </header>
        {children}
          <footer>
              <hr/>
              Footer</footer>
      </>
  );
}

