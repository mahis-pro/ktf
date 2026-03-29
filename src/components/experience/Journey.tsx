import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Section } from '../layout/Section';
import { Compass, Zap, Target, Award, Rocket } from 'lucide-react';

const STAGES = [
  {
    icon: Compass,
    title: 'Curiosity',
    description: 'The moment of discovery. Exploring the landscape of possibilities and forming a vision for the journey ahead.'
  },
  {
    icon: Zap,
    title: 'Immersion',
    description: 'Diving deep into the simulation. Learning new tech stacks and mastering workflows through intense focus.'
  },
  {
    icon: Target,
    title: 'Challenge',
    description: 'The real-world pressure test. Solving complex engineering and product design problems under technical constraints.'
  },
  {
    icon: Rocket,
    title: 'Exposure',
    description: 'Showcasing your work to industry leaders and the tech ecosystem. Getting your skills on the radar.'
  },
  {
    icon: Award,
    title: 'Celebration',
    description: 'Recognizing results and building connections. The final reward for high-performance execution.'
  }
];

export function ExperienceJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <Section className="bg-background py-40 overflow-hidden">
      <div className="mb-24 text-center max-w-2xl mx-auto px-4 lg:px-0">
        <h2 className="text-4xl sm:text-6xl font-display font-medium tracking-tight text-primary leading-[1.1] uppercase mb-8">
          The Experience <br />
          <span className="text-secondary italic">Journey.</span>
        </h2>
        <p className="text-on-surface-variant text-lg font-light leading-relaxed">
          The progression from discovery to mastery is a highly curated path of execution.
        </p>
      </div>

      <div ref={containerRef} className="relative max-w-4xl mx-auto px-4 lg:px-0">
        {/* Central Vertical Line (Functional Tech Look) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-outline-variant/30 -translate-x-1/2 hidden md:block" />
        
        <div className="space-y-40">
          {STAGES.map((stage, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`relative flex flex-col md:flex-row items-center gap-24 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Timeline Center Point */}
              <div className="absolute left-1/2 top-10 h-4 w-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 z-10 hidden md:block" />
              
              <div className="flex-1 w-full text-center md:text-left">
                <div className="mb-6 h-12 w-12 bg-surface-container flex items-center justify-center border border-outline-variant/30 rounded-none mx-auto md:mx-0">
                  <stage.icon size={20} className="text-primary" />
                </div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-secondary mb-4">Stage 0{i+1}</h4>
                <h3 className="text-3xl font-bold text-primary mb-6">{stage.title}</h3>
                <p className="text-on-surface-variant font-light italic leading-relaxed max-w-sm mx-auto md:mx-0">
                  {stage.description}
                </p>
              </div>
              
              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
