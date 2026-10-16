import { useState } from 'react';
import { Mail } from 'lucide-react';
export default function NewsletterForm({ dark = false }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', msg: '' });
  const submit = (e) => {
    e.preventDefault();
    if (!email.trim()) return setStatus({ type: 'error', msg: 'Please enter your email address.' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return setStatus({ type: 'error', msg: 'Please enter a valid email address.' });
    setStatus({ type: 'ok', msg: 'Thanks for subscribing! (demo - not saved anywhere yet)' });
    setEmail('');
  };
  return (
    <form onSubmit={submit} noValidate>
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <div className="flex gap-2">
        <div className="relative flex-1"><Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input id="newsletter-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" className="input !pl-9" aria-invalid={status.type === 'error'} /></div>
        <button type="submit" className={dark ? 'btn-light' : 'btn-primary'}>Subscribe</button>
      </div>
      {status.msg && <p role="status" className={`mt-2 text-sm ${status.type === 'error' ? 'text-red-500' : dark ? 'text-white' : 'text-brand'}`}>{status.msg}</p>}
    </form>
  );
}
