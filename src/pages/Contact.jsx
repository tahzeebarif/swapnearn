import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { SITE } from '../config';

export default function Contact() {
  const [f, setF] = useState({ name: '', email: '', phone: '', message: '' });
  const [errs, setErrs] = useState({});
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!f.name.trim()) er.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) er.email = 'Please enter a valid email.';
    if (f.phone && !/^[0-9+\-\s]{7,15}$/.test(f.phone)) er.phone = 'Please enter a valid phone number.';
    if (f.message.trim().length < 10) er.message = 'Message must be at least 10 characters.';
    setErrs(er);
    if (Object.keys(er).length === 0) { setSent(true); setF({ name: '', email: '', phone: '', message: '' }); }
  };
  const Field = ({ k, label, type = 'text', area }) => (
    <div><label htmlFor={k} className="mb-1 block text-sm font-medium">{label}</label>
      {area ? <textarea id={k} rows="5" value={f[k]} onChange={set(k)} className="input" aria-invalid={!!errs[k]} /> : <input id={k} type={type} value={f[k]} onChange={set(k)} className="input" aria-invalid={!!errs[k]} />}
      {errs[k] && <p role="alert" className="mt-1 text-xs text-red-500">{errs[k]}</p>}</div>
  );
  return (
    <>
      <Breadcrumbs items={[{ label: 'Contact Us' }]} />
      <div className="container-x grid gap-10 pb-10 md:grid-cols-[1fr_320px]">
        <div><h1 className="text-3xl font-semibold">Contact Us</h1>
          {sent && <p role="status" className="mt-4 rounded-lg bg-brand-light p-3 text-sm text-brand">Thanks! Your message was validated. (Demo - not sent anywhere yet.)</p>}
          <form onSubmit={submit} noValidate className="mt-6 space-y-4"><Field k="name" label="Name *" /><Field k="email" label="Email *" type="email" /><Field k="phone" label="Phone" type="tel" /><Field k="message" label="Message *" area /><button type="submit" className="btn-primary">Send message</button></form></div>
        <aside className="h-fit space-y-4 rounded-2xl bg-brand-light p-6 text-sm">
          <p className="flex gap-3"><Phone size={18} className="text-brand" /> {SITE.phone}</p><p className="flex gap-3"><Mail size={18} className="text-brand" /> {SITE.email}</p><p className="flex gap-3"><MapPin size={18} className="text-brand" /> Your address here (demo)</p>
          <a href={SITE.whatsapp} className="btn-primary w-full">Chat on WhatsApp</a>
        </aside>
      </div>
    </>
  );
}
