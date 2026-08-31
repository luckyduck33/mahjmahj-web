'use client';

import { useState } from 'react';
import {
  SUBSCRIBE_COPY,
  LEARN_SIGNUP_COPY,
  KIT_PREVIEW_SIGNUP_COPY,
  KIT_WAITLIST_SIGNUP_COPY,
  EVENTS_HUB_SIGNUP_COPY,
  citySignupCopy,
} from '@/lib/subscribe';
import { getAttributionSubscribeFields } from '@/lib/attribution';
import { trackSignUp } from '@/lib/gtag';

type Variant = 'homepage' | 'footer' | 'city' | 'learn' | 'kit-preview' | 'kit-waitlist' | 'events';
type Status = 'idle' | 'submitting' | 'done' | 'error';

interface Props {
  variant?: Variant;
  /** Display name for variant="city" (e.g. "Los Angeles") — interpolated into
   *  the heading/body copy. Ignored by other variants. */
  cityName?: string;
  /** Funnel-tracking tag sent to /api/subscribe (see src/lib/subscribe.ts for
   *  the accepted shapes: flat values like "compare", or "<surface>:<slug>"
   *  like "city:los-angeles" / "styles:taiwanese-mahjong" / "learn:<slug>").
   *  Defaults to the variant name, or "city:<slugified cityName>" for the city
   *  variant, so passing it is optional but recommended wherever a page type
   *  has more than one instance (styles/*, learn/*). */
  source?: string;
  /** When set, a successful subscribe reveals a download link to this URL
   *  instead of the generic "You're on the list" success copy — used by the
   *  /guides/mahjong-night free-preview capture (variant="kit-preview") to
   *  hand over the preview PDF immediately after signup. Ignored while
   *  status !== 'done'. */
  downloadUrl?: string;
  /** Label for the download link/button. Defaults to "Download the PDF". */
  downloadLabel?: string;
}

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Newsletter capture form. Seven presentations share one submit path:
//  - 'homepage':     a full band (eyebrow + heading + email + optional city).
//  - 'footer':       a compact inline row that ships on every page via <Footer>.
//  - 'city':         contextual capture on /events/[city] — city-specific copy.
//  - 'learn':        contextual capture on /compare, /styles/*, /learn/* —
//                    shared "learning-track" copy across those page types.
//  - 'kit-preview':  free-preview capture on /guides/mahjong-night. Pass
//                    `downloadUrl` alongside this variant — on success it
//                    reveals a download link instead of the generic
//                    "you're on the list" message.
//  - 'kit-waitlist': "launching soon" capture on /guides/mahjong-night,
//                    shown in place of the buy button while
//                    NEXT_PUBLIC_KIT_PAYMENT_LINK is unset.
//  - 'events':       contextual capture on the /events hub — unlike 'city',
//                    this spans every tracked city, so the copy stays
//                    scope-honest instead of naming one city.
// All five "card" variants ('city', 'learn', 'kit-preview', 'kit-waitlist',
// 'events') render their own eyebrow/heading/body (there's no page-level
// SUBSCRIBE_COPY usage for them) so the copy lives in one place instead of
// being duplicated
// across every page that uses it; the page still supplies the surrounding
// <section> chrome (background, border, spacing) to match its own local design.
// Posts to /api/subscribe, which fans out to the active sink (subscribe-store).
export default function EmailSignup({
  variant = 'homepage',
  cityName,
  source,
  downloadUrl,
  downloadLabel,
}: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const isFooter = variant === 'footer';
  const isCard =
    variant === 'city' ||
    variant === 'learn' ||
    variant === 'kit-preview' ||
    variant === 'kit-waitlist' ||
    variant === 'events';
  const showCityField = variant === 'homepage';

  const resolvedSource =
    source ?? (variant === 'city' && cityName ? `city:${slugify(cityName)}` : variant);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setError(null);

    const fd = new FormData(e.currentTarget);
    // First-touch UTM attribution (lib/attribution.ts), if any, so it can
    // flow through to the Notion backup record (subscribe-store.ts). Same
    // fields GA4's sign_up event below carries.
    const payload = {
      ...Object.fromEntries(fd.entries()),
      source: resolvedSource,
      ...getAttributionSubscribeFields(),
    };

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }
      // GA4 top-of-funnel event (Mission 002 M3), tagged with the same
      // `source` recorded server-side. Fire-and-forget: never blocks the
      // success UI below.
      trackSignUp(resolvedSource);
      setStatus('done');
    } catch {
      setError('Network error. Please try again.');
      setStatus('error');
    }
  }

  const content =
    status === 'done' ? (
      <div
        className={`signup-success${isFooter ? ' signup-success--footer' : ''}${isCard ? ' signup-success--card' : ''}`}
        role="status"
      >
        {downloadUrl ? (
          <>
            <p className="signup-success-head">Your preview is ready — download the PDF</p>
            <p className="signup-success-body">{SUBSCRIBE_COPY.successBody}</p>
            <a href={downloadUrl} download className="btn-solid signup-download-link">
              {downloadLabel ?? 'Download the PDF'}
            </a>
          </>
        ) : (
          <>
            <p className="signup-success-head">{SUBSCRIBE_COPY.successHeading}</p>
            <p className="signup-success-body">{SUBSCRIBE_COPY.successBody}</p>
          </>
        )}
      </div>
    ) : (
      <form
        className={`signup-form${isFooter ? ' signup-form--footer' : ''}${isCard ? ' signup-form--card' : ''}`}
        onSubmit={onSubmit}
        noValidate
      >
        {/* Honeypot — hidden from users, catches bots. */}
        <div className="signup-hp" aria-hidden="true">
          <label>
            Company
            <input type="text" name="company" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="signup-fields">
          <label className="signup-sr" htmlFor={`signup-email-${variant}`}>
            Email address
          </label>
          <input
            id={`signup-email-${variant}`}
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            placeholder={SUBSCRIBE_COPY.emailPlaceholder}
            className="signup-input"
          />

          {showCityField && (
            <>
              <label className="signup-sr" htmlFor="signup-city">
                City (optional)
              </label>
              <input
                id="signup-city"
                name="city"
                type="text"
                autoComplete="address-level2"
                placeholder={SUBSCRIBE_COPY.cityPlaceholder}
                className="signup-input"
              />
            </>
          )}

          <button
            type="submit"
            className={isFooter ? 'signup-submit-footer' : 'btn-solid'}
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? SUBSCRIBE_COPY.submitBusy : SUBSCRIBE_COPY.submitIdle}
          </button>
        </div>

        {error && (
          <p className="signup-error" role="alert">
            {error}
          </p>
        )}
      </form>
    );

  if (!isCard) return content;

  const copy =
    variant === 'city' && cityName
      ? citySignupCopy(cityName)
      : variant === 'kit-preview'
        ? KIT_PREVIEW_SIGNUP_COPY
        : variant === 'kit-waitlist'
          ? KIT_WAITLIST_SIGNUP_COPY
          : variant === 'events'
            ? EVENTS_HUB_SIGNUP_COPY
            : LEARN_SIGNUP_COPY;

  return (
    <div className="signup-card">
      <span className="signup-card-eyebrow">{copy.eyebrow}</span>
      <h2 className="signup-card-heading">{copy.heading}</h2>
      <p className="signup-card-body">{copy.body}</p>
      {content}
    </div>
  );
}
