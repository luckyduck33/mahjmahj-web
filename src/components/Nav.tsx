'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
    >
      <Link href="/" className="nav-logo" aria-label="Mahj Mahj">
        <Image src="/logo.png" alt="mahj mahj" width={80} height={65} className="nav-logo-img" priority />
      </Link>
      <ul className={`nav-links ${menuOpen ? 'nav-links--open' : ''}`}>
        <li><Link href="/events" onClick={() => setMenuOpen(false)}>Events</Link></li>
        <li><Link href="/learn/how-to-play-mahjong" onClick={() => setMenuOpen(false)}>Learn</Link></li>
        <li><Link href="/styles/hong-kong-mahjong" onClick={() => setMenuOpen(false)}>Hong Kong</Link></li>
        <li><Link href="/styles/taiwanese-mahjong" onClick={() => setMenuOpen(false)}>Taiwanese</Link></li>
        <li><Link href="/styles/american-mahjong" onClick={() => setMenuOpen(false)}>American</Link></li>
        <li><Link href="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
      </ul>
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span /><span /><span />
      </div>
    </nav>
  );
}
