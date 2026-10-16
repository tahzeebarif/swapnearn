import { PackageSearch, AlertTriangle } from 'lucide-react';
import ProductCard from './ProductCard';

export function ProductSkeleton() {
  return <div className="animate-pulse overflow-hidden rounded-2xl border border-gray-100"><div className="aspect-square bg-gray-100" /><div className="space-y-2 p-4"><div className="h-3 w-1/2 rounded bg-gray-100" /><div className="h-4 w-4/5 rounded bg-gray-100" /><div className="h-4 w-1/3 rounded bg-gray-100" /></div></div>;
}

export default function ProductGrid({ products, loading, error, cols = 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4', emptyText = 'No products found.' }) {
  if (error) return <div role="alert" className="grid place-items-center gap-2 rounded-xl bg-red-50 p-10 text-center text-red-700"><AlertTriangle /> <p>Something went wrong loading products.</p></div>;
  if (loading) return <div className={`grid gap-3 sm:gap-5 ${cols}`}>{Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}</div>;
  if (!products?.length) return <div className="grid place-items-center gap-2 rounded-xl bg-gray-50 p-10 text-center text-gray-600"><PackageSearch size={32} /><p>{emptyText}</p></div>;
  return <div className={`grid gap-3 sm:gap-5 ${cols}`}>{products.map((p) => <ProductCard key={p.id} product={p} />)}</div>;
}
