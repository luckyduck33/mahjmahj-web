#!/usr/bin/env node
// Preflight checker — runs as a git pre-push hook.
// Hard rules for MAHJ MAHJ:
//   - Always "Hong Kong Mahjong" — never "Chinese Mahjong" (brand rule).
//   - Content must NOT reference GLP-1 / nail salon / numerology / /go/.
//
// Exits 0 on success. Exits 1 with a clear message on any violation.

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const BRAND = 'MAHJ MAHJ';
const SITE = 'mahjmahj.co';

const FORBIDDEN_TERMS = [
  // RangeYourself territory
  { term: 'glp-1', kind: 'phrase' },
  { term: 'glp1', kind: 'phrase' },
  { term: 'semaglutide', kind: 'word' },
  { term: 'tirzepatide', kind: 'word' },
  { term: 'rangeyourself', kind: 'phrase' },
  // SafePedicures territory
  { term: 'nail salon', kind: 'phrase' },
  { term: 'pedicure', kind: 'word' },
  { term: 'safepedicures', kind: 'phrase' },
  // Lucid Numbers territory
  { term: 'numerology', kind: 'word' },
  { term: 'life path number', kind: 'phrase' },
  { term: 'lucid numbers', kind: 'phrase' },
  // RY affiliate slug — never on MAHJ
  { term: '/go/', kind: 'phrase' },
  // MAHJ brand rule — must never call it Chinese Mahjong
  { term: 'chinese mahjong', kind: 'phrase' },
];

const errors = [];

function checkText(filePath, text, context) {
  for (const { term, kind } of FORBIDDEN_TERMS) {
    let re;
    if (kind === 'word') re = new RegExp(`\\b${term.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
    else re = new RegExp(term.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i');
    if (re.test(text)) {
      const msg = term === 'chinese mahjong'
        ? `forbidden phrase "Chinese Mahjong" — MAHJ brand rule: always "Hong Kong Mahjong"`
        : term === '/go/'
        ? `forbidden affiliate slug pattern "/go/" — that's RangeYourself-only`
        : `forbidden term "${term}" — that's another brand's territory`;
      errors.push(`${filePath} (${context}): ${msg}`);
    }
  }
}

// Scan only the rendered string fields in cities.ts — intro and faqs.
// Reading the source as text + extracting strings via a TS-tolerant regex
// avoids running ts-node on a pre-push hook (slow + extra deps).
function scanCitiesManifest(rel) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) return;
  const src = fs.readFileSync(abs, 'utf8');

  // Extract slug for context, then intro + each faq's question/answer per entry.
  // The manifest entries look like: { slug: '...', name: '...', ..., intro: '...', faqs: [...] }.
  // We split by `slug:` keys to get one block per city, then pull strings from each.
  const cityBlocks = src.split(/\n\s*\{\s*\n\s*slug:\s*'/).slice(1); // first chunk is preamble
  for (const block of cityBlocks) {
    const slugMatch = block.match(/^([^']+)/);
    const slug = slugMatch ? slugMatch[1] : '?';
    // Intro
    const introMatch = block.match(/intro:\s*\n?\s*'([\s\S]*?)(?<!\\)',?\n/);
    if (introMatch) checkText(rel, introMatch[1], `${slug}/intro`);
    // FAQs
    const faqsMatch = block.match(/faqs:\s*\[([\s\S]*?)\]\s*,?\s*\n\s*\}/);
    if (faqsMatch) {
      const faqsBlock = faqsMatch[1];
      for (const m of faqsBlock.matchAll(/question:\s*'([\s\S]*?)(?<!\\)',/g)) {
        checkText(rel, m[1], `${slug}/faq.question`);
      }
      for (const m of faqsBlock.matchAll(/answer:\s*\n?\s*'([\s\S]*?)(?<!\\)',?\n/g)) {
        checkText(rel, m[1], `${slug}/faq.answer`);
      }
    }
  }
}

console.log(`[preflight] ${BRAND} (${SITE})`);
scanCitiesManifest('src/data/cities.ts');

if (errors.length) {
  console.error(`\n[preflight] ✗ ${errors.length} error(s) — push BLOCKED:`);
  for (const e of errors) console.error(`  - ${e}`);
  console.error(`\nFix violations above, then re-run. Hard rules:`);
  console.error(`  - This repo is MAHJ MAHJ. No GLP-1, nail-salon, numerology, or /go/ affiliate references.`);
  console.error(`  - Always "Hong Kong Mahjong" — never "Chinese Mahjong".`);
  console.error(`  - To intentionally bypass: git push --no-verify (not recommended).`);
  process.exit(1);
}

console.log(`[preflight] ✓ no violations`);
