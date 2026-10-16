import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { brands } from '../data/mockProducts';

// Botanical Leaf / Petal SVG for decorative background flourish
function LeafFlourish({ color = '#81c784' }) {
    return (
        <svg
            className="pointer-events-none absolute -left-2 -top-2 h-20 w-20 opacity-30 select-none"
            viewBox="0 0 100 100"
            fill={color}
        >
            <path d="M10,20 C30,10 60,15 80,40 C60,65 30,60 10,20 Z" />
            <path d="M40,50 C55,40 75,45 85,65 C70,80 50,75 40,50 Z" opacity="0.6" />
            <path d="M15,55 C28,45 45,50 55,68 C42,80 25,75 15,55 Z" opacity="0.4" />
        </svg>
    );
}

function PetalFlourish({ color = '#f06292' }) {
    return (
        <svg
            className="pointer-events-none absolute -right-2 -bottom-2 h-20 w-20 opacity-25 select-none"
            viewBox="0 0 100 100"
            fill={color}
        >
            <path d="M80,80 C60,90 30,85 10,60 C30,35 60,40 80,80 Z" />
            <path d="M60,50 C45,60 25,55 15,35 C30,20 50,25 60,50 Z" opacity="0.6" />
        </svg>
    );
}

export default function ChooseBrandSection() {
    return (
        <section className="bg-gradient-to-b from-[#fbfdfa] to-white py-14 sm:py-20 border-b border-gray-100">
            <div className="container-x">
                {/* Section Heading matching screenshot */}
                <div className="text-center mb-10 sm:mb-14">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-3 py-1 text-xs font-semibold text-brand mb-2.5">
                        <Sparkles size={13} className="text-accent" />
                        <span>House of Brands by SwapnEarn</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-wider text-gray-900">
                        CHOOSE YOUR BRAND
                    </h2>
                    <p className="mt-2 text-sm text-gray-500 max-w-xl mx-auto">
                        Explore dedicated specialized ranges from our verified wellness and beauty companies
                    </p>
                </div>

                {/* 4 Brand Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {brands.map((brand) => (
                        <article
                            key={brand.id}
                            className="group flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                        >
                            {/* Top Graphic Showcase Banner */}
                            <div
                                className={`relative h-52 sm:h-56 w-full overflow-hidden bg-gradient-to-br ${brand.headerBg} p-4 flex flex-col justify-between`}
                            >
                                {/* Decorative Botanical Flourishes */}
                                <LeafFlourish color={brand.petalColor} />
                                <PetalFlourish color={brand.petalColor} />

                                {/* Brand Logo & Tag in Card Header */}
                                <div className="relative z-10 flex items-start justify-between">
                                    <div className="bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/60 shadow-xs">
                                        <span className="block text-xs font-black tracking-tight text-gray-900">
                                            {brand.logoText}
                                        </span>
                                        <span className="block text-[8px] font-semibold uppercase tracking-wider text-gray-500">
                                            {brand.logoSub}
                                        </span>
                                    </div>
                                    <span className="rounded-full bg-white/70 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-gray-600 shadow-xs">
                                        {brand.badgeText}
                                    </span>
                                </div>

                                {/* Product Showcase Bottles Array */}
                                <div className="relative z-10 mt-auto flex items-end justify-center gap-1.5 pt-2">
                                    {brand.productPreviewImages.map((img, idx) => (
                                        <div
                                            key={idx}
                                            className={`relative transition-transform duration-300 group-hover:scale-105 ${idx === 1
                                                    ? 'h-24 sm:h-28 z-20 -mb-1'
                                                    : 'h-18 sm:h-20 z-10 opacity-90'
                                                }`}
                                        >
                                            <img
                                                src={img}
                                                alt={`${brand.name} preview`}
                                                className="h-full w-auto object-contain drop-shadow-md"
                                                loading="lazy"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Bottom Card Body */}
                            <div className="flex flex-1 flex-col items-center p-5 text-center">
                                <h3 className="text-base sm:text-lg font-bold tracking-tight text-gray-900">
                                    {brand.name}
                                </h3>
                                <p className="mt-2 text-xs sm:text-sm text-gray-500 line-clamp-2 min-h-[2.5rem]">
                                    {brand.tagline}
                                </p>

                                {/* 3D Tactile View Collection Button */}
                                <div className="mt-6 w-full pt-1">
                                    <Link
                                        to={`/brands/${brand.slug}`}
                                        className="btn-3d btn-3d-dark w-full !py-2.5 !text-xs uppercase tracking-wider group-hover:brightness-110"
                                    >
                                        <span>View Collection</span>
                                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
