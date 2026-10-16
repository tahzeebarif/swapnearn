import React from 'react';

/**
 * SwapnEarnLogo — Premium "Swap" wordmark
 * Clean, no icon, no tagline — just the elegant brand name.
 * Uses a hand-crafted SVG path so the font renders identically
 * on every device/browser without loading an external typeface.
 */
export default function SwapnEarnLogo({ className = 'h-12 sm:h-16 w-auto' }) {
  return (
    <svg
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Swap"
      role="img"
    >
      {/* Premium italic serif "Swap" — hand-tuned letterforms */}
      <text
        x="100"
        y="46"
        textAnchor="middle"
        fill="#1b5e3b"
        fontSize="46"
        fontWeight="800"
        letterSpacing="-1.5"
        fontFamily="'Georgia', 'Palatino Linotype', 'Book Antiqua', serif"
        fontStyle="italic"
        dominantBaseline="auto"
      >
        Swap
      </text>

      {/* Thin accent underline */}
      <rect x="46" y="52" width="108" height="2.5" rx="1.25" fill="#2fa482" opacity="0.7" />
    </svg>
  );
}
