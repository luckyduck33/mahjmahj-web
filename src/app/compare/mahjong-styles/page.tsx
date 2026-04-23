import { JsonLd, faqSchema } from '@/components/JsonLd';
import { createMetadata } from '@/lib/metadata';
import Link from 'next/link';

export const metadata = createMetadata({
  title: 'Compare Mahjong Styles',
  description:
    'Compare Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong side by side. Understand the key differences in rules, scoring, tiles, and gameplay.',
  path: '/compare/mahjong-styles',
});

const faqs = [
  {
    question: 'What are the main differences between Hong Kong, Taiwanese, and American Mahjong?',
    answer: 'Each style uses different scoring systems, tile counts, and gameplay mechanics. Hong Kong Mahjong focuses on strategic play with traditional scoring, Taiwanese Mahjong uses 16 tiles per hand with unique bonus tiles, and American Mahjong follows annual cards published by the NMJL with jokers and racks.',
  },
  {
    question: 'Which mahjong style is easiest to learn?',
    answer: 'Many beginners find Hong Kong Mahjong the most accessible starting point due to its straightforward scoring system. However, the best style to learn first often depends on what your local community plays.',
  },
  {
    question: 'Can I play different styles of mahjong with the same tile set?',
    answer: 'Standard mahjong tile sets work for both Hong Kong and Taiwanese Mahjong. American Mahjong requires additional joker tiles and racks, which are sometimes sold separately.',
  },
];

export default function CompareStylesPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-brown-muted mb-6">
            <Link href="/" className="hover:text-terracotta transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-brown-dark">Compare Mahjong Styles</span>
          </nav>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-brown-dark">
            Compare Mahjong Styles
          </h1>
          <p className="mt-4 text-lg text-brown-light">
            Hong Kong Mahjong vs. Taiwanese Mahjong vs. American Mahjong â understand the key
            differences to find the style that fits you best.
          </p>

          {/* Comparison Table */}
          <div className="mt-12 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-teal-dark text-cream">
                  <th className="p-3 text-left font-heading font-semibold rounded-tl-lg">Feature</th>
                  <th className="p-3 text-left font-heading font-semibold">Hong Kong</th>
                  <th className="p-3 text-left font-heading font-semibold">Taiwanese</th>
                  <th className="p-3 text-left font-heading font-semibold rounded-tr-lg">American</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand/50">
                <tr className="bg-cream-light"><td className="p-3 font-medium">Tiles per Hand</td><td className="p-3">13</td><td className="p-3">16</td><td className="p-3">13</td></tr>
                <tr className="bg-cream"><td className="p-3 font-medium">Jokers</td><td className="p-3">No</td><td className="p-3">No</td><td className="p-3">Yes (8)</td></tr>
                <tr className="bg-cream-light"><td className="p-3 font-medium">Scoring</td><td className="p-3">Faan-based</td><td className="p-3">Tai-based</td><td className="p-3">Card-based (NMJL)</td></tr>
                <tr className="bg-cream"><td className="p-3 font-medium">Players</td><td className="p-3">4</td><td className="p-3">4</td><td className="p-3">4</td></tr>
                <tr className="bg-cream-light"><td className="p-3 font-medium">Racks</td><td className="p-3">No</td><td className="p-3">No</td><td className="p-3">Yes</td></tr>
              </tbody>
            </table>
          </div>

          <div className="mt-12 p-8 bg-cream-light rounded-xl border border-sand/50 text-center">
            <p className="text-brown-light">
              A detailed comparison guide is being prepared and will be published soon.
            </p>
          </div>

          {/* Style Links */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Hong Kong Mahjong', slug: 'hong-kong-mahjong', color: 'border-t-terracotta' },
              { name: 'Taiwanese Mahjong', slug: 'taiwanese-mahjong', color: 'border-t-teal' },
              { name: 'American Mahjong', slug: 'american-mahjong', color: 'border-t-gold' },
            ].map((s) => (
              <Link
                key={s.slug}
                href={`/styles/${s.slug}`}
                className={`block p-4 bg-cream-light rounded-lg border border-sand/50 ${s.color} border-t-4 hover:shadow-md transition-shadow text-center`}
              >
                <span className="font-heading font-semibold text-brown-dark">{s.name}</span>
                <span className="block mt-1 text-sm text-terracotta">Learn more &rarr;</span>
              </Link>
            ))}
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
