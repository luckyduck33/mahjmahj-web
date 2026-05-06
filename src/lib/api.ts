const API_BASE = 'https://api.mahjmahj.co';

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
    return res.json();
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
    return res.json();
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
