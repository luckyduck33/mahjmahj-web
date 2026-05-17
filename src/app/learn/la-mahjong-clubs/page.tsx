import type { Metadata } from 'next';
import Link from 'next/link';
import { articleSchema, faqSchema, breadcrumbSchema } from '@/lib/schema';

const URL = 'https://mahjmahj.co/learn/la-mahjong-clubs';
const TITLE = "Meet the Clubs: LA's Hong Kong Mahjong Community";
const DESCRIPTION =
  "Los Angeles's Hong Kong Mahjong community is a constellation of clubs, hosts, and recurring tables. Here is how the LA scene is organized and how to choose the right club for you.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: 'article',
    siteName: 'MAHJ MAHJ',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

const faqs = [
  {
    question: 'What Hong Kong Mahjong clubs are active in Los Angeles?',
    answer:
      'LA has a growing mix of Hong Kong Mahjong clubs, pop-ups, and recurring tables, including groups such as The Four Winds Club and Lucky Bamboo Mahjong Club when listed on MAHJ MAHJ event pages.',
  },
  {
    question: 'Are LA Mahjong clubs beginner-friendly?',
    answer:
      'Some are beginner-friendly and some are better for returning players. Always check the event description before attending.',
  },
  {
    question: 'Why join a Mahjong club instead of learning alone?',
    answer:
      'A club gives you structure, live table experience, etiquette, and a community of players, which makes Hong Kong Mahjong easier to learn.',
  },
  {
    question: 'Does MAHJ MAHJ cover only Hong Kong Mahjong?',
    answer:
      'MAHJ MAHJ centers Hong Kong Mahjong, while also helping players understand how it differs from Taiwanese Mahjong and American Mahjong.',
  },
];

const schema = [
  articleSchema({
    headline: TITLE,
    description: DESCRIPTION,
    url: URL,
    datePublished: '2026-05-15',
    dateModified: '2026-05-17',
  }),
  breadcrumbSchema([
    { name: 'Home', url: 'https://mahjmahj.co' },
    { name: 'Learn', url: 'https://mahjmahj.co/learn/how-to-play-mahjong' },
    { name: TITLE, url: URL },
  ]),
  faqSchema(faqs),
];

const groupTypes = [
  {
    title: 'Beginner-Friendly Learning Clubs',
    body: 'These groups make the first table less intimidating. They may offer guided instruction, slower rounds, rules explanations, and a room where questions are expected.',
  },
  {
    title: 'Social Play Clubs',
    body: 'These are the tables for people who know the basics and want to keep playing. They are less about formal instruction and more about rhythm: sit down, shuffle, deal, learn by playing.',
  },
  {
    title: 'Cultural and Community Groups',
    body: 'Some LA tables are rooted in cultural connection, family memory, or intergenerational learning. These groups help keep Mahjong tied to something deeper than a trend.',
  },
  {
    title: 'Design-Forward Pop-Ups',
    body: 'LA also has space for Mahjong nights that feel stylish, social, and modern. These are the events that make the game visible to a new audience without losing respect for the table.',
  },
];

export default function LAMahjongClubsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section
        style={{ background: 'var(--espresso)' }}
        className="px-6 py-20 md:py-28 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <p
            style={{ color: 'var(--teal)', fontFamily: 'var(--font-heading)', fontSize: '0.7rem', letterSpacing: '0.15em' }}
            className="uppercase mb-4"
          >
            Los Angeles
          </p>
          <h1
            style={{ color: 'var(--td1)', fontFamily: 'var(--font-heading)' }}
            className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
          >
            Meet the Clubs: LA&rsquo;s Hong Kong Mahjong Community
          </h1>
          <p style={{ color: 'var(--td2)' }} className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Not one fixed institution — a constellation of clubs, hosts, and recurring tables building the LA scene together.
          </p>
        </div>
      </section>

      <main style={{ background: 'var(--linen)' }} className="px-6 py-16 md:py-20">
        <div className="max-w-4xl mx-auto content-article">

          <section className="mb-16">
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed mb-4">
              The Los Angeles Hong Kong Mahjong scene is growing through clubs, hosts, pop-ups, and recurring table nights that make the game easier to find and less intimidating to learn.
            </p>
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed">
              What makes LA interesting is that the Mahjong community does not feel like one fixed institution. It feels like a constellation: The Four Winds Club, Lucky Bamboo Mahjong Club, independent hosts, venue-based nights, and small groups creating tables across the city.
            </p>
          </section>

          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-6"
            >
              Why Clubs Matter
            </h2>
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed mb-4">
              Mahjong becomes easier when there is a host. A club gives players structure: where to go, what style is being played, whether beginners are welcome, and what the etiquette is at the table.
            </p>
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed">
              For new players, that structure matters. Hong Kong Mahjong is social and fast-moving. A club can slow down the entry point without diluting the game.
            </p>
          </section>

          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-8"
            >
              The Types of LA Mahjong Groups
            </h2>
            <div className="space-y-6">
              {groupTypes.map((g) => (
                <div
                  key={g.title}
                  style={{ background: 'var(--paper)', border: '1px solid var(--bone)', borderLeft: '4px solid var(--teal)' }}
                  className="rounded-lg p-6"
                >
                  <h3
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '1rem' }}
                    className="font-bold mb-2"
                  >
                    {g.title}
                  </h3>
                  <p style={{ color: 'var(--walnut)' }} className="leading-relaxed">{g.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-6"
            >
              How to Choose a Club
            </h2>
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed mb-4">
              Start with your level. If you are new, choose a club or event that explicitly welcomes beginners. If you already play, choose a recurring table so you can build speed and confidence.
            </p>
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed">
              Ask which style is being played. Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong are different. MAHJ MAHJ&rsquo;s LA-first strategy centers Hong Kong Mahjong, but the broader city scene may include multiple styles.
            </p>
          </section>

          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-6"
            >
              How the Community Is Growing
            </h2>
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed mb-4">
              LA&rsquo;s Mahjong community is growing because it solves a real social problem. People want to gather in ways that feel intentional, tactile, and culturally alive. The table gives people something to do with their hands while conversation unfolds naturally.
            </p>
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed">
              As more clubs become discoverable, the scene gets stronger. Beginners become regulars. Regulars become hosts. Hosts build new tables.
            </p>
          </section>

          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-8"
            >
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  style={{ background: 'var(--paper)', border: '1px solid var(--bone)' }}
                  className="rounded-lg p-6"
                >
                  <h3
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '0.9rem' }}
                    className="font-bold mb-3"
                  >
                    {faq.question}
                  </h3>
                  <p style={{ color: 'var(--walnut)', fontSize: '0.95rem' }} className="leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg p-10 text-center" style={{ background: 'var(--espresso)' }}>
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--td1)', fontSize: '1.3rem' }}
              className="font-bold mb-4"
            >
              Find your club
            </h2>
            <p style={{ color: 'var(--td2)' }} className="text-lg leading-relaxed mb-8 max-w-xl mx-auto">
              Browse the LA events page to see which clubs and recurring tables have nights coming up.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/events/los-angeles"
                style={{ background: 'var(--terra)', color: 'white', fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.05em' }}
                className="inline-block px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
              >
                See LA Mahjong events
              </Link>
              <Link
                href="/learn/first-la-mahjong-night"
                style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--td1)', fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.05em', border: '1px solid rgba(255,255,255,0.15)' }}
                className="inline-block px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
              >
                Your first LA Mahjong night
              </Link>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
