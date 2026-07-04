// Email-signup domain logic — validation, normalization, and UI copy for the
// marketing-site newsletter capture. Deliberately mirrors the shape of
// `src/lib/claim.ts` so the two form flows stay consistent.
//
// This is a low-friction capture: email is the only required field. City is an
// optional hint we use to point new subscribers at their local /events/[city]
// page in the welcome flow. `source` records which surface converted them
// (homepage band vs. site footer) for funnel analytics — it is not user input.

export interface SubscribeInput {
  email: string;
  city?: string;
  source?: string;
}

export const SUBSCRIBE_SOURCES = ['homepage', 'footer', 'unknown'] as const;
export type SubscribeSource = (typeof SUBSCRIBE_SOURCES)[number];

// Pragmatic email check. We are not trying to fully implement RFC 5322 — that
// rejects valid addresses and accepts nonsense. This catches the common typos
// (no @, no dot, trailing spaces) and defers real deliverability to the ESP.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const MAX_EMAIL = 254; // RFC 5321 max length for an email address
const MAX_CITY = 80;

export function normalizeSubscribeInput(body: Record<string, unknown>): SubscribeInput {
  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
  const rawSource = str(body.source).toLowerCase();
  const source = (SUBSCRIBE_SOURCES as readonly string[]).includes(rawSource)
    ? rawSource
    : 'unknown';
  return {
    email: str(body.email).toLowerCase(),
    city: str(body.city) || undefined,
    source,
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
