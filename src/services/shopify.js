/**
 * Shopify Storefront API client (placeholder).
 * Uses only PUBLIC Storefront token. Never put Admin API credentials in frontend code.
 */
const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export const isShopifyConfigured = Boolean(
  domain && token && !domain.includes('your-store') && !token.includes('your-public')
);

export async function shopifyFetch(query, variables = {}) {
  if (!isShopifyConfigured) throw new Error('Shopify is not configured. Using mock data.');
  const res = await fetch(`https://${domain}/api/2024-10/graphql.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': token },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`Shopify request failed (${res.status})`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0]?.message || 'Shopify error');
  return json.data;
}
// TODO: map Shopify responses to the product shape in src/data/mockProducts.js
