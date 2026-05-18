import type { Metadata } from 'next';
import Script from 'next/script';
import { Poppins, Unbounded } from 'next/font/google';
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
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  preload: false,
  variable: '--font-poppins',
});

const unbounded = Unbounded({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap',
  preload: false,
  variable: '--font-unbounded',
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
    <html lang="en" className={`h-full antialiased ${poppins.variable} ${unbounded.variable}`}>
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
