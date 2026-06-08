import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'mahjmahj.co' },
      { protocol: 'https', hostname: 'api.mahjmahj.co' },
    ],
  },
  async redirects() {
    return [
      // Canonical host: apex (mahjmahj.co). Permanently redirect the www
      // host to apex so search engines and visitors land on a single host.
      // `has` matches only when Host = www.mahjmahj.co, so apex requests are
      // unaffected (no redirect loop). permanent: true returns HTTP 308 and
      // preserves the request path via /:path*.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.mahjmahj.co' }],
        destination: 'https://mahjmahj.co/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
