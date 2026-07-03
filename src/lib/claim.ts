// Claim-flow v1 — email/DM handshake for organizers to CLAIM their listing.
//
// TRUST RULES (P0 — non-negotiable):
// - "Claimed" means the ORGANIZER manages their own listing info. It is NOT a
//   MAHJ MAHJ endorsement, and it is NOT a claim that the information is
//   accurate or approved by us. Never render "verified", "endorsed",
//   "official", "trusted", or "approved" against a claimed listing.
// - The ONLY meaning we assert is authorship/management: the organizer of this
//   listing has identified themselves and now maintains the details.
// - All user-facing copy for the claimed state lives here so a reviewer can
//   audit the language in one place and the render layer can't drift.
//
// v1 verification is a manual email/DM handshake (see CLAIM_FLOW in the spec):
// the contact channel on the claim request must match the one published on the
// organizer's own site/IG/Eventbrite before anyone flips the managed flag.
// There is NO auth system, NO accounts, NO passwords.

import { randomBytes, createHash } from 'crypto';

// ── Trust-safe copy (single source of truth for the claimed state) ──────────
// Audited language. If you need new copy for this state, add it HERE and keep
// it endorsement-free.
export const CLAIM_COPY = {
  // The badge shown on a listing whose organizer manages it.
  badgeLabel: 'Managed by organizer',
  // One-line explanation surfaced near the badge / in a tooltip.
  badgeExplainer:
    'The organizer of this listing manages its details. This is not a MAHJ MAHJ endorsement or a guarantee of accuracy.',
  // CTA that starts the handshake, shown on unclaimed listings.
  claimCta: 'Are you the organizer?',
  // Heading + intro on the claim form page.
  formHeading: 'Claim your listing',
  formIntro:
    'If you run this game, group, or event, you can take over managing its details on MAHJ MAHJ. Claiming lets you keep venue, time, cost, and description accurate — it does not make your listing a MAHJ MAHJ endorsement.',
  // What we tell them happens next (sets expectations honestly).
  formNext:
    'We confirm claims by matching the contact you give us to the one already published on your own site, Instagram, or ticketing page. No accounts, no passwords. We will reach out to that channel before your listing shows as managed by you.',
  successHeading: 'Claim received',
  successBody:
    'Thanks — we have your request. We will reach out to the contact you gave us to confirm you run this listing before it shows as managed by the organizer.',
} as const;

// Roles an organizer can self-identify as on the claim form.
export const CLAIM_ROLES = [
  'Organizer / host',
  'Venue or club',
  'Co-organizer',
  'Other',
] as const;
export type ClaimRole = (typeof CLAIM_ROLES)[number];

// Contact channel the organizer wants us to verify against.
export const CLAIM_CHANNELS = ['Email', 'Instagram', 'Website', 'Other'] as const;
export type ClaimChannel = (typeof CLAIM_CHANNELS)[number];

export interface ClaimRequestInput {
  // What they are claiming. At least one must be present.
  listingId?: string; // event id, when claimed from an event
  organizerName: string; // the organizer / group / business name
  city?: string;
  // Who they are.
  contactName: string;
  role: ClaimRole;
  channel: ClaimChannel;
  contactValue: string; // email address, IG handle, or URL
  listingsNote?: string; // free text: "these are mine" / links
}

export interface ClaimRequest extends ClaimRequestInput {
  // Server-assigned fields.
  token: string; // opaque public token (goes in the confirmation URL / ops queue)
  tokenHash: string; // sha256(token) — what we persist for lookup; raw token is not stored
  status: 'pending'; // v1 only ever writes 'pending'; a human flips it later
  createdAt: string; // ISO
}

// Opaque, URL-safe token. The raw value is returned to the requester once and
// referenced in the ops queue; we persist only its hash so a leaked store
// can't be used to impersonate a pending claim.
export function generateClaimToken(): { token: string; tokenHash: string } {
  const token = randomBytes(24).toString('base64url');
  const tokenHash = createHash('sha256').update(token).digest('hex');
  return { token, tokenHash };
}

// ── Validation (server-side; the form also validates client-side) ───────────
export interface ValidationResult {
  ok: boolean;
  errors: string[];
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateClaimInput(input: Partial<ClaimRequestInput>): ValidationResult {
  const errors: string[] = [];
  if (!input.organizerName || input.organizerName.trim().length < 2) {
    errors.push('Organizer or group name is required.');
  }
  if (!input.contactName || input.contactName.trim().length < 2) {
    errors.push('Your name is required.');
  }
  if (!input.role || !CLAIM_ROLES.includes(input.role as ClaimRole)) {
    errors.push('Please pick your role.');
  }
  if (!input.channel || !CLAIM_CHANNELS.includes(input.channel as ClaimChannel)) {
    errors.push('Please pick a contact channel.');
  }
  const val = (input.contactValue || '').trim();
  if (!val) {
    errors.push('A contact (email, Instagram, or link) is required.');
  } else if (input.channel === 'Email' && !EMAIL_RE.test(val)) {
    errors.push('That does not look like a valid email address.');
  } else if (val.length > 200) {
    errors.push('Contact value is too long.');
  }
  // Length guards on free text to keep the store and ops queue clean.
  if ((input.organizerName || '').length > 160) errors.push('Organizer name is too long.');
  if ((input.listingsNote || '').length > 2000) errors.push('Notes are too long.');
  return { ok: errors.length === 0, errors };
}

// Normalize a raw form body into a typed input, trimming strings.
export function normalizeClaimInput(body: Record<string, unknown>): Partial<ClaimRequestInput> {
  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : undefined);
  return {
    listingId: str(body.listingId),
    organizerName: str(body.organizerName) ?? '',
    city: str(body.city),
    contactName: str(body.contactName) ?? '',
    role: str(body.role) as ClaimRole,
    channel: str(body.channel) as ClaimChannel,
    contactValue: str(body.contactValue) ?? '',
    listingsNote: str(body.listingsNote),
  };
}
