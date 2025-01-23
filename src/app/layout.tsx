import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ErrorBoundary from "@/components/ErrorBoundary";
import CABadge from "@/components/CABadge";
import { MEMECOIN_DATA } from '@/constants/memecoin';

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: MEMECOIN_DATA.NAME,
  description: MEMECOIN_DATA.DESCRIPTION,
  metadataBase: new URL('https://rug2.eth'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: MEMECOIN_DATA.NAME,
    description: MEMECOIN_DATA.DESCRIPTION,
    url: 'https://rug2.eth', // Replace with your actual domain
    siteName: MEMECOIN_DATA.NAME,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: MEMECOIN_DATA.NAME,
    description: MEMECOIN_DATA.DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'mobile-web-app-capable': 'yes',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceGrotesk.className}>
      <body>
        <ErrorBoundary>
          {children}
          <CABadge />
        </ErrorBoundary>
      </body>
    </html>
  );
}
