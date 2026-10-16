import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight,
  ShieldCheck, Leaf, FlaskConical, Truck, Headphones, Play,
  ArrowRight, Star,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import HeroCarousel from '../components/HeroCarousel';
import Carousel from '../components/Carousel';
import AutoSlider from '../components/AutoSlider';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import NewsletterForm from '../components/NewsletterForm';
import Stars from '../components/Stars';
import ChooseBrandSection from '../components/ChooseBrandSection';
import BrandBanner3D from '../components/BrandBanner3D';
import BundleCard from '../components/BundleCard';
import CertificationBadges from '../components/CertificationBadges';
import ScrollReveal from '../components/ScrollReveal';
import { IMG } from '../data/images';
import { products, collections, testimonials, blogs } from '../data/mockProducts';
import { staggerContainer, staggerItem, fadeUp, slideLeft, slideRight, viewportOnce } from '../utils/animations';
import TopProductsSlider from '../components/TopProductsSlider';

/* ================================================================
   HERO — fully animated, no images required
   ================================================================ */

const SLIDES = [
  {
    tag: 'Certified Wellness',
    title: 'Natural Wellness,\nMade Simple',
    sub: 'Essential oil blends, supplements & beauty essentials crafted with care.',
    cta: 'Shop All Products',
    to: '/collections/all-products',
    accent: '#1b5e3b',
    blob1: 'bg-emerald-200',
    blob2: 'bg-lime-200',
    blob3: 'bg-teal-100',
  },
  {
    tag: 'Hair Care Science',
    title: 'Roots Hair Care\nRange',
    sub: 'Serums and shampoos designed for stronger, healthier-looking hair.',
    cta: 'Shop Hair Care',
    to: '/collections/hair-care',
    accent: '#7c3aed',
    blob1: 'bg-purple-200',
    blob2: 'bg-violet-200',
    blob3: 'bg-fuchsia-100',
  },
  {
    tag: 'Bundle Deals',
    title: 'Save Up to 30%\non Bundles',
    sub: 'Build your routine and save with our curated wellness sets.',
    cta: 'View Bundles',
    to: '/collections/bundles',
    accent: '#c8a24a',
    blob1: 'bg-amber-200',
    blob2: 'bg-yellow-200',
    blob3: 'bg-orange-100',
  },
];

/* Floating abstract shape component */
function Blob({ className, style }) {
  return (
    <motion.div
      className={`absolute rounded-full opacity-60 blur-3xl ${className}`}
      animate={{ scale: [1, 1.12, 0.95, 1], x: [0, 20, -15, 0], y: [0, -18, 12, 0] }}
      transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      style={style}
      aria-hidden="true"
    />
  );
}

/* Floating pill / badge decoration */
function FloatingBadge({ className, children, delay = 0 }) {
  return (
    <motion.div
      className={`absolute glass-card rounded-2xl px-4 py-2 shadow-lg text-sm font-semibold ${className}`}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay }}
      aria-hidden="true"
    >
      {children}
    </motion.div>
  );
}

function Hero() {
  const [idx, setIdx] = useState(0);
  const [prev, setPrev] = useState(null);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((x) => {
        setPrev(x);
        return (x + 1) % SLIDES.length;
      });
    }, 5500);
    return () => clearInterval(t);
  }, []);

  const go = (d) => {
    setIdx((x) => {
      setPrev(x);
      return (x + d + SLIDES.length) % SLIDES.length;
    });
  };

  const s = SLIDES[idx];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured offers"
      className="relative overflow-hidden bg-[#f2ede3] hero-noise"
      style={{ minHeight: 'clamp(420px, 56vh, 580px)' }}
    >
      {/* ── Animated background blobs ── */}
      <Blob className={`w-[480px] h-[480px] -top-24 -right-24 ${s.blob1}`} />
      <Blob className={`w-[360px] h-[360px] bottom-0 left-0 ${s.blob2}`}
        style={{ animationDelay: '2s' }} />
      <Blob className={`w-[300px] h-[300px] top-1/3 left-1/3 ${s.blob3}`}
        style={{ animationDelay: '4s' }} />

      {/* ── Decorative grid ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(#1b5e3b 1px, transparent 1px), linear-gradient(90deg, #1b5e3b 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* ── Content ── */}
      <div className="container-x relative flex items-center" style={{ minHeight: 'inherit' }}>
        <div className="w-full py-16 lg:py-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl"
            >
              {/* Tag pill */}
              <motion.span
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="inline-flex items-center gap-2 rounded-full border border-current/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-5"
                style={{ color: s.accent, backgroundColor: s.accent + '18' }}
              >
                <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: s.accent }} />
                {s.tag}
              </motion.span>

              {/* Main heading */}
              <h1 className="text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl lg:text-6xl whitespace-pre-line">
                {s.title.split('\n').map((line, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 28, skewY: 1.5 }}
                    animate={{ opacity: 1, y: 0, skewY: 0 }}
                    transition={{ delay: 0.15 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="block"
                  >
                    {i === 1
                      ? <span className="text-gradient-green">{line}</span>
                      : line
                    }
                  </motion.span>
                ))}
              </h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-4 text-base text-gray-600 max-w-md"
              >
                {s.sub}
              </motion.p>

              {/* CTA row */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.45 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <Link
                  to={s.to}
                  className="btn-3d btn-3d-emerald flex items-center gap-2 !px-7 !py-3 text-sm btn-glow"
                >
                  {s.cta}
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/collections/all-products"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-brand transition-colors"
                >
                  Browse all
                  <ChevronRight size={15} />
                </Link>
              </motion.div>

              {/* Trust micro-stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.5 }}
                className="mt-10 flex flex-wrap items-center gap-6 text-xs text-gray-500"
              >
                {[
                  { v: '4.8★', l: 'Avg. rating' },
                  { v: '10,000+', l: 'Happy customers' },
                  { v: 'DRAP', l: 'Certified' },
                ].map((stat) => (
                  <div key={stat.l} className="flex items-center gap-2">
                    <span className="text-base font-extrabold text-brand stat-number">{stat.v}</span>
                    <span>{stat.l}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Floating decorative badges (desktop only) ── */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:block">
          <FloatingBadge className="text-brand right-32 top-0" delay={0}>
            🌿 100% Natural
          </FloatingBadge>
          <FloatingBadge className="text-accent right-0 top-24" delay={1}>
            ⭐ 4.8 Rating
          </FloatingBadge>
          <FloatingBadge className="text-brand right-40 top-48" delay={2}>
            🚚 Free Delivery
          </FloatingBadge>
        </div>
      </div>

      {/* ── Prev / Next arrows ── */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => go(-1)}
        className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-lg backdrop-blur-sm hover:bg-brand hover:text-white transition sm:flex"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => go(1)}
        className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-lg backdrop-blur-sm hover:bg-brand hover:text-white transition sm:flex"
      >
        <ChevronRight size={20} />
      </button>

      {/* ── Dot indicators ── */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
        {SLIDES.map((_, n) => (
          <button
            key={n}
            type="button"
            aria-label={`Go to slide ${n + 1}`}
            onClick={() => { setPrev(idx); setIdx(n); }}
            className={`h-2 rounded-full transition-all duration-300 ${n === idx ? 'w-7 bg-brand' : 'w-2 bg-brand/30'
              }`}
          />
        ))}
      </div>
    </section>
  );
}

/* ================================================================
   HOME PAGE
   ================================================================ */

const byCat = (c, n = 8) => products.filter((p) => p.category === c).slice(0, n);

export default function Home() {
  const trending = products.filter((p) => p.trending).slice(0, 10);
  const best = products.filter((p) => p.bestSeller);
  const bundles = products.filter((p) => p.isBundle);
  const men = byCat('mens-wellness', 6);
  const hair = byCat('hair-care', 6);

  return (
    <>
      <HeroCarousel />

      {/* ── CATEGORIES — Infinite Marquee ── */}
      <section className="bg-[#f2ede3] py-12 overflow-hidden">
        <ScrollReveal>
          <h2 className="mb-8 text-center text-2xl font-extrabold uppercase tracking-wide text-gray-900">
            Categories
          </h2>
        </ScrollReveal>

        <div className="relative flex">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[#f2ede3] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[#f2ede3] to-transparent" />

          <div className="flex gap-6 animate-marquee-slow" style={{ willChange: 'transform' }}>
            {[0, 1].map((copy) => (
              <div key={copy} className="flex gap-6 flex-shrink-0" aria-hidden={copy === 1}>
                {[
                  { slug: 'joint-muscle-care', title: 'Joint & Muscle Care', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&q=80' },
                  { slug: 'hair-care', title: 'Hair Care', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop&q=80' },
                  { slug: 'skin-care', title: 'Skin Care', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop&q=80' },
                  { slug: 'womens-wellness', title: 'Women Wellness', img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop&q=80' },
                  { slug: 'stress-sleep', title: 'Stress & Sleep', img: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=400&fit=crop&q=80' },
                  { slug: 'mens-wellness', title: "Men's Wellness", img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop&q=80' },
                  { slug: 'kids-wellness', title: "Kids' Wellness", img: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=400&fit=crop&q=80' },
                  { slug: 'general-wellbeing', title: 'General Wellbeing', img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=400&fit=crop&q=80' },
                ].map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/collections/${cat.slug}`}
                    className="group flex flex-col items-center gap-3 flex-shrink-0"
                    style={{ width: '160px' }}
                  >
                    <div
                      className="overflow-hidden rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 group-hover:shadow-lg group-hover:scale-[1.05]"
                      style={{ width: '160px', height: '160px' }}
                    >
                      <img src={cat.img} alt={cat.title} loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-brand transition text-center leading-tight">
                      {cat.title}
                    </span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quality standards ── */}
      <ScrollReveal>
        <section className="py-10">
          <div className="container-x">
            <CertificationBadges />
          </div>
        </section>
      </ScrollReveal>

      {/* ── Choose Your Brand — 3D Banner ── */}
      <BrandBanner3D />

      {/* ── Popular & Trending ── */}
      <section className="container-x py-14">
        <SectionHeading title="Popular & Trending" subtitle="Our most-loved picks" />
        <AutoSlider products={trending} />
        <div className="mt-10 text-center">
          <Link to="/collections/all-products" className="btn-outline">
            View more <ArrowRight size={15} className="inline ml-1" />
          </Link>
        </div>
      </section>
      {/* ── Top Products Slider ── */}
      <TopProductsSlider />
      {/* ── Hair Care banner + slider ── */}
      <ScrollReveal>
        <section className="container-x pb-14">
          <Link to="/collections/hair-care" className="relative block overflow-hidden rounded-3xl">
            <img src={IMG.hairBanner} alt="Hair care collection" loading="lazy"
              className="h-56 w-full object-cover sm:h-72 lg:h-96 transition duration-700 hover:scale-[1.02]" />
            <span className="absolute inset-0 flex items-center bg-gradient-to-r from-brand-dark/70 to-transparent p-6 sm:p-12">
              <span>
                <span className="block text-2xl font-bold text-white sm:text-4xl">Hair Care</span>
                <span className="btn-light mt-4">Explore range</span>
              </span>
            </span>
          </Link>
          <div className="mt-8"><AutoSlider products={hair} /></div>
        </section>
      </ScrollReveal>

      {/* ── Promo banners ── */}
      <motion.section
        className="container-x grid gap-5 pb-14 md:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {[
          [IMG.promoLeft, 'Get up to 30% off Bundles', '/collections/bundles'],
          [IMG.promoRight, 'Buy 2 - Free Delivery', '/collections/all-products'],
        ].map(([src, t, to]) => (
          <motion.div key={t} variants={staggerItem}>
            <Link to={to} className="group relative block overflow-hidden rounded-2xl">
              <img src={src} alt={t} loading="lazy"
                className="h-48 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-60" />
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/55 to-transparent p-6">
                <span className="text-xl font-semibold text-white">{t}</span>
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.section>



      {/* ── Bundles ── */}
      <section className="container-x py-14">
        <SectionHeading title="Exclusive Bundle Offers" subtitle="Buy 2 Get 1 Free & Value Combos — Save up to 30%" />
        <motion.div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {bundles.slice(0, 4).map((p) => (
            <motion.div key={p.id} variants={staggerItem}>
              <BundleCard product={p} />
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-8 text-center">
          <Link to="/collections/bundles" className="btn-3d btn-3d-rust !px-8">
            View All Bundles & Save More
          </Link>
        </div>
      </section>

      {/* Video section removed */}

      {/* ── Men's banner + slider ── */}
      <ScrollReveal>
        <section className="container-x pb-14">
          <Link to="/collections/mens-wellness" className="relative block overflow-hidden rounded-3xl">
            <img src={IMG.menBanner} alt="Men's wellness" loading="lazy"
              className="h-56 w-full object-cover sm:h-72 lg:h-96 transition duration-700 hover:scale-[1.02]" />
            <span className="absolute inset-0 flex items-center bg-gradient-to-r from-black/60 to-transparent p-6 sm:p-12">
              <span>
                <span className="block text-2xl font-bold text-white sm:text-4xl">Men's Wellness</span>
                <span className="btn-light mt-4">Shop now</span>
              </span>
            </span>
          </Link>
          <div className="mt-8"><AutoSlider products={men} /></div>
        </section>
      </ScrollReveal>

      {/* ── Best Sellers ── */}
      <section className="container-x pb-14">
        <SectionHeading title="Best Sellers" />
        <AutoSlider products={best} interval={3600} />
      </section>

      {/* ── Why Choose Us ── */}
      <ScrollReveal>
        <section className="bg-brand py-14 text-white">
          <div className="container-x">
            <h2 className="mb-10 text-center text-3xl font-semibold">Why Choose Us</h2>
            <motion.div
              className="grid grid-cols-2 gap-6 lg:grid-cols-5"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {[
                [ShieldCheck, 'Certified quality'],
                [Leaf, 'Natural ingredients'],
                [FlaskConical, 'Lab tested'],
                [Truck, 'Nationwide delivery'],
                [Headphones, 'Friendly support'],
              ].map(([I, t]) => (
                <motion.div key={t} variants={staggerItem} className="text-center">
                  <span className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-white/10">
                    <I />
                  </span>
                  <p className="text-sm font-medium">{t}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Customer Reviews ── */}
      <ScrollReveal>
        <section className="relative py-14">
          <img src={IMG.reviewsBg} alt="" aria-hidden="true" loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-40" />
          <div className="container-x relative">
            <SectionHeading title="Customer Reviews" subtitle="4.8 average — verified reviews" />
            <motion.div
              className="grid gap-5 md:grid-cols-2 lg:grid-cols-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {testimonials.map((t) => (
                <motion.figure
                  key={t.id}
                  variants={staggerItem}
                  className="rounded-2xl bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <Stars rating={t.rating} />
                  <blockquote className="mt-3 text-sm text-gray-600">{t.text}</blockquote>
                  <figcaption className="mt-4 flex items-center gap-3">
                    <img src={t.avatar} alt="" className="h-9 w-9 rounded-full" loading="lazy" />
                    <span className="text-sm font-medium">
                      {t.name}
                      <span className="block text-xs font-normal text-gray-400">{t.city} — Verified</span>
                    </span>
                  </figcaption>
                </motion.figure>
              ))}
            </motion.div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Blog ── */}
      <section className="container-x py-14">
        <SectionHeading title="Wellness Club" subtitle="Tips and guides" />
        <Carousel itemClass="w-[80%] sm:w-[48%] lg:w-[31.5%]">
          {blogs.slice(0, 6).map((b) => (
            <article key={b.slug} className="group overflow-hidden rounded-2xl border hover:shadow-lg transition-shadow">
              <Link to={`/blog/${b.slug}`} className="block aspect-[3/2] overflow-hidden">
                <img src={b.image} alt="" loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </Link>
              <div className="p-5">
                <p className="text-xs text-accent">{b.category}</p>
                <h3 className="mt-1 line-clamp-2 min-h-[3rem] font-semibold">
                  <Link to={`/blog/${b.slug}`} className="hover:text-brand">{b.title}</Link>
                </h3>
                <Link to={`/blog/${b.slug}`} className="mt-2 inline-block text-sm text-brand">Continue reading</Link>
              </div>
            </article>
          ))}
        </Carousel>
      </section>

      {/* ── Instagram ── */}
      <ScrollReveal>
        <section className="container-x pb-14">
          <SectionHeading title="Follow us on Instagram" subtitle="@swapnearn" />
          <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <a key={n} href="#" className="group aspect-square overflow-hidden rounded-xl">
                <img src={IMG.instagram(n)} alt={`Instagram post ${n}`} loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
              </a>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ── Newsletter ── */}
      <ScrollReveal>
        <section className="container-x pb-4">
          <div className="rounded-3xl bg-brand-light px-6 py-12 text-center">
            <h2 className="text-2xl font-semibold">Join our newsletter</h2>
            <p className="mt-2 text-sm text-gray-600">Get wellness tips and early access to offers.</p>
            <div className="mx-auto mt-6 max-w-md text-left"><NewsletterForm /></div>
          </div>
        </section>
      </ScrollReveal>

      <div className="container-x py-8">
        <img src={IMG.partners} alt="Partner logos" loading="lazy" className="mx-auto w-full max-w-3xl" />
      </div>
    </>
  );
}
