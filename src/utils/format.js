export const formatPrice = (n) => `Rs. ${Number(n || 0).toLocaleString('en-PK')}`;
export const discountPct = (price, compare) =>
  compare && compare > price ? Math.round((1 - price / compare) * 100) : 0;
