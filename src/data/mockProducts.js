// Product data — Life Aura products use real images from https://swapnearn.com/collections/life-aura
// All other brand product data remains as demo until replaced.
import { IMG } from './images';

// ---------------------------------------------------------------------------
// Real Life Aura product images from Shopify CDN (swapnearn.com)
// ---------------------------------------------------------------------------
const LA = {
  handFeetCream: [
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/hand_and_Foot_cream.jpg?v=1768544631',
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/Hand_Foot_720x_8fb54e33-1c8a-4a32-8dbe-0eab08cafcf7.webp?v=1768544631',
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/Hand_Foot_5.webp?v=1779205994',
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/HF_buy_2_get_1_free.jpg?v=1773038252',
  ],
  vitmanEC: [
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/E_Cserum-Camera2_550x_3a4527bd-e621-4955-82ca-02aea46a9259.webp?v=1767956465',
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/E_Cserum.jpg?v=1767956353',
  ],
  hairElixirMen: [
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/Reviv_hairs_males-Camera.webp?v=1763441888',
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/Revive_Hair_Elixir_Men.jpg?v=1763441888',
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/HairElixirForMen6.jpg?v=1763441888',
  ],
  hairElixirWomen: [
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/ReviveHairFemaleBottle-Camera.webp?v=1763442005',
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/HairElixirForFemale3.jpg?v=1763442005',
  ],
  whiteningCream3x: [
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/Whitening-Cream.png?v=1769410706',
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/3x_whitening_Cream.jpg?v=1766741032',
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/Box_Whitening_cream_9.webp?v=1779205548',
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/Box_Whitening_cream_7.webp?v=1779205590',
  ],
  bodyLotion: [
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/Life_aura_Lotion_2_1100x_a9ef07e5-7e2a-439d-9759-b38b48398717.webp?v=1779279896',
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/body_lotion_1_f43f103c-52f6-48bf-af2f-d42a72de399a.webp?v=1764079958',
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/Body_lotion_5_6aa5dcdb-731b-41c3-9d0e-4824be68a461.webp?v=1779206671',
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/BODY_LOTION_2_50b154f8-c759-42e8-b4b7-b24a2d908a0b.webp?v=1779206629',
  ],
  whiteningRepairSerum: [
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/LifeAuraWhiteningGlwoSerum-Camera_3x_fbfeef77-86d9-4a58-a05a-2dfe63de89e6.webp?v=1763441711',
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/ad_1_whitening_serum_for_life_aura_63a280fd-ce27-4f18-90ee-8ed782abbd79.webp?v=1779209607',
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/ad_1whitening_serum_for_life_aura_abfe0f48-2814-4505-87ef-2973df7a500f.webp?v=1779209607',
  ],
  glowGlassSerum: [
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/Glow_And_Glass_serum.webp?v=1763441464',
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/glow_glass_serum_2.webp?v=1763441464',
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/Glow_and_Glass_Serum_3_20554c4c-c932-4412-bd48-5e190d77e4a9.webp?v=1779209720',
  ],
  poreMinimizerSerum: [
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/Pore_Minimizer-Camera.webp?v=1763441371',
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/WhatsApp_Image_2025-11-16_at_17.25.22_6b227e0d.jpg?v=1763441371',
  ],
  facialGlowRollOn: [
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/WhatsAppImage2026-01-16at11.59.14AM.jpg?v=1768886954',
  ],
  retinolSerum: [
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/WhatsApp_Image_2026-01-14_at_12.18.50_PM.jpg?v=1768544680',
  ],
  lavenderOil: [
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/Levender1-Camera.webp?v=1779197928',
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/Dilution-Instructions-Square_4365d292-f6dd-40b2-aeea-aff623de41a4.webp?v=1765866730',
  ],
  rosemaryOil: [
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/RoseMarry.webp?v=1779205362',
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/Dilution-Instructions-Square_f6e3fe4f-f8d9-44ed-a05c-6ee5b3d7ec20.webp?v=1765866728',
  ],
  teaTreeOil: [
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/TeaTree.webp?v=1779205450',
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/Dilution-Instructions-Square_6f2395e0-84c2-47fd-a223-20b462786f78.webp?v=1765866727',
  ],
  lemonOil: [
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/Lemon-Camera.webp?v=1779197863',
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/Dilution-Instructions-Square_5a2e5b4d-281f-46a7-82b6-0e156a1aedb2.webp?v=1765866731',
  ],
  sunscreen: [
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/SUNSCREEN.webp?v=1763271767',
  ],
  tripleWhiteningCream: [
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/WHITENING_CREAM.webp?v=1763271769',
  ],
  facewash: [
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/FaceWash.webp?v=1763271771',
  ],
  handFeetCreamOld: [
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/hand_and_feet_cream.webp?v=1763271773',
  ],
  serumBundle: [
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/WhatsAppImage2026-03-02at9.21.35PM.jpg?v=1772468914',
  ],
  skinCareBundle2: [
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/WhatsAppImage2026-03-02at3.28.47PM_1.jpg?v=1772709469',
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/WhatsApp_Image_2026-03-02_at_3.28.46_PM.jpg?v=1772709469',
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/WhatsApp_Image_2026-03-03_at_4.17.38_PM_1.jpg?v=1772709469',
  ],
  collagenSpray: [
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/CollagenSpray120mLBottle01.webp?v=1786635110',
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/collagensparybanner1.1.webp?v=1786635110',
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/CollagenSparyweb02.webp?v=1786635110',
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/collagensparyweb1.webp?v=1786635110',
  ],
  glowLifeCream: [
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/Glow-life-MOCKUP_86061d1d-0b05-4f92-b71e-b74b3e66ee97.webp?v=1786635364',
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/Glowlifestatic6_60288bff-e033-43f5-a6cf-b03ed788c390.webp?v=1786635365',
    'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/Glowlifeweb02_a8ca7112-8563-49a3-8706-f499642d6df6.webp?v=1786635364',
  ],
};

export const collections = [
  { slug: 'joint-muscle-care', title: 'Joint & Muscle Care' },
  { slug: 'hair-care', title: 'Hair Care' },
  { slug: 'skin-care', title: 'Skin Care' },
  { slug: 'womens-wellness', title: "Women's Wellness" },
  { slug: 'stress-sleep', title: 'Stress & Sleep' },
  { slug: 'mens-wellness', title: "Men's Wellness" },
  { slug: 'kids-wellness', title: "Kids' Wellness" },
  { slug: 'general-wellbeing', title: 'General Wellbeing' },
  { slug: 'blood-sugar-nerve-health', title: 'Blood Sugar & Nerve Health' },
].map((c) => ({ ...c, image: IMG.category(c.title) }));

// [handle, title, category, price, compareAt, size, rating, reviews, flags]
const rows = [
  ['joint-relief-oil', 'JOINT-ON Essential Oil Blend by Sukoon', 'joint-muscle-care', 1990, null, '30 ML', 4.8, 591, 'best trending'],
  ['roots-hair-serum', 'Roots Hair Serum', 'hair-care', 2750, 3100, '120 ML', 4.7, 148, 'best trending'],
  ['men-pro-protein-mix', "Men Pro Protein Mix", 'mens-wellness', 1990, null, '30 Tablets', 4.5, 120, 'best'],
  ['soothing-comfort-oil', 'De-Piles Soothing Comfort Oil Blend', 'general-wellbeing', 1850, null, '30 ML', 4.7, 143, 'best trending'],
  ['hair-skin-nails', 'NUGLOW (For Hair, Skin and Nails)', 'skin-care', 1950, null, '60 Capsules', 4.8, 196, 'best trending'],
  ['blood-sugar-support', 'Blood Sugar Nutritional Support Capsules', 'blood-sugar-nerve-health', 1250, null, '60 Capsules', 4.5, 32, 'trending'],
  ['saw-palmetto-caps', 'Saw Palmetto Capsules for Men', 'mens-wellness', 950, null, '60 Capsules', 4.6, 53, 'trending'],
  ['biotin-keratin', 'Biotin + Keratin Strong Hair Formula', 'hair-care', 1550, null, '60 Tablets', 4.4, 20, 'new'],
  ['strengthening-shampoo', 'Hair Strengthening Shampoo', 'hair-care', 1650, null, '200 ML', 4.5, 54, ''],
  ['refreshing-shampoo', 'Hair Refreshing Charcoal Shampoo', 'hair-care', 1050, null, '200 ML', 4.3, 30, ''],
  ['fullness-shampoo', 'Hair Fullness Shampoo', 'hair-care', 1150, null, '200 ML', 4.4, 21, ''],
  ['scalp-care-shampoo', 'Scalp Care Shampoo', 'hair-care', 1350, null, '200 ML', 4.5, 19, ''],
  ['night-oil', 'Essential Night Oil for Better Sleep', 'stress-sleep', 1750, null, '30 ML', 4.8, 91, 'best'],
  ['head-temple-oil', 'Head & Temple Comfort Oil Blend', 'stress-sleep', 1250, null, '30 ML', 4.6, 42, ''],
  ['energy-shots', 'Energy Shots for Men', 'mens-wellness', 2100, null, 'Pack of 7', 4.3, 6, 'new'],
  ['mens-multivitamin', "Men's Multivitamin Tablets", 'mens-wellness', 1250, null, '60 Tablets', 4.4, 6, ''],
  ['immunity-sachet', 'Vitamin C Immunity Sachets', 'general-wellbeing', 1450, null, 'Pack of 10', 4.5, 28, 'new'],
  ['calcium-sachet', 'Calcium Sachets', 'womens-wellness', 1550, null, 'Pack of 10', 4.6, 17, ''],
  ['kids-multivitamin', 'Kids Multivitamin Gummies', 'kids-wellness', 1350, null, '45 Gummies', 4.7, 34, 'new'],
  ['cooling-comfort-oil', 'Cooling Comfort Oil', 'joint-muscle-care', 1650, null, '30 ML', 4.6, 77, ''],
  ['moringa-sachet', 'Moringa Sachets', 'general-wellbeing', 1350, null, 'Pack of 10', 4.4, 12, ''],
  // bundles matching screenshot
  ['joint-nerve-nite-bundle', 'Joint-on (30ML) + Nerve-on (30ML) + NITE-ON (10ML) - Buy 2 & Get 1 FREE', 'bundles', 3740, 4990, 'Bundle', 5.0, 6, 'bundle best trending', 'Buy Two 30mL', 'Get One 10mL For Free', 25, 1250, 'from-[#ec4899] to-[#db2777]'],
  ['joint-50ml-30ml-bundle', 'Joint-on (50ML) x 2 + Joint-on (30ML) x 1 - Buy 2 & Get 1 FREE', 'bundles', 5000, 6990, 'Bundle', 5.0, 8, 'bundle best trending', 'Buy Two 50mL', 'Get One 30mL For Free', 28, 1900, 'from-[#f97316] to-[#ea580c]'],
  ['joint-30ml-10ml-bundle', 'Joint-on (30ML) x 2 + Joint-on (10ML) x 1 - Buy 2 & Get 1 FREE', 'bundles', 3980, 5230, 'Bundle', 4.9, 10, 'bundle trending', 'Buy Two 30mL', 'Get One 10mL For Free', 24, 1250, 'from-[#ea580c] to-[#c2410c]'],
  ['nrv-on-bundle', 'NRV-ON (30ML) x 2 + NRV-ON (10ML) - Buy 2 & Get 1 FREE', 'bundles', 3500, 4750, 'Bundle', 4.8, 8, 'bundle trending', 'Buy Two 30mL', 'Get One 10mL For Free', 26, 1250, 'from-[#e11d48] to-[#be123c]'],
  ['nugizer-maxit-bundle', "Buy 2 Nugizer Tablet 60's Get Max-it Shots Free | Buy 2 Get 1 Free", 'bundles', 5980, 8080, 'Bundle', 4.9, 14, 'bundle best', 'Buy 2 Nugizer', 'Get 1 Maxit Shot (Pack of 7) Free', 26, 2100, 'from-[#475569] to-[#334155]'],
  ['roots-biotin-combo', 'Roots Hair Serum + Biotin Keratin Combo - Get 19% off', 'bundles', 3480, 4300, 'Bundle', 4.7, 19, 'bundle trending', 'Special Combo', 'Get 19% off.', 19, 820, 'from-[#a855f7] to-[#7e22ce]'],
  ['skin-glow-hydration-combo', 'Super Glow Hydration + Collagen Routine - Get 23% off', 'bundles', 3340, 4240, 'Bundle', 4.9, 22, 'bundle best', 'Radiance Duo', 'Get 23% off.', 23, 900, 'from-[#8b5cf6] to-[#6d28d9]'],
  ['flex-on-mobility-bundle', 'Flex-On Mobility Oil Pack - Buy Two 50mL Get One Free', 'bundles', 4400, 5950, 'Bundle', 4.8, 11, 'bundle trending', 'Buy Two 50mL', 'Get One Flex-On For Free', 26, 1550, 'from-[#1e40af] to-[#1e3a8a]'],

  // ── Real Life Aura products from https://swapnearn.com/collections/life-aura ──
  // Images are live Shopify CDN URLs — no placeholders.
  ['life-aura-hand-and-feet-cream-1', 'Life Aura Hand and Feet Cream', 'skin-care', 1250, null, '50 ML', 4.7, 42, 'best trending'],
  ['vitman-e-c', 'Vitman E + C (Vitamin E & C Serum)', 'skin-care', 1950, 2250, '30 ML', 4.8, 88, 'best trending'],
  ['revive-hair-elixir-for-men', 'Revive Hair Elixir for Men', 'hair-care', 1750, null, '50 ML', 4.7, 56, 'best trending'],
  ['revive-hair-elixir-for-women', 'Revive Hair Elixir for Women', 'hair-care', 1750, null, '50 ML', 4.7, 49, 'best trending'],
  ['life-aura-3x-whitening-cream', 'Life Aura 3x Whitening Cream', 'skin-care', 2250, 2850, '50 ML', 4.8, 134, 'best trending'],
  ['life-aura-body-lotion', 'Life Aura Body Lotion', 'skin-care', 1250, null, '200 ML', 4.6, 31, 'trending'],
  ['life-aura-whitening-repair-serum', 'Life Aura Whitening Repair Serum', 'skin-care', 1750, null, '30 ML', 4.7, 67, 'trending'],
  ['life-aura-glow-glass-serum', 'LIFE AURA Glow & Glass Serum', 'skin-care', 1750, null, '30 ML', 4.6, 44, 'trending'],
  ['life-aura-pore-minimizer-serum', 'LIFE AURA Pore Minimizer Serum', 'skin-care', 1750, null, '30 ML', 4.5, 29, ''],
  ['life-aura-eyeglow-roll-on', 'Life Aura Facial Glow Roll-On', 'skin-care', 1650, null, '10 ML', 4.6, 22, 'new'],
  ['life-aura-retinol-r-serum', 'Life Aura Retinol R+ Serum', 'skin-care', 1950, null, '30 ML', 4.7, 18, 'new'],
  ['lavender-30ml-pure-essential-oil', 'Lavender 30ML Pure Essential Oil', 'stress-sleep', 1750, null, '30 ML', 4.8, 37, 'best'],
  ['rosemary-30ml-pure-essential-oil', 'Rosemary 30ML Pure Essential Oil', 'hair-care', 1650, null, '30 ML', 4.7, 24, ''],
  ['tea-tree-30ml-pure-essential-oil', 'TEA TREE 30ML Pure Essential Oil', 'skin-care', 1550, null, '30 ML', 4.6, 19, ''],
  ['lemon-30ml-pure-essential-oil', 'Lemon 30ML Pure Essential Oil', 'general-wellbeing', 1550, null, '30 ML', 4.5, 16, ''],
  ['life-aura-sunscreen-spf-60', 'Life Aura Sunscreen SPF 60', 'skin-care', 1450, null, '50 ML', 4.5, 21, ''],
  ['life-aura-3x-triple-whitening-cream', 'Life Aura 3x Triple Whitening Cream', 'skin-care', 2500, null, '50 ML', 4.7, 15, 'new'],
  ['life-aura-skin-lightening-brightening-facewash', 'Life Aura Skin Lightening & Brightening Facewash', 'skin-care', 2000, null, '100 ML', 4.6, 12, 'new'],
  ['life-aura-hand-and-feet-cream', 'Life Aura Hand & Feet Cream', 'skin-care', 1500, null, '50 ML', 4.6, 34, ''],
  ['life-aura-3x-serum-bundle-buy-2-get-1-free', 'Life Aura 3x Serum Bundle (Buy 2 Get 1 Free)', 'skin-care', 3500, 5250, 'Bundle', 4.9, 28, 'bundle best trending', 'Buy 2 Serums', 'Get 1 Free!', 33, 1750, 'from-[#8b5cf6] to-[#6d28d9]'],
  ['skin-care-bundle-2', 'Skin Care Bundle-2 (3x Whitening Cream + Nuglow)', 'skin-care', 3400, 4000, 'Bundle', 4.8, 19, 'bundle best', 'Whitening Duo', 'Save Rs.600!', 15, 600, 'from-[#d97706] to-[#b45309]'],
  ['lifeaura-collagen-spray-120ml', 'Lifeaura Collagen Spray 120ml', 'skin-care', 2750, null, '120 ML', 4.8, 11, 'new trending'],
  ['life-aura-glow-life-cream-50g', 'Life Aura Glow Life Cream 50g', 'skin-care', 1750, null, '50 g', 4.7, 9, 'new'],
];

export const brands = [
  {
    id: 'sukoon-wellness',
    slug: 'sukoon-wellness',
    name: 'SUKOOON WELLNESS',
    tagline: 'Pakistan no.1 Essential oils Blend Company.',
    description: '100% natural, therapeutic essential oil blends crafted for daily comfort, joint relief, better sleep, and restorative vitality.',
    accentColor: '#1b5e3b',
    headerBg: 'from-[#e8f5e9] via-[#f1f8e9] to-[#c8e6c9]',
    badgeBg: 'bg-emerald-700',
    petalColor: '#81c784',
    badgeText: 'Essential Oils Blend',
    logoText: 'Sukoon',
    logoSub: 'WE CHANGE LIVES',
    bannerImage: '/Sukooon Botanical Wellness Banner.png',
    productPreviewImages: [
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600857544200-b2f468e03673?w=600&h=800&fit=crop&q=80',
    ],
    productPreviewHandles: ['joint-relief-oil', 'soothing-comfort-oil', 'night-oil'],
  },
  {
    id: 'nutrify',
    slug: 'nutrify',
    name: 'NUTRIFY',
    tagline: 'Pakistan no.1 Revolution Health Supplement Brand.',
    description: 'Clinically formulated daily nutritional supplements, multivitamins, and dietary support for men, women, and kids.',
    accentColor: '#9333ea',
    headerBg: 'from-[#fce4ec] via-[#f8bbd0]/60 to-[#f48fb1]/40',
    badgeBg: 'bg-purple-700',
    petalColor: '#f06292',
    badgeText: 'Health Supplements',
    logoText: 'Nutrify',
    logoSub: 'International Supplements',
    bannerImage: '/Nutrif y Wellness Brand Banner.png',
    productPreviewImages: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&h=800&fit=crop&q=80',
    ],
    productPreviewHandles: ['mens-daily-wellness', 'blood-sugar-support', 'kids-multivitamin'],
  },
  {
    id: 'the-life-aura',
    slug: 'the-life-aura',
    name: 'THE LIFE AURA',
    tagline: 'Pakistan Best Skin Care Brand.',
    description: 'Premium bio-active skincare, radiant facial serums, liquid collagen nutrition, and restorative beauty routines.',
    accentColor: '#ea580c',
    headerBg: 'from-[#fff3e0] via-[#ffe0b2]/60 to-[#ffcc80]/50',
    badgeBg: 'bg-amber-700',
    petalColor: '#ffb74d',
    badgeText: 'Skin Care & Glow',
    logoText: 'Life Aura',
    logoSub: 'Beauty That Breathes',
    bannerImage: '/LifeAura Beauty Brand Emblem.png',
    productPreviewImages: [
      'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/Whitening-Cream.png?v=1769410706',
      'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/E_Cserum-Camera2_550x_3a4527bd-e621-4955-82ca-02aea46a9259.webp?v=1767956465',
      'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/CollagenSpray120mLBottle01.webp?v=1786635110',
    ],
    productPreviewHandles: ['life-aura-3x-whitening-cream', 'vitman-e-c', 'lifeaura-collagen-spray-120ml'],
  },
  {
    id: 'glowrify',
    slug: 'glowrify',
    name: 'GLOWRIFY',
    tagline: 'Pure oils. Advanced science. Skin & hair reimagined.',
    description: 'Advanced trichology hair growth therapies, biotin keratin formulations, nourishing shampoos, and clinical beauty oils.',
    accentColor: '#7c3aed',
    headerBg: 'from-[#f3e5f5] via-[#e1bee7]/60 to-[#ce93d8]/40',
    badgeBg: 'bg-violet-700',
    petalColor: '#ba68c8',
    badgeText: 'Hair & Beauty Science',
    logoText: 'Glowrify',
    logoSub: 'By Sukoon',
    bannerImage: '/Glowrify Lavender Beauty Banner.png',
    productPreviewImages: [
      'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/Reviv_hairs_males-Camera.webp?v=1763441888',
      'https://cdn.shopify.com/s/files/1/0760/1042/2592/files/ReviveHairFemaleBottle-Camera.webp?v=1763442005',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=800&fit=crop&q=80',
    ],
    productPreviewHandles: ['revive-hair-elixir-for-men', 'revive-hair-elixir-for-women', 'roots-hair-serum'],
  },
];

const brandMap = {
  'joint-relief-oil': 'sukoon-wellness',
  'soothing-comfort-oil': 'sukoon-wellness',
  'night-oil': 'sukoon-wellness',
  'head-temple-oil': 'sukoon-wellness',
  'cooling-comfort-oil': 'sukoon-wellness',

  'mens-daily-wellness': 'nutrify',
  'blood-sugar-support': 'nutrify',
  'saw-palmetto-caps': 'nutrify',
  'energy-shots': 'nutrify',
  'mens-multivitamin': 'nutrify',
  'immunity-sachet': 'nutrify',
  'calcium-sachet': 'nutrify',
  'kids-multivitamin': 'nutrify',
  'moringa-sachet': 'nutrify',

  'hydration-routine-bundle': 'the-life-aura',
  'radiance-routine-bundle': 'the-life-aura',
  'advanced-glow-bundle': 'the-life-aura',

  // Real Life Aura products
  'life-aura-hand-and-feet-cream-1': 'the-life-aura',
  'vitman-e-c': 'the-life-aura',
  'revive-hair-elixir-for-men': 'the-life-aura',
  'revive-hair-elixir-for-women': 'the-life-aura',
  'life-aura-3x-whitening-cream': 'the-life-aura',
  'life-aura-body-lotion': 'the-life-aura',
  'life-aura-whitening-repair-serum': 'the-life-aura',
  'life-aura-glow-glass-serum': 'the-life-aura',
  'life-aura-pore-minimizer-serum': 'the-life-aura',
  'life-aura-eyeglow-roll-on': 'the-life-aura',
  'life-aura-retinol-r-serum': 'the-life-aura',
  'lavender-30ml-pure-essential-oil': 'the-life-aura',
  'rosemary-30ml-pure-essential-oil': 'the-life-aura',
  'tea-tree-30ml-pure-essential-oil': 'the-life-aura',
  'lemon-30ml-pure-essential-oil': 'the-life-aura',
  'life-aura-sunscreen-spf-60': 'the-life-aura',
  'life-aura-3x-triple-whitening-cream': 'the-life-aura',
  'life-aura-skin-lightening-brightening-facewash': 'the-life-aura',
  'life-aura-hand-and-feet-cream': 'the-life-aura',
  'life-aura-3x-serum-bundle-buy-2-get-1-free': 'the-life-aura',
  'skin-care-bundle-2': 'the-life-aura',
  'lifeaura-collagen-spray-120ml': 'the-life-aura',
  'life-aura-glow-life-cream-50g': 'the-life-aura',

  // new bundles from screenshot
  'joint-nerve-nite-bundle': 'sukoon-wellness',
  'joint-50ml-30ml-bundle': 'sukoon-wellness',
  'joint-30ml-10ml-bundle': 'sukoon-wellness',
  'nrv-on-bundle': 'sukoon-wellness',
  'nugizer-maxit-bundle': 'nutrify',
  'roots-biotin-combo': 'glowrify',
  'skin-glow-hydration-combo': 'the-life-aura',
  'flex-on-mobility-bundle': 'sukoon-wellness',

  'roots-hair-serum': 'glowrify',
  'hair-skin-nails': 'glowrify',
  'biotin-keratin': 'glowrify',
  'strengthening-shampoo': 'glowrify',
  'refreshing-shampoo': 'glowrify',
  'fullness-shampoo': 'glowrify',
  'scalp-care-shampoo': 'glowrify',
};

const descriptions = {
  default: 'A carefully formulated wellness product made with natural ingredients. This is demo description text - replace with verified product information from your store.',
};

export const products = rows.map((row, i) => {
  const [handle, title, category, price, compareAt, size, rating, reviewCount, flags, dealHeadlineTop, dealHeadlineBottom, discountPercent, saveAmount, bannerColor] = row;
  const f = flags.split(' ');
  const isBundle = f.includes('bundle');
  // Real image lookup — keyed by product handle
  const realImages = {
    'life-aura-hand-and-feet-cream-1': LA.handFeetCream,
    'vitman-e-c': LA.vitmanEC,
    'revive-hair-elixir-for-men': LA.hairElixirMen,
    'revive-hair-elixir-for-women': LA.hairElixirWomen,
    'life-aura-3x-whitening-cream': LA.whiteningCream3x,
    'life-aura-body-lotion': LA.bodyLotion,
    'life-aura-whitening-repair-serum': LA.whiteningRepairSerum,
    'life-aura-glow-glass-serum': LA.glowGlassSerum,
    'life-aura-pore-minimizer-serum': LA.poreMinimizerSerum,
    'life-aura-eyeglow-roll-on': LA.facialGlowRollOn,
    'life-aura-retinol-r-serum': LA.retinolSerum,
    'lavender-30ml-pure-essential-oil': LA.lavenderOil,
    'rosemary-30ml-pure-essential-oil': LA.rosemaryOil,
    'tea-tree-30ml-pure-essential-oil': LA.teaTreeOil,
    'lemon-30ml-pure-essential-oil': LA.lemonOil,
    'life-aura-sunscreen-spf-60': LA.sunscreen,
    'life-aura-3x-triple-whitening-cream': LA.tripleWhiteningCream,
    'life-aura-skin-lightening-brightening-facewash': LA.facewash,
    'life-aura-hand-and-feet-cream': LA.handFeetCreamOld,
    'life-aura-3x-serum-bundle-buy-2-get-1-free': LA.serumBundle,
    'skin-care-bundle-2': LA.skinCareBundle2,
    'lifeaura-collagen-spray-120ml': LA.collagenSpray,
    'life-aura-glow-life-cream-50g': LA.glowLifeCream,
  };
  const imgs = realImages[handle]
    ? realImages[handle]
    : isBundle
      ? [IMG.bundle(i + 1), IMG.product(i + 1, 2)]
      : [1, 2, 3, 4].map((n) => IMG.product(i + 1, n));
  const bId = brandMap[handle] || 'sukoon-wellness';
  const brandObj = brands.find((b) => b.id === bId) || brands[0];
  return {
    id: `p${i + 1}`,
    handle,
    title,
    category,
    brandId: bId,
    brandName: brandObj.name,
    price,
    compareAtPrice: compareAt,
    size,
    rating,
    reviewCount,
    bestSeller: f.includes('best'),
    trending: f.includes('trending') || f.includes('best'),
    isNew: f.includes('new'),
    isBundle,
    dealHeadlineTop: dealHeadlineTop || (isBundle ? 'Special Bundle' : null),
    dealHeadlineBottom: dealHeadlineBottom || (isBundle ? 'Save on Combo' : null),
    discountPercent: discountPercent || (compareAt ? Math.round(((compareAt - price) / compareAt) * 100) : null),
    saveAmount: saveAmount || (compareAt ? compareAt - price : null),
    bannerColor: bannerColor || 'from-[#ec4899] to-[#db2777]',
    images: imgs,
    variants: [
      { id: `p${i + 1}-v1`, title: size, price, compareAtPrice: compareAt },
      { id: `p${i + 1}-v2`, title: 'Pack of 2', price: Math.round(price * 2 * 0.92), compareAtPrice: price * 2 },
      { id: `p${i + 1}-v3`, title: 'Pack of 3', price: Math.round(price * 3 * 0.85), compareAtPrice: price * 3 },
    ],
    description: descriptions.default,
    benefits: ['Natural, quality-tested ingredients', 'Easy to use daily', 'Demo content - verify before launch'],
    ingredients: ['Ingredient one (demo)', 'Ingredient two (demo)', 'Ingredient three (demo)', 'Carrier base (demo)'],
    howToUse: 'Follow the directions on the label. Demo text - replace with approved usage instructions.',
  };
});

export const reviews = [
  { id: 1, name: 'Ayesha K.', rating: 5, title: 'Really helped', body: 'Demo review: I noticed a difference after two weeks. Great packaging and fast delivery.' },
  { id: 2, name: 'Usman R.', rating: 4, title: 'Good quality', body: 'Demo review: Nice smell and texture. Would order again.' },
  { id: 3, name: 'Sana M.', rating: 5, title: 'Love it', body: 'Demo review: Easy to use, and my family loves it too.' },
];

export const testimonials = [
  { id: 1, name: 'Ayesha K.', city: 'Lahore', rating: 5, text: 'Demo testimonial: Beautiful products and quick support. Delivery was on time.', avatar: IMG.avatar(1) },
  { id: 2, name: 'Usman R.', city: 'Karachi', rating: 5, text: 'Demo testimonial: Quality feels premium. I use the oil every night.', avatar: IMG.avatar(2) },
  { id: 3, name: 'Sana M.', city: 'Islamabad', rating: 4, text: 'Demo testimonial: Good range of hair care products. Packaging is lovely.', avatar: IMG.avatar(3) },
  { id: 4, name: 'Bilal A.', city: 'Faisalabad', rating: 5, text: 'Demo testimonial: Easy ordering and helpful WhatsApp support.', avatar: IMG.avatar(4) },
];

export const blogs = [
  ['common-causes-of-joint-pain', 'Common Causes of Joint Pain and How to Manage Them at Home'],
  ['does-oil-for-joint-pain-work', 'Does Oil for Joint Pain Really Work?'],
  ['understanding-psoriasis', 'Understanding Psoriasis: Triggers, Symptoms and Simple Care Tips'],
  ['before-buying-pain-relief-oil', 'What to Know Before Buying Pain Relief Oil'],
  ['lavender-rosemary-peppermint', 'Lavender vs. Rosemary vs. Peppermint Oil: When to Use Which'],
  ['daily-habits-for-pain', 'Daily Habits That Help Reduce Knee, Back and Shoulder Pain'],
  ['muscle-recovery-tips', 'Muscle Pain After Exercise? How to Recover Faster'],
  ['healthy-hair-routine', 'A Simple Weekly Routine for Healthier Hair'],
].map(([slug, title], i) => ({
  slug,
  title,
  category: 'Wellness Club',
  date: `2026-0${(i % 9) + 1}-1${i % 9}`,
  excerpt: 'Demo article excerpt. Replace with your real blog content when your store is ready.',
  image: IMG.blog(i + 1),
  body: [
    'This is demo article content. Replace it with your own verified, medically reviewed text before launching.',
    'Wellness routines work best when they are consistent. Start small, track how you feel, and speak to a qualified professional for personal advice.',
    'Natural products are meant to support a healthy lifestyle and are not a substitute for medical treatment.',
  ],
}));

export const faqs = [
  { q: 'How long does delivery take?', a: 'Demo answer: Orders usually arrive within 3-5 working days. Update with your real delivery times.' },
  { q: 'Do you offer cash on delivery?', a: 'Demo answer: Payment options will be configured through Shopify later.' },
  { q: 'Can I return a product?', a: 'Demo answer: See our Return & Refund Policy page for the conditions.' },
  { q: 'Are the products safe for daily use?', a: 'Demo answer: Always read the label and consult your doctor if you are pregnant, nursing or on medication.' },
  { q: 'How can I track my order?', a: 'Demo answer: Use the Contact page or WhatsApp with your order number.' },
];

export const policies = {
  shipping: { title: 'Shipping Policy', body: ['Demo policy text. Orders are processed within 1-2 working days.', 'Free shipping applies above the threshold shown in the cart drawer.', 'Replace this page with your final shipping policy.'] },
  returns: { title: 'Return & Refund Policy', body: ['Demo policy text. Unopened products may be returned within 7 days of delivery.', 'Refunds are issued to the original payment method after inspection.', 'Replace this page with your final return policy.'] },
  privacy: { title: 'Privacy Policy', body: ['Demo policy text. We collect only the information needed to process your order.', 'We never store payment card details on this website.', 'Replace this page with your final privacy policy.'] },
  terms: { title: 'Terms & Conditions', body: ['Demo terms text. By using this site you agree to these terms.', 'Product information is for general guidance and is not medical advice.', 'Replace this page with your final terms.'] },
};
