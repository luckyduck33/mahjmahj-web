const API_BASE = 'https://api.mahjmahj.co/api';

export interface MahjEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  city: string;
  neighborhood: string;
  address: string;
  host: string;
  cost: string;
  styles: string[];
  eventType: string[];
  skillLevel: string[];
  recurring: string;
  recurrencePattern: string;
  registrationLink: string;
  description: string;
  status: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  source: string;
  url: string;
  imageUrl: string;
  whyItMatters: string;
  featured: boolean;
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

export async function fetchEvents(params?: {
  city?: string;
  status?: string;
  limit?: number;
}): Promise<EventsResponse> {
  const searchParams = new URLSearchParams();
  if (params?.city) searchParams.set('city', params.city);
  if (params?.status) searchParams.set('status', params.status);
  if (params?.limit) searchParams.set('limit', String(params.limit));

  const url = \`\${API_BASE}/events\${searchParams.toString() ? '?' + searchParams.toString() : ''}\`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(\`Events API error: \${res.status}\`);
    return res.json();
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return { events: [], total: 0, lastUpdated: new Date().toISOString() };
  }
}

export async function fetchNews(params?: {
  active?: boolean;
  limit?: number;
  category?: string;
}): Promise<NewsResponse> {
  const searchParams = new URLSearchParams();
  if (params?.active !== undefined) searchParams.set('active', String(params.active));
  if (params?.limit) searchParams.set('limit', String(params.limit));
  if (params?.category) searchParams.set('category', params.category);

  const url = \`\${API_BASE}/news\${searchParams.toString() ? '?' + searchParams.toString() : ''}\`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(\`News API error: \${res.status}\`);
    return res.json();
  } catch (error) {
    console.error('Failed to fetch news:', error);
    return { news: [], total: 0, lastUpdated: new Date().toISOString() };
  }
}

export async function getEventCities(): Promise<string[]> {
  const data = await fetchEvents({ status: 'all' });
  const cities = [...new Set(data.events.map((e) => e.city).filter(Boolean))];
  return cities;
}

export function cityToSlug(city: string): string {
  return city.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export function slugToCity(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
