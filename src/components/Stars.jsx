import { Star } from 'lucide-react';
export default function Stars({ rating = 0, size = 14 }) {
  return (
    <span className="inline-flex" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} size={size} className={n <= Math.round(rating) ? 'fill-accent text-accent' : 'text-gray-300'} />
      ))}
    </span>
  );
}
