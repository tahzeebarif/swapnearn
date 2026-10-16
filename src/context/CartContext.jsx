import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { cartService } from '../services/cartService';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => cartService.load());
  const [open, setOpen] = useState(false);

  useEffect(() => { cartService.save(items); }, [items]);

  const addItem = useCallback((line, qty = 1) => { setItems((i) => cartService.add(i, line, qty)); setOpen(true); }, []);
  const updateQty = useCallback((id, qty) => setItems((i) => cartService.update(i, id, qty)), []);
  const removeItem = useCallback((id) => setItems((i) => cartService.remove(i, id)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => ({
    items, open, setOpen, addItem, updateQty, removeItem, clear,
    subtotal: cartService.subtotal(items), count: cartService.count(items),
  }), [items, open, addItem, updateQty, removeItem, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
};
