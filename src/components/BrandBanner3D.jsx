import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { brands } from '../data/mockProducts';

/* ─────────────────────────────────────────────
   3D tilt tile — stops propagation so clicking
   a product tile does NOT trigger the card click
   ───────────────────────────────────────────── */
function ProductTile({ imgSrc, handle, index, accentColor }) {
    const ref = useRef(null);
    const [tilt, setTilt] = useState({});

    const onMove = (e) => {
        const el = ref.current;
        if (!el) return;
        const { left, top, width, height } = el.getBoundingClientRect();
        const x = ((e.clientX - left) / width - 0.5) * 30;
        const y = ((e.clientY - top) / height - 0.5) * -30;
        setTilt({
            transform: `perspective(500px) rotateX(${y}deg) rotateY(${x}deg) translateZ(22px) scale(1.08)`,
            boxShadow: `0 24px 48px -8px ${accentColor}88, 0 6px 18px rgba(0,0,0,0.35)`,
        });
    };
    const onLeave = () => setTilt({});

    return (
        <motion.div
            className="flex-1 min-w-0"
            initial={{ opacity: 0, y: 32, scale: 0.88 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            /* stop card-level click from firing */
            onClick={(e) => e.stopPropagation()}
        >
            <Link
                to={`/products/${handle}`}
                ref={ref}
                onMouseMove={onMove}
                onMouseLeave={onLeave}
                aria-label="View product"
                style={{
                    display: 'block',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                    ...tilt,
                    background: 'rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    textDecoration: 'none',
                }}
            >
                <div style={{ position: 'relative', paddingBottom: '130%' }}>
                    <img
                        src={imgSrc}
                        alt="Product"
                        loading="lazy"
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(135deg,rgba(255,255,255,0.22) 0%,transparent 55%)',
                        pointerEvents: 'none',
                    }} />
                    <div style={{
                        position: 'absolute', top: 7, right: 7,
                        background: 'rgba(0,0,0,0.40)', backdropFilter: 'blur(6px)',
                        borderRadius: '999px', padding: '2px 8px',
                        fontSize: 9, color: '#fff', fontWeight: 700, letterSpacing: '0.06em',
                    }}>
                        VIEW →
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   Single brand card — entire card is clickable
   ───────────────────────────────────────────── */
function BrandCard({ brand, index }) {
    const navigate = useNavigate();
    const ac = brand.accentColor;
    const imgs = brand.productPreviewImages || [];
    const handles = brand.productPreviewHandles || [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 44, scale: 0.93 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => navigate(`/brands/${brand.slug}`)}
            style={{
                flex: '1 1 0',
                minWidth: 0,
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: `0 20px 56px -10px ${ac}99, 0 4px 16px rgba(0,0,0,0.25)`,
                display: 'flex',
                flexDirection: 'column',
                minHeight: '340px',
                cursor: 'pointer',
            }}
            whileHover={{ scale: 1.02, boxShadow: `0 28px 72px -10px ${ac}cc` }}
        >
            {/* Brand banner image as full background */}
            {brand.bannerImage && (
                <img
                    src={brand.bannerImage}
                    alt={brand.name}
                    style={{
                        position: 'absolute', inset: 0,
                        width: '100%', height: '100%',
                        objectFit: 'cover',
                    }}
                />
            )}

            {/* Dark overlay at bottom */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0.03) 100%)',
            }} />

            {/* 3D grid overlay */}
            <div
                aria-hidden
                style={{
                    position: 'absolute', inset: 0,
                    backgroundImage:
                        `linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),
             linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px)`,
                    backgroundSize: '38px 38px',
                    transform: 'perspective(450px) rotateX(18deg)',
                    transformOrigin: 'bottom center',
                    pointerEvents: 'none',
                }}
            />

            {/* Content at bottom */}
            <div style={{
                position: 'relative', zIndex: 1,
                padding: '16px 14px 16px',
                display: 'flex', flexDirection: 'column',
                height: '100%', justifyContent: 'flex-end',
            }}>

                {/* View All button — also stops propagation so it's just cosmetic */}
                <div
                    onClick={(e) => { e.stopPropagation(); navigate(`/brands/${brand.slug}`); }}
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: 5,
                        marginBottom: 14,
                        background: 'rgba(255,255,255,0.92)',
                        color: ac, borderRadius: '999px', padding: '7px 16px',
                        fontSize: 10, fontWeight: 800, letterSpacing: '0.05em',
                        textTransform: 'uppercase', cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(0,0,0,0.22)',
                        alignSelf: 'flex-start',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.22)'; }}
                >
                    View All <ArrowRight size={11} />
                </div>

                {/* Product tiles */}
                {imgs.length > 0 && (
                    <div style={{ display: 'flex', gap: 8 }}>
                        {imgs.slice(0, 3).map((img, i) => (
                            <ProductTile
                                key={i}
                                imgSrc={img}
                                handle={handles[i] || '#'}
                                index={i}
                                accentColor={ac}
                            />
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   Main exported section
   ───────────────────────────────────────────── */
export default function BrandBanner3D() {
    return (
        <section
            style={{
                backgroundImage: `
          linear-gradient(rgba(10,10,10,0.70), rgba(10,10,10,0.70)),
          url('/swapbackground.png')
        `,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                padding: '72px 0',
            }}
        >
            <div className="container-x">

                {/* Section heading */}
                <div style={{ textAlign: 'center', marginBottom: 44 }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
                        borderRadius: '999px', padding: '4px 14px',
                        fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.9)',
                        letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10,
                        border: '1px solid rgba(255,255,255,0.2)',
                    }}>
                        <Sparkles size={11} />
                        House of Brands by SwapnEarn
                    </div>
                    <h2 style={{
                        fontSize: 'clamp(26px,4vw,42px)', fontWeight: 900,
                        color: '#ffffff', letterSpacing: '-0.02em', margin: 0,
                        textTransform: 'uppercase', textShadow: '0 2px 24px rgba(0,0,0,0.5)',
                    }}>
                        Choose Your Brand
                    </h2>
                    <p style={{ marginTop: 10, color: 'rgba(255,255,255,0.65)', fontSize: 13 }}>
                        Card pe click karein brand dekhne ke liye — ya product image click karein seedha open karne ke liye
                    </p>
                </div>

                {/* Single horizontal row of 4 brand cards */}
                <div style={{
                    display: 'flex',
                    gap: 18,
                    alignItems: 'stretch',
                    overflowX: 'auto',
                    paddingBottom: 8,
                }}>
                    {brands.map((brand, i) => (
                        <BrandCard key={brand.id} brand={brand} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
