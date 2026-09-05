// Public JSON download of the MAHJ MAHJ Event & City Index — designed for
// LLM/GEO consumption and for anyone who wants the site's own event and city
// data as clean structured JSON rather than scraping HTML.
//
// Same data src/app/events/page.tsx and src/app/events/[city]/page.tsx
// already render, built once in src/lib/dataset.ts so this file, the CSV
// sibling, and the /data landing page can't drift out of sync with each
// other or with what a visitor actually sees on the site.
//
// Cache: 1 hour browser, 24 hours edge — same policy as the underlying
// events fetch's own revalidate window (src/lib/api.ts).

import { NextResponse } from 'next/server';
import {
  buildEventsDataset,
  SITE_ORIGIN,
  DATA_LANDING_PATH,
  CC_BY_URL,
  CONTACT_EMAIL,
} from '@/lib/dataset';

export const runtime = 'nodejs';

export async function GET() {
  const ds = await buildEventsDataset();

  const payload = {
    dataset: 'MAHJ MAHJ Event & City Index',
    dataset_version: ds.dataset_version,
    data_source: SITE_ORIGIN,
    canonical_url: `${SITE_ORIGIN}/api/events.json`,
    dataset_landing_page: `${SITE_ORIGIN}${DATA_LANDING_PATH}`,
    license: 'CC-BY-4.0 with attribution to mahjmahj.co',
    license_url: CC_BY_URL,
    citation: 'MAHJ MAHJ, Mahjong Event & City Index',
    contact: CONTACT_EMAIL,
    generated_at: new Date().toISOString(),
    last_updated: ds.last_updated,
    fetch_ok: ds.fetch_ok,
    event_count: ds.event_count,
    city_count: ds.city_count,
    notes: [
      'Events are aggregated from public event sources by MAHJ MAHJ; they are not MAHJ MAHJ\'s own events unless `organizer` says so.',
      '`event_count` and `city_count` are computed from this response\'s own `events` and `cities` arrays, not a separately cached figure.',
      'A null field means the value is not publicly known for that record, not zero or empty (never estimated).',
      'Recurring club-published schedules shown on /events/{city} pages (a separate, smaller curated list distinct from these scraped event listings) are out of scope for this dataset.',
      'fetch_ok:false means the live events API could not be reached when this response was generated; `events` will be empty and counts will read 0, which does not mean zero events exist.',
    ],
    cities: ds.cities,
    events: ds.events,
  };

  return NextResponse.json(payload, {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
      'X-Robots-Tag': 'index, follow',
    },
  });
}
