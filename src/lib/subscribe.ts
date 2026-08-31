// Email-signup domain logic — validation, normalization, and UI copy for the
// marketing-site newsletter capture. Deliberately mirrors the shape of
// `src/lib/claim.ts` so the two form flows stay consistent.
//
// This is a low-friction capture: email is the only required field. City is an
// optional hint we use to point new subscribers at their local /events/[city]
// page in the welcome flow. `source` records which surface converted them
// (homepage band vs. site footer) for funnel analytics — it is not user input.
//
// utm_* fields (added for Mission 002 M3, "signup measurement"): the
// visitor's first-touch UTM attribution (src/lib/attribution.ts), forwarded
// by the client from localStorage — not read from the request itself. Like
// `source`, these are first-party provenance, not freeform user input.

import { UTM_KEYS, type UtmKey } from '@/lib/attribution';

export interface SubscribeInput {
  email: string;
  city?: string;
  source?: string;
  utm?: Partial<Record<UtmKey, string>>;
}

// Flat, fixed sources (one surface, no per-page split needed) plus a small set
// of "<surface>:<slug>" prefixes for surfaces where we want to see which exact
// page converts (e.g. `city:los-angeles`, `styles:taiwanese-mahjong`,
// `learn:how-to-play-mahjong`). Slugs already come from route params / the
// city manifest, so this just mirrors existing routing — no new slug list to
// maintain here. Anything that doesn't match either form collapses to
// 'unknown' rather than being passed through as arbitrary freeform text.
export const SUBSCRIBE_SOURCES = [
  'homepage',
  'footer',
  'compare',
  'kit-preview',
  'kit-waitlist',
  'app_onboarding',
  'events',
  'research_page',
  'unknown',
] as const;
export type SubscribeSource = (typeof SUBSCRIBE_SOURCES)[number];
const SUBSCRIBE_SOURCE_PREFIXES = ['city', 'styles', 'learn'] as const;
const SOURCE_PREFIX_RE = new RegExp(`^(${SUBSCRIBE_SOURCE_PREFIXES.join('|')}):[a-z0-9-]{1,60}$`);

function normalizeSource(raw: string): string {
  if ((SUBSCRIBE_SOURCES as readonly string[]).includes(raw)) return raw;
  if (SOURCE_PREFIX_RE.test(raw)) return raw;
  return 'unknown';
}

// Pragmatic email check. We are not trying to fully implement RFC 5322 — that
// rejects valid addresses and accepts nonsense. This catches the common typos
// (no @, no dot, trailing spaces) and defers real deliverability to the ESP.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const MAX_EMAIL = 254; // RFC 5321 max length for an email address
const MAX_CITY = 80;
const MAX_UTM_FIELD = 200; // matches the cap applied when captured client-side (lib/attribution.ts)

// Same allowlist-or-drop posture as normalizeSource: only known utm_* keys
// are accepted, values are trimmed and length-capped, and anything else
// (extra keys, non-string values) is silently dropped rather than passed
// through as arbitrary freeform text.
function normalizeUtm(body: Record<string, unknown>): Partial<Record<UtmKey, string>> | undefined {
  const utm: Partial<Record<UtmKey, string>> = {};
  for (const key of UTM_KEYS) {
    const value = body[key];
    if (typeof value === 'string' && value.trim()) {
      utm[key] = value.trim().slice(0, MAX_UTM_FIELD);
    }
  }
  return Object.keys(utm).length > 0 ? utm : undefined;
}

export function normalizeSubscribeInput(body: Record<string, unknown>): SubscribeInput {
  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
  const rawSource = str(body.source).toLowerCase();
  const source = normalizeSource(rawSource);
  return {
    email: str(body.email).toLowerCase(),
    city: str(body.city) || undefined,
    source,
    utm: normalizeUtm(body),
  };
}

export function validateSubscribeInput(input: SubscribeInput): {
  ok: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  if (!input.email) {
    errors.push('Email is required.');
  } else if (input.email.length > MAX_EMAIL) {
    errors.push('That email address is too long.');
  } else if (!EMAIL_RE.test(input.email)) {
    errors.push('Please enter a valid email address.');
  }
  if (input.city && input.city.length > MAX_CITY) {
    errors.push('That city name is too long.');
  }
  return { ok: errors.length === 0, errors };
}

export interface SubscribeRecord extends SubscribeInput {
  createdAt: string;
}

// Centralized UI copy so the homepage band and footer form read identically and
// stay on-brand. MAHJ MAHJ voice: warm, plain, community-first — no growth-hack
// urgency, no "join 10,000 players" claims we can't source (Source-of-Truth Gate).
export const SUBSCRIBE_COPY = {
  eyebrow: 'Join the Club',
  heading: 'Get mahjong in your inbox',
  body: 'New events in your city, plus rules and strategy for Hong Kong, Taiwanese, and American play. No spam — unsubscribe anytime.',
  emailPlaceholder: 'you@example.com',
  cityPlaceholder: 'Your city (optional)',
  submitIdle: 'Sign Up',
  submitBusy: 'Signing up…',
  successHeading: "You're on the list.",
  // Deliberately does NOT promise a confirmation email — the current sink
  // (Notion) sends none; only the MailerLite sink does. Kept true regardless of
  // which sink is active. Revisit this copy when MailerLite double opt-in is on.
  successBody: 'We only send when there is something worth playing — new events in your city, and the occasional strategy note.',
  footerHeading: 'Get the newsletter',
} as const;

// Copy for the contextual "learn" placement (compare/styles/learn pages —
// EmailSignup variant="learn"). One shared angle across all learning-track
// pages; the per-page distinction lives in the `source` prop, not the copy.
export const LEARN_SIGNUP_COPY = {
  eyebrow: 'One Lesson a Week',
  heading: 'Learning the game?',
  body: 'Get one clear mahjong lesson in your inbox each week — rules, strategy, and the occasional event near you. No spam — unsubscribe anytime.',
} as const;

// Copy builder for the contextual "city" placement (EmailSignup variant="city").
// Takes the display city name so the heading/body read naturally per page.
export function citySignupCopy(cityName: string) {
  return {
    eyebrow: 'Join the Club',
    heading: `New ${cityName} games land here first`,
    body: `Get new ${cityName} mahjong events in your inbox — before they hit the calendar. No spam — unsubscribe anytime.`,
  } as const;
}

// Copy for the free-preview capture on /guides/mahjong-night
// (EmailSignup variant="kit-preview"). Subscribing unlocks the direct
// download link to the two-piece preview PDF — see EmailSignup's
// `downloadUrl` prop for how the success state changes for this variant.
export const KIT_PREVIEW_SIGNUP_COPY = {
  eyebrow: 'Free Preview',
  heading: 'Try two pieces of the kit first',
  body: 'Get the full Run of Night timeline and one Cheat Sheet. Print both, run your first hour off them, and see whether the pacing and the reference sheet hold up at your table.',
} as const;

// Copy for the "launching soon" waitlist capture on /guides/mahjong-night
// (EmailSignup variant="kit-waitlist"), shown in place of the buy button
// while NEXT_PUBLIC_KIT_PAYMENT_LINK is unset.
export const KIT_WAITLIST_SIGNUP_COPY = {
  eyebrow: 'Launching Soon',
  heading: 'Be first when it launches',
  body: 'The Mahjong Night Kit isn’t live yet. Leave your email and we’ll let you know the moment it is — no spam, unsubscribe anytime.',
} as const;

// Copy for the /events hub capture (EmailSignup variant="events"). The hub
// spans every city in the manifest, not just one, so — unlike
// citySignupCopy's single-city framing — this stays scope-honest about
// covering every tracked city while keeping the "weekly" cadence language
// already established by LEARN_SIGNUP_COPY above.
export const EVENTS_HUB_SIGNUP_COPY = {
  eyebrow: 'Join the Club',
  heading: 'New mahjong events, weekly',
  body: 'New games from every city we track (LA, the Bay, NYC, and beyond) land in your inbox weekly. No spam. Unsubscribe anytime.',
} as const;

// Copy for the research/census page capture (EmailSignup variant="research",
// source="research_page"). The census is a snapshot, not a live feed (see the
// page's own "Snapshot, not a live feed" methodology note), so the signup
// pitch is honestly about the next snapshot and any repeat data work, not a
// generic newsletter angle.
export const RESEARCH_SIGNUP_COPY = {
  eyebrow: 'Open Data',
  heading: 'Get the next snapshot first',
  body: 'When we publish a new census, refresh the dataset, or take a repeat snapshot, you will hear about it here first. No spam. Unsubscribe anytime.',
} as const;
