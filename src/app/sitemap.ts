import type { MetadataRoute } from 'next';
import { getEvents, getCitySlug } from '@/lib/api';
import { cities } from '@/data/cities';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Event pages are data-driven: their content changes when the events dataset
  // updates, NOT on every deploy. Use the API's real `lastUpdated` as the
  // sitemap lastmod so a genuine data change (e.g. the 2026-07-13 P0 schema fix
  // that added venue/street/region to every event) signals a real re-crawl to
  // Google — which does not consume IndexNow and re-crawls on lastmod change.
  // A cosmetic `now()` on every build is the anti-pattern this replaces (it
  // trains crawlers to distrust the field). Falls back to `now` only if the
  // API is unreachable at build time — never fabricates a date (Source-of-Truth).
  let eventsData: Awaited<ReturnType<typeof getEvents>> | null = null;
  try {
    eventsData = await getEvents();
  } catch {}
  const eventsLastMod =
    eventsData?.lastUpdated && !Number.isNaN(Date.parse(eventsData.lastUpdated))
      ? new Date(eventsData.lastUpdated)
      : now;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: 'https://mahjmahj.co/', lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: 'https://mahjmahj.co/events', lastModified: eventsLastMod, changeFrequency: 'daily', priority: 0.9 },
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
    lastModified: eventsLastMod,
    changeFrequency: 'weekly' as const,
    priority: c.tier === 1 ? 0.7 : 0.6,
  }));

  // Any historical event-only cities not in the manifest still get listed.
  // Reuses the events fetch above (no second API call).
  let extraRoutes: MetadataRoute.Sitemap = [];
  if (eventsData) {
    const manifestSlugs = new Set(cities.map((c) => c.slug));
    const eventSlugs = new Set(eventsData.events.map((e) => getCitySlug(e.city)));
    const extras = [...eventSlugs].filter((s) => !manifestSlugs.has(s));
    extraRoutes = extras.map((slug) => ({
      url: `https://mahjmahj.co/events/${slug}`,
      lastModified: eventsLastMod,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  }

  return [...staticRoutes, ...manifestRoutes, ...extraRoutes];
}