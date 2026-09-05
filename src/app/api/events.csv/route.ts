// CSV download of the MAHJ MAHJ Event & City Index. Same dataset as
// /api/events.json (src/lib/dataset.ts is the single builder both read),
// for the audience that opens a spreadsheet instead of writing code.
//
// The file holds two tables, EVENTS then CITIES, separated by a blank line
// and a `# CITIES` marker — both tables are "every event and city record"
// from the same live fetch. A strict single-schema CSV reader only needs
// the first block (events); the header comments say so.
//
// CC-BY 4.0 license + citation metadata is written into the file itself as
// leading `#` comment lines (same convention RangeYourself uses for its own
// CSV download), so it survives being opened outside any mahjmahj.co page.

import { NextResponse } from 'next/server';
import {
  buildEventsDataset,
  SITE_ORIGIN,
  DATA_LANDING_PATH,
  CC_BY_URL,
  CONTACT_EMAIL,
  type PublicEventRecord,
  type PublicCityRecord,
} from '@/lib/dataset';

export const runtime = 'nodejs';

const csvCell = (v: unknown): string => {
  if (v === null || v === undefined) return '';
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

const EVENT_HEADER: (keyof PublicEventRecord)[] = [
  'id',
  'title',
  'city',
  'state',
  'venue',
  'street_address',
  'date',
  'end_date',
  'time',
  'recurring',
  'style',
  'cost',
  'organizer',
  'status',
  'description',
  'source_url',
  'instagram_handle',
];

const CITY_HEADER: (keyof PublicCityRecord)[] = [
  'slug',
  'name',
  'state',
  'country',
  'tier',
  'event_count',
  'url',
];

export async function GET() {
  const ds = await buildEventsDataset();

  const headerComment = [
    '# MAHJ MAHJ Event & City Index',
    `# Dataset version: ${ds.dataset_version ?? 'unavailable (live events API unreachable at generation time)'}`,
    '# License: CC-BY 4.0 (https://creativecommons.org/licenses/by/4.0/). Attribution to mahjmahj.co required.',
    `# Citation: MAHJ MAHJ, Mahjong Event & City Index, ${SITE_ORIGIN}${DATA_LANDING_PATH}`,
    `# Data last updated: ${ds.last_updated ?? 'unavailable'}`,
    `# Contact: ${CONTACT_EMAIL}`,
    `# Dataset landing page (methodology, changelog, JSON download): ${SITE_ORIGIN}${DATA_LANDING_PATH}`,
    '# This file has two tables separated by a blank line: EVENTS (this header), then CITIES (marked "# CITIES").',
    '# A null/blank cell means the value is not publicly known for that record, not zero or empty.',
  ];

  const eventLines = [
    ...headerComment,
    EVENT_HEADER.join(','),
    ...ds.events.map((e) => EVENT_HEADER.map((k) => csvCell(e[k])).join(',')),
  ];

  const cityLines = [
    '',
    '# CITIES',
    CITY_HEADER.join(','),
    ...ds.cities.map((c) => CITY_HEADER.map((k) => csvCell(c[k])).join(',')),
  ];

  const csv = [...eventLines, ...cityLines].join('\n') + '\n';

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="mahjmahj-event-city-index.csv"',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
