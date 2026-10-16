import { discountPct, formatPrice } from '../utils/format';
export default function PriceDisplay({ price, compareAtPrice, large = false }) {
  const pct = discountPct(price, compareAtPrice);
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className={`font-semibold text-brand ${large ? 'text-2xl' : 'text-base'}`}>{formatPrice(price)}</span>
      {pct > 0 && (
        <>
          <span className={`text-gray-400 line-through ${large ? 'text-base' : 'text-sm'}`}>{formatPrice(compareAtPrice)}</span>
          {large && <span className="rounded bg-sale px-2 py-0.5 text-xs font-semibold text-white">Save {pct}%</span>}
        </>
      )}
    </div>
  );
}
