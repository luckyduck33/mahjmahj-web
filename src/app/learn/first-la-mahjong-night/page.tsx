import type { Metadata } from 'next';
import Link from 'next/link';
import { articleSchema, faqSchema, breadcrumbSchema } from '@/lib/schema';

const URL = 'https://mahjmahj.co/learn/first-la-mahjong-night';
const TITLE = 'Your First LA Mahjong Night: What to Expect';
const DESCRIPTION =
  'Worried you will be the only one who does not know what is happening at your first LA Hong Kong Mahjong night? Here is exactly what to expect, what to bring, and the etiquette basics.';

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
    question: 'Is it okay to attend an LA Mahjong night alone?',
    answer:
      'Yes. Mahjong is a good solo-friendly social activity because the table gives the night structure and makes conversation easier.',
  },
  {
    question: 'Do I need to know the rules before attending?',
    answer:
      'No, but choose a beginner-friendly event if you are brand new. You will learn faster by watching the tiles move at an actual table.',
  },
  {
    question: 'What style should I expect at MAHJ MAHJ events?',
    answer:
      'MAHJ MAHJ centers Hong Kong Mahjong, but some LA events may include Taiwanese or American Mahjong. Check the listing before attending.',
  },
  {
    question: 'What if I make a mistake?',
    answer:
      'Mistakes are expected when learning Mahjong. A good beginner table will help you correct the move and keep playing.',
  },
];

const schema = [
  articleSchema({
    headline: TITLE,
    description: DESCRIPTION,
    url: URL,
    datePublished: '2026-05-15',
    dateModified: '2026-05-17',
  }),
  breadcrumbSchema([
    { name: 'Home', url: 'https://mahjmahj.co' },
    { name: 'Learn', url: 'https://mahjmahj.co/learn/how-to-play-mahjong' },
    { name: TITLE, url: URL },
  ]),
  faqSchema(faqs),
];

const sections = [
  {
    heading: 'Before You Go',
    paras: [
      'Check the event listing carefully. Look for the style of play, beginner language, arrival time, registration requirements, and whether instruction is included. MAHJ MAHJ focuses on Hong Kong Mahjong, but LA events may also mention Taiwanese or American Mahjong.',
      'If the listing does not say beginners are welcome, message the host or choose a more clearly guided event.',
    ],
  },
  {
    heading: 'What to Bring',
    paras: [
      'Bring yourself, a little patience, and maybe a notebook if you learn best by writing things down. Most organized events provide tiles, tables, and the structure for play. If there is a fee, it usually covers the host, venue, instruction, or table setup.',
      'You do not need to arrive fluent. You do need to arrive willing to listen.',
    ],
  },
  {
    heading: 'How the Night Usually Runs',
    paras: [
      'A beginner-friendly night may start with introductions, a quick explanation of the tiles, and a guided first round. A social play night may move faster, with hosts placing newer players at a learning table or pairing them with more experienced players.',
      'The first few rounds can feel like a lot. Then patterns begin to appear: suits, sets, turns, discards, calls, rhythm. The table starts to make sense.',
    ],
  },
  {
    heading: 'Etiquette Basics',
    paras: [
      'Be on time. Listen when the host explains the rules. Do not rush other players. Ask questions at natural pauses. If you are unsure whether to call a tile, ask. If you make a mistake, keep going.',
      'Good Mahjong rooms are generous with beginners because every strong player was once new.',
    ],
  },
  {
    heading: 'Why LA Is a Good Place to Start',
    paras: [
      'LA&rsquo;s Hong Kong Mahjong scene is still forming, which makes it more welcoming than a scene that feels sealed off. There is room for new players, new hosts, new clubs, and new rituals.',
      'Your first night is not about winning. It is about finding your seat.',
    ],
  },
];

export default function FirstLAMahjongNightPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section
        style={{ background: 'var(--espresso)' }}
        className="px-6 py-20 md:py-28 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <p
            style={{ color: 'var(--teal)', fontFamily: 'var(--font-heading)', fontSize: '0.7rem', letterSpacing: '0.15em' }}
            className="uppercase mb-4"
          >
            Los Angeles
          </p>
          <h1
            style={{ color: 'var(--td1)', fontFamily: 'var(--font-heading)' }}
            className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
          >
            Your First LA Mahjong Night: What to Expect
          </h1>
          <p style={{ color: 'var(--td2)' }} className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            It should not feel like an exam. It should feel like being invited to a table.
          </p>
        </div>
      </section>

      <main style={{ background: 'var(--linen)' }} className="px-6 py-16 md:py-20">
        <div className="max-w-4xl mx-auto content-article">

          <section className="mb-16">
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed mb-4">
              Your first Hong Kong Mahjong night in Los Angeles should not feel like an exam. It should feel like being invited to a table. You will not know every rule at first. You may not remember every tile. That is normal. Mahjong becomes clearer when you sit down and see the game move.
            </p>
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed">
              This guide is for the person who wants to go, but is quietly worried they will be the only one who does not know what is happening.
            </p>
          </section>

          {sections.map((s) => (
            <section key={s.heading} className="mb-16">
              <h2
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
                className="text-2xl md:text-3xl font-bold mb-6"
              >
                {s.heading}
              </h2>
              {s.paras.map((p, i) => (
                <p
                  key={i}
                  style={{ color: 'var(--walnut)' }}
                  className={`text-lg leading-relaxed${i < s.paras.length - 1 ? ' mb-4' : ''}`}
                >
                  {p}
                </p>
              ))}
            </section>
          ))}

          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-8"
            >
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
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

          <section className="rounded-lg p-10 text-center" style={{ background: 'var(--espresso)' }}>
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--td1)', fontSize: '1.3rem' }}
              className="font-bold mb-4"
            >
              Find your seat
            </h2>
            <p style={{ color: 'var(--td2)' }} className="text-lg leading-relaxed mb-8 max-w-xl mx-auto">
              Browse the LA events page for a beginner-friendly Hong Kong Mahjong night near you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/events/los-angeles"
                style={{ background: 'var(--terra)', color: 'white', fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.05em' }}
                className="inline-block px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
              >
                See LA Mahjong events
              </Link>
              <Link
                href="/learn/la-hong-kong-mahjong-scene"
                style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--td1)', fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.05em', border: '1px solid rgba(255,255,255,0.15)' }}
                className="inline-block px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
              >
                The LA Mahjong scene
              </Link>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
