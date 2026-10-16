import { Link, useParams } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import { getBlog } from '../services/productService';
import useAsync from '../hooks/useAsync';
export default function BlogDetails() {
  const { slug } = useParams();
  const { data: b, loading } = useAsync(() => getBlog(slug), [slug]);
  if (loading) return <div className="container-x py-20 text-center">Loading...</div>;
  if (!b) return <div className="container-x py-20 text-center"><h1 className="text-2xl font-semibold">Article not found</h1><Link to="/blog" className="btn-primary mt-6">Back to blog</Link></div>;
  return (
    <>
      <Breadcrumbs items={[{ label: 'Wellness Club', to: '/blog' }, { label: b.title }]} />
      <article className="container-x max-w-3xl pb-10">
        <p className="text-xs text-accent">{b.category} - {b.date}</p>
        <h1 className="mt-2 text-3xl font-semibold">{b.title}</h1>
        <img src={b.image} alt="" className="my-6 w-full rounded-2xl" />
        <div className="space-y-4 leading-relaxed text-gray-700">{b.body.map((p, i) => <p key={i}>{p}</p>)}</div>
        <Link to="/blog" className="btn-outline mt-8">Back to all articles</Link>
      </article>
    </>
  );
}
