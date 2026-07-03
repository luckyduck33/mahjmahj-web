'use client';

import { useState } from 'react';
import { CLAIM_COPY, CLAIM_ROLES, CLAIM_CHANNELS } from '@/lib/claim';

interface Props {
  // Prefill when the form is opened from a specific listing.
  listingId?: string;
  organizerName?: string;
  city?: string;
}

type Status = 'idle' | 'submitting' | 'done' | 'error';

export function ClaimForm({ listingId, organizerName = '', city = '' }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setError(null);

    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, listingId }),
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
      <div className="claim-success" role="status">
        <h2>{CLAIM_COPY.successHeading}</h2>
        <p>{CLAIM_COPY.successBody}</p>
      </div>
    );
  }

  return (
    <form className="claim-form" onSubmit={onSubmit} noValidate>
      {/* Honeypot — hidden from users, catches bots. */}
      <div className="claim-hp" aria-hidden="true">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="claim-field">
        <label htmlFor="organizerName">Organizer, group, or venue name *</label>
        <input
          id="organizerName"
          name="organizerName"
          type="text"
          required
          defaultValue={organizerName}
          placeholder="e.g. Boston Mahjong Club"
        />
      </div>

      <div className="claim-field">
        <label htmlFor="city">City</label>
        <input id="city" name="city" type="text" defaultValue={city} placeholder="e.g. Boston" />
      </div>

      <div className="claim-field">
        <label htmlFor="contactName">Your name *</label>
        <input id="contactName" name="contactName" type="text" required placeholder="Who we'll reach out to" />
      </div>

      <div className="claim-row">
        <div className="claim-field">
          <label htmlFor="role">Your role *</label>
          <select id="role" name="role" required defaultValue="">
            <option value="" disabled>
              Select…
            </option>
            {CLAIM_ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="claim-field">
          <label htmlFor="channel">Best way to confirm you *</label>
          <select id="channel" name="channel" required defaultValue="">
            <option value="" disabled>
              Select…
            </option>
            {CLAIM_CHANNELS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="claim-field">
        <label htmlFor="contactValue">Email, Instagram handle, or link *</label>
        <input
          id="contactValue"
          name="contactValue"
          type="text"
          required
          placeholder="you@example.com or @yourhandle"
        />
        <p className="claim-hint">
          Use the same contact you already publish on your site, Instagram, or ticketing page — that
          is how we confirm the claim.
        </p>
      </div>

      <div className="claim-field">
        <label htmlFor="listingsNote">Which listings are yours? (optional)</label>
        <textarea
          id="listingsNote"
          name="listingsNote"
          rows={3}
          placeholder="Paste links or describe the events / games you run."
        />
      </div>

      {error && (
        <p className="claim-error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="btn-solid" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Send claim request'}
      </button>

      <p className="claim-disclaimer">
        Claiming lets you manage your listing&apos;s details. It is not a MAHJ MAHJ endorsement or a
        guarantee of accuracy. No account or password required.
      </p>
    </form>
  );
}
