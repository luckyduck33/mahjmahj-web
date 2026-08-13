import type { Metadata } from 'next';
import Link from 'next/link';
import { faqSchema, productSchema } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import EmailSignup from '@/components/EmailSignup';
import { mahjongNightGear } from '@/data/mahjongNightGear';

const URL = 'https://mahjmahj.co/guides/mahjong-night';
const TITLE = 'The Mahjong Night Kit — Host Your First Hong Kong Mahjong Night';
const DESCRIPTION =
  'A printable kit for hosting a beginner mahjong night: a 20-minute crash course, a 3-hour run of night, cheat sheets, and answers for the stuff nobody tells you.';

// Purchasability is read at build/render time. While this is unset (today's
// state — no payment link configured yet) the buy slot renders a
// "launching soon" waitlist instead of a live price, and NO Product/Offer
// JSON-LD is published — see the Source-of-Truth Gate: don't assert
// something is for sale when it isn't yet.
const paymentLink = process.env.NEXT_PUBLIC_KIT_PAYMENT_LINK;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: 'website',
    siteName: 'MAHJ MAHJ',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

const valueBullets = [
  {
    title: 'A 20-minute crash course you can actually teach',
    body: 'Not a rulebook — a script, built to get a beginner table playing without drowning them in scoring on hand one.',
    color: 'var(--terra)',
  },
  {
    title: 'A real 3-hour timeline',
    body: 'Printable, down to the block — arrival, teaching, practice hands, real rounds, wind-down.',
    color: 'var(--teal-deep)',
  },
  {
    title: 'Printable cheat sheets',
    body: 'Your table can glance at mid-game, covering tiles, turn order, and the faan scoring you actually need for your first several hands.',
    color: 'var(--terra)',
  },
  {
    title: 'Answers for the stuff nobody tells you',
    body: 'What to feed people playing a game that requires clean hands, what to do with an awkward guest count, and what to say when someone is clearly better than everyone else at the table.',
    color: 'var(--teal-deep)',
  },
];

const whatsInside = [
  { title: 'Welcome', desc: 'How to use the kit.' },
  { title: 'Before the Night', desc: 'Guest count, invites, skill-mix strategy, and timing.' },
  { title: 'The Table', desc: 'Physical setup, what you need vs. what is optional.' },
  { title: 'Teaching the Game', desc: 'The 20-minute crash course, common first-game mistakes, and the host fixes for each.' },
  { title: 'Run of Night', desc: 'The printable timeline sheet.' },
  { title: 'Cheat Sheets', desc: 'Tile families, turn order, claiming a discard, and a basic faan scoring table.' },
  { title: 'Food & Drink', desc: 'What actually works around tiles and hands.' },
  { title: 'Troubleshooting', desc: 'Fixes for the six things that go sideways at almost every first mahjong night.' },
];

const faqs = [
  {
    question: 'Do I need to own a mahjong set?',
    answer:
      'Yes — this kit is the planning and teaching material, not a physical set. A standard four-player mahjong set (136 tiles, or 144 with bonus Flowers) works for everything in here.',
  },
  {
    question: 'Which mahjong style is this for?',
    answer:
      'Hong Kong Mahjong — the version with the fastest pace and the rules most people picture by default. If your group specifically wants American mahjong (racks, jokers, the annual card) or Taiwanese mahjong, this kit is not built for those. See our mahjong styles comparison for the differences.',
  },
  {
    question: 'I have never played at all — will I be able to teach it?',
    answer:
      'That is exactly who this is built for. The Teaching the Game section is written as a script you can read from or paraphrase on the spot, not something you need to have mastered first.',
  },
  {
    question: 'What if I only have 5, 6, or 7 people, not a clean multiple of 4?',
    answer:
      'Covered in Before the Night — there is a straightforward rotation system for exactly this.',
  },
  {
    question: 'Is this a printed product or digital?',
    answer:
      'Digital — a set of files you print yourself. The Run of Night timeline and Cheat Sheets are designed to be printed one per table.',
  },
];

const faqSchemaData = faqSchema(faqs);
const schema = paymentLink
  ? [
      faqSchemaData,
      productSchema({
        name: 'The Mahjong Night Kit',
        description: DESCRIPTION,
        url: paymentLink,
        price: '19',
      }),
    ]
  : [faqSchemaData];

// Small drawn accent — three fanned tile faces, rounded-rect, espresso
// stroke. Deliberately abstract marks (no real suit glyphs) rather than
// stock iconography; used once in the hero as the page's signature element.
function TileTrio() {
  return (
    <svg viewBox="0 0 160 90" width="140" height="79" aria-hidden="true">
      <g transform="rotate(-9 29 45)">
        <rect x="6" y="14" width="46" height="62" rx="7" fill="var(--paper-lift)" stroke="var(--espresso)" strokeWidth="2" />
        <circle cx="20" cy="38" r="3.4" fill="var(--teal-deep)" />
        <circle cx="29" cy="46" r="3.4" fill="var(--teal-deep)" />
        <circle cx="38" cy="54" r="3.4" fill="var(--teal-deep)" />
      </g>
      <g>
        <rect x="57" y="6" width="46" height="62" rx="7" fill="var(--paper-lift)" stroke="var(--espresso)" strokeWidth="2" />
        <line x1="72" y1="20" x2="72" y2="60" stroke="var(--terra)" strokeWidth="4" strokeLinecap="round" />
        <line x1="88" y1="20" x2="88" y2="60" stroke="var(--terra)" strokeWidth="4" strokeLinecap="round" />
      </g>
      <g transform="rotate(9 131 45)">
        <rect x="108" y="14" width="46" height="62" rx="7" fill="var(--paper-lift)" stroke="var(--espresso)" strokeWidth="2" />
        <rect x="119" y="33" width="24" height="24" rx="4" transform="rotate(45 131 45)" fill="none" stroke="var(--espresso)" strokeWidth="2.5" />
      </g>
    </svg>
  );
}

export default function MahjongNightKitPage() {
  return (
    <>
      <JsonLd data={schema} />

      {/* Hero */}
      <section style={{ background: 'var(--espresso)' }} className="px-6 py-20 md:py-24 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <div className="mb-6">
            <TileTrio />
          </div>
          <p
            style={{ color: 'var(--terra)', fontFamily: 'var(--font-heading)', fontSize: '0.7rem', letterSpacing: '0.15em' }}
            className="uppercase mb-4"
          >
            The Mahjong Night Kit
          </p>
          <h1
            style={{ color: 'var(--td1)', fontFamily: 'var(--font-heading)' }}
            className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
          >
            Host your first mahjong night without knowing how to play mahjong yet.
          </h1>
          <p style={{ color: 'var(--td2)' }} className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-9">
            A complete, printable kit for getting a table of mostly-beginners from &ldquo;we&rsquo;ve never played&rdquo; to a real game &mdash; in one evening.
          </p>
          {paymentLink ? (
            <a href={paymentLink} target="_blank" rel="noopener noreferrer" className="btn-solid">
              Get the Kit &mdash; $19
            </a>
          ) : (
            <a href="#get-the-kit" className="btn-solid">
              Be first when it launches
            </a>
          )}
        </div>
      </section>

      <main style={{ background: 'var(--linen)' }} className="px-6 py-16 md:py-20">
        <div className="max-w-4xl mx-auto content-article">

          {/* Answer capsule */}
          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-4"
            >
              What is the Mahjong Night Kit?
            </h2>
            <p
              style={{ color: 'var(--espresso)', background: 'var(--paper)', border: '1px solid var(--bone)', borderLeft: '3px solid var(--terra)' }}
              className="text-lg leading-relaxed rounded-lg p-5"
            >
              A printable Hong Kong Mahjong hosting guide: a 20-minute teaching script, a 3-hour run-of-night timeline, and cheat sheets for your first game.
            </p>
          </section>

          {/* Value bullets */}
          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-8"
            >
              What you get
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {valueBullets.map((item) => (
                <div
                  key={item.title}
                  style={{ background: 'var(--paper)', border: '1px solid var(--bone)', borderTop: `3px solid ${item.color}` }}
                  className="rounded-lg p-6"
                >
                  <h3
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '0.9rem' }}
                    className="font-bold mb-3"
                  >
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--walnut)', fontSize: '0.95rem' }} className="leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* What's inside */}
          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-8"
            >
              What&rsquo;s inside
            </h2>
            <div style={{ background: 'var(--paper)', border: '1px solid var(--bone)' }} className="rounded-lg overflow-hidden">
              {whatsInside.map((item, i) => (
                <div
                  key={item.title}
                  style={{ borderBottom: i < whatsInside.length - 1 ? '1px solid var(--bone)' : 'none' }}
                  className="flex items-baseline gap-4 px-6 py-4"
                >
                  <span
                    style={{ color: 'var(--terra)', fontFamily: 'var(--font-heading)', fontSize: '0.75rem', minWidth: '1.5rem' }}
                    className="font-bold flex-shrink-0"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p style={{ color: 'var(--walnut)', fontSize: '0.95rem' }} className="leading-relaxed">
                    <strong style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontWeight: 700, fontSize: '0.85rem' }}>{item.title}</strong>
                    {' — '}{item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Who it's for */}
          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-6"
            >
              Who it&rsquo;s for
            </h2>
            <div style={{ background: 'var(--paper)', border: '1px solid var(--bone)', borderLeft: '4px solid var(--terra)' }} className="rounded-lg p-7">
              <p style={{ color: 'var(--walnut)' }} className="text-lg leading-relaxed mb-4">
                Anyone mahjong-curious who wants to host &mdash; not someone who already plays and wants strategy content. This kit assumes your table is mostly beginners, mixed with maybe one or two people who&rsquo;ve played before.
              </p>
              <p style={{ color: 'var(--walnut)' }} className="leading-relaxed">
                If you&rsquo;re already comfortable running a game, this kit will feel basic; it&rsquo;s built for the host who has never dealt a hand and wants the whole night mapped out in advance.
              </p>
            </div>
          </section>

          {/* Free preview */}
          <section
            id="free-preview"
            className="mb-16 rounded-lg p-8"
            style={{ background: 'var(--sand)', border: '1px solid var(--bone)', borderLeft: '4px solid var(--teal-deep)' }}
          >
            <p style={{ color: 'var(--walnut)' }} className="leading-relaxed mb-6">
              Before you buy, try the two pieces of this kit that do the most work on the night itself: the full <strong style={{ color: 'var(--espresso)' }}>Run of Night</strong> timeline and one <strong style={{ color: 'var(--espresso)' }}>Cheat Sheet</strong>. Print both, run your first hour off them, and see whether the pacing and the reference sheet actually hold up at your table &mdash; if they do, the rest of the kit is built the same way.
            </p>
            <EmailSignup
              variant="kit-preview"
              source="kit-preview"
              downloadUrl="/downloads/mahjong-night-preview.pdf"
              downloadLabel="Download the preview PDF"
            />
          </section>

          {/* Gear module */}
          <section className="mb-16">
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)' }}
              className="text-2xl md:text-3xl font-bold mb-3"
            >
              Get your table started
            </h2>
            <p style={{ color: 'var(--walnut)' }} className="leading-relaxed mb-6">
              The kit is the planning and teaching material &mdash; here is the physical gear that pairs with it, if you need any of it.
            </p>
            <div className="grid md:grid-cols-2 gap-5 mb-4">
              {mahjongNightGear.map((item) => (
                <div
                  key={item.name}
                  data-verified={item.lastVerified}
                  style={{ background: 'var(--paper)', border: '1px solid var(--bone)', borderTop: '3px solid var(--teal-deep)' }}
                  className="rounded-lg p-5"
                >
                  <p
                    style={{ color: 'var(--teal-deep)', fontFamily: 'var(--font-heading)', fontSize: '0.62rem', letterSpacing: '0.14em' }}
                    className="uppercase mb-2"
                  >
                    {item.category}
                  </p>
                  <h3
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '0.88rem' }}
                    className="font-bold mb-2 leading-snug"
                  >
                    {item.name}
                  </h3>
                  <p style={{ color: 'var(--walnut)', fontSize: '0.88rem' }} className="leading-relaxed mb-3">
                    {item.whyChosen}
                  </p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="sponsored nofollow noopener"
                    style={{ color: 'var(--terra)', fontSize: '0.85rem', fontWeight: 600 }}
                    className="hover:underline"
                  >
                    Shop on Amazon &#8594;
                  </a>
                </div>
              ))}
            </div>
            <p style={{ color: 'var(--stone)', fontSize: '0.8rem' }} className="italic">
              As an Amazon Associate, MAHJ MAHJ earns from qualifying purchases.
            </p>
          </section>

          {/* Buy / pricing */}
          <section
            id="get-the-kit"
            className="mb-16 rounded-lg p-8 text-center"
            style={{ background: 'var(--paper)', border: '1px solid var(--bone)', borderTop: '3px solid var(--terra)' }}
          >
            {paymentLink ? (
              <>
                <h2
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '1.3rem' }}
                  className="font-bold mb-3"
                >
                  Get the Kit &mdash; $19
                </h2>
                <p style={{ color: 'var(--walnut)' }} className="leading-relaxed mb-7 max-w-xl mx-auto">
                  Eight sections, printable timeline and cheat sheets, and the teaching script for your first game &mdash; delivered as a digital download you print yourself.
                </p>
                <a href={paymentLink} target="_blank" rel="noopener noreferrer" className="btn-solid">
                  Get the Kit &mdash; $19
                </a>
              </>
            ) : (
              <>
                <h2
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--espresso)', fontSize: '1.3rem' }}
                  className="font-bold mb-3"
                >
                  Launching soon
                </h2>
                <p style={{ color: 'var(--walnut)' }} className="leading-relaxed mb-7 max-w-xl mx-auto">
                  The Mahjong Night Kit isn&rsquo;t live yet. Leave your email and we&rsquo;ll let you know the moment it is &mdash; and you can try the free preview above right now.
                </p>
                <div className="flex justify-center">
                  <div className="max-w-md w-full text-left">
                    <EmailSignup variant="kit-waitlist" source="kit-waitlist" />
                  </div>
                </div>
              </>
            )}
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
          <section className="rounded-lg p-8" style={{ background: 'var(--espresso)' }}>
            <h2
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--td1)', fontSize: '1.1rem' }}
              className="font-bold mb-6 text-center"
            >
              Where to go next
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: 'How to play Mahjong — beginner guide', href: '/learn/how-to-play-mahjong' },
                { label: 'Your first LA mahjong night', href: '/learn/first-la-mahjong-night' },
                { label: 'Hong Kong Mahjong — full guide', href: '/styles/hong-kong-mahjong' },
                { label: 'Compare the mahjong styles', href: '/compare/mahjong-styles' },
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
