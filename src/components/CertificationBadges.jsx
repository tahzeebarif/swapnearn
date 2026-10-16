/**
 * CertificationBadges.jsx — "Our Quality Standards"
 *
 * Reference-style design: 3D coin / disc badges, each with its own colour,
 * curved text on the ring, and a cream background with a centred heading.
 *
 *  - Desktop (md+): all 6 coins in one centred row
 *  - Mobile: smooth auto-scrolling marquee (uses your existing `animate-marquee-slow`)
 *  - Pure SVG, no images needed — crisp at any size
 */

/* ─── Certification data ────────────────────────────────────────── */
const CERTS = [
  {
    id: 'fda',
    label: 'U.S. FDA Registered',
    main: '#E9A21B',
    light: '#F7C766',
    dark: '#B97806',
    top: 'FDA REGISTERED FACILITY',
    bottom: 'FDA REGISTERED FACILITY',
    center: (c) => (
      <>
        <text y="-14" textAnchor="middle" fontSize="9" fontWeight="800" fill={c.dark}>U.S.</text>
        <text y="12" textAnchor="middle" fontSize="30" fontWeight="900" fontStyle="italic" fill={c.dark}>FDA</text>
        <text y="26" textAnchor="middle" fontSize="5.5" fontWeight="700" fill={c.dark}>REGISTERED</text>
      </>
    ),
  },
  {
    id: 'iso',
    label: 'ISO 9001:2015',
    main: '#6DBB94',
    light: '#B2E0C8',
    dark: '#2F8A60',
    top: 'CERTIFIED',
    bottom: 'COMPANY',
    center: (c) => (
      <>
        {/* globe */}
        <g fill="none" stroke={c.dark} strokeWidth="1.4">
          <circle cx="0" cy="-8" r="19" />
          <ellipse cx="0" cy="-8" rx="8" ry="19" />
          <line x1="-19" y1="-8" x2="19" y2="-8" />
          <path d="M-16 -17 Q0 -12 16 -17 M-16 1 Q0 -4 16 1" />
        </g>
        <rect x="-17" y="-16" width="34" height="16" rx="2" fill="#fff" fillOpacity="0.85" />
        <text y="-3" textAnchor="middle" fontSize="16" fontWeight="900" fill={c.dark}>ISO</text>
        <text y="26" textAnchor="middle" fontSize="8" fontWeight="800" fill={c.dark}>9001:2015</text>
      </>
    ),
  },
  {
    id: 'drap',
    label: 'DRAP Registered',
    main: '#B547B8',
    light: '#E58FDC',
    dark: '#8A2C8F',
    top: '',
    bottom: '',
    center: (c) => (
      <>
        <text y="-22" textAnchor="middle" fontSize="11" fill={c.dark}>★★★</text>
        <text y="-11" textAnchor="middle" fontSize="6.5" fontWeight="800" fill={c.dark}>MADE IN</text>
        <text y="10" textAnchor="middle" fontSize="22" fontWeight="900" fill={c.dark}>DRAP</text>
        <text y="20" textAnchor="middle" fontSize="6" fontWeight="800" fill={c.dark}>REGISTERED</text>
        <text y="28" textAnchor="middle" fontSize="6" fontWeight="800" fill={c.dark}>FACILITY</text>
      </>
    ),
  },
  {
    id: 'halal',
    label: 'Halal Certified',
    main: '#5FB5AD',
    light: '#A5DDD6',
    dark: '#2F8680',
    top: 'AL-WALIZ',
    bottom: 'CERTIFICATION & TRAINING',
    center: (c) => (
      <>
        <path d="M-14 -22 L-4 -10 L16 -30" fill="none" stroke={c.dark} strokeWidth="2.4"
          strokeLinecap="round" strokeLinejoin="round" />
        <text y="2" textAnchor="middle" fontSize="22" fontWeight="900" fill={c.dark}
          fontFamily="'Noto Naskh Arabic', Georgia, serif">حلال</text>
        <text y="14" textAnchor="middle" fontSize="8" fontWeight="800" fill={c.dark}>HALAL</text>
        <text y="25" textAnchor="middle" fontSize="7" fontStyle="italic" fill={c.dark}>ACTS</text>
      </>
    ),
  },
  {
    id: 'haccp',
    label: 'HACCP Compliant',
    main: '#F08A2E',
    light: '#F9BE85',
    dark: '#C95F0A',
    top: 'HAZARD ANALYSIS',
    bottom: 'CRITICAL CONTROL POINT',
    center: (c) => (
      <>
        <path d="M-12 -14 L-3 -4 L14 -26" fill="none" stroke={c.dark} strokeWidth="3.2"
          strokeLinecap="round" strokeLinejoin="round" />
        <text y="8" textAnchor="middle" fontSize="13" fontWeight="900" fill={c.dark}>HACCP</text>
        <text y="22" textAnchor="middle" fontSize="9" fill={c.dark}>★ ★ ★</text>
      </>
    ),
  },
  {
    id: 'gmp',
    label: 'GMP Certified',
    main: '#D6B54F',
    light: '#EBD78C',
    dark: '#A88A25',
    top: 'GOOD MANUFACTURING PRACTICE',
    bottom: 'GOOD MANUFACTURING PRACTICE',
    center: (c) => (
      <>
        <text y="-20" textAnchor="middle" fontSize="7" fill={c.dark}>★ ★ ★ ★ ★</text>
        <text y="6" textAnchor="middle" fontSize="28" fontWeight="900" fill={c.dark}>GMP</text>
        <text y="16" textAnchor="middle" fontSize="7" fontWeight="800" fill={c.dark}>CERTIFIED</text>
        <path d="M-5 22 L-1 27 L7 18" fill="none" stroke={c.dark} strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
];

/* ─── 3D coin ───────────────────────────────────────────────────── */
const THICKNESS = 16; // how "thick" the disc looks

function Coin({ cert }) {
  const { id, main, light, dark } = cert;
  const topId = `top-${id}`;
  const botId = `bot-${id}`;

  return (
    <svg
      viewBox="0 0 220 210"
      className="w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 overflow-visible"
      role="img"
      aria-label={cert.label}
    >
      <defs>
        <linearGradient id={`edge-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={light} />
          <stop offset="1" stopColor={main} />
        </linearGradient>
        <linearGradient id={`face-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={main} />
          <stop offset="1" stopColor={dark} />
        </linearGradient>
        <path id={topId} d="M -53 0 A 53 53 0 0 1 53 0" />
        <path id={botId} d="M -64 0 A 64 64 0 0 0 64 0" />
      </defs>

      {/* soft ground shadow */}
      <ellipse cx="110" cy="195" rx="62" ry="7" fill="#000" opacity="0.08" />

      {/* thickness: stack of shifted ellipses (left/back side) */}
      <g transform="translate(112 100)">
        {Array.from({ length: THICKNESS }).map((_, i) => (
          <ellipse
            key={i}
            cx={-(THICKNESS - i) * 1.15}
            cy={(THICKNESS - i) * 0.55}
            rx="70"
            ry="80"
            transform="rotate(-12)"
            fill={`url(#edge-${id})`}
          />
        ))}

        {/* white stripes on the side for a glossy look */}
        <g transform={`translate(${-THICKNESS * 1.15} ${THICKNESS * 0.55}) rotate(-12)`} opacity="0.55">
          <path d="M-60 -38 L-20 -64 L-8 -60 L-52 -30Z" fill="#fff" />
          <path d="M-66 -24 L-30 -48 L-22 -44 L-62 -17Z" fill="#fff" />
        </g>

        {/* front face */}
        <g transform="rotate(-12)">
          <ellipse rx="70" ry="80" fill={`url(#face-${id})`} />
          <ellipse rx="70" ry="80" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.5" />

          {/* curved ring text */}
          {cert.top && (
            <text fontSize={cert.top.length > 20 ? 6.6 : 9} fontWeight="800" fill="#fff"
              letterSpacing="1.6">
              <textPath href={`#${topId}`} startOffset="50%" textAnchor="middle">{cert.top}</textPath>
            </text>
          )}
          {cert.bottom && (
            <text fontSize={cert.bottom.length > 20 ? 6.6 : 9} fontWeight="800" fill="#fff"
              letterSpacing="1.6">
              <textPath href={`#${botId}`} startOffset="50%" textAnchor="middle">{cert.bottom}</textPath>
            </text>
          )}

          {/* side stars */}
          <text x="-60" y="3" textAnchor="middle" fontSize="8" fill="#fff" opacity="0.9">★</text>
          <text x="60" y="3" textAnchor="middle" fontSize="8" fill="#fff" opacity="0.9">★</text>

          {/* inner cream disc */}
          <circle r="47" fill="#fffdf2" />
          <circle r="47" fill="none" stroke={dark} strokeOpacity="0.25" strokeWidth="1.2" />
          <circle r="43" fill="none" stroke={main} strokeOpacity="0.35" strokeWidth="0.8" strokeDasharray="2 2" />

          <g fontFamily="system-ui, 'Segoe UI', sans-serif">{cert.center({ dark })}</g>
        </g>
      </g>
    </svg>
  );
}

/* ─── One item (coin + caption) ─────────────────────────────────── */
function BadgeItem({ cert }) {
  return (
    <div className="group flex flex-col items-center gap-1 flex-shrink-0">
      <div className="transition-transform duration-300 ease-out group-hover:-translate-y-2 group-hover:scale-105">
        <Coin cert={cert} />
      </div>
      <p className="text-xs font-semibold text-gray-700 text-center">{cert.label}</p>
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────────── */
export default function CertificationBadges() {
  return (
    <section className="w-full bg-[#fffff0] py-10 sm:py-14 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
          Our Quality Standards
        </h2>
        <p className="mt-2 mb-8 sm:mb-12 text-center text-sm text-gray-500">
          Every product meets international quality &amp; safety standards.
        </p>

        {/* Desktop / tablet: static row */}
        <div className="hidden md:flex flex-wrap items-start justify-center gap-x-6 gap-y-8 xl:gap-x-10">
          {CERTS.map((cert) => (
            <BadgeItem key={cert.id} cert={cert} />
          ))}
        </div>

        {/* Mobile: infinite marquee */}
        <div className="relative md:hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-gradient-to-r from-[#fffff0] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-gradient-to-l from-[#fffff0] to-transparent" />

          <div className="flex gap-6 animate-marquee-slow items-start" style={{ willChange: 'transform' }}>
            {[0, 1].map((copy) => (
              <div key={copy} className="flex gap-6 flex-shrink-0 items-start" aria-hidden={copy === 1}>
                {CERTS.map((cert) => (
                  <BadgeItem key={`${copy}-${cert.id}`} cert={cert} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
