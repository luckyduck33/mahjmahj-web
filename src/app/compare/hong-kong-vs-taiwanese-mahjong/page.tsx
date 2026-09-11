import type { Metadata } from 'next';
import Link from 'next/link';
import { faqSchema } from '@/lib/schema';
import EmailSignup from '@/components/EmailSignup';

export const metadata: Metadata = {
  title: 'Hong Kong Mahjong vs. Taiwanese Mahjong: Key Differences',
  description:
    'Hong Kong Mahjong plays a 13-tile hand with faan scoring. Taiwanese Mahjong plays 16 tiles with tai scoring. Compare hand size, pace, and table feel.',
  alternates: {
    canonical: 'https://mahjmahj.co/compare/hong-kong-vs-taiwanese-mahjong',
  },
  openGraph: {
    title: 'Hong Kong Mahjong vs. Taiwanese Mahjong: Key Differences',
    description:
      'Hong Kong Mahjong plays a 13-tile hand with faan scoring. Taiwanese Mahjong plays 16 tiles with tai scoring. Compare hand size, pace, and table feel.',
    url: 'https://mahjmahj.co/compare/hong-kong-vs-taiwanese-mahjong',
    type: 'article',
    siteName: 'MAHJ MAHJ',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hong Kong Mahjong vs. Taiwanese Mahjong: Key Differences',
    description:
      'Hong Kong Mahjong plays a 13-tile hand with faan scoring. Taiwanese Mahjong plays 16 tiles with tai scoring. Compare hand size, pace, and table feel.',
  },
};

const faqs = [
  {
    question: 'What is the main difference between Hong Kong and Taiwanese Mahjong?',
    answer:
      'Hand size. Hong Kong Mahjong hands hold 13 tiles. Taiwanese Mahjong hands hold 16. That extra material changes the pace, the number of decisions per turn, and how full the table feels from the opening deal, even though both styles share the same tile set and use no jokers or annual card.',
  },
  {
    question: 'Is Taiwanese Mahjong just Hong Kong Mahjong with more tiles?',
    answer:
      'Not quite. The 16-tile hand is the headline difference, but the two styles also use different scoring languages, faan in Hong Kong Mahjong and tai in Taiwanese Mahjong, along with different hand patterns and conventions. They share ancestry, not rules.',
  },
  {
    question: 'Which is faster, Hong Kong or Taiwanese Mahjong?',
    answer:
      'Hong Kong Mahjong tends to move faster. Its 13-tile hand and simpler structure let experienced groups finish several rounds in under two hours. Taiwanese Mahjong’s 16-tile hand means more tiles to process each turn, which generally makes rounds feel fuller and a bit longer, even at a lively pace.',
  },
  {
    question: 'Do Hong Kong and Taiwanese Mahjong use jokers or a card?',
    answer:
      'Neither style uses jokers, and neither requires an annual card. That puts them both in contrast with American Mahjong, which uses 8 jokers and requires the current NMJL card. Hong Kong and Taiwanese rules stay consistent from year to year.',
  },
  {
    question: 'Which should I learn first, Hong Kong or Taiwanese Mahjong?',
    answer:
      'If you want the more compact, strategic version, Hong Kong Mahjong’s 13-tile hand is the more direct starting point. If your community plays Taiwanese Mahjong, or you like the idea of a fuller hand with more to work with, learning Taiwanese first is just as valid. Either style gives you a strong foundation in the other.',
  },
];

const schema = faqSchema(faqs);

export default function HongKongVsTaiwanesePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <section
        style={{ background: 'var(--espresso)' }}
        className="px-6 py-20 md:py-28 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <p
            style={{ color: 'var(--terra)', fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '0.7rem', letterSpacing: '0.14em' }}
            className="uppercase mb-4"
          >
            Head-to-Head
          </p>
          <h1
            style={{ color: 'var(--td1)', fontFamily: 'var(--font-heading)' }}
            className="text-3xl md:text-5xl font-semibold mb-6 leading-tight"
          >
            Hong Kong Mahjong vs. Taiwanese Mahjong: Key Differences
          </h1>
          <p style={{ color: 'var(--td2)' }} className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Same tiles, same basic goal, and no jokers or card in either one. The real split is hand size: 13 tiles in Hong Kong Mahjong, 16 in Taiwanese Mahjong.
          </p>
        </div>
      </section>

      {/* Main content */}
      <main style={{ background: 'var(--linen)' }} className="px-6 py-16 md:py-20">
        <div className="max-w-4xl mx-auto content-article">

          {/* Intro / answer capsule */}
          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-semibold mb-4"
            >
              Hong Kong Mahjong vs. Taiwanese Mahjong: what&apos;s the difference?
            </h2>
            <p
              style={{ color: 'var(--espresso)', background: 'var(--paper)', border: '1px solid var(--bone)', borderLeft: '3px solid var(--terra)' }}
              className="text-lg leading-relaxed mb-2 rounded-lg p-5"
            >
              Hong Kong Mahjong plays a 13-tile hand scored in faan. Taiwanese Mahjong plays a fuller 16-tile hand scored in tai. Neither uses jokers or an annual card.
            </p>
            <p style={{ color: 'var(--walnut)', fontSize: '0.8rem' }} className="mb-6">
              Comparison reviewed September 2026.
            </p>
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed mb-4">
              Hong Kong Mahjong and Taiwanese Mahjong are close cousins. They use the same core tile set, the same four-player structure, and neither one relies on jokers or an annual card the way American Mahjong does. What sets them apart is hand size and scoring: Hong Kong Mahjong builds toward a 13-tile hand and scores it in faan, while Taiwanese Mahjong builds toward a 16-tile hand and scores it in tai.
            </p>
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed">
              Three extra tiles sounds small. At the table, it changes the whole feel of the game.
            </p>
          </section>

          {/* Quick verdict */}
          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-semibold mb-6"
            >
              The short answer
            </h2>
            <div style={{ background: 'var(--sand)', border: '1px solid var(--bone)' }} className="rounded-lg p-7">
              <ul className="space-y-3">
                {[
                  <><strong>Tile count:</strong> Hong Kong hands hold 13 tiles; Taiwanese hands hold 16, the biggest hand of the three main styles.</>,
                  <><strong>Scoring:</strong> Hong Kong Mahjong scores in faan; Taiwanese Mahjong scores in tai. Both are points-for-features systems, with different conventions.</>,
                  <><strong>Jokers and card:</strong> neither style uses jokers, and neither requires an annual card.</>,
                  <><strong>Pace:</strong> Hong Kong Mahjong tends to run fast to moderate; Taiwanese Mahjong is moderate and more kinetic, with more tiles in play at once.</>,
                  <><strong>Where it is played:</strong> Hong Kong Mahjong is common in Chinese-American communities; Taiwanese Mahjong is common in communities with Taiwanese ties.</>,
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span style={{ color: 'var(--terra)', marginTop: '0.25rem' }}>&#9642;</span>
                    <span style={{ color: 'var(--walnut)' }} className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Side-by-side table */}
          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-semibold mb-8"
            >
              Side-by-side comparison
            </h2>
            <div className="overflow-x-auto rounded-lg" style={{ border: '1px solid var(--bone)' }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: 'var(--espresso)' }}>
                    <th style={{ color: 'var(--td2)', fontFamily: 'var(--font-heading)', fontSize: '0.7rem', letterSpacing: '0.08em' }} className="text-left px-5 py-4 font-semibold">Feature</th>
                    <th style={{ color: 'var(--terra)', fontFamily: 'var(--font-heading)', fontSize: '0.7rem', letterSpacing: '0.08em' }} className="text-left px-5 py-4 font-semibold">Hong Kong</th>
                    <th style={{ color: 'var(--teal)', fontFamily: 'var(--font-heading)', fontSize: '0.7rem', letterSpacing: '0.08em' }} className="text-left px-5 py-4 font-semibold">Taiwanese</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Players', '4', '4'],
                    ['Hand size', '13 tiles (14 to win)', '16 tiles'],
                    ['Full tile set', '144 tiles', '144 tiles'],
                    ['Jokers', 'None', 'None'],
                    ['Scoring language', 'Faan (points per feature)', 'Tai (points per feature)'],
                    ['Annual card required', 'No', 'No'],
                    ['Pace', 'Fast to moderate', 'Moderate, kinetic'],
                    ['Signature mechanic', 'Faan accumulation', '16-tile open hand building'],
                    ['Best known for', 'Speed, clean structure', 'A fuller, more layered hand'],
                  ].map((row, i) => (
                    <tr
                      key={row[0]}
                      style={{ background: i % 2 === 0 ? 'var(--paper)' : 'var(--linen)', borderBottom: '1px solid var(--bone)' }}
                    >
                      <td style={{ color: 'var(--espresso)', fontWeight: 600 }} className="px-5 py-4">{row[0]}</td>
                      <td style={{ color: 'var(--walnut)' }} className="px-5 py-4">{row[1]}</td>
                      <td style={{ color: 'var(--walnut)' }} className="px-5 py-4">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Deep dive */}
          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-semibold mb-8"
            >
              Where the two styles actually diverge
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: 'Hand size',
                  body: 'Hong Kong Mahjong players hold 13 tiles for most of the game, drawing a 14th to complete the hand. Taiwanese Mahjong players hold 16 tiles from the deal onward, with the dealer starting on an extra tile. Those three tiles are the single biggest structural difference between the two styles, and they shape everything else about how each one plays.',
                },
                {
                  title: 'Scoring systems',
                  body: 'Hong Kong Mahjong scores in faan, points awarded for hand features such as a pure suit or a self-draw, with most groups setting a minimum faan requirement to win. Taiwanese Mahjong scores in tai, its own points-for-features system built around the larger 16-tile hand. The underlying idea, score the hand’s features, is shared; the specific conventions are not.',
                },
                {
                  title: 'No jokers, no card, in either style',
                  body: 'Unlike American Mahjong, neither Hong Kong nor Taiwanese Mahjong uses joker tiles or requires an annual card. Every set in both styles is built from tiles actually drawn or claimed, and the rules stay consistent from year to year, so there is nothing new to buy or memorize each season.',
                },
                {
                  title: 'Pace and table feel',
                  body: 'Hong Kong Mahjong’s simpler, 13-tile structure tends to move quickly. Many groups play several rounds in under two hours. Taiwanese Mahjong’s 16-tile hand means more tiles to process on every turn, more calls to react to, and a fuller, more kinetic table atmosphere, even when the overall pace stays lively.',
                },
                {
                  title: 'Where each is played',
                  body: 'Hong Kong Mahjong is widely played in areas with larger Chinese-American communities and has a reputation for strategic, fast-paced play. Taiwanese Mahjong is common in communities with Taiwanese ties and tends to carry a warmer, more expressive table culture built around the bigger hand.',
                },
              ].map((item) => (
                <div key={item.title} style={{ borderBottom: '1px solid var(--bone)' }} className="pb-6">
                  <h3
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '0.95rem' }}
                    className="font-semibold mb-2"
                  >
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--walnut)' }} className="leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Which to learn first */}
          <section
            className="mb-16 rounded-lg p-8 text-center"
            style={{ background: 'var(--sand)', border: '1px solid var(--bone)' }}
          >
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '1.1rem' }}
              className="font-semibold mb-3"
            >
              Which one should you learn first?
            </h2>
            <p style={{ color: 'var(--walnut)' }} className="leading-relaxed mb-6 max-w-xl mx-auto">
              If you want the more compact, strategic version with fewer tiles to track, Hong Kong Mahjong is the more direct starting point. If you like the idea of a fuller hand with more combinations to work with from the first turn, or your community already plays it, Taiwanese Mahjong is just as good a place to start. Learning either one gives you a real head start on the other.
            </p>
            <Link
              href="/compare/mahjong-styles"
              style={{ background: 'var(--terra)', color: 'white', fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.05em' }}
              className="inline-block px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              See all three styles compared &#8594;
            </Link>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-semibold mb-8"
            >
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  style={{ background: 'var(--paper)', border: '1px solid var(--bone)' }}
                  className="rounded-lg p-6"
                >
                  <h3
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '0.9rem' }}
                    className="font-semibold mb-3"
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

          {/* Email signup */}
          <section
            className="mb-16 rounded-lg p-8"
            style={{ background: 'var(--sand)', border: '1px solid var(--bone)' }}
          >
            <EmailSignup variant="learn" source="compare" />
          </section>

          {/* Where to go next */}
          <section
            className="rounded-lg p-8"
            style={{ background: 'var(--espresso)' }}
          >
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--td1)', fontSize: '1.1rem' }}
              className="font-semibold mb-6 text-center"
            >
              Where to go next
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: 'Hong Kong Mahjong: full guide', href: '/styles/hong-kong-mahjong' },
                { label: 'Taiwanese Mahjong: full guide', href: '/styles/taiwanese-mahjong' },
                { label: 'All three styles compared', href: '/compare/mahjong-styles' },
                { label: 'American vs. Hong Kong Mahjong', href: '/compare/american-vs-hong-kong-mahjong' },
                { label: 'American vs. Taiwanese Mahjong', href: '/compare/american-vs-taiwanese-mahjong' },
                { label: 'Find mahjong events near you', href: '/events' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--td1)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.9rem' }}
                  className="block px-5 py-4 rounded-lg hover:bg-white/10 transition-colors leading-snug"
                >
                  {link.label} &#8594;
                </Link>
              ))}
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
