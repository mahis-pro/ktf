import { Section } from '../layout/Section';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';

export function AwardCTA() {
  const scrollToForm = () => {
    document.getElementById('nomination-form')?.scrollIntoView({ behavior: 'smooth' });
  };

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
          Celebrate <br />
          <span className="text-secondary italic">Excellence in Tech.</span>
        </h2>
        
        <p className="max-w-xl mx-auto text-white/60 text-lg font-light italic mb-16">
          "The future is built by those who execute. Nominate those who are setting 
          the standard and driving the ecosystem forward."
        </p>
        
        <Button 
            size="lg" 
            className="px-20 h-20 bg-white text-primary hover:bg-white/95 rounded-none uppercase tracking-[0.3em] font-bold text-sm shadow-2xl shadow-white/10 transition-all duration-300 transform hover:scale-105"
            onClick={scrollToForm}
        >
          Submit Nomination
        </Button>
      </div>
    </Section>
  );
}
