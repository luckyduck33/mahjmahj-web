import { JsonLd, faqSchema } from '@/components/JsonLd';
import { createMetadata } from '@/lib/metadata';
import Link from 'next/link';

export const metadata = createMetadata({
  title: 'Hong Kong Mahjong',
  description: 'Learn about Hong Kong Mahjong â the fast-paced, strategic style rooted in Cantonese tradition. Rules, scoring, strategy, and where to play in the US.',
  path: '/styles/hong-kong-mahjong',
});

const faqs = [
  {
    question: 'What is Hong Kong Mahjong?',
    answer: 'Hong Kong Mahjong is one of the three major styles of mahjong played in the United States. Content coming soon.',
  },
  {
    question: 'Where can I play Hong Kong Mahjong?',
    answer: 'Check our events page to find Hong Kong Mahjong events near you across major US cities.',
  },
  {
    question: 'How is Hong Kong Mahjong different from other styles?',
    answer: 'Each mahjong style has unique rules, scoring systems, and traditions. Visit our comparison page for a detailed breakdown.',
  },
];

export default function HongKongMahjongPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-brown-muted mb-6">
            <Link href="/" className="hover:text-terracotta transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-brown-dark">Hong Kong Mahjong</span>
          </nav>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-brown-dark">
            Hong Kong Mahjong
          </h1>
          <div className="mt-8 prose prose-lg max-w-none text-brown">
            <p className="text-xl text-brown-light italic">
              Learn about Hong Kong Mahjong â the fast-paced, strategic style rooted in Cantonese tradition. Rules, scoring, strategy, and where to play in the US.
            </p>
            <div className="mt-12 p-8 bg-cream-light rounded-xl border border-sand/50 text-center">
              <p className="text-brown-light">
                Detailed content for this page is being prepared and will be published soon.
              </p>
              <p className="mt-4">
                <Link href="/events" className="text-terracotta hover:text-terracotta-light font-medium transition-colors">
                  Browse Hong Kong Mahjong events &rarr;
                </Link>
              </p>
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
