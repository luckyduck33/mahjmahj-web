'use client';

import { useState } from 'react';
import { SUBSCRIBE_COPY } from '@/lib/subscribe';

type Variant = 'homepage' | 'footer';
type Status = 'idle' | 'submitting' | 'done' | 'error';

interface Props {
  variant?: Variant;
}

// Newsletter capture form. Two presentations share one submit path:
//  - 'homepage': a full band (eyebrow + heading + email + optional city).
//  - 'footer':   a compact inline row that ships on every page via <Footer>.
// Posts to /api/subscribe, which fans out to the active sink (subscribe-store).
export default function EmailSignup({ variant = 'homepage' }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const isFooter = variant === 'footer';

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setError(null);

    const fd = new FormData(e.currentTarget);
    const payload = {
      ...Object.fromEntries(fd.entries()),
      source: variant === 'footer' ? 'footer' : 'homepage',
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
      setStatus('done');
    } catch {
      setError('Network error. Please try again.');
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div className={`signup-success${isFooter ? ' signup-success--footer' : ''}`} role="status">
        <p className="signup-success-head">{SUBSCRIBE_COPY.successHeading}</p>
        <p className="signup-success-body">{SUBSCRIBE_COPY.successBody}</p>
      </div>
    );
  }

  return (
    <form
      className={`signup-form${isFooter ? ' signup-form--footer' : ''}`}
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

        {!isFooter && (
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
}
