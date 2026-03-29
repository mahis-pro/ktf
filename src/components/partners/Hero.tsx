import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export function PartnersHero() {
  const scrollToContact = () => {
    document.getElementById('partner-contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-primary pt-32 pb-20 text-white">
      {/* Background design accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-secondary rounded-full blur-[100px]" />
        <div className="absolute top-1/2 -right-48 w-[600px] h-[600px] bg-secondary rounded-full blur-[150px]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-repeat opacity-5" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="text-[10px] font-bold tracking-[0.6em] text-secondary uppercase mb-8 block">
             ECOSYSTEM_ACCELERATION // 2025_2026
          </span>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-medium leading-[0.95] tracking-tighter mb-12 uppercase">
            Build the Future. <br />
            <span className="text-secondary italic">Partner with Us.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-white/70 text-lg lg:text-xl font-light italic mb-16 px-4">
            Position your brand at the center of innovation. Align with builders, 
            creatives, and technical leaders shaping the next decade of African technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
                size="lg" 
                className="w-full sm:w-auto px-20 h-20 bg-white text-primary hover:bg-white/95 rounded-none uppercase tracking-[0.3em] font-bold text-sm shadow-2xl transition-all duration-300 transform hover:scale-105"
                onClick={scrollToContact}
            >
              Request Pitch Deck
            </Button>
            <Button 
                variant="secondary"
                size="lg" 
                className="w-full sm:w-auto px-20 h-20 border-white/20 text-white hover:bg-white/10 rounded-none uppercase tracking-[0.3em] font-bold text-sm transition-all duration-300 transform hover:scale-105 bg-transparent"
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Packages
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20"
      >
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent mx-auto" />
      </motion.div>
    </section>
  );
}
