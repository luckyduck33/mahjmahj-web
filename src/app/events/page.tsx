import Link from 'next/link';
import { getEvents, getCitySlug } from '@/lib/api';
import { itemListSchema } from '@/lib/schema';
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema(schemaItems)) }}
      />

      <section className="py-16" style={{ background: 'var(--sand)' }}>
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="font-[family-name:var(--font-heading)] text-3xl font-black md:text-4xl">
            Mahjong Events
          </h1>
          <p className="mt-4 max-w-2xl" style={{ color: 'var(--stone)' }}>
            Find upcoming mahjong events across the United States. Filter by city to find games near you.
          </p>
        </div>
      </section>

      {/* City index */}
      {cities.length > 0 && (
        <section className="border-b py-6" style={{ background: 'var(--paper)', borderColor: 'var(--bone)' }}>
          <div className="mx-auto flex max-w-6xl flex-wrap gap-3 px-6">
            {cities.map((city) => (
              <Link
                key={city}
                href={`/events/${getCitySlug(city)}`}
                className="rounded-full border px-4 py-1.5 text-sm font-medium no-underline transition-colors"
                style={{ borderColor: 'var(--bone)', color: 'var(--walnut)' }}
              >
                {city}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All events */}
      <section className="py-16" style={{ background: 'var(--linen)' }}>
        <div className="mx-auto max-w-6xl px-6">
          {data.events.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.events.map((evt) => {
                const hasDate = !!evt.date;
                const dateObj = hasDate ? new Date(evt.date) : null;
                const monthAbbr = dateObj ? dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase() : '';
                const dayNum = dateObj ? dateObj.getDate() : '';
                return (
                <div key={evt.id} className={`event-card${hasDate ? ' has-date-badge' : ''}`}>
                  {hasDate && (
                    <div className="ev-date-badge">
                      <div className="ev-date-badge-inner">
                        <span className="ev-date-month">{monthAbbr}</span>
                        <span className="ev-date-day">{dayNum}</span>
                      </div>
                    </div>
                  )}
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--terra)' }}>
                    {hasDate
                      ? dateObj!.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
                      : (evt.recurring || 'Recurring')}
                    {evt.time ? ` · ${evt.time}` : ''}
                  </p>
                  <h2 className="font-[family-name:var(--font-heading)] text-sm font-bold leading-snug" style={{ color: 'var(--espresso)' }}>
                    {evt.title}
                  </h2>
                  <p className="mt-1 text-xs" style={{ color: 'var(--stone)' }}>
                    {evt.venue ? `${evt.venue} · ` : ''}{evt.city}{evt.state ? `, ${evt.state}` : ''}
                  </p>
                  {evt.description && (
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--walnut)' }}>
                      {evt.description.length > 120 ? evt.description.slice(0, 120) + '...' : evt.description}
                    </p>
                  )}
                  <div className="mt-3 flex items-center gap-3">
                    {evt.style && (
                      <span className="rounded-full px-2 py-0.5 text-xs" style={{ background: 'var(--teal-light)', color: 'var(--teal-deep)' }}>
                        {evt.style}
                      </span>
                    )}
                    {evt.cost && (
                      <span className="text-xs" style={{ color: 'var(--dust)' }}>{evt.cost}</span>
                    )}
                  </div>
                  {evt.registrationLink ? (
                    <a href={evt.registrationLink} target="_blank" rel="noopener noreferrer" className="event-cta">
                      View Details &rarr;
                    </a>
                  ) : evt.instagramHandle ? (
                    <a href={`https://instagram.com/${evt.instagramHandle.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="event-cta">
                      See on Instagram &rarr;
                    </a>
                  ) : (
                    <span className="event-cta" style={{ color: 'var(--stone)' }}>Check organizer</span>
                  )}
                </div>
                );
              })}
            </div>
          ) : (
            <p style={{ color: 'var(--stone)' }}>No upcoming events found. Check back soon.</p>
          )}
        </div>
      </section>
    </>
  );
}
