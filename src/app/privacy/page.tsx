import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — MAHJ MAHJ',
  description:
    'How MAHJ MAHJ handles your data across the website and the Mahj Mahj iOS app — location, notifications, camera, and more.',
  alternates: { canonical: 'https://mahjmahj.co/privacy' },
};

const wrap = { maxWidth: '760px', margin: '0 auto' } as const;
const h2 = {
  fontFamily: 'var(--font-heading)',
  fontSize: '1.5rem',
  color: 'var(--espresso)',
  margin: '2.5rem 0 0.75rem',
} as const;
const p = {
  fontSize: '1.0625rem',
  lineHeight: 1.75,
  color: 'var(--walnut)',
  margin: '0 0 1rem',
} as const;
const li = { ...p, margin: '0 0 0.5rem' } as const;

export default function PrivacyPage() {
  return (
    <>
      <section style={{ backgroundColor: 'var(--sand)', padding: '3.5rem 1.5rem' }}>
        <div style={{ ...wrap, textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3.25rem)', color: 'var(--espresso)', margin: 0 }}>
            Privacy Policy
          </h1>
          <p style={{ ...p, margin: '1rem 0 0', color: 'var(--espresso)' }}>Last updated: June 2026</p>
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--linen)', padding: '3rem 1.5rem 4.5rem' }}>
        <div style={wrap}>
          <p style={p}>
            This policy explains how MAHJ MAHJ (operated by Lucky Media Corp, &ldquo;we,&rdquo; &ldquo;us&rdquo;) handles
            information across the MAHJ MAHJ website (mahjmahj.co) and the Mahj Mahj iOS app. We built MAHJ MAHJ to help
            people find mahjong tables, learn the game, and score their hands — and we collect as little personal data
            as possible to do that.
          </p>
          <p style={p}>
            <strong>You do not need an account to use MAHJ MAHJ.</strong> We do not sell your personal information, and
            we do not use it for third-party advertising or cross-app tracking.
          </p>

          <h2 style={h2}>Location</h2>
          <p style={p}>
            If you grant location access, the app uses your location to sort nearby mahjong events by distance and to
            determine your city. <strong>Your precise coordinates stay on your device</strong> — we do not send or store
            your GPS location on our servers. The only thing derived from your location that leaves your device is the
            name of your city, and only if you choose to receive event alerts (see below). Location access is optional;
            the app works without it.
          </p>

          <h2 style={h2}>Notifications</h2>
          <p style={p}>
            If you opt in to push notifications, we store your device&rsquo;s notification token and your chosen city so
            we can send you alerts about new mahjong events in that city. Reminders for events you save are scheduled
            locally on your device and are not sent to us. You can turn notifications off at any time in iOS Settings.
          </p>

          <h2 style={h2}>Camera (Score My Hand)</h2>
          <p style={p}>
            The optional &ldquo;Score My Hand&rdquo; feature lets you photograph a mahjong hand to identify the tiles.
            When you use it, the image is sent to our service to recognize the tiles (this processing is performed using
            Anthropic&rsquo;s AI). <strong>We do not retain your photos</strong> after the tiles are identified, and the
            scoring itself runs on your device. The camera is only accessed when you choose to scan a hand.
          </p>

          <h2 style={h2}>Information we store</h2>
          <ul style={{ paddingLeft: '1.25rem' }}>
            <li style={li}>A push notification token and your chosen city, if you opt in to event alerts.</li>
            <li style={li}>Your preferences and saved events, which are stored locally on your device.</li>
            <li style={li}>Standard, non-identifying server logs (for example, requests to our event and news API).</li>
          </ul>
          <p style={p}>
            On the website, we use Google Analytics to understand aggregate traffic. The iOS app does not include
            third-party analytics or advertising SDKs.
          </p>

          <h2 style={h2}>Service providers</h2>
          <p style={p}>
            We rely on a small number of providers to operate the service: Apple (push delivery), Anthropic (tile
            recognition for Score My Hand), and our hosting and database providers (Vercel and Supabase). These
            providers process data only to provide their service to us.
          </p>

          <h2 style={h2}>Event data</h2>
          <p style={p}>
            Event and news listings shown in MAHJ MAHJ are aggregated from public sources. They are not personal data
            about you.
          </p>

          <h2 style={h2}>Children</h2>
          <p style={p}>MAHJ MAHJ is not directed to children under 13, and we do not knowingly collect data from them.</p>

          <h2 style={h2}>Your choices</h2>
          <p style={p}>
            You can revoke location, notification, and camera permissions at any time in iOS Settings. To request
            deletion of a stored notification token, contact us at the address below.
          </p>

          <h2 style={h2}>Contact</h2>
          <p style={p}>
            Questions about this policy? Email <a href="mailto:privacy@mahjmahj.co" style={{ color: 'var(--espresso)' }}>privacy@mahjmahj.co</a>.
          </p>
        </div>
      </section>
    </>
  );
}
