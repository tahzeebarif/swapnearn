import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Send, Bookmark, ShoppingBag, Check } from 'lucide-react';
import Stars from './Stars';
import { useCart } from '../context/CartContext';

export default function BundleCard({ product }) {
    const { addItem, setOpen } = useCart();
    const [added, setAdded] = useState(false);
    const [particles, setParticles] = useState([]);

    const handleOrderNow = (e) => {
        e.preventDefault();
        e.stopPropagation();

        addItem(product, 1);
        setAdded(true);
        setOpen(true);

        const id = Date.now();
        setParticles((prev) => [...prev, id]);
        setTimeout(() => {
            setParticles((prev) => prev.filter((p) => p !== id));
            setAdded(false);
        }, 1200);
    };

    const discount = product.discountPercent || (product.compareAtPrice ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100) : 25);
    const savings = product.saveAmount || (product.compareAtPrice ? product.compareAtPrice - product.price : 1250);

    return (
        <article className="group relative flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-200/80 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_35px_-8px_rgba(0,0,0,0.18)] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08)]">
            {/* Top Colorful Deal Poster */}
            <div className={`relative bg-gradient-to-b ${product.bannerColor || 'from-[#ec4899] to-[#db2777]'} p-3 sm:p-4 text-white pb-5`}>
                {/* Deal Header & Discount Badge */}
                <div className="flex items-start justify-between gap-2">
                    <div className="font-extrabold tracking-tight leading-tight">
                        <div className="text-xs sm:text-sm font-semibold opacity-95">
                            {product.dealHeadlineTop || 'Buy Two 30mL'}
                        </div>
                        <div className="text-base sm:text-lg font-black drop-shadow-xs">
                            {product.dealHeadlineBottom || 'Get One 10mL For Free'}
                        </div>
                    </div>
                    <span className="shrink-0 rounded-full bg-[#facc15] px-2.5 py-0.5 text-xs font-black text-black shadow-md">
                        -{discount}%
                    </span>
                </div>

                {/* Polaroid Inset Card */}
                <div className="relative mx-auto mt-3 max-w-[240px] w-full rounded-xl bg-white p-2 shadow-lg sm:p-2.5 text-gray-800">
                    {/* Polaroid Mini Header */}
                    <div className="mb-1.5 flex items-center justify-between px-1 text-[10px] font-bold text-gray-400">
                        <span className="uppercase tracking-wider text-gray-500 font-extrabold">
                            {product.brandName || 'SWAPNEARN'}
                        </span>
                        <span className="tracking-widest">•••</span>
                    </div>

                    {/* Product Image Container */}
                    <Link to={`/products/${product.handle}`} className="relative block aspect-square w-full overflow-hidden rounded-lg bg-gray-50">
                        <img
                            src={product.images[0]}
                            alt={product.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Circular 'Free' Badge pointing to the bonus item */}
                        <span className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-[#ef4444] text-[10px] font-black text-white shadow-md ring-2 ring-white animate-pulse">
                            Free
                        </span>
                    </Link>

                    {/* Instagram-style Reaction Bar */}
                    <div className="mt-2 flex items-center justify-between px-1 text-gray-600">
                        <div className="flex items-center gap-2.5">
                            <Heart size={14} className="fill-[#ef4444] text-[#ef4444]" />
                            <MessageCircle size={14} />
                            <Send size={14} />
                        </div>
                        <Bookmark size={14} />
                    </div>
                </div>

                {/* Save Rs. X Floating Tag */}
                <div className="absolute -bottom-3 left-0 right-0 flex justify-center z-10">
                    <span className="rounded-lg bg-[#18181b] px-4 py-1 text-xs font-black uppercase tracking-wide text-white shadow-lg border border-white/10">
                        Save Rs. {savings.toLocaleString()}
                    </span>
                </div>
            </div>

            {/* Card Info & Order CTA */}
            <div className="flex flex-1 flex-col justify-between p-4 pt-6 bg-white">
                <div>
                    <Link to={`/products/${product.handle}`}>
                        <h3 className="min-h-[2.75rem] text-xs sm:text-sm font-bold text-gray-900 leading-snug hover:text-brand transition line-clamp-2">
                            {product.title}
                        </h3>
                    </Link>

                    {/* Review Stars */}
                    <div className="mt-2 flex items-center gap-1.5">
                        <Stars rating={product.rating} />
                        <span className="text-[11px] font-medium text-gray-500">
                            {product.reviewCount} reviews
                        </span>
                    </div>

                    {/* Pricing */}
                    <div className="mt-3 flex items-baseline gap-2">
                        {product.compareAtPrice && (
                            <span className="text-xs sm:text-sm text-gray-400 line-through">
                                Rs. {product.compareAtPrice.toLocaleString()}
                            </span>
                        )}
                        <span className="text-base sm:text-lg font-black text-[#c25e36]">
                            Rs. {product.price.toLocaleString()}
                        </span>
                    </div>
                </div>

                {/* 3D Order Now Button */}
                <div className="relative mt-4">
                    <button
                        type="button"
                        onClick={handleOrderNow}
                        className="btn-3d btn-3d-rust w-full flex items-center justify-center gap-2 py-2.5 text-xs font-black uppercase tracking-wider text-white"
                    >
                        {added ? (
                            <>
                                <Check size={14} className="animate-scale-in" /> ADDED!
                            </>
                        ) : (
                            <>
                                ORDER NOW <ShoppingBag size={14} />
                            </>
                        )}
                    </button>

                    {/* Floating +1 feedback */}
                    {particles.map((p) => (
                        <span
                            key={p}
                            className="pointer-events-none absolute -top-4 right-6 animate-float-up text-xs font-extrabold text-[#c25e36]"
                        >
                            +1
                        </span>
                    ))}
                </div>
            </div>
        </article>
    );
}
