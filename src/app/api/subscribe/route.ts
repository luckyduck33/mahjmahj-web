import { NextRequest, NextResponse } from 'next/server';
import {
  normalizeSubscribeInput,
  validateSubscribeInput,
  type SubscribeRecord,
} from '@/lib/subscribe';
import { persistSubscriber } from '@/lib/subscribe-store';

// Newsletter-signup API. Receives an email (+ optional city) from the marketing
// site and persists it to the active sink (MailerLite → Notion → local dev
// file; see subscribe-store.ts). Deliberately mirrors /api/claim's hardening.

export const runtime = 'nodejs'; // needs fs for the local dev fallback sink

// ── Minimal in-memory rate limit (best-effort; per warm lambda instance) ────
// Not a security boundary — a cheap guard against form spam. A durable limiter
// belongs in a KV store if this ever sees real abuse.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const arr = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(key, arr);
  return arr.length > MAX_PER_WINDOW;
}

export async function POST(req: NextRequest) {
  // Cap body size before parsing (defense against oversized payloads).
  const len = Number(req.headers.get('content-length') ?? 0);
  if (len > 8_000) {
    return NextResponse.json({ ok: false, error: 'Request too large.' }, { status: 413 });
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Too many requests — please try again in a minute.' },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Real users leave it empty. Silently OK
  // so the bot gets no signal that it was caught.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const input = normalizeSubscribeInput(body);
  const { ok, errors } = validateSubscribeInput(input);
  if (!ok) {
    return NextResponse.json({ ok: false, error: errors.join(' ') }, { status: 400 });
  }

  const record: SubscribeRecord = {
    ...input,
    createdAt: new Date().toISOString(),
  };

  try {
    await persistSubscriber(record);
  } catch (e) {
    console.error('[subscribe] failed to persist subscriber', e);
    return NextResponse.json(
      { ok: false, error: 'Could not sign you up right now. Please try again shortly.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
