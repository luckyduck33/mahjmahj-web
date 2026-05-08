#!/usr/bin/env node
// Weekly MAHJ MAHJ web site audit. Scans src/data/cities.ts for content-quality
// issues and pulls live event totals from api.mahjmahj.co.
//
// Usage: node scripts/full-site-audit.js [--dry-run] [--json-only]

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const CITIES_PATH = path.join(ROOT, 'src/data/cities.ts');
const LOGS_DIR = path.join(ROOT, 'logs');

const PROJECT = 'MAHJ MAHJ';
const SITE = 'mahjmahj.co';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const jsonOnly = args.includes('--json-only');

function tsPT() {
  const d = new Date();
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: false,
  });
  const parts = Object.fromEntries(fmt.formatToParts(d).filter(p => p.type !== 'literal').map(p => [p.type, p.value]));
  return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute} PT`;
}

const findings = {
  cities_no_intro: [],
  cities_no_faqs: [],
  cities_no_events: [],         // populated after live API fetch
  short_intros: [],             // {slug, length}
};

const src = fs.readFileSync(CITIES_PATH, 'utf8');
const blocks = src.split(/\n\s*\{\s*\n\s*slug:\s*'/).slice(1);
const cities = [];

for (const b of blocks) {
  const slug = (b.match(/^([^']+)/) || [])[1];
  if (!slug) continue;
  cities.push(slug);
  const introMatch = b.match(/intro:\s*\n?\s*'([\s\S]*?)(?<!\\)'/);
  if (!introMatch) findings.cities_no_intro.push({ slug });
  else if (introMatch[1].length < 200) findings.short_intros.push({ slug, length: introMatch[1].length });

  const faqsMatch = b.match(/faqs:\s*\[([\s\S]*?)\]\s*,?\s*\n\s*\}/);
  if (!faqsMatch || !/question:/.test(faqsMatch[1])) findings.cities_no_faqs.push({ slug });
}

(async () => {
  // Live event check — count events per city via the API
  const cityEventCounts = new Map();
  try {
    const res = await fetch('https://api.mahjmahj.co/api/events', { signal: AbortSignal.timeout(15000) });
    if (res.ok) {
      const data = await res.json();
      for (const e of data.events || []) {
        const slug = (e.city || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        cityEventCounts.set(slug, (cityEventCounts.get(slug) || 0) + 1);
      }
      for (const slug of cities) {
        if (!cityEventCounts.has(slug)) findings.cities_no_events.push({ slug });
      }
    }
  } catch (err) {
    findings._warnings = [`api.mahjmahj.co fetch failed: ${err.message}`];
  }

  for (const k of Object.keys(findings)) {
    if (Array.isArray(findings[k])) findings[k] = findings[k].slice(0, 200);
  }

  const summary = {
    project: PROJECT,
    site: SITE,
    generated: tsPT(),
    totals: {
      cities: cities.length,
      total_events: [...cityEventCounts.values()].reduce((a, b) => a + b, 0),
      cities_no_intro: findings.cities_no_intro.length,
      cities_no_faqs: findings.cities_no_faqs.length,
      cities_no_events: findings.cities_no_events.length,
      short_intros: findings.short_intros.length,
    },
    findings,
  };

  if (jsonOnly) {
    console.log(JSON.stringify(summary, null, 2));
    process.exit(0);
  }

  console.log(`\n=== ${PROJECT} site audit — ${summary.generated} ===`);
  console.log(`Inventory: ${summary.totals.cities} cities, ${summary.totals.total_events} live events`);
  console.log('');
  console.log(`Findings:`);
  for (const [k, v] of Object.entries(summary.totals).filter(([k]) => !['cities','total_events'].includes(k))) {
    console.log(`  ${k.padEnd(28)} ${v}`);
  }

  if (!dryRun) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
    const datestr = new Date().toISOString().slice(0, 10);
    const outPath = path.join(LOGS_DIR, `audit-${datestr}.json`);
    fs.writeFileSync(outPath, JSON.stringify(summary, null, 2) + '\n');
    console.log(`\nJSON report: ${outPath}`);

    try {
      const { writeAuditReport } = require('./lib/audit-report-writeback');
      const ok = await writeAuditReport(summary);
      if (ok) console.log('Notion: report posted to Site Audit Reports');
    } catch {}
  }
})();
