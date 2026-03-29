import { Section } from '../layout/Section';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const ROLES = [
  { title: 'Developers', label: 'Logic & Scale', description: 'Architecting the core systems and performance layers.' },
  { title: 'Creatives', label: 'UX & Artistry', description: 'Designing high-conversion interfaces and digital art.' },
  { title: 'Strategists', label: 'Market & Vision', description: 'Structuring business models and startup narratives.' }
];

export function ExperienceCollaboration() {
  return (
    <Section className="bg-surface py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl sm:text-6xl font-display font-medium tracking-tight text-primary uppercase mb-12">
          Where Builders <br />
          <span className="text-secondary italic">Collaborate.</span>
        </h2>
        
        <p className="max-w-2xl mx-auto text-on-surface-variant text-lg font-light italic mb-24">
          KTF is the collision point. We force hybrid teams to solve shared problems, 
          breaking the silos between code, design, and business.
        </p>

        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-0">
          {/* Centered Collaboration Point (Visual Diagram) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block">
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
               className="h-[400px] w-[400px] border border-dashed border-primary/20 rounded-full flex items-center justify-center opacity-40"
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] border border-dashed border-primary/20 rounded-full opacity-20" />
            
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white h-24 w-24 border border-outline-variant/30 flex items-center justify-center rounded-none shadow-2xl z-10">
               <Plus className="text-primary" size={32} />
               <span className="absolute -top-10 text-[10px] font-bold uppercase tracking-widest text-secondary">Collision Point</span>
            </div>
          </div>

          {ROLES.map((role, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i === 0 ? -50 : i === 2 ? 50 : 0, y: i === 1 ? -30 : 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="z-20 w-full lg:w-72 p-10 bg-white border border-outline-variant/30 text-center flex flex-col items-center justify-center hover:shadow-2xl transition-all duration-500 rounded-none shadow-sm"
            >
              <h3 className="text-2xl font-bold text-primary mb-2 uppercase tracking-tighter">{role.title}</h3>
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-secondary mb-6">{role.label}</p>
              <p className="text-sm text-on-surface-variant font-light italic leading-relaxed">
                {role.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
