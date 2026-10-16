import Fuse from 'fuse.js';
import { products, collections, blogs, brands } from '../data/mockProducts';
import { correctQuery } from '../hooks/useFuzzySearch';

const delay = (ms = 250) => new Promise((r) => setTimeout(r, ms));
// TODO (Shopify): replace bodies with shopifyFetch() calls, keep the same return shapes.

// Build a Fuse index over all products for the search results page.
// We add a _keywords field that includes the category slug as human-readable words.
const _enriched = products.map((p) => ({
  ...p,
  _keywords: [p.title, p.category?.replace(/-/g, ' '), p.brandName, p.size]
    .filter(Boolean)
    .join(' ')
    .toLowerCase(),
}));

const _fuse = new Fuse(_enriched, {
  keys: [
    { name: 'title', weight: 0.50 },
    { name: 'category', weight: 0.15 },
    { name: 'brandName', weight: 0.15 },
    { name: 'size', weight: 0.05 },
    { name: '_keywords', weight: 0.15 },
  ],
  threshold: 0.45,
  minMatchCharLength: 2,
  includeScore: true,
  ignoreLocation: true,
  distance: 200,
});

function fuzzySearch(list, rawQuery) {
  if (!rawQuery || !rawQuery.trim()) return list;
  const corrected = correctQuery(rawQuery);

  // Run Fuse on the enriched list (same products, just with _keywords)
  const fuseResults = _fuse.search(corrected).filter((r) => r.score < 0.6);

  // Map back to original product objects (strip _keywords field)
  const matchedIds = new Set(fuseResults.map((r) => r.item.id));
  return list.filter((p) => matchedIds.has(p.id));
}

export async function getProducts({ category, brand, search, minPrice, maxPrice, sort = 'featured', tag } = {}) {
  await delay();
  let list = [...products];
  if (category && category !== 'all-products') list = list.filter((p) => p.category === category);
  if (brand && brand !== 'all-brands') list = list.filter((p) => p.brandId === brand || p.brandId === brand.toLowerCase());
  if (tag === 'best') list = list.filter((p) => p.bestSeller);
  if (tag === 'trending') list = list.filter((p) => p.trending);
  if (tag === 'bundle') list = list.filter((p) => p.isBundle);
  if (tag === 'new') list = list.filter((p) => p.isNew);
  if (search) list = fuzzySearch(list, search);
  if (minPrice != null && minPrice !== '') list = list.filter((p) => p.price >= Number(minPrice));
  if (maxPrice != null && maxPrice !== '') list = list.filter((p) => p.price <= Number(maxPrice));
  const sorters = {
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    'rating': (a, b) => b.rating - a.rating,
    'title': (a, b) => a.title.localeCompare(b.title),
  };
  if (sorters[sort]) list.sort(sorters[sort]);
  return list;
}

export async function getProductByHandle(handle) {
  await delay();
  return products.find((p) => p.handle === handle) || null;
}

export async function getRelatedProducts(product, limit = 4) {
  await delay(100);
  return products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit);
}

export async function getCollections() { await delay(100); return collections; }
export async function getCollection(slug) { await delay(100); return collections.find((c) => c.slug === slug) || null; }
export async function getBlogs() { await delay(100); return blogs; }
export async function getBlog(slug) { await delay(100); return blogs.find((b) => b.slug === slug) || null; }
export async function getBrands() { await delay(100); return brands; }
export async function getBrand(slug) { await delay(100); return brands.find((b) => b.slug === slug || b.id === slug) || null; }
