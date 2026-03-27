import { motion } from 'framer-motion';
import { Section } from '../layout/Section';

const TIMELINE = [
  { time: '09:00 AM', title: 'Curiosity & Immersion', desc: 'Orientation, matching teams, and environment setup.' },
  { time: '12:00 PM', title: 'Build & Explore', desc: 'Intensive building and technical challenges.' },
  { time: '04:00 PM', title: 'Pressure & Pitch', desc: 'Simulated VC pitches and product reviews.' },
  { time: '07:00 PM', title: 'Recognition & Networking', desc: 'Awards, mixers, and future planning.' }
];

export function EventFlow() {
  return (
    <Section className="bg-background overflow-hidden">
      <div className="mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-primary mb-4">Event Flow</h2>
        <p className="text-on-surface-variant max-w-xl text-lg">A highly curated schedule moving from discovery to high-pressure execution.</p>
      </div>
      
      <div className="relative border-l border-surface-container-highest ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-12">
        {TIMELINE.map((item, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -10 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ delay: i * 0.1 }} 
            className="relative"
          >
            <div className="absolute -left-[39px] top-1.5 h-4 w-4 rounded-full bg-primary ring-4 ring-background" />
            <div className="mb-2 text-sm font-semibold text-primary">{item.time}</div>
            <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
            <p className="text-on-surface-variant max-w-md">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
