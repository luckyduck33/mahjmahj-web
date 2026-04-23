import Link from 'next/link';

const navLinks = [
  { href: '/events', label: 'Events' },
  { href: '/learn/how-to-play-mahjong', label: 'Learn' },
  { href: '/styles/hong-kong-mahjong', label: 'Styles' },
  { href: '/compare/mahjong-styles', label: 'Compare' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-teal-dark/90 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-heading text-xl font-bold text-cream tracking-wide">
            mahj<br className="hidden" />mahj
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-cream/90 hover:text-cream text-sm font-medium tracking-wide uppercase transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/events"
            className="px-4 py-2 bg-terracotta text-cream text-sm font-semibold rounded-md hover:bg-terracotta-light transition-colors uppercase tracking-wide"
          >
            Browse Events
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-cream p-2"
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
    </header>
  );
}
