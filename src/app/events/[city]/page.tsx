import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEvents, getCitySlug, getCityFromSlug } from '@/lib/api';
import { eventSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { cities, getCityBySlug } from '@/data/cities';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: slug } = await params;
  const entry = getCityBySlug(slug);
  const cityName = entry?.name ?? getCityFromSlug(slug);
  const description = entry
    ? `Find upcoming mahjong events in ${cityName}. ${entry.intro.split('.')[0]}.`
    : `Find upcoming mahjong events in ${cityName}. Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong games and meetups.`;
  return {
    title: `Mahjong Events in ${cityName}`,
    description,
    alternates: { canonical: `https://mahjmahj.co/events/${slug}` },
    openGraph: {
      title: `Mahjong Events in ${cityName} | MAHJ MAHJ`,
      description,
      url: `https://mahjmahj.co/events/${slug}`,
    },
  };
}

export const revalidate = 3600;

export async function generateStaticParams() {
  // Use the city manifest as the source of truth — every listed city gets a
  // page, even if no events have been scraped for it yet. Falls back to
  // event-derived cities for any historical slug not yet in the manifest.
  const manifestSlugs = cities.map((c) => c.slug);
  let eventCities: string[] = [];
  try {
    const data = await getEvents();
    eventCities = [...new Set(data.events.map((e) => getCitySlug(e.city)))];
  } catch {}
  const all = new Set([...manifestSlugs, ...eventCities]);
  return [...all].map((city) => ({ city }));
}

export default async function CityEventsPage({ params }: Props) {
  const { city: slug } = await params;
  const entry = getCityBySlug(slug);
  const cityName = entry?.name ?? getCityFromSlug(slug);

  // Reject obvious junk slugs that aren't in the manifest and don't have events.
  if (!entry) {
    try {
      const probe = await getEvents({ city: cityName });
      if (probe.events.length === 0) notFound();
    } catch {
      notFound();
    }
  }

  const [data, allData] = await Promise.all([
    getEvents({ city: cityName }),
    getEvents({ status: 'Upcoming' }),
  ]);
  // Surface every manifest city in the filter pills, plus any event-only
  // historical cities, deduped + sorted.
  const allCities = [...new Set([
    ...cities.map((c) => c.name),
    ...allData.events.map((e) => e.city),
  ])].sort();

  // Only emit Event schema for events with a startDate — Google rejects Event
  // schema without one, and ongoing/recurring entries don't qualify.
  const schemas = data.events
    .filter((evt) => !!evt.date)
    .map((evt) =>
      eventSchema({
        title: evt.title,
        city: evt.city,
        state: evt.state,
        date: evt.date,
        endDate: evt.endDate,
        venue: evt.venue,
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
    { name: cityName, url: `https://mahjmahj.co/events/${slug}` },
  ]);

  const faqJsonLd = entry?.faqs?.length ? faqSchema(entry.faqs) : null;

  /* Split events: dated vs ongoing */
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const datedEvents = data.events.filter((e) => {
    if (!e.date) return false;
    const d = new Date(e.date);
    d.setHours(0, 0, 0, 0);
    return d >= today;
  });
  const ongoingEvents = data.events.filter((e) => !e.date);

  return (
    <>
      <JsonLd data={[breadcrumbs, ...schemas, ...(faqJsonLd ? [faqJsonLd] : [])]} />


      {/* Hero */}
      <section className="content-hero">
        <div className="content-hero-inner">
          <Link href="/events" style={{ color: 'var(--terra)', fontSize: '0.85rem', textDecoration: 'none', marginBottom: '1rem', display: 'inline-block' }}>
            &larr; All Events
          </Link>
          <p className="content-hero-label">Community</p>
          <h1>Mahjong Events in {cityName}</h1>
          <p className="content-hero-subtitle">
            {data.total} event{data.total !== 1 ? 's' : ''} found
          </p>
          <div className="content-hero-divider" />
        </div>
      </section>

      {/* City intro — always render when manifest entry exists, regardless of event count */}
      {entry?.intro && (
        <section style={{ background: 'var(--paper)', padding: '2rem 0', borderBottom: '1px solid var(--bone)' }}>
          <div className="mx-auto max-w-3xl px-6">
            <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--walnut)', margin: 0 }}>
              {entry.intro}
            </p>
          </div>
        </section>
      )}

      {/* City filter pills */}
      {allCities.length > 0 && (
        <section style={{ background: 'var(--paper)', borderBottom: '1px solid var(--bone)', padding: '1.25rem 0' }}>
          <div className="mx-auto max-w-6xl px-6">
            <div className="city-filter">
              <Link href="/events" className="city-pill">
                All Cities
              </Link>
              {allCities.map((city) => (
                <Link
                  key={city}
                  href={`/events/${getCitySlug(city)}`}
                  className={`city-pill${getCitySlug(city) === slug ? ' city-pill--active' : ''}`}
                >
                  {city}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Events */}
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
                  <h2 className="event-title">{evt.title}</h2>
                  {evt.venue && <p className="event-location">{evt.venue}</p>}
                  {evt.description && (
                    <p style={{ fontSize: '0.85rem', color: 'var(--walnut)', marginTop: '0.5rem', lineHeight: 1.6 }}>
                      {evt.description.length > 150 ? evt.description.slice(0, 150) + '...' : evt.description}
                    </p>
                  )}
                  <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    {evt.style && (
                      <span className="event-style" data-style={evt.style}>{evt.style}</span>
                    )}
                    {evt.cost && <span style={{ fontSize: '0.72rem', color: 'var(--dust)' }}>{evt.cost}</span>}
                  </div>
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
            !ongoingEvents.length && (
              <div style={{ background: 'var(--paper)', border: '1px solid var(--bone)', borderRadius: '8px', padding: '2rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--walnut)', fontSize: '1rem', marginBottom: '0.75rem' }}>
                  We&apos;re still building out the {cityName} events calendar.
                </p>
                <p style={{ color: 'var(--stone)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                  Know about a recurring mahjong game, club night, or tournament in {cityName}? Help us put it on the map.
                </p>
                <Link href="/events" className="event-cta">Browse all cities</Link>
              </div>
            )
          )}

          {/* City FAQ — bottom of page so users get the events first */}
          {entry?.faqs?.length ? (
            <section style={{ marginTop: '3rem', paddingTop: '2.5rem', borderTop: '1px solid var(--bone)' }}>
              <h2 style={{ fontSize: '1.4rem', color: 'var(--walnut)', marginBottom: '1.5rem' }}>
                Mahjong in {cityName} — FAQ
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {entry.faqs.map((f, i) => (
                  <div key={i}>
                    <h3 style={{ fontSize: '1rem', color: 'var(--walnut)', fontWeight: 600, marginBottom: '0.5rem' }}>
                      {f.question}
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--walnut)', lineHeight: 1.65, margin: 0 }}>
                      {f.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {/* Ongoing series */}
          {ongoingEvents.length > 0 && (
            <>
              <h3 className="ongoing-section-label">Ongoing Series</h3>
              <div className="events-grid">
                {ongoingEvents.map((evt) => (
                  <div key={evt.id} className="event-card">
                    <p className="event-date-sub" style={{ color: 'var(--terra)' }}>{evt.recurring || 'Recurring'}</p>
                    <h2 className="event-title">{evt.title}</h2>
                    {evt.venue && <p className="event-location">{evt.venue}</p>}
                    {evt.description && (
                      <p style={{ fontSize: '0.85rem', color: 'var(--walnut)', marginTop: '0.5rem', lineHeight: 1.6 }}>
                        {evt.description.length > 150 ? evt.description.slice(0, 150) + '...' : evt.description}
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
