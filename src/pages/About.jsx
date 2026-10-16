import { ShieldCheck, Leaf, HeartHandshake, FlaskConical } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { IMG } from '../data/images';
import { SITE } from '../config';
const vals = [[Leaf, 'Natural ingredients'], [ShieldCheck, 'Certified quality'], [FlaskConical, 'Lab tested'], [HeartHandshake, 'Customer first']];
export default function About() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'About Us' }]} />
      <div className="container-x grid items-center gap-10 pb-10 md:grid-cols-2">
        <div><h1 className="text-3xl font-semibold sm:text-4xl">About {SITE.name}</h1>
          <p className="mt-4 text-gray-600">Demo copy: We create natural wellness products - essential oil blends, supplements, hair care and skincare - designed to fit into everyday life. Replace this text with your brand story.</p>
          <p className="mt-3 text-gray-600">Our mission is to make trusted, certified wellness accessible to every home.</p></div>
        <img src={IMG.about} alt="About us" loading="lazy" className="w-full rounded-2xl" />
      </div>
      <div className="container-x grid grid-cols-2 gap-4 lg:grid-cols-4">{vals.map(([I, t]) => <div key={t} className="rounded-2xl bg-brand-light p-6 text-center"><I className="mx-auto mb-3 text-brand" /><p className="text-sm font-medium">{t}</p></div>)}</div>
    </>
  );
}
