import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="container-x py-4 text-xs text-gray-500">
      <ol className="flex flex-wrap items-center gap-1">
        <li><Link to="/" className="hover:text-brand">Home</Link></li>
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1"><ChevronRight size={12} />
            {it.to ? <Link to={it.to} className="hover:text-brand">{it.label}</Link> : <span className="text-gray-800" aria-current="page">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
