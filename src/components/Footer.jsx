import { Link } from 'react-router-dom';
import { Facebook, Instagram, MessageCircle, Music2 } from 'lucide-react';
import { SITE } from '../config';
import { IMG } from '../data/images';
import NewsletterForm from './NewsletterForm';

const cols = [
  { title: 'Quick Links', links: [['About us', '/about'], ['Essential Oils', '/collections/joint-muscle-care'], ['Hair Care', '/collections/hair-care'], ['Skin Care', '/collections/skin-care'], ['Blog', '/blog']] },
  { title: 'Support', links: [['Home', '/'], ['Categories', '/collections'], ['All Products', '/collections/all-products'], ['Bundles', '/collections/bundles'], ['FAQ', '/faq']] },
  { title: 'Policies', links: [['Shipping Policy', '/shipping-policy'], ['Return & Refund Policy', '/return-refund-policy'], ['Privacy Policy', '/privacy-policy'], ['Terms & Conditions', '/terms-and-conditions'], ['Contact Us', '/contact']] },
];

export default function Footer() {
  return (
    <footer className="mt-20 bg-brand-dark text-white/90">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <img src="/Swap-LOGO.avif" alt={SITE.name} className="h-12 w-auto rounded bg-white p-1" />
          <p className="mt-4 max-w-sm text-sm text-white/70">{SITE.tagline}. Demo footer text - replace with your brand story.</p>
          <div className="mt-5 max-w-sm"><p className="mb-2 text-sm font-semibold">Subscribe to our newsletter</p><NewsletterForm dark /></div>
          <div className="mt-5 flex gap-3">
            {[[Facebook, SITE.social.facebook, 'Facebook'], [Instagram, SITE.social.instagram, 'Instagram'], [Music2, SITE.social.tiktok, 'TikTok'], [MessageCircle, SITE.whatsapp, 'WhatsApp']].map(([Icon, href, label]) => (
              <a key={label} href={href} aria-label={label} className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-accent"><Icon size={16} /></a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}><h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">{c.title}</h3>
            <ul className="space-y-2 text-sm">{c.links.map(([l, to]) => <li key={l}><Link to={to} className="text-white/70 hover:text-accent">{l}</Link></li>)}</ul></div>
        ))}
      </div>
      <div className="border-t border-white/10 py-4"><div className="container-x flex flex-col items-center justify-between gap-2 text-xs text-white/60 sm:flex-row"><p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved. Demo store.</p><p>Need help? {SITE.phone}</p></div></div>
    </footer>
  );
}
