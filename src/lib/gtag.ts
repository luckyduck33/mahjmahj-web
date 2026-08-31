// Thin GA4 (gtag.js) event helper. The gtag script + config live in
// src/app/layout.tsx (measurement id G-W1TBW9XH3N, shared with the mahj-mahj
// app per this repo's CLAUDE.md); this file only fires events from client
// code.
//
// Modeled on Lucid Numbers' lib/gtag.ts (Acquisition Mission 001, E1
// experiment) — this repo had no gtag helper before this file (confirmed:
// `grep -rn "gtag(" src` only matched the three init calls in layout.tsx).
//
// Safe to call anywhere: if gtag hasn't loaded (ad-blocker, SSR) the call
// no-ops instead of throwing. Never blocks the user flow it is measuring.

import { getAttributionEventParams } from '@/lib/attribution';

export const GA_MEASUREMENT_ID = 'G-W1TBW9XH3N';

type GtagFn = (command: string, eventName: string, params?: Record<string, unknown>) => void;

function getGtag(): GtagFn | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as { gtag?: GtagFn };
  return typeof w.gtag === 'function' ? w.gtag : null;
}

/**
 * Fire a GA4 event. No-ops when gtag is unavailable.
 */
export function trackEvent(eventName: string, params?: Record<string, unknown>): void {
  try {
    getGtag()?.('event', eventName, params);
  } catch {
    // Analytics must never break the flow it measures.
  }
}

/**
 * Fire GA4's recommended `sign_up` event on a successful /api/subscribe
 * call. `method` carries the same `source` tag written to Beehiiv/Notion
 * (src/lib/subscribe.ts SUBSCRIBE_SOURCES) so signups can be sliced by
 * on-site surface in GA4. Carries the visitor's stored first-touch UTM
 * attribution (lib/attribution.ts), if any, as extra event params so
 * signups can also be sliced by acquisition channel.
 */
export function trackSignUp(source: string): void {
  trackEvent('sign_up', {
    method: source,
    ...getAttributionEventParams(),
  });
}
