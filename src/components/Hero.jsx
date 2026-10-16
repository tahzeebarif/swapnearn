import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { products } from '../data/mockProducts';
import ProductCard from './ProductCard';

// Number of visible items (center + 2 each side)
const VISIBLE_COUNT = 5;

export default function Hero() {
    const [centerIdx, setCenterIdx] = useState(0);
    const [isHover, setIsHover] = useState(false);
    const intervalRef = useRef(null);

    // Auto‑rotate every 5 seconds when not hovered
    useEffect(() => {
        if (!isHover) {
            intervalRef.current = setInterval(() => {
                setCenterIdx((i) => (i + 1) % products.length);
            }, 5000);
        }
        return () => clearInterval(intervalRef.current);
    }, [isHover]);

    const goPrev = () => setCenterIdx((i) => (i - 1 + products.length) % products.length);
    const goNext = () => setCenterIdx((i) => (i + 1) % products.length);

    // Compute visible items with their relative offset
    const visible = [];
    const half = Math.floor(VISIBLE_COUNT / 2);
    for (let offset = -half; offset <= half; offset++) {
        const idx = (centerIdx + offset + products.length) % products.length;
        visible.push({ product: products[idx], offset });
    }

    // Touch / swipe handling using Framer Motion
    const handleDragEnd = (event, info) => {
        if (info.offset.x > 50) goPrev();
        else if (info.offset.x < -50) goNext();
    };

    return (
        <section
            className="hero-bg py-16 md:py-24 lg:py-32 relative overflow-hidden"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            {/* Background decorative gradient and blobs */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-0 left-1/2 w-96 h-96 bg-green-200 rounded-full filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-1/2 w-80 h-80 bg-green-300 rounded-full filter blur-2xl opacity-25 translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="container-x relative z-10 text-center">
                <motion.h1
                    className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Wellness, Elevated
                </motion.h1>
                <motion.p
                    className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    Discover premium, science‑backed products that nurture your body and mind.
                </motion.p>
            </div>

            {/* 3D Carousel */}
            <div
                className="mt-12 relative flex justify-center items-center perspective-1000 h-96"
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                {/* Arrow controls */}
                <button
                    onClick={goPrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-brand text-brand rounded-full p-2 shadow-lg transition-colors"
                    aria-label="Previous"
                >
                    <ArrowLeft size={20} />
                </button>
                <button
                    onClick={goNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-brand text-brand rounded-full p-2 shadow-lg transition-colors"
                    aria-label="Next"
                >
                    <ArrowRight size={20} />
                </button>

                {/* Draggable carousel track */}
                <motion.div
                    className="relative w-full h-full flex items-center justify-center"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleDragEnd}
                    style={{ cursor: isHover ? 'default' : 'grab' }}
                >
                    {visible.map(({ product, offset }) => {
                        const isCenter = offset === 0;
                        const scale = isCenter ? 1.2 : Math.abs(offset) === 1 ? 1.0 : 0.8;
                        const opacity = isCenter ? 1 : Math.abs(offset) === 1 ? 0.9 : 0.7;
                        const translateX = offset * 150;
                        const rotateY = offset * 15;
                        const zIndex = isCenter ? 10 : Math.abs(offset) === 1 ? 5 : 1;
                        const variant = isCenter ? 'hero' : undefined; // imageOnly not needed now
                        return (
                            <motion.div
                                key={product.id}
                                className="absolute"
                                style={{
                                    transform: `translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale})`,
                                    opacity,
                                    zIndex,
                                }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 0.6 }}
                            >
                                <ProductCard product={product} variant={variant} />
                                {isCenter && (
                                    <div className="mt-4 text-lg font-semibold text-gray-900">
                                        {product.title}
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
