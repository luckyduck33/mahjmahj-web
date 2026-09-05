import type { MetadataRoute } from 'next';
import { getEvents, getCitySlug } from '@/lib/api';
import { cities } from '@/data/cities';

// Date-only (YYYY-MM-DD) formatter. Next.js's sitemap serializer passes a
// string `lastModified` straight through to <lastmod> (only a Date instance
// gets .toISOString()'d), so returning a plain date string here is what makes
// the emitted sitemap honest: a real day, not a fabricated build timestamp.
const dateOnly = (d: Date | string): string =>
  (typeof d === 'string' ? d : d.toISOString()).slice(0, 10);

// Static-content pages don't change on every deploy — they change when their
// source file is actually edited. These are the last real-content-commit
// dates for each page (git log -1 --format=%cs), not a build stamp.
const STATIC_LASTMOD: Record<string, string> = {
  '/': '2026-08-13',
  '/styles/hong-kong-mahjong': '2026-08-13',
  '/styles/taiwanese-mahjong': '2026-08-13',
  '/styles/american-mahjong': '2026-08-13',
  '/learn/how-to-play-mahjong': '2026-08-13',
  '/learn/how-to-play-hong-kong-mahjong': '2026-08-13',
  '/learn/which-mahjong-style-is-right-for-me': '2026-08-13',
  '/learn/la-hong-kong-mahjong-scene': '2026-08-13',
  '/learn/la-mahjong-clubs': '2026-08-13',
  '/learn/first-la-mahjong-night': '2026-08-13',
  '/compare/mahjong-styles': '2026-08-13',
  '/guides/mahjong-night': '2026-08-13',
  '/research/state-of-american-mahjong-2026': '2026-08-31',
  '/about': '2026-05-06',
};

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
  const eventsLastMod = dateOnly(
    eventsData?.lastUpdated && !Number.isNaN(Date.parse(eventsData.lastUpdated))
      ? new Date(eventsData.lastUpdated)
      : now
  );

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: 'https://mahjmahj.co/', lastModified: STATIC_LASTMOD['/'], changeFrequency: 'daily', priority: 1.0 },
    { url: 'https://mahjmahj.co/events', lastModified: eventsLastMod, changeFrequency: 'daily', priority: 0.9 },
    { url: 'https://mahjmahj.co/styles/hong-kong-mahjong', lastModified: STATIC_LASTMOD['/styles/hong-kong-mahjong'], changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://mahjmahj.co/styles/taiwanese-mahjong', lastModified: STATIC_LASTMOD['/styles/taiwanese-mahjong'], changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://mahjmahj.co/styles/american-mahjong', lastModified: STATIC_LASTMOD['/styles/american-mahjong'], changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://mahjmahj.co/learn/how-to-play-mahjong', lastModified: STATIC_LASTMOD['/learn/how-to-play-mahjong'], changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://mahjmahj.co/learn/how-to-play-hong-kong-mahjong', lastModified: STATIC_LASTMOD['/learn/how-to-play-hong-kong-mahjong'], changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://mahjmahj.co/learn/which-mahjong-style-is-right-for-me', lastModified: STATIC_LASTMOD['/learn/which-mahjong-style-is-right-for-me'], changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://mahjmahj.co/learn/la-hong-kong-mahjong-scene', lastModified: STATIC_LASTMOD['/learn/la-hong-kong-mahjong-scene'], changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://mahjmahj.co/learn/la-mahjong-clubs', lastModified: STATIC_LASTMOD['/learn/la-mahjong-clubs'], changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://mahjmahj.co/learn/first-la-mahjong-night', lastModified: STATIC_LASTMOD['/learn/first-la-mahjong-night'], changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://mahjmahj.co/compare/mahjong-styles', lastModified: STATIC_LASTMOD['/compare/mahjong-styles'], changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://mahjmahj.co/guides/mahjong-night', lastModified: STATIC_LASTMOD['/guides/mahjong-night'], changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://mahjmahj.co/research/state-of-american-mahjong-2026', lastModified: STATIC_LASTMOD['/research/state-of-american-mahjong-2026'], changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://mahjmahj.co/about', lastModified: STATIC_LASTMOD['/about'], changeFrequency: 'monthly', priority: 0.5 },
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