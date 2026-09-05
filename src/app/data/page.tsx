import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, orgSchema } from '@/lib/schema';
import { buildEventsDataset, CC_BY_URL, CONTACT_EMAIL, DATA_LANDING_PATH } from '@/lib/dataset';
import { dataLandingDatasetSchema, DATA_DOWNLOADS } from '@/lib/dataset-schema';

export const revalidate = 3600;

const TITLE = 'Mahjong Event & City Index: Open Dataset';
const DESCRIPTION =
  "Download MAHJ MAHJ's mahjong event and city index as CSV or JSON: public event listings and the site's city manifest, CC-BY 4.0 licensed, with a suggested citation and changelog.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `https://mahjmahj.co${DATA_LANDING_PATH}` },
  openGraph: {
    title: `${TITLE} | MAHJ MAHJ`,
    description: DESCRIPTION,
    type: 'article',
    url: `https://mahjmahj.co${DATA_LANDING_PATH}`,
  },
};

const wrap = { maxWidth: '760px', margin: '0 auto' } as const;
const h2 = {
  fontFamily: 'var(--font-heading)',
  fontSize: '1.5rem',
  color: 'var(--espresso)',
  margin: '2.5rem 0 0.75rem',
} as const;
const h3 = {
  fontFamily: 'var(--font-heading)',
  fontSize: '1.15rem',
  color: 'var(--espresso)',
  margin: '1.5rem 0 0.5rem',
} as const;
const p = {
  fontSize: '1.0625rem',
  lineHeight: 1.75,
  color: 'var(--walnut)',
  margin: '0 0 1rem',
} as const;
const li = { ...p, margin: '0 0 0.5rem' } as const;
const small = { fontSize: '0.85rem', color: 'var(--walnut)', opacity: 0.8 } as const;

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

// Packaging log for this download artifact itself (the page, the versioned
// CSV/JSON, the CC-BY headers) — started today because today is genuinely
// when this artifact was first published. No earlier packaging history
// exists to backfill. Add an entry here only when the download's own
// format/fields materially change, newest first.
const PACKAGING_LOG: { date: string; note: string }[] = [
  {
    date: '2026-09-05',
    note: 'First publication of this dataset landing page and the /api/events.json and /api/events.csv downloads (the site\'s existing event and city data, packaged with CC-BY 4.0 license and citation metadata). No event or city data changed; this entry documents the packaging.',
  },
];

const FAQ_ITEMS = [
  {
    q: 'What is the MAHJ MAHJ Event & City Index?',
    a: "The same public event listings and city manifest the site's own /events and /events/{city} pages render, published here as a direct CSV and JSON download rather than as an HTML page.",
  },
  {
    q: 'How often is the dataset updated?',
    a: 'Event and news listings shown on MAHJ MAHJ are aggregated from public sources, and the website re-fetches that live feed at most once an hour before serving it (Next.js revalidate: 3600), the same caching window the rest of the site uses. The dataset does not update on a fixed calendar schedule beyond that; it reflects whatever the live events feed currently returns.',
  },
  {
    q: 'Can I use this data? What license is it under?',
    a: `Yes. The dataset is licensed CC-BY 4.0 (${CC_BY_URL}). You can copy, redistribute, and adapt it for any purpose, including commercially, as long as you give attribution to MAHJ MAHJ and link back to the source.`,
  },
  {
    q: 'Does this include the recurring club-published schedules shown on city pages?',
    a: "No. Each city's events page also lists standing club games published directly on the clubs' own sites, kept visually separate and labeled as the clubs' own schedules rather than MAHJ MAHJ listings. That smaller, separately curated list is out of scope for this download.",
  },
  {
    q: 'Where do I report an error in the dataset?',
    a: `Email ${CONTACT_EMAIL} with the record and what you believe is wrong.`,
  },
];

export default async function DataPage() {
  const ds = await buildEventsDataset();

  const trail = [
    { name: 'Home', url: 'https://mahjmahj.co' },
    { name: 'Data', url: `https://mahjmahj.co${DATA_LANDING_PATH}` },
  ];

  const faqSchemaObj = {
    '@context': 'https://schema.org' as const,
    '@type': 'FAQPage' as const,
    mainEntity: FAQ_ITEMS.map((f) => ({
      '@type': 'Question' as const,
      name: f.q,
      acceptedAnswer: { '@type': 'Answer' as const, text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={[dataLandingDatasetSchema(ds), faqSchemaObj, breadcrumbSchema(trail), orgSchema()]} />

      <section style={{ backgroundColor: 'var(--sand)', padding: '3.5rem 1.5rem' }}>
        <div style={{ ...wrap, textAlign: 'center' }}>
          <p style={{ ...small, textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 600, marginBottom: '0.75rem' }}>
            Open Dataset &middot; CC-BY 4.0
          </p>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3.25rem)', color: 'var(--espresso)', margin: 0 }}>
            {TITLE}
          </h1>
          <p style={{ ...p, margin: '1rem 0 0', color: 'var(--espresso)' }}>
            {ds.last_updated ? (
              <>Data last updated {formatDate(ds.last_updated)}</>
            ) : (
              <>Data freshness unavailable right now</>
            )}
            {ds.dataset_version ? <> &middot; version {ds.dataset_version}</> : null}
          </p>
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--linen)', padding: '3rem 1.5rem 4.5rem' }}>
        <div style={wrap}>
          <p style={p}>
            MAHJ MAHJ&rsquo;s <Link href="/events" style={{ color: 'var(--teal)' }}>Events</Link> section
            is built on {ds.event_count} current event {ds.event_count === 1 ? 'record' : 'records'} across{' '}
            {ds.city_count} tracked {ds.city_count === 1 ? 'city' : 'cities'}. This page is the direct,
            machine-readable download of that same event and city data, published in the same order and
            from the same live feed the site&rsquo;s own{' '}
            <Link href="/events" style={{ color: 'var(--teal)' }}>Events</Link> and city pages render, so a
            journalist, researcher, or another AI system can cite it as a source without scraping an HTML
            page.
          </p>

          <h2 style={h2}>Download</h2>
          <p style={p}>
            Both files carry the same event and city records, from the same fetch, with the same license
            and citation metadata embedded in the file itself.
          </p>
          <ul style={{ paddingLeft: '1.25rem' }}>
            {DATA_DOWNLOADS.map((d) => (
              <li key={d.path} style={li}>
                <strong>{d.format}:</strong>{' '}
                <a href={d.path} style={{ color: 'var(--teal)' }}>
                  <code>{d.path}</code>
                </a>{' '}
                <span style={{ ...small }}>({d.encodingFormat})</span>
              </li>
            ))}
          </ul>
          <p style={small}>
            Current dataset version: <strong>{ds.dataset_version ?? 'unavailable'}</strong>. The version
            string is derived from the live feed&rsquo;s own freshness timestamp; it changes only when the
            underlying event data does.
          </p>

          <h2 style={h2}>How it&rsquo;s compiled</h2>
          <p style={p}>
            Event and news listings shown on MAHJ MAHJ are aggregated from public sources. The website
            re-fetches that live feed at most once an hour before serving it, the same caching window used
            across the rest of the site, and this dataset reads from that same fetch. It is not a separate
            copy that can drift out of sync with what a visitor sees on the site.
          </p>
          <p style={p}>
            The city list is MAHJ MAHJ&rsquo;s own tracked-city manifest: every listed city gets a page even
            before any event has been scraped for it, so a city can appear here with an event count of zero.
            Any additional city that only exists because an event was found there is included too, alongside
            the tracked manifest.
          </p>
          <p style={p}>
            Each city&rsquo;s events page also lists standing club games published directly on the clubs&rsquo;
            own sites, shown separately and labeled as the clubs&rsquo; own schedules. That list has different
            provenance from the scraped event listings above and is not part of this download.
          </p>

          <h2 style={h2}>License</h2>
          <p style={p}>
            This dataset is licensed{' '}
            <a href={CC_BY_URL} rel="noopener" target="_blank" style={{ color: 'var(--teal)' }}>
              Creative Commons Attribution 4.0 International (CC-BY 4.0)
            </a>
            . You may copy, redistribute, and adapt this data for any purpose, including commercially,
            provided you give appropriate credit to MAHJ MAHJ, link back to this page, and indicate if
            changes were made.
          </p>

          <h2 style={h2}>Suggested citation</h2>
          <p
            style={{
              ...p,
              fontFamily: 'var(--font-mono, monospace)',
              background: 'var(--sand)',
              borderLeft: '3px solid var(--teal)',
              padding: '0.875rem 1.125rem',
              fontSize: '0.95rem',
            }}
          >
            MAHJ MAHJ, Mahjong Event &amp; City Index, https://mahjmahj.co{DATA_LANDING_PATH}
          </p>

          <h2 style={h2}>Changelog</h2>
          <h3 style={h3}>Dataset packaging</h3>
          <p style={small}>
            Changes to this download artifact itself, its format, fields, license metadata, or this landing
            page.
          </p>
          <ul style={{ paddingLeft: '1.25rem' }}>
            {PACKAGING_LOG.map((entry) => (
              <li key={entry.date} style={li}>
                <strong>{formatDate(entry.date)}:</strong> {entry.note}
              </li>
            ))}
          </ul>
          <p style={small}>
            This log starts on the date this page was first published. It is not backfilled with earlier
            packaging changes, none were tracked before this page existed.
          </p>

          <h3 style={h3}>Event &amp; city data</h3>
          <p style={p}>
            The underlying event and city records are not append-only and carry no per-record change
            history today, so there is nothing to list here yet beyond the packaging entry above. If that
            changes, real per-record history will appear in this section, dated.
          </p>

          <h2 style={h2}>Contact</h2>
          <p style={p}>
            Questions about this dataset, or a suspected error in a record, can be sent to{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'var(--teal)' }}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>

          <h2 style={h2}>Frequently Asked Questions</h2>
          {FAQ_ITEMS.map((f, i) => (
            <details key={f.q} open={i === 0} style={{ margin: '0 0 0.75rem' }}>
              <summary style={{ ...p, margin: 0, cursor: 'pointer', fontWeight: 600, color: 'var(--espresso)' }}>
                {f.q}
              </summary>
              <p style={{ ...p, margin: '0.5rem 0 0' }}>{f.a}</p>
            </details>
          ))}

          <h2 style={h2}>Related</h2>
          <ul style={{ paddingLeft: '1.25rem' }}>
            <li style={li}>
              <Link href="/events" style={{ color: 'var(--teal)' }}>Events, the live listing pages</Link>
            </li>
            <li style={li}>
              <Link href="/about" style={{ color: 'var(--teal)' }}>About MAHJ MAHJ</Link>
            </li>
            <li style={li}>
              <Link href="/privacy" style={{ color: 'var(--teal)' }}>Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
