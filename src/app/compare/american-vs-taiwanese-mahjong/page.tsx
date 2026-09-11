import type { Metadata } from 'next';
import Link from 'next/link';
import { faqSchema } from '@/lib/schema';
import EmailSignup from '@/components/EmailSignup';

export const metadata: Metadata = {
  title: 'American Mahjong vs. Taiwanese Mahjong: Key Differences',
  description:
    'American Mahjong plays 13 tiles with jokers and an NMJL card. Taiwanese Mahjong plays a 16-tile hand with no jokers or card. Compare both side by side.',
  alternates: {
    canonical: 'https://mahjmahj.co/compare/american-vs-taiwanese-mahjong',
  },
  openGraph: {
    title: 'American Mahjong vs. Taiwanese Mahjong: Key Differences',
    description:
      'American Mahjong plays 13 tiles with jokers and an NMJL card. Taiwanese Mahjong plays a 16-tile hand with no jokers or card. Compare both side by side.',
    url: 'https://mahjmahj.co/compare/american-vs-taiwanese-mahjong',
    type: 'article',
    siteName: 'MAHJ MAHJ',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'American Mahjong vs. Taiwanese Mahjong: Key Differences',
    description:
      'American Mahjong plays 13 tiles with jokers and an NMJL card. Taiwanese Mahjong plays a 16-tile hand with no jokers or card. Compare both side by side.',
  },
};

const faqs = [
  {
    question: 'Is Taiwanese Mahjong harder than American Mahjong?',
    answer:
      'Not exactly harder, just different. Taiwanese Mahjong hands hold 16 tiles instead of 13, which means more combinations to track from the first turn. American Mahjong has fewer tiles in hand but adds jokers, the Charleston, and a card that changes every year. Each style has its own learning curve.',
  },
  {
    question: 'Does Taiwanese Mahjong use jokers like American Mahjong?',
    answer:
      'No. American Mahjong uses 8 joker tiles as wild substitutes, and they are central to how hands are built. Taiwanese Mahjong has no jokers. Every tile in a Taiwanese hand is a real suit, honor, or bonus tile, with no wild cards involved.',
  },
  {
    question: 'Do you need a card to play Taiwanese Mahjong?',
    answer:
      'No. Taiwanese Mahjong needs no external card. Its winning structures come from the tiles and the scoring conventions your group plays by. American Mahjong requires the current NMJL card, republished every spring, to know which hands are legal that year.',
  },
  {
    question: 'How many tiles do American and Taiwanese Mahjong use?',
    answer:
      'American Mahjong hands are built from 13 tiles before the winning tile, the same starting count as Hong Kong Mahjong. Taiwanese Mahjong hands hold 16 tiles, three more, which is the style’s defining structural feature.',
  },
  {
    question: 'Which is more social, American or Taiwanese Mahjong?',
    answer:
      'Both are social games built around a table of four, but they lean different ways. American Mahjong has a strong US club and community-center culture built around teaching newcomers. Taiwanese Mahjong tends to feel louder and more kinetic at the table, driven by the larger hand and faster decision pace.',
  },
];

const schema = faqSchema(faqs);

export default function AmericanVsTaiwanesePage() {
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
            American Mahjong vs. Taiwanese Mahjong: Key Differences
          </h1>
          <p style={{ color: 'var(--td2)' }} className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            One plays 13 tiles against a card that resets every year. The other plays a fuller 16-tile hand with no card and no jokers at all. Here is how they compare.
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
              American Mahjong vs. Taiwanese Mahjong: what&apos;s the difference?
            </h2>
            <p
              style={{ color: 'var(--espresso)', background: 'var(--paper)', border: '1px solid var(--bone)', borderLeft: '3px solid var(--terra)' }}
              className="text-lg leading-relaxed mb-2 rounded-lg p-5"
            >
              American Mahjong plays 13 tiles with jokers and an annual NMJL card. Taiwanese Mahjong plays a 16-tile hand with no jokers and no card, scored in tai.
            </p>
            <p style={{ color: 'var(--walnut)', fontSize: '0.8rem' }} className="mb-6">
              Comparison reviewed September 2026.
            </p>
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed mb-4">
              American Mahjong and Taiwanese Mahjong sit at opposite ends of the style spectrum. American Mahjong is pattern-driven: you play against a card published annually by the National Mah Jongg League, and jokers do a lot of the work in building a hand. Taiwanese Mahjong is tile-driven: there is no card and no jokers, just a fuller 16-tile hand and a faster, more layered table rhythm.
            </p>
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed">
              Both are four-player, social games with real depth. Here is where they actually differ.
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
                  <><strong>Tile count:</strong> American hands hold 13 tiles; Taiwanese hands hold 16, the largest hand of the three main styles.</>,
                  <><strong>Scoring:</strong> American Mahjong scores by matching a hand on the NMJL card; Taiwanese Mahjong scores in tai, based on hand features.</>,
                  <><strong>Jokers:</strong> American Mahjong uses 8 jokers as wild tiles; Taiwanese Mahjong uses none.</>,
                  <><strong>Learning curve:</strong> American Mahjong front-loads a card and the Charleston; Taiwanese Mahjong front-loads more tiles per hand and more decisions per turn.</>,
                  <><strong>Where it is played:</strong> American Mahjong has a strong US club and community-center culture; Taiwanese Mahjong is common in communities with Taiwanese ties.</>,
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
                    <th style={{ color: 'var(--mustard)', fontFamily: 'var(--font-heading)', fontSize: '0.7rem', letterSpacing: '0.08em' }} className="text-left px-5 py-4 font-semibold">American</th>
                    <th style={{ color: 'var(--teal)', fontFamily: 'var(--font-heading)', fontSize: '0.7rem', letterSpacing: '0.08em' }} className="text-left px-5 py-4 font-semibold">Taiwanese</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Players', '4', '4'],
                    ['Hand size', '13 tiles, plus the Charleston', '16 tiles'],
                    ['Full tile set', '152 tiles (incl. 8 jokers)', '144 tiles'],
                    ['Jokers', '8, used as wild tiles', 'None'],
                    ['Scoring language', 'Pattern match vs. the NMJL card', 'Tai (points per feature)'],
                    ['Annual card required', 'Yes, published each spring', 'No'],
                    ['Pace', 'Moderate, social', 'Moderate, kinetic'],
                    ['Signature mechanic', 'Charleston + joker swaps', '16-tile open hand building'],
                    ['Best known for', 'Club culture, pattern-based hands', 'A fuller, faster-moving hand'],
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
                  body: 'American Mahjong hands are built from 13 tiles, the same starting count as Hong Kong Mahjong. Taiwanese Mahjong hands hold 16 tiles, three more than American or Hong Kong. That extra material means more combinations to track and more decisions per turn from the very first draw.',
                },
                {
                  title: 'Jokers vs. no jokers',
                  body: 'American sets include 8 joker tiles that substitute into exposed sets, a mechanic that shapes how hands are built and how exposures get read at the table. Taiwanese Mahjong has no joker substitution. Every meld is built from tiles genuinely drawn or claimed, so hand-reading works differently between the two styles.',
                },
                {
                  title: 'The card, or the lack of one',
                  body: 'American Mahjong requires the current NMJL card, republished every spring with that year’s legal winning hands. Taiwanese Mahjong needs no card at all. Winning hands are built around the 16-tile structure itself and the scoring conventions a group agrees on, and those do not change year to year.',
                },
                {
                  title: 'Scoring philosophy',
                  body: 'American Mahjong scores by matching your completed hand to a specific listing on the NMJL card, each with its own assigned value. Taiwanese Mahjong scores in tai, points awarded for the structure, concealment, and composition of the winning hand, similar in spirit to Hong Kong faan but with its own conventions.',
                },
                {
                  title: 'Table feel',
                  body: 'American Mahjong sessions tend to be warm and social, often built around regular club or community groups with an emphasis on teaching newcomers. Taiwanese Mahjong sessions tend to feel louder and more kinetic, driven by the larger hand and the steadier stream of calls and decisions it creates.',
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
              If you want a defined list of goal hands to work toward, American Mahjong’s card gives you that structure from day one, at the cost of learning jokers and the Charleston up front. If you would rather start with more tiles in hand and build instinct for the table without a card to consult, Taiwanese Mahjong’s 16-tile structure is the more direct route. As with any style, your local community usually settles the question.
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
                { label: 'American Mahjong: full guide', href: '/styles/american-mahjong' },
                { label: 'Taiwanese Mahjong: full guide', href: '/styles/taiwanese-mahjong' },
                { label: 'All three styles compared', href: '/compare/mahjong-styles' },
                { label: 'American vs. Hong Kong Mahjong', href: '/compare/american-vs-hong-kong-mahjong' },
                { label: 'Hong Kong vs. Taiwanese Mahjong', href: '/compare/hong-kong-vs-taiwanese-mahjong' },
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
