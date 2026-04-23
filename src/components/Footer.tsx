import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-auto" style={{ background: 'var(--espresso)', color: 'var(--td2)' }}>
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10">
          <p className="font-[family-name:var(--font-heading)] text-2xl font-bold" style={{ color: 'var(--td1)' }}>
            MAHJ MAHJ
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed" style={{ color: 'var(--td2)' }}>
            A modern guide to Mahjong. Learn Hong Kong, Taiwanese, and American Mahjong in one place. Tiles, rules, strategy, and community — all under one roof.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm md:grid-cols-4">
          <div>
            <p className="mb-3 font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--td1)' }}>Learn</p>
            <ul className="space-y-2">
              <li><Link href="/styles/hong-kong-mahjong" className="no-underline transition-colors hover:text-[var(--td1)]" style={{ color: 'var(--td2)' }}>Hong Kong Mahjong</Link></li>
              <li><Link href="/styles/taiwanese-mahjong" className="no-underline transition-colors hover:text-[var(--td1)]" style={{ color: 'var(--td2)' }}>Taiwanese Mahjong</Link></li>
              <li><Link href="/styles/american-mahjong" className="no-underline transition-colors hover:text-[var(--td1)]" style={{ color: 'var(--td2)' }}>American Mahjong</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--td1)' }}>Guides</p>
            <ul className="space-y-2">
              <li><Link href="/learn/how-to-play-mahjong" className="no-underline transition-colors hover:text-[var(--td1)]" style={{ color: 'var(--td2)' }}>How to Play</Link></li>
              <li><Link href="/compare/mahjong-styles" className="no-underline transition-colors hover:text-[var(--td1)]" style={{ color: 'var(--td2)' }}>Compare Styles</Link></li>
              <li><Link href="/learn/which-mahjong-style-is-right-for-me" className="no-underline transition-colors hover:text-[var(--td1)]" style={{ color: 'var(--td2)' }}>Which Style?</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--td1)' }}>Community</p>
            <ul className="space-y-2">
              <li><Link href="/events" className="no-underline transition-colors hover:text-[var(--td1)]" style={{ color: 'var(--td2)' }}>Events</Link></li>
              <li><Link href="/about" className="no-underline transition-colors hover:text-[var(--td1)]" style={{ color: 'var(--td2)' }}>About</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-6 text-xs" style={{ borderColor: 'var(--td3)', color: 'var(--td3)' }}>
          &copy; {new Date().getFullYear()} Mahj Mahj. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
