import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  isLimited?: boolean;
}

interface ProductCardProps {
  product: Product;
  onOpen: (product: Product) => void;
}

export function ProductCard({ product, onOpen }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <Card 
        className="relative overflow-hidden bg-surface border border-outline-variant/30 hover:border-primary/40 transition-all duration-700 rounded-none h-[500px] flex flex-col"
        onClick={() => onOpen(product)}
      >
        {/* Product Image */}
        <div className="relative h-2/3 w-full bg-surface-container-low overflow-hidden">
          {product.isLimited && (
            <div className="absolute top-0 right-0 z-10 bg-secondary text-white text-[10px] font-bold px-4 py-2 uppercase tracking-[0.2em] shadow-lg">
              Limited_Edition
            </div>
          )}
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>

        {/* Product Info */}
        <div className="p-8 flex-grow flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-primary uppercase tracking-tighter leading-tight group-hover:italic transition-all">
                 {product.name}
              </h3>
              <span className="text-xl font-display font-medium text-secondary">
                 ₦{product.price}
              </span>
            </div>
            <p className="text-on-surface-variant text-sm font-light italic leading-relaxed line-clamp-2">
              {product.description}
            </p>
          </div>
          
          <div className="flex items-center justify-between pt-6 border-t border-outline-variant/20">
             <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">MTF_Official</span>
             <Button variant="tertiary" size="sm" className="p-0 text-primary uppercase tracking-[0.2em] font-bold hover:bg-transparent hover:text-secondary group/btn">
                <span>View Details</span>
                <div className="h-px w-0 group-hover/btn:w-full bg-secondary transition-all" />
             </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
