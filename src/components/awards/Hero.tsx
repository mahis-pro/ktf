import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export function AwardHero() {
  const scrollToForm = () => {
    document.getElementById('nomination-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-background pt-32 pb-20">
      {/* Subtle Prestige Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-x-0 top-0 h-full w-full bg-[linear-gradient(to_right,#002519_1px,transparent_1px),linear-gradient(to_bottom,#002519_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="text-[10px] font-bold tracking-[0.6em] text-secondary uppercase mb-8 block">
             KTF_AWARDS // 2025/2026_CYCLE
          </span>
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-display font-medium leading-[0.9] tracking-tighter text-primary mb-12 uppercase">
            Nominate <br />
            <span className="text-secondary italic">Excellence.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-on-surface-variant text-lg lg:text-xl font-light italic mb-16 px-4">
            Recognizing the outstanding builders, creators, and technical innovators 
            shaping the future of our ecosystem.
          </p>
          
          <Button 
              size="lg" 
              className="px-20 h-20 bg-primary text-white hover:bg-primary/90 rounded-none uppercase tracking-[0.3em] font-bold text-sm shadow-2xl shadow-primary/20 transition-all duration-300 transform hover:scale-105"
              onClick={scrollToForm}
          >
            Submit a Nomination
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
