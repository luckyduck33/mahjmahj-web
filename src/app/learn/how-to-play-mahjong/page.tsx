import type { Metadata } from 'next';
import Link from 'next/link';
import { faqSchema, howToSchema, articleSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'How to Play Mahjong — A Beginner\'s Guide',
  description:
    'Learn how to play mahjong from scratch. Covers tiles, hand structure, how a round works, the three main styles, beginner mistakes, and how to choose your first style.',
  alternates: {
    canonical: 'https://mahjmahj.co/learn/how-to-play-mahjong',
  },
  openGraph: {
    title: 'How to Play Mahjong — A Beginner\'s Guide',
    description:
      'Learn how to play mahjong from scratch. Covers tiles, hand structure, how a round works, the three main styles, beginner mistakes, and how to choose your first style.',
    url: 'https://mahjmahj.co/learn/how-to-play-mahjong',
    type: 'article',
    siteName: 'MAHJ MAHJ',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Play Mahjong — A Beginner\'s Guide',
    description:
      'Learn how to play mahjong from scratch. Tiles, hand structure, rounds, styles, and beginner tips.',
  },
};

const faqs = [
  {
    question: 'How do you play Mahjong in simple terms?',
    answer:
      'Draw and discard tiles until your hand is complete. A complete hand is usually four sets — three tiles that form a sequence or a matching triplet — plus one pair. You win by completing your hand before anyone else does. The specific rules for what counts as a valid hand depend on which style you are playing.',
  },
  {
    question: 'Is Mahjong hard to learn?',
    answer:
      'It can feel unfamiliar at first because of the tiles, but the basic structure is not complicated. If you have played rummy or gin rummy, the core idea is similar. Most beginners can follow a full game within one or two sessions. The depth comes from reading the table, managing risk, and learning more hand patterns over time.',
  },
  {
    question: 'How many players do you need for Mahjong?',
    answer:
      'Usually four. Mahjong is designed as a four-player game, with each player seated at one side of the table. Some variations allow three players, but four is standard across all three main styles — Hong Kong, Taiwanese, and American.',
  },
  {
    question: 'How long does a Mahjong game take?',
    answer:
      'It depends on the style and the group. A full game of Hong Kong Mahjong — four rounds, each with four hands — can take one and a half to three hours with experienced players. American and Taiwanese Mahjong run at similar lengths. Casual games can be shorter if you play by the hand rather than completing a full game.',
  },
  {
    question: 'What is the easiest Mahjong style for beginners?',
    answer:
      'There is no single answer. Hong Kong Mahjong is often recommended because the hand structure is clear and no annual card is required. American Mahjong has a card that tells you exactly which hands are valid, which removes guesswork. The easiest style is usually the one your community plays, because you will have people to learn from.',
  },
  {
    question: 'Do all Mahjong styles use the same rules?',
    answer:
      'No. Hong Kong, Taiwanese, and American Mahjong share the same tile set and basic goal — complete a hand — but they have different hand sizes, scoring systems, and rules. Hong Kong uses 13 tiles and faan scoring. Taiwanese uses 16 tiles. American uses 13 tiles plus jokers and an annual NMJL card that defines valid hands for each year.',
  },
  {
    question: 'Do I need to memorize everything before I start?',
    answer:
      'No. You do not need to memorize all the hands or all the scoring rules before your first game. Start with the basics — how tiles work, what a set and a pair are, and how turns work. The rest comes from playing. Most experienced mahjong players learned by doing, not by studying in advance.',
  },
  {
    question: 'Is Mahjong a game of luck or skill?',
    answer:
      'Both matter. The tiles you draw are random, but how you build your hand, read the table, manage risk, and choose which tiles to discard involves real skill. Over many games, experienced players consistently outperform beginners. In the short run, luck plays a significant role — which is part of what makes each round interesting.',
  },
];

const howTo = howToSchema({
  name: 'How to Play Mahjong',
  description:
    'A step-by-step walkthrough of your first mahjong game, from sorting tiles to winning your first hand.',
  steps: [
    {
      name: 'Look at your tiles and sort into groups',
      text: 'After dealing, pick up your 13 tiles. Sort them by suit — bamboo, circles, characters — and group any matching tiles together. This helps you see what you have to work with.',
    },
    {
      name: 'Notice useful patterns',
      text: 'Look for pairs, sequences of three consecutive tiles in the same suit, or three identical tiles. These are the building blocks of a mahjong hand. See what is already forming.',
    },
    {
      name: 'Draw one tile',
      text: 'On your turn, take the top tile from the wall. Ask yourself: does this tile complete a set, extend a sequence, or give me a pair I needed? If yes, keep it.',
    },
    {
      name: 'Discard one tile',
      text: 'After drawing, discard the least useful tile from your hand face-up to the center. You always return to 13 tiles. Avoid discarding tiles that might complete someone else\'s hand.',
    },
    {
      name: 'Watch what other people throw',
      text: 'Pay attention to discards. They tell you which tiles are available and which hands others might be building. Reading the table is one of the most important skills in mahjong.',
    },
    {
      name: 'Keep shaping your hand toward completion',
      text: 'With each draw and discard, move from a random collection of tiles toward four sets and one pair. Prioritize flexible tiles that could fit multiple patterns.',
    },
    {
      name: 'Learn one layer at a time',
      text: 'For your first games, focus on the rhythm — draw, decide, discard. Scoring, special hands, and strategy all come later. The rhythm is the foundation.',
    },
  ],
});

const faqSchemaData = faqSchema(faqs);
const article = articleSchema({
  headline: "How to Play Mahjong — A Beginner's Guide",
  description:
    'A beginner-friendly guide to mahjong: tiles, hand structure, how a round works, the three main styles, and common first mistakes.',
  url: 'https://mahjmahj.co/learn/how-to-play-mahjong',
});
const combinedSchema = [article, faqSchemaData, howTo];

export default function HowToPlayMahjongPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />

      {/* Hero */}
      <section
        style={{ background: 'var(--espresso)' }}
        className="px-6 py-20 md:py-28 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <p
            style={{ color: 'var(--teal)', fontFamily: 'var(--font-heading)', fontSize: '0.7rem', letterSpacing: '0.15em' }}
            className="uppercase mb-4"
          >
            Beginner Guide
          </p>
          <h1
            style={{ color: 'var(--td1)', fontFamily: 'var(--font-heading)' }}
            className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
          >
            How to Play Mahjong
          </h1>
          <p style={{ color: 'var(--td2)' }} className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            A practical guide for anyone starting from zero. What mahjong is, how it works, and how to play your first game.
          </p>
        </div>
      </section>

      {/* Main content */}
      <main style={{ background: 'var(--linen)' }} className="px-6 py-16 md:py-20">
        <div className="max-w-4xl mx-auto content-article">

          {/* What is Mahjong */}
          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-6"
            >
              What is Mahjong?
            </h2>
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed mb-4">
              Mahjong is a tile-based game for four players. Think of it like rummy — but instead of cards, you are working with 136 to 144 illustrated tiles, and instead of one deck, everyone draws from a shared wall built at the start of each round.
            </p>
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed mb-4">
              The goal is to complete a hand before anyone else. A standard hand is made of four sets — each a group of three matching or sequential tiles — plus one pair. On your turn, you draw a tile from the wall, decide if it helps your hand, and discard one tile you do not need. The game ends when someone completes their hand.
            </p>
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed">
              Mahjong originated in China and has evolved into several distinct styles. In the United States, the three most common are Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong. They share the same tile set and basic goal, but play quite differently.
            </p>
          </section>

          {/* What all styles share */}
          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-6"
            >
              What all styles share
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { num: '01', text: 'Four players, one table, tiles for everyone' },
                { num: '02', text: 'A shared wall of tiles dealt at the start of each round' },
                { num: '03', text: 'Turns of drawing one tile and discarding one tile' },
                { num: '04', text: 'A winning hand built from sets and a pair' },
                { num: '05', text: 'The option to claim certain discards to complete sets' },
                { num: '06', text: 'A social, real-time game that rewards reading the table' },
              ].map((item) => (
                <div
                  key={item.num}
                  style={{ background: 'var(--paper)', border: '1px solid var(--bone)' }}
                  className="rounded-lg p-5 flex items-start gap-4"
                >
                  <span
                    style={{ color: 'var(--teal)', fontFamily: 'var(--font-heading)', fontSize: '0.75rem', minWidth: '2rem' }}
                    className="font-bold pt-0.5"
                  >
                    {item.num}
                  </span>
                  <span style={{ color: 'var(--walnut)', fontSize: '0.95rem' }} className="leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>
          </section>

          {/* The tiles */}
          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-6"
            >
              The tiles
            </h2>
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed mb-6">
              A standard mahjong set has 136 to 144 tiles, divided into four categories:
            </p>
            <div className="space-y-4">
              {[
                {
                  title: 'Suited tiles (108 total)',
                  color: 'var(--terra)',
                  desc: 'Three suits — bamboo, circles (dots), and characters. Each suit runs from 1 to 9, with four copies of each tile. These are the workhorses of every hand.',
                },
                {
                  title: 'Honor tiles (28 total)',
                  color: 'var(--teal)',
                  desc: 'Winds (East, South, West, North) and Dragons (Red, Green, White). These form sets as triplets — there are no sequences among honors. Four copies of each.',
                },
                {
                  title: 'Bonus tiles (8 total)',
                  color: 'var(--mustard)',
                  desc: 'Flowers and seasons. These are set aside when drawn and replaced with another tile. They add bonus points in some styles but are not part of the main hand.',
                },
                {
                  title: 'Jokers (American Mahjong only)',
                  color: 'var(--stone)',
                  desc: 'Wild tiles that can substitute for any tile in a set. Unique to American Mahjong. Not used in Hong Kong or Taiwanese styles.',
                },
              ].map((tile) => (
                <div
                  key={tile.title}
                  style={{ background: 'var(--paper)', border: '1px solid var(--bone)', borderLeft: `4px solid ${tile.color}` }}
                  className="rounded-lg p-5"
                >
                  <h3
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '0.85rem' }}
                    className="font-bold mb-2"
                  >
                    {tile.title}
                  </h3>
                  <p style={{ color: 'var(--walnut)', fontSize: '0.95rem' }} className="leading-relaxed">{tile.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Winning hand */}
          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-6"
            >
              The basic winning hand
            </h2>
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed mb-6">
              In most styles, a complete hand is four sets plus one pair — 14 tiles total. A set is either:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {[
                {
                  title: 'Sequence (Chow)',
                  desc: 'Three consecutive tiles in the same suit. Example: 3-4-5 of bamboo.',
                  color: 'var(--teal)',
                },
                {
                  title: 'Triplet (Pung)',
                  desc: 'Three identical tiles. Example: three 7-bamboo, or three East winds.',
                  color: 'var(--terra)',
                },
                {
                  title: 'Quad (Kong)',
                  desc: 'Four identical tiles, declared openly. Earns a bonus draw and adds scoring value.',
                  color: 'var(--mustard)',
                },
                {
                  title: 'Pair',
                  desc: 'Two identical tiles. Every hand needs exactly one pair to be complete.',
                  color: 'var(--stone)',
                },
              ].map((set) => (
                <div
                  key={set.title}
                  style={{ background: 'var(--paper)', border: '1px solid var(--bone)', borderTop: `3px solid ${set.color}` }}
                  className="rounded-lg p-5"
                >
                  <h3
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '0.85rem' }}
                    className="font-bold mb-2"
                  >
                    {set.title}
                  </h3>
                  <p style={{ color: 'var(--walnut)', fontSize: '0.9rem' }} className="leading-relaxed">{set.desc}</p>
                </div>
              ))}
            </div>
            <p style={{ color: 'var(--walnut)' }} className="leading-relaxed">
              American Mahjong differs: valid hands are defined by the annual NMJL card rather than the standard four-sets-plus-pair structure. Some hands on the card follow different patterns entirely.
            </p>
          </section>

          {/* How a round works */}
          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-8"
            >
              How a round works
            </h2>
            <div className="space-y-4">
              {[
                { step: '1', title: 'Build the wall', desc: 'All tiles are shuffled face-down and stacked into a rectangular wall in the center of the table. Each side has 34 tiles in a 17x2 stack.' },
                { step: '2', title: 'Deal', desc: 'The dealer (East) takes 14 tiles; the other three players take 13. In some styles, bonus tiles are immediately revealed and replaced.' },
                { step: '3', title: 'East takes the first turn', desc: 'The dealer begins by discarding one tile. This sets the game in motion.' },
                { step: '4', title: 'Take turns drawing and discarding', desc: 'Play moves counterclockwise. On your turn, draw the next tile from the wall, add it to your hand, then discard one tile face-up to the center.' },
                { step: '5', title: 'Claim discards', desc: 'When a player discards, any player may claim that tile to complete a set — but only if it completes a set they can show. Priority rules vary by style.' },
                { step: '6', title: 'Declare a win', desc: 'When you complete your hand, declare it. You may win on your own draw or by claiming a discard that completes your hand.' },
                { step: '7', title: 'Score the hand and rotate', desc: 'The winner (and sometimes other players) scores points. The dealer role passes, and a new round begins. A full game typically completes four rounds.' },
              ].map((item) => (
                <div
                  key={item.step}
                  style={{ background: 'var(--paper)', border: '1px solid var(--bone)' }}
                  className="rounded-lg p-5 flex items-start gap-5"
                >
                  <div
                    style={{ background: 'var(--teal)', color: 'white', fontFamily: 'var(--font-heading)', minWidth: '2.25rem', height: '2.25rem', fontSize: '0.8rem' }}
                    className="rounded-full flex items-center justify-center font-bold flex-shrink-0"
                  >
                    {item.step}
                  </div>
                  <div>
                    <h3
                      style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '0.9rem' }}
                      className="font-bold mb-1"
                    >
                      {item.title}
                    </h3>
                    <p style={{ color: 'var(--walnut)', fontSize: '0.9rem' }} className="leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Three main styles */}
          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-8"
            >
              The three main styles in the US
            </h2>
            <div className="space-y-5">
              {[
                {
                  title: 'Hong Kong Mahjong',
                  href: '/styles/hong-kong-mahjong',
                  color: 'var(--terra)',
                  desc: 'Thirteen tiles, faan-based scoring, no jokers, no annual card. Clean structure, fast pace. The most widely played traditional style. A strong starting point for anyone drawn to strategy.',
                },
                {
                  title: 'Taiwanese Mahjong',
                  href: '/styles/taiwanese-mahjong',
                  color: 'var(--teal)',
                  desc: 'Sixteen tiles, a larger hand, and a livelier table. No jokers, no card required. More tiles means more options per round and a more dynamic, social game.',
                },
                {
                  title: 'American Mahjong',
                  href: '/styles/american-mahjong',
                  color: 'var(--mustard)',
                  desc: 'Thirteen tiles plus jokers, scored against an annual NMJL card. Pattern-based, club-oriented, and highly social. The dominant style in many US community settings.',
                },
              ].map((style) => (
                <div
                  key={style.title}
                  style={{ background: 'var(--paper)', border: '1px solid var(--bone)', borderLeft: `4px solid ${style.color}` }}
                  className="rounded-lg p-6"
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1">
                      <h3
                        style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '0.95rem' }}
                        className="font-bold mb-2"
                      >
                        {style.title}
                      </h3>
                      <p style={{ color: 'var(--walnut)', fontSize: '0.9rem' }} className="leading-relaxed">{style.desc}</p>
                    </div>
                    <Link
                      href={style.href}
                      style={{ color: style.color, fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap' }}
                      className="hover:underline"
                    >
                      Full guide &#8594;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link
                href="/compare/mahjong-styles"
                style={{ color: 'var(--teal)', fontSize: '0.95rem', fontWeight: 600 }}
                className="hover:underline"
              >
                See a full side-by-side comparison of all three styles &#8594;
              </Link>
            </div>
          </section>

          {/* What you need */}
          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-6"
            >
              What you need to start
            </h2>
            <ul className="space-y-3">
              {[
                'A mahjong set — 144 tiles, four racks, dice, and wind markers. Most sets work for all styles.',
                'Three other players. Mahjong is a four-player game.',
                'A flat surface — a mahjong table is ideal but any large table works.',
                'For American Mahjong: the current-year NMJL card (purchased annually). Not needed for other styles.',
                'Time — allow two to three hours for your first game, including setup and explanation.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span style={{ color: 'var(--teal)', marginTop: '0.25rem' }}>&#9642;</span>
                  <span style={{ color: 'var(--walnut)' }} className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Simplified first-game walkthrough */}
          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-4"
            >
              Your first game: a simplified walkthrough
            </h2>
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed mb-8">
              Do not worry about scoring on your first game. Just focus on the rhythm. Here is how to approach it:
            </p>
            <div className="space-y-4">
              {[
                { name: 'Look at your tiles — Sort into groups', text: 'After dealing, pick up your 13 tiles. Sort them by suit — bamboo, circles, characters — and group any matching tiles together. This helps you see what you have to work with.' },
                { name: 'Notice useful patterns — Look for pairs, sequences, honors', text: 'Look for pairs, sequences of three consecutive tiles in the same suit, or three identical tiles. These are the building blocks of a mahjong hand. See what is already forming.' },
                { name: 'Draw one tile — Ask if it helps', text: 'On your turn, take the top tile from the wall. Ask yourself: does this tile complete a set, extend a sequence, or give me a pair I needed? If yes, keep it.' },
                { name: 'Discard one tile — Remove least useful', text: 'After drawing, discard the least useful tile from your hand face-up to the center. You always return to 13 tiles. Avoid discarding tiles that might complete someone else\'s hand.' },
                { name: 'Watch what other people throw — Read the table', text: 'Pay attention to discards. They tell you which tiles are available and which hands others might be building. Reading the table is one of the most important skills in mahjong.' },
                { name: 'Keep shaping toward a hand — Move from random to focused', text: 'With each draw and discard, move from a random collection of tiles toward four sets and one pair. Prioritize flexible tiles that could fit multiple patterns.' },
                { name: 'Learn one layer at a time — Understand the rhythm first', text: 'For your first games, focus on the rhythm — draw, decide, discard. Scoring, special hands, and strategy all come later. The rhythm is the foundation.' },
              ].map((step, i) => (
                <div
                  key={step.name}
                  style={{ background: 'var(--paper)', border: '1px solid var(--bone)' }}
                  className="rounded-lg p-5 flex items-start gap-5"
                >
                  <div
                    style={{ background: 'var(--terra)', color: 'white', fontFamily: 'var(--font-heading)', minWidth: '2rem', height: '2rem', fontSize: '0.75rem' }}
                    className="rounded-full flex items-center justify-center font-bold flex-shrink-0"
                  >
                    {i + 1}
                  </div>
                  <div>
                    <h3
                      style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '0.85rem' }}
                      className="font-bold mb-1"
                    >
                      {step.name}
                    </h3>
                    <p style={{ color: 'var(--walnut)', fontSize: '0.9rem' }} className="leading-relaxed">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Is Mahjong hard + quick stats */}
          <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
                  className="text-xl md:text-2xl font-bold mb-4"
                >
                  Is Mahjong hard?
                </h2>
                <p style={{ color: 'var(--walnut)' }} className="leading-relaxed mb-4">
                  Not to start playing, but it rewards the time you put in. The basic mechanics — draw, decide, discard — are simple to follow. What takes time is learning to read the table, manage risk, and build toward more complex hands.
                </p>
                <p style={{ color: 'var(--walnut)' }} className="leading-relaxed">
                  Most people can follow a full game in one or two sessions. The depth of strategy takes much longer to develop, which is part of why mahjong has held people for generations.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Number of players', value: '4' },
                  { label: 'Typical game length', value: '2–3 hrs' },
                  { label: 'Tiles in a standard set', value: '136–144' },
                  { label: 'Tiles per hand (HK / American)', value: '13' },
                  { label: 'Tiles per hand (Taiwanese)', value: '16' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    style={{ background: 'var(--paper)', border: '1px solid var(--bone)' }}
                    className="rounded-lg px-5 py-4 flex items-center justify-between"
                  >
                    <span style={{ color: 'var(--stone)', fontSize: '0.85rem' }}>{stat.label}</span>
                    <span style={{ color: 'var(--espresso)', fontFamily: 'var(--font-heading)', fontSize: '1rem' }} className="font-bold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Beginner mistakes */}
          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-6"
            >
              Common beginner mistakes
            </h2>
            <div className="space-y-4">
              {[
                {
                  mistake: 'Trying to memorize everything before playing',
                  fix: 'You do not need to know all the hands or scoring rules before your first game. Learn the basics and play. The rest comes from experience.',
                },
                {
                  mistake: 'Holding on to tiles that are not going anywhere',
                  fix: 'If you have been holding a tile for several rounds hoping something will click, it is usually better to discard it and move on.',
                },
                {
                  mistake: 'Ignoring the discards',
                  fix: 'The discard pile is information. What other players are throwing tells you what they are building — and what might be safe to discard yourself.',
                },
                {
                  mistake: 'Chasing a complicated hand too early',
                  fix: 'When you are new, aim for simple, flexible hands. Complicated hands that require rare tiles often take longer and lose to simpler completed hands.',
                },
                {
                  mistake: 'Not calling tiles you need',
                  fix: 'If someone discards a tile that completes your set, you may be able to claim it. Learn when claiming is allowed in your style and use it.',
                },
              ].map((item) => (
                <div
                  key={item.mistake}
                  style={{ background: 'var(--paper)', border: '1px solid var(--bone)' }}
                  className="rounded-lg p-5"
                >
                  <h3
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--terra)', fontSize: '0.85rem' }}
                    className="font-bold mb-2"
                  >
                    {item.mistake}
                  </h3>
                  <p style={{ color: 'var(--walnut)', fontSize: '0.9rem' }} className="leading-relaxed">{item.fix}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Choosing first style */}
          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-6"
            >
              How to choose your first style
            </h2>
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed mb-4">
              The best first style is the one your community already plays. Learning alongside people who know the game is faster and more enjoyable than learning alone.
            </p>
            <p style={{ color: 'var(--walnut)' }} className="leading-relaxed mb-4">
              If you are choosing independently: Hong Kong Mahjong offers the clearest structure and fastest rounds for a solo learner. American Mahjong has strong club infrastructure and a card that spells out valid hands. Taiwanese Mahjong rewards players who enjoy a bigger, more social game.
            </p>
            <Link
              href="/learn/which-mahjong-style-is-right-for-me"
              style={{ color: 'var(--terra)', fontWeight: 600 }}
              className="hover:underline"
            >
              Take a closer look at which style fits you &#8594;
            </Link>
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

          {/* Welcome CTA */}
          <section
            className="rounded-lg p-10 text-center"
            style={{ background: 'var(--espresso)' }}
          >
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--td1)', fontSize: '1.3rem' }}
              className="font-bold mb-4"
            >
              Welcome to the table
            </h2>
            <p style={{ color: 'var(--td2)' }} className="text-lg leading-relaxed mb-8 max-w-xl mx-auto">
              The best way to learn mahjong is to sit down and play. Find an event near you, meet other players, and let the game teach you the rest.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/events"
                style={{ background: 'var(--terra)', color: 'white', fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.05em' }}
                className="inline-block px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
              >
                Find events near you
              </Link>
              <Link
                href="/compare/mahjong-styles"
                style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--td1)', fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.05em', border: '1px solid rgba(255,255,255,0.15)' }}
                className="inline-block px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
              >
                Compare the styles
              </Link>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
