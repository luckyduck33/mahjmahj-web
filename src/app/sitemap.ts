import type { MetadataRoute } from 'next';
import { getEvents, getCitySlug } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    { url: 'https://mahjmahj.co/', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: 'https://mahjmahj.co/events', lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: 'https://mahjmahj.co/styles/hong-kong-mahjong', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: 'https://mahjmahj.co/styles/taiwanese-mahjong', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: 'https://mahjmahj.co/styles/american-mahjong', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: 'https://mahjmahj.co/compare/mahjong-styles', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: 'https://mahjmahj.co/learn/how-to-play-mahjong', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: 'https://mahjmahj.co/learn/which-mahjong-style-is-right-for-me', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: 'https://mahjmahj.co/about', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
  ];

  let cityRoutes: MetadataRoute.Sitemap = [];
  try {
    const data = await getEvents();
    const cities = [...new Set(data.events.map((e) => e.city))];
    cityRoutes = cities.map((city) => ({
      url: `https://mahjmahj.co/events/${getCitySlug(city)}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }));
  } catch {}

  return [...staticRoutes, ...cityRoutes];
}
