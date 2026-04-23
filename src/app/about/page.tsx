import type { Metadata } from 'next';
import Link from 'next/link';
import { organizationSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'About MAHJ MAHJ',
  description:
    'MAHJ MAHJ is a community platform for mahjong players in the United States...',
  alternates: {
    canonical: 'https://mahjmahj.co/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
      />

      {/* Hero */}
      <section style={{ backgroundColor: 'var(--sand)', padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: 'var(--espresso)',
              margin: 0,
            }}
          >
            About MAHJ MAHJ
          </h1>
        </div>
      </section>

      {/* Main content */}
      <section style={{ backgroundColor: 'var(--linen)', padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>

          <p
            style={{
              fontSize: '1.125rem',
              lineHeight: 1.75,
              color: 'var(--walnut)',
              marginBottom: '1.5rem',
            }}
          >
            MAHJ MAHJ is a community platform for mahjong players in the United States. We help
            people discover mahjong, learn the rules, find local events, and connect with players
            in cities across the country.
          </p>

          <p
            style={{
              fontSize: '1.125rem',
              lineHeight: 1.75,
              color: 'var(--walnut)',
              marginBottom: '1.5rem',
            }}
          >
            We cover three major styles: Hong Kong Mahjong, Taiwanese Mahjong, and American
            Mahjong. Each has its own rules, rhythm, and table culture. We believe the best way
            to learn is to find the style that fits you and sit down at a real table.
          </p>

          <p
            style={{
              fontSize: '1.125rem',
              lineHeight: 1.75,
              color: 'var(--walnut)',
              marginBottom: '3rem',
            }}
          >
            Whether you are brand new or have been playing for years, MAHJ MAHJ is here to make
            the game more accessible, more visible, and more fun.
          </p>

          {/* What we do */}
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.75rem',
              color: 'var(--espresso)',
              marginBottom: '1.25rem',
            }}
          >
            What we do
          </h2>

          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 3rem 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <li>
              <Link
                href="/events"
                style={{
                  color: 'var(--teal)',
                  textDecoration: 'none',
                  fontSize: '1.05rem',
                  fontWeight: 500,
                }}
              >
                Find events
              </Link>
              <span style={{ color: 'var(--stone)', fontSize: '1.05rem' }}>
                {' '}— Discover mahjong events near you
              </span>
            </li>
            <li>
              <Link
                href="/learn/how-to-play-mahjong"
                style={{
                  color: 'var(--teal)',
                  textDecoration: 'none',
                  fontSize: '1.05rem',
                  fontWeight: 500,
                }}
              >
                Learn the game
              </Link>
              <span style={{ color: 'var(--stone)', fontSize: '1.05rem' }}>
                {' '}— Guides for beginners and returning players
              </span>
            </li>
            <li>
              <Link
                href="/compare/mahjong-styles"
                style={{
                  color: 'var(--teal)',
                  textDecoration: 'none',
                  fontSize: '1.05rem',
                  fontWeight: 500,
                }}
              >
                Compare styles
              </Link>
              <span style={{ color: 'var(--stone)', fontSize: '1.05rem' }}>
                {' '}— Understand what makes each style unique
              </span>
            </li>
            <li>
              <span style={{ color: 'var(--walnut)', fontSize: '1.05rem', fontWeight: 500 }}>
                Build community
              </span>
              <span style={{ color: 'var(--stone)', fontSize: '1.05rem' }}>
                {' '}— Connect players across the country
              </span>
            </li>
          </ul>

          {/* Contact */}
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.75rem',
              color: 'var(--espresso)',
              marginBottom: '1rem',
            }}
          >
            Contact
          </h2>

          <p style={{ fontSize: '1.05rem', color: 'var(--walnut)', lineHeight: 1.7 }}>
            For event submissions, partnerships, or questions, reach out to{' '}
            <a
              href="mailto:hello@mahjmahj.co"
              style={{ color: 'var(--teal)', textDecoration: 'none', fontWeight: 500 }}
            >
              hello@mahjmahj.co
            </a>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          backgroundColor: 'var(--espresso)',
          padding: '4rem 1.5rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Link
            href="/learn/how-to-play-mahjong"
            style={{
              display: 'inline-block',
              backgroundColor: 'var(--teal)',
              color: 'var(--paper)',
              fontFamily: 'var(--font-heading)',
              fontSize: '1.125rem',
              fontWeight: 600,
              padding: '0.875rem 2.5rem',
              borderRadius: '4px',
              textDecoration: 'none',
              letterSpacing: '0.02em',
            }}
          >
            Start Exploring
          </Link>
        </div>
      </section>
    </>
  );
}
