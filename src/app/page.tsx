import Link from 'next/link';
import { getEvents, getNews, getCitySlug } from '@/lib/api';
import { organizationSchema, webSiteSchema } from '@/lib/schema';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mahj Mahj — A Modern Guide to Mahjong',
  description:
    'MAHJ MAHJ is a community platform for mahjong players in the United States. Find local events, learn rules and strategy for Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong, and connect with players in cities across the US.',
  alternates: { canonical: 'https://mahjmahj.co/' },
  openGraph: {
    title: 'Mahj Mahj — A Modern Guide to Mahjong',
    description: 'Find mahjong events, learn rules and strategy, and connect with players across the United States.',
    url: 'https://mahjmahj.co/',
  },
};

export const revalidate = 3600;

export default async function HomePage() {
  const [eventsData, newsData] = await Promise.all([
    getEvents({ status: 'upcoming', limit: 6 }),
    getNews({ active: true, limit: 4 }),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema()) }}
      />

      {/* Hero */}
      <section className="py-24 text-center" style={{ background: 'var(--sand)' }}>
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="font-[family-name:var(--font-heading)] text-4xl font-black leading-tight md:text-5xl" style={{ color: 'var(--espresso)' }}>
            A Modern Guide to Mahjong
          </h1>
          <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--walnut)' }}>
            Learn Hong Kong, Taiwanese, and American Mahjong in one place. Tiles, rules, strategy, and community — all under one roof.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/learn/how-to-play-mahjong"
              className="inline-block rounded-full px-8 py-3 text-sm font-semibold no-underline transition-colors"
              style={{ background: 'var(--terra)', color: '#fff' }}
            >
              Start Learning
            </Link>
            <Link
              href="/events"
              className="inline-block rounded-full border-2 px-8 py-3 text-sm font-semibold no-underline transition-colors"
              style={{ borderColor: 'var(--espresso)', color: 'var(--espresso)' }}
            >
              Find Events
            </Link>
          </div>
        </div>
      </section>

      {/* Three Styles */}
      <section className="py-20" style={{ background: 'var(--paper)' }}>
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-4 text-center font-[family-name:var(--font-heading)] text-2xl font-bold md:text-3xl">
            Mahjong Is Not One Game
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center" style={{ color: 'var(--stone)' }}>
            Three traditions, three table cultures, three ways to play. Find the one that fits you.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: 'Hong Kong Mahjong', desc: 'Fast, strategic, built around a 13-tile hand and faan scoring. Clean and elegant.', href: '/styles/hong-kong-mahjong', bg: 'var(--terra-pale)' },
              { title: 'Taiwanese Mahjong', desc: 'A 16-tile hand makes for a fuller, more kinetic game. Lively and social.', href: '/styles/taiwanese-mahjong', bg: 'var(--terra-pale)' },
              { title: 'American Mahjong', desc: 'Jokers, the Charleston, and the annual NMJL card. Pattern-driven and communal.', href: '/styles/american-mahjong', bg: 'var(--terra-pale)' },
            ].map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group block rounded-2xl p-8 no-underline transition-shadow hover:shadow-lg"
                style={{ background: s.bg }}
              >
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold" style={{ color: 'var(--espresso)' }}>
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--walnut)' }}>
                  {s.desc}
                </p>
                <span className="mt-4 inline-block text-sm font-semibold" style={{ color: 'var(--terra)' }}>
                  Learn more &rarr;
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/compare/mahjong-styles" className="text-sm font-semibold" style={{ color: 'var(--terra)' }}>
              Compare all three styles &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20" style={{ background: 'var(--linen)' }}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold">Upcoming Events</h2>
            <Link href="/events" className="text-sm font-semibold" style={{ color: 'var(--terra)' }}>
              View all &rarr;
            </Link>
          </div>
          {eventsData.events.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {eventsData.events.map((evt) => (
                <div key={evt.id} className="rounded-xl border p-5" style={{ background: 'var(--paper)', borderColor: 'var(--bone)' }}>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--terra)' }}>
                    {new Date(evt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    {evt.time ? ` · ${evt.time}` : ''}
                  </p>
                  <h3 className="font-[family-name:var(--font-heading)] text-sm font-bold leading-snug" style={{ color: 'var(--espresso)' }}>
                    {evt.title}
                  </h3>
                  <p className="mt-1 text-xs" style={{ color: 'var(--stone)' }}>
                    {evt.venue ? `${evt.venue} · ` : ''}{evt.city}{evt.state ? `, ${evt.state}` : ''}
                  </p>
                  {evt.style && (
                    <span className="mt-2 inline-block rounded-full px-2 py-0.5 text-xs" style={{ background: 'var(--teal-light)', color: 'var(--teal-deep)' }}>
                      {evt.style}
                    </span>
                  )}
                  <div className="mt-3">
                    <Link href={`/events/${getCitySlug(evt.city)}`} className="text-xs font-semibold" style={{ color: 'var(--terra)' }}>
                      See {evt.city} events &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--stone)' }}>Events are loading. Check back soon.</p>
          )}
        </div>
      </section>

      {/* News */}
      {newsData.news.length > 0 && (
        <section className="py-20" style={{ background: 'var(--terra-pale)' }}>
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="mb-10 font-[family-name:var(--font-heading)] text-2xl font-bold">Mahjong News</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {newsData.news.map((item) => (
                <div key={item.id} className="rounded-xl border p-5" style={{ background: 'var(--paper)', borderColor: 'var(--bone)' }}>
                  <p className="mb-1 text-xs" style={{ color: 'var(--dust)' }}>
                    {item.category && <span className="font-semibold uppercase tracking-wide">{item.category}</span>}
                    {item.category && item.date ? ' · ' : ''}
                    {item.date && new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                  <h3 className="font-[family-name:var(--font-heading)] text-sm font-bold" style={{ color: 'var(--espresso)' }}>
                    {item.url ? (
                      <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--espresso)' }}>
                        {item.title}
                      </a>
                    ) : item.title}
                  </h3>
                  {item.summary && (
                    <p className="mt-2 text-sm" style={{ color: 'var(--stone)' }}>{item.summary}</p>
                  )}
                  {item.source && (
                    <p className="mt-2 text-xs" style={{ color: 'var(--dust)' }}>Source: {item.source}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20" style={{ background: 'var(--espresso)' }}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold md:text-3xl" style={{ color: 'var(--td1)' }}>
            Ready to Find Your Table?
          </h2>
          <p className="mt-4" style={{ color: 'var(--td2)' }}>
            Whether you are brand new or switching styles, start here.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/learn/which-mahjong-style-is-right-for-me"
              className="inline-block rounded-full px-8 py-3 text-sm font-semibold no-underline"
              style={{ background: 'var(--terra)', color: '#fff' }}
            >
              Which Style Is Right for Me?
            </Link>
            <Link
              href="/events"
              className="inline-block rounded-full border-2 px-8 py-3 text-sm font-semibold no-underline"
              style={{ borderColor: 'var(--td2)', color: 'var(--td1)' }}
            >
              Browse Events
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
