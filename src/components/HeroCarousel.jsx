import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/mockProducts';

// ── Pick exactly 5 top-selling products by handle ──────────────────────────
const TOP_HANDLES = [
    'joint-relief-oil',      // JOINT-ON — 591 reviews
    'hair-skin-nails',       // NUGLOW — 196 reviews
    'roots-hair-serum',      // Roots Hair Serum — 148 reviews
    'soothing-comfort-oil',  // De-Piles — 143 reviews
    'men-pro-protein-mix',   // Men Pro Protein — 120 reviews
];

const TOP = TOP_HANDLES.map(h => products.find(p => p.handle === h)).filter(Boolean);
const TOTAL = TOP.length; // 5

// Per-offset visual style
const STYLE = {
    '-2': { x: -440, scale: 0.68, opacity: 0.50, rotateY: 30, z: 0 },
    '-1': { x: -230, scale: 0.85, opacity: 0.78, rotateY: 16, z: 1 },
    '0': { x: 0, scale: 1.12, opacity: 1.00, rotateY: 0, z: 3 },
    '1': { x: 230, scale: 0.85, opacity: 0.78, rotateY: -16, z: 1 },
    '2': { x: 440, scale: 0.68, opacity: 0.50, rotateY: -30, z: 0 },
};

// ── Main component ──────────────────────────────────────────────────────────
export default function HeroCarousel() {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const dragX = useRef(0);

    // Auto-rotate every 3.5 s, pauses on hover
    useEffect(() => {
        if (paused) return;
        const id = setInterval(() => setActive(i => (i + 1) % TOTAL), 3500);
        return () => clearInterval(id);
    }, [paused]);

    const prev = () => setActive(i => (i - 1 + TOTAL) % TOTAL);
    const next = () => setActive(i => (i + 1) % TOTAL);

    // Resolve visible items with circular offset (-2 … +2)
    const slots = [-2, -1, 0, 1, 2].map(offset => {
        const idx = (active + offset + TOTAL) % TOTAL;
        return { product: TOP[idx], offset };
    });

    const centreProduct = TOP[active];

    return (
        <section
            className="relative overflow-hidden"
            style={{
                background: 'linear-gradient(140deg, #e8f5e9 0%, #d4ece0 45%, #c5e8cb 100%)',
                paddingTop: '3rem',
                paddingBottom: '3.5rem',
            }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* ── Background blobs ── */}
            <div className="pointer-events-none absolute inset-0" aria-hidden>
                <div className="absolute -top-28 left-1/3 h-80 w-80 rounded-full bg-green-200 opacity-40 blur-3xl" />
                <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-teal-200 opacity-30 blur-3xl" />
                <div className="absolute top-1/2 right-10 h-48 w-48 rounded-full bg-emerald-100 opacity-40 blur-2xl" />
            </div>

            {/* ── Headline ── */}
            <div className="relative z-10 text-center px-4">
                <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block mb-3 rounded-full border border-emerald-400/40 bg-white/60 px-5 py-1 text-xs font-bold uppercase tracking-widest text-emerald-700 backdrop-blur-sm"
                >
                    ✦ Top Selling Products
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: -18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-4xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl"
                >
                    Wellness,{' '}
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                        Elevated
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="mx-auto mt-3 max-w-xl text-base text-gray-600"
                >
                    Science-backed products crafted to nurture your body and mind.
                </motion.p>
            </div>

            {/* ── 3-D Carousel ── */}
            <div
                className="relative mx-auto mt-10 select-none"
                style={{ height: '360px', perspective: '1100px', maxWidth: '1200px' }}
                onPointerDown={e => { dragX.current = e.clientX; }}
                onPointerUp={e => {
                    const dx = e.clientX - dragX.current;
                    if (Math.abs(dx) > 48) dx < 0 ? next() : prev();
                }}
            >
                {/* Left arrow */}
                <button
                    onClick={prev}
                    className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg hover:bg-emerald-600 hover:text-white transition-all duration-200"
                    aria-label="Previous"
                >
                    <ArrowLeft size={18} />
                </button>

                {/* Right arrow */}
                <button
                    onClick={next}
                    className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg hover:bg-emerald-600 hover:text-white transition-all duration-200"
                    aria-label="Next"
                >
                    <ArrowRight size={18} />
                </button>

                {/* Cards */}
                {slots.map(({ product, offset }) => {
                    const s = STYLE[String(offset)];
                    const isCenter = offset === 0;

                    return (
                        <motion.div
                            key={product.handle + '-' + offset}
                            className="absolute top-0 left-1/2 cursor-pointer"
                            animate={{
                                x: `calc(-50% + ${s.x}px)`,
                                scale: s.scale,
                                opacity: s.opacity,
                                rotateY: s.rotateY,
                                zIndex: s.z,
                            }}
                            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
                            onClick={() => { if (!isCenter) setActive((active + offset + TOTAL) % TOTAL); }}
                            style={{ width: '210px', transformStyle: 'preserve-3d' }}
                            whileHover={isCenter ? { scale: 1.15 } : { scale: s.scale * 1.04, opacity: 0.9 }}
                        >
                            {/* Card */}
                            <div
                                className="overflow-hidden rounded-2xl bg-white"
                                style={{
                                    boxShadow: isCenter
                                        ? '0 28px 64px -10px rgba(0,0,0,0.22), 0 0 0 2.5px rgba(27,94,59,0.18)'
                                        : '0 8px 28px -6px rgba(0,0,0,0.13)',
                                }}
                            >
                                {/* Product image */}
                                <div className="relative" style={{ height: '230px' }}>
                                    <img
                                        src={product.images[0]}
                                        alt={product.title}
                                        loading="lazy"
                                        className="h-full w-full object-cover"
                                        style={{ filter: isCenter ? 'none' : 'brightness(0.90) saturate(0.95)' }}
                                    />

                                    {/* Best-seller badge on center */}
                                    {isCenter && product.bestSeller && (
                                        <span className="absolute left-2.5 top-2.5 rounded-full bg-emerald-600 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-white shadow">
                                            Best Seller
                                        </span>
                                    )}

                                    {/* Floating animation ring */}
                                    {isCenter && (
                                        <motion.div
                                            className="absolute inset-0 rounded-2xl border-2 border-emerald-400/50 pointer-events-none"
                                            animate={{ scale: [1, 1.025, 1] }}
                                            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                                        />
                                    )}
                                </div>

                                {/* Info — only on centre card */}
                                <AnimatePresence mode="wait">
                                    {isCenter && (
                                        <motion.div
                                            key={product.handle}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.3 }}
                                            className="px-3 pt-2 pb-3 text-center"
                                        >
                                            <p className="truncate text-xs font-bold text-gray-800">{product.title}</p>
                                            <p className="mt-0.5 text-sm font-extrabold text-emerald-700">
                                                Rs. {product.price.toLocaleString()}
                                            </p>
                                            <Link
                                                to={`/products/${product.handle}`}
                                                className="mt-2 inline-block rounded-full bg-emerald-600 px-4 py-1 text-xs font-bold text-white hover:bg-emerald-700 transition-colors"
                                                onClick={e => e.stopPropagation()}
                                            >
                                                View Product
                                            </Link>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* ── Dot indicators ── */}
            <div className="relative z-10 mt-5 flex justify-center gap-2">
                {TOP.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setActive(i)}
                        className={`rounded-full transition-all duration-300 ${i === active ? 'w-7 h-2 bg-emerald-600' : 'w-2 h-2 bg-gray-300 hover:bg-emerald-400'
                            }`}
                        aria-label={`Go to product ${i + 1}`}
                    />
                ))}
            </div>

            {/* ── Centered product name below dots ── */}
            <AnimatePresence mode="wait">
                <motion.p
                    key={centreProduct.handle}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10 mt-3 text-center text-sm font-semibold text-gray-700"
                >
                    {centreProduct.title}
                </motion.p>
            </AnimatePresence>

            {/* ── CTA row ── */}
            <div className="relative z-10 mt-5 flex flex-wrap justify-center gap-4">
                <Link
                    to="/collections/all-products"
                    className="btn-3d btn-3d-emerald rounded-full px-7 py-2.5 text-sm font-bold"
                >
                    Shop All Products →
                </Link>
                <Link
                    to={`/products/${centreProduct.handle}`}
                    className="rounded-full border-2 border-emerald-600 px-7 py-2.5 text-sm font-bold text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors"
                >
                    View Featured
                </Link>
            </div>
        </section>
    );
}
