import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-brown-dark text-cream/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <span className="font-heading text-2xl font-bold text-cream">mahj mahj</span>
            <p className="mt-3 text-sm leading-relaxed">
              A modern guide to mahjong. Find events, learn the game, and connect
              with players across the United States.
            </p>
          </div>

          {/* Styles */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-cream uppercase tracking-wider mb-4">
              Mahjong Styles
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/styles/hong-kong-mahjong" className="hover:text-cream transition-colors">Hong Kong Mahjong</Link></li>
              <li><Link href="/styles/taiwanese-mahjong" className="hover:text-cream transition-colors">Taiwanese Mahjong</Link></li>
              <li><Link href="/styles/american-mahjong" className="hover:text-cream transition-colors">American Mahjong</Link></li>
              <li><Link href="/compare/mahjong-styles" className="hover:text-cream transition-colors">Compare Styles</Link></li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-cream uppercase tracking-wider mb-4">
              Learn
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/learn/how-to-play-mahjong" className="hover:text-cream transition-colors">How to Play Mahjong</Link></li>
              <li><Link href="/learn/which-mahjong-style-is-right-for-me" className="hover:text-cream transition-colors">Find Your Style</Link></li>
              <li><Link href="/events" className="hover:text-cream transition-colors">Find Events</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-cream uppercase tracking-wider mb-4">
              Community
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-cream transition-colors">About MAHJ MAHJ</Link></li>
              <li><a href="https://app.mahjmahj.co" className="hover:text-cream transition-colors">Get the App</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-cream/10 text-sm text-cream/50 text-center">
          <p>&copy; {new Date().getFullYear()} MAHJ MAHJ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
