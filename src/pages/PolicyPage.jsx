import Breadcrumbs from '../components/Breadcrumbs';
import { policies } from '../data/mockProducts';
export default function PolicyPage({ policy }) {
  const p = policies[policy];
  return (
    <>
      <Breadcrumbs items={[{ label: p.title }]} />
      <div className="container-x max-w-3xl pb-10">
        <h1 className="mb-2 text-3xl font-semibold">{p.title}</h1>
        <p className="mb-6 rounded bg-yellow-50 p-3 text-xs text-yellow-800">Demo content - replace with your final legal text before launch.</p>
        <div className="space-y-4 leading-relaxed text-gray-700">{p.body.map((t, i) => <p key={i}>{t}</p>)}</div>
      </div>
    </>
  );
}
