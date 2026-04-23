import { fetchEvents, getEventCities, cityToSlug, slugToCity } from '@/lib/api';
import { JsonLd, eventSchema } from '@/components/JsonLd';
import EventCard from '@/components/EventCard';
import { createMetadata } from '@/lib/metadata';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ city: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { city: slug } = await params;
  const cityName = slugToCity(slug);
  return createMetadata({
    title: `Mahjong Events in ${cityName}`,
    description: `Find upcoming mahjong events, tournaments, and meetups in ${cityName}. Browse Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong events.`,
    path: `/events/${slug}`,
  });
}

export async function generateStaticParams() {
  const cities = await getEventCities();
  return cities.map((city) => ({ city: cityToSlug(city) }));
}

export const revalidate = 3600;

export default async function CityEventsPage({ params }: Props) {
  const { city: slug } = await params;
  const cityName = slugToCity(slug);

  // Try to find events matching this city
  const allEvents = await fetchEvents();
  const cityEvents = allEvents.events.filter(
    (e) => cityToSlug(e.city) === slug
  );

  if (cityEvents.length === 0 && allEvents.events.length > 0) {
    // City exists in URL but has no events â show empty state, don't 404
  }

  return (
    <>
      {cityEvents.map((event) => (
        <JsonLd key={event.id} data={eventSchema(event)} />
      ))}

      <section className="py-16 px-4 bg-cream">
        <div className="max-w-6xl mx-auto">
          <nav className="text-sm text-brown-muted mb-6">
            <Link href="/events" className="hover:text-terracotta transition-colors">
              Events
            </Link>
            <span className="mx-2">/</span>
            <span className="text-brown-dark">{cityName}</span>
          </nav>

          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-brown-dark">
            Mahjong Events in {cityName}
          </h1>
          <p className="mt-4 text-lg text-brown-light">
            Upcoming Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong events
            in {cityName}.
          </p>

          <div className="mt-10">
            {cityEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cityEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-brown-light">
                <p className="text-lg">No upcoming events in {cityName} at the moment.</p>
                <p className="mt-2">
                  <Link href="/events" className="text-terracotta hover:text-terracotta-light transition-colors">
                    Browse all events &rarr;
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
