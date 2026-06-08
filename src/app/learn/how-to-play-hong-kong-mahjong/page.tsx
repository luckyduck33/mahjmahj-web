import type { Metadata } from 'next';
import Link from 'next/link';
import { articleSchema, faqSchema, breadcrumbSchema } from '@/lib/schema';

const URL = 'https://mahjmahj.co/learn/how-to-play-hong-kong-mahjong';
const TITLE = 'How to Play Hong Kong Mahjong: A Beginner’s Guide';
const DESCRIPTION =
  'Learn the tiles, setup, gameplay, winning hands, scoring basics, etiquette, and glossary for Hong Kong Mahjong. The first table companion for new players.';

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
    question: 'How many people play Hong Kong Mahjong?',
    answer: 'Hong Kong Mahjong is usually played with four players.',
  },
  {
    question: 'Is Hong Kong Mahjong the same as American Mahjong?',
    answer:
      'No. Hong Kong Mahjong and American Mahjong use different rules, materials, scoring systems, and table rhythms.',
  },
  {
    question: 'What is the goal of Hong Kong Mahjong?',
    answer:
      'The basic goal is to build a complete winning hand, usually four sets and a pair, while meeting the table’s scoring requirement.',
  },
  {
    question: 'What does 3 faan minimum mean?',
    answer:
      'It means a hand must reach at least 3 faan in scoring value to win at that table. Some beginner tables may modify this rule.',
  },
  {
    question: 'What should beginners learn first?',
    answer:
      'Beginners should learn the suits, honors, basic hand shape, drawing/discarding rhythm, and the difference between chow, pong, and kong.',
  },
];

export default function HowToPlayHongKongMahjongPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema({
            url: URL,
            headline: TITLE,
            description: DESCRIPTION,
            datePublished: '2026-05-20',
            dateModified: '2026-05-20',
          })),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: 'Home', url: 'https://mahjmahj.co/' },
            { name: 'Learn', url: 'https://mahjmahj.co/learn' },
            { name: 'How to Play Hong Kong Mahjong', url: URL },
          ])),
        }}
      />

      <article className="learn-article">
        <header className="learn-article-header">
          <p className="eyebrow">Learn · Hong Kong Mahjong</p>
          <h1>How to Play Hong Kong Mahjong: A Beginner&rsquo;s Guide</h1>
          <p className="dek">
            A fast, social, four-player tile game built around pattern recognition, memory, timing,
            and a little nerve. This is your first table companion.
          </p>
        </header>

        <section className="learn-article-body">
          <p>
            Hong Kong Mahjong can look complicated from the outside, but the table teaches quickly.
            Once you understand the tiles, the shape of a hand, and the rhythm of drawing and
            discarding, it starts to click. Use this guide before your first night and during the
            first few sessions until the moves feel natural.
          </p>

          <h2>1. What is Hong Kong Mahjong?</h2>
          <p>
            Hong Kong Mahjong is one of the most widely played Mahjong styles. It is usually
            played by four people with a 144-tile set, though some tables omit or vary flower
            tiles depending on house rules.
          </p>
          <p>
            Compared with American Mahjong, Hong Kong Mahjong does not use annual cards or
            jokers. Compared with Taiwanese Mahjong, the hand structure and rhythm are different.
            Hong Kong Mahjong is known for being quick, elegant, and deeply social.
          </p>

          <h2>2. The Tiles</h2>
          <p>
            A Hong Kong Mahjong set includes suited tiles, honor tiles, and often bonus
            flower/season tiles.
          </p>
          <h3>Bamboo</h3>
          <p>Bamboo tiles are numbered 1 through 9. They are one of the three main suits.</p>
          <h3>Characters</h3>
          <p>
            Character tiles are numbered 1 through 9 and show Chinese numerals. They are another
            main suit.
          </p>
          <h3>Dots</h3>
          <p>
            Dot tiles are numbered 1 through 9 using circular symbols. They are the third main
            suit.
          </p>
          <h3>Winds</h3>
          <p>
            The wind tiles are East, South, West, and North. Winds can matter for scoring depending
            on seat wind, prevailing wind, and table rules.
          </p>
          <h3>Dragons</h3>
          <p>
            The dragon tiles are Red, Green, and White. Dragon sets are common beginner scoring
            patterns.
          </p>
          <h3>Flowers and Seasons</h3>
          <p>
            Some Hong Kong Mahjong tables use flower and season tiles as bonus tiles. If you draw
            one, it is usually revealed and replaced with another draw, but exact handling depends
            on house rules.
          </p>
          <blockquote className="callout">
            <strong>Beginner tip:</strong> Learn the three suits first. Once Bamboo, Characters,
            and Dots feel familiar, honors and scoring become easier.
          </blockquote>

          <h2>3. Setting Up</h2>
          <p>Hong Kong Mahjong is usually played with four players. Each player sits at one side of the table.</p>
          <h3>The wall</h3>
          <p>The tiles are shuffled face down and built into four walls. Each player helps build the wall in front of them.</p>
          <h3>Dealing</h3>
          <p>
            The dealer, usually East, begins the deal. Each player receives tiles until the starting
            hands are complete. The dealer starts with one extra tile because the dealer makes the
            first discard.
          </p>
          <h3>Seat wind and prevailing wind</h3>
          <p>
            Each player has a seat wind. The round also has a prevailing wind. These can matter for
            scoring.
          </p>

          <h2>4. Gameplay</h2>
          <p>The basic rhythm is simple:</p>
          <ol>
            <li>Draw a tile.</li>
            <li>Decide what to keep.</li>
            <li>Discard one tile.</li>
            <li>Watch what other players discard.</li>
            <li>Continue until someone wins or the wall runs out.</li>
          </ol>
          <h3>Drawing</h3>
          <p>On your turn, you draw one tile from the wall unless you are claiming a discarded tile.</p>
          <h3>Discarding</h3>
          <p>
            After drawing, discard one tile face up. Your discards give other players information, so
            choose carefully.
          </p>
          <h3>Calling tiles</h3>
          <p>You may be able to claim another player&rsquo;s discard to complete a set.</p>

          <h2>5. Chow, Pong, and Kong</h2>
          <h3>Chow</h3>
          <p>
            A chow is a sequence of three suited tiles in the same suit, such as 3-4-5 Bamboo. In many
            Hong Kong Mahjong rules, you can only chow from the player immediately before you.
          </p>
          <h3>Pong</h3>
          <p>
            A pong is three identical tiles, such as three Red Dragons. You can usually claim a pong
            from any player&rsquo;s discard.
          </p>
          <h3>Kong</h3>
          <p>
            A kong is four identical tiles. Kongs involve replacement draws and can affect scoring,
            depending on house rules.
          </p>
          <blockquote className="callout">
            <strong>Common beginner mistake:</strong> Calling too many tiles early can lock your hand
            into a direction before you understand what it wants to become.
          </blockquote>

          <h2>6. Winning</h2>
          <p>A typical winning hand has four sets and one pair. A set can be:</p>
          <ul>
            <li>A chow</li>
            <li>A pong</li>
            <li>A kong</li>
          </ul>
          <p>A pair is two identical tiles.</p>
          <p><strong>Example shape:</strong></p>
          <ul>
            <li>2-3-4 Bamboo</li>
            <li>6-7-8 Dots</li>
            <li>Three Red Dragons</li>
            <li>Three 9 Characters</li>
            <li>Pair of East Winds</li>
          </ul>
          <p>
            Some special hands use different structures, but beginners should master the standard
            four-sets-and-a-pair shape first.
          </p>

          <h2>7. Minimum Faan Requirement</h2>
          <p>
            Many Hong Kong Mahjong tables use a minimum faan requirement, often 3 faan, meaning your
            hand must meet at least that scoring threshold to win. Some casual tables lower the
            requirement for beginners. Always ask before play starts.
          </p>
          <blockquote className="callout">
            <strong>Tip:</strong> Before the first round, ask: &ldquo;Are we playing 3 faan
            minimum?&rdquo;
          </blockquote>

          <h2>8. Scoring Basics</h2>
          <p>
            Scoring varies by table, but these common scoring patterns are good beginner references.
          </p>
          <h3>Common beginner scoring hands</h3>
          <ol>
            <li><strong>Dragon Pong</strong> &mdash; A pong of Red, Green, or White Dragons.</li>
            <li><strong>Seat Wind Pong</strong> &mdash; A pong of your own seat wind.</li>
            <li><strong>Prevailing Wind Pong</strong> &mdash; A pong of the round wind.</li>
            <li><strong>All Chows</strong> &mdash; A hand made only of sequences plus a pair, depending on table rules.</li>
            <li><strong>All Pongs</strong> &mdash; A hand made of pongs/kongs and a pair.</li>
            <li><strong>One Suit Mixed With Honors</strong> &mdash; A hand using one suit plus honor tiles.</li>
            <li><strong>Pure One Suit</strong> &mdash; A hand using only one suit.</li>
            <li><strong>Self-Draw</strong> &mdash; Winning by drawing your own winning tile.</li>
            <li><strong>Concealed Hand</strong> &mdash; Winning with a hand that has not exposed sets, depending on rules.</li>
            <li><strong>No Flowers</strong> &mdash; Some tables score absence of flower tiles.</li>
          </ol>
          <p>
            Exact faan values vary by house rules, so confirm the scoring sheet used by your table.
          </p>

          <h2>9. Strategy for Beginners</h2>
          <h3>Start with hand shape</h3>
          <p>Before chasing points, learn to see sets and pairs.</p>
          <h3>Watch discards</h3>
          <p>
            The discard pool tells you what is safe, what suits are being abandoned, and what other
            players may be building.
          </p>
          <h3>Do not force a fancy hand</h3>
          <p>
            Beginner hands should prioritize clarity. A simple legal hand teaches more than a failed
            ambitious one.
          </p>
          <h3>Ask which tiles are dangerous</h3>
          <p>
            As the game progresses, certain discards become riskier. Watch what other players have
            exposed and what suits have gone quiet.
          </p>

          <h2>10. Etiquette</h2>
          <p>Hong Kong Mahjong is social, but the table still has rhythm.</p>
          <ul>
            <li>Arrive on time.</li>
            <li>Ask which rules are being used.</li>
            <li>Do not touch another player&rsquo;s tiles.</li>
            <li>Keep food and drinks away from the set.</li>
            <li>Pay attention when it is your turn.</li>
            <li>Ask questions, but try not to stop every move.</li>
            <li>Accept corrections gracefully.</li>
            <li>If you are experienced, help without taking over.</li>
          </ul>

          <h2>11. Glossary</h2>
          <ul>
            <li><strong>Chow / Chi:</strong> A sequence of three suited tiles.</li>
            <li><strong>Pong / Pung:</strong> Three identical tiles.</li>
            <li><strong>Kong:</strong> Four identical tiles.</li>
            <li><strong>Pair / Eyes:</strong> Two identical tiles needed in most winning hands.</li>
            <li><strong>Faan:</strong> Scoring unit used in many Hong Kong Mahjong tables.</li>
            <li><strong>Discard:</strong> A tile thrown from the hand.</li>
            <li><strong>Wall:</strong> The stacked tiles players draw from.</li>
            <li><strong>Seat Wind:</strong> The wind assigned to a player&rsquo;s seat.</li>
            <li><strong>Prevailing Wind:</strong> The wind of the round.</li>
            <li><strong>Self-Draw:</strong> Winning by drawing your own final tile.</li>
            <li><strong>Flowers:</strong> Bonus tiles used in some tables.</li>
          </ul>

          <h2>12. Where to Play</h2>
          <p>
            Use MAHJ MAHJ to find Hong Kong Mahjong events, beginner lessons, and community tables
            near you. If you are not ready to play in person, use Score My Hand to practice
            recognizing winning shapes and scoring patterns.
          </p>
          <ul>
            <li>
              MAHJ MAHJ event finder: <Link href="/events">mahjmahj.co/events</Link>
            </li>
            <li>
              Score My Hand: <Link href="/score-my-hand">mahjmahj.co/score-my-hand</Link>
            </li>
          </ul>

          <h2>Frequently asked questions</h2>
          <dl className="faq">
            {faqs.map((f) => (
              <div key={f.question}>
                <dt>{f.question}</dt>
                <dd>{f.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      </article>
    </>
  );
}
