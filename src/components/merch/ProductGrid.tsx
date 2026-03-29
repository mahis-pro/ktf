import { useState } from 'react';
import { Section } from '../layout/Section';
import { ProductCard } from './ProductCard';
import { ProductModal } from './ProductModal';

const PRODUCTS = [
  {
    id: 'MTF-TS-01',
    name: 'MTF Branded T-Shirt',
    description: 'Minimalist tech-luxe design. 100% heavy cotton, oversized fit, screen-printed iconic logo. Engineered for high-stakes building.',
    price: '12,500',
    image: '/merch/tshirt.png',
    isLimited: true
  },
  {
    id: 'MTF-HD-02',
    name: 'Tech Festival Hoodie',
    description: 'Black heavy-weight fleece with a structured technical fit. Features the metallic KTF blueprint across the back.',
    price: '28,000',
    image: '/merch/hoodie.png',
    isLimited: true
  },
  {
    id: 'KTF-NB-03',
    name: 'Tech Ecosystem Notebook',
    description: 'Hardbound matte black notebook. 192 grid-lined pages for logic design and strategic planning. Features a blind-debossed KTF logo.',
    price: '8,500',
    image: '/merch/notebook.png'
  },
  {
    id: 'MTF-SP-04',
    name: 'Sticker Pack (v2.0)',
    description: 'High-visibility laptop decals. Waterproof vinyl featuring tech humor, KTF branding, and ecosystem-specific coding icons.',
    price: '3,500',
    image: '/merch/stickers.png'
  },
  {
    id: 'MTF-LS-05',
    name: 'Tech Accessories Sleeve',
    description: 'Premium dark-felt laptop sleeve. Minimalist protection with a signature MTF leather patch. Designed for 14-inch/16-inch laptops.',
    price: '16,500',
    image: '/merch/sleeve.png'
  }
];

export function ProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <Section id="product-grid" className="bg-background py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-24 text-center max-w-2xl mx-auto">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-secondary mb-8">Ecosystem_Supply</h4>
          <h2 className="text-4xl sm:text-6xl font-display font-medium tracking-tight text-primary leading-[1.1] uppercase mb-12">
            Featured <br />
            <span className="text-secondary italic">Products.</span>
          </h2>
          <p className="text-on-surface-variant text-lg font-light leading-relaxed px-4">
             Each piece is a verification of your participation in the movement. 
             Engineered for comfort and technical identity.
          </p>
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((prod) => (
            <ProductCard 
               key={prod.id} 
               product={prod} 
               onOpen={openModal} 
            />
          ))}
        </div>

        <ProductModal 
           product={selectedProduct} 
           isOpen={isModalOpen} 
           onClose={() => setIsModalOpen(false)} 
        />
      </div>
    </Section>
  );
}
