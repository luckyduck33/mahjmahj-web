import type { MetadataRoute } from 'next';
import { getEvents, getCitySlug } from '@/lib/api';
import { cities } from '@/data/cities';

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
    { url: 'https://mahjmahj.co/learn/la-hong-kong-mahjong-scene', lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://mahjmahj.co/learn/la-mahjong-clubs', lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://mahjmahj.co/learn/first-la-mahjong-night', lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://mahjmahj.co/compare/mahjong-styles', lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://mahjmahj.co/research/state-of-american-mahjong-2026', lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://mahjmahj.co/about', lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ];

  // Manifest cities — every listed city gets a sitemap entry, even before
  // scrapers populate events. Tier 1 (existing community) gets higher
  // priority than tier 2/3 (newly seeded markets) to reflect inventory depth.
  const manifestRoutes: MetadataRoute.Sitemap = cities.map((c) => ({
    url: `https://mahjmahj.co/events/${c.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: c.tier === 1 ? 0.7 : 0.6,
  }));

  // Any historical event-only cities not in the manifest still get listed.
  let extraRoutes: MetadataRoute.Sitemap = [];
  try {
    const data = await getEvents();
    const manifestSlugs = new Set(cities.map((c) => c.slug));
    const eventSlugs = new Set(data.events.map((e) => getCitySlug(e.city)));
    const extras = [...eventSlugs].filter((s) => !manifestSlugs.has(s));
    extraRoutes = extras.map((slug) => ({
      url: `https://mahjmahj.co/events/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  } catch {}

  return [...staticRoutes, ...manifestRoutes, ...extraRoutes];
}