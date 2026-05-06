import Link from 'next/link';
import { getEvents, getCitySlug } from '@/lib/api';
import { itemListSchema, eventSchema } from '@/lib/schema';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mahjong Events Near You',
  description: 'Find upcoming mahjong events across the United States. Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong events in your city.',
  alternates: { canonical: 'https://mahjmahj.co/events' },
  openGraph: {
    title: 'Mahjong Events Near You | MAHJ MAHJ',
    description: 'Find upcoming mahjong events across the United States.',
    url: 'https://mahjmahj.co/events',
  },
};

export const revalidate = 3600;

export default async function EventsPage() {
  const data = await getEvents({ status: 'Upcoming' });

  const cities = [...new Set(data.events.map((e) => e.city))].sort();
  const schemaItems = cities.map((city, i) => ({
    name: `Mahjong events in ${city}`,
    url: `https://mahjmahj.co/events/${getCitySlug(city)}`,
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
      description: evt.description,
      url: evt.url,
    })
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema(schemaItems)) }}
      />
      {eventSchemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

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

      {/* City filter pills */}
      {cities.length > 0 && (
        <section style={{ background: 'var(--paper)', borderBottom: '1px solid var(--bone)', padding: '1.25rem 0' }}>
          <div className="mx-auto max-w-6xl px-6">
            <div className="city-filter">
              {cities.map((city) => (
                <Link
                  key={city}
                  href={`/events/${getCitySlug(city)}`}
                  className="city-pill"
                >
                  {city}
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
