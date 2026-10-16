/**
 * AutoSlider.jsx — Auto-sliding product carousel
 *
 * - Desktop: 4 cards | Tablet: 3 | Mobile sm: 2 | XS: 1
 * - Auto-advances left → right every `interval` ms
 * - Pauses on hover / touch
 * - Prev / Next arrow buttons (always visible on desktop)
 * - Dot indicators + click to jump
 * - Smooth infinite loop (no jump at boundaries)
 * - Framer Motion for enter animation on the whole section
 */

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';

function getVis() {
  if (typeof window === 'undefined') return 4;
  const w = window.innerWidth;
  if (w < 480)  return 1;
  if (w < 640)  return 2;
  if (w < 1024) return 3;
  return 4;
}

export default function AutoSlider({ products = [], interval = 3200 }) {
  const [vis, setVis]   = useState(getVis);
  const [idx, setIdx]   = useState(0);
  const paused          = useRef(false);
  const total           = products.length;
  const maxIdx          = Math.max(0, total - vis);

  /* resize listener */
  useEffect(() => {
    const fn = () => setVis(getVis());
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  /* clamp idx after resize */
  useEffect(() => {
    setIdx((i) => Math.min(i, Math.max(0, total - vis)));
  }, [vis, total]);

  /* timer */
  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) {
        setIdx((i) => (i >= maxIdx ? 0 : i + 1));
      }
    }, interval);
    return () => clearInterval(id);
  }, [maxIdx, interval]);

  if (!total) return null;

  const goNext = () => setIdx((i) => (i >= maxIdx ? 0 : i + 1));
  const goPrev = () => setIdx((i) => (i <= 0 ? maxIdx : i - 1));
  const cardW  = 100 / vis;   // %

  return (
    <div
      className="relative"
      onMouseEnter={() => { paused.current = true;  }}
      onMouseLeave={() => { paused.current = false; }}
      onTouchStart={() => { paused.current = true;  }}
      onTouchEnd={()   => { paused.current = false; }}
    >
      {/* ── Left arrow ── */}
      <button
        type="button"
        aria-label="Previous"
        onClick={goPrev}
        className="absolute -left-5 top-[42%] z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg border border-gray-100 hover:bg-brand hover:text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <ChevronLeft size={20} />
      </button>

      {/* ── Overflow clip ── */}
      <div className="overflow-hidden mx-7">
        {/* ── Sliding track ── */}
        <motion.div
          className="flex"
          animate={{ x: `-${idx * cardW}%` }}
          transition={{ type: 'spring', stiffness: 280, damping: 32, mass: 0.8 }}
        >
          {products.map((p) => (
            <div
              key={p.id}
              className="shrink-0 px-2.5 py-1"
              style={{ width: `${cardW}%` }}
            >
              <ProductCard product={p} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Right arrow ── */}
      <button
        type="button"
        aria-label="Next"
        onClick={goNext}
        className="absolute -right-5 top-[42%] z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg border border-gray-100 hover:bg-brand hover:text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <ChevronRight size={20} />
      </button>

      {/* ── Dots ── */}
      {maxIdx > 0 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: maxIdx + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => setIdx(i)}
              className={`rounded-full transition-all duration-300 ${
                i === idx
                  ? 'w-7 h-2.5 bg-brand'
                  : 'w-2.5 h-2.5 bg-gray-200 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
