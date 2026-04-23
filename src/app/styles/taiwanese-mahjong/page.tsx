import type { Metadata } from 'next';
import Link from 'next/link';
import { faqSchema, articleSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Taiwanese Mahjong — Rules, Strategy, and the 16-Tile Hand',
  description:
    'A complete guide to Taiwanese Mahjong: the 16-tile hand structure, tai scoring, gameplay flow, strategy basics, and how it compares to Hong Kong and American Mahjong.',
  alternates: { canonical: 'https://mahjmahj.co/styles/taiwanese-mahjong' },
  openGraph: {
    title: 'Taiwanese Mahjong — Rules, Strategy, and the 16-Tile Hand',
    description:
      'A complete guide to Taiwanese Mahjong: the 16-tile hand structure, tai scoring, gameplay flow, strategy basics, and how it compares to Hong Kong and American Mahjong.',
    url: 'https://mahjmahj.co/styles/taiwanese-mahjong',
    type: 'article',
    siteName: 'MAHJ MAHJ',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taiwanese Mahjong — Rules, Strategy, and the 16-Tile Hand',
    description:
      'Learn the rules, scoring, strategy, and feel of Taiwanese Mahjong — including what makes the 16-tile hand so distinctive.',
  },
};

const faqs = [
  {
    question: 'What is the main difference in Taiwanese Mahjong?',
    answer:
      'The most famous difference is the 16-tile hand structure. Where Hong Kong Mahjong uses 13 tiles, Taiwanese Mahjong builds the hand around 16. That extra material changes the pace and feel of every round — players hold more combinations, hands develop more fully from the start, and the table has a richer, more layered rhythm.',
  },
  {
    question: 'Is Taiwanese Mahjong harder than Hong Kong Mahjong?',
    answer:
      'Not necessarily. The larger hand gives players more to work with, which can feel complex at first, but many people find that the extra tiles make hands easier to read and develop. The challenge shifts from precision under constraint to managing more possibilities at once. Both styles reward practice.',
  },
  {
    question: 'How many tiles do you hold in Taiwanese Mahjong?',
    answer:
      'Usually 16 tiles, compared to 13 in Hong Kong Mahjong. This is the defining structural feature of the style. Some house rule variations exist, but 16 is the standard.',
  },
  {
    question: 'Does Taiwanese Mahjong use jokers?',
    answer:
      'Not in the way American Mahjong does. Taiwanese Mahjong does not rely on joker tiles as wild cards. Bonus tiles such as flowers and seasons may appear depending on house rules, but the core hand is built from suit tiles and honor tiles without joker substitution.',
  },
  {
    question: 'Is Taiwanese Mahjong fast?',
    answer:
      'Yes, often. The 16-tile hand means players enter each round with more developed starting material, which can accelerate the game. Combined with a social, expressive table culture, Taiwanese Mahjong sessions tend to feel lively and kinetic.',
  },
  {
    question: 'Do you need a card to play Taiwanese Mahjong?',
    answer:
      'No. Unlike American Mahjong, which uses an annual card published by the National Mah Jongg League, Taiwanese Mahjong does not require an external card. The winning hand structures come from the tiles themselves and from the scoring system your group agrees on.',
  },
  {
    question: 'Should a beginner start with Taiwanese Mahjong?',
    answer:
      'Yes, especially if that is the style played in your local community. The best style to start with is the one where you have people to play with and learn from. Taiwanese Mahjong is welcoming and social, and many find the larger hand gives them more room to experiment while learning.',
  },
];

const article = {
  headline: 'Taiwanese Mahjong — Rules, Strategy, and the 16-Tile Hand',
  description:
    'A complete guide to Taiwanese Mahjong: the 16-tile hand structure, tai scoring, gameplay flow, strategy basics, and how it compares to Hong Kong and American Mahjong.',
  url: 'https://mahjmahj.co/styles/taiwanese-mahjong',
  datePublished: '2026-04-22',
};

export default function TaiwaneseMainjongPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(article)) }}
      />

      {/* Hero */}
      <section className="py-24 text-center" style={{ background: 'var(--sand)' }}>
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--teal-deep)' }}>
            Style Guide
          </p>
          <h1
            className="font-[family-name:var(--font-heading)] text-4xl font-black leading-tight md:text-5xl"
            style={{ color: 'var(--espresso)' }}
          >
            Taiwanese Mahjong
          </h1>
          <p className="mt-6 text-xl font-medium leading-relaxed" style={{ color: 'var(--walnut)' }}>
            Rules, Strategy, and the 16-Tile Hand
          </p>
          <p className="mt-4 text-base leading-relaxed" style={{ color: 'var(--stone)' }}>
            Lively, social, and wonderfully kinetic — Taiwanese Mahjong builds every round around a fuller hand and a faster table rhythm.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/learn/how-to-play-mahjong"
              className="inline-block rounded-full px-8 py-3 text-sm font-semibold no-underline transition-colors"
              style={{ background: 'var(--terra)', color: '#fff' }}
            >
              How to Play Mahjong
            </Link>
            <Link
              href="/compare/mahjong-styles"
              className="inline-block rounded-full border-2 px-8 py-3 text-sm font-semibold no-underline transition-colors"
              style={{ borderColor: 'var(--espresso)', color: 'var(--espresso)' }}
            >
              Compare All Styles
            </Link>
          </div>
        </div>
      </section>

      {/* At a Glance Panel */}
      <section className="py-10" style={{ background: 'var(--terra-pale)' }}>
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {[
              { label: 'Hand Size', value: '16 tiles' },
              { label: 'Players', value: '4' },
              { label: 'Scoring', value: 'Tai' },
              { label: 'Jokers', value: 'No' },
              { label: 'Card Required', value: 'No' },
              { label: 'Pace', value: 'Fast & social' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl p-4 text-center"
                style={{ background: 'var(--paper)' }}
              >
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--teal-deep)' }}>
                  {item.label}
                </p>
                <p className="mt-1 font-[family-name:var(--font-heading)] text-sm font-bold" style={{ color: 'var(--espresso)' }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Article */}
      <section className="py-20" style={{ background: 'var(--linen)' }}>
        <div className="mx-auto max-w-3xl px-6">
          <div className="content-article">

            {/* Intro */}
            <p>
              Taiwanese Mahjong is lively, social, and wonderfully kinetic. It is often played with four people, uses a 16-tile hand structure, and creates a table rhythm that feels fuller and faster than styles built around 13 tiles. If Hong Kong Mahjong feels elegant and streamlined, Taiwanese Mahjong often feels expansive and energetic.
            </p>
            <p>
              That extra hand size changes a lot. Players hold more information, hands can grow in more directions, and the flow of the game can feel more layered from the start. A round of Taiwanese Mahjong is rarely quiet — there is almost always something happening, someone considering a call, someone watching the table with intent.
            </p>
            <p>
              If you are comparing styles, this guide will help you understand what makes Taiwanese Mahjong distinct. You can also visit the{' '}
              <Link href="/compare/mahjong-styles">Mahjong Styles Comparison</Link>,
              read about{' '}
              <Link href="/styles/hong-kong-mahjong">Hong Kong Mahjong</Link>,
              explore{' '}
              <Link href="/learn/how-to-play-mahjong">How to Play Mahjong</Link>,
              or browse{' '}
              <Link href="/events">upcoming mahjong events near you</Link>.
            </p>

            {/* What is Taiwanese Mahjong */}
            <h2>What is Taiwanese Mahjong?</h2>
            <p>
              Taiwanese Mahjong is one of the three major mahjong traditions widely played in the United States, alongside Hong Kong Mahjong and American Mahjong. It traces its roots to the style developed and popularized in Taiwan, where mahjong is a deeply embedded part of social and family life.
            </p>
            <p>
              The style is known for several things: the 16-tile hand, four-player gameplay, a fuller and more kinetic feel than Hong Kong Mahjong, tai-based scoring, and a table culture that is expressive and social. Players new to the game often find Taiwanese Mahjong welcoming precisely because the larger hand gives them more to work with as they learn.
            </p>
            <p>
              At its best, a game of Taiwanese Mahjong feels like a living conversation — each draw and discard shifting the balance at the table, each completed hand a small satisfaction earned through attention and planning.
            </p>

            {/* What you need */}
            <h2>What You Need to Play</h2>
            <p>
              The setup for Taiwanese Mahjong is straightforward. You need:
            </p>
            <ul>
              <li>A full mahjong tile set (144 tiles in the standard configuration)</li>
              <li>A set of dice — typically two or three</li>
              <li>Four players seated at the four sides of the table</li>
              <li>A table with enough space for the walls, your hand, and the discard area in front of each player</li>
            </ul>
            <p>
              Some groups use a mahjong table with built-in wells for discards and scoring chips. Others play on any flat surface. The tiles are the essential element — the rest is comfortable but not required.
            </p>
            <p>
              No annual card is required, unlike American Mahjong. The winning hand structures come from the tiles themselves and from the scoring system your group agrees on.
            </p>

            {/* Tile structure */}
            <h2>Tile Structure</h2>
            <p>
              A standard Taiwanese Mahjong set contains tiles organized into three categories:
            </p>
            <h3>Suit Tiles</h3>
            <p>
              The three suits are Dots (Circles), Bamboo (Sticks), and Characters (Wan). Each suit runs from 1 to 9, with four copies of each tile, for 108 suit tiles total.
            </p>
            <h3>Honor Tiles</h3>
            <p>
              Honor tiles include the four Wind tiles (East, South, West, North) and the three Dragon tiles (Red, Green, White). There are four copies of each, for 28 honor tiles total.
            </p>
            <h3>Bonus Tiles</h3>
            <p>
              Flower and Season tiles are bonus tiles. Whether and how they are used depends on the house rules your group plays. When drawn, bonus tiles are typically set aside for scoring value and replaced with a new tile from the wall.
            </p>

            {/* Setup */}
            <h2>Setup</h2>
            <p>
              Setting up a game of Taiwanese Mahjong follows the same basic structure as other mahjong styles, with one key difference in the deal:
            </p>
            <ol>
              <li><strong>Shuffle tiles.</strong> All tiles are placed face-down and mixed thoroughly on the table.</li>
              <li><strong>Build walls.</strong> Each player builds a wall of tiles in front of them — two tiles high, typically 18 or 19 tiles wide. The four walls are pushed together to form a square.</li>
              <li><strong>Determine seating and dealer.</strong> Dice are rolled to determine the East seat, which acts as the dealer for the first round. Seating rotates through East, South, West, and North positions.</li>
              <li><strong>Break the wall.</strong> The dealer rolls dice to determine where the wall is broken. Tiles are drawn from this break point to start the deal.</li>
              <li><strong>Deal tiles.</strong> This is where Taiwanese Mahjong diverges most clearly from Hong Kong Mahjong. Each player receives 16 tiles instead of 13. The dealer begins with an extra tile and takes the first turn, discarding to start play.</li>
            </ol>
            <p>
              The additional tiles in the deal mean every player enters the first turn with a more developed hand — more combinations visible, more directions possible, more information to process from the very beginning.
            </p>

            {/* The goal */}
            <h2>The Goal of the Game</h2>
            <p>
              The goal of Taiwanese Mahjong is to complete a legal winning hand — called winning, going out, or declaring mahjong — before any other player at the table.
            </p>
            <p>
              A legal winning hand in Taiwanese Mahjong is built around the larger 16-tile structure. The exact winning conditions depend on the house rules in play, but the core idea is consistent: assemble your tiles into a complete and valid arrangement of sets and a pair. A standard winning hand includes four sets (melds) plus one pair, using the 16 tiles available.
            </p>
            <p>
              Some hands carry higher scoring value based on their structure, concealment, or composition. Knowing which patterns score well — and building toward them while staying flexible — is the strategic heart of the game.
            </p>

            {/* How gameplay works */}
            <h2>How Gameplay Works</h2>
            <p>
              Play proceeds clockwise around the table. On each turn, a player draws a tile from the wall, evaluates their hand, and discards one tile face-up in their discard area.
            </p>
            <p>
              Other players may call the discarded tile to complete a meld — a chow (sequence of three consecutive tiles in the same suit), a pung (three identical tiles), or a kong (four identical tiles). Calling a tile interrupts the normal drawing order and brings the tile into the calling player's hand. After forming the meld, the calling player discards.
            </p>
            <p>
              Any player may also call a discard to win if it completes their hand. This declaration is the moment the round ends.
            </p>
            <p>
              With 16 tiles, there is simply more going on at all times. More tiles in hand means more partially completed sets, more decisions about which direction to pursue, and a richer set of reactions to what other players are discarding. The game feels alive and full of movement from the opening draw to the final meld.
            </p>

            {/* The 16-tile hand */}
            <h2>The 16-Tile Hand Structure</h2>
            <p>
              This is the defining feature of Taiwanese Mahjong and the thing that most clearly distinguishes it from Hong Kong Mahjong.
            </p>
            <p>
              In Hong Kong Mahjong, players hold 13 tiles. In Taiwanese Mahjong, players hold 16. That difference of three tiles is not minor — it fundamentally changes the feel and strategy of the game.
            </p>
            <p>
              With 16 tiles, players begin with more material. Hands are more developed from the first draw. There is more room for decisions — more combinations to evaluate, more partial sets to compare, more directions the hand can go. Players have more momentum built in from the start.
            </p>
            <p>
              This also means that tracking what other players are building is more complex. Each player is holding more information, and the interaction between hands is richer. A well-developed hand in Taiwanese Mahjong often feels earned in a particular way — not just because you assembled it, but because you managed the complexity of having more to work with.
            </p>
            <p>
              For new players, the 16-tile hand can actually feel more forgiving. With more tiles in hand, it is easier to see patterns forming and to understand what you are building toward. The extra tiles provide more context for learning.
            </p>

            {/* Scoring */}
            <h2>Scoring in Taiwanese Mahjong</h2>
            <p>
              Taiwanese Mahjong is typically scored in tai (also romanized as taai or tai). Tai is a unit of scoring value, and each winning hand is worth a certain number of tai based on what it contains.
            </p>
            <p>
              Common sources of tai value include:
            </p>
            <ul>
              <li><strong>Concealed hand:</strong> A hand completed without calling any opponent's discards earns extra tai.</li>
              <li><strong>Self-draw:</strong> Completing your hand by drawing the winning tile yourself (rather than taking an opponent's discard) adds tai value.</li>
              <li><strong>Honor sets:</strong> Pungs or kongs of dragon tiles or seat-wind tiles contribute tai.</li>
              <li><strong>Flowers and seasons:</strong> Bonus tiles add tai, often with bonuses for collecting a complete set of four.</li>
              <li><strong>Specific hand types:</strong> Certain special hand patterns — all in one suit, all terminals and honors, and others — carry fixed tai values.</li>
            </ul>
            <p>
              The minimum hand value required to win (the minimum tai threshold) is set by house rules and varies from group to group. Some groups play with a minimum of one tai; others require three or more. Understanding your group's minimum is essential before you sit down.
            </p>
            <p>
              Payment is typically made by the player whose discard was used to win, or by all three other players if the winner self-drew. Amounts may scale based on total tai value.
            </p>

            {/* Common hands */}
            <h2>Common Hands and Scoring Patterns</h2>
            <p>
              While the specific hand types and their values depend on house rules, the following are commonly recognized across Taiwanese Mahjong groups:
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>Hand Type</th>
                    <th>Description</th>
                    <th>Typical Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Basic Winning Hand</strong></td>
                    <td>Four sets and a pair, meets minimum threshold</td>
                    <td>Varies (1+ tai)</td>
                  </tr>
                  <tr>
                    <td><strong>Concealed Hand</strong></td>
                    <td>No melds called from discards; hand built entirely from draws</td>
                    <td>+1 tai (or more)</td>
                  </tr>
                  <tr>
                    <td><strong>Self-Draw Win</strong></td>
                    <td>Winning tile drawn from the wall, not taken from a discard</td>
                    <td>+1 tai</td>
                  </tr>
                  <tr>
                    <td><strong>Honor Sets</strong></td>
                    <td>Pung or kong of dragons, seat wind, or prevailing wind</td>
                    <td>+1 tai per qualifying set</td>
                  </tr>
                  <tr>
                    <td><strong>One-Suit Lean</strong></td>
                    <td>Hand built primarily in one suit with some honors</td>
                    <td>+1–2 tai</td>
                  </tr>
                  <tr>
                    <td><strong>Bonus Tile Advantage</strong></td>
                    <td>Own flower or season tile; complete set of four flowers or seasons</td>
                    <td>+1 tai; additional for full set</td>
                  </tr>
                  <tr>
                    <td><strong>High-Value Pattern Hand</strong></td>
                    <td>Special hand type recognized by house rules (all one suit, all honors, etc.)</td>
                    <td>High fixed value</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Always confirm the scoring rules with your group before playing. Taiwanese Mahjong scoring can vary significantly across different communities, families, and regions.
            </p>

            {/* vs Hong Kong */}
            <h2>Key Differences from Hong Kong Mahjong</h2>
            <p>
              <Link href="/styles/hong-kong-mahjong">Hong Kong Mahjong</Link> and Taiwanese Mahjong share the same tile set and many of the same basic mechanics. But they feel quite different at the table. Here is a direct comparison:
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>Element</th>
                    <th>Taiwanese Mahjong</th>
                    <th>Hong Kong Mahjong</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Hand size</strong></td>
                    <td>16 tiles</td>
                    <td>13 tiles</td>
                  </tr>
                  <tr>
                    <td><strong>Table feel</strong></td>
                    <td>Fuller, more kinetic, expressive</td>
                    <td>Elegant, streamlined, precise</td>
                  </tr>
                  <tr>
                    <td><strong>Scoring system</strong></td>
                    <td>Tai</td>
                    <td>Faan (fan)</td>
                  </tr>
                  <tr>
                    <td><strong>Strategy</strong></td>
                    <td>Broader, more directions in hand</td>
                    <td>More constrained, sharper decisions</td>
                  </tr>
                  <tr>
                    <td><strong>Complexity for beginners</strong></td>
                    <td>More material to see patterns</td>
                    <td>Fewer tiles, tighter decisions</td>
                  </tr>
                  <tr>
                    <td><strong>Pace</strong></td>
                    <td>Often faster</td>
                    <td>Variable</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Both styles are rewarding in different ways. Hong Kong Mahjong rewards precision and economy of action. Taiwanese Mahjong rewards breadth of thinking and adaptability. If you play one, learning the other is very accessible — the shared foundation makes the differences feel like variations on a familiar theme rather than an entirely new game.
            </p>
            <p>
              See the full <Link href="/compare/mahjong-styles">Mahjong Styles Comparison</Link> for a side-by-side breakdown of all three styles.
            </p>

            {/* vs American */}
            <h2>Key Differences from American Mahjong</h2>
            <p>
              <Link href="/styles/american-mahjong">American Mahjong</Link> is a much more dramatically different experience than either Hong Kong or Taiwanese Mahjong. The most visible differences:
            </p>
            <ul>
              <li><strong>No annual card:</strong> Taiwanese Mahjong does not require the NMJL card. Winning hand patterns come from the tiles and your group's agreed scoring rules.</li>
              <li><strong>No jokers in the same role:</strong> American Mahjong uses joker tiles as wild cards, which is central to its strategy. Taiwanese Mahjong does not use jokers in this way.</li>
              <li><strong>No Charleston:</strong> The pre-game tile-passing ritual of American Mahjong does not exist in Taiwanese Mahjong.</li>
              <li><strong>Different social rhythm:</strong> Both styles are social, but in different ways. American Mahjong has a particular community culture built around the annual card release and formal clubs. Taiwanese Mahjong's social culture is more embedded in family and informal play.</li>
            </ul>
            <p>
              If you are coming from American Mahjong, Taiwanese Mahjong will feel like a significant shift — but the underlying love of tile play, social atmosphere, and strategic depth will feel immediately familiar.
            </p>

            {/* Strategy */}
            <h2>Strategy Basics</h2>
            <p>
              Taiwanese Mahjong rewards players who can hold a broad view of their hand while staying attentive to the table. Here are five principles that serve beginners and experienced players alike:
            </p>
            <ol>
              <li>
                <strong>Respect the larger hand.</strong> With 16 tiles, you have more to manage than in a 13-tile game. Take a moment at the start of each round to survey what you have before committing to a direction.
              </li>
              <li>
                <strong>Build around strong shape.</strong> Look for tiles that are already close to forming sets. The more your starting hand leans toward specific combinations, the more efficiently you can discard toward a clear goal.
              </li>
              <li>
                <strong>Watch the table.</strong> What other players are discarding tells you what they are not building — and what is safe to discard yourself. Tracking discards is as important as managing your own hand.
              </li>
              <li>
                <strong>Learn your group's scoring rules.</strong> Taiwanese Mahjong scoring varies by group. Know the minimum tai threshold and which hand types score highest in your specific game. Building a hand worth enough to win is a strategy in itself.
              </li>
              <li>
                <strong>Embrace the pace.</strong> Taiwanese Mahjong rewards players who can make decisions with confidence. Hesitation can break the rhythm of the table. The more you play, the more natural the flow of decisions becomes.
              </li>
            </ol>

            {/* Etiquette */}
            <h2>Etiquette at the Table</h2>
            <p>
              Like all mahjong styles, Taiwanese Mahjong has a social layer that is as important as the rules. A few principles that make the table better for everyone:
            </p>
            <ul>
              <li><strong>Clarify house rules before you start.</strong> Scoring rules and tile handling conventions vary. A brief conversation before the first deal saves confusion and keeps the game enjoyable.</li>
              <li><strong>Be clear and prompt with calls.</strong> When you want to call a discard, say so clearly and immediately. Delaying or calling after you have seen other tiles creates problems.</li>
              <li><strong>Keep your discards neat.</strong> Place discards in front of you in a legible arrangement. Other players track your discards as part of their strategy — a disorganized discard area is a disadvantage for everyone.</li>
              <li><strong>Respect the pace of the table.</strong> If someone is slower to make decisions, be patient rather than pressuring. If you are the slower player, try to think ahead so your turn moves smoothly.</li>
              <li><strong>Help newer players enjoy the game.</strong> Taiwanese Mahjong is often learned in family or community settings. Patience with beginners is part of the culture — and newer players who feel welcomed come back and make the table richer.</li>
            </ul>

            {/* Why people love it */}
            <h2>Why People Love Taiwanese Mahjong</h2>
            <p>
              Players who fall in love with Taiwanese Mahjong often describe it in similar terms: it is alive. The table moves, the hands develop with visible momentum, and the social energy feels central to the experience rather than incidental to it.
            </p>
            <p>
              The 16-tile hand means every round offers a lot of material to think through — but that complexity feels generative rather than burdensome. There is always something to discover in your hand, always a direction worth considering. Hands rarely feel stuck.
            </p>
            <p>
              The scoring system rewards players who build thoughtfully. A well-constructed hand — concealed, self-drawn, rich in honors — is genuinely satisfying to complete. And because the game moves quickly, the table cycles through rounds at a pace that keeps energy high.
            </p>
            <p>
              Many players also describe the social texture of Taiwanese Mahjong as distinctive. It is a game meant to be played with people you enjoy spending time with — and it creates exactly the right conditions for that. Conversation flows naturally, attention to the table is rewarded, and the rhythm of the game gives everyone something to engage with at all times.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20" style={{ background: 'var(--sand)' }}>
        <div className="mx-auto max-w-3xl px-6">
          <h2
            className="mb-12 font-[family-name:var(--font-heading)] text-2xl font-bold md:text-3xl"
            style={{ color: 'var(--espresso)' }}
          >
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-6">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl p-6"
                style={{ background: 'var(--paper)', border: '1px solid var(--bone)' }}
              >
                <h3
                  className="font-[family-name:var(--font-heading)] text-sm font-bold leading-snug md:text-base"
                  style={{ color: 'var(--espresso)' }}
                >
                  {faq.question}
                </h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--walnut)' }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Keep Exploring */}
      <section className="py-20" style={{ background: 'var(--espresso)' }}>
        <div className="mx-auto max-w-5xl px-6">
          <h2
            className="mb-4 text-center font-[family-name:var(--font-heading)] text-2xl font-bold md:text-3xl"
            style={{ color: 'var(--td1)' }}
          >
            Keep Exploring
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-center" style={{ color: 'var(--td2)' }}>
            Dive deeper into mahjong styles, find events near you, or start from the beginning.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {[
              {
                title: 'Compare Mahjong Styles',
                desc: 'See all three styles side by side.',
                href: '/compare/mahjong-styles',
              },
              {
                title: 'Hong Kong Mahjong',
                desc: 'The elegant 13-tile classic.',
                href: '/styles/hong-kong-mahjong',
              },
              {
                title: 'How to Play Mahjong',
                desc: 'Start from the very beginning.',
                href: '/learn/how-to-play-mahjong',
              },
              {
                title: 'Find Events',
                desc: 'Play with people near you.',
                href: '/events',
              },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="block rounded-2xl p-6 no-underline transition-colors hover:opacity-90"
                style={{ background: 'var(--walnut)' }}
              >
                <p
                  className="font-[family-name:var(--font-heading)] text-sm font-bold"
                  style={{ color: 'var(--td1)' }}
                >
                  {card.title}
                </p>
                <p className="mt-2 text-sm" style={{ color: 'var(--td2)' }}>
                  {card.desc}
                </p>
                <span className="mt-3 inline-block text-xs font-semibold" style={{ color: 'var(--teal-soft)' }}>
                  Read more &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
