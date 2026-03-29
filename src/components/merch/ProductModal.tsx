import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { X, ShoppingBag, Check } from 'lucide-react';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  isLimited?: boolean;
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleCheckout = () => {
    // General store link provided by user
    const STORE_LINK = 'https://paystack.shop/mtf-merch'; // Placeholder or actual if known
    window.location.href = STORE_LINK;
  };

  const isApparel = product.name.toLowerCase().includes('shirt') || product.name.toLowerCase().includes('hoodie');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4 overflow-y-auto pt-20 pb-10">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary/40 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-5xl bg-surface border border-outline-variant/30 flex flex-col md:flex-row h-auto md:h-[600px] overflow-hidden rounded-none shadow-2xl"
          >
            {/* Header / Close for mobile */}
            <button 
                onClick={onClose} 
                className="absolute top-6 right-6 z-20 hover:text-secondary p-2 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Product Image Section */}
            <div className="relative w-full md:w-1/2 h-[400px] md:h-full bg-surface-container-low group overflow-hidden">
               {product.isLimited && (
                  <div className="absolute top-0 right-0 z-10 bg-secondary text-white text-[12px] font-bold px-6 py-3 uppercase tracking-[0.2em]">
                    Limited_Edition
                  </div>
               )}
               <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000 grayscale group-hover:grayscale-0"
               />
               <div className="absolute inset-0 bg-primary/5 group-hover:opacity-0 transition-opacity" />
            </div>

            {/* Product Details Section */}
            <div className="flex-1 p-10 md:p-16 flex flex-col justify-between overflow-y-auto">
              <div>
                <span className="text-[10px] font-bold tracking-[0.6em] text-secondary uppercase mb-4 block">
                   ITEM_DETAILS // {product.id}
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-medium text-primary uppercase mb-8 tracking-tighter leading-tight">
                   {product.name}
                </h2>
                <p className="text-3xl font-display font-medium text-secondary mb-10 italic">
                   ₦{product.price}
                </p>
                <div className="h-px w-full bg-outline-variant/20 mb-10" />
                <p className="text-on-surface-variant text-lg font-light italic leading-relaxed mb-12 border-l-2 border-primary/10 pl-8">
                   {product.description}
                </p>

                {/* Selectors */}
                <div className="space-y-12">
                   {isApparel && (
                      <div className="space-y-6">
                         <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-primary/60">
                            <span>Select Size</span>
                            <span className="text-secondary italic">Fit: True to size</span>
                         </div>
                         <div className="flex flex-wrap gap-4">
                            {SIZES.map(size => (
                               <button
                                 key={size}
                                 onClick={() => setSelectedSize(size)}
                                 className={`h-14 w-14 flex items-center justify-center border font-bold transition-all transition-colors duration-500 rounded-none ${selectedSize === size ? 'bg-primary text-white border-primary' : 'border-outline-variant/30 text-primary hover:border-primary/50'}`}
                               >
                                  {size}
                               </button>
                            ))}
                         </div>
                      </div>
                   )}

                   <div className="space-y-6">
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-primary/60">Quantity</label>
                      <div className="flex items-center gap-6">
                         <button 
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="h-10 w-10 border border-outline-variant/30 flex items-center justify-center hover:border-primary transition-all rounded-none"
                         > - </button>
                         <span className="text-xl font-bold font-display">{quantity}</span>
                         <button 
                            onClick={() => setQuantity(quantity + 1)}
                            className="h-10 w-10 border border-outline-variant/30 flex items-center justify-center hover:border-primary transition-all rounded-none"
                         > + </button>
                      </div>
                   </div>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="pt-16">
                 <Button 
                    size="lg" 
                    className="w-full h-20 bg-primary text-white hover:bg-primary/90 rounded-none uppercase tracking-[0.3em] font-bold text-sm shadow-2xl shadow-primary/20 transition-all duration-300 transform hover:scale-105"
                    onClick={handleCheckout}
                 >
                    <ShoppingBag size={18} className="mr-4" />
                    Proceed to Checkout
                 </Button>
                 <p className="text-center mt-6 text-[10px] font-bold uppercase tracking-[0.4em] text-on-surface-variant/40">
                    *Ships within 48-72 hours across Nigeria.
                 </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
