import { Link } from 'react-router-dom';
export default function CategoryCard({ collection }) {
  return (
    <Link to={`/collections/${collection.slug}`} className="group flex flex-col items-center gap-3 text-center">
      <span className="block aspect-square w-full overflow-hidden rounded-full border-2 border-transparent bg-brand-light transition group-hover:border-brand">
        <img src={collection.image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
      </span>
      <span className="text-sm font-medium group-hover:text-brand">{collection.title}</span>
    </Link>
  );
}
