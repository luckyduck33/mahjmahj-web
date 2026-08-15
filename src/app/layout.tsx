import type { Metadata } from 'next';
import Script from 'next/script';
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { organizationSchema, webSiteSchema } from '@/lib/schema';
import './globals.css';

// preload:false — the homepage LCP is the full-bleed /hero.jpg background
// image, not text. next/font otherwise emits a <link rel=preload> for every
// declared weight/style (9 woff2 files) that contends with the hero image
// on the early-bandwidth budget and pushes LCP past 5s. display:'swap'
// (and CLS is already 0) means text still paints immediately in the
// fallback and swaps in with no layout shift, so dropping the font
// preloads is a pure LCP win.
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  preload: false,
  variable: '--font-inter',
});

// Variable weight (100-900) + the opsz axis (9..144) ships in the same
// woff2 — Fraunces is optical-size responsive, so headings at small sizes
// stay text-weight while display sizes pick up the fuller, more decorative
// cut automatically (font-optical-sizing: auto is the browser default).
// axes: pulls in the non-default SOFT/WONK axes too (DS soft-cut treatment,
// see globals.css font-variation-settings on hero/section headings).
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: 'variable',
  style: ['normal', 'italic'],
  display: 'swap',
  preload: false,
  variable: '--font-fraunces',
  axes: ['opsz', 'SOFT', 'WONK'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  preload: false,
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: {
    default: 'Mahj Mahj — A Modern Guide to Mahjong',
    template: '%s | MAHJ MAHJ',
  },
  description:
    'MAHJ MAHJ is a community platform for mahjong players in the United States. Find local events, learn rules and strategy for Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong, and connect with players in cities across the US.',
  metadataBase: new URL('https://mahjmahj.co'),
  openGraph: {
    type: 'website',
    siteName: 'MAHJ MAHJ',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-W1TBW9XH3N"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W1TBW9XH3N');
          `}
        </Script>
      </head>
      <body className="flex min-h-full flex-col">
        <JsonLd data={[organizationSchema(), webSiteSchema()]} />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
