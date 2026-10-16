import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import QuantitySelector from '../components/QuantitySelector';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import { SITE } from '../config';
import { cartService } from '../services/cartService';

export default function Cart() {
  const { items, updateQty, removeItem, subtotal, clear } = useCart();
  const [note, setNote] = useState('');
  return (
    <>
      <Breadcrumbs items={[{ label: 'Cart' }]} />
      <div className="container-x pb-10">
        <h1 className="mb-6 text-3xl font-semibold">Your cart</h1>
        {items.length === 0 ? (
          <div className="grid place-items-center rounded-2xl bg-gray-50 py-20 text-center"><ShoppingBag size={48} className="text-gray-300" /><p className="mt-3 text-gray-600">Your cart is empty</p><Link to="/collections/all-products" className="btn-primary mt-5">Return to shop</Link></div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <ul className="divide-y rounded-2xl border">
              {items.map((i) => (
                <li key={i.variantId} className="flex gap-4 p-4">
                  <img src={i.image} alt={i.title} className="h-24 w-24 rounded-lg object-cover" />
                  <div className="flex-1"><Link to={`/products/${i.handle}`} className="font-medium hover:text-brand">{i.title}</Link><p className="text-xs text-gray-500">{i.variantTitle} - {formatPrice(i.price)}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-4"><QuantitySelector small value={i.qty} onChange={(q) => updateQty(i.variantId, q)} /><button type="button" onClick={() => removeItem(i.variantId)} className="flex items-center gap-1 text-xs text-gray-500 hover:text-sale"><Trash2 size={14} /> Remove</button></div></div>
                  <p className="font-semibold">{formatPrice(i.price * i.qty)}</p>
                </li>
              ))}
            </ul>
            <aside className="h-fit rounded-2xl border p-5">
              <h2 className="text-lg font-semibold">Order summary</h2>
              <div className="mt-4 flex justify-between"><span>Subtotal</span><span className="font-semibold">{formatPrice(subtotal)}</span></div>
              <p className="mt-2 text-xs text-gray-500">{subtotal >= SITE.freeShippingOver ? 'Free shipping applied.' : `Free shipping over ${formatPrice(SITE.freeShippingOver)}.`} Taxes calculated at checkout.</p>
              <button type="button" className="btn-primary mt-5 w-full" onClick={async () => setNote((await cartService.checkout()).message)}>Checkout (placeholder)</button>
              {note && <p role="status" className="mt-3 rounded bg-yellow-50 p-3 text-xs text-yellow-800">{note} No payment is collected in this demo.</p>}
              <button type="button" onClick={clear} className="mt-3 w-full text-center text-xs text-gray-500 underline">Clear cart</button>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
