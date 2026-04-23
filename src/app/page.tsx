import Link from 'next/link';
import { fetchEvents, fetchNews, cityToSlug } from '@/lib/api';
import { JsonLd, organizationSchema, websiteSchema } from '@/components/JsonLd';
import EventCard from '@/components/EventCard';
import NewsCard from '@/components/NewsCard';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Mahj Mahj â A Modern Guide to Mahjong',
  description:
    'MAHJ MAHJ is a community platform for mahjong players in the United States. Find local events, learn rules and strategy for Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong, and connect with players in cities across the US.',
  path: '/',
});

export const revalidate = 3600;

const mahjongStyles = [
  {
    name: 'Hong Kong Mahjong',
    slug: 'hong-kong-mahjong',
    color: 'bg-terracotta',
    description: 'Fast-paced, strategic gameplay rooted in Cantonese tradition.',
  },
  {
    name: 'Taiwanese Mahjong',
    slug: 'taiwanese-mahjong',
    color: 'bg-teal',
    description: 'A dynamic 16-tile variant with unique scoring and strategy.',
  },
  {
    name: 'American Mahjong',
    slug: 'american-mahjong',
    color: 'bg-gold',
    description: 'Card-based play with racks, jokers, and annual rule updates.',
  },
];

export default async function HomePage() {
  const [eventsData, newsData] = await Promise.all([
    fetchEvents({ limit: 6 }),
    fetchNews({ active: true, limit: 4 }),
  ]);

  const cities = [...new Set(eventsData.events.map((e) => e.city).filter(Boolean))];

  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={websiteSchema()} />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-teal-dark overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(/hero.jpg)' }}
        />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl font-bold text-terracotta drop-shadow-lg">
            mahj<br />mahj
          </h1>
          <p className="mt-6 text-sm sm:text-base uppercase tracking-[0.3em] text-cream/80 font-medium">
            Find Your Game &middot; Play in Your City &middot; Join a Table
          </p>
          <p className="mt-4 text-lg sm:text-xl text-cream/90 max-w-2xl mx-auto leading-relaxed italic">
            Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong &mdash; events,
            rules, and community across the US.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/events"
              className="px-8 py-3 bg-terracotta text-cream font-semibold rounded-lg hover:bg-terracotta-light transition-colors uppercase tracking-wide text-sm"
            >
              Find a Table
            </Link>
            <Link
              href="/events"
              className="px-8 py-3 border-2 border-cream/60 text-cream font-semibold rounded-lg hover:bg-cream/10 transition-colors uppercase tracking-wide text-sm"
            >
              Browse Events
            </Link>
          </div>
        </div>
      </section>

      {/* Three Styles Section */}
      <section className="py-20 px-4 bg-cream">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-center text-brown-dark">
            Three Worlds of Mahjong
          </h2>
          <p className="mt-4 text-center text-brown-light max-w-2xl mx-auto">
            Explore the traditions, rules, and communities behind each major style
            of mahjong played in the United States.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {mahjongStyles.map((style) => (
              <Link
                key={style.slug}
                href={`/styles/${style.slug}`}
                className="group block rounded-xl overflow-hidden border border-sand/50 hover:border-teal/40 transition-all hover:shadow-lg"
              >
                <div className={`${style.color} h-3`} />
                <div className="p-6 bg-cream-light">
                  <h3 className="font-heading text-xl font-semibold text-brown-dark group-hover:text-terracotta transition-colors">
                    {style.name}
                  </h3>
                  <p className="mt-2 text-sm text-brown-light leading-relaxed">
                    {style.description}
                  </p>
                  <span className="mt-4 inline-flex text-sm font-medium text-terracotta">
                    Learn more &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 px-4 bg-cream-dark">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-heading text-3xl font-bold text-brown-dark">
                Upcoming Events
              </h2>
              <p className="mt-2 text-brown-light">
                Find mahjong nights, tournaments, and meetups near you.
              </p>
            </div>
            <Link
              href="/events"
              className="hidden sm:inline-flex text-sm font-medium text-terracotta hover:text-terracotta-light transition-colors"
            >
              View all events &rarr;
            </Link>
          </div>

          {eventsData.events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {eventsData.events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-brown-light">
              <p>No upcoming events at the moment. Check back soon!</p>
            </div>
          )}

          {cities.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="text-sm text-brown-light font-medium">Browse by city:</span>
              {cities.map((city) => (
                <Link
                  key={city}
                  href={`/events/${cityToSlug(city)}`}
                  className="text-sm px-3 py-1 rounded-full bg-cream-light border border-sand/50 text-brown hover:border-teal/40 hover:text-teal-dark transition-colors"
                >
                  {city}
                </Link>
              ))}
            </div>
          )}

          <div className="mt-6 sm:hidden text-center">
            <Link
              href="/events"
              className="text-sm font-medium text-terracotta hover:text-terracotta-light transition-colors"
            >
              View all events &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 px-4 bg-cream">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-brown-dark mb-8">
            Mahjong News
          </h2>
          {newsData.news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {newsData.news.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-brown-light">
              <p>No news at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-teal-dark text-cream text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold">
            Ready to Play?
          </h2>
          <p className="mt-4 text-cream/80 text-lg">
            Download the MAHJ MAHJ app to find events, save your favorites, and
            connect with players in your city.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://app.mahjmahj.co"
              className="px-8 py-3 bg-terracotta text-cream font-semibold rounded-lg hover:bg-terracotta-light transition-colors uppercase tracking-wide text-sm"
            >
              Get the App
            </a>
            <Link
              href="/learn/how-to-play-mahjong"
              className="px-8 py-3 border-2 border-cream/60 text-cream font-semibold rounded-lg hover:bg-cream/10 transition-colors uppercase tracking-wide text-sm"
            >
              Learn to Play
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
