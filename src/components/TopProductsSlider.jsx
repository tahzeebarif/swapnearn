import AutoSlider from '../components/AutoSlider';
import { products } from '../data/mockProducts';

// Featured product handles
const featuredHandles = [
    'joint-relief-oil', // Joint On
    'mens-daily-wellness', // Nugizer
    'roots-hair-serum', // Roots Serum
    'lifeaura-collagen-spray-120ml', // Collagen Spray
    'men-pro-protein-mix', // Men Pro Protein Mix
];

const featuredProducts = products.filter(p => featuredHandles.includes(p.handle)).slice(0, 5);

export default function TopProductsSlider() {
    return (
        <section className="container-x py-14">
            <h2 className="mb-8 text-center text-2xl font-extrabold uppercase tracking-wide text-gray-900">
                Featured Essentials
            </h2>
            <AutoSlider products={featuredProducts} interval={4000} />
        </section>
    );
}
