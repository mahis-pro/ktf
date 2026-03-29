import { Section } from '../layout/Section';
import { motion } from 'framer-motion';

const CRITERIA = [
  { label: 'Innovation', desc: 'The novelty of the solution and the scope of technological advancement.' },
  { label: 'Execution', desc: 'Consistency, reliability, and technical craftsmanship under high-stakes pressure.' },
  { label: 'Collaboration', desc: 'Effective integration across disciplines—developers, designers, and strategists.' },
  { label: 'Impact', desc: 'The real-world social or technical utility of the project in the ecosystem.' },
  { label: 'Presentation', desc: 'The clarity, professionalism, and strategic storytelling of the final pitch.' }
];

export function AwardCriteria() {
  return (
    <Section className="bg-surface py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-24 flex flex-col md:flex-row items-end justify-between gap-12">
           <div className="max-w-2xl">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-secondary mb-8">System_Audit</h4>
              <h2 className="text-4xl sm:text-6xl font-display font-medium tracking-tight text-primary leading-[1.1] uppercase mb-12">
                Judging <br />
                <span className="text-secondary italic">Criteria.</span>
              </h2>
           </div>
           <p className="max-w-xs text-on-surface-variant text-sm font-light italic leading-relaxed border-t border-outline-variant/30 pt-8 opacity-60">
             Every nomination is audited against five objective metrics to ensure total transparency.
           </p>
        </div>

        <div className="grid gap-px bg-outline-variant/20 sm:grid-cols-2 lg:grid-cols-3">
           {CRITERIA.map((item, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1, duration: 0.6 }}
               className="p-12 bg-white hover:bg-primary hover:text-white transition-all duration-700 rounded-none min-h-[400px] flex flex-col group justify-between"
             >
                <div className="flex items-center justify-between">
                   <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 group-hover:text-secondary transition-all">Audit_Metric // 0{i+1}</span>
                   <div className="h-px w-12 bg-primary/20 group-hover:bg-white/40 transition-colors" />
                </div>
                
                <div>
                   <h3 className="text-4vw sm:text-4xl font-bold mb-8 uppercase tracking-tighter group-hover:italic transition-all leading-tight">{item.label}</h3>
                   <p className="text-sm font-medium leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">
                     {item.desc}
                   </p>
                </div>
                
                <div className="flex items-center gap-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                   <div className="h-1 w-12 bg-white/40" />
                   <span className="text-[8px] font-bold uppercase tracking-widest">Mastery_Level_Required</span>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </Section>
  );
}
