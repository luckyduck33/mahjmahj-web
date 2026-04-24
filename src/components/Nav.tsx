'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(!isHome);
  const [menuOpen, setMenuOpen] = useState(false);
  const [stylesOpen, setStylesOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setStylesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <Link href="/" className="nav-logo" aria-label="Mahj Mahj">
        <Image src="/logo.png" alt="mahj mahj" width={80} height={65} className="nav-logo-img" priority />
      </Link>

      <ul className={`nav-links${menuOpen ? ' nav-links--open' : ''}`}>
        <li><Link href="/events" onClick={() => setMenuOpen(false)}>Events</Link></li>
        <li><Link href="/learn/how-to-play-mahjong" onClick={() => setMenuOpen(false)}>Learn</Link></li>
        <li><Link href="/#drills" onClick={() => setMenuOpen(false)}>Drills</Link></li>
        <li><Link href="/#news" onClick={() => setMenuOpen(false)}>News</Link></li>
        <li className="nav-dropdown" ref={dropdownRef}>
          <button
            className="nav-dropdown-trigger"
            onClick={() => setStylesOpen(!stylesOpen)}
            aria-expanded={stylesOpen}
          >
            Styles
          </button>
          {stylesOpen && (
            <div className="nav-dropdown-menu">
              <Link href="/styles/hong-kong-mahjong" onClick={() => { setStylesOpen(false); setMenuOpen(false); }}>Hong Kong Mahjong</Link>
              <Link href="/styles/taiwanese-mahjong" onClick={() => { setStylesOpen(false); setMenuOpen(false); }}>Taiwanese Mahjong</Link>
              <Link href="/styles/american-mahjong" onClick={() => { setStylesOpen(false); setMenuOpen(false); }}>American Mahjong</Link>
              <Link href="/compare/mahjong-styles" onClick={() => { setStylesOpen(false); setMenuOpen(false); }}>Compare All Styles</Link>
            </div>
          )}
        </li>
        <li><Link href="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
        <li><Link href="/events" className="nav-cta" onClick={() => setMenuOpen(false)}>Submit an Event</Link></li>
      </ul>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span /><span /><span />
      </div>
    </nav>
  );
}
