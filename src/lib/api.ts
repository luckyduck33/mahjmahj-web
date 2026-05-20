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

function sanitizeMahjong<T extends Record<string, unknown>>(obj: T): T {
  const out: Record<string, unknown> = { ...obj };
  for (const f of SANITIZE_FIELDS) {
    const v = out[f];
    if (typeof v === 'string' && CHINESE_MJ.test(v)) {
      out[f] = v.replace(CHINESE_MJ, 'Hong Kong Mahjong');
    }
  }
  return out as T;
}

export interface MahjEvent {
  id: string;
  title: string;
  city: string;
  state?: string;
  venue?: string;
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
  lastUpdated: string;
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
      return { events: [], total: 0, lastUpdated: new Date().toISOString() };
    }
    const data = (await res.json()) as EventsResponse;
    // Sanitize "Chinese Mahjong" → "Hong Kong Mahjong" across every event
    // before any consumer (page render or JSON-LD builder) sees them.
    return { ...data, events: (data.events || []).map((e) => sanitizeMahjong(e)) };
  } catch {
    return { events: [], total: 0, lastUpdated: new Date().toISOString() };
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
