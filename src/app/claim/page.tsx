import type { Metadata } from 'next';
import Link from 'next/link';
import { ClaimForm } from '@/components/ClaimForm';
import { CLAIM_COPY } from '@/lib/claim';

export const metadata: Metadata = {
  title: 'Claim Your Listing',
  description:
    'Run a mahjong game, group, or event? Claim your listing on MAHJ MAHJ to manage its details. Claiming is not an endorsement — it lets the organizer keep venue, time, and cost accurate.',
  alternates: { canonical: 'https://mahjmahj.co/claim' },
  robots: { index: false, follow: true }, // ops/utility page, not a ranking target
  openGraph: {
    title: 'Claim Your Listing | MAHJ MAHJ',
    description: 'Organizers can claim and manage their listing details on MAHJ MAHJ.',
    url: 'https://mahjmahj.co/claim',
    siteName: 'MAHJ MAHJ',
  },
};

interface Props {
  searchParams: Promise<{ listing?: string; organizer?: string; city?: string }>;
}

export default async function ClaimPage({ searchParams }: Props) {
  const { listing, organizer, city } = await searchParams;

  return (
    <>
      <section className="content-hero">
        <div className="content-hero-inner">
          <Link
            href="/events"
            style={{
              color: 'var(--terra)',
              fontSize: '0.85rem',
              textDecoration: 'none',
              marginBottom: '1rem',
              display: 'inline-block',
            }}
          >
            &larr; Back to Events
          </Link>
          <p className="content-hero-label">For Organizers</p>
          <h1>{CLAIM_COPY.formHeading}</h1>
          <p className="content-hero-subtitle">{CLAIM_COPY.formIntro}</p>
          <div className="content-hero-divider" />
        </div>
      </section>

      <section style={{ background: 'var(--linen)', padding: '3rem 1.5rem 4rem' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          {/* How it works — set expectations honestly before the form. */}
          <div className="claim-how">
            <p className="claim-how-eyebrow">How claiming works</p>
            <p>{CLAIM_COPY.formNext}</p>
          </div>

          <ClaimForm listingId={listing} organizerName={organizer} city={city} />
        </div>
      </section>
    </>
  );
}
