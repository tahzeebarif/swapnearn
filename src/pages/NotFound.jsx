import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <div className="container-x py-24 text-center">
      <p className="text-7xl font-bold text-brand">404</p>
      <h1 className="mt-3 text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-gray-500">The page you are looking for does not exist.</p>
      <div className="mt-6 flex justify-center gap-3"><Link to="/" className="btn-primary">Go home</Link><Link to="/collections/all-products" className="btn-outline">Shop now</Link></div>
    </div>
  );
}
