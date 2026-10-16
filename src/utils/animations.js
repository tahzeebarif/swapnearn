/**
 * animations.js — Reusable Framer Motion variants
 * Import these wherever you need consistent entrance animations.
 * All respect `prefers-reduced-motion` automatically via Framer Motion.
 */

/* ── Fade up — standard section reveal ── */
export const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Fade in — no movement ── */
export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

/* ── Slide in from left ── */
export const slideLeft = {
  hidden:  { opacity: 0, x: -40 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Slide in from right ── */
export const slideRight = {
  hidden:  { opacity: 0, x: 40 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Scale up ── */
export const scaleUp = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Stagger container — wraps a list of children ── */
export const staggerContainer = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

/* ── Stagger item — each child in a staggered list ── */
export const staggerItem = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Hero text line — staggered word reveal ── */
export const heroText = {
  hidden:  { opacity: 0, y: 32, skewY: 2 },
  visible: {
    opacity: 1, y: 0, skewY: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Card hover — 3D tilt preset (use with useMotionValue + useSpring) ── */
export const cardHover = {
  rest:  { scale: 1,    y: 0 },
  hover: { scale: 1.02, y: -6, transition: { duration: 0.3, ease: 'easeOut' } },
};

/* ── Float loop ── */
export const floatLoop = {
  animate: {
    y: [0, -14, 0],
    transition: { duration: 4, ease: 'easeInOut', repeat: Infinity },
  },
};

/* ── Viewport config — trigger when 15% of element is visible ── */
export const viewportOnce = { once: true, margin: '-60px' };
