import type { Metadata } from 'next';
import Link from 'next/link';
import { faqSchema, articleSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Hong Kong Mahjong — Rules, Strategy, and Scoring',
  description:
    'A complete guide to Hong Kong Mahjong: rules, tile setup, faan scoring, winning hands, strategy, and etiquette. Learn how to play one of the most popular mahjong styles in the world.',
  alternates: {
    canonical: 'https://mahjmahj.co/styles/hong-kong-mahjong',
  },
  openGraph: {
    title: 'Hong Kong Mahjong — Rules, Strategy, and Scoring',
    description:
      'A complete guide to Hong Kong Mahjong: rules, tile setup, faan scoring, winning hands, strategy, and etiquette.',
    url: 'https://mahjmahj.co/styles/hong-kong-mahjong',
    type: 'article',
    siteName: 'MAHJ MAHJ',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hong Kong Mahjong — Rules, Strategy, and Scoring',
    description:
      'A complete guide to Hong Kong Mahjong: rules, tile setup, faan scoring, winning hands, strategy, and etiquette.',
  },
};

const faqs = [
  {
    question: 'Is Hong Kong Mahjong good for beginners?',
    answer:
      'Yes. It is one of the most approachable mahjong styles because the core rules are straightforward — build four sets and one pair — and there is no annual card to memorize. New players can start with basic hands and gradually learn the scoring system as they gain experience.',
  },
  {
    question: 'How many tiles do you have in Hong Kong Mahjong?',
    answer:
      'Players usually build toward a 14-tile winning hand, but during most of the game you hold 13 tiles and draw or claim a 14th to complete your hand. The dealer may begin with 14 tiles and discard down to 13.',
  },
  {
    question: 'What is faan in Hong Kong Mahjong?',
    answer:
      'Faan is the scoring unit used to measure how valuable a hand is. Different hand features and patterns add faan — for example, self-draw, a pure suit hand, or a set of dragons. Many groups require a minimum number of faan to win, and the payout structure often scales with the total faan achieved.',
  },
  {
    question: 'Do you need a card to play Hong Kong Mahjong?',
    answer:
      'No. Unlike American Mahjong, Hong Kong Mahjong does not use an annual card. The valid hands and scoring rules are consistent across sessions, which means you do not need to buy or memorize a new card each year.',
  },
  {
    question: 'Is Hong Kong Mahjong faster than American Mahjong?',
    answer:
      'Often, yes. Hong Kong Mahjong rounds tend to move quickly because the hand structure is simpler and there is no card to consult. Experienced players can complete a full game of multiple rounds in under two hours.',
  },
  {
    question: 'What is the difference between Hong Kong Mahjong and Taiwanese Mahjong?',
    answer:
      'One major difference is hand size: Taiwanese Mahjong typically uses a 16-tile hand while Hong Kong Mahjong uses 13. Taiwanese Mahjong also has different scoring conventions and unique hand patterns. Both styles share the same tile set but play quite differently at the table.',
  },
  {
    question: 'Can you play Hong Kong Mahjong casually?',
    answer:
      'Absolutely. Hong Kong Mahjong works well as a casual game with friends and family. Many groups play with relaxed house rules, minimal faan requirements, and simplified payouts. The game scales naturally from a friendly evening game to a more competitive setting.',
  },
];

const articleData = {
  headline: 'Hong Kong Mahjong — Rules, Strategy, and Scoring',
  description:
    'A complete guide to Hong Kong Mahjong: rules, tile setup, faan scoring, winning hands, strategy, and etiquette. Learn one of the most popular mahjong styles in the world.',
  url: 'https://mahjmahj.co/styles/hong-kong-mahjong',
  datePublished: '2026-04-22',
};

export default function HongKongMahjongPage() {
  const faqJsonLd = faqSchema(faqs);
  const articleJsonLd = articleSchema(articleData);

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Hero */}
      <section className="content-hero">
        <div className="content-hero-inner">
          <p
            className="content-hero-label"
          >
            Mahjong Styles
          </p>
          <h1
            className="mb-6"
          >
            Hong Kong Mahjong
          </h1>
          <p
            className="content-hero-subtitle"
          >
            Rules, Strategy, and Scoring
          </p>
          <div className="content-hero-divider" />
        </div>
      </section>

      {/* Main content */}
      <section className="content-body">
        <div className="content-body-inner">
          <div className="content-article">

            {/* Intro */}
            <p>
              Hong Kong Mahjong is one of the best places to start if you want a fast, strategic,
              highly replayable version of mahjong. It is usually played with four people, uses a
              13-tile hand that becomes 14 when you win, and rewards players for building efficient
              hands while watching the table closely.
            </p>
            <p>
              What makes Hong Kong Mahjong so appealing is the balance: the rules are learnable, the
              pace is lively, and the scoring system gives you room to grow. You can start by
              learning how to make basic winning hands, then gradually get better at reading
              discards, defending intelligently, and aiming for higher-value combinations.
            </p>
            <p>
              If you are new to the game, this guide will walk you through the essentials. If you
              are comparing styles, also see{' '}
              <Link href="/compare/mahjong-styles">Mahjong Styles Comparison</Link>,{' '}
              <Link href="/learn/how-to-play-mahjong">How to Play Mahjong</Link>, or{' '}
              <Link href="/events">browse events</Link>.
            </p>

            {/* What is HK Mahjong */}
            <h2>
              What is Hong Kong Mahjong?
            </h2>
            <p>Hong Kong Mahjong is a four-player mahjong style known for:</p>
            <ul>
              <li>a 13-tile hand structure</li>
              <li>no official annual card</li>
              <li>fast rounds and frequent decision-making</li>
              <li>a scoring system based on faan</li>
              <li>strong emphasis on efficiency, reading the table, and timing</li>
            </ul>
            <p>
              Many players love Hong Kong Mahjong because it feels clean and direct. You are usually
              trying to complete a hand made of four sets and one pair, but the scoring layer gives
              the game much more depth than that simple idea suggests.
            </p>

            {/* What you need */}
            <h2>
              What you need to play
            </h2>
            <p>A standard Hong Kong Mahjong setup usually includes:</p>
            <ul>
              <li>
                <strong>144 tiles</strong>, including:
                <ul style={{ marginTop: '0.35rem' }}>
                  <li>suits: dots, bamboo, characters</li>
                  <li>honors: winds and dragons</li>
                  <li>bonus tiles: flowers and seasons</li>
                </ul>
              </li>
              <li>dice</li>
              <li>four racks or pushers, depending on the set</li>
              <li>a table large enough to build walls and discard comfortably</li>
            </ul>
            <p>
              Some groups play with slight house-rule variations, especially around flowers, minimum
              faan, and payout structure.
            </p>

            {/* Tiles at a glance */}
            <h2>
              The tiles at a glance
            </h2>

            <h3>
              Suit tiles
            </h3>
            <p>
              These are the numbered tiles: <strong>Dots</strong>, <strong>Bamboo</strong>,{' '}
              <strong>Characters</strong>. Each suit runs from 1 to 9, with four copies of each
              tile.
            </p>

            <h3>
              Honor tiles
            </h3>
            <p>
              These are: East, South, West, North; Red, Green, and White dragons.
            </p>

            <h3>
              Bonus tiles
            </h3>
            <p>
              These are the flowers and seasons. Bonus tiles are usually set aside when drawn and
              replaced immediately, but the exact scoring treatment depends on house rules.
            </p>

            {/* Setup */}
            <h2>
              Setup
            </h2>
            <ol>
              <li>Seat four players around the table.</li>
              <li>Shuffle all tiles face down.</li>
              <li>Each player builds a wall.</li>
              <li>The walls are pushed together into a square.</li>
              <li>Dice are rolled to determine dealer and break point.</li>
              <li>Tiles are dealt to each player.</li>
            </ol>
            <p>
              In most games, each player starts with 13 tiles. The dealer may begin with 14 in order
              to make the first discard.
            </p>

            {/* Goal */}
            <h2>
              The goal of the game
            </h2>
            <p>
              The standard goal in Hong Kong Mahjong is to complete a winning hand made of:{' '}
              <strong>4 sets + 1 pair</strong>.
            </p>
            <p>A set is usually one of these:</p>
            <ul>
              <li>
                <strong>Pong</strong> — Three identical tiles
              </li>
              <li>
                <strong>Chow</strong> — Three consecutive tiles in the same suit (Example: 4-5-6
                bamboo)
              </li>
              <li>
                <strong>Kong</strong> — Four identical tiles
              </li>
              <li>
                <strong>Pair</strong> — Two identical tiles
              </li>
            </ul>

            {/* Gameplay */}
            <h2>
              How gameplay works
            </h2>
            <p>Gameplay moves clockwise. On your turn:</p>
            <ol>
              <li>Draw one tile.</li>
              <li>Decide whether your hand improves.</li>
              <li>Discard one tile.</li>
            </ol>

            <h3>
              Calling tiles
            </h3>
            <p>Players may call certain discarded tiles to complete sets.</p>
            <ul>
              <li>
                <strong>Chow</strong> — can usually only be claimed from the player immediately
                before you.
              </li>
              <li>
                <strong>Pong</strong> — can be claimed from any player if you have the other two
                matching tiles.
              </li>
              <li>
                <strong>Kong</strong> — can be declared if you complete a four-of-a-kind.
              </li>
            </ul>

            {/* Winning */}
            <h2>
              Winning
            </h2>
            <p>
              You win by completing a legal hand with four sets, one pair, and the required minimum
              score. Most groups require a minimum of 3 faan to win, though this varies by house
              rules. When you complete your hand, you declare your win and reveal your tiles for
              scoring.
            </p>

            {/* Faan scoring */}
            <h2>
              How faan scoring works
            </h2>
            <p>
              Hong Kong Mahjong scoring is built around <strong>faan</strong>. Different hand
              features add faan. Common examples include:
            </p>
            <ul>
              <li>all pongs</li>
              <li>pure suit hands</li>
              <li>dragon sets</li>
              <li>seat wind or prevailing wind sets</li>
              <li>self-draw (winning off the wall)</li>
              <li>concealed hand patterns</li>
              <li>flower bonuses</li>
            </ul>
            <p>
              The total faan achieved determines the payout. Many groups use a doubling system where
              each additional faan doubles the base payment — this creates a strong incentive to push
              for higher-value hands when conditions allow.
            </p>

            {/* Scoring table */}
            <h2>
              Common winning hands and scoring patterns
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>Hand / Pattern</th>
                    <th>What it Means</th>
                    <th>Typical Value Note</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Chicken Hand</strong></td>
                    <td>A valid hand with no special features</td>
                    <td>Minimum faan (often requires a minimum to win at all)</td>
                  </tr>
                  <tr>
                    <td><strong>All Chows</strong></td>
                    <td>All four sets are sequences; claimed, not self-drawn</td>
                    <td>Low value — efficient but not high scoring</td>
                  </tr>
                  <tr>
                    <td><strong>All Pongs</strong></td>
                    <td>All four sets are triplets</td>
                    <td>3+ faan depending on tile types</td>
                  </tr>
                  <tr>
                    <td><strong>Mixed One Suit</strong></td>
                    <td>One suit plus honor tiles</td>
                    <td>3 faan</td>
                  </tr>
                  <tr>
                    <td><strong>Pure One Suit</strong></td>
                    <td>One suit only, no honors</td>
                    <td>7 faan — a high-value target</td>
                  </tr>
                  <tr>
                    <td><strong>Dragon Pong</strong></td>
                    <td>A triplet of any dragon tile</td>
                    <td>1 faan per dragon pong</td>
                  </tr>
                  <tr>
                    <td><strong>Seat Wind Pong</strong></td>
                    <td>A triplet of your own seat wind</td>
                    <td>1 faan</td>
                  </tr>
                  <tr>
                    <td><strong>Prevailing Wind Pong</strong></td>
                    <td>A triplet of the round wind</td>
                    <td>1 faan</td>
                  </tr>
                  <tr>
                    <td><strong>Self-Draw</strong></td>
                    <td>Winning off the wall rather than a discard</td>
                    <td>1 faan; all players pay the winner</td>
                  </tr>
                  <tr>
                    <td><strong>Concealed Hand</strong></td>
                    <td>No called tiles — entire hand drawn from the wall</td>
                    <td>1 faan bonus, stacks with other patterns</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Strategy */}
            <h2>
              Strategy basics
            </h2>
            <ol>
              <li>
                <strong>Build efficiently — focus on shape.</strong> In early rounds, prioritize
                tiles that connect to the most other tiles in your hand. Isolated tiles with no
                neighbors or pairs are usually the first to discard.
              </li>
              <li>
                <strong>Watch discards.</strong> The discard pile tells you what tiles are safe to
                throw and what hands your opponents might be building. A tile that has already been
                discarded three times is much safer than one that has never appeared.
              </li>
              <li>
                <strong>Know when to stay cheap.</strong> If you are close to a low-faan hand and
                the game is progressing, it can be better to take the win than to chase a higher
                score that might never arrive.
              </li>
              <li>
                <strong>Know when to push for value.</strong> If the tiles are flowing your way and
                you have room to build, aim for higher faan patterns like pure suit or all pongs.
                The payout difference is significant.
              </li>
              <li>
                <strong>Respect defense.</strong> If another player is clearly close to winning,
                slow down. Avoid discarding dangerous tiles — especially honor tiles and terminal
                numbers that complete common patterns.
              </li>
            </ol>

            {/* Etiquette */}
            <h2>
              Etiquette at the table
            </h2>
            <ul>
              <li>
                <strong>Announce calls clearly.</strong> Say "pong," "chow," or "kong" aloud before
                picking up the tile.
              </li>
              <li>
                <strong>Discard promptly.</strong> After drawing or claiming, discard in a
                reasonable time. Slow play disrupts the rhythm for everyone.
              </li>
              <li>
                <strong>Keep your tiles organized but private.</strong> Arrange your hand so you can
                read it quickly without revealing information to others.
              </li>
              <li>
                <strong>Do not coach mid-hand.</strong> Commenting on another player's discards or
                decisions while a round is in play is generally frowned upon.
              </li>
              <li>
                <strong>Confirm the winning hand before celebrating.</strong> Reveal all tiles and
                let everyone verify the hand is valid before claiming the win.
              </li>
              <li>
                <strong>Agree on house rules before starting.</strong> Minimum faan, flower rules,
                and payout structure vary. A quick conversation before the first round prevents
                disputes later.
              </li>
              <li>
                <strong>Handle tiles respectfully.</strong> Avoid slamming or tossing tiles. Keep
                the wall neat and the discard area readable.
              </li>
            </ul>

            {/* Why people love it */}
            <h2>
              Why people love Hong Kong Mahjong
            </h2>
            <ul>
              <li>
                <strong>It is genuinely learnable.</strong> The core rules can be understood in one
                session. The strategic depth reveals itself over many games.
              </li>
              <li>
                <strong>Every game is different.</strong> The tile draw, seat positions, and opponent
                behavior create a constantly shifting puzzle.
              </li>
              <li>
                <strong>The pace is satisfying.</strong> Rounds move quickly enough to stay
                engaging, but slowly enough that thoughtful play is rewarded.
              </li>
              <li>
                <strong>No card to memorize.</strong> Unlike American Mahjong, you do not need to
                consult a card. The valid hands are consistent and internalized over time.
              </li>
              <li>
                <strong>It scales for any group.</strong> Whether you are playing casually with
                family or competitively with experienced players, Hong Kong Mahjong adapts to the
                group.
              </li>
              <li>
                <strong>The scoring adds drama.</strong> The faan system means a bold hand can pay
                off in a big way — and a risky discard can cost you.
              </li>
              <li>
                <strong>It is social.</strong> Mahjong is fundamentally a game played around a
                table with people. Hong Kong Mahjong keeps the focus on that interaction.
              </li>
            </ul>

            {/* FAQ */}
            <h2>
              Frequently asked questions
            </h2>

            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: 'var(--paper)',
                    borderLeft: '4px solid var(--terra)',
                    borderRadius: '0 8px 8px 0',
                    padding: '1.25rem 1.5rem',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--espresso)',
                      fontSize: '1rem',
                      marginTop: 0,
                      marginBottom: '0.5rem',
                    }}
                  >
                    {faq.question}
                  </h3>
                  <p style={{ marginBottom: 0, color: 'var(--walnut)' }}>{faq.answer}</p>
                </div>
              ))}
            </div>

            {/* Keep exploring */}
            <h2>
              Keep exploring
            </h2>
            <p>
              Ready to go deeper? These pages will help you compare styles, learn the fundamentals,
              or find a game near you.
            </p>
            <ul>
              <li>
                <Link href="/compare/mahjong-styles">Compare Mahjong Styles</Link> — see how Hong
                Kong Mahjong stacks up against Taiwanese and American Mahjong side by side.
              </li>
              <li>
                <Link href="/learn/how-to-play-mahjong">How to Play Mahjong</Link> — a
                beginner-friendly overview of the shared rules and concepts across all styles.
              </li>
              <li>
                <Link href="/events">Browse Events</Link> — find mahjong events and game nights in
                cities across the US.
              </li>
            </ul>

          </div>
        </div>
      </section>

      {/* Related styles */}
      <section
        style={{ backgroundColor: 'var(--sand)' }}
        className="px-6 py-14"
      >
        <div className="mx-auto max-w-3xl">
          <h2
            className="mb-8 text-2xl font-black"
           
          >
            Explore other styles
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/styles/taiwanese-mahjong"
              className="block rounded-xl p-6 transition-shadow hover:shadow-md"
              style={{ backgroundColor: 'var(--paper)', border: '1px solid var(--bone)' }}
            >
              <p
                className="mb-1 text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--terra)', fontFamily: 'var(--font-heading)' }}
              >
                Style Guide
              </p>
              <h3
                className="text-lg font-black"
               
              >
                Taiwanese Mahjong
              </h3>
              <p className="mt-2 text-sm" style={{ color: 'var(--walnut)' }}>
                16-tile hands, unique scoring patterns, and a fast-moving style popular in Taiwan
                and Taiwanese-American communities.
              </p>
            </Link>
            <Link
              href="/styles/american-mahjong"
              className="block rounded-xl p-6 transition-shadow hover:shadow-md"
              style={{ backgroundColor: 'var(--paper)', border: '1px solid var(--bone)' }}
            >
              <p
                className="mb-1 text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--terra)', fontFamily: 'var(--font-heading)' }}
              >
                Style Guide
              </p>
              <h3
                className="text-lg font-black"
               
              >
                American Mahjong
              </h3>
              <p className="mt-2 text-sm" style={{ color: 'var(--walnut)' }}>
                Annual card, joker tiles, and a uniquely American tradition with a large and active
                community nationwide.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        style={{ backgroundColor: 'var(--espresso)' }}
        className="px-6 py-20 text-center"
      >
        <div className="mx-auto max-w-2xl">
          <h2
            className="mb-4 text-3xl font-black text-white md:text-4xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Ready to play?
          </h2>
          <p className="mb-8 text-lg" style={{ color: 'var(--bone)' }}>
            Find Hong Kong Mahjong events, game nights, and meetups near you.
          </p>
          <Link
            href="/events"
            className="inline-block rounded-full px-10 py-4 text-sm font-semibold uppercase tracking-widest transition-opacity hover:opacity-90"
            style={{
              backgroundColor: 'var(--terra)',
              color: '#fff',
              fontFamily: 'var(--font-heading)',
            }}
          >
            Browse Events
          </Link>
        </div>
      </section>
    </>
  );
}
