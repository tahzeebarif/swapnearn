/**
 * Header.jsx
 *
 * Layout:
 *  ┌─────────────────────────────────────────────────────────┐
 *  │  [Sukooon]        [  S w a p  ]        [Search] [🛒] [Life Aura] │
 *  └─────────────────────────────────────────────────────────┘
 *
 * "Swap" logo is absolutely centered on the FULL header width.
 * Left and right content sit in their own flex containers.
 * Search is icon-only until clicked → smooth expand animation.
 */

import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ShoppingBag, ChevronDown, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { collections, brands } from '../data/mockProducts';
import { SITE } from '../config';
import SwapnEarnLogo from './SwapnEarnLogo';
import SearchBar from './SearchBar';

export default function Header() {
  const { count, setOpen } = useCart();
  const [mobile, setMobile]           = useState(false);
  const [concernOpen, setConcernOpen] = useState(false);
  const [searchOpen, setSearchOpen]   = useState(false);

  const searchRowRef = useRef(null);

  /* Close search bar when user clicks outside the entire header search row */
  useEffect(() => {
    const handler = (e) => {
      if (searchRowRef.current && !searchRowRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    if (searchOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [searchOpen]);

  /* Auto-focus input after animation starts */
  useEffect(() => {
    if (searchOpen) {
      const t = setTimeout(() => {
        searchRowRef.current?.querySelector('input')?.focus();
      }, 100);
      return () => clearTimeout(t);
    }
  }, [searchOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e0d8cc] bg-[#f2ede3]/95 backdrop-blur-md">

      {/* ── Top Main Bar ── */}
      <div className="container-x relative flex h-16 sm:h-20 items-center justify-between">

        {/* Absolutely centered logo */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <Link
            to="/"
            aria-label="Swap — Home"
            className="pointer-events-auto flex items-center hover:opacity-80 transition-opacity"
          >
            {SITE.logoUrl ? (
              <img src={SITE.logoUrl} alt={SITE.name} className="h-11 sm:h-14 w-auto object-contain" />
            ) : (
              <SwapnEarnLogo className="h-12 sm:h-16 w-auto" />
            )}
          </Link>
        </div>

        {/* LEFT: hamburger + Sukooon */}
        <div className="flex items-center gap-2 shrink-0">
          <button type="button" aria-label="Open menu"
            className="p-1.5 text-gray-700 lg:hidden"
            onClick={() => setMobile(true)}>
            <Menu size={24} />
          </button>
          <Link to="/brands/sukoon-wellness"
            className="hidden md:flex items-center justify-center rounded-xl bg-[#1b5e3b] px-3 sm:px-4 py-1.5 sm:py-2 text-white shadow-sm hover:bg-[#145230] active:scale-95 transition"
            title="Shop Sukooon Wellness & Care">
            <div className="text-center leading-none">
              <div className="flex items-center justify-center gap-1">
                <span className="text-sm sm:text-base font-bold font-serif italic tracking-tight">Sukooon</span>
                <span className="text-[10px]"></span>
              </div>
              <span className="hidden sm:block text-[6.5px] tracking-wider uppercase font-medium opacity-90 mt-0.5">Wellness &amp; Care</span>
            </div>
          </Link>
        </div>

        {/* RIGHT: search icon + cart + Life Aura */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">

          {/* Search — mobile + desktop, compact pill expanding on click */}
          <div ref={searchRowRef} className="flex items-center relative">
            <div className={`flex items-center rounded-full border bg-white transition-all duration-300 ease-in-out ${
              searchOpen
                ? 'w-40 sm:w-52 lg:w-64 border-[#1b5e3b] shadow-sm'
                : 'w-28 sm:w-32 lg:w-40 border-gray-300'
            }`}>
              {searchOpen ? (
                <SearchBar
                  autoFocus
                  placeholder="Search products…"
                  onDone={() => setSearchOpen(false)}
                />
              ) : (
                <button
                  type="button"
                  aria-label="Open search"
                  onClick={() => setSearchOpen(true)}
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700 transition"
                >
                  <Search size={13} className="shrink-0 text-gray-400" />
                  <span>Search for products</span>
                </button>
              )}
            </div>
          </div>

          {/* Cart */}
          <button type="button" onClick={() => setOpen(true)}
            className="relative p-1.5 text-gray-700 hover:text-[#2fa482] transition"
            aria-label="View shopping bag">
            <ShoppingBag size={22} strokeWidth={1.8} />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full bg-black text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </button>

          {/* Life Aura */}
          <Link to="/brands/the-life-aura"
            className="hidden md:flex items-center justify-center rounded-xl bg-[#1b5e3b] px-3 sm:px-4 py-1.5 sm:py-2 text-white shadow-sm hover:bg-[#145230] active:scale-95 transition"
            title="Shop Life Aura Hair & Beauty Science">
            <div className="text-center leading-none">
              <div className="flex items-center justify-center gap-1">
                <span className="text-sm sm:text-base font-bold italic font-serif tracking-tight">Life Aura</span>
                <span className="text-[10px]"></span>
              </div>
              <span className="hidden sm:block text-[6.5px] tracking-wider uppercase font-medium opacity-90 mt-0.5">Hair &amp; Beauty Science</span>
            </div>
          </Link>
        </div>
      </div>

      {/* ── Sub-Navigation Bar ── */}
      <nav
        className="border-t border-[#e0d8cc] bg-[#f2ede3] hidden lg:block"
        aria-label="Sub Navigation"
      >
        <div className="container-x flex items-center justify-center gap-6 py-2.5 text-xs font-bold text-gray-800">
          <NavLink
            to="/collections/all-products"
            className={({ isActive }) =>
              `hover:text-[#2fa482] transition ${isActive ? 'text-[#2fa482]' : ''}`
            }
          >
            All Products
          </NavLink>

          <NavLink
            to="/collections/new-arrivals"
            className={({ isActive }) =>
              `hover:text-[#2fa482] transition ${isActive ? 'text-[#2fa482]' : ''}`
            }
          >
            New Arrivals!
          </NavLink>

          {/* Shop By Concern dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setConcernOpen(true)}
            onMouseLeave={() => setConcernOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 hover:text-[#2fa482] transition focus:outline-none"
              onClick={() => setConcernOpen((o) => !o)}
              aria-expanded={concernOpen}
            >
              <span>Shop By Concern</span>
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${concernOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {concernOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full z-50 w-64 pt-2">
                <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-xl space-y-1">
                  {collections.map((c) => (
                    <Link
                      key={c.slug}
                      to={`/collections/${c.slug}`}
                      onClick={() => setConcernOpen(false)}
                      className="block rounded-lg px-3 py-1.5 text-xs text-gray-700 hover:bg-[#2fa482]/10 hover:text-[#2fa482] transition font-medium"
                    >
                      {c.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <NavLink
            to="/collections/bundles"
            className={({ isActive }) =>
              `hover:text-[#2fa482] transition ${isActive ? 'text-[#2fa482]' : ''}`
            }
          >
            All Bundles
          </NavLink>

          <NavLink
            to="/collections/best-sellers"
            className={({ isActive }) =>
              `hover:text-[#2fa482] transition ${isActive ? 'text-[#2fa482]' : ''}`
            }
          >
            Best Sellers
          </NavLink>

          <Link to="/contact" className="hover:text-[#2fa482] transition">
            Track Order
          </Link>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="hover:text-[#2fa482] transition font-bold"
          >
            Cart
          </button>

          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#2fa482] transition font-bold text-[#2fa482]"
          >
            Whatsapp
          </a>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      <div className={`fixed inset-0 z-[70] lg:hidden ${mobile ? '' : 'pointer-events-none'}`}>
        <div
          onClick={() => setMobile(false)}
          className={`absolute inset-0 bg-black/50 transition-opacity ${
            mobile ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <nav
          aria-label="Mobile Navigation"
          className={`absolute left-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-white p-5 transition-transform duration-300 ${
            mobile ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Drawer header */}
          <div className="mb-4 flex items-center justify-between border-b pb-3">
            <span className="font-serif italic font-bold text-xl text-[#1b5e3b]">Swap</span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobile(false)}
              className="p-1 text-gray-500"
            >
              <X size={20} />
            </button>
          </div>

          {/* Mobile search — full SearchBar in drawer */}
          <div className="mb-4">
            <SearchBar
              placeholder="Search for products"
              onDone={() => setMobile(false)}
            />
          </div>

          {/* Brand links */}
          <div className="mb-4">
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
              House of Brands
            </div>
            <div className="grid grid-cols-2 gap-2">
              {brands.map((b) => (
                <Link
                  key={b.id}
                  to={`/brands/${b.slug}`}
                  onClick={() => setMobile(false)}
                  className="rounded-xl border border-gray-100 bg-gray-50 p-2 text-center text-xs font-bold text-gray-800 hover:border-[#2fa482] hover:text-[#2fa482] transition"
                >
                  {b.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <ul className="space-y-1 divide-y text-sm font-semibold text-gray-800">
            {[
              ['All Products',  '/collections/all-products'],
              ['New Arrivals!', '/collections/new-arrivals'],
              ['All Bundles',   '/collections/bundles'],
              ['Best Sellers',  '/collections/best-sellers'],
              ['Track Order',   '/contact'],
            ].map(([label, to]) => (
              <li key={to}>
                <Link onClick={() => setMobile(false)} to={to} className="block py-2.5">
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="block py-2.5 text-[#2fa482]"
              >
                Whatsapp
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
