import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--bone)]" style={{ background: 'var(--paper)' }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-[family-name:var(--font-heading)] text-xl font-bold tracking-tight no-underline" style={{ color: 'var(--espresso)' }}>
          MAHJ MAHJ
        </Link>
        <div className="hidden items-center gap-6 text-sm font-medium md:flex" style={{ color: 'var(--walnut)' }}>
          <Link href="/events" className="no-underline transition-colors hover:text-[var(--terra)]" style={{ color: 'var(--walnut)' }}>Events</Link>
          <Link href="/styles/hong-kong-mahjong" className="no-underline transition-colors hover:text-[var(--terra)]" style={{ color: 'var(--walnut)' }}>Hong Kong</Link>
          <Link href="/styles/taiwanese-mahjong" className="no-underline transition-colors hover:text-[var(--terra)]" style={{ color: 'var(--walnut)' }}>Taiwanese</Link>
          <Link href="/styles/american-mahjong" className="no-underline transition-colors hover:text-[var(--terra)]" style={{ color: 'var(--walnut)' }}>American</Link>
          <Link href="/learn/how-to-play-mahjong" className="no-underline transition-colors hover:text-[var(--terra)]" style={{ color: 'var(--walnut)' }}>Learn</Link>
          <Link href="/about" className="no-underline transition-colors hover:text-[var(--terra)]" style={{ color: 'var(--walnut)' }}>About</Link>
        </div>
      </div>
    </nav>
  );
}
