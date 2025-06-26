export default function RootWithBannerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <>
     <div>BANNER</div>
     {children}
   </>
  );
}

