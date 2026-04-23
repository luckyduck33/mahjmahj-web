import Link from 'next/link';
import { fetchEvents, cityToSlug } from '@/lib/api';
import { JsonLd, itemListSchema } from '@/components/JsonLd';
import EventCard from '@/components/EventCard';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Mahjong Events',
  description:
    'Find mahjong events, tournaments, and meetups across the United States. Browse upcoming Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong events by city.',
  path: '/events',
});

export const revalidate = 3600;

export default async function EventsPage() {
  const data = await fetchEvents();
  const cities = [...new Set(data.events.map((e) => e.city).filter(Boolean))].sort();

  const listItems = cities.map((city) => ({
    name: `Mahjong Events in ${city}`,
    url: `https://mahjmahj.co/events/${cityToSlug(city)}`,
  }));

  return (
    <>
      <JsonLd data={itemListSchema(listItems)} />

      <section className="py-16 px-4 bg-cream">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-brown-dark">
            Mahjong Events
          </h1>
          <p className="mt-4 text-lg text-brown-light max-w-2xl">
            Browse upcoming mahjong events across the United States. Find open play nights,
            tournaments, and social meetups for Hong Kong, Taiwanese, and American Mahjong.
          </p>

          {/* City Filter */}
          {cities.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="text-sm text-brown-light font-medium">Filter by city:</span>
              {cities.map((city) => (
                <Link
                  key={city}
                  href={`/events/${cityToSlug(city)}`}
                  className="text-sm px-3 py-1.5 rounded-full bg-cream-light border border-sand/50 text-brown hover:border-teal/40 hover:text-teal-dark transition-colors"
                >
                  {city}
                </Link>
              ))}
            </div>
          )}

          {/* Events Grid */}
          <div className="mt-10">
            {data.events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-brown-light">
                <p className="text-lg">No upcoming events at the moment.</p>
                <p className="mt-2">Check back soon or browse events by city above.</p>
              </div>
            )}
          </div>

          {data.lastUpdated && (
            <p className="mt-8 text-xs text-brown-muted text-center">
              Last updated: {new Date(data.lastUpdated).toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric',
              })}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
