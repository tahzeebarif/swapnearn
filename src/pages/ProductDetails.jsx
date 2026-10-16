import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductGallery from '../components/ProductGallery';
import PriceDisplay from '../components/PriceDisplay';
import QuantitySelector from '../components/QuantitySelector';
import AddToCartButton from '../components/AddToCartButton';
import ProductGrid from '../components/ProductGrid';
import ReviewSection from '../components/ReviewSection';
import Stars from '../components/Stars';
import { getProductByHandle, getRelatedProducts } from '../services/productService';
import { collections } from '../data/mockProducts';
import { useCart } from '../context/CartContext';
import { cartService } from '../services/cartService';
import useAsync from '../hooks/useAsync';

export default function ProductDetails() {
  const { handle } = useParams();
  const { data: product, loading, error } = useAsync(() => getProductByHandle(handle), [handle]);
  const { data: related, loading: relLoading } = useAsync(() => (product ? getRelatedProducts(product) : Promise.resolve([])), [product?.id]);
  const [variantId, setVariantId] = useState(null);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('description');
  const { addItem, setOpen } = useCart();
  const [note, setNote] = useState('');

  useEffect(() => { setVariantId(null); setQty(1); setTab('description'); setNote(''); }, [handle]);

  if (loading) return <div className="container-x grid gap-8 py-10 md:grid-cols-2"><div className="aspect-square animate-pulse rounded-2xl bg-gray-100" /><div className="space-y-4"><div className="h-8 w-3/4 animate-pulse rounded bg-gray-100" /><div className="h-5 w-1/3 animate-pulse rounded bg-gray-100" /></div></div>;
  if (error) return <div role="alert" className="container-x py-20 text-center text-red-600">Could not load this product.</div>;
  if (!product) return (
    <div className="container-x py-20 text-center"><h1 className="text-2xl font-semibold">Product not found</h1><Link to="/collections/all-products" className="btn-primary mt-6">Back to shop</Link></div>
  );

  const variant = product.variants.find((v) => v.id === variantId) || product.variants[0];
  const col = collections.find((c) => c.slug === product.category);
  const buyNow = async () => {
    addItem({ variantId: variant.id, productId: product.id, handle: product.handle, title: product.title, variantTitle: variant.title, price: variant.price, image: product.images[0] }, qty);
    setOpen(false);
    const r = await cartService.checkout();
    setNote(r.message + ' (demo - no payment taken)');
  };
  const tabs = [['description', 'Description'], ['ingredients', 'Ingredients'], ['howto', 'How to use']];

  return (
    <>
      <Breadcrumbs items={[{ label: col?.title || 'Shop', to: `/collections/${product.category}` }, { label: product.title }]} />
      <div className="container-x grid gap-8 pb-6 md:grid-cols-2 lg:gap-12">
        <ProductGallery images={product.images} title={product.title} />
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">{product.title}</h1>
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">{product.reviewCount > 0 ? <><Stars rating={product.rating} size={16} /> {product.rating} ({product.reviewCount} reviews - demo)</> : 'No reviews yet'}</div>
          <div className="mt-4"><PriceDisplay price={variant.price} compareAtPrice={variant.compareAtPrice} large /></div>
          <p className="mt-1 text-xs text-gray-400">Prices and discounts are demo content until verified.</p>

          <fieldset className="mt-6"><legend className="mb-2 text-sm font-medium">Option: <span className="text-gray-500">{variant.title}</span></legend>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button key={v.id} type="button" onClick={() => setVariantId(v.id)} aria-pressed={v.id === variant.id}
                  className={`rounded-full border px-4 py-2 text-sm transition ${v.id === variant.id ? 'border-brand bg-brand text-white' : 'hover:border-brand'}`}>{v.title}</button>
              ))}
            </div>
          </fieldset>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <QuantitySelector value={qty} onChange={setQty} />
            <div className="min-w-[160px] flex-1"><AddToCartButton product={product} variant={variant} qty={qty} /></div>
          </div>
          <button type="button" onClick={buyNow} className="btn-outline mt-3 w-full">Buy it now</button>
          {note && <p role="status" className="mt-3 rounded bg-yellow-50 p-3 text-sm text-yellow-800">{note}</p>}

          <ul className="mt-6 grid gap-3 text-sm sm:grid-cols-3">
            {[[ShieldCheck, 'Quality tested'], [Truck, 'Fast delivery'], [RotateCcw, 'Easy returns']].map(([I, t]) => <li key={t} className="flex items-center gap-2 rounded-lg bg-brand-light p-3"><I size={18} className="text-brand" />{t}</li>)}
          </ul>
        </div>
      </div>

      <div className="container-x mt-8">
        <div role="tablist" className="flex gap-6 border-b">
          {tabs.map(([k, l]) => <button key={k} role="tab" aria-selected={tab === k} type="button" onClick={() => setTab(k)} className={`-mb-px border-b-2 pb-3 text-sm font-medium ${tab === k ? 'border-brand text-brand' : 'border-transparent text-gray-500'}`}>{l}</button>)}
        </div>
        <div role="tabpanel" className="py-6 text-sm leading-relaxed text-gray-600">
          {tab === 'description' && <><p>{product.description}</p><ul className="mt-3 list-disc space-y-1 pl-5">{product.benefits.map((b) => <li key={b}>{b}</li>)}</ul></>}
          {tab === 'ingredients' && <ul className="list-disc space-y-1 pl-5">{product.ingredients.map((b) => <li key={b}>{b}</li>)}</ul>}
          {tab === 'howto' && <p>{product.howToUse}</p>}
        </div>
        <ReviewSection product={product} />
        <section className="mt-14"><h2 className="mb-6 text-xl font-semibold">You may also like</h2><ProductGrid products={related} loading={relLoading} cols="grid-cols-2 lg:grid-cols-4" emptyText="No related products." /></section>
      </div>
    </>
  );
}
