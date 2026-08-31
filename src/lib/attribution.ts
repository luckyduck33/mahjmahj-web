// First-party UTM / referrer attribution capture.
//
// First-touch wins: the FIRST attribution seen for a visitor is persisted to
// localStorage and never overwritten by a later visit, for 90 days. This
// mirrors the standard "first-touch attribution" model for top-of-funnel
// channel reporting, and it is entirely first-party (no third-party cookie,
// no server round trip on read).
//
// Ported from Lucid Numbers' E1 attribution experiment (Acquisition Mission
// 001, lib/attribution.ts), adapted to this repo's conventions (semicolons,
// single quotes, `src/lib/`).
//
// Safe to call anywhere: every read/write is wrapped, so a private-browsing
// tab, a blocked localStorage, or SSR (no window) all just no-op instead of
// throwing. Never blocks the page it's attached to.

const STORAGE_KEY = 'mahj_attribution';
const EXPIRY_MS = 90 * 24 * 60 * 60 * 1000; // 90 days

export const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];

export type Attribution = Partial<Record<UtmKey, string>> & {
  referrer: string;
  landing_path: string;
  timestamp: number;
};

const MAX_FIELD_LEN = 200;

function readStorage(): Attribution | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Attribution;
    if (!parsed || typeof parsed.timestamp !== 'number') return null;
    if (Date.now() - parsed.timestamp > EXPIRY_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeStorage(attribution: Attribution): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Storage unavailable (private mode, quota, etc.). Attribution is
    // best-effort and must never block the page.
  }
}

/**
 * Call once on app mount (client only). If no valid (unexpired) attribution
 * is already stored, captures the current UTM params + referrer + landing
 * path + timestamp. No-ops if a valid record already exists: first touch
 * wins for the full 90-day window.
 */
export function captureAttributionOnLoad(): void {
  if (typeof window === 'undefined') return;
  try {
    if (readStorage()) return; // already have a valid first touch

    const params = new URL(window.location.href).searchParams;
    const attribution: Attribution = {
      referrer: (document.referrer || '').slice(0, MAX_FIELD_LEN),
      landing_path: (window.location.pathname || '/').slice(0, MAX_FIELD_LEN),
      timestamp: Date.now(),
    };
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) attribution[key] = value.slice(0, MAX_FIELD_LEN);
    }
    writeStorage(attribution);
  } catch {
    // Best-effort only.
  }
}

/** The currently stored first-touch attribution, or null if none/expired. */
export function getStoredAttribution(): Attribution | null {
  return readStorage();
}

/** UTM params only, formatted for a GA4 event's `params` object. */
export function getAttributionEventParams(): Partial<Record<UtmKey, string>> {
  const stored = getStoredAttribution();
  if (!stored) return {};
  const params: Partial<Record<UtmKey, string>> = {};
  for (const key of UTM_KEYS) {
    const value = stored[key];
    if (value) params[key] = value;
  }
  return params;
}

/** UTM params only, formatted to spread into the /api/subscribe request body. */
export function getAttributionSubscribeFields(): Partial<Record<UtmKey, string>> {
  return getAttributionEventParams();
}
