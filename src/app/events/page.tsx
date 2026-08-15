import Link from 'next/link';
import { getEvents, getCitySlug } from '@/lib/api';
import { itemListSchema, eventSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { cities as manifestCities } from '@/data/cities';
import CityFinder from '@/components/CityFinder';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mahjong Events Near You',
  description: 'Find upcoming mahjong events across the United States. Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong events in your city.',
  alternates: { canonical: 'https://mahjmahj.co/events' },
  openGraph: {
    title: 'Mahjong Events Near You | MAHJ MAHJ',
    description: 'Find upcoming mahjong events across the United States.',
    url: 'https://mahjmahj.co/events',
    siteName: 'MAHJ MAHJ',
  },
};

export const revalidate = 3600;

// Featured quick-pick chips under the city finder (P1.A spec — fixed set).
const FEATURED_CITY_SLUGS = ['los-angeles', 'new-york', 'san-francisco', 'dallas', 'chicago', 'st-louis'];

export default async function EventsPage() {
  const data = await getEvents({ status: 'Upcoming' });

  // Event counts per city, used by the city finder + tile section.
  const countsBySlug = new Map<string, number>();
  for (const e of data.events) {
    const s = getCitySlug(e.city);
    countsBySlug.set(s, (countsBySlug.get(s) ?? 0) + 1);
  }
  // Surface every manifest city in the tile section, plus any historical
  // event-only cities not yet in the manifest.
  const eventOnlyCities = [...new Set(data.events.map((e) => e.city))]
    .filter((c) => !manifestCities.some((m) => m.slug === getCitySlug(c)));
  const tileCities = [
    ...manifestCities.map((m) => ({
      slug: m.slug,
      name: m.name,
      tier: m.tier,
      count: countsBySlug.get(m.slug) ?? 0,
    })),
    ...eventOnlyCities.map((name) => ({
      slug: getCitySlug(name),
      name,
      tier: 0 as const,
      count: countsBySlug.get(getCitySlug(name)) ?? 0,
    })),
  ].sort((a, b) => a.name.localeCompare(b.name));
  const schemaItems = tileCities.map((c, i) => ({
    name: `Mahjong events in ${c.name}`,
    url: `https://mahjmahj.co/events/${c.slug}`,
    position: i + 1,
  }));

  /* Split events: dated (upcoming) vs ongoing (no date / recurring) */
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const datedEvents = data.events.filter((e) => {
    if (!e.date) return false;
    const d = new Date(e.date);
    d.setHours(0, 0, 0, 0);
    return d >= today;
  });

  /* Per-event Event schema for the hub page so Google can show event rich results
     directly off /events, not just /events/[city]. Only dated upcoming events
     qualify — ongoing series have no startDate and would fail validation. */
  const eventSchemas = datedEvents.map((evt) =>
    eventSchema({
      title: evt.title,
      city: evt.city,
      state: evt.state,
      date: evt.date,
      endDate: evt.endDate,
      venue: evt.venue,
      streetAddress: evt.streetAddress,
      description: evt.description,
      url: evt.url,
      organizer: evt.organizer,
      registrationLink: evt.registrationLink,
      cost: evt.cost,
    })
  );

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://mahjmahj.co' },
    { name: 'Events', url: 'https://mahjmahj.co/events' },
  ]);

  // Compound reasoning-path answer object (style × geography): the OPEN
  // "I play Taiwanese — which US cities have an active enough scene?" query.
  // Durable answer (heritage-style hubs) → FAQPage schema; the live "most games
  // right now" line below is computed from real event counts, omitted at zero.
  const activeNow = tileCities
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
  const sceneFaq = {
    question:
      'I play Taiwanese Mahjong — which US cities have an active enough scene to find a table?',
    answer:
      'Hong Kong and Taiwanese Mahjong concentrate in US cities with large Chinese and Taiwanese communities — Los Angeles (the San Gabriel Valley), New York (Flushing and Manhattan Chinatown), and the San Francisco Bay Area have the deepest heritage-style scenes, so they are the best bets for finding a Taiwanese or Hong Kong table. American Mahjong is active nationwide in clubs and senior centers. Pick a city below to see its current games, and start with the cities showing upcoming listings.',
  };

  // "This week" strip: soonest-first, at most 8, across every city — replaces
  // the old flat nationwide grid. The Event JSON-LD above still covers every
  // dated event (eventSchemas), not just the 8 shown here.
  const thisWeek = [...datedEvents]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 8);

  return (
    <>
      <JsonLd data={[breadcrumbs, itemListSchema(schemaItems), faqSchema([sceneFaq]), ...eventSchemas]} />

      {/* Compact hero */}
      <section className="content-hero content-hero--compact">
        <div className="content-hero-inner">
          <p className="content-hero-label">Community</p>
          <h1>Mahjong Events</h1>
          <p className="content-hero-subtitle">
            Find upcoming mahjong events across the United States
          </p>
        </div>
      </section>

      {/* City finder — type-ahead search, featured chips, collapsed full list */}
      <section style={{ background: 'var(--paper)', borderBottom: '1px solid var(--bone)', padding: '2rem 0' }}>
        <div className="mx-auto max-w-3xl px-6">
          <CityFinder
            cities={tileCities.map((c) => ({ slug: c.slug, name: c.name, count: c.count }))}
            featuredSlugs={FEATURED_CITY_SLUGS}
          />
          {tileCities.length > 0 && (
            <details className="all-cities-details">
              <summary>All {tileCities.length} cities</summary>
              <div className="all-cities-list">
                {tileCities.map((c) => (
                  <Link key={c.slug} href={`/events/${c.slug}`}>
                    {c.name}
                  </Link>
                ))}
              </div>
            </details>
          )}
        </div>
      </section>

      {/* This week — soonest-first, max 8, across every city. Replaces the
          old flat nationwide events grid; each card links to its city page. */}
      {thisWeek.length > 0 && (
        <section style={{ background: 'var(--linen)', padding: '2.5rem 0' }}>
          <div className="mx-auto max-w-6xl px-6">
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--espresso)', marginBottom: '1.25rem' }}>
              This Week
            </h2>
            <div className="week-strip">
              {thisWeek.map((evt) => {
                const dateObj = new Date(evt.date);
                const monthAbbr = dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
                const dayNum = dateObj.getDate();
                return (
                  <Link key={evt.id} href={`/events/${getCitySlug(evt.city)}`} className="week-strip-card">
                    <p className="week-strip-date">
                      {monthAbbr} {dayNum}
                      {evt.time ? ` · ${evt.time}` : ''}
                    </p>
                    <p className="week-strip-title">{evt.title}</p>
                    <p className="week-strip-city">
                      {evt.city}
                      {evt.state ? `, ${evt.state}` : ''}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ / answer capsule — compound reasoning-path answer (style x
          geography), kept as a <details> accordion; text below is
          byte-identical to the FAQPage schema entry above. */}
      <section style={{ background: 'var(--sand)', padding: '2rem 0' }}>
        <div className="mx-auto max-w-3xl px-6">
          <details className="faq-fold" open>
            <summary>{sceneFaq.question}</summary>
            <p>{sceneFaq.answer}</p>
            {activeNow.length > 0 && (
              <p className="faq-fold-extra">
                Most games listed right now:{' '}
                {activeNow.map((c, i) => (
                  <span key={c.slug}>
                    <Link href={`/events/${c.slug}`} style={{ color: 'var(--terra)' }}>{c.name}</Link>
                    {i < activeNow.length - 1 ? ', ' : '.'}
                  </span>
                ))}
              </p>
            )}
            <p className="faq-fold-extra" style={{ marginBottom: 0 }}>
              Choosing a style?{' '}
              <Link href="/styles/taiwanese-mahjong" style={{ color: 'var(--terra)' }}>Taiwanese Mahjong</Link>
              {' · '}
              <Link href="/compare/mahjong-styles" style={{ color: 'var(--terra)' }}>Compare all three styles</Link>
            </p>
          </details>
        </div>
      </section>
    </>
  );
}
