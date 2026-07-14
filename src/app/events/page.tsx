import Link from 'next/link';
import { getEvents, getCitySlug } from '@/lib/api';
import { itemListSchema, eventSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { cities as manifestCities } from '@/data/cities';
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

export default async function EventsPage() {
  const data = await getEvents({ status: 'Upcoming' });

  // Event counts per city, used by the city tile section.
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
      tier: 0 as 0,
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
  const ongoingEvents = data.events.filter((e) => !e.date);

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

  return (
    <>
      <JsonLd data={[breadcrumbs, itemListSchema(schemaItems), faqSchema([sceneFaq]), ...eventSchemas]} />


      {/* Hero */}
      <section className="content-hero">
        <div className="content-hero-inner">
          <p className="content-hero-label">Community</p>
          <h1>Mahjong Events</h1>
          <p className="content-hero-subtitle">
            Find upcoming mahjong events across the United States
          </p>
          <div className="content-hero-divider" />
        </div>
      </section>

      {/* Compound reasoning-path answer capsule (style × geography). Primary
          extractable answer for the "which cities have an active scene" query;
          cross-links to the style pages the compound intent also needs. */}
      <section style={{ background: 'var(--sand)', borderBottom: '1px solid var(--bone)', padding: '2rem 0' }}>
        <div className="mx-auto max-w-3xl px-6">
          <div style={{ borderLeft: '4px solid var(--terra)', paddingLeft: '1.25rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '1.15rem' }} className="font-bold mb-3">
              {sceneFaq.question}
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--walnut)', margin: '0 0 1rem' }}>
              {sceneFaq.answer}
            </p>
            {activeNow.length > 0 && (
              <p style={{ fontSize: '0.9rem', color: 'var(--walnut)', margin: '0 0 0.75rem' }}>
                Most games listed right now:{' '}
                {activeNow.map((c, i) => (
                  <span key={c.slug}>
                    <Link href={`/events/${c.slug}`} style={{ color: 'var(--terra)' }}>{c.name}</Link>
                    {i < activeNow.length - 1 ? ', ' : '.'}
                  </span>
                ))}
              </p>
            )}
            <p style={{ fontSize: '0.85rem', color: 'var(--stone)', margin: 0 }}>
              Choosing a style?{' '}
              <Link href="/styles/taiwanese-mahjong" style={{ color: 'var(--terra)' }}>Taiwanese Mahjong</Link>
              {' · '}
              <Link href="/compare/mahjong-styles" style={{ color: 'var(--terra)' }}>Compare all three styles</Link>
            </p>
          </div>
        </div>
      </section>

      {/* City filter pills — every manifest city + any event-only historical city */}
      {tileCities.length > 0 && (
        <section style={{ background: 'var(--paper)', borderBottom: '1px solid var(--bone)', padding: '1.25rem 0' }}>
          <div className="mx-auto max-w-6xl px-6">
            <div className="city-filter">
              {tileCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/events/${c.slug}`}
                  className="city-pill"
                  title={c.count === 0 ? `${c.name} — no events scraped yet` : `${c.count} event${c.count !== 1 ? 's' : ''} in ${c.name}`}
                >
                  {c.name}
                  {c.count > 0 && (
                    <span style={{ marginLeft: '0.4rem', opacity: 0.7, fontSize: '0.75rem' }}>
                      {c.count}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dated events */}
      <section style={{ background: 'var(--linen)', padding: '3rem 0 2rem' }}>
        <div className="mx-auto max-w-6xl px-6">
          {datedEvents.length > 0 ? (
            <div className="events-grid">
              {datedEvents.map((evt) => {
                const dateObj = new Date(evt.date);
                const monthAbbr = dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
                const dayNum = dateObj.getDate();
                return (
                <div key={evt.id} className="event-card has-date-badge">
                  <div className="ev-date-badge">
                    <div className="ev-date-badge-inner">
                      <span className="ev-date-month">{monthAbbr}</span>
                      <span className="ev-date-day">{dayNum}</span>
                    </div>
                  </div>
                  <p className="event-date-big">{monthAbbr} {dayNum}</p>
                  {evt.time && (
                    <p className="event-date-sub">{dateObj.toLocaleDateString('en-US', { weekday: 'long' })} · {evt.time}</p>
                  )}
                  <p className="event-city">{evt.city}{evt.state ? `, ${evt.state}` : ''}</p>
                  <h2 className="event-title">{evt.title}</h2>
                  {evt.venue && <p className="event-location">{evt.venue}</p>}
                  {evt.streetAddress && (
                    <p className="event-address" style={{ fontSize: '0.8rem', color: 'var(--stone)', margin: '0.1rem 0 0' }}>
                      {evt.streetAddress}
                    </p>
                  )}
                  {evt.style && (
                    <span className="event-style" data-style={evt.style}>{evt.style}</span>
                  )}
                  <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    {evt.registrationLink ? (
                      <a href={evt.registrationLink} target="_blank" rel="noopener noreferrer" className="event-cta">
                        View Details
                      </a>
                    ) : evt.instagramHandle ? (
                      <a href={`https://instagram.com/${evt.instagramHandle.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="event-cta event-cta--secondary">
                        Instagram
                      </a>
                    ) : (
                      <span className="event-cta event-cta--muted">Check organizer</span>
                    )}
                  </div>
                </div>
                );
              })}
            </div>
          ) : (
            <p style={{ color: 'var(--stone)' }}>No upcoming dated events right now.</p>
          )}

          {/* Ongoing series */}
          {ongoingEvents.length > 0 && (
            <>
              <h3 className="ongoing-section-label">Ongoing Series</h3>
              <div className="events-grid">
                {ongoingEvents.map((evt) => (
                  <div key={evt.id} className="event-card">
                    <p className="event-date-sub" style={{ color: 'var(--terra)' }}>{evt.recurring || 'Recurring'}</p>
                    <p className="event-city">{evt.city}{evt.state ? `, ${evt.state}` : ''}</p>
                    <h2 className="event-title">{evt.title}</h2>
                    {evt.venue && <p className="event-location">{evt.venue}</p>}
                    {evt.streetAddress && (
                      <p className="event-address" style={{ fontSize: '0.8rem', color: 'var(--stone)', margin: '0.1rem 0 0' }}>
                        {evt.streetAddress}
                      </p>
                    )}
                    {evt.style && (
                      <span className="event-style" data-style={evt.style}>{evt.style}</span>
                    )}
                    <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      {evt.registrationLink ? (
                        <a href={evt.registrationLink} target="_blank" rel="noopener noreferrer" className="event-cta">
                          View Details
                        </a>
                      ) : evt.instagramHandle ? (
                        <a href={`https://instagram.com/${evt.instagramHandle.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="event-cta event-cta--secondary">
                          Instagram
                        </a>
                      ) : (
                        <span className="event-cta event-cta--muted">Check organizer</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
