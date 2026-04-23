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
};

export default nextConfig;
