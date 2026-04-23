import { JsonLd, faqSchema } from '@/components/JsonLd';
import { createMetadata } from '@/lib/metadata';
import Link from 'next/link';

export const metadata = createMetadata({
  title: 'Which Mahjong Style Is Right for Me?',
  description:
    'Not sure which mahjong style to learn? Compare Hong Kong Mahjong, Taiwanese Mahjong, and American Mahjong to find the best fit for your playstyle.',
  path: '/learn/which-mahjong-style-is-right-for-me',
});

const faqs = [
  {
    question: 'I am a complete beginner. Which mahjong style should I start with?',
    answer: 'Hong Kong Mahjong is often recommended for beginners because of its clear scoring system and widespread popularity. However, the best choice depends on what your local community plays.',
  },
  {
    question: 'What is the difference between Hong Kong and Taiwanese Mahjong?',
    answer: 'Hong Kong Mahjong uses 13 tiles per hand with faan-based scoring, while Taiwanese Mahjong uses 16 tiles per hand with tai-based scoring and unique bonus tile mechanics.',
  },
  {
    question: 'Is American Mahjong very different from Asian styles?',
    answer: 'Yes. American Mahjong uses jokers, racks, and a yearly card from the NMJL that defines valid hands. The strategy and gameplay feel quite different from Hong Kong and Taiwanese styles.',
  },
];

export default function WhichStylePage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-brown-muted mb-6">
            <Link href="/" className="hover:text-terracotta transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-brown-dark">Find Your Style</span>
          </nav>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-brown-dark">
            Which Mahjong Style Is Right for Me?
          </h1>
          <p className="mt-4 text-lg text-brown-light">
            Three styles, three traditions, three communities. Find the mahjong style
            that matches your playstyle and local scene.
          </p>

          <div className="mt-12 p-8 bg-cream-light rounded-xl border border-sand/50 text-center">
            <p className="text-brown-light">
              An interactive style-finder quiz is being prepared and will be published soon.
            </p>
            <div className="mt-6">
              <Link
                href="/compare/mahjong-styles"
                className="text-terracotta hover:text-terracotta-light font-medium transition-colors"
              >
                Compare all three styles side by side &rarr;
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
