import type { Metadata } from 'next';
import Link from 'next/link';
import { articleSchema, faqSchema, breadcrumbSchema } from '@/lib/schema';

const URL = 'https://mahjmahj.co/learn/la-hong-kong-mahjong-scene';
const TITLE = 'The LA Hong Kong Mahjong Scene: Where to Find a Table This Week';
const DESCRIPTION =
  'Los Angeles has one of the best Hong Kong Mahjong scenes in the country — clubs, pop-ups, lessons, and recurring table nights across the city. Here is how to find a table this week.';

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
    question: 'Where can I find Hong Kong Mahjong tables in Los Angeles?',
    answer:
      'Use the MAHJ MAHJ Los Angeles events page as the live source for current Hong Kong Mahjong tables, clubs, lessons, and social play nights.',
  },
  {
    question: 'Can beginners join LA Mahjong events?',
    answer:
      'Yes. Many LA Mahjong events are beginner-friendly, but check the event description before attending to confirm whether instruction is included.',
  },
  {
    question: 'What style of Mahjong is most common on MAHJ MAHJ?',
    answer:
      'MAHJ MAHJ focuses on Hong Kong Mahjong, while also recognizing that some events may include Taiwanese Mahjong or American Mahjong.',
  },
  {
    question: 'Should I go alone to a Mahjong night?',
    answer:
      'Yes. Mahjong is one of the easiest social activities to attend alone because the table structure gives players a natural way to meet.',
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

const tableLabels = [
  'Beginner-friendly',
  'Hong Kong Mahjong',
  'Drop-in table',
  'Lesson night',
  'Social play',
  'Club night',
  'Pop-up',
  'Open table',
];

const tableTypes = [
  {
    title: 'Beginner Lessons',
    body: 'Beginner lessons are the best first step if you have never played or if you learned another style. Hong Kong Mahjong has its own pace and rules, and it is easiest to understand when someone walks you through a live table.',
  },
  {
    title: 'Recurring Club Nights',
    body: 'Recurring games are the backbone of the LA scene. These are the events that turn Mahjong from a novelty into a rhythm. If you want to learn faster, go to the same recurring table more than once.',
  },
  {
    title: 'Social Pop-Ups',
    body: 'LA is built for pop-ups, and Mahjong fits that culture perfectly. Some events may feel like a dinner party, some like a community class, and some like a stylish night out with tiles.',
  },
  {
    title: 'Private or Semi-Private Tables',
    body: 'Some tables are hosted through small clubs or social circles. MAHJ MAHJ helps make these easier to discover without flattening the intimacy that makes them special.',
  },
];

export default function LAHongKongMahjongScenePage() {
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
            The LA Hong Kong Mahjong Scene: Where to Find a Table This Week
          </h1>
          <p style={{ color: 'var(--td2)' }} className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Clubs, pop-ups, lessons, and recurring table nights — Los Angeles is becoming one of the best cities in the country to play Hong Kong Mahjong.
          </p>
        </div>
      </section>

      <main style={{ background: 'var(--linen)' }} className="px-6 py-16 md:py-20">
        <div className="max-w-4xl mx-auto content-article">

          <section className="mb-16">
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed mb-4">
              Los Angeles is becoming one of the best cities in the country to learn and play Hong Kong Mahjong because the scene is not confined to one traditional venue. It is showing up through clubs, pop-ups, recurring table nights, social groups, restaurants, creative communities, and beginner-friendly events across the city.
            </p>
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed">
              The easiest way to find a table is to start with the{' '}
              <Link href="/events/los-angeles" style={{ color: 'var(--terra)', fontWeight: 600 }} className="hover:underline">
                MAHJ MAHJ Los Angeles events page
              </Link>
              . It should be treated as the live source for current dates, locations, and availability because Mahjong nights move quickly and new tables appear often.
            </p>
          </section>

          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-6"
            >
              Start With the LA Events Page
            </h2>
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed mb-6">
              For the most current listings, use the Los Angeles city page on MAHJ MAHJ. It is designed to gather the scattered table culture into one place so players do not have to rely on Instagram stories, group chats, or friend-of-friend invitations.
            </p>
            <p style={{ color: 'var(--espresso)', fontWeight: 600 }} className="mb-3">Look for events labeled:</p>
            <div className="flex flex-wrap gap-2">
              {tableLabels.map((label) => (
                <span
                  key={label}
                  style={{ background: 'var(--sand)', border: '1px solid var(--bone)', color: 'var(--walnut)' }}
                  className="px-3 py-1.5 rounded-full text-sm"
                >
                  {label}
                </span>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-8"
            >
              What Kinds of Tables You&rsquo;ll Find
            </h2>
            <div className="space-y-6">
              {tableTypes.map((t) => (
                <div
                  key={t.title}
                  style={{ background: 'var(--paper)', border: '1px solid var(--bone)', borderLeft: '4px solid var(--terra)' }}
                  className="rounded-lg p-6"
                >
                  <h3
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '1rem' }}
                    className="font-bold mb-2"
                  >
                    {t.title}
                  </h3>
                  <p style={{ color: 'var(--walnut)' }} className="leading-relaxed">{t.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-6"
            >
              LA Neighborhood Energy
            </h2>
            <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed">
              The LA scene is naturally decentralized. East Side tables may feel different from West Side events; a NoHo or Highland Park game may have a different social texture than a Venice or Downtown table. That is part of the charm. The city is not building one Mahjong scene. It is building many little tables that can finally see each other.
            </p>
          </section>

          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-6"
            >
              Tips for Finding the Right Table
            </h2>
            <ul className="space-y-3">
              {[
                'Choose a beginner-friendly table if you are new.',
                'Check whether the event is Hong Kong Mahjong, Taiwanese Mahjong, or American Mahjong.',
                'Arrive on time, because instruction usually happens at the beginning.',
                'Do not be afraid to attend alone; Mahjong is designed around small groups, so a table gives you instant structure.',
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-3">
                  <span style={{ color: 'var(--terra)', marginTop: '0.25rem' }}>&#9642;</span>
                  <span style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </section>

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
              Find a table this week
            </h2>
            <p style={{ color: 'var(--td2)' }} className="text-lg leading-relaxed mb-8 max-w-xl mx-auto">
              The LA events page is the live source for Hong Kong Mahjong tables, lessons, and club nights across the city.
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
                href="/learn/la-mahjong-clubs"
                style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--td1)', fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.05em', border: '1px solid rgba(255,255,255,0.15)' }}
                className="inline-block px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
              >
                Meet the LA clubs
              </Link>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
