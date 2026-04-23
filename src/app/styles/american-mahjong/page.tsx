import type { Metadata } from 'next';
import Link from 'next/link';
import { faqSchema, articleSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'American Mahjong â Rules, Jokers, and the NMJL Card',
  description:
    'Learn American Mahjong: how the NMJL card works, the role of jokers, the Charleston tile exchange, gameplay flow, winning hands, and how it compares to other styles.',
  alternates: {
    canonical: 'https://mahjmahj.co/styles/american-mahjong',
  },
  openGraph: {
    title: 'American Mahjong â Rules, Jokers, and the NMJL Card',
    description:
      'Learn American Mahjong: how the NMJL card works, the role of jokers, the Charleston tile exchange, gameplay flow, winning hands, and how it compares to other styles.',
    url: 'https://mahjmahj.co/styles/american-mahjong',
    siteName: 'MAHJ MAHJ',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'American Mahjong â Rules, Jokers, and the NMJL Card',
    description:
      'Learn American Mahjong: how the NMJL card works, the role of jokers, the Charleston tile exchange, gameplay flow, winning hands, and how it compares to other styles.',
  },
};

const faqs = [
  {
    question: 'What is the NMJL card in American Mahjong?',
    answer:
      'The NMJL card is the official annual hand card published by the National Mah Jongg League. It lists every legal winning hand for that year. Players must own the current card to know which hands they can aim for. The card changes every year, which means strategy and hand selection evolve annually.',
  },
  {
    question: 'Do you need jokers to play American Mahjong?',
    answer:
      'Yes, in a standard setup, jokers are core to American Mahjong. A full American set includes eight joker tiles. Jokers can substitute for certain tiles in exposed sets, which fundamentally changes how hands are built, how exposures are read, and how players defend.',
  },
  {
    question: 'Is American Mahjong easier than Hong Kong Mahjong?',
    answer:
      'It depends on your style of thinking. American Mahjong relies heavily on pattern recognition against a fixed card, which some players find accessible. Hong Kong Mahjong has more fluid hand construction but no jokers or annual card. Neither is objectively easier â they reward different skills.',
  },
  {
    question: 'What is the Charleston in American Mahjong?',
    answer:
      'The Charleston is a pregame tile exchange that helps players shape their starting hand. Before play begins, players pass unwanted tiles to neighbors in a structured sequence â left, across, right â and may do a second Charleston if all players agree. It is unique to American Mahjong and is a key strategic phase.',
  },
  {
    question: 'Can beginners learn American Mahjong?',
    answer:
      'Absolutely. American Mahjong has a strong club and community teaching culture in the United States. Many players learn through local groups, Jewish community centers, senior centers, and mahjong clubs. The NMJL card provides clear structure that helps beginners focus on specific hand goals.',
  },
  {
    question: 'Where do I buy the American Mahjong card?',
    answer:
      'The annual card is available directly from the National Mah Jongg League. It is published each year and must be purchased â it is not freely distributed. Many local clubs and game stores that carry American sets also stock the card.',
  },
  {
    question: 'How is American Mahjong different from other styles?',
    answer:
      'The biggest differences are the annual card, jokers, and the Charleston. American Mahjong uses an official hand list that changes yearly, jokers as core substitution tiles, and a structured pregame tile pass. Hong Kong and Taiwanese styles have no jokers and no annual card â hand selection is more open-ended and rule sets are fixed.',
  },
];

const articleData = {
  headline: 'American Mahjong â Rules, Jokers, and the NMJL Card',
  description:
    'Learn American Mahjong: how the NMJL card works, the role of jokers, the Charleston tile exchange, gameplay flow, winning hands, and how it compares to other styles.',
  url: 'https://mahjmahj.co/styles/american-mahjong',
  datePublished: '2026-04-22',
};

export default function AmericanMahjongPage() {
  const faqJsonLd = faqSchema(faqs);
  const articleJsonLd = articleSchema(articleData);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Hero */}
      <section
        style={{ background: 'var(--sand)' }}
        className="px-6 py-16 md:py-24"
      >
        <div className="max-w-3xl mx-auto">
          <p
            style={{ color: 'var(--stone)', fontFamily: 'var(--font-body)' }}
            className="text-sm uppercase tracking-widest mb-4"
          >
            Mahjong Styles
          </p>
          <h1
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
            className="text-4xl md:text-5xl font-black mb-6 leading-tight"
          >
            American Mahjong
          </h1>
          <p
            style={{ color: 'var(--walnut)', fontFamily: 'var(--font-body)' }}
            className="text-xl md:text-2xl leading-relaxed mb-8"
          >
            Social, distinctive, and wonderfully pattern-driven. American Mahjong is
            especially popular in clubs, community groups, and home games across the
            United States.
          </p>
          <p
            style={{ color: 'var(--walnut)', fontFamily: 'var(--font-body)' }}
            className="text-lg leading-relaxed"
          >
            Two biggest things to know:{' '}
            <strong style={{ color: 'var(--espresso)' }}>it uses jokers</strong>, and it
            relies on an{' '}
            <strong style={{ color: 'var(--espresso)' }}>
              annual card published by the NMJL
            </strong>
            .
          </p>
        </div>
      </section>

      {/* Quick nav */}
      <section
        style={{ background: 'var(--olive-pale)' }}
        className="px-6 py-6 border-b"
        aria-label="Quick links"
      >
        <div className="max-w-3xl mx-auto">
          <p
            style={{ color: 'var(--stone)', fontFamily: 'var(--font-body)' }}
            className="text-sm mb-3"
          >
            Also on MAHJ MAHJ:
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/compare/mahjong-styles"
              style={{
                background: 'var(--espresso)',
                color: 'var(--linen)',
                fontFamily: 'var(--font-body)',
              }}
              className="text-sm px-4 py-2 rounded-full font-medium hover:opacity-80 transition-opacity"
            >
              Mahjong Styles Comparison
            </Link>
            <Link
              href="/styles/hong-kong-mahjong"
              style={{
                background: 'var(--sand)',
                color: 'var(--espresso)',
                fontFamily: 'var(--font-body)',
              }}
              className="text-sm px-4 py-2 rounded-full font-medium hover:opacity-80 transition-opacity border"
            >
              Hong Kong Mahjong
            </Link>
            <Link
              href="/styles/taiwanese-mahjong"
              style={{
                background: 'var(--sand)',
                color: 'var(--espresso)',
                fontFamily: 'var(--font-body)',
              }}
              className="text-sm px-4 py-2 rounded-full font-medium hover:opacity-80 transition-opacity border"
            >
              Taiwanese Mahjong
            </Link>
            <Link
              href="/learn/how-to-play-mahjong"
              style={{
                background: 'var(--sand)',
                color: 'var(--espresso)',
                fontFamily: 'var(--font-body)',
              }}
              className="text-sm px-4 py-2 rounded-full font-medium hover:opacity-80 transition-opacity border"
            >
              How to Play Mahjong
            </Link>
            <Link
              href="/events"
              style={{
                background: 'var(--sand)',
                color: 'var(--espresso)',
                fontFamily: 'var(--font-body)',
              }}
              className="text-sm px-4 py-2 rounded-full font-medium hover:opacity-80 transition-opacity border"
            >
              Browse Events
            </Link>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main
        style={{ background: 'var(--linen)' }}
        className="px-6 py-14 md:py-20"
      >
        <div className="max-w-3xl mx-auto content-article">

          {/* What is American Mahjong */}
          <h2>What is American Mahjong?</h2>
          <p>
            American Mahjong is a variant of mahjong developed and popularized in the United
            States, formalized largely through the National Mah Jongg League (NMJL) since the
            1930s. It sits at the intersection of strategy, pattern recognition, and social
            ritual â played at kitchen tables, in retirement communities, in Jewish community
            centers, and at dedicated mahjong clubs from coast to coast.
          </p>
          <p>
            Known for: annual official hand card, jokers as core gameplay, the Charleston,
            pattern-matching strategy, and a strong US club tradition. If you have seen a
            group of four women sitting around a folding table with racks and pushers, calling
            tiles and laughing â that is almost certainly American Mahjong.
          </p>

          {/* What you need */}
          <h2>What you need to play</h2>
          <p>
            To play American Mahjong you need a full American set and the current NMJL card.
            Here is what that means in practice:
          </p>
          <ul>
            <li>
              <strong>Suit tiles</strong> â Dots (Circles), Bamboo (Bams), and Characters
              (Craks), numbered 1â9, four of each. 108 suit tiles total.
            </li>
            <li>
              <strong>Winds</strong> â East, South, West, North, four of each. 16 tiles.
            </li>
            <li>
              <strong>Dragons</strong> â Red, Green, White (Soap), four of each. 12 tiles.
            </li>
            <li>
              <strong>Flowers</strong> â Typically 8 flower tiles.
            </li>
            <li>
              <strong>Jokers</strong> â 8 joker tiles. Unique to the American game.
            </li>
            <li>
              <strong>Racks and pushers</strong> â Players hold tiles upright on racks. Most
              American sets include four racks and a pusher tool.
            </li>
            <li>
              <strong>Dice</strong> â Used to determine wall build order and deal.
            </li>
            <li>
              <strong>Current NMJL card</strong> â The annual hand card. Without it, you
              do not know which hands are legal that year.
            </li>
          </ul>

          {/* NMJL card explained */}
          <h2>The NMJL card explained</h2>
          <p>
            The NMJL card is the defining feature of American Mahjong. Published each spring
            by the National Mah Jongg League, it lists every legal winning hand for that
            year. Hands are organized into categories â often with names like Consecutive
            Run, Like Numbers, Quints, Winds and Dragons, Singles and Pairs, and others.
          </p>
          <p>
            Each hand on the card shows the exact tile composition required, the point value,
            and whether the hand can be played open (with exposed sets called from discards)
            or must be played closed (entirely from draws). Some hands are only achievable
            with jokers; others prohibit joker use entirely.
          </p>
          <p>
            Because the card changes every year, experienced players buy the new card each
            spring and spend time studying the new hands before the season's play begins.
            This annual refresh is part of what keeps the game feeling alive year after year â
            there is always something new to learn.
          </p>

          {/* The tiles */}
          <h2>The tiles</h2>
          <p>
            American sets use the same core tile families as other mahjong styles, with the
            addition of jokers:
          </p>
          <ul>
            <li>
              <strong>Dots (Circles)</strong> â Round symbols numbered 1â9, four copies
              each.
            </li>
            <li>
              <strong>Bamboo (Bams)</strong> â Bamboo stalk imagery numbered 1â9. The 1-Bam
              often depicts a bird.
            </li>
            <li>
              <strong>Characters (Craks)</strong> â Chinese character for the number plus a
              red character meaning "ten thousand." Numbered 1â9.
            </li>
            <li>
              <strong>Winds</strong> â East, South, West, North. Used in many hand patterns
              on the card.
            </li>
            <li>
              <strong>Dragons</strong> â Red Dragon (Chun), Green Dragon (Fah), White Dragon
              (Soap/Bak). All three appear frequently on the NMJL card.
            </li>
            <li>
              <strong>Flowers</strong> â Eight flower tiles. They are collected but not
              played into hands â instead, when drawn, a flower is displayed, and the player
              draws a replacement tile.
            </li>
            <li>
              <strong>Jokers</strong> â Eight wild tiles. They can substitute for any suit
              tile, wind, or dragon in an exposed set of three or more identical tiles (a
              pung or kong). Jokers cannot be used in pairs.
            </li>
          </ul>

          {/* Jokers */}
          <h2>Jokers in American Mahjong</h2>
          <p>
            Jokers are the heart of what makes American Mahjong feel different from other
            styles. In Hong Kong or Taiwanese Mahjong, you build your hand from the tiles
            you draw and claim â there is no substitution. In American Mahjong, jokers let
            you hold a position and pivot.
          </p>
          <p>
            Key joker rules to know:
          </p>
          <ul>
            <li>
              Jokers can substitute for any tile in an exposed pung (three of a kind) or
              kong (four of a kind). They cannot be used in pairs.
            </li>
            <li>
              If a joker sits in an opponent's exposed set, and you have the real tile it is
              substituting, you may exchange your tile for the joker on your turn. This is
              called joker redemption â and it is a major strategic element.
            </li>
            <li>
              Jokers make hands more achievable, but also make defense harder: you cannot
              always be sure what an opponent's exposed set truly contains.
            </li>
            <li>
              Some hands on the NMJL card specify "no jokers" â these hands are typically
              worth more points because they are harder to achieve.
            </li>
          </ul>
          <p>
            Hands pivot around jokers. Exposures carry layered reads. Defense changes because
            discarding a tile that fills an opponent's joker-heavy set can be catastrophic.
            Learning to hold jokers, trade them, and bait opponents is what separates
            experienced American players from beginners.
          </p>

          {/* Setup */}
          <h2>Setup</h2>
          <p>
            Before the Charleston begins, the game is set up as follows:
          </p>
          <ol>
            <li>
              <strong>Assign seats.</strong> Typically done by randomization â drawing a wind
              tile, rolling dice, or by agreement.
            </li>
            <li>
              <strong>Shuffle the tiles.</strong> All tiles are mixed face-down on the table.
              Players typically each take a corner and shuffle together.
            </li>
            <li>
              <strong>Build the walls.</strong> Each player stacks tiles in a two-layer row
              in front of them, forming four walls that meet to create a square.
            </li>
            <li>
              <strong>Determine the dealer.</strong> The East player is the first dealer.
              Dice may be rolled to determine wall break position.
            </li>
            <li>
              <strong>Deal the tiles.</strong> The dealer draws 14 tiles; the other three
              players draw 13 tiles each. Players rack their tiles and the Charleston begins.
            </li>
          </ol>

          {/* The Charleston */}
          <h2>The Charleston</h2>
          <p>
            The Charleston is one of American Mahjong's most distinctive features â a
            structured tile exchange that happens before gameplay begins. It gives every
            player the opportunity to shed tiles that do not fit their hand and pick up
            tiles that might.
          </p>
          <p>
            The First Charleston:
          </p>
          <ol>
            <li>
              <strong>First Left.</strong> Each player passes three tiles face-down to the
              player on their left simultaneously.
            </li>
            <li>
              <strong>First Across.</strong> Each player passes three tiles face-down to the
              player directly across.
            </li>
            <li>
              <strong>First Right.</strong> Each player passes three tiles face-down to the
              player on their right.
            </li>
          </ol>
          <p>
            After the First Charleston, players may agree to a Second Charleston (left,
            across, right again). In the last pass of the Second Charleston, players may
            "steal" from the courtesy â meaning they can keep some of what was passed to
            them and substitute tiles of their own choosing. At the very end, players may
            optionally do a Courtesy pass, trading 1â3 tiles with any one opponent if both
            agree.
          </p>
          <p>
            The Charleston is where strategy begins. Knowing what to pass â tiles that do
            not fit your card direction â and what to hold requires reading the card quickly
            and committing to a path early.
          </p>

          {/* How gameplay works */}
          <h2>How gameplay works</h2>
          <p>
            After the Charleston, the dealer discards one tile to start play. From there,
            the game proceeds clockwise:
          </p>
          <ol>
            <li>
              <strong>Draw.</strong> The active player draws a tile from the wall (or takes
              a discarded tile if they can complete an exposed set or win).
            </li>
            <li>
              <strong>Claiming discards.</strong> Any player â not just the next in sequence
              â may call a discard to complete an exposed pung or kong, or to win (mahj).
              The claim must happen before the next discard is played.
            </li>
            <li>
              <strong>Exposures.</strong> When a player claims a discard, they expose the
              completed set face-up on their rack. This reveals information about their hand
              to all players.
            </li>
            <li>
              <strong>Discard.</strong> After drawing or claiming, the active player
              discards one tile face-up. Other players may call it before the turn passes.
            </li>
            <li>
              <strong>Joker redemption.</strong> On their turn before drawing, a player may
              swap a real tile for a joker sitting in any opponent's exposed set.
            </li>
          </ol>
          <p>
            The core strategy is different from other styles. You are not just building
            toward any valid hand â you are pattern-matching against the current NMJL card,
            committing to a specific hand, and deciding how to position every tile around
            that commitment. More pattern recognition, more card-reading, more commitment
            decisions.
          </p>

          {/* Winning */}
          <h2>Winning in American Mahjong</h2>
          <p>
            A player wins by completing a legal hand from the current NMJL card. When a
            player is ready to declare a win, they call "Mahj!" and expose all tiles. The
            hand must exactly match one of the hands on the card â tile for tile, set for
            set, including any joker restrictions.
          </p>
          <p>
            Unlike some other styles, there is no partial credit. If your hand does not
            precisely match a card hand, it is dead â meaning you cannot win with it and
            may owe a penalty. Players who declare a dead hand (inadvertently revealing
            they cannot win) typically owe each opponent the value of the highest hand on
            the card.
          </p>
          <p>
            Point values vary by hand. Hands that require no jokers are typically worth
            more. Payment is collected from all three opponents when you win â or just from
            the player who discarded the winning tile in some house rule variants.
          </p>

          {/* vs Hong Kong */}
          <h2>How American Mahjong differs from Hong Kong Mahjong</h2>
          <p>
            American and Hong Kong Mahjong share roots but feel like different games at the
            table.
          </p>
          <ul>
            <li>
              <strong>Annual card vs. fixed rules.</strong> American Mahjong uses the NMJL
              card â a changing annual hand list. Hong Kong Mahjong uses fixed hand
              categories that do not change year to year.
            </li>
            <li>
              <strong>Jokers.</strong> American Mahjong uses eight jokers as core gameplay
              elements. Hong Kong Mahjong uses no jokers.
            </li>
            <li>
              <strong>The Charleston.</strong> American Mahjong includes the Charleston
              pregame exchange. Hong Kong Mahjong goes directly to wall drawing.
            </li>
            <li>
              <strong>Hand flexibility.</strong> Hong Kong Mahjong allows more open-ended
              hand construction â any combination of valid sets and a pair can win (subject
              to point minimums). American Mahjong requires an exact card match.
            </li>
            <li>
              <strong>Scoring.</strong> Hong Kong Mahjong uses a points-and-multipliers
              system where hand value varies based on composition. American Mahjong uses
              fixed point values assigned per hand on the card.
            </li>
          </ul>
          <p>
            See the full comparison:{' '}
            <Link href="/styles/hong-kong-mahjong">Hong Kong Mahjong</Link> or the{' '}
            <Link href="/compare/mahjong-styles">Mahjong Styles Comparison</Link>.
          </p>

          {/* vs Taiwanese */}
          <h2>How American Mahjong differs from Taiwanese Mahjong</h2>
          <p>
            Taiwanese Mahjong shares the no-joker, no-annual-card approach of Hong Kong
            Mahjong but adds its own distinctive elements: 16-tile hands, a zimo (self-draw
            win) bonus structure, and no-discard-win rules that dramatically change defense.
            American Mahjong is more pattern-specific and card-driven; Taiwanese is more
            fluid and hand-building oriented with a heavier self-draw incentive.
          </p>
          <p>
            See also:{' '}
            <Link href="/styles/taiwanese-mahjong">Taiwanese Mahjong</Link>.
          </p>

          {/* Where to get the card */}
          <h2>Where to get the annual NMJL card</h2>
          <p>
            The annual card is published each spring by the National Mah Jongg League and
            is available for purchase directly from their website. It is not freely
            distributed â it must be bought. Cards are available in standard and large-print
            formats.
          </p>
          <p>
            Many local game stores that carry American mahjong sets also stock the current
            card. Some mahjong clubs purchase cards in bulk for their members. If you are
            joining a local group, ask the organizer â they often have extras or can point
            you to a source.
          </p>

          {/* Strategy */}
          <h2>Strategy basics</h2>
          <p>
            American Mahjong rewards deliberate, card-aware play. Five fundamentals:
          </p>
          <ol>
            <li>
              <strong>Learn the card categories.</strong> Do not try to memorize every hand
              at once. Focus on one or two card categories you find intuitive. Consecutive
              runs, like numbers, and winds/dragons each have different feels â find yours.
            </li>
            <li>
              <strong>Pick a direction early but stay flexible.</strong> During the
              Charleston you should have 2â3 potential hand directions. By the end of the
              Charleston, commit to one or two and pass away tiles that do not serve them.
            </li>
            <li>
              <strong>Use Charleston wisely.</strong> The Charleston is not just about
              getting rid of bad tiles â it is about shaping your hand toward a specific
              card target. Think about what you are building, not just what you do not want.
            </li>
            <li>
              <strong>Respect jokers.</strong> Hold jokers until you know where they belong.
              Do not expose a joker set too early unless you have strong defensive reads on
              your opponents. Remember that opponents can redeem jokers from your exposures.
            </li>
            <li>
              <strong>Play socially and observantly.</strong> American Mahjong is inherently
              a social game. Read the table. Notice what opponents expose. Listen to what
              they call. Adjust your discards based on what hands you see them building.
            </li>
          </ol>

          {/* Etiquette */}
          <h2>Etiquette at the table</h2>
          <p>
            American Mahjong has a strong community culture and with that comes a set of
            widely shared table manners:
          </p>
          <ul>
            <li>
              <strong>Be clear during Charleston.</strong> Pass tiles simultaneously and
              face-down. Do not look at what you receive before everyone has passed.
            </li>
            <li>
              <strong>Announce calls cleanly.</strong> Say "Mahj" clearly and promptly. Do
              not hover or delay calls â be decisive.
            </li>
            <li>
              <strong>Keep the card readable.</strong> Your NMJL card should be visible to
              you, but do not hold hands you are building toward in a way that makes your
              card section obvious to others.
            </li>
            <li>
              <strong>Be patient with new players.</strong> American Mahjong has a long
              teaching tradition. Experienced players routinely bring in newcomers. If
              someone at your table is learning, slow down and explain â it is part of the
              culture.
            </li>
            <li>
              <strong>Clarify house rules before you start.</strong> Some groups play with
              minor variations â on courtesies, joker redemption timing, or what counts as
              a dead hand. Get alignment before the first Charleston.
            </li>
            <li>
              <strong>Respect local teaching culture.</strong> Different clubs have different
              norms for how much advice is shared during play. Follow the lead of the host
              or the most experienced player at the table.
            </li>
          </ul>

          {/* Why people love it */}
          <h2>Why people love American Mahjong</h2>
          <p>
            American Mahjong is many things at once. It is a strategy game demanding real
            pattern recognition and card-reading. It is a social ritual â the Charleston,
            the tile shuffle, the click of tiles on racks. It is a tactile experience with
            beautiful sets and the physical pleasure of heavy tiles. And it refreshes every
            year with a new card, so the game never fully stagnates.
          </p>
          <p>
            The community around American Mahjong is particularly warm. Clubs form in homes,
            community centers, country clubs, and online groups. There is a strong tradition
            of teaching newcomers, of fundraising through charity play, and of passing the
            game down across generations. If you want a game that is as much about who you
            play with as how you play, American Mahjong delivers.
          </p>

          {/* FAQs */}
          <h2>Frequently asked questions</h2>

          <div
            style={{ borderTop: '1px solid var(--bone)' }}
            className="mt-2 divide-y"
          >
            {faqs.map((faq, i) => (
              <div key={i} className="py-6">
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--espresso)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    marginTop: 0,
                    marginBottom: '0.75rem',
                  }}
                >
                  {faq.question}
                </h3>
                <p
                  style={{
                    color: 'var(--walnut)',
                    fontFamily: 'var(--font-body)',
                    margin: 0,
                  }}
                >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Keep exploring */}
          <h2 style={{ marginTop: '3rem' }}>Keep exploring</h2>
          <p>
            American Mahjong is one style in a broader world. Learn how it compares, find
            local play, or go deeper on another style:
          </p>
          <ul>
            <li>
              <Link href="/compare/mahjong-styles">
                Compare all mahjong styles side by side
              </Link>{' '}
              â American, Hong Kong, Taiwanese, and more in one chart.
            </li>
            <li>
              <Link href="/styles/hong-kong-mahjong">Hong Kong Mahjong</Link> â the
              classic Cantonese style with fluid hand-building and points multipliers.
            </li>
            <li>
              <Link href="/styles/taiwanese-mahjong">Taiwanese Mahjong</Link> â 16-tile
              hands, zimo bonuses, and a different strategic flavor.
            </li>
            <li>
              <Link href="/learn/how-to-play-mahjong">How to Play Mahjong</Link> â start
              here if you are brand new to the game.
            </li>
            <li>
              <Link href="/events">Browse mahjong events</Link> â find American Mahjong
              groups, tournaments, and clubs near you.
            </li>
          </ul>
        </div>
      </main>
    </>
  );
}
