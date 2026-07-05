#!/usr/bin/env node
// Submit every URL from the production sitemap to IndexNow.
//
// IndexNow notifies Bing and Yandex (and Perplexity, which shares Bing's
// index) that URLs have been added or updated, prompting an immediate
// recrawl instead of waiting for the normal discovery cycle.
//
// Triggered by .github/workflows/indexnow.yml on every push to main, after
// a delay long enough for the Vercel production deploy to go live.
//
// Run manually:  node scripts/submit-indexnow.mjs
// Override host: INDEXNOW_HOST=staging.mahjmahj.co node scripts/submit-indexnow.mjs

const HOST = process.env.INDEXNOW_HOST || 'mahjmahj.co';
const KEY = 'becb76ec22816f0c603319d99a1c3ab3';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const ENDPOINT = 'https://api.indexnow.org/IndexNow';
const BATCH_SIZE = 500;

async function readSitemapUrls() {
  const res = await fetch(SITEMAP_URL, { redirect: 'follow' });
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status} ${res.statusText}`);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  return [...new Set(urls)];
}

async function waitForKeyFile() {
  // IndexNow rejects submissions with 403 SiteVerificationNotCompleted when
  // it can't fetch the key file. On a fresh deploy the file may not be live
  // yet even after the workflow's sleep, so poll until it's reachable.
  const maxAttempts = 20;
  for (let i = 1; i <= maxAttempts; i++) {
    try {
      const res = await fetch(KEY_LOCATION, { redirect: 'follow' });
      if (res.ok) {
        const body = (await res.text()).trim();
        if (body === KEY) {
          console.log(`[indexnow] key file verified at ${KEY_LOCATION} (attempt ${i})`);
          return;
        }
        console.log(`[indexnow] key file body mismatch on attempt ${i}: got "${body.slice(0, 40)}"`);
      } else {
        console.log(`[indexnow] key file attempt ${i}: status ${res.status}`);
      }
    } catch (err) {
      console.log(`[indexnow] key file attempt ${i}: ${err.message}`);
    }
    await new Promise((r) => setTimeout(r, 15000));
  }
  throw new Error(`key file not reachable at ${KEY_LOCATION} after ${maxAttempts} attempts`);
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function submitBatch(urls) {
  const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls };
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  return { status: res.status, text };
}

async function main() {
  console.log(`[indexnow] host=${HOST} keyLocation=${KEY_LOCATION}`);
  await waitForKeyFile();
  const urls = await readSitemapUrls();
  if (urls.length === 0) {
    console.error('[indexnow] sitemap returned zero URLs — aborting');
    process.exit(1);
  }
  console.log(`[indexnow] sitemap returned ${urls.length} URLs`);
  const batches = chunk(urls, BATCH_SIZE);
  let failures = 0;
  for (let i = 0; i < batches.length; i++) {
    const { status, text } = await submitBatch(batches[i]);
    const ok = status >= 200 && status < 300;
    console.log(`[indexnow] batch ${i + 1}/${batches.length} (${batches[i].length} urls) → ${status} ${text || '(empty body)'}`);
    if (!ok) failures++;
  }
  if (failures > 0) {
    console.error(`[indexnow] ${failures} batch(es) failed`);
    process.exit(1);
  }
  console.log('[indexnow] done');
}

main().catch((e) => {
  console.error('[indexnow] fatal', e);
  process.exit(1);
});
