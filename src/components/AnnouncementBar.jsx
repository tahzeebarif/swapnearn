/**
 * AnnouncementBar.jsx
 *
 * Single horizontal scrolling ticker — all text moves together on one
 * continuous line. Uses the `marquee` keyframe already defined in
 * tailwind.config.js (transform: translateX(0 → -50%)).
 *
 * The inner content is duplicated so the loop is seamless:
 *  [ ...text... | ...text... ]
 *       ↑ visible window scrolls through ↑
 *
 * Leaf icons: pure inline SVG, no extra dependency.
 */

const LEAF = (
  <svg
    aria-hidden="true"
    viewBox="0 0 16 16"
    className="inline-block h-6 w-4 fill-white/80 mx-2 flex-shrink-0"
  >
    <path d="M8 1C4 1 1 5 1 9c0 3.3 2.5 5.7 5.5 5.9C7 13.3 7 11.6 7 10c0-3 1-5 4-6-1 2-1 4 0 6 .8 1.5 2 2.5 3 2.6C13.6 11.5 15 9.9 15 8c0-4-3-7-7-7z" />
  </svg>
);

const DOT = (
  <span aria-hidden="true" className="mx-3 opacity-50 text-white font-bold flex-shrink-0">
    •
  </span>
);

function Segment() {
  return (
    <span className="flex items-center whitespace-nowrap">
      {LEAF}
      <span className="font-semibold tracking-wide">Sukooon</span>
      <span className="mx-1 opacity-80 font-normal"> • All Products</span>
      {DOT}
      {LEAF}
      <span className="font-semibold tracking-wide">Life Aura</span>
      <span className="mx-1 opacity-80 font-normal"> • All Products</span>
      {DOT}
      {LEAF}
      <span className="font-semibold tracking-wide">
        Free Delivery on Orders Above Rs.&nbsp;3,000
      </span>
      {/* spacer so end of one repeat meets start of the next cleanly */}
      <span className="inline-block w-16 flex-shrink-0" aria-hidden="true" />
    </span>
  );
}

export default function AnnouncementBar() {
  return (
    <div
      className="bg-[#1b5e3b] py-1.5 overflow-hidden"
      role="region"
      aria-label="Store announcements"
    >
      {/*
        The track is twice as wide as the viewport.
        Two identical <Segment /> copies sit end-to-end.
        The marquee keyframe slides the whole track left by 50% of its own
        width — which is exactly the width of one segment — then loops.
      */}
      <div
        className="flex w-max animate-marquee items-center"
        style={{ willChange: 'transform' }}
      >
        {/* First copy */}
        <span className="flex items-center text-[11px] sm:text-xs text-white font-medium">
          <Segment />
        </span>
        {/* Second copy — seamless loop */}
        <span
          className="flex items-center text-[11px] sm:text-xs text-white font-medium"
          aria-hidden="true"
        >
          <Segment />
        </span>
      </div>
    </div>
  );
}
