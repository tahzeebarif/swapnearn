import { useState } from 'react';
import { Check, ShoppingBag, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function toCartLine(product, variant) {
  return {
    variantId: variant.id,
    productId: product.id,
    handle: product.handle,
    title: product.title,
    variantTitle: variant.title,
    price: variant.price,
    image: product.images[0],
  };
}

export default function AddToCartButton({
  product,
  variant,
  qty = 1,
  className = '',
  label = 'Add to Cart',
  icon = true,
  theme = 'dark', // 'dark' | 'emerald'
  size = 'md', // 'sm' | 'md' | 'lg'
}) {
  const { addItem } = useCart();
  const [done, setDone] = useState(false);
  const [particles, setParticles] = useState([]);

  const click = (e) => {
    addItem(toCartLine(product, variant || product.variants[0]), qty);
    setDone(true);

    // Spawn floating 3D particle tag
    const newId = Date.now();
    setParticles((prev) => [...prev, { id: newId, text: `+${qty}` }]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newId));
    }, 1000);

    setTimeout(() => setDone(false), 1400);
  };

  // Base 3D theme style
  const themeClass = done
    ? 'btn-3d btn-3d-success'
    : theme === 'emerald'
      ? 'btn-3d btn-3d-emerald'
      : 'btn-3d btn-3d-dark';

  const sizeClass = size === 'sm' ? 'text-xs py-2 px-4' : size === 'lg' ? 'text-base py-3.5 px-8' : 'text-sm py-3 px-6';

  return (
    <div className={`relative inline-block ${className.includes('w-full') ? 'w-full' : ''}`}>
      <button
        type="button"
        onClick={click}
        className={`${themeClass} ${sizeClass} w-full overflow-hidden transition-all duration-150 active:scale-[0.98] ${className}`}
      >
        {/* Floating Particles */}
        {particles.map((p) => (
          <span
            key={p.id}
            className="pointer-events-none absolute -top-3 right-4 z-20 animate-fadeUp rounded-full bg-accent px-2 py-0.5 text-[11px] font-extrabold text-white shadow-lg"
          >
            {p.text}
          </span>
        ))}

        {/* 3D Icon Container */}
        <span className={`inline-flex items-center transition-transform duration-300 ${done ? 'scale-110' : 'group-hover:scale-110'}`}>
          {done ? (
            <Check size={18} className="animate-bounce stroke-[2.5]" />
          ) : (
            icon && <ShoppingBag size={18} className="stroke-[2.2] transition-transform duration-200" />
          )}
        </span>

        {/* Label */}
        <span className="relative z-10 uppercase tracking-wider">
          {done ? 'Added to Cart!' : label}
        </span>

        {/* Subtle 3D Sparkle effect on success */}
        {done && <Sparkles size={16} className="text-yellow-200 animate-spin" />}
      </button>
    </div>
  );
}

