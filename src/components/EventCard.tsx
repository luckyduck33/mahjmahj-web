import Link from 'next/link';
import type { MahjEvent } from '@/lib/api';
import { ClaimBadge } from '@/components/ClaimBadge';
import { CLAIM_COPY } from '@/lib/claim';

interface Props {
  evt: MahjEvent;
  /** Whether a confirmed organizer already manages this listing (shows ClaimBadge). */
  organizerClaimed?: boolean;
  /** "Are you the organizer?" link target, shown when the listing is unclaimed. */
  claimHref?: string;
}

// Card anatomy (P3): mono date-time line -> title (2-line clamp) -> venue +
// address one Inter line -> chips row (style/cost) -> truncated description.
// The whole card is one tap target: every field lives inside a single block
// link to the event's primary action (registration link, else Instagram).
// The low-emphasis claim-cta-link sits outside that link as its own small
// anchor so no <a> is ever nested inside another.
export function EventCard({ evt, organizerClaimed, claimHref }: Props) {
  const hasDate = !!evt.date;
  let dateTimeLine = evt.recurring || 'Recurring';
  if (hasDate) {
    const dateObj = new Date(evt.date);
    const monthAbbr = dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const dayNum = dateObj.getDate();
    const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
    dateTimeLine = `${monthAbbr} ${dayNum} · ${weekday}${evt.time ? ` · ${evt.time}` : ''}`;
  }

  const metaLine = [evt.venue, evt.streetAddress].filter(Boolean).join(' · ');

  const primaryHref =
    evt.registrationLink ||
    (evt.instagramHandle ? `https://instagram.com/${evt.instagramHandle.replace('@', '')}` : undefined);
  const ctaLabel = evt.registrationLink ? 'View Details' : evt.instagramHandle ? 'Instagram' : 'Check organizer';

  const body = (
    <>
      <p className="event-datetime">{dateTimeLine}</p>
      <h2 className="event-title">{evt.title}</h2>
      {organizerClaimed && <ClaimBadge />}
      {metaLine && <p className="event-meta">{metaLine}</p>}
      {(evt.style || evt.cost) && (
        <div className="event-chips">
          {evt.style && (
            <span className="event-chip event-style" data-style={evt.style}>
              {evt.style}
            </span>
          )}
          {evt.cost && <span className="event-chip-cost">{evt.cost}</span>}
        </div>
      )}
      {evt.description && (
        <p className="event-desc">
          {evt.description.length > 150 ? evt.description.slice(0, 150) + '…' : evt.description}
        </p>
      )}
      <span className={`event-cta-label${!primaryHref ? ' event-cta-label--muted' : ''}`}>{ctaLabel}</span>
    </>
  );

  return (
    <div className="event-card">
      {primaryHref ? (
        <a href={primaryHref} target="_blank" rel="noopener noreferrer" className="event-card-link">
          {body}
        </a>
      ) : (
        <div className="event-card-link">{body}</div>
      )}
      {claimHref && !organizerClaimed && (
        <Link href={claimHref} className="claim-cta-link">
          {CLAIM_COPY.claimCta}
        </Link>
      )}
    </div>
  );
}

export default EventCard;
