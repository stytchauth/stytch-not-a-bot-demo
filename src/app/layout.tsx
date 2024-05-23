import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

import StytchProvider from "@/src/components/StytchProvider";
import Head from "next/head";
import Script from "next/script";
import { ReactNode } from "react";
const BASE_URL = process.env.HOSTED_URL
  ? process.env.HOSTED_URL
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(BASE_URL),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <StytchProvider>
      <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <Head>
          <title>Stytch not-a-bot</title>
        </Head>
        <Script src="https://elements.stytch.com/telemetry.js"></Script>
        <meta
          name="description"
          content="A demo application using Stytch for authentication to generate AI images."
        />
        <body className="bg-charcoal">{children}</body>
      </html>
    </StytchProvider>
  );
}
