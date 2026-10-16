/**
 * SearchBar.jsx
 *
 * Smart search bar with:
 *  - Fuzzy / spell-tolerant search via Fuse.js (useFuzzySearch hook)
 *  - Debounced live suggestions while typing
 *  - "Popular Products" panel on empty focus / hover
 *  - Keyboard navigation (↑ ↓ Enter Escape)
 *  - Highlight of matching text in results
 *  - Close on outside-click or Escape
 *  - Accessible (ARIA roles, labels, sr-only headings)
 *  - Mobile-friendly (touch targets, overflow-scroll)
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, TrendingUp, X, Zap } from 'lucide-react';
import { products } from '../data/mockProducts';
import { formatPrice } from '../utils/format';
import useFuzzySearch, { correctQuery } from '../hooks/useFuzzySearch';

// ---------------------------------------------------------------------------
// Popular / featured products shown when the search bar is empty.
// These are configured by handle — change handles here to update the list.
// ---------------------------------------------------------------------------
const POPULAR_HANDLES = [
  'joint-relief-oil',
  'roots-hair-serum',
  'mens-daily-wellness',
  'hair-skin-nails',
  'liquid-collagen-shots',
  'night-oil',
];

const popularProducts = POPULAR_HANDLES
  .map((h) => products.find((p) => p.handle === h))
  .filter(Boolean)
  .slice(0, 6);

// ---------------------------------------------------------------------------
// Debounce hook – delays updating the live query so Fuse isn't hammered on
// every single keystroke.
// ---------------------------------------------------------------------------
function useDebounce(value, delay = 200) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

// ---------------------------------------------------------------------------
// Highlight matching text inside a product title.
// Splits the title around all occurrences of the query word(s) and wraps
// matched segments in a <mark> element.
// ---------------------------------------------------------------------------
function HighlightText({ text, query }) {
  if (!query || !query.trim()) return <span>{text}</span>;
  const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === query.trim().toLowerCase() ? (
          <mark key={i} className="bg-yellow-100 text-yellow-800 rounded px-0.5 not-italic font-semibold">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function SearchBar({
  onDone,
  autoFocus = false,
  defaultValue = '',
  placeholder = 'Search for products',
}) {
  const [rawQuery, setRawQuery] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const nav = useNavigate();
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Debounce the query so Fuse only runs ~200 ms after the user stops typing
  const debouncedQuery = useDebounce(rawQuery, 200);

  // Run fuzzy search on the debounced value, limit dropdown to 7 items
  const { results: fuzzyResults, correctedQuery } = useFuzzySearch(
    products,
    debouncedQuery,
    { limit: 7 },
  );

  // Decide whether to show popular products or live search results
  const isSearching = debouncedQuery.trim().length > 0;
  const displayList = isSearching ? fuzzyResults : popularProducts;

  // Was a spelling correction applied?
  const spellingCorrected =
    isSearching &&
    correctedQuery.trim().toLowerCase() !== debouncedQuery.trim().toLowerCase();

  // Reset keyboard-active index when the list changes
  useEffect(() => { setActiveIndex(-1); }, [displayList]);

  // Auto-focus support
  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  // Close on outside click or Escape key
  useEffect(() => {
    const onClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  // Navigate to a product detail page
  const handleSelect = useCallback(
    (handle) => {
      setIsOpen(false);
      setActiveIndex(-1);
      nav(`/products/${handle}`);
      onDone?.();
    },
    [nav, onDone],
  );

  // Submit → navigate to search results page
  const submit = useCallback(
    (e) => {
      if (e) e.preventDefault();
      const q = rawQuery.trim();
      if (!q) return;
      setIsOpen(false);
      setActiveIndex(-1);
      nav(`/search?q=${encodeURIComponent(q)}`);
      onDone?.();
    },
    [rawQuery, nav, onDone],
  );

  // Keyboard navigation inside the dropdown
  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) {
        if (e.key === 'Escape') return;
        return;
      }
      switch (e.key) {
        case 'Escape':
          setIsOpen(false);
          setActiveIndex(-1);
          inputRef.current?.blur();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex((i) => Math.min(i + 1, displayList.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex((i) => Math.max(i - 1, -1));
          break;
        case 'Enter':
          if (activeIndex >= 0 && displayList[activeIndex]) {
            e.preventDefault();
            handleSelect(displayList[activeIndex].handle);
          }
          break;
        default:
          break;
      }
    },
    [isOpen, activeIndex, displayList, handleSelect],
  );

  // Word to highlight in results: use corrected query if corrected, otherwise raw
  const highlightWord = spellingCorrected ? correctedQuery : debouncedQuery;

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      onMouseEnter={() => { if (!isOpen) setIsOpen(true); }}
    >
      {/* ------------------------------------------------------------------ */}
      {/* Search Input                                                         */}
      {/* ------------------------------------------------------------------ */}
      <form onSubmit={submit} role="search" aria-label="Product search">
        <label htmlFor="smart-search-input" className="sr-only">
          Search products
        </label>
        <input
          id="smart-search-input"
          ref={inputRef}
          type="search"
          value={rawQuery}
          onChange={(e) => {
            setRawQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onClick={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          aria-autocomplete="list"
          aria-controls={isOpen ? 'search-suggestions' : undefined}
          aria-activedescendant={
            activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined
          }
          className="w-full rounded-full border border-gray-300 bg-white py-2 pl-4 pr-10 text-xs sm:text-sm text-gray-800 placeholder-gray-400 shadow-sm transition focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        />
        {/* Clear button – only visible when there is text */}
        {rawQuery && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setRawQuery('');
              setIsOpen(true);
              inputRef.current?.focus();
            }}
            className="absolute right-7 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
          >
            <X size={13} />
          </button>
        )}
        <button
          type="submit"
          aria-label="Submit search"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-brand transition"
        >
          <Search size={17} />
        </button>
      </form>

      {/* ------------------------------------------------------------------ */}
      {/* Dropdown                                                             */}
      {/* ------------------------------------------------------------------ */}
      {isOpen && (
        <div
          id="search-suggestions"
          role="listbox"
          aria-label="Search suggestions"
          className="absolute left-0 right-0 top-full z-[100] mt-2 min-w-[290px] sm:min-w-[340px] max-w-md overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-2xl animate-fadeUp"
          style={{ width: '100%' }}
        >
          {/* Header row */}
          <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/70 px-4 py-2.5 text-xs">
            <span className="flex items-center gap-1.5 font-semibold text-gray-700">
              {isSearching ? (
                <>
                  <Zap size={13} className="text-brand" />
                  {fuzzyResults.length > 0
                    ? `${fuzzyResults.length} result${fuzzyResults.length !== 1 ? 's' : ''} found`
                    : 'No results'}
                  {spellingCorrected && (
                    <span className="ml-1 text-gray-500 font-normal">
                      (showing results for &ldquo;
                      <span className="font-semibold text-brand">{correctedQuery}</span>
                      &rdquo;)
                    </span>
                  )}
                </>
              ) : (
                <>
                  <TrendingUp size={13} className="text-brand" />
                  Popular Products
                </>
              )}
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition"
              aria-label="Close suggestions"
            >
              <X size={14} />
            </button>
          </div>

          {/* Product list */}
          <div className="max-h-[380px] overflow-y-auto divide-y divide-gray-100" role="group">
            {displayList.length > 0 ? (
              displayList.map((product, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={product.id}
                    id={`suggestion-${idx}`}
                    role="option"
                    aria-selected={isActive}
                    type="button"
                    onClick={() => handleSelect(product.handle)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`group flex w-full items-center gap-3.5 px-4 py-3 text-left transition ${
                      isActive ? 'bg-emerald-50' : 'hover:bg-emerald-50/50'
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50 p-0.5 shadow-sm">
                      <img
                        src={product.images[0]}
                        alt=""
                        role="presentation"
                        loading="lazy"
                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="line-clamp-2 text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-brand leading-snug">
                        {isSearching ? (
                          <HighlightText text={product.title} query={highlightWord} />
                        ) : (
                          product.title
                        )}
                      </h4>
                      <div className="mt-0.5 flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-bold text-gray-900">
                          {formatPrice(product.price)}
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-[10px] text-gray-400 line-through">
                            {formatPrice(product.compareAtPrice)}
                          </span>
                        )}
                        {product.discountPercent && (
                          <span className="rounded bg-red-100 px-1 py-0.5 text-[9px] font-bold text-red-600">
                            -{product.discountPercent}%
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })
            ) : isSearching ? (
              /* No results state */
              <div className="px-5 py-8 text-center">
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  No products found for &ldquo;
                  <span className="text-brand">{rawQuery}</span>
                  &rdquo;
                </p>
                <p className="text-xs text-gray-500">
                  Try different keywords or browse our{' '}
                  <button
                    type="button"
                    className="text-brand underline underline-offset-2 hover:no-underline"
                    onClick={() => {
                      setIsOpen(false);
                      nav('/collections/all-products');
                    }}
                  >
                    all products
                  </button>
                  .
                </p>
              </div>
            ) : null}
          </div>

          {/* Footer: "View all results" CTA when there are live results */}
          {isSearching && fuzzyResults.length > 0 && (
            <div className="border-t border-gray-100 bg-gray-50 p-2.5 text-center">
              <button
                type="button"
                onClick={submit}
                className="text-xs font-semibold text-brand hover:underline"
              >
                View all {fuzzyResults.length > 1 ? `${fuzzyResults.length} ` : ''}results for
                &ldquo;{spellingCorrected ? correctedQuery : rawQuery}&rdquo; →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
