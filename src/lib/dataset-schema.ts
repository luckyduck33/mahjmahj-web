// Dataset JSON-LD for the MAHJ MAHJ Event & City Index download artifact
// (VisibleOS dataset-packaging pass, 2026-09-05).
//
// src/lib/schema.ts already exports a general-purpose `datasetSchema()` used
// by src/app/research/state-of-american-mahjong-2026/page.tsx — that
// function takes a single `downloadUrl` and is left untouched here so that
// existing page keeps working unchanged. This file is a separate, dedicated
// builder for the /data landing page specifically, because that page needs a
// `distribution` array of TWO DataDownload entries (JSON + CSV), which the
// shared helper doesn't support. Same pattern RangeYourself's
// src/lib/dataset-schema.ts uses for its own /data page (styling not
// copied, only the shape: one module computing shared facts once so the
// JSON-LD and the page's own download links can't drift apart).
import { SITE_ORIGIN, DATA_LANDING_PATH, CC_BY_URL, type EventsDataset } from './dataset';

export const DATA_DOWNLOADS = [
  { format: 'JSON', encodingFormat: 'application/json', path: '/api/events.json' },
  { format: 'CSV', encodingFormat: 'text/csv', path: '/api/events.csv' },
] as const;

export const dataDownloadSchema = () =>
  DATA_DOWNLOADS.map((d) => ({
    '@type': 'DataDownload' as const,
    encodingFormat: d.encodingFormat,
    contentUrl: `${SITE_ORIGIN}${d.path}`,
  }));

/**
 * Dataset JSON-LD for the /data landing page. Counts and the modified date
 * are read straight off the same live-fetched dataset the page renders, so
 * the schema can never claim a different count than the visible page.
 */
export const dataLandingDatasetSchema = (ds: EventsDataset) => ({
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: 'MAHJ MAHJ Event & City Index',
  description: `Mahjong event listings and the city index behind mahjmahj.co: ${ds.event_count} current event records across ${ds.city_count} tracked cities, drawn from the same live events API the site's own /events and /events/{city} pages render.`,
  url: `${SITE_ORIGIN}${DATA_LANDING_PATH}`,
  version: ds.dataset_version ?? undefined,
  dateModified: ds.last_updated ?? undefined,
  creator: { '@type': 'Organization', name: 'MAHJ MAHJ', url: SITE_ORIGIN },
  license: CC_BY_URL,
  keywords: [
    'mahjong events',
    'mahjong near me',
    'Hong Kong Mahjong',
    'Taiwanese Mahjong',
    'American Mahjong',
    'open dataset',
  ],
  variableMeasured: [
    'event title',
    'city',
    'state',
    'venue (when public)',
    'street address (when public)',
    'event date or recurrence',
    'mahjong style',
    'cost',
    'organizer',
    'source URL',
  ],
  distribution: dataDownloadSchema(),
  isAccessibleForFree: true,
  mainEntityOfPage: {
    '@type': 'WebPage' as const,
    '@id': `${SITE_ORIGIN}${DATA_LANDING_PATH}`,
  },
});
