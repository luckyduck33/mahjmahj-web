import Link from 'next/link';

// Small, native-feeling cross-link to /guides/mahjong-night. Reuses the
// site's existing "signup-inline" boxed-callout treatment (paper bg, terra
// left border) so it reads as part of the page rather than an injected ad.
// Placed near the top/middle of hosting-relevant learn pages — kept well
// clear of the page's own EmailSignup section near the bottom.
export default function KitCallout() {
  return (
    <div className="signup-inline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.25rem', flexWrap: 'wrap' }}>
      <p style={{ color: 'var(--walnut)', margin: 0 }} className="leading-relaxed">
        <strong style={{ color: 'var(--espresso)' }}>Hosting a mahjong night?</strong> The Mahjong Night Kit is a printable teaching script, timeline, and cheat sheets for a beginner table&rsquo;s first game.
      </p>
      <Link
        href="/guides/mahjong-night"
        style={{ color: 'var(--terra)', fontSize: '0.9rem', fontWeight: 600, whiteSpace: 'nowrap' }}
        className="hover:underline"
      >
        See the Kit &#8594;
      </Link>
    </div>
  );
}
