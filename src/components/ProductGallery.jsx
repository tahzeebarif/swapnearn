import { useState } from 'react';
export default function ProductGallery({ images, title }) {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col gap-3 md:flex-row-reverse">
      <div className="aspect-square flex-1 overflow-hidden rounded-2xl bg-brand-light">
        <img src={images[active]} alt={`${title} - view ${active + 1}`} className="h-full w-full object-cover" />
      </div>
      <div className="flex gap-2 md:flex-col">
        {images.map((src, i) => (
          <button key={i} type="button" onClick={() => setActive(i)} aria-label={`Show image ${i + 1}`} aria-current={i === active}
            className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 ${i === active ? 'border-brand' : 'border-transparent'}`}>
            <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
