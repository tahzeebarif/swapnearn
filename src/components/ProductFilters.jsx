import { Link } from 'react-router-dom';
import { collections } from '../data/mockProducts';

const ranges = [
  { label: 'Any price', min: '', max: '' },
  { label: 'Under Rs. 1,000', min: '', max: 1000 },
  { label: 'Rs. 1,000 - 2,000', min: 1000, max: 2000 },
  { label: 'Rs. 2,000 - 5,000', min: 2000, max: 5000 },
  { label: 'Above Rs. 5,000', min: 5000, max: '' },
];

export default function ProductFilters({ activeSlug, onReset }) {
  return (
    <aside className="space-y-6" aria-label="Product filters">
      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-900">Categories</h3>
        <ul className="space-y-1.5 text-sm">
          <li>
            <Link
              to="/collections/all-products"
              className={`block rounded-xl px-3 py-2 transition ${activeSlug === 'all-products'
                  ? 'bg-brand text-white font-semibold shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-brand'
                }`}
            >
              All Products
            </Link>
          </li>
          {collections.map((c) => (
            <li key={c.slug}>
              <Link
                to={`/collections/${c.slug}`}
                className={`block rounded-xl px-3 py-2 transition ${activeSlug === c.slug
                    ? 'bg-brand text-white font-semibold shadow-sm'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-brand'
                  }`}
              >
                {c.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
