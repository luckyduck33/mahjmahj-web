// Organizer manifest — the render-side source of truth for the claim-flow's
// "managed by organizer" state on mahjmahj.co.
//
// TRUST RULES (P0 — Source-of-Truth Gate):
// - An entry here means ONE thing: the named organizer completed the claim
//   handshake and now manages this listing's details. It is NOT a MAHJ MAHJ
//   endorsement, ranking, or accuracy guarantee. The badge copy
//   (src/lib/claim.ts CLAIM_COPY) is deliberately endorsement-free.
// - `claimedAt` records the date a human confirmed the handshake (contact
//   matched the channel the organizer already publishes). No entry may be
//   added without that manual confirmation — do not pre-populate "expected"
//   organizers here.
// - This mirrors the additive, Notion-first pattern in recurring-games.ts and
//   cities.ts: the website reads a curated manifest; scrapers never write it.
//
// v1 is intentionally small. The eventual flow (spec V2) is: claim request →
// ops queue (src/data or Notion) → human confirms → an entry lands here (or is
// synced from the Organizers Notion DB) → the badge + profile page light up.
//
// Matching: a listing is "managed" when its event maps to an organizer here.
// v1 matches on explicit event ids in `listingIds` (exact, no fuzzy matching —
// we never guess that a scraped event belongs to a claimed organizer).

export interface Organizer {
  slug: string; // /organizers/[slug] (profile page — spec item 2, later phase)
  // The organizer's PUBLIC business name, exactly as they brand themselves.
  // Per the spec's open question, profiles use the organizer's self-chosen
  // public name (e.g. "Boston Mahjong (Abby)") — that is their identity, not
  // MAHJ MAHJ editorial copy. Pending Nidhi's final call on personal names.
  name: string;
  city?: string;
  // Event ids (from the events API) this organizer has claimed + we confirmed.
  listingIds: string[];
  // Optional public links the organizer asked us to surface on their profile.
  website?: string;
  instagram?: string; // handle without the @
  bookingUrl?: string;
  // Provenance of the claim confirmation (audit trail; not rendered).
  claimedAt: string; // YYYY-MM-DD a human confirmed the handshake
  claimChannel: string; // channel we matched against (e.g. "Instagram @handle")
}

// v1 ships with NO confirmed organizers. The scaffolding, matching, and UI are
// live; entries land here only after a real handshake is confirmed. Keeping
// this empty (rather than seeding fake data) is a P0 trust requirement.
export const organizers: Organizer[] = [];

// Fast lookup: event id -> managing organizer (or undefined). Built once.
const byListingId: Map<string, Organizer> = (() => {
  const m = new Map<string, Organizer>();
  for (const o of organizers) {
    for (const id of o.listingIds) m.set(id, o);
  }
  return m;
})();

/** The organizer managing a given event listing, if one has claimed it. */
export function getOrganizerForListing(listingId?: string): Organizer | undefined {
  if (!listingId) return undefined;
  return byListingId.get(listingId);
}

/** Whether a given event listing is managed by a confirmed organizer. */
export function isListingManaged(listingId?: string): boolean {
  return !!getOrganizerForListing(listingId);
}

export function getOrganizerBySlug(slug: string): Organizer | undefined {
  return organizers.find((o) => o.slug === slug);
}
