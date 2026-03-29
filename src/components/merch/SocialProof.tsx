import { Section } from '../layout/Section';
import { motion } from 'framer-motion';

const REVIEWS = [
  {
    name: 'Sarah_Dev',
    role: 'Fullstack Engineer',
    text: 'The MTF hoodie is my official uniform for nighttime coding sessions. The quality is unmatched.',
    count: '0.1'
  },
  {
    name: 'David_Design',
    role: 'UI Designer',
    text: 'Minimalist, technical, and high-quality. Perfectly aligns with the builder ecosystem vibes.',
    count: '0.2'
  },
  {
    name: 'Amina_Founder',
    role: 'Startup Founder',
    text: 'Representing the movement in every pitch. A visual signal of commitment to technical excellence.',
    count: '0.3'
  }
];

export function MerchSocialProof() {
  return (
    <Section className="bg-background py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl text-primary font-display font-medium uppercase tracking-[0.2em] mb-20">In the <br /> <span className="text-secondary italic">Wild.</span></h2>
        
        <div className="grid gap-px bg-outline-variant/10 sm:grid-cols-2 lg:grid-cols-3">
           {REVIEWS.map((review, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1, duration: 0.6 }}
               className="p-12 border border-outline-variant/10 bg-white hover:bg-primary hover:text-white transition-all duration-700 rounded-none h-auto flex flex-col group justify-between"
             >
                <div className="flex items-center justify-between mb-16">
                   <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 group-hover:text-secondary transition-all">Verified_Member // {review.count}</span>
                   <div className="h-px w-12 bg-primary/20 group-hover:bg-white/40 transition-colors" />
                </div>
                
                <p className="text-sm font-medium leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity mb-16">
                  "{review.text}"
                </p>
                
                <div className="flex items-center gap-4">
                   <div className="h-10 w-10 bg-primary group-hover:bg-secondary transition-colors rounded-none" />
                   <div className="text-left">
                      <h3 className="text-sm font-bold uppercase tracking-tighter group-hover:italic transition-all">{review.name}</h3>
                      <p className="text-[10px] uppercase font-bold tracking-widest opacity-40 group-hover:opacity-100">{review.role}</p>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </Section>
  );
}
