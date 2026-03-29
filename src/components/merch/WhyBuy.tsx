import { Section } from '../layout/Section';
import { motion } from 'framer-motion';
import { Users, Globe, Zap } from 'lucide-react';

const REASONS = [
  {
    icon: Users,
    title: 'Community Identity',
    desc: 'Each item is a visual verification of your role in the KTF ecosystem.'
  },
  {
    icon: Globe,
    title: 'Supporting Ecosystem',
    desc: 'All proceeds are reinvested into grassroots technical mentorship and startup growth.'
  },
  {
    icon: Zap,
    title: 'Limited Edition',
    desc: 'Exclusive drops that are never reproduced, creating unique value for early builders.'
  }
];

export function MerchWhyBuy() {
  return (
    <Section className="bg-surface py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-24 items-center">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-secondary mb-8">System_Values</h4>
          <h2 className="text-4xl sm:text-6xl font-display font-medium tracking-tight text-primary leading-[1.1] uppercase mb-12">
            Why the <br />
            <span className="text-secondary italic">Movement?</span>
          </h2>
          <p className="text-on-surface-variant text-lg lg:text-xl font-light leading-relaxed italic border-l-2 border-primary/20 pl-8 mb-12">
            "MTF Merchandise isn't about clothes; it's about the conviction to build. 
            When you wear the ecosystem, you signal a commitment to technical 
            mastery and collaborative innovation."
          </p>
          
          <div className="space-y-12">
             {REASONS.map((reason, i) => (
                <div key={i} className="flex gap-8 group">
                   <div className="h-14 w-14 flex-shrink-0 bg-primary/5 flex items-center justify-center border border-primary/10 rounded-none group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      <reason.icon size={24} />
                   </div>
                   <div>
                      <h3 className="text-xl font-bold text-primary mb-2 uppercase tracking-tighter group-hover:italic transition-all">{reason.title}</h3>
                      <p className="text-on-surface-variant text-sm font-light leading-relaxed">
                         {reason.desc}
                      </p>
                   </div>
                </div>
             ))}
          </div>
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1, delay: 0.2 }}
           className="relative group h-[600px] overflow-hidden border border-outline-variant/30 bg-surface-container-low flex items-center justify-center p-20"
        >
           <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 group-hover:opacity-60 transition-opacity" />
           <div className="relative z-10 text-center uppercase tracking-widest text-primary/10 select-none">
              <span className="text-[120px] font-display">MTF</span>
              <p className="text-[10px] font-bold tracking-[1em] mt-8">Official_Ecosystem_Supply</p>
           </div>
           
           <div className="absolute top-0 right-0 p-12 opacity-40">
              <div className="w-1 h-32 bg-primary/20" />
           </div>
           <div className="absolute bottom-0 left-0 p-12 opacity-40">
              <div className="w-1 h-32 bg-primary/20" />
           </div>
        </motion.div>
      </div>
    </Section>
  );
}
