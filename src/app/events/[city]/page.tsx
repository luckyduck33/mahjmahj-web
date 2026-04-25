import Link from 'next/link';
import { getEvents, getCitySlug, getCityFromSlug } from '@/lib/api';
import { eventSchema } from '@/lib/schema';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: slug } = await params;
  const cityName = getCityFromSlug(slug);
  return {
    title: `Mahjong Events in ${cityName}`,
    description: `Find upcoming mahjong events in ${cityName}. Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong games and meetups.`,
    alternates: { canonical: `https://mahjmahj.co/events/${slug}` },
    openGraph: {
      title: `Mahjong Events in ${cityName} | MAHJ MAHJ`,
      description: `Find upcoming mahjong events in ${cityName}.`,
      url: `https://mahjmahj.co/events/${slug}`,
    },
  };
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const data = await getEvents();
  const cities = [...new Set(data.events.map((e) => e.city))];
  return cities.map((city) => ({ city: getCitySlug(city) }));
}

export default async function CityEventsPage({ params }: Props) {
  const { city: slug } = await params;
  const cityName = getCityFromSlug(slug);
  const [data, allData] = await Promise.all([
    getEvents({ city: cityName }),
    getEvents({ status: 'Upcoming' }),
  ]);
  const allCities = [...new Set(allData.events.map((e) => e.city))].sort();

  const schemas = data.events.map((evt) =>
    eventSchema({
      title: evt.title,
      city: evt.city,
      date: evt.date,
      endDate: evt.endDate,
      venue: evt.venue,
      description: evt.description,
      url: evt.url,
    })
  );

  /* Split events: dated vs ongoing */
  const datedEvents = data.events.filter((e) => !!e.date);
  const ongoingEvents = data.events.filter((e) => !e.date);

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

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
              <p style={{ color: 'var(--stone)' }}>No events found in {cityName} right now. Check back soon or <Link href="/events" style={{ color: 'var(--terra)' }}>browse all events</Link>.</p>
            )
          )}

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
