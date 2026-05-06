import type { MetadataRoute } from 'next';
import { getEvents, getCitySlug } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: 'https://mahjmahj.co/', lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: 'https://mahjmahj.co/events', lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: 'https://mahjmahj.co/styles/hong-kong-mahjong', lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://mahjmahj.co/styles/taiwanese-mahjong', lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://mahjmahj.co/styles/american-mahjong', lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://mahjmahj.co/learn/how-to-play-mahjong', lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://mahjmahj.co/learn/which-mahjong-style-is-right-for-me', lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://mahjmahj.co/compare/mahjong-styles', lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://mahjmahj.co/about', lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ];

  let cityRoutes: MetadataRoute.Sitemap = [];
  try {
    const data = await getEvents();
    // Find latest event update date if API exposes one; otherwise fall back to now.
    const cityLastMod = data.lastUpdated ? new Date(data.lastUpdated) : now;
    const cities = [...new Set(data.events.map((e) => e.city))];
    cityRoutes = cities.map((city) => ({
      url: `https://mahjmahj.co/events/${getCitySlug(city)}`,
      lastModified: cityLastMod,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch {}

  return [...staticRoutes, ...cityRoutes];
}