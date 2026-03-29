import { Section } from '../layout/Section';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function ExperienceCTA() {
  return (
    <Section className="bg-primary py-40 overflow-hidden text-center text-white">
      {/* Background design accents for immersion */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
      <motion.div 
         animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
         transition={{ duration: 15, repeat: Infinity }}
         className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary blur-[200px] rounded-full pointer-events-none" 
      />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <h2 className="text-4xl sm:text-7xl font-display font-medium tracking-tighter uppercase mb-12">
          Don’t Just Attend <br />
          <span className="text-secondary italic">Tech. Experience It.</span>
        </h2>
        
        <p className="max-w-xl mx-auto text-white/60 text-lg font-light italic mb-16">
          "Passive participation is obsolete. KTF is where builders create infrastructure, 
          not slide decks."
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          <Link to="/register">
            <Button size="lg" className="px-12 h-16 bg-white text-primary hover:bg-white/90 rounded-none uppercase tracking-[0.2em] font-bold text-xs">
              Get Access
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="secondary" size="lg" className="px-12 h-16 border-white/20 text-white hover:border-white transition-colors rounded-none uppercase tracking-[0.2em] font-bold text-xs">
              View Registration Options
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  );
}
