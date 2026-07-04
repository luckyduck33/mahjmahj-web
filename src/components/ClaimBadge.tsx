import { CLAIM_COPY } from '@/lib/claim';

// The "managed by organizer" badge shown on a listing whose organizer has
// claimed it. TRUST: this is an authorship marker, NOT an endorsement or
// accuracy guarantee. All copy comes from CLAIM_COPY (audited in one place).
// Intentionally NOT a checkmark/shield — those read as verification/approval.
export function ClaimBadge() {
  return (
    <span
      className="claim-badge"
      title={CLAIM_COPY.badgeExplainer}
      aria-label={`${CLAIM_COPY.badgeLabel}. ${CLAIM_COPY.badgeExplainer}`}
    >
      {/* A mahjong tile with a small "hand"/person mark inside = "an organizer
          keeps this tile" — brand-native (mirrors the tile motif elsewhere on
          the site), and deliberately NOT a checkmark/shield = not "approved". */}
      <svg
        width="11"
        height="12"
        viewBox="0 0 20 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* tile body */}
        <rect x="2" y="2" width="16" height="20" rx="3" />
        {/* person mark inside the tile */}
        <circle cx="10" cy="9.5" r="2.4" />
        <path d="M6 17c0-2.2 1.8-3.6 4-3.6s4 1.4 4 3.6" />
      </svg>
      {CLAIM_COPY.badgeLabel}
    </span>
  );
}
