import { reviews } from '../data/mockProducts';
import Stars from './Stars';
export default function ReviewSection({ product }) {
  return (
    <section aria-labelledby="reviews-h" className="mt-12 border-t pt-10">
      <h2 id="reviews-h" className="text-xl font-semibold">Customer Reviews</h2>
      <p className="mt-1 text-xs text-gray-500">Demo reviews - sample content, not from real customers.</p>
      <div className="mt-2 flex items-center gap-2"><Stars rating={product.rating || 5} size={18} /><span className="text-sm">{product.rating || 'N/A'} ({product.reviewCount} reviews)</span></div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {reviews.map((r) => (
          <article key={r.id} className="rounded-xl border p-4">
            <Stars rating={r.rating} /><h3 className="mt-2 text-sm font-semibold">{r.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{r.body}</p><p className="mt-3 text-xs text-gray-400">{r.name} - Demo</p>
          </article>
        ))}
      </div>
    </section>
  );
}
