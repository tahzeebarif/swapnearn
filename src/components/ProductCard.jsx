/**
 * ProductCard.jsx — Premium 3D tilt + hover lift card
 *
 * - CSS perspective tilt on mouse move (JS-driven, no heavy lib)
 * - Framer Motion lift on hover
 * - Shimmer placeholder when image is loading
 * - Real images drop in by replacing product.images[0] in mock data
 * - All layout / cart / price logic preserved from original
 */

import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Stars from './Stars';
import PriceDisplay from './PriceDisplay';
import AddToCartButton from './AddToCartButton';
import { discountPct } from '../utils/format';

/* 3D tilt strength — lower = more dramatic */
const TILT_STRENGTH = 18;

export default function ProductCard({ product }) {
  const pct = discountPct(product.price, product.compareAtPrice);
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [lifted, setLifted] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  /* Mouse move → tilt */
  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;   // -0.5 → 0.5
    const y = (e.clientY - top) / height - 0.5;
    setTilt({ x: -y * TILT_STRENGTH, y: x * TILT_STRENGTH });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setLifted(false);
  };

  const cardStyle = {
    transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${lifted ? 'translateY(-8px) scale(1.02)' : ''}`,
    transition: lifted
      ? 'transform 0.15s ease-out, box-shadow 0.3s ease'
      : 'transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s ease',
    boxShadow: lifted
      ? '0 28px 52px -10px rgba(0,0,0,0.2), 0 0 0 1px rgba(27,94,59,0.08)'
      : '0 8px 24px -6px rgba(0,0,0,0.08)',
  };

  return (
    <article
      ref={cardRef}
      style={cardStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setLifted(true)}
      onMouseLeave={handleMouseLeave}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white will-change-transform"
    >
      {/* ── Image zone ── */}
      <Link
        to={`/products/${product.handle}`}
        className="relative block aspect-square overflow-hidden bg-brand-light"
      >
        {/* Shimmer placeholder — visible while image loads */}
        {!imgLoaded && (
          <div className="absolute inset-0 product-img-placeholder" aria-hidden="true" />
        )}

        <img
          src={product.images[0]}
          alt={product.title}
          loading="lazy"
          width="600"
          height="600"
          onLoad={() => setImgLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-107
            ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Hover-reveal second image */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}

        {/* Gradient shine sweep on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)',
          }}
        />

        {/* Badges */}
        <div className="absolute left-2.5 top-2.5 flex flex-col gap-1.5 z-10">
          {product.bestSeller && (
            <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-md ring-1 ring-white/60">
              Best Seller
            </span>
          )}
          {pct > 0 && (
            <span className="rounded-full bg-sale px-2.5 py-0.5 text-[10px] font-extrabold text-white shadow-md ring-1 ring-white/60">
              -{pct}%
            </span>
          )}
          {product.isNew && (
            <span className="rounded-full bg-brand px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-md ring-1 ring-white/60">
              New
            </span>
          )}
        </div>
      </Link>

      {/* ── Info zone ── */}
      <div className="flex flex-1 flex-col gap-1.5 p-3.5 sm:p-4">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          {product.reviewCount > 0
            ? (<><Stars rating={product.rating} /><span className="font-medium">({product.reviewCount})</span></>)
            : <span>No reviews yet</span>
          }
        </div>

        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-bold text-gray-900 leading-snug">
          <Link to={`/products/${product.handle}`} className="hover:text-brand transition-colors">
            {product.title}
          </Link>
        </h3>

        <p className="text-xs text-gray-500 font-medium">{product.size}</p>

        <div className="mt-auto pt-1">
          <PriceDisplay price={product.price} compareAtPrice={product.compareAtPrice} />
        </div>

        <AddToCartButton
          product={product}
          label="Quick Add"
          className="btn-3d btn-3d-dark mt-2.5 w-full !py-2 !px-3 text-xs"
        />
      </div>
    </article>
  );
}
