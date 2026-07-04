import type { Metadata } from 'next';
import Link from 'next/link';
import { faqSchema, articleSchema } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Which Mahjong Style Is Right for Me?',
  description:
    'Not sure which mahjong style to learn first? This guide helps you choose between Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong based on your personality, community, and goals.',
  alternates: {
    canonical: 'https://mahjmahj.co/learn/which-mahjong-style-is-right-for-me',
  },
  openGraph: {
    title: 'Which Mahjong Style Is Right for Me?',
    description:
      'Hong Kong for strategy. Taiwanese for social energy. American for clubs and patterns. Find the right mahjong style for you.',
    url: 'https://mahjmahj.co/learn/which-mahjong-style-is-right-for-me',
    type: 'article',
    siteName: 'MAHJ MAHJ',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Which Mahjong Style Is Right for Me?',
    description:
      'Hong Kong for strategy. Taiwanese for social energy. American for clubs and patterns. Find the right mahjong style for you.',
  },
};

const faqs = [
  {
    question: 'Which Mahjong should I learn first?',
    answer:
      'Start with what your community plays. If you have friends or a local group that plays a specific style, that is your answer — learning alongside people you know is faster and more enjoyable. If you are choosing independently, Hong Kong Mahjong offers the clearest structure and no annual card requirement, making it an accessible starting point for solo learners.',
  },
  {
    question: 'What is the best Mahjong style for beginners?',
    answer:
      'There is no universal answer. Hong Kong Mahjong is often recommended for its clean four-sets-plus-pair structure and consistent rules. American Mahjong appeals to beginners who like having a card that tells them exactly which hands are valid. The best beginner style is the one that connects you with other players, because you learn mahjong by playing, not by reading.',
  },
  {
    question: 'Is American Mahjong easier than Hong Kong Mahjong?',
    answer:
      'Not necessarily. American Mahjong has a card that defines valid hands, which removes ambiguity — but jokers, swapping mechanics, and the annual card change can make it more complex in other ways. Hong Kong Mahjong has a consistent structure that does not change year to year. Ease depends on how your brain processes pattern matching versus strategic hand-building.',
  },
  {
    question: 'Should I play Hong Kong or Taiwanese Mahjong?',
    answer:
      'It depends on what you value at the table. Hong Kong Mahjong offers a tighter, faster, more strategic game with 13 tiles. Taiwanese Mahjong gives you a larger 16-tile hand, more options per round, and a livelier table atmosphere. If you want sharp and efficient, go Hong Kong. If you want more expansive and social, Taiwanese may suit you better.',
  },
  {
    question: 'Do I have to choose one style forever?',
    answer:
      'No. Many players know multiple styles and switch based on who they are playing with. Learning one style first gives you a foundation that makes picking up others easier. The tile set is the same; the rules and rhythms are different. Most players who learn two styles say the second one clicked much faster than the first.',
  },
  {
    question: 'What if I like more than one style?',
    answer:
      'That is a great sign. It means the game has stuck. Many experienced mahjong players have a primary style and a secondary one they play in different social contexts. There is no rule that says you have to commit. Follow wherever the tables are, and let your preference become clear through experience.',
  },
];

const schema = [
  articleSchema({
    headline: 'Which Mahjong Style Is Right for Me?',
    description:
      'A guide to choosing between Hong Kong, Taiwanese, and American Mahjong based on your community, personality, and goals.',
    url: 'https://mahjmahj.co/learn/which-mahjong-style-is-right-for-me',
  }),
  faqSchema(faqs),
];

export default function WhichStylePage() {
  return (
    <>
      <JsonLd data={schema} />

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
            Style Finder
          </p>
          <h1
            style={{ color: 'var(--td1)', fontFamily: 'var(--font-heading)' }}
            className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
          >
            Which Mahjong Style Is Right for Me?
          </h1>
          <p style={{ color: 'var(--td2)' }} className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Hong Kong for strategy. Taiwanese for social energy. American for clubs and patterns. Here is how to find your fit.
          </p>
        </div>
      </section>

      {/* Main content */}
      <main style={{ background: 'var(--linen)' }} className="px-6 py-16 md:py-20">
        <div className="max-w-4xl mx-auto content-article">

          {/* Short answer */}
          <section className="mb-16">
            <div
              style={{ background: 'var(--sand)', border: '1px solid var(--bone)', borderLeft: '4px solid var(--terra)' }}
              className="rounded-lg p-7 mb-8"
            >
              <h2
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '1rem' }}
                className="font-bold mb-3"
              >
                The short answer
              </h2>
              <ul className="space-y-2">
                {[
                  { style: 'Hong Kong Mahjong', desc: 'if you are drawn to strategy, clean structure, and fast rounds' },
                  { style: 'Taiwanese Mahjong', desc: 'if you want social energy, a bigger hand, and a livelier game' },
                  { style: 'American Mahjong', desc: 'if you love patterns, club culture, and having a card that tells you what counts' },
                ].map((item) => (
                  <li key={item.style} className="flex items-start gap-3">
                    <span style={{ color: 'var(--terra)', marginTop: '0.25rem' }}>&#9642;</span>
                    <span style={{ color: 'var(--walnut)' }} className="leading-relaxed">
                      <strong>{item.style}</strong> — {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed mb-4">
              But the most honest answer is: the best style is the one you can actually play. If all your friends play American Mahjong, that is your starting style. If your local community center hosts Taiwanese games, that is where you learn. The game is better with real people around a real table.
            </p>
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed">
              This guide is for everyone who gets to choose — or wants to understand what they are getting into before they sit down.
            </p>
          </section>

          {/* Best style is one you can play */}
          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-6"
            >
              The best style is one you can actually play
            </h2>
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed mb-4">
              Mahjong is a four-player game. You need three other people to play, and those people need to know the same style as you. Before personality or preference, the most practical question is: who around you plays, and what do they play?
            </p>
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed mb-4">
              If you have a group or community ready to teach you, go with their style. You will learn faster, have more fun, and actually play — which is the point. If you are starting from scratch with no built-in community, then personality and preference become meaningful guides.
            </p>
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed">
              MAHJ MAHJ runs events in multiple cities. If you want to find a table, check the events page and show up — the community will teach you the rest.
            </p>
          </section>

          {/* Three style personalities */}
          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-8"
            >
              Three style personalities
            </h2>
            <div className="space-y-10">

              {/* HK */}
              <div style={{ background: 'var(--paper)', border: '1px solid var(--bone)', borderTop: '3px solid var(--terra)' }} className="rounded-lg p-7">
                <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
                  <div>
                    <h3
                      style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '1.05rem' }}
                      className="font-bold mb-1"
                    >
                      Hong Kong Mahjong
                    </h3>
                    <p style={{ color: 'var(--terra)', fontFamily: 'var(--font-heading)', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
                      SHARP · STRATEGIC · EFFICIENT · SATISFYING
                    </p>
                  </div>
                  <Link
                    href="/styles/hong-kong-mahjong"
                    style={{ color: 'var(--terra)', fontSize: '0.85rem', fontWeight: 600 }}
                    className="hover:underline"
                  >
                    Full guide &#8594;
                  </Link>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4
                      style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '0.8rem' }}
                      className="font-bold mb-3 uppercase tracking-wide"
                    >
                      May be right for you if
                    </h4>
                    <ul className="space-y-2">
                      {[
                        'You enjoy games where strategy consistently rewarded',
                        'You like clean systems you can learn once and keep',
                        'You prefer faster, tighter rounds over longer sessions',
                        'You do not want to buy a new card every year',
                        'You are drawn to games with real depth under a simple surface',
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span style={{ color: 'var(--terra)', marginTop: '0.2rem', fontSize: '0.8rem' }}>&#10003;</span>
                          <span style={{ color: 'var(--walnut)', fontSize: '0.9rem' }} className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4
                      style={{ fontFamily: 'var(--font-heading)', color: 'var(--stone)', fontSize: '0.8rem' }}
                      className="font-bold mb-3 uppercase tracking-wide"
                    >
                      Less ideal if
                    </h4>
                    <ul className="space-y-2">
                      {[
                        'Your main goal is a casual, chatty group experience',
                        'You find strategic games stressful rather than satisfying',
                        'Your community plays a different style',
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span style={{ color: 'var(--stone)', marginTop: '0.2rem', fontSize: '0.8rem' }}>&#8211;</span>
                          <span style={{ color: 'var(--stone)', fontSize: '0.9rem' }} className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Taiwanese */}
              <div style={{ background: 'var(--paper)', border: '1px solid var(--bone)', borderTop: '3px solid var(--teal)' }} className="rounded-lg p-7">
                <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
                  <div>
                    <h3
                      style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '1.05rem' }}
                      className="font-bold mb-1"
                    >
                      Taiwanese Mahjong
                    </h3>
                    <p style={{ color: 'var(--teal)', fontFamily: 'var(--font-heading)', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
                      WARM · LIVELY · EXPANSIVE
                    </p>
                  </div>
                  <Link
                    href="/styles/taiwanese-mahjong"
                    style={{ color: 'var(--teal)', fontSize: '0.85rem', fontWeight: 600 }}
                    className="hover:underline"
                  >
                    Full guide &#8594;
                  </Link>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4
                      style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '0.8rem' }}
                      className="font-bold mb-3 uppercase tracking-wide"
                    >
                      May be right for you if
                    </h4>
                    <ul className="space-y-2">
                      {[
                        'You love a social, high-energy game with plenty going on',
                        'You enjoy working with more options and a bigger hand',
                        'You connect with Taiwanese-American communities',
                        'You like games that feel full and expansive',
                        'You do not want an annual card but want more than HK offers',
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span style={{ color: 'var(--teal)', marginTop: '0.2rem', fontSize: '0.8rem' }}>&#10003;</span>
                          <span style={{ color: 'var(--walnut)', fontSize: '0.9rem' }} className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4
                      style={{ fontFamily: 'var(--font-heading)', color: 'var(--stone)', fontSize: '0.8rem' }}
                      className="font-bold mb-3 uppercase tracking-wide"
                    >
                      Less ideal if
                    </h4>
                    <ul className="space-y-2">
                      {[
                        'You prefer fast, compact rounds',
                        'A 16-tile hand feels overwhelming to start',
                        'You do not have a local Taiwanese Mahjong community',
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span style={{ color: 'var(--stone)', marginTop: '0.2rem', fontSize: '0.8rem' }}>&#8211;</span>
                          <span style={{ color: 'var(--stone)', fontSize: '0.9rem' }} className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* American */}
              <div style={{ background: 'var(--paper)', border: '1px solid var(--bone)', borderTop: '3px solid var(--mustard)' }} className="rounded-lg p-7">
                <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
                  <div>
                    <h3
                      style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '1.05rem' }}
                      className="font-bold mb-1"
                    >
                      American Mahjong
                    </h3>
                    <p style={{ color: 'var(--mustard)', fontFamily: 'var(--font-heading)', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
                      SOCIAL · CLUBBY · PATTERN-DRIVEN
                    </p>
                  </div>
                  <Link
                    href="/styles/american-mahjong"
                    style={{ color: 'var(--mustard)', fontSize: '0.85rem', fontWeight: 600 }}
                    className="hover:underline"
                  >
                    Full guide &#8594;
                  </Link>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4
                      style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '0.8rem' }}
                      className="font-bold mb-3 uppercase tracking-wide"
                    >
                      May be right for you if
                    </h4>
                    <ul className="space-y-2">
                      {[
                        'You enjoy pattern recognition and working toward a target',
                        'You want to join an established club with regular sessions',
                        'You find jokers fun and like the strategic layer they add',
                        'You prefer a game where valid hands are clearly defined',
                        'You value a social, community-centered game experience',
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span style={{ color: 'var(--mustard)', marginTop: '0.2rem', fontSize: '0.8rem' }}>&#10003;</span>
                          <span style={{ color: 'var(--walnut)', fontSize: '0.9rem' }} className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4
                      style={{ fontFamily: 'var(--font-heading)', color: 'var(--stone)', fontSize: '0.8rem' }}
                      className="font-bold mb-3 uppercase tracking-wide"
                    >
                      Less ideal if
                    </h4>
                    <ul className="space-y-2">
                      {[
                        'You dislike buying or memorizing a new card annually',
                        'Jokers feel like they reduce the skill component',
                        'You prefer open-ended hand building over pattern matching',
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span style={{ color: 'var(--stone)', marginTop: '0.2rem', fontSize: '0.8rem' }}>&#8211;</span>
                          <span style={{ color: 'var(--stone)', fontSize: '0.9rem' }} className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Quick-pick matrix */}
          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-8"
            >
              Quick-pick guide
            </h2>
            <div className="overflow-x-auto rounded-lg" style={{ border: '1px solid var(--bone)' }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: 'var(--espresso)' }}>
                    <th style={{ color: 'var(--td2)', fontFamily: 'var(--font-heading)', fontSize: '0.7rem', letterSpacing: '0.08em' }} className="text-left px-5 py-4 font-semibold">If you want</th>
                    <th style={{ color: 'var(--td1)', fontFamily: 'var(--font-heading)', fontSize: '0.7rem', letterSpacing: '0.08em' }} className="text-left px-5 py-4 font-semibold">Start with</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Strategy, depth, fast rounds', 'Hong Kong Mahjong'],
                    ['Clean rules that never change', 'Hong Kong Mahjong'],
                    ['A bigger, louder, more social game', 'Taiwanese Mahjong'],
                    ['More tiles and more options per round', 'Taiwanese Mahjong'],
                    ['Club culture and regular group sessions', 'American Mahjong'],
                    ['Pattern matching against a defined list', 'American Mahjong'],
                    ['Jokers and wild-tile strategy', 'American Mahjong'],
                    ['Whatever your community already plays', 'Ask your group — that is the answer'],
                  ].map((row, i) => (
                    <tr
                      key={row[0]}
                      style={{ background: i % 2 === 0 ? 'var(--paper)' : 'var(--linen)', borderBottom: '1px solid var(--bone)' }}
                    >
                      <td style={{ color: 'var(--walnut)' }} className="px-5 py-4">{row[0]}</td>
                      <td style={{ color: 'var(--espresso)', fontWeight: 600 }} className="px-5 py-4">{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Decision factors */}
          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-8"
            >
              Decision factors worth thinking through
            </h2>
            <div className="space-y-6">
              {[
                {
                  factor: 'Open-ended hand building vs. target hands',
                  body: 'Hong Kong and Taiwanese Mahjong let you build open-endedly — you are constructing four sets and a pair without a list to match against. American Mahjong gives you an annual card with specific patterns to aim for. If you like improvising toward a goal, go traditional. If you like working against a defined target, American Mahjong will feel more satisfying.',
                },
                {
                  factor: 'Table energy',
                  body: 'Think about the kind of game environment you enjoy. Taiwanese Mahjong tends to be louder and more expressive. Hong Kong Mahjong is quieter and more focused. American Mahjong is warm and social — groups tend to be regular, familiar, and friendly. There is no wrong preference.',
                },
                {
                  factor: 'Jokers: fun or annoying?',
                  body: 'Jokers change everything in American Mahjong. They make certain hands achievable that would otherwise be impossible, and the joker-swapping mechanic creates real-time interactions. Some players love this layer of play. Others find it reduces the purity of hand-building. Know which camp you are in before you start.',
                },
                {
                  factor: 'Local community access',
                  body: 'This is the most practical factor. If there is a Taiwanese Mahjong group in your city, that is where you will actually learn. If the only games near you are American Mahjong club nights, that is your path in. Check what events are near you — and go.',
                },
                {
                  factor: 'What kind of learner are you?',
                  body: 'If you learn best by doing, any style works — sit down and play. If you prefer studying first, Hong Kong Mahjong has the most consistent written resources. American Mahjong comes with the annual card as a learning tool. Taiwanese Mahjong is best learned directly from other players.',
                },
              ].map((item) => (
                <div key={item.factor} style={{ borderBottom: '1px solid var(--bone)' }} className="pb-6">
                  <h3
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '0.95rem' }}
                    className="font-bold mb-2"
                  >
                    {item.factor}
                  </h3>
                  <p style={{ color: 'var(--walnut)' }} className="leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Still torn */}
          <section
            className="mb-16 rounded-lg p-7"
            style={{ background: 'var(--sand)', border: '1px solid var(--bone)' }}
          >
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '1.1rem' }}
              className="font-bold mb-4"
            >
              If you are still torn
            </h2>
            <p style={{ color: 'var(--walnut)' }} className="leading-relaxed mb-4">
              Here is the simplest advice: pick one and start. Any style will teach you the fundamentals — how tiles work, how sets form, how turns flow. Learning a second style after your first is much faster than overthinking the choice before you begin.
            </p>
            <p style={{ color: 'var(--walnut)' }} className="leading-relaxed">
              If you cannot decide, go with Hong Kong Mahjong. It is widely documented, broadly played, and the cleanest introduction to what mahjong actually is. You can always branch out from there.
            </p>
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
              The honest answer: all three styles are learnable as a first style. But here is a practical hierarchy:
            </p>
            <ol className="space-y-4">
              {[
                {
                  num: '1',
                  title: 'Start with your community',
                  body: 'If someone in your life plays mahjong, learn their style. The support and accountability of real people makes everything easier.',
                },
                {
                  num: '2',
                  title: 'If you are choosing solo, consider Hong Kong Mahjong',
                  body: 'Clean four-sets-plus-pair structure, no annual card, consistent rules, fast rounds. A strong foundation for everything else.',
                },
                {
                  num: '3',
                  title: 'American Mahjong for club access',
                  body: 'If you want to plug into existing club infrastructure and do not mind the annual card, American Mahjong gets you into organized play quickly.',
                },
                {
                  num: '4',
                  title: 'Taiwanese Mahjong when your circle plays it',
                  body: 'The 16-tile hand can feel like a lot at first, but once you are in a regular Taiwanese group, the game teaches itself.',
                },
              ].map((item) => (
                <li
                  key={item.num}
                  style={{ background: 'var(--paper)', border: '1px solid var(--bone)' }}
                  className="rounded-lg p-5 flex items-start gap-5"
                >
                  <div
                    style={{ background: 'var(--teal)', color: 'white', fontFamily: 'var(--font-heading)', minWidth: '2rem', height: '2rem', fontSize: '0.8rem' }}
                    className="rounded-full flex items-center justify-center font-bold flex-shrink-0"
                  >
                    {item.num}
                  </div>
                  <div>
                    <h3
                      style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '0.9rem' }}
                      className="font-bold mb-1"
                    >
                      {item.title}
                    </h3>
                    <p style={{ color: 'var(--walnut)', fontSize: '0.9rem' }} className="leading-relaxed">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Quick links by style */}
          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-8"
            >
              Start here by style
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Hong Kong Mahjong',
                  color: 'var(--terra)',
                  links: [
                    { label: 'Full guide', href: '/styles/hong-kong-mahjong' },
                    { label: 'Compare all styles', href: '/compare/mahjong-styles' },
                  ],
                },
                {
                  title: 'Taiwanese Mahjong',
                  color: 'var(--teal)',
                  links: [
                    { label: 'Full guide', href: '/styles/taiwanese-mahjong' },
                    { label: 'Compare all styles', href: '/compare/mahjong-styles' },
                  ],
                },
                {
                  title: 'American Mahjong',
                  color: 'var(--mustard)',
                  links: [
                    { label: 'Full guide', href: '/styles/american-mahjong' },
                    { label: 'Compare all styles', href: '/compare/mahjong-styles' },
                  ],
                },
              ].map((style) => (
                <div
                  key={style.title}
                  style={{ background: 'var(--paper)', border: '1px solid var(--bone)', borderTop: `3px solid ${style.color}` }}
                  className="rounded-lg p-6"
                >
                  <h3
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '0.9rem' }}
                    className="font-bold mb-4"
                  >
                    {style.title}
                  </h3>
                  <ul className="space-y-2">
                    {style.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          style={{ color: style.color, fontSize: '0.85rem', fontWeight: 600 }}
                          className="hover:underline"
                        >
                          {link.label} &#8594;
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
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

          {/* Events CTA */}
          <section
            className="rounded-lg p-10 text-center"
            style={{ background: 'var(--espresso)' }}
          >
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--td1)', fontSize: '1.3rem' }}
              className="font-bold mb-4"
            >
              Still not sure? Come to an event.
            </h2>
            <p style={{ color: 'var(--td2)' }} className="text-lg leading-relaxed mb-8 max-w-xl mx-auto">
              The fastest way to figure out which style is right for you is to play. MAHJ MAHJ hosts events across multiple cities. Come once and let the table show you what resonates.
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
                href="/learn/how-to-play-mahjong"
                style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--td1)', fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.05em', border: '1px solid rgba(255,255,255,0.15)' }}
                className="inline-block px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
              >
                How to play mahjong
              </Link>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
