import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductSorting from '../components/ProductSorting';
import ProductGrid from '../components/ProductGrid';
import BundleCard from '../components/BundleCard';
import { collections } from '../data/mockProducts';
import { getProducts } from '../services/productService';
import useAsync from '../hooks/useAsync';

const tagMap = { 'new-arrivals': ['New Arrivals', 'new'], bundles: ['Bundles', 'bundle'], 'best-sellers': ['Best Sellers', 'best'] };
const PAGE = 8;

export default function Shop() {
  const { slug = 'all-products' } = useParams();
  const [sort, setSort] = useState('featured');
  const [visible, setVisible] = useState(PAGE);

  const special = tagMap[slug];
  const col = collections.find((c) => c.slug === slug);
  const title = special?.[0] || col?.title || 'All Products';
  const category = special || slug === 'all-products' ? undefined : slug;

  useEffect(() => { setVisible(PAGE); }, [slug, sort]);
  const { data, loading, error } = useAsync(
    () => getProducts({ category, tag: special?.[1], sort }),
    [slug, sort]
  );

  const isBundlesPage = slug === 'bundles';

  return (
    <>
      <Breadcrumbs items={[{ label: 'Collections', to: '/collections' }, { label: title }]} />
      <div className="container-x pb-10">
        <h1 className="text-3xl font-extrabold text-gray-900">{title}</h1>
        <p className="mt-1 text-sm text-gray-500">{loading ? 'Loading...' : `${data?.length || 0} products`}</p>
        <div className="mt-6">
          <div>
            <div className="mb-5 flex items-center justify-end gap-3">
              <div><ProductSorting value={sort} onChange={setSort} /></div>
            </div>

            {isBundlesPage ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {data?.slice(0, visible).map((p) => (
                  <BundleCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <ProductGrid products={data?.slice(0, visible)} loading={loading} error={error} cols="grid-cols-2 lg:grid-cols-4" emptyText="No products match your filters." />
            )}

            {data && visible < data.length && (
              <div className="mt-8 text-center"><button type="button" onClick={() => setVisible((v) => v + PAGE)} className="btn-outline">Load more ({data.length - visible} left)</button></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
