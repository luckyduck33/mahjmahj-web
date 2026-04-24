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

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      <section className="py-16" style={{ background: 'var(--sand)' }}>
        <div className="mx-auto max-w-6xl px-6">
          <Link href="/events" className="mb-4 inline-block text-sm" style={{ color: 'var(--terra)' }}>
            &larr; All Events
          </Link>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl font-black md:text-4xl">
            Mahjong Events in {cityName}
          </h1>
          <p className="mt-4" style={{ color: 'var(--stone)' }}>
            {data.total} event{data.total !== 1 ? 's' : ''} found in {cityName}.
          </p>
        </div>
      </section>

      {/* City filter */}
      {allCities.length > 0 && (
        <section className="border-b py-6" style={{ background: 'var(--paper)', borderColor: 'var(--bone)' }}>
          <div className="mx-auto flex max-w-6xl flex-wrap gap-3 px-6">
            <Link
              href="/events"
              className="rounded-full border px-4 py-1.5 text-sm font-medium no-underline transition-colors"
              style={{ borderColor: 'var(--bone)', color: 'var(--walnut)' }}
            >
              All Cities
            </Link>
            {allCities.map((city) => (
              <Link
                key={city}
                href={`/events/${getCitySlug(city)}`}
                className="rounded-full border px-4 py-1.5 text-sm font-medium no-underline transition-colors"
                style={{
                  borderColor: getCitySlug(city) === slug ? 'var(--terra)' : 'var(--bone)',
                  background: getCitySlug(city) === slug ? 'var(--terra)' : 'transparent',
                  color: getCitySlug(city) === slug ? '#fff' : 'var(--walnut)',
                }}
              >
                {city}
              </Link>
            ))}
          </div>
        </section>
      )}

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
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--walnut)' }}>{evt.description}</p>
                  )}
                  <div className="mt-3 flex items-center gap-3">
                    {evt.style && (
                      <span className="rounded-full px-2 py-0.5 text-xs" style={{ background: 'var(--teal-light)', color: 'var(--teal-deep)' }}>
                        {evt.style}
                      </span>
                    )}
                    {evt.cost && <span className="text-xs" style={{ color: 'var(--dust)' }}>{evt.cost}</span>}
                    {evt.recurring && <span className="text-xs" style={{ color: 'var(--olive)' }}>Recurring</span>}
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
            <p style={{ color: 'var(--stone)' }}>No events found in {cityName} right now. Check back soon or <Link href="/events" style={{ color: 'var(--terra)' }}>browse all events</Link>.</p>
          )}
        </div>
      </section>
    </>
  );
}
