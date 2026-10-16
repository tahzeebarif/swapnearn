import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductGrid from '../components/ProductGrid';
import ProductSorting from '../components/ProductSorting';
import { brands, products } from '../data/mockProducts';

export default function BrandPage() {
    const { brandSlug } = useParams();
    const [sort, setSort] = useState('featured');

    // Find target brand or default to the first
    const currentBrand = brands.find((b) => b.slug === brandSlug || b.id === brandSlug) || brands[0];

    // Filter products belonging to this brand
    const brandProducts = useMemo(() => {
        let list = products.filter((p) => p.brandId === currentBrand.id);
        const sorters = {
            'price-asc': (a, b) => a.price - b.price,
            'price-desc': (a, b) => b.price - a.price,
            'rating': (a, b) => b.rating - a.rating,
            'title': (a, b) => a.title.localeCompare(b.title),
        };
        if (sorters[sort]) list.sort(sorters[sort]);
        return list;
    }, [currentBrand.id, sort]);

    return (
        <>
            <Breadcrumbs
                items={[
                    { label: 'House of Brands', to: '/' },
                    { label: currentBrand.name },
                ]}
            />

            {/* Brand Hero Showcase */}
            <section className={`relative overflow-hidden bg-gradient-to-br ${currentBrand.headerBg} border-b border-gray-200/80 py-10 sm:py-16`}>
                <div className="container-x relative z-10">
                    <div className="max-w-3xl">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className="inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-gray-800 shadow-xs">
                                <Sparkles size={12} className="text-accent" />
                                A SwapnEarn Flagship Brand
                            </span>
                            <span className="rounded-full bg-black/80 text-white px-3 py-1 text-xs font-semibold">
                                {currentBrand.badgeText}
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
                            {currentBrand.name}
                        </h1>
                        <p className="mt-2 text-base sm:text-lg font-medium text-gray-800">
                            {currentBrand.tagline}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-gray-600 max-w-2xl">
                            {currentBrand.description}
                        </p>

                        {/* Quality Seals */}
                        <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-gray-700">
                            <span className="flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-full shadow-xs">
                                <ShieldCheck size={16} className="text-brand" /> 100% Genuine Formula
                            </span>
                            <span className="flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-full shadow-xs">
                                <Truck size={16} className="text-brand" /> Fast Nationwide Delivery
                            </span>
                            <span className="flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-full shadow-xs">
                                <RotateCcw size={16} className="text-brand" /> 7-Day Easy Returns
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Catalog for Brand */}
            <div className="container-x py-10">
                <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-5">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                            {currentBrand.name} Products
                        </h2>
                        <p className="mt-0.5 text-xs sm:text-sm text-gray-500">
                            Showing {brandProducts.length} curated products
                        </p>
                    </div>
                    <ProductSorting value={sort} onChange={setSort} />
                </div>

                <div className="mt-8">
                    <ProductGrid
                        products={brandProducts}
                        cols="grid-cols-2 lg:grid-cols-4"
                        emptyText={`No products found for ${currentBrand.name}.`}
                    />
                </div>

                {/* Explore Other Brands Footer Section */}
                <div className="mt-16 rounded-3xl bg-gray-50 p-6 sm:p-10 border border-gray-100 text-center">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                        Explore More Brands by SwapnEarn
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-gray-500">
                        Switch between our specialized wellness, skincare, and hair care lines
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                        {brands.map((b) => (
                            <Link
                                key={b.id}
                                to={`/brands/${b.slug}`}
                                className={`rounded-full px-4 py-2 text-xs font-bold transition ${b.id === currentBrand.id
                                        ? 'bg-black text-white shadow-md'
                                        : 'bg-white border border-gray-200 text-gray-700 hover:border-brand hover:text-brand'
                                    }`}
                            >
                                {b.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
