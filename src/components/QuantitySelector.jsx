import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({ value, onChange, min = 1, max = 99, small = false }) {
  const s = small ? 'h-8 w-8 text-xs' : 'h-11 w-11 text-sm';
  return (
    <div className="inline-flex items-center rounded-full quantity-pill-3d p-0.5 transition-all">
      <button
        type="button"
        aria-label="Decrease quantity"
        className={`${s} quantity-btn-3d grid place-items-center rounded-full text-gray-700 hover:bg-gray-200/80 active:bg-gray-300 active:scale-90 disabled:opacity-30 disabled:pointer-events-none transition`}
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
      >
        <Minus size={14} className="stroke-[2.5]" />
      </button>
      <span className={`${small ? 'w-6 text-xs' : 'w-9 text-sm'} text-center font-bold text-gray-800 select-none`} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        className={`${s} quantity-btn-3d grid place-items-center rounded-full text-gray-700 hover:bg-gray-200/80 active:bg-gray-300 active:scale-90 disabled:opacity-30 disabled:pointer-events-none transition`}
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
      >
        <Plus size={14} className="stroke-[2.5]" />
      </button>
    </div>
  );
}

