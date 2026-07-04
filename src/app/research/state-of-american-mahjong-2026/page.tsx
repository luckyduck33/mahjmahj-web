import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import {
  datasetSchema,
  faqSchema,
  breadcrumbSchema,
  articleSchema,
} from '@/lib/schema';
import census from '@/data/census-2026-07.json';

const URL = 'https://mahjmahj.co/research/state-of-american-mahjong-2026';
const CSV = 'https://mahjmahj.co/data/state-of-american-mahjong-2026.csv';

// Human-readable snapshot date, computed from the committed data (no hardcoding).
const snapshotLabel = new Date(census.meta.snapshotDate + 'T00:00:00Z').toLocaleDateString(
  'en-US',
  { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' },
);

export const metadata: Metadata = {
  title: 'The State of American Mahjong 2026 — A Listings Census',
  description: `A structured count of ${census.headline.totalListings} live in-person mahjong listings tracked across ${census.headline.cities} US cities as of ${snapshotLabel}. Methodology, top cities, and a downloadable dataset.`,
  alternates: { canonical: URL },
  openGraph: {
    title: 'The State of American Mahjong 2026 — A Listings Census',
    description: `${census.headline.totalListings} tracked mahjong listings across ${census.headline.cities} US cities. Open data, transparent methodology.`,
    url: URL,
    type: 'article',
    siteName: 'MAHJ MAHJ',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The State of American Mahjong 2026',
    description: `${census.headline.totalListings} tracked mahjong listings across ${census.headline.cities} US cities. Open data.`,
  },
};

export const revalidate = 86400;

const faqs = [
  {
    question: 'How many mahjong events are there in the United States?',
    answer: `There is no official registry. MAHJ MAHJ tracked ${census.headline.totalListings} live in-person mahjong listings across ${census.headline.cities} US cities as of ${snapshotLabel}. This is a listings census of publicly findable events, not an estimate of all mahjong activity — many private and recurring games are never listed online.`,
  },
  {
    question: 'Which US city has the most mahjong activity?',
    answer: `By tracked listings, ${census.topCities[0].name} leads with ${census.topCities[0].listings}, followed by ${census.topCities[1].name} (${census.topCities[1].listings}) and ${census.topCities[2].name} (${census.topCities[2].listings}). Listing counts reflect where events are posted online, which favors cities with active organizers who publish on ticketing platforms.`,
  },
  {
    question: 'Is mahjong growing in the United States?',
    answer:
      'We do not publish a growth rate, because a single snapshot gives no basis for one. This census is a point-in-time count. As we take repeat snapshots, changes over time will be reported here with dates — but we will not claim a trend we have not measured.',
  },
  {
    question: 'Where does this data come from?',
    answer: `Listings are collected from public event pages — Eventbrite and Meetup, plus mahjong club and community-organization websites — and verified before inclusion. Cross-listing duplicates are removed. As of this snapshot, ${census.sourceDiversity.eventbriteSharePct}% of listings trace to Eventbrite, so the data is biased toward events that use online ticketing.`,
  },
  {
    question: 'Can I use or cite this data?',
    answer:
      'Yes. The aggregated dataset is published under a Creative Commons Attribution 4.0 license — download the CSV and cite "MAHJ MAHJ, State of American Mahjong 2026." Please link back to this page so readers can see the methodology and snapshot date.',
  },
];

const jsonLd = [
  articleSchema({
    headline: 'The State of American Mahjong 2026 — A Listings Census',
    description: `A structured count of ${census.headline.totalListings} live in-person mahjong listings tracked across ${census.headline.cities} US cities as of ${snapshotLabel}.`,
    url: URL,
    datePublished: '2026-07-03',
    dateModified: census.meta.lastVerified,
  }),
  datasetSchema({
    name: 'State of American Mahjong 2026 — listings census',
    description: `Aggregated counts of ${census.headline.totalListings} live in-person mahjong listings across ${census.headline.cities} US cities, tracked by MAHJ MAHJ as of ${snapshotLabel}. Listings-based census; not an estimate of total US mahjong activity.`,
    url: URL,
    dateModified: census.meta.lastVerified,
    temporalCoverage: census.meta.snapshotDate,
    downloadUrl: CSV,
    keywords: ['mahjong', 'United States', 'events', 'census', 'Hong Kong Mahjong', 'American Mahjong'],
  }),
  faqSchema(faqs),
  breadcrumbSchema([
    { name: 'MAHJ MAHJ', url: 'https://mahjmahj.co/' },
    { name: 'Research', url: 'https://mahjmahj.co/research/state-of-american-mahjong-2026' },
    { name: 'State of American Mahjong 2026', url: URL },
  ]),
];

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="census-stat">
      <span className="census-stat-num">{value}</span>
      <span className="census-stat-label">{label}</span>
    </div>
  );
}

export default function CensusPage() {
  const c = census;
  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero — editorial teal */}
      <section className="census-hero grain">
        <div className="sec-inner">
          <span className="label peri">Research · Open Data</span>
          <h1 className="census-h1">The State of American Mahjong 2026</h1>
          <p className="census-lede">
            A structured count of every in-person mahjong game MAHJ MAHJ could
            find listed online across the United States — with the methodology
            in plain view, so you can judge the numbers for yourself.
          </p>
          <p className="census-verified">
            Snapshot: {snapshotLabel} · {c.headline.totalListings} listings ·{' '}
            {c.headline.cities} cities ·{' '}
            <a href={CSV} className="census-inline-link">
              Download the data (CSV)
            </a>
          </p>
        </div>
      </section>

      <main className="census-main">
        <div className="sec-inner census-body">
          {/* Methodology FIRST (per citable-asset spec) */}
          <section className="census-section">
            <span className="label teal">How we counted</span>
            <h2 className="census-h2">Methodology</h2>
            <p>
              This is a <strong>listings census</strong>: a count of individual
              in-person mahjong events and standing games that were publicly
              listed online as of the snapshot date. It is <em>not</em> an
              estimate of all mahjong played in the United States — most kitchen-table
              and private-club games are never posted anywhere, and nothing here
              tries to model them.
            </p>
            <ul className="census-list">
              <li>
                <strong>What counts as a listing.</strong> One publicly listed
                in-person mahjong event or standing game in a US city — a class,
                an open table, a club night, a tournament. Online-only games are
                excluded.
              </li>
              <li>
                <strong>Where they come from.</strong> Public event pages on
                Eventbrite and Meetup, plus mahjong club and community-organization
                websites. Each listing carries a source; {c.sourceDiversity.eventbriteSharePct}%
                trace to Eventbrite, so the count is biased toward organizers who
                use online ticketing.
              </li>
              <li>
                <strong>De-duplication.</strong> The same game often appears on
                several platforms and city pages. Cross-listing duplicates were
                identified and removed before counting, so each real game is
                counted once.
              </li>
              <li>
                <strong>Snapshot, not a live feed.</strong> Every number on this
                page is computed from a single dated capture ({snapshotLabel}) by
                a build script — none are hand-entered. Future snapshots will be
                published with their own dates.
              </li>
              <li>
                <strong>Known bias.</strong> Cities with organizers who post to
                ticketing platforms look larger; scenes that run on group chats
                and word of mouth look smaller than they are. Read the counts as
                &ldquo;findable online,&rdquo; not &ldquo;all that exists.&rdquo;
              </li>
            </ul>
          </section>

          {/* Headline stats */}
          <section className="census-section">
            <span className="label teal">The numbers</span>
            <h2 className="census-h2">What we found</h2>
            <div className="census-stats">
              <Stat value={c.headline.totalListings} label="tracked listings" />
              <Stat value={c.headline.cities} label="US cities" />
              <Stat value={c.headline.organizers} label="organizers mapped" />
              <Stat value={c.byStatus.upcoming + c.byStatus.ongoing} label="upcoming or ongoing" />
            </div>
            <p className="census-caption">
              Of {c.headline.totalListings} listings in this snapshot,{' '}
              {c.byStatus.upcoming} were upcoming, {c.byStatus.ongoing} ongoing
              (recurring/standing games), and {c.byStatus.past} had already taken
              place as of {snapshotLabel}.
            </p>
          </section>

          {/* Top cities table */}
          <section className="census-section">
            <span className="label teal">By city</span>
            <h2 className="census-h2">Top cities by tracked listings</h2>
            <div className="census-table-wrap">
              <table className="census-table">
                <thead>
                  <tr>
                    <th style={{ width: '3rem' }}>#</th>
                    <th>City</th>
                    <th style={{ textAlign: 'right' }}>Listings</th>
                  </tr>
                </thead>
                <tbody>
                  {c.topCities.map((row, i) => (
                    <tr key={row.slug}>
                      <td className="census-rank">{i + 1}</td>
                      <td>
                        <Link href={`/events/${row.slug}`} className="census-city-link">
                          {row.name}
                        </Link>
                      </td>
                      <td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                        {row.listings}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="census-caption">
              Full per-city counts for all {c.headline.cities} cities are in the{' '}
              <a href={CSV} className="census-inline-link">downloadable CSV</a>.
            </p>
          </section>

          {/* Source diversity */}
          <section className="census-section">
            <span className="label teal">Where listings live</span>
            <h2 className="census-h2">Source diversity</h2>
            <p>
              Listings came from {c.sourceDiversity.distinctSources} distinct
              sources, but they are heavily concentrated:{' '}
              <strong>{c.sourceDiversity.eventbriteListings}</strong> of{' '}
              {c.headline.totalListings} listings ({c.sourceDiversity.eventbriteSharePct}%)
              trace to Eventbrite. The remaining{' '}
              {c.sourceDiversity.nonEventbriteListings} come from{' '}
              {c.sourceDiversity.nonEventbriteSources} independent sources —
              mahjong club sites, community centers, and Meetup. That long tail
              is the part of the scene that ticketing platforms miss, and the
              hardest to find without doing this kind of collection by hand.
            </p>
          </section>

          {/* Organizer ecosystem */}
          <section className="census-section">
            <span className="label teal">Who runs the games</span>
            <h2 className="census-h2">The organizer ecosystem</h2>
            <p>
              Behind the listings are the people and groups who host. We mapped{' '}
              <strong>{c.organizerEcosystem.total}</strong> distinct organizers
              across the tracked cities. Of those,{' '}
              {c.organizerEcosystem.listedOnMahj} already have at least one event
              listed on MAHJ MAHJ, {c.organizerEcosystem.activeWithContact} are
              active with a findable public contact, and{' '}
              {c.organizerEcosystem.activeContactUnknown} are active but harder to
              reach. Notably, {c.organizerEcosystem.recoveredFromEventPages} of
              them surfaced only by reading the detail pages of live events —
              organizers who are effectively invisible to a normal web search.
            </p>
            <p className="census-caption">
              This page reports aggregate counts only. Individual organizers are
              not named here.
            </p>
          </section>

          {/* FAQ */}
          <section className="census-section">
            <span className="label teal">Questions</span>
            <h2 className="census-h2">Census FAQ</h2>
            <div className="census-faq">
              {faqs.map((f) => (
                <details key={f.question} className="census-faq-item">
                  <summary>{f.question}</summary>
                  <p>{f.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Provenance footer */}
          <section className="census-provenance">
            <p>
              <strong>Source of record.</strong> MAHJ MAHJ, <em>The State of
              American Mahjong 2026</em>. Snapshot {snapshotLabel}; last verified{' '}
              {census.meta.lastVerified}. Aggregated dataset licensed{' '}
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                className="census-inline-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                CC BY 4.0
              </a>
              . Numbers regenerate from a committed snapshot via{' '}
              <code>npm run census:build</code>.
            </p>
            <div className="census-cta-row">
              <a href={CSV} className="btn-solid census-download-btn">Download the dataset</a>
              <Link href="/events" className="census-inline-link census-cta-link">
                Browse live events near you &rarr;
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
