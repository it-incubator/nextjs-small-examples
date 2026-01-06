export default function SimpleLayout({
                                               children,
                                             }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
        {children}
      </>
  );
}

