import Link from 'next/link';
import { getEvents, getNews, getCitySlug } from '@/lib/api';
import Drills from '@/components/Drills';
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
    getEvents({ status: 'Upcoming', limit: 12 }),
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

      {/* Hero — full-bleed illustration background */}
      <section className="hero">
        <div className="hero-image-overlay" />
        <p className="hero-eyebrow">A Modern Guide to Mahjong</p>
        <div className="hero-content">
          <div className="hero-spacer" />
          <div className="hero-types">
            <span className="hero-type">Find Your Game</span>
            <span className="hero-type-sep" />
            <span className="hero-type">Play in Your City</span>
            <span className="hero-type-sep" />
            <span className="hero-type">Join a Table</span>
          </div>
          <div className="hero-actions">
            <Link href="/events" className="btn-solid">
              Find Events
            </Link>
            <Link href="/learn/how-to-play-mahjong" className="btn-ghost">
              Start Learning
            </Link>
          </div>
        </div>
        <div className="hero-scroll" aria-hidden="true">
          <span>Scroll</span>
          <div className="hero-scroll-line" />
        </div>
      </section>

      {/* Marquee stripe */}
      <div className="marquee-stripe" aria-hidden="true">
        <div className="marquee-track">
          {['Hong Kong Mahjong','Taiwanese Mahjong','American Mahjong','Tile Recognition','Strategy & Play','Quick Drills','Local Events','Play Smarter',
            'Hong Kong Mahjong','Taiwanese Mahjong','American Mahjong','Tile Recognition','Strategy & Play','Quick Drills','Local Events','Play Smarter'
          ].map((item, i) => (
            <span key={i} className="marquee-item">{item}</span>
          ))}
        </div>
      </div>

      {/* Intro Statement */}
      <section className="intro-statement grain">
        <div className="intro-inner">
          <span className="label">Welcome to the Table</span>
          <h2>
            Not just one game — <strong>three traditions</strong>, three table cultures, three ways to play.
          </h2>
          <p>Find the one that fits you.</p>
        </div>
      </section>

      {/* Three Styles Triptych */}
      <section className="types-section" style={{ background: 'var(--paper)', padding: '5rem 0' }}>
        <div className="sec-inner">
          <div className="types-triptych">
            {[
              { title: 'Hong Kong Mahjong', desc: 'Fast, strategic, built around a 13-tile hand and faan scoring. Clean and elegant.', href: '/styles/hong-kong-mahjong', bg: 'var(--terra-pale)' },
              { title: 'Taiwanese Mahjong', desc: 'A 16-tile hand makes for a fuller, more kinetic game. Lively and social.', href: '/styles/taiwanese-mahjong', bg: 'var(--teal-pale)' },
              { title: 'American Mahjong', desc: 'Jokers, the Charleston, and the annual NMJL card. Pattern-driven and communal.', href: '/styles/american-mahjong', bg: 'var(--olive-pale)' },
            ].map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="type-card"
                style={{ background: s.bg }}
              >
                <span className="label" style={{ color: 'var(--terra)' }}>
                  {s.title === 'Hong Kong Mahjong' ? 'Hong Kong' : s.title === 'Taiwanese Mahjong' ? 'Taiwanese' : 'American'}
                </span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="type-card-cta">Learn more &rarr;</span>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/compare/mahjong-styles" className="btn-solid" style={{ fontSize: '0.72rem' }}>
              Compare All Three Styles
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="events-section" style={{ background: 'var(--linen)', padding: '5rem 0' }}>
        <div className="sec-inner">
          <div className="events-hdr">
            <div>
              <span className="label peri">Community</span>
              <h2 style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 700, fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: 'var(--espresso)', marginTop: '0.5rem' }}>
                Upcoming Events
              </h2>
            </div>
            <Link href="/events" className="btn-solid" style={{ fontSize: '0.72rem', alignSelf: 'flex-end' }}>
              View All Events
            </Link>
          </div>
          {(() => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const upcomingEvents = eventsData.events
              .filter((e) => {
                if (!e.date) return true; // Keep ongoing/recurring events
                const eventDate = new Date(e.date);
                eventDate.setHours(0, 0, 0, 0);
                return eventDate >= today;
              })
              .slice(0, 6);
            return upcomingEvents.length > 0 ? (
            <div className="events-grid">
              {upcomingEvents.map((evt) => {
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
                  {hasDate ? (
                    <p className="event-date-big">{monthAbbr} {dayNum}</p>
                  ) : (
                    <p className="event-date-sub" style={{ color: 'var(--terra)' }}>{evt.recurring || 'Recurring'}</p>
                  )}
                  {hasDate && evt.time && (
                    <p className="event-date-sub">{dateObj!.toLocaleDateString('en-US', { weekday: 'long' })} · {evt.time}</p>
                  )}
                  <p className="event-city">{evt.city}{evt.state ? `, ${evt.state}` : ''}</p>
                  <h3 className="event-title">{evt.title}</h3>
                  {evt.venue && (
                    <p className="event-location">{evt.venue}</p>
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
            <p style={{ color: 'var(--stone)' }}>Events are loading. Check back soon.</p>
          )}
        </div>
      </section>

      {/* News */}
      {newsData.news.length > 0 && (
        <section id="news" style={{ background: 'var(--warm-wash)', padding: '5rem 0' }}>
          <div className="sec-inner">
            <span className="label">Latest</span>
            <h2 style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 700, fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: 'var(--espresso)', marginTop: '0.5rem', marginBottom: '2.5rem' }}>
              Mahjong News
            </h2>
            <div className="news-grid">
              {newsData.news.map((item) => (
                <div key={item.id} className="news-card">
                  <p className="news-meta">
                    {item.category && <span style={{ fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{item.category}</span>}
                    {item.category && item.date ? ' · ' : ''}
                    {item.date && new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                  <h3 className="news-title">
                    {item.url ? (
                      <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                    ) : item.title}
                  </h3>
                  {item.summary && <p className="news-summary">{item.summary}</p>}
                  {item.source && <p className="news-source">Source: {item.source}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Drills />

      {/* CTA — dark strategy section */}
      <section className="strategy-cta" style={{ background: 'var(--espresso)', padding: '6rem 0' }}>
        <div className="sec-inner" style={{ textAlign: 'center' }}>
          <span className="label-dark" style={{ color: 'var(--terra)' }}>Get Started</span>
          <h2 style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 900, fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', color: 'var(--td1)', marginTop: '0.8rem', lineHeight: 1.3 }}>
            Ready to Find Your Table?
          </h2>
          <p style={{ color: 'var(--td2)', marginTop: '1rem', maxWidth: '440px', marginLeft: 'auto', marginRight: 'auto', fontSize: '0.96rem', lineHeight: 1.78, fontWeight: 300 }}>
            Whether you are brand new or switching styles, start here.
          </p>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/learn/which-mahjong-style-is-right-for-me" className="btn-solid">
              Which Style Is Right for Me?
            </Link>
            <Link href="/events" className="btn-ghost-dark">
              Browse Events
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
