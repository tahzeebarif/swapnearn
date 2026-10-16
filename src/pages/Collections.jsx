import Breadcrumbs from '../components/Breadcrumbs';
import CategoryCard from '../components/CategoryCard';
import { collections } from '../data/mockProducts';
export default function Collections() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Collections' }]} />
      <div className="container-x pb-10">
        <h1 className="mb-8 text-3xl font-semibold">Shop by Category</h1>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">{collections.map((c) => <CategoryCard key={c.slug} collection={c} />)}</div>
      </div>
    </>
  );
}
