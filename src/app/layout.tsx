import type { Metadata } from 'next';
import Script from 'next/script';
import { Poppins, Unbounded } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-poppins',
});

const unbounded = Unbounded({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap',
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
      <body className={`flex min-h-full flex-col ${poppins.className}`}>
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
