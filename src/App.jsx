import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Collections from './pages/Collections';
import ProductDetails from './pages/ProductDetails';
import SearchResults from './pages/SearchResults';
import BrandPage from './pages/BrandPage';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import BlogList from './pages/BlogList';
import BlogDetails from './pages/BlogDetails';
import FAQ from './pages/FAQ';
import PolicyPage from './pages/PolicyPage';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/collections/:slug" element={<Shop />} />
        <Route path="/brands" element={<BrandPage />} />
        <Route path="/brands/:brandSlug" element={<BrandPage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/products/:handle" element={<ProductDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/shipping-policy" element={<PolicyPage policy="shipping" />} />
        <Route path="/return-refund-policy" element={<PolicyPage policy="returns" />} />
        <Route path="/privacy-policy" element={<PolicyPage policy="privacy" />} />
        <Route path="/terms-and-conditions" element={<PolicyPage policy="terms" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
