import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export function Hero() {
  return (
    <section className="relative min-h-[90svh] flex flex-col items-center justify-start overflow-hidden bg-background pt-32 pb-20">
      {/* Structural Elements (Replaces generic blurs) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full border-x border-primary" />
        <div className="absolute top-1/4 w-full border-t border-primary" />
        <div className="absolute top-3/4 w-full border-t border-primary" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Core Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h1 className="leading-[0.82] tracking-tight text-primary uppercase font-display">
            Tech in <br />
            Motion<span className="text-secondary opacity-50">.</span>
          </h1>
          
          <p className="mt-10 mx-auto max-w-2xl text-lg sm:text-xl text-on-surface-variant leading-relaxed font-body">
            Not a conference, but an immersive simulation of real-world tech environments, 
            product war rooms, and high-pressure creative battles.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10">
            <Button size="lg" className="px-10 h-14 text-sm font-bold uppercase tracking-wider rounded-md">
              Get Early Access
            </Button>
            <Button variant="secondary" size="lg" className="px-10 h-14 text-sm font-bold uppercase tracking-wider border-outline-variant/30 hover:bg-surface-container-low transition-all rounded-md">
              View Schedule
            </Button>
          </div>
        </motion.div>

        {/* Hero Illustration / Depth Layer */}
        <div className="mt-20 relative w-full max-w-5xl h-[300px] sm:h-[450px]">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full"
          >
            {/* Main Visual "Plate" */}
            <div className="relative w-full h-full rounded-xl overflow-hidden depth-plate bg-surface-container-low group">
              <img 
                src="/hero.png" 
                alt="KWASU Tech Festival Visual" 
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 scale-[1.02] group-hover:scale-100 origin-bottom"
              />
              
              {/* Subtle Overlay to integrate image with site */}
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply opacity-20 pointer-events-none" />
              
              {/* Structural lines overlay inside the plate */}
              <div className="absolute inset-0 pointer-events-none border border-white/10 m-2 rounded-lg" />
            </div>

            {/* Content Depth Marker (Simple, Functional) */}
            <div className="absolute -bottom-6 -right-6 hidden lg:block z-20">
              <div className="bg-primary text-white p-5 rounded-md shadow-2xl border border-white/5 flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Simulation: KTF-V2</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
