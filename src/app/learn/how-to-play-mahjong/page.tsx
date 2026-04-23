import { JsonLd, faqSchema } from '@/components/JsonLd';
import { createMetadata } from '@/lib/metadata';
import Link from 'next/link';

export const metadata = createMetadata({
  title: 'How to Play Mahjong',
  description:
    'Learn how to play mahjong with our beginner-friendly guide. Understand the basics of tiles, gameplay, scoring, and find your first game.',
  path: '/learn/how-to-play-mahjong',
});

const faqs = [
  {
    question: 'How many players do you need for mahjong?',
    answer: 'Mahjong is traditionally played with 4 players, though some variants allow 3 players.',
  },
  {
    question: 'How long does a game of mahjong take?',
    answer: 'A single round takes about 15-30 minutes. A full game (4 rounds) typically takes 1-2 hours, depending on the style and players\' experience.',
  },
  {
    question: 'What equipment do I need to play mahjong?',
    answer: 'You need a mahjong tile set (144 tiles for most styles), dice, and a flat playing surface. American Mahjong also requires racks, joker tiles, and an annual card from the NMJL.',
  },
  {
    question: 'Which style of mahjong should I learn first?',
    answer: 'It depends on your local community. Hong Kong Mahjong is often recommended for beginners due to its straightforward rules. Check our style comparison guide to decide.',
  },
];

export default function HowToPlayPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-brown-muted mb-6">
            <Link href="/" className="hover:text-terracotta transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/learn/how-to-play-mahjong" className="text-brown-dark">Learn</Link>
          </nav>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-brown-dark">
            How to Play Mahjong
          </h1>
          <p className="mt-4 text-lg text-brown-light">
            A beginner-friendly guide to mahjong â what you need to get started, the basic
            rules, and how to find your first game.
          </p>

          <div className="mt-12 p-8 bg-cream-light rounded-xl border border-sand/50 text-center">
            <p className="text-brown-light">
              A comprehensive beginner&apos;s guide is being prepared and will be published soon.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/compare/mahjong-styles"
                className="text-terracotta hover:text-terracotta-light font-medium transition-colors"
              >
                Compare mahjong styles &rarr;
              </Link>
              <Link
                href="/events"
                className="text-terracotta hover:text-terracotta-light font-medium transition-colors"
              >
                Find a beginner-friendly event &rarr;
              </Link>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="font-heading text-2xl font-bold text-brown-dark mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group bg-cream-light rounded-lg border border-sand/50">
                  <summary className="p-4 cursor-pointer font-medium text-brown-dark hover:text-terracotta transition-colors">
                    {faq.question}
                  </summary>
                  <div className="px-4 pb-4 text-brown-light">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
