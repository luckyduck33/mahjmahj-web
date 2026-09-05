// Shared builder for the MAHJ MAHJ Event & City Index open dataset
// (VisibleOS dataset-packaging pass, 2026-09-05 — same move RangeYourself
// shipped 2026-09-04 for its price data: package the site's own
// non-duplicable inventory as a citable, versioned CSV/JSON download).
//
// This module is the SINGLE source both /api/events.json, /api/events.csv,
// and the /data landing page read from, so the two files and the page's own
// live counts can never drift out of sync with each other.
//
// Source of the underlying data:
//   - Events: the live events API (src/lib/api.ts getEvents()), the exact
//     same fetch used by /events, /events/[city], and sitemap.ts. Fetched
//     here with a high `limit` so this dataset isn't silently truncated at
//     the wrapper's low default limit (the other call sites request a small
//     page for rendering; this one requests everything the API will give).
//   - Cities: the static city manifest (src/data/cities.ts), the same
//     manifest sitemap.ts and /events/[city] use to generate a page per
//     city, including cities with no events scraped yet.
//
// Trust rule (Source-of-Truth Gate): every field below is picked by name
// from the normalized MahjEvent/CityEntry shapes the rest of the site already
// renders publicly (event cards, Event/FAQ JSON-LD, city pages) — never a
// raw object spread. The live API does not send email, phone, or submitter
// fields today, but a named picker is the guarantee that stays true even if
// the API starts sending an unexpected field tomorrow.
import { getEvents, getCitySlug, type MahjEvent } from './api';
import { cities as cityManifest, type CityEntry } from '@/data/cities';

export const SITE_ORIGIN = 'https://mahjmahj.co';
export const DATA_LANDING_PATH = '/data';
export const CC_BY_URL = 'https://creativecommons.org/licenses/by/4.0/';
export const CONTACT_EMAIL = 'hello@mahjmahj.co';

// Fetch cap for "every event" — the live API's own default limit is much
// lower (used deliberately by the render call sites, which only need a
// page's worth). This is generous headroom above the current live total so
// the dataset isn't quietly clipped as the events index grows.
const EVENT_FETCH_LIMIT = 5000;

export interface PublicEventRecord {
  id: string;
  title: string;
  city: string;
  state: string | null;
  venue: string | null;
  street_address: string | null;
  date: string | null;
  end_date: string | null;
  time: string | null;
  /** The event's own recurrence text as the API sends it (e.g. "Weekly",
   *  "One-time"), or null for a dated one-off with no such field. Present
   *  alongside `date` so a record with no specific date still carries its
   *  recurrence, matching EventCard's own `evt.recurring || 'Recurring'`. */
  recurring: string | null;
  style: string | null;
  cost: string | null;
  organizer: string | null;
  description: string | null;
  status: string | null;
  /** The event's own outbound link (registration page), the same URL the
   *  site's event cards and Event JSON-LD already point at. */
  source_url: string | null;
  instagram_handle: string | null;
}

export interface PublicCityRecord {
  slug: string;
  name: string;
  state: string;
  country: string;
  /** City manifest tier (1-3, see src/data/cities.ts), or null for a city
   *  that only exists because events were scraped for it and it has not
   *  been added to the manifest yet. */
  tier: 1 | 2 | 3 | null;
  url: string;
  event_count: number;
}

export interface EventsDataset {
  events: PublicEventRecord[];
  cities: PublicCityRecord[];
  event_count: number;
  city_count: number;
  /** ISO timestamp from the live events API, the same field
   *  src/app/sitemap.ts already treats as the real data-freshness signal.
   *  Null only if the live API could not be reached (never fabricated). */
  last_updated: string | null;
  /** `v${YYYY-MM-DD}` derived from `last_updated`. Null under the same
   *  condition as `last_updated`. */
  dataset_version: string | null;
  /** Whether the live events fetch succeeded. False means `events` is empty
   *  and counts reflect that — NOT that zero events exist. */
  fetch_ok: boolean;
}

const dateOnly = (iso: string): string => iso.slice(0, 10);

function toPublicEvent(e: MahjEvent): PublicEventRecord {
  // `recurring` is typed as boolean in MahjEvent, but the live API actually
  // sends a string ("Weekly", "One-time", ...) — EventCard already reads it
  // the same defensive way (`evt.recurring || 'Recurring'`) rather than
  // trusting the declared type. Read it as whatever it actually is.
  const rawRecurring = (e as unknown as { recurring?: unknown }).recurring;
  const recurring =
    typeof rawRecurring === 'string' && rawRecurring.trim()
      ? rawRecurring
      : rawRecurring === true
        ? 'Recurring'
        : null;

  return {
    id: e.id,
    title: e.title,
    city: e.city,
    state: e.state ?? null,
    venue: e.venue ?? null,
    street_address: e.streetAddress ?? null,
    date: e.date || null,
    end_date: e.endDate ?? null,
    time: e.time ?? null,
    recurring,
    style: e.style ?? null,
    cost: e.cost ?? null,
    organizer: e.organizer ?? null,
    description: e.description ?? null,
    status: e.status ?? null,
    source_url: e.registrationLink || e.url || null,
    instagram_handle: e.instagramHandle ?? null,
  };
}

function toPublicCity(c: CityEntry, eventCount: number): PublicCityRecord {
  return {
    slug: c.slug,
    name: c.name,
    state: c.state,
    country: c.country,
    tier: c.tier,
    url: `${SITE_ORIGIN}/events/${c.slug}`,
    event_count: eventCount,
  };
}

export async function buildEventsDataset(): Promise<EventsDataset> {
  let raw: Awaited<ReturnType<typeof getEvents>> | null = null;
  try {
    raw = await getEvents({ limit: EVENT_FETCH_LIMIT });
  } catch {
    raw = null;
  }

  const fetchOk = !!raw && raw.lastUpdated !== null;
  const rawEvents = raw?.events ?? [];
  const events = rawEvents.map(toPublicEvent);

  const countsBySlug = new Map<string, number>();
  for (const e of rawEvents) {
    const slug = getCitySlug(e.city);
    countsBySlug.set(slug, (countsBySlug.get(slug) ?? 0) + 1);
  }

  const manifestSlugs = new Set(cityManifest.map((c) => c.slug));
  const cities: PublicCityRecord[] = [
    ...cityManifest.map((c) => toPublicCity(c, countsBySlug.get(c.slug) ?? 0)),
    // Any historical event-only city not yet in the manifest, same rule
    // sitemap.ts already applies for its own extra routes.
    ...[...new Set(rawEvents.map((e) => e.city))]
      .filter((name) => !manifestSlugs.has(getCitySlug(name)))
      .map((name) => {
        const slug = getCitySlug(name);
        return {
          slug,
          name,
          state: '',
          country: 'US',
          tier: null,
          url: `${SITE_ORIGIN}/events/${slug}`,
          event_count: countsBySlug.get(slug) ?? 0,
        };
      }),
  ];

  const lastUpdated =
    raw?.lastUpdated && !Number.isNaN(Date.parse(raw.lastUpdated)) ? raw.lastUpdated : null;

  return {
    events,
    cities,
    event_count: events.length,
    city_count: cities.length,
    last_updated: lastUpdated,
    dataset_version: lastUpdated ? `v${dateOnly(lastUpdated)}` : null,
    fetch_ok: fetchOk,
  };
}
