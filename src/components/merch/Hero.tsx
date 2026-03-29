import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export function MerchHero() {
  const scrollToProducts = () => {
    document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-background pt-32 pb-20">
      {/* Background design accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 -right-48 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="text-[10px] font-bold tracking-[0.6em] text-secondary uppercase mb-8 block">
             MTF_CULTURE // OFFICIAL_MERCH
          </span>
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-display font-medium leading-[0.9] tracking-tighter text-primary mb-12 uppercase">
            Wear the <br />
            <span className="text-secondary italic">Ecosystem.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-on-surface-variant text-lg lg:text-xl font-light italic mb-16 px-4">
            Represent the culture of builders, creators, and technical innovators.
            Limited edition drops designed for the deep-tech community.
          </p>
          
          <Button 
              size="lg" 
              className="px-20 h-20 bg-primary text-white hover:bg-primary/90 rounded-none uppercase tracking-[0.3em] font-bold text-sm shadow-2xl shadow-primary/20 transition-all duration-300 transform hover:scale-105"
              onClick={scrollToProducts}
          >
            Explore Merch
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary/20"
      >
        <div className="w-px h-12 bg-gradient-to-b from-primary/40 to-transparent mx-auto" />
      </motion.div>
    </section>
  );
}
