import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

export function ExperienceHero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-background pt-20">
      {/* Background System Flow Visual (Abstract) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
        <div className="absolute inset-x-0 top-1/4 h-px bg-primary/20 animate-pulse" />
        <div className="absolute inset-x-0 bottom-1/4 h-px bg-primary/20 animate-pulse delay-1000" />
        <div className="absolute left-1/4 inset-y-0 w-px bg-primary/20 animate-pulse delay-500" />
        <div className="absolute right-1/4 inset-y-0 w-px bg-primary/20 animate-pulse delay-1500" />
        
        {/* Layered Floating Accents */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 4, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/3 w-64 h-64 border border-primary/20 rounded-full" 
        />
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -4, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/3 right-1/3 w-96 h-96 border border-primary/20 rounded-full" 
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <span className="text-[10px] font-mono tracking-[0.4em] text-primary/60 uppercase mb-8 block">
            System Initialized // Phase: 02_EXPERIENCE
          </span>
          <h1 className="text-6xl sm:text-8xl lg:text-[10rem] font-display font-medium leading-[0.9] tracking-tighter text-primary mb-12 uppercase">
            Step Into the <br />
            <span className="text-secondary italic">Experience.</span>
          </h1>
          
          <p className="max-w-xl mx-auto text-on-surface-variant text-lg lg:text-xl font-light italic mb-12">
            "Simulate constraints. Build architecture. Collaborate at scale. Compete for the future."
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button 
                size="lg" 
                className="px-12 h-16 rounded-none uppercase tracking-[0.2em] font-bold text-xs"
                onClick={() => document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore the Experience
            </Button>
            <Link to="/register">
                <Button 
                    variant="secondary" 
                    size="lg" 
                    className="px-12 h-16 rounded-none uppercase tracking-[0.2em] font-bold text-xs border-outline-variant/30"
                >
                  Get Access Permit
                </Button>
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
      >
        <span className="text-[8px] font-mono tracking-widest uppercase">Scroll to Initialize</span>
        <div className="w-px h-12 bg-primary/40" />
      </motion.div>
    </section>
  );
}
