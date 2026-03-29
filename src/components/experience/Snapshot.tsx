import { Section } from '../layout/Section';
import { motion } from 'framer-motion';

const DAY_STAGES = [
  { time: '09:00 - 12:00', stage: 'Morning: Immersion', desc: 'Diving into technical deep-dives and forming strategic teams.' },
  { time: '12:00 - 15:00', stage: 'Midday: Build & Explore', desc: 'Execution on the core project tracks and simulation modules.' },
  { time: '15:00 - 18:00', stage: 'Afternoon: Pressure & Pitch', desc: 'Solving final crisis modules and delivering the final pitch.' },
  { time: '18:00 - 21:00', stage: 'Closing: Awards & Networking', desc: 'Recognizing results and building connections across the ecosystem.' }
];

export function ExperienceSnapshot() {
  return (
    <Section className="bg-background py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-20 max-w-2xl">
          <h2 className="text-4xl sm:text-6xl font-display font-medium tracking-tight text-primary leading-[1.1] uppercase mb-8">
            Experience <br />
            <span className="text-secondary italic">Flow.</span>
          </h2>
          <p className="text-on-surface-variant text-lg font-light leading-relaxed mb-12">
            A snapshot of the daily cadence at KTF. Each phase is designed 
            to maximize focus, execution, and outcomes.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4 px-4 lg:px-0">
          {DAY_STAGES.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative p-10 border border-outline-variant/30 bg-surface-container-low group hover:bg-secondary/5 transition-colors duration-500 rounded-none shadow-sm h-full flex flex-col justify-between"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-secondary mb-12 block">{item.time}</span>
              <div>
                 <h3 className="text-xl font-bold text-primary mb-4 leading-tight">{item.stage}</h3>
                 <p className="text-xs text-on-surface-variant font-light italic leading-relaxed">
                   {item.desc}
                 </p>
              </div>
              <div className="absolute bottom-0 right-0 h-1 w-0 bg-secondary transition-all group-hover:w-full duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
