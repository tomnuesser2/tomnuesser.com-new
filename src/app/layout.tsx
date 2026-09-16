import type { Metadata } from 'next';
import { Ubuntu_Mono } from 'next/font/google';
import './globals.css';
import BrandMark from '@/components/BrandMark';
import PillNav from '@/components/PillNav';
import LandingOverlay from '@/components/LandingOverlay';
import PageTransition from '@/components/PageTransition';

const ubuntuMono = Ubuntu_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ubuntu-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'tom nuesser',
  description:
    'tom nuesser — Video, Kamera & Postproduktion. Live-Sessions, Festival-Content und Musikvideos.',
  metadataBase: new URL('https://tomnuesser.com'),
  openGraph: {
    title: 'tom nuesser',
    description:
      'tom nuesser — Video, Kamera & Postproduktion. Live-Sessions, Festival-Content und Musikvideos.',
    url: 'https://tomnuesser.com',
    siteName: 'tom nuesser',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={ubuntuMono.variable}>
      <head>
        {/* Baut die Verbindung zu Vimeo schon früh auf, damit Video-Embeds
            beim Klick auf "Play" möglichst schnell starten. */}
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="preconnect" href="https://i.vimeocdn.com" />
        <link rel="dns-prefetch" href="https://player.vimeo.com" />
      </head>
      <body className="font-mono antialiased bg-paper text-ink">
        <BrandMark />
        <PillNav />
        <PageTransition>{children}</PageTransition>
        <LandingOverlay />
      </body>
    </html>
  );
}
