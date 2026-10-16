import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SITE } from '../config';
import { formatPrice } from '../utils/format';
import QuantitySelector from './QuantitySelector';
import { cartService } from '../services/cartService';

export default function CartDrawer() {
  const { open, setOpen, items, updateQty, removeItem, subtotal } = useCart();
  const [note, setNote] = useState('');
  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && setOpen(false);
    if (open) { document.addEventListener('keydown', esc); document.body.style.overflow = 'hidden'; }
    return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [open, setOpen]);
  const left = Math.max(0, SITE.freeShippingOver - subtotal);
  const checkout = async () => { const r = await cartService.checkout(); setNote(r.message); };

  return (
    <div className={`fixed inset-0 z-[60] ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-black/50 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} />
      <aside role="dialog" aria-modal="true" aria-label="Shopping cart" className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <header className="flex items-center justify-between border-b px-5 py-4"><h2 className="text-lg font-semibold">Your cart</h2><button type="button" aria-label="Close cart" onClick={() => setOpen(false)}><X /></button></header>
        <div className="border-b bg-brand-light px-5 py-3 text-xs">
          {left > 0 ? <>Add <b>{formatPrice(left)}</b> more for free shipping</> : <b>You have unlocked free shipping!</b>}
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white"><div className="h-full bg-brand transition-all" style={{ width: `${Math.min(100, (subtotal / SITE.freeShippingOver) * 100)}%` }} /></div>
        </div>
        <div className="flex-1 overflow-y-auto px-5">
          {items.length === 0 ? (
            <div className="grid h-full place-items-center text-center"><div><ShoppingBag className="mx-auto mb-3 text-gray-300" size={48} /><p className="text-gray-600">Your cart is empty</p><Link to="/collections/all-products" onClick={() => setOpen(false)} className="btn-primary mt-4">Return to shop</Link></div></div>
          ) : (
            <ul className="divide-y">
              {items.map((i) => (
                <li key={i.variantId} className="flex gap-3 py-4">
                  <img src={i.image} alt={i.title} className="h-20 w-20 rounded-lg object-cover" />
                  <div className="flex-1"><Link to={`/products/${i.handle}`} onClick={() => setOpen(false)} className="text-sm font-medium hover:text-brand">{i.title}</Link>
                    <p className="text-xs text-gray-500">{i.variantTitle}</p>
                    <div className="mt-2 flex items-center justify-between"><QuantitySelector small value={i.qty} onChange={(q) => updateQty(i.variantId, q)} /><span className="text-sm font-semibold">{formatPrice(i.price * i.qty)}</span></div></div>
                  <button type="button" aria-label={`Remove ${i.title}`} onClick={() => removeItem(i.variantId)} className="self-start text-gray-400 hover:text-sale"><Trash2 size={16} /></button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {items.length > 0 && (
          <footer className="space-y-3 border-t p-5">
            <div className="flex justify-between font-semibold"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <p className="text-xs text-gray-500">Shipping and taxes calculated at checkout.</p>
            <Link to="/cart" onClick={() => setOpen(false)} className="btn-outline w-full">View cart</Link>
            <button type="button" onClick={checkout} className="btn-primary w-full">Checkout (placeholder)</button>
            {note && <p role="status" className="rounded bg-yellow-50 p-2 text-xs text-yellow-800">{note} No payment is taken in this demo.</p>}
          </footer>
        )}
      </aside>
    </div>
  );
}
