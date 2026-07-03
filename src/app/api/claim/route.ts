import { NextRequest, NextResponse } from 'next/server';
import {
  validateClaimInput,
  normalizeClaimInput,
  generateClaimToken,
  type ClaimRequest,
} from '@/lib/claim';
import { persistClaimRequest } from '@/lib/claim-store';

// Claim-flow v1 API — receives an organizer's "claim this listing" request.
//
// What it does (spec: email/DM handshake, no auth):
//  1. Validates + normalizes the form body.
//  2. Mints an opaque token (raw returned once; only its hash is persisted).
//  3. Persists a `pending` claim request to the ops queue store.
//  4. Returns { ok, token } so the UI can show a confirmation.
//
// What it does NOT do (by design, v1):
//  - No account creation, no password, no session — this is a handshake.
//  - Does NOT flip any listing to "managed": a human confirms the contact
//    channel out-of-band, then adds the organizer to src/data/organizers.ts
//    (or the Organizers Notion DB in a later phase). This endpoint only
//    enqueues the request.

export const runtime = 'nodejs'; // needs crypto + fs for the v1 store

// ── Minimal in-memory rate limit (best-effort; per warm lambda instance) ────
// Not a security boundary — just a cheap guard against form spam. A durable
// limiter belongs in the API repo / a KV store when this graduates past v1.
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
  if (len > 16_000) {
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

  // Honeypot: bots fill hidden fields. Real users leave it empty. Silently OK.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return NextResponse.json({ ok: true, token: 'ignored' }, { status: 200 });
  }

  const input = normalizeClaimInput(body);
  const { ok, errors } = validateClaimInput(input);
  if (!ok) {
    return NextResponse.json({ ok: false, error: errors.join(' ') }, { status: 400 });
  }

  const { token, tokenHash } = generateClaimToken();
  const request: ClaimRequest = {
    ...(input as Required<typeof input>),
    token,
    tokenHash,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  try {
    // The store persists everything EXCEPT the raw token (only tokenHash).
    await persistClaimRequest(request);
  } catch (e) {
    console.error('[claim] failed to persist claim request', e);
    return NextResponse.json(
      { ok: false, error: 'Could not save your request. Please try again shortly.' },
      { status: 500 },
    );
  }

  // Return the raw token once so the confirmation screen / follow-up can
  // reference this specific request. It is not a credential — it just names
  // the pending request in the ops queue.
  return NextResponse.json({ ok: true, token }, { status: 201 });
}
