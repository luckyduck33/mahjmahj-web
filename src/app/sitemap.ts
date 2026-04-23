import type { MetadataRoute } from 'next';
import { fetchEvents, cityToSlug } from '@/lib/api';

const SITE_URL = 'https://mahjmahj.co';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE_URL}/events`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/styles/hong-kong-mahjong`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/styles/taiwanese-mahjong`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/styles/american-mahjong`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/compare/mahjong-styles`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/learn/how-to-play-mahjong`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/learn/which-mahjong-style-is-right-for-me`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  // Dynamic city routes
  let cityRoutes: MetadataRoute.Sitemap = [];
  try {
    const data = await fetchEvents({ status: 'all' });
    const cities = [...new Set(data.events.map((e) => e.city).filter(Boolean))];
    cityRoutes = cities.map((city) => ({
      url: `${SITE_URL}/events/${cityToSlug(city)}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Failed to generate city sitemap entries:', error);
  }

  return [...staticRoutes, ...cityRoutes];
}
