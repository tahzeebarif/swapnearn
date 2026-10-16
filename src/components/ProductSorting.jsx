export default function ProductSorting({ value, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="text-gray-600">Sort by</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="input !w-auto !py-2">
        <option value="featured">Featured</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating">Top Rated</option>
        <option value="title">Name: A-Z</option>
      </select>
    </label>
  );
}
