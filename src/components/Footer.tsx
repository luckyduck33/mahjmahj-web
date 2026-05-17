import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="site-footer grain">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <Image src="/logo-footer.png" alt="mahj mahj" width={120} height={98} className="footer-logo-img" />
            <span className="footer-tagline">A modern guide to Mahjong.</span>
            <span className="footer-desc">Learn Hong Kong, Taiwanese, and American Mahjong in one place. Tiles, rules, strategy, and community — all under one roof.</span>
          </div>
          <div className="footer-col">
            <h5>Learn</h5>
            <ul>
              <li><Link href="/styles/hong-kong-mahjong">Hong Kong Mahjong</Link></li>
              <li><Link href="/styles/taiwanese-mahjong">Taiwanese Mahjong</Link></li>
              <li><Link href="/styles/american-mahjong">American Mahjong</Link></li>
              <li><Link href="/learn/how-to-play-mahjong">How to Play</Link></li>
              <li><Link href="/compare/mahjong-styles">Compare Styles</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Guides</h5>
            <ul>
              <li><Link href="/learn/which-mahjong-style-is-right-for-me">Which Style?</Link></li>
              <li><Link href="/learn/la-hong-kong-mahjong-scene">LA Mahjong Scene</Link></li>
              <li><Link href="/learn/la-mahjong-clubs">LA Mahjong Clubs</Link></li>
              <li><Link href="/learn/first-la-mahjong-night">First LA Night</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Community</h5>
            <ul>
              <li><Link href="/events">Events</Link></li>
              <li><Link href="/about">About</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">&copy; {new Date().getFullYear()} Mahj Mahj. All rights reserved.</span>
          <span className="footer-btm-logo">mahj mahj</span>
        </div>
      </div>
    </footer>
  );
}
