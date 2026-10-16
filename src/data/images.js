/**
 * ALL IMAGES LIVE HERE. Every value is a plain URL string.
 * Replace the placehold.co links with your own image links (Shopify CDN, Cloudinary, etc.).
 */
const ph = (w, h, text, bg = 'e9f4ec', fg = '1b5e3b') =>
  `https://placehold.co/${w}x${h}/${bg}/${fg}?text=${encodeURIComponent(text)}`;

export const IMG = {
  logo: ph(300, 100, 'YOUR LOGO', 'ffffff'),
  heroSlides: [
    { image: ph(1600, 720, 'HERO BANNER 1 (1600x720)'), mobile: ph(800, 900, 'HERO MOBILE 1') },
    { image: ph(1600, 720, 'HERO BANNER 2 (1600x720)', 'f6efe0', '8a6a1f'), mobile: ph(800, 900, 'HERO MOBILE 2', 'f6efe0', '8a6a1f') },
    { image: ph(1600, 720, 'HERO BANNER 3 (1600x720)', 'e8eef6', '1f4a8a'), mobile: ph(800, 900, 'HERO MOBILE 3', 'e8eef6', '1f4a8a') },
  ],
  certifications: ph(1200, 200, 'CERTIFICATION BADGES STRIP (1200x200)', 'ffffff'),
  partners: ph(1200, 120, 'PARTNER LOGOS STRIP', 'ffffff'),
  hairBanner: '/hair.webp',
  menBanner: '/Nugizer.webp',
  promoLeft: ph(800, 500, 'PROMO BANNER LEFT', 'f6efe0', '8a6a1f'),
  promoRight: ph(800, 500, 'PROMO BANNER RIGHT', 'fbe9e9', 'a33a3a'),
  videoPoster: ph(1280, 720, 'VIDEO POSTER (1280x720)'),
  // ── Paste the Sukooon video URL here ──────────────────────────────────────
  // How to get it:
  //   1. Open https://sukooon.com in Chrome
  //   2. Press F12 → Network tab → filter by "mp4"
  //   3. Refresh the page → copy the .mp4 request URL
  //   4. Paste it below (replace the empty string)
  videoUrl: 'https://cdn.shopify.com/videos/c/o/v/PASTE_YOUR_VIDEO_URL_HERE.mp4',
  about: ph(900, 700, 'ABOUT US IMAGE'),
  reviewsBg: ph(1600, 500, 'REVIEWS BACKGROUND', 'f4f8f5', 'c5d9cb'),
  category: (name) => ph(160, 160, name),
  product: (n, i) => ph(900, 900, `PRODUCT ${n} / IMG ${i}`),
  bundle: (n) => ph(900, 900, `BUNDLE ${n}`, 'f6efe0', '8a6a1f'),
  blog: (n) => ph(900, 600, `BLOG IMAGE ${n}`, 'e8eef6', '1f4a8a'),
  instagram: (n) => ph(500, 500, `INSTA ${n}`, 'f4e9f0', '8a1f6a'),
  avatar: (n) => ph(120, 120, `U${n}`),
};
