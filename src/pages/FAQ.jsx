import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { faqs } from '../data/mockProducts';
export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <>
      <Breadcrumbs items={[{ label: 'FAQ' }]} />
      <div className="container-x max-w-3xl pb-10">
        <h1 className="mb-6 text-3xl font-semibold">Frequently Asked Questions</h1>
        <div className="divide-y rounded-2xl border">
          {faqs.map((f, i) => (
            <div key={f.q}><h2><button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between p-4 text-left font-medium">{f.q}<ChevronDown size={18} className={`transition ${open === i ? 'rotate-180' : ''}`} /></button></h2>
              {open === i && <p className="px-4 pb-4 text-sm text-gray-600">{f.a}</p>}</div>
          ))}
        </div>
      </div>
    </>
  );
}
