import { useSearchParams } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import SearchBar from '../components/SearchBar';
import ProductGrid from '../components/ProductGrid';
import { getProducts } from '../services/productService';
import { correctQuery } from '../hooks/useFuzzySearch';
import useAsync from '../hooks/useAsync';

export default function SearchResults() {
  const [params] = useSearchParams();
  const q = params.get('q') || '';
  const corrected = q ? correctQuery(q) : '';
  const spellingCorrected =
    q && corrected.trim().toLowerCase() !== q.trim().toLowerCase();

  const { data, loading, error } = useAsync(() => getProducts({ search: q }), [q]);

  return (
    <>
      <Breadcrumbs items={[{ label: 'Search' }]} />
      <div className="container-x pb-10">
        {/* Heading */}
        <div className="mb-4">
          {q ? (
            <>
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                Results for &ldquo;
                <span className="text-brand">{q}</span>
                &rdquo;
              </h1>
              {spellingCorrected && (
                <p className="mt-1 text-sm text-gray-500">
                  Showing results for &ldquo;
                  <span className="font-semibold text-brand">{corrected}</span>
                  &rdquo; &mdash; we corrected the spelling automatically.
                </p>
              )}
            </>
          ) : (
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              Search our store
            </h1>
          )}
        </div>

        {/* Search bar (pre-seeded with current query) */}
        <div className="my-5 max-w-xl">
          <SearchBar key={q} defaultValue={q} />
        </div>

        {/* Results */}
        {!q ? (
          <p className="text-gray-500">Type something above to search our products.</p>
        ) : (
          <ProductGrid
            products={data}
            loading={loading}
            error={error}
            cols="grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            emptyText={
              spellingCorrected
                ? `No products found matching "${corrected}". Try another keyword.`
                : `No products found for "${q}". Try a different word.`
            }
          />
        )}
      </div>
    </>
  );
}
