import { Section } from '../layout/Section';
import { motion } from 'framer-motion';

export function AwardAbout() {
  return (
    <Section className="bg-surface py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-24 items-center">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-secondary mb-8">System_Mission</h4>
          <h2 className="text-4xl sm:text-6xl font-display font-medium tracking-tight text-primary leading-[1.1] uppercase mb-12">
            The Standard of <br />
            <span className="text-secondary italic">Excellence.</span>
          </h2>
          <p className="text-on-surface-variant text-lg lg:text-xl font-light leading-relaxed italic border-l-2 border-primary/20 pl-8">
            "The KTF Awards are not about recognition; they are about verification. 
            We celebrate those who execute with precision, innovate with impact, 
            and collaborate at the highest levels of technical craftsmanship."
          </p>
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1, delay: 0.2 }}
           className="relative group h-[500px] overflow-hidden border border-outline-variant/30 bg-surface-container-low flex items-center justify-center"
        >
           <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 group-hover:opacity-60 transition-opacity" />
           <div className="relative z-10 text-center p-12">
              <span className="text-[100px] font-display text-primary/10 tracking-tighter">KTF</span>
              <p className="text-xs uppercase tracking-[0.5em] text-primary/40 mt-4">Verified_Performance</p>
           </div>
           
           {/* Abstract Technical Grid for visual flair */}
           <div className="absolute bottom-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
              <div className="grid grid-cols-4 gap-2">
                 {[...Array(16)].map((_, i) => (
                    <div key={i} className="h-1 w-1 bg-primary/40 rounded-full" />
                 ))}
              </div>
           </div>
        </motion.div>
      </div>
    </Section>
  );
}
