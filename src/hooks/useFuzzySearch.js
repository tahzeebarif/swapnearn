/**
 * useFuzzySearch.js
 *
 * Provides fuzzy + spell-tolerant product search using Fuse.js.
 * - Corrects common misspellings via a synonym map before running Fuse.
 * - Returns ranked results with Fuse's relevance scoring.
 * - Fuse instance is memoized so it is only built once per products array change.
 */

import { useMemo } from 'react';
import Fuse from 'fuse.js';

// ---------------------------------------------------------------------------
// Synonym / spelling-correction map
// Keys are common misspellings; values are the corrected canonical term.
// The corrected term is substituted into the query before Fuse runs, giving
// accurate results even when the user types poorly.
// ---------------------------------------------------------------------------
const SYNONYMS = {
  // Joint / muscle
  jaint: 'joint',
  jont: 'joint',
  joitn: 'joint',
  joine: 'joint',
  jointt: 'joint',
  joit: 'joint',
  jiont: 'joint',
  jount: 'joint',
  jint: 'joint',
  jiant: 'joint',
  'joint on': 'joint',
  jointon: 'joint',
  'joint oil': 'joint oil',
  'jont oil': 'joint oil',
  'jaint oil': 'joint oil',
  muscel: 'muscle',
  muscal: 'muscle',
  mussel: 'muscle',

  // Hair
  haer: 'hair',
  hiar: 'hair',
  'hair seram': 'hair serum',
  'hair serom': 'hair serum',
  'hair serum': 'hair serum',
  seram: 'serum',
  serom: 'serum',
  serum: 'serum',
  shampoo: 'shampoo',
  shampo: 'shampoo',
  shampoe: 'shampoo',
  'biotin keratin': 'biotin keratin',
  bioten: 'biotin',
  keretin: 'keratin',
  kerratin: 'keratin',

  // Wellness / supplements
  wellnes: 'wellness',
  welness: 'wellness',
  suplament: 'supplement',
  suplemet: 'supplement',
  suppliment: 'supplement',
  vitamins: 'vitamin',
  vitamine: 'vitamin',
  multivitamin: 'multivitamin',
  multivitamins: 'multivitamin',
  cologen: 'collagen',
  collagene: 'collagen',
  colagen: 'collagen',
  imunity: 'immunity',
  imnunity: 'immunity',
  emunity: 'immunity',

  // Skin
  skinn: 'skin',
  skincare: 'skin care',
  moisturizer: 'moisturizer',

  // Sleep / stress
  releif: 'relief',
  relef: 'relief',
  relieve: 'relief',
  slep: 'sleep',
  slepp: 'sleep',

  // Energy
  energie: 'energy',
  enegry: 'energy',
  eneegy: 'energy',

  // Nerve
  nerv: 'nerve',
  nereve: 'nerve',
  nervon: 'nerve',

  // Oil
  oile: 'oil',
  oyl: 'oil',
  olil: 'oil',

  // Kids
  kiids: 'kids',
  kide: 'kids',
  childrens: 'kids',

  // General
  calciym: 'calcium',
  calcuim: 'calcium',
  morringga: 'moringa',
  moringa: 'moringa',
  palmeto: 'palmetto',
  'saw palmeto': 'saw palmetto',
};

/**
 * Apply synonym correction to a raw query string.
 * Tries a full-phrase match first, then word-by-word.
 * Returns the (potentially corrected) query.
 */
export function correctQuery(raw) {
  const lower = raw.toLowerCase().trim();
  // Full-phrase match
  if (SYNONYMS[lower]) return SYNONYMS[lower];
  // Word-by-word correction
  return lower
    .split(/\s+/)
    .map((word) => SYNONYMS[word] || word)
    .join(' ');
}

// ---------------------------------------------------------------------------
// Fuse.js configuration
// ---------------------------------------------------------------------------
const FUSE_OPTIONS = {
  // Fields to search and their relative importance (weight 0–1)
  keys: [
    { name: 'title',     weight: 0.50 },
    { name: 'category',  weight: 0.15 },
    { name: 'brandName', weight: 0.15 },
    { name: 'size',      weight: 0.05 },
    { name: '_keywords', weight: 0.15 },  // extra searchable keyword string we inject
  ],
  // Fuse threshold: 0 = exact, 1 = match anything.
  // 0.45 gives good results for 1–2 character typos without too many false positives.
  threshold: 0.45,
  // Minimum characters of the pattern that must match
  minMatchCharLength: 2,
  // Return the match metadata so we can highlight
  includeScore: true,
  includeMatches: true,
  // Use extended search so we can do partial-word matching
  useExtendedSearch: false,
  // Ignore location – important so the match can appear anywhere in the field
  ignoreLocation: true,
  distance: 200,
};

/**
 * Build a searchable "_keywords" string for each product.
 * This lets us match words like "oil", "serum", "tablet" that appear in
 * the title as well as related benefit words.
 */
function buildKeywords(p) {
  const parts = [p.title, p.category, p.brandName, p.size];
  // Split category slug into words: "joint-muscle-care" → "joint muscle care"
  if (p.category) parts.push(p.category.replace(/-/g, ' '));
  return parts.filter(Boolean).join(' ').toLowerCase();
}

/**
 * useFuzzySearch(products, query, options?)
 *
 * @param {object[]} products  - Full products array from mockProducts
 * @param {string}   query     - Raw user query (possibly misspelled)
 * @param {object}   options   - { limit: number (default 6) }
 * @returns {{ results: object[], correctedQuery: string }}
 */
export default function useFuzzySearch(products, query, { limit = 6 } = {}) {
  // Build an enriched product list with _keywords; memoized by products reference
  const enrichedProducts = useMemo(
    () => products.map((p) => ({ ...p, _keywords: buildKeywords(p) })),
    [products],
  );

  // Build the Fuse index; only rebuilt when the enriched list changes
  const fuse = useMemo(
    () => new Fuse(enrichedProducts, FUSE_OPTIONS),
    [enrichedProducts],
  );

  const correctedQuery = useMemo(() => correctQuery(query || ''), [query]);

  const results = useMemo(() => {
    const trimmed = correctedQuery.trim();
    if (!trimmed || trimmed.length < 1) return [];

    const raw = fuse.search(trimmed, { limit });
    // Filter out very low-confidence matches (Fuse score closer to 1 = worse)
    return raw
      .filter((r) => r.score !== undefined && r.score < 0.6)
      .map((r) => r.item);
  }, [fuse, correctedQuery, limit]);

  return { results, correctedQuery };
}
