import type { Metadata } from 'next';
import Link from 'next/link';
import { faqSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Mahjong Styles Comparison — Hong Kong vs Taiwanese vs American',
  description:
    'Compare Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong side by side. Hand size, scoring, jokers, pace, and which style is right for you.',
  alternates: {
    canonical: 'https://mahjmahj.co/compare/mahjong-styles',
  },
  openGraph: {
    title: 'Mahjong Styles Comparison — Hong Kong vs Taiwanese vs American',
    description:
      'Compare Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong side by side. Hand size, scoring, jokers, pace, and which style is right for you.',
    url: 'https://mahjmahj.co/compare/mahjong-styles',
    type: 'article',
    siteName: 'MAHJ MAHJ',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mahjong Styles Comparison — Hong Kong vs Taiwanese vs American',
    description:
      'Compare Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong side by side.',
  },
};

const faqs = [
  {
    question: 'What are the main types of Mahjong?',
    answer:
      'For most players in the United States, the three main styles are Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong. Each has its own tile count, scoring system, hand structure, and table culture. There are many regional variations worldwide, but these three represent the most commonly played styles in US communities.',
  },
  {
    question: 'What is the difference between Mahjong styles?',
    answer:
      'The key differences come down to hand size, scoring system, jokers, whether an annual card is required, and overall pace and feel. Hong Kong Mahjong uses 13 tiles, faan-based scoring, no jokers, and no card. Taiwanese Mahjong uses 16 tiles, a points-based system, no jokers, and no card. American Mahjong uses 13 tiles, pattern-based scoring against an annual NMJL card, and jokers are central to play.',
  },
  {
    question: 'Which Mahjong style is easiest for beginners?',
    answer:
      'It depends on the player. Hong Kong Mahjong is often recommended for its clean structure — build four sets and a pair — and no annual card to memorize. American Mahjong has a structured card that tells you exactly which hands count, which some beginners find helpful. Taiwanese Mahjong has a larger hand and more dynamic play that can feel overwhelming at first. The best starting style is usually whatever your local community plays, because you will have people to learn with.',
  },
  {
    question: 'Is American Mahjong the same as Hong Kong Mahjong?',
    answer:
      'No. American Mahjong and Hong Kong Mahjong are distinct styles with different rules, scoring systems, and table cultures. American Mahjong uses jokers as wild tiles and requires an annual card published by the National Mah Jongg League. Hong Kong Mahjong uses no jokers and no annual card. The tile sets are similar but the games play very differently.',
  },
  {
    question: 'Is Taiwanese Mahjong the same as Hong Kong Mahjong?',
    answer:
      'No. They share the same tile set and general structure but differ significantly. Taiwanese Mahjong uses a 16-tile hand (versus 13 in Hong Kong), has different hand patterns and scoring conventions, and tends to have a more kinetic and social energy at the table. Both styles use no jokers and no annual card, but they are distinct experiences.',
  },
  {
    question: 'Do all Mahjong styles use jokers?',
    answer:
      'No. Only American Mahjong uses jokers as standard wild tiles — they are central to how hands are built and exchanged. Hong Kong Mahjong and Taiwanese Mahjong do not use jokers at all. The presence or absence of jokers significantly changes how the game feels and how hands are constructed.',
  },
  {
    question: 'Do you need a card for every style?',
    answer:
      'No. Only American Mahjong requires an annual card — the National Mah Jongg League card, which lists the valid winning hands for that year and must be purchased annually. Hong Kong Mahjong and Taiwanese Mahjong have consistent hand structures that do not change year to year, so no annual card is needed.',
  },
  {
    question: 'Which Mahjong style is most popular in the US?',
    answer:
      'American Mahjong has a strong club presence across the country, particularly in community and country club settings. Hong Kong Mahjong is widely played in areas with larger Chinese-American communities. Taiwanese Mahjong is common in communities with Taiwanese ties. All three have active players in the US, and your local community is usually the best guide to which style is most accessible near you.',
  },
];

const schema = faqSchema(faqs);

export default function MahjongStylesComparePage() {
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
            style={{ color: 'var(--terra)', fontFamily: 'var(--font-heading)', fontSize: '0.7rem', letterSpacing: '0.15em' }}
            className="uppercase mb-4"
          >
            Style Guide
          </p>
          <h1
            style={{ color: 'var(--td1)', fontFamily: 'var(--font-heading)' }}
            className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
          >
            Mahjong Styles Compared
          </h1>
          <p style={{ color: 'var(--td2)' }} className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Hong Kong, Taiwanese, and American Mahjong all use the same tiles — but they play like different games. Here is what sets each one apart.
          </p>
        </div>
      </section>

      {/* Main content */}
      <main style={{ background: 'var(--linen)' }} className="px-6 py-16 md:py-20">
        <div className="max-w-4xl mx-auto content-article">

          {/* Intro */}
          <section className="mb-16">
            {/* Answer capsule (GEO standard): question H2 + 120-150 char standalone answer */}
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-4"
            >
              American Mahjong vs Hong Kong vs Taiwanese — what&apos;s the difference?
            </h2>
            <p
              style={{ color: 'var(--espresso)', background: 'var(--paper)', border: '1px solid var(--bone)', borderLeft: '3px solid var(--terra)' }}
              className="text-lg leading-relaxed mb-2 rounded-lg p-5"
            >
              Hong Kong Mahjong plays a 13-tile hand with faan scoring, Taiwanese Mahjong plays 16 tiles, and American Mahjong uses jokers and an annual NMJL card.
            </p>
            <p style={{ color: 'var(--walnut)', fontSize: '0.8rem' }} className="mb-6">
              Style guide reviewed July 2026.
            </p>
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed mb-4">
              Mahjong is not one game — it is a family of games. Three styles dominate the US landscape: <strong>Hong Kong Mahjong</strong>, <strong>Taiwanese Mahjong</strong>, and <strong>American Mahjong</strong>. They share a tile set and a basic goal, but they differ in hand size, scoring philosophy, pace, and the role jokers play at the table.
            </p>
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed mb-4">
              Hong Kong Mahjong is clean and strategic — a compact 13-tile hand, faan-based scoring, and no card required. Taiwanese Mahjong is fuller and more kinetic — a 16-tile hand that creates a bigger, louder game with more tiles in play at once. American Mahjong is social and pattern-driven — jokers are central, and each year a new NMJL card defines which hands are valid.
            </p>
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed">
              Understanding these differences will help you choose a starting style, understand what your group is playing, and make sense of why mahjong can look so different from table to table.
            </p>
          </section>

          {/* Three styles at a glance */}
          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-8"
            >
              Three main styles at a glance
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Hong Kong Mahjong',
                  color: 'var(--terra)',
                  href: '/styles/hong-kong-mahjong',
                  desc: 'Thirteen tiles, faan scoring, no jokers, no annual card. The most widely played traditional style. Clean structure, fast pace, and deep strategic layers once you know the basics.',
                  tag: 'Strategic · Fast · Elegant',
                },
                {
                  title: 'Taiwanese Mahjong',
                  color: 'var(--teal)',
                  href: '/styles/taiwanese-mahjong',
                  desc: 'Sixteen tiles, a fuller hand, livelier rounds. No jokers, no card required. More tiles in play means more possibilities — and more energy at the table.',
                  tag: 'Warm · Lively · Expansive',
                },
                {
                  title: 'American Mahjong',
                  color: 'var(--mustard)',
                  href: '/styles/american-mahjong',
                  desc: 'Pattern-based play against an annual NMJL card. Jokers are wild and central to building hands. Strong club culture in the US with a distinct social energy.',
                  tag: 'Social · Clubby · Pattern-driven',
                },
              ].map((style) => (
                <div
                  key={style.title}
                  style={{ background: 'var(--paper)', border: '1px solid var(--bone)', borderTop: `3px solid ${style.color}` }}
                  className="rounded-lg p-6"
                >
                  <h3
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '0.9rem' }}
                    className="font-bold mb-3"
                  >
                    {style.title}
                  </h3>
                  <p style={{ color: 'var(--walnut)', fontSize: '0.9rem' }} className="leading-relaxed mb-4">
                    {style.desc}
                  </p>
                  <p style={{ color: style.color, fontSize: '0.75rem', fontFamily: 'var(--font-heading)' }} className="mb-4">
                    {style.tag}
                  </p>
                  <Link
                    href={style.href}
                    style={{ color: style.color, fontSize: '0.85rem', fontWeight: 600 }}
                    className="hover:underline"
                  >
                    Full guide →
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Big comparison table */}
          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-8"
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
                    <th style={{ color: 'var(--mustard)', fontFamily: 'var(--font-heading)', fontSize: '0.7rem', letterSpacing: '0.08em' }} className="text-left px-5 py-4 font-semibold">American</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Typical players', '4', '4', '4'],
                    ['Hand size', '13 tiles', '16 tiles', '13 tiles'],
                    ['Jokers', 'None', 'None', 'Central wild tiles'],
                    ['Scoring language', 'Faan (points per feature)', 'Points-based', 'Pattern match vs. card'],
                    ['Pace', 'Fast to moderate', 'Moderate, kinetic', 'Moderate, social'],
                    ['Annual card required', 'No', 'No', 'Yes (NMJL card)'],
                    ['Core feel', 'Sharp and strategic', 'Full and lively', 'Social and pattern-driven'],
                    ['Signature mechanic', 'Faan accumulation', '16-tile open hand building', 'Joker swaps + card matching'],
                    ['Best for', 'Strategy lovers, traditionalists', 'Social players who want more', 'Club players, pattern-thinkers'],
                  ].map((row, i) => (
                    <tr
                      key={row[0]}
                      style={{ background: i % 2 === 0 ? 'var(--paper)' : 'var(--linen)', borderBottom: '1px solid var(--bone)' }}
                    >
                      <td style={{ color: 'var(--espresso)', fontWeight: 600 }} className="px-5 py-4">{row[0]}</td>
                      <td style={{ color: 'var(--walnut)' }} className="px-5 py-4">{row[1]}</td>
                      <td style={{ color: 'var(--walnut)' }} className="px-5 py-4">{row[2]}</td>
                      <td style={{ color: 'var(--walnut)' }} className="px-5 py-4">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* What all styles share */}
          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-6"
            >
              What all styles share
            </h2>
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed mb-6">
              Despite their differences, every style of mahjong is built on the same foundation:
            </p>
            <ul className="space-y-3">
              {[
                'A tile set of 136–144 tiles divided into suits, honors, and bonus tiles',
                'Four players seated around a table',
                'A turn structure of drawing and discarding tiles',
                'A goal of building a complete hand from sets and a pair',
                'A shared culture of watching the table, reading discards, and making decisions',
                'A social dimension — mahjong is almost always played with people you know',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span style={{ color: 'var(--terra)', marginTop: '0.25rem' }}>&#9642;</span>
                  <span style={{ color: 'var(--walnut)' }} className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Who each style is for */}
          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-8"
            >
              Who each style is for
            </h2>

            <div className="space-y-10">
              <div style={{ background: 'var(--paper)', border: '1px solid var(--bone)', borderLeft: '4px solid var(--terra)' }} className="rounded-lg p-7">
                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '1rem' }} className="font-bold mb-4">
                  Hong Kong Mahjong: who it is for
                </h3>
                <ul className="space-y-2">
                  {[
                    'Players who enjoy strategy games and want a game with real depth',
                    'Anyone who dislikes memorizing a new card each year',
                    'People who prefer faster, cleaner rounds',
                    'Players who want to understand traditional mahjong structure before branching out',
                    'Those with access to Hong Kong Mahjong communities or groups',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span style={{ color: 'var(--terra)', marginTop: '0.15rem' }}>&#8594;</span>
                      <span style={{ color: 'var(--walnut)', fontSize: '0.95rem' }} className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ background: 'var(--paper)', border: '1px solid var(--bone)', borderLeft: '4px solid var(--teal)' }} className="rounded-lg p-7">
                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '1rem' }} className="font-bold mb-4">
                  Taiwanese Mahjong: who it is for
                </h3>
                <ul className="space-y-2">
                  {[
                    'Players who like a bigger hand and more options per round',
                    'Those who enjoy a livelier, higher-energy table atmosphere',
                    'Anyone who connects with Taiwanese-American communities',
                    'Players who want a fuller game without the annual card requirement',
                    'Those who enjoy the feeling of working with more tiles and more possibilities',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span style={{ color: 'var(--teal)', marginTop: '0.15rem' }}>&#8594;</span>
                      <span style={{ color: 'var(--walnut)', fontSize: '0.95rem' }} className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ background: 'var(--paper)', border: '1px solid var(--bone)', borderLeft: '4px solid var(--mustard)' }} className="rounded-lg p-7">
                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '1rem' }} className="font-bold mb-4">
                  American Mahjong: who it is for
                </h3>
                <ul className="space-y-2">
                  {[
                    'Players who enjoy pattern recognition and working against a defined list',
                    'Those who already belong to or want to join established mahjong clubs',
                    'Anyone who finds jokers fun and likes the strategic layer they add',
                    'Players who enjoy a social, club-style game with regular group sessions',
                    'Those who prefer a game where valid hands are clearly spelled out each year',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span style={{ color: 'var(--mustard)', marginTop: '0.15rem' }}>&#8594;</span>
                      <span style={{ color: 'var(--walnut)', fontSize: '0.95rem' }} className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Key differences */}
          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-8"
            >
              Key differences that matter most
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: 'Hand size',
                  body: 'Taiwanese Mahjong uses a 16-tile hand, which means more tiles in play, more drawing, more discarding, and a more kinetic game. Hong Kong and American both use 13-tile hands, which creates a tighter, faster structure.',
                },
                {
                  title: 'Scoring system',
                  body: 'Hong Kong uses faan — you score points based on specific features of your winning hand. Taiwanese uses a points-based system with different conventions. American Mahjong scores based entirely on whether your completed hand matches a pattern on the annual card. These are fundamentally different scoring philosophies.',
                },
                {
                  title: 'Jokers',
                  body: 'Only American Mahjong uses jokers as wild tiles. In American Mahjong, jokers can substitute for any tile in a set, and players can swap jokers out of exposed sets during play. This mechanic changes how hands are built and how players interact. Hong Kong and Taiwanese Mahjong have no jokers.',
                },
                {
                  title: 'Annual card required',
                  body: 'American Mahjong players must purchase the NMJL card each year, which defines the valid winning hands for that season. Without the card, you cannot play. Hong Kong and Taiwanese Mahjong require no annual purchase — the rules are stable.',
                },
                {
                  title: 'Table feel',
                  body: 'American Mahjong often has a warm, social club atmosphere — groups of four who play regularly together. Hong Kong Mahjong tends to feel sharper and more strategic. Taiwanese Mahjong has a lively, energetic quality because there are more tiles, more decisions, and often more noise.',
                },
              ].map((item) => (
                <div key={item.title} style={{ borderBottom: '1px solid var(--bone)' }} className="pb-6">
                  <h3
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '0.95rem' }}
                    className="font-bold mb-2"
                  >
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--walnut)' }} className="leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Quick guide CTA */}
          <section
            className="mb-16 rounded-lg p-8 text-center"
            style={{ background: 'var(--sand)', border: '1px solid var(--bone)' }}
          >
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '1.1rem' }}
              className="font-bold mb-3"
            >
              Which style is right for me?
            </h2>
            <p style={{ color: 'var(--walnut)' }} className="leading-relaxed mb-6 max-w-xl mx-auto">
              If you want a short answer: Hong Kong Mahjong for strategy and clean structure, Taiwanese for social energy and a bigger game, American for clubs and pattern-based play. For a more detailed breakdown based on your preferences and situation, see our full guide.
            </p>
            <Link
              href="/learn/which-mahjong-style-is-right-for-me"
              style={{ background: 'var(--terra)', color: 'white', fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.05em' }}
              className="inline-block px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
            >
              Find your style &#8594;
            </Link>
          </section>

          {/* Best for beginners */}
          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-6"
            >
              Best Mahjong style for beginners
            </h2>
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed mb-4">
              There is no universally correct answer, but here is a practical framework:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                'Start with what your community plays — learning alongside others is the fastest path',
                'If you are choosing on your own, Hong Kong Mahjong offers the clearest structure and the fastest rounds',
                'If you enjoy pattern-based games and want to join existing clubs, American Mahjong has infrastructure to support beginners',
                'If your social circle plays Taiwanese Mahjong, the larger hand is worth learning for the shared experience',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span style={{ color: 'var(--terra)', marginTop: '0.25rem' }}>&#9642;</span>
                  <span style={{ color: 'var(--walnut)' }} className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p style={{ color: 'var(--walnut)' }} className="leading-relaxed">
              All three styles have a learning curve. The goal is to start playing as soon as possible — you learn mahjong at the table, not from a page.
            </p>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-8"
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

          {/* Where to go next */}
          <section
            className="rounded-lg p-8"
            style={{ background: 'var(--espresso)' }}
          >
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--td1)', fontSize: '1.1rem' }}
              className="font-bold mb-6 text-center"
            >
              Where to go next
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: 'How to play Mahjong — beginner guide', href: '/learn/how-to-play-mahjong' },
                { label: 'Which style is right for me?', href: '/learn/which-mahjong-style-is-right-for-me' },
                { label: 'Hong Kong Mahjong — full guide', href: '/styles/hong-kong-mahjong' },
                { label: 'Taiwanese Mahjong — full guide', href: '/styles/taiwanese-mahjong' },
                { label: 'American Mahjong — full guide', href: '/styles/american-mahjong' },
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
