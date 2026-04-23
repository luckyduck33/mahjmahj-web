import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  distDir: '.next',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.mahjmahj.co',
      },
    ],
  },
};

export default nextConfig;
