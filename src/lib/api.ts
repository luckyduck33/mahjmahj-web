const API_BASE = 'https://api.mahjmahj.co';

// Brand-rule sanitization: scraped event data occasionally carries
// "Chinese Mahjong" (literal substring) in titles/descriptions. The
// website MUST render "Hong Kong Mahjong" instead, including inside the
// Event JSON-LD schema (the Capacitor app already does this at its own
// rendering layer; the website did not until 2026-05-19, P1 trust audit).
// Last-line defense — keep even after the api repo is fixed, so a future
// scrape regression cannot leak through.
const SANITIZE_FIELDS = ['title', 'description', 'organizer', 'venue', 'summary'] as const;
const CHINESE_MJ = /\bchinese[\s-]+mahjong\b/gi;

function sanitizeMahjong<T extends object>(obj: T): T {
  const out = { ...obj } as Record<string, unknown>;
  for (const f of SANITIZE_FIELDS) {
    const v = out[f];
    if (typeof v === 'string') {
      // Always replace (idempotent) rather than test()-then-replace: CHINESE_MJ
      // is a /g regex, so .test() advances lastIndex and would skip matches in
      // the next field. replace() resets lastIndex, so this is safe per field.
      const replaced = v.replace(CHINESE_MJ, 'Hong Kong Mahjong');
      if (replaced !== v) out[f] = replaced;
    }
  }
  return out as T;
}

// Valid US state / territory + DC postal codes. Used to validate a parsed
// address region so we emit a real region or nothing — never a guessed token.
// Many scraped addresses carry freeform tails ("Various — check site.com",
// "CA (various venues)"), so blind last-token extraction would leak junk into
// schema. Trust rule: parse conservatively, omit when uncertain.
const US_STATES = new Set([
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY','DC','PR',
]);

/**
 * Parse the API `address` ("9255 Reseda Boulevard, Los Angeles, CA" or
 * "..., NY 10022") into schema-ready parts.
 *   - streetAddress: the leading street line, only when it looks like a real
 *     street (starts with a number) — avoids echoing "Various — check ..." notes.
 *   - state: the last comma segment that is a valid 2-letter US state (optionally
 *     followed by a ZIP), validated against US_STATES.
 * Returns {} for freeform/placeholder addresses so we omit rather than mislabel.
 */
function parseAddress(address?: string): { streetAddress?: string; state?: string } {
  if (!address || typeof address !== 'string') return {};
  const parts = address.split(',').map((p) => p.trim()).filter(Boolean);
  if (parts.length === 0) return {};

  let state: string | undefined;
  for (let i = parts.length - 1; i >= 0; i--) {
    // "CA", "CA 90012", "NY 10022-1234" → capture the 2-letter code.
    const m = parts[i].match(/^([A-Z]{2})(?:\s+\d{5}(?:-\d{4})?)?$/);
    if (m && US_STATES.has(m[1])) {
      state = m[1];
      break;
    }
  }

  // streetAddress: first segment only when it starts with a house number.
  const streetAddress = /^\d/.test(parts[0]) ? parts[0] : undefined;

  return { streetAddress, state };
}

/**
 * Map the live API's real field names onto the normalized MahjEvent fields the
 * rest of the app reads. The API sends `neighborhood`/`address`/`styles[]`/`host`
 * and does NOT send `venue`/`state`/`style`/`organizer` — without this, every
 * event's location collapses to the bare city and organizer was hard-wired to
 * "MAHJ MAHJ", misattributing third-party events to us (a trust bug). We only
 * fill a normalized field when it isn't already set, so a future API that sends
 * the clean names keeps working unchanged.
 */
function normalizeEventFields(e: MahjEvent): MahjEvent {
  const out: MahjEvent = { ...e };
  if (!out.venue && out.neighborhood) out.venue = out.neighborhood;
  if (!out.style && Array.isArray(out.styles) && out.styles.length > 0) {
    out.style = out.styles[0];
  }
  // Organizer: only when a real host exists. Never default to MAHJ MAHJ here —
  // omitting is correct for scraped third-party events we don't run.
  if (!out.organizer && typeof out.host === 'string' && out.host.trim()) {
    out.organizer = out.host.trim();
  }
  const parsed = parseAddress(out.address);
  if (!out.streetAddress && parsed.streetAddress) out.streetAddress = parsed.streetAddress;
  if (!out.state && parsed.state) out.state = parsed.state;
  return out;
}

export interface MahjEvent {
  id: string;
  title: string;
  city: string;
  state?: string;
  venue?: string;
  /** Street line only ("9255 Reseda Boulevard"), parsed from the API `address`. */
  streetAddress?: string;
  date: string;
  endDate?: string;
  time?: string;
  description?: string;
  url?: string;
  source?: string;
  status?: string;
  style?: string;
  recurring?: boolean;
  registrationLink?: string;
  instagramHandle?: string;
  cost?: string;
  organizer?: string;
  // ── Raw fields as the live API (api.mahjmahj.co) actually sends them. The
  // API does NOT populate venue/state/style/organizer; it sends these instead.
  // normalizeEventFields() maps them onto the normalized fields above so every
  // downstream consumer (page render + JSON-LD) sees a complete event.
  /** Venue name, e.g. "Falafel Palace". Maps to `venue`. */
  neighborhood?: string;
  /** Full address, e.g. "9255 Reseda Boulevard, Los Angeles, CA". Source of streetAddress + state. */
  address?: string;
  /** Game styles, e.g. ["American"]. First entry maps to `style`. */
  styles?: string[];
  /** Organizer/host name. Maps to `organizer` only when non-empty. */
  host?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  url?: string;
  source?: string;
  summary?: string;
  category?: string;
  date: string;
  active?: boolean;
  imageUrl?: string;
}

export interface EventsResponse {
  events: MahjEvent[];
  total: number;
  /** ISO timestamp from the live API. Null on fetch failure — never fabricate
   *  a freshness date locally (Source-of-Truth Gate: the visible "Event data
   *  updated" line must reflect a real fetch, or not render at all). */
  lastUpdated: string | null;
}

export interface NewsResponse {
  news: NewsItem[];
  total: number;
  lastUpdated: string;
}

export async function getEvents(params?: {
  city?: string;
  status?: string;
  limit?: number;
}): Promise<EventsResponse> {
  const searchParams = new URLSearchParams();
  if (params?.city) searchParams.set('city', params.city);
  if (params?.status) searchParams.set('status', params.status);
  if (params?.limit) searchParams.set('limit', String(params.limit));

  const url = `${API_BASE}/api/events${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      return { events: [], total: 0, lastUpdated: null };
    }
    const data = (await res.json()) as EventsResponse;
    // First map the API's real field names (neighborhood/address/styles/host)
    // onto the normalized fields the app reads, THEN sanitize — so the freshly
    // populated venue/organizer also get "Chinese Mahjong" → "Hong Kong Mahjong"
    // applied before any consumer (page render or JSON-LD builder) sees them.
    return {
      ...data,
      events: (data.events || []).map((e) => sanitizeMahjong(normalizeEventFields(e))),
    };
  } catch {
    return { events: [], total: 0, lastUpdated: null };
  }
}

export async function getNews(params?: {
  active?: boolean;
  limit?: number;
}): Promise<NewsResponse> {
  const searchParams = new URLSearchParams();
  if (params?.active !== undefined) searchParams.set('active', String(params.active));
  if (params?.limit) searchParams.set('limit', String(params.limit));

  const url = `${API_BASE}/api/news${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      return { news: [], total: 0, lastUpdated: new Date().toISOString() };
    }
    const data = (await res.json()) as NewsResponse;
    // News items can also carry the term in title/summary — sanitize on
    // the way out, same as events.
    return { ...data, news: (data.news || []).map((n) => sanitizeMahjong(n)) };
  } catch {
    return { news: [], total: 0, lastUpdated: new Date().toISOString() };
  }
}

export function getCitySlug(city: string): string {
  return city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const SLUG_ABBREVIATIONS: Record<string, string> = { dc: 'DC' };

export function getCityFromSlug(slug: string): string {
  return slug
    .split('-')
    .map(w => SLUG_ABBREVIATIONS[w] ?? w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
