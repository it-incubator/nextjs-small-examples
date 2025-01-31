import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {StoreWrapper} from "@/store/store-wrapper";

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
    <StoreWrapper>
      {children}
    </StoreWrapper>
    <div id="widget__pogoda" data-city_id="26851" style={ {minWidth: "200px", maxWidth: "500px"}}
         aria-label="Прогноз погоды"></div>
    <link href="https://pogoda.by/assets/static/widget/widget.css" rel="stylesheet"/>
    <script src="https://pogoda.by/assets/static/widget/widget.js" defer=""></script>
    </body>
    </html>
  );
}
