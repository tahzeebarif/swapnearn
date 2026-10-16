// Cart operations on a plain array. Persisted to localStorage (demo).
// TODO (Shopify): swap for cartCreate / cartLinesAdd / cartLinesUpdate / cartLinesRemove mutations.
const KEY = 'wellness_demo_cart_v1';

export const cartService = {
  load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
  },
  save(items) {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* storage unavailable */ }
  },
  add(items, line, qty = 1) {
    const found = items.find((i) => i.variantId === line.variantId);
    if (found) return items.map((i) => (i.variantId === line.variantId ? { ...i, qty: i.qty + qty } : i));
    return [...items, { ...line, qty }];
  },
  update(items, variantId, qty) {
    if (qty < 1) return items.filter((i) => i.variantId !== variantId);
    return items.map((i) => (i.variantId === variantId ? { ...i, qty: Math.min(qty, 99) } : i));
  },
  remove(items, variantId) { return items.filter((i) => i.variantId !== variantId); },
  subtotal(items) { return items.reduce((s, i) => s + i.price * i.qty, 0); },
  count(items) { return items.reduce((s, i) => s + i.qty, 0); },
  /** PLACEHOLDER: later returns Shopify cart.checkoutUrl and redirects. No payments are handled here. */
  async checkout() { return { url: null, message: 'Shopify checkout will be connected here.' }; },
};
