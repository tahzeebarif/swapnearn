import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import { getBlogs } from '../services/productService';
import useAsync from '../hooks/useAsync';
export default function BlogList() {
  const { data, loading, error } = useAsync(getBlogs, []);
  return (
    <>
      <Breadcrumbs items={[{ label: 'Wellness Club' }]} />
      <div className="container-x pb-10">
        <h1 className="mb-8 text-3xl font-semibold">Wellness Club</h1>
        {error && <p role="alert" className="text-red-600">Could not load articles.</p>}
        {loading ? <p>Loading...</p> : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((b) => (
              <article key={b.slug} className="group overflow-hidden rounded-2xl border transition hover:shadow-lg">
                <Link to={`/blog/${b.slug}`} className="block aspect-[3/2] overflow-hidden"><img src={b.image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></Link>
                <div className="p-5"><p className="text-xs text-accent">{b.category} - {b.date}</p><h2 className="mt-1 font-semibold"><Link to={`/blog/${b.slug}`} className="hover:text-brand">{b.title}</Link></h2><p className="mt-2 text-sm text-gray-500">{b.excerpt}</p><Link to={`/blog/${b.slug}`} className="mt-3 inline-block text-sm font-medium text-brand">Continue reading</Link></div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
