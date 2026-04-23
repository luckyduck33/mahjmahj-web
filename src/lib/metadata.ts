import type { Metadata } from 'next';

const SITE_URL = 'https://mahjmahj.co';
const SITE_NAME = 'MAHJ MAHJ';

export function createMetadata({
  title,
  description,
  path,
  ogImage,
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = path === '/' ? 'Mahj Mahj â A Modern Guide to Mahjong' : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  };
}

export { SITE_URL, SITE_NAME };
