import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
export default function Carousel({ children, itemClass = 'w-[45%] sm:w-[30%] lg:w-[22%]' }) {
  const ref = useRef(null);
  const scroll = (dir) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: 'smooth' });
  return (
    <div className="relative">
      <button type="button" aria-label="Previous" onClick={() => scroll(-1)} className="absolute -left-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white shadow-md hover:bg-brand hover:text-white md:grid"><ChevronLeft size={18} /></button>
      <div ref={ref} className="no-scrollbar flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth sm:gap-4">
        {Array.isArray(children) ? children.map((c, i) => <div key={i} className={`shrink-0 snap-start ${itemClass}`}>{c}</div>) : children}
      </div>
      <button type="button" aria-label="Next" onClick={() => scroll(1)} className="absolute -right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white shadow-md hover:bg-brand hover:text-white md:grid"><ChevronRight size={18} /></button>
    </div>
  );
}
