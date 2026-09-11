import type { Metadata } from 'next';
import Link from 'next/link';
import { faqSchema } from '@/lib/schema';
import EmailSignup from '@/components/EmailSignup';

export const metadata: Metadata = {
  title: 'American Mahjong vs. Hong Kong Mahjong: Key Differences',
  description:
    'American Mahjong uses jokers and an annual NMJL card. Hong Kong Mahjong uses faan scoring and no card. Compare tile count, scoring, and pace side by side.',
  alternates: {
    canonical: 'https://mahjmahj.co/compare/american-vs-hong-kong-mahjong',
  },
  openGraph: {
    title: 'American Mahjong vs. Hong Kong Mahjong: Key Differences',
    description:
      'American Mahjong uses jokers and an annual NMJL card. Hong Kong Mahjong uses faan scoring and no card. Compare tile count, scoring, and pace side by side.',
    url: 'https://mahjmahj.co/compare/american-vs-hong-kong-mahjong',
    type: 'article',
    siteName: 'MAHJ MAHJ',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'American Mahjong vs. Hong Kong Mahjong: Key Differences',
    description:
      'American Mahjong uses jokers and an annual NMJL card. Hong Kong Mahjong uses faan scoring and no card. Compare tile count, scoring, and pace side by side.',
  },
};

const faqs = [
  {
    question: 'Is American Mahjong the same as Hong Kong Mahjong?',
    answer:
      'No. They share a tile set and a basic four-sets-plus-a-pair goal, but the rules differ sharply. American Mahjong is played against an annual NMJL card and uses jokers as wild tiles. Hong Kong Mahjong has no card and no jokers, and scores hands using faan.',
  },
  {
    question: 'Which is easier to learn, American or Hong Kong Mahjong?',
    answer:
      'It depends on how you like to learn. Hong Kong Mahjong has a shorter rule set: build four sets and a pair, no card to buy. American Mahjong has more upfront pieces (the Charleston, jokers, the card) but the card tells you exactly which hands are legal, which some beginners find easier to follow.',
  },
  {
    question: 'Why does American Mahjong use jokers and Hong Kong Mahjong does not?',
    answer:
      'The two styles developed along separate paths. American Mahjong, formalized by the National Mah Jongg League, built jokers into its hand structure as wild substitutes. Hong Kong Mahjong kept the traditional tile set without wild tiles, so every hand is built entirely from the tiles drawn or called.',
  },
  {
    question: 'Do American and Hong Kong Mahjong use the same tiles?',
    answer:
      'They share the core families: dots, bamboo, characters, winds, dragons, and flowers. American sets add 8 joker tiles that Hong Kong sets do not include. Hong Kong hands are built from 13 tiles; American hands also start at 13, then move through the Charleston before play.',
  },
  {
    question: 'Can I switch between American and Hong Kong Mahjong once I know one?',
    answer:
      'Many players do, though it takes adjustment. Coming from Hong Kong Mahjong, the biggest shift is learning to read the NMJL card and use jokers. Coming from American Mahjong, the biggest shift is playing without a card or jokers and learning faan scoring instead.',
  },
];

const schema = faqSchema(faqs);

export default function AmericanVsHongKongPage() {
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
            American Mahjong vs. Hong Kong Mahjong: Key Differences
          </h1>
          <p style={{ color: 'var(--td2)' }} className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Same tile families, very different games. One plays off a card that changes every year and leans on jokers. The other has no card and no jokers, and scores every hand in faan.
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
              American Mahjong vs. Hong Kong Mahjong: what&apos;s the difference?
            </h2>
            <p
              style={{ color: 'var(--espresso)', background: 'var(--paper)', border: '1px solid var(--bone)', borderLeft: '3px solid var(--terra)' }}
              className="text-lg leading-relaxed mb-2 rounded-lg p-5"
            >
              American Mahjong uses jokers and an annual NMJL card that defines legal hands each year. Hong Kong Mahjong has no card and no jokers, and scores hands with faan.
            </p>
            <p style={{ color: 'var(--walnut)', fontSize: '0.8rem' }} className="mb-6">
              Comparison reviewed September 2026.
            </p>
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed mb-4">
              Both styles use four players, a shared tile set, and the same broad goal: build a complete hand and be the first to declare it. Past that, they part ways. American Mahjong is played against a card published annually by the National Mah Jongg League, and jokers are central to how hands come together. Hong Kong Mahjong has no card to buy and no jokers at all. Instead, every hand is scored in faan based on the features it contains.
            </p>
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed">
              If you already play one style and are curious about the other, or you are choosing a starting style, here is how they stack up.
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
                  <><strong>Tile count:</strong> both hold 13 tiles during play; American hands run through the Charleston first, Hong Kong hands do not.</>,
                  <><strong>Scoring:</strong> Hong Kong scores in faan (points for hand features); American scores by matching a hand on the NMJL card.</>,
                  <><strong>Jokers:</strong> American Mahjong uses 8 jokers as wild tiles; Hong Kong Mahjong uses none.</>,
                  <><strong>Learning curve:</strong> Hong Kong has fewer moving parts to start (no card, no jokers); American has more upfront pieces, but the card spells out exactly which hands count.</>,
                  <><strong>Where it is played:</strong> American Mahjong has a strong US club and community-center culture; Hong Kong Mahjong is widely played in Chinese-American communities and clubs.</>,
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
                    <th style={{ color: 'var(--terra)', fontFamily: 'var(--font-heading)', fontSize: '0.7rem', letterSpacing: '0.08em' }} className="text-left px-5 py-4 font-semibold">Hong Kong</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Players', '4', '4'],
                    ['Hand size', '13 tiles, plus the Charleston', '13 tiles (14 to win)'],
                    ['Full tile set', '152 tiles (incl. 8 jokers)', '144 tiles'],
                    ['Jokers', '8, used as wild tiles', 'None'],
                    ['Scoring language', 'Pattern match vs. the NMJL card', 'Faan (points per feature)'],
                    ['Annual card required', 'Yes, published each spring', 'No'],
                    ['Pace', 'Moderate, social', 'Fast to moderate'],
                    ['Signature mechanic', 'Charleston + joker swaps', 'Faan accumulation'],
                    ['Best known for', 'Club culture, pattern-based hands', 'Speed, strategy, no card to memorize'],
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
                  title: 'The NMJL card',
                  body: 'American Mahjong is built around the National Mah Jongg League card, republished every spring with that year’s legal winning hands. Without the current card, you cannot play a standard American game. Hong Kong Mahjong needs no external card. Its winning structure, four sets plus a pair, is fixed and does not change year to year.',
                },
                {
                  title: 'Jokers',
                  body: 'American sets include 8 joker tiles that substitute into exposed sets, which changes how hands are read and defended against. Hong Kong Mahjong has no jokers at all. Every set in a Hong Kong hand is built from tiles actually drawn or claimed, with no wild substitutes.',
                },
                {
                  title: 'Scoring',
                  body: 'Hong Kong Mahjong scores in faan, points awarded for specific features of the winning hand, such as a pure suit or a self-draw. Most groups set a minimum faan requirement to win, commonly around 3, though house rules vary. American Mahjong scores by matching your completed hand to a specific listing on the NMJL card, which assigns its own point value.',
                },
                {
                  title: 'Getting started',
                  body: 'The Charleston, a structured pregame tile exchange, is unique to American Mahjong and happens before the first discard. Hong Kong Mahjong has no equivalent step: tiles are dealt, the dealer discards, and play begins immediately.',
                },
                {
                  title: 'Table culture',
                  body: 'American Mahjong has deep roots in US community and club settings, including Jewish community centers and senior centers, with a strong tradition of experienced players teaching newcomers. Hong Kong Mahjong is widely played in communities with larger Chinese-American populations, often with a faster, more strategic table feel.',
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
              If you want the fewest rules to start with, Hong Kong Mahjong has the shorter on-ramp: no card, no jokers, a clean four-sets-and-a-pair goal. If you want a structured path with a defined list of legal hands and a strong local club scene to learn alongside, American Mahjong is built for exactly that. Either way, your local community is usually the deciding factor, since you learn mahjong fastest at a real table.
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
                { label: 'Hong Kong Mahjong: full guide', href: '/styles/hong-kong-mahjong' },
                { label: 'All three styles compared', href: '/compare/mahjong-styles' },
                { label: 'American vs. Taiwanese Mahjong', href: '/compare/american-vs-taiwanese-mahjong' },
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
