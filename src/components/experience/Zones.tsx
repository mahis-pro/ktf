import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '../layout/Section';
import { cn } from '../../lib/utils';
import { Globe, ShieldAlert, Briefcase, Paintbrush } from 'lucide-react';

const ZONES = [
  {
    id: 'main',
    title: 'Main Arena',
    icon: Globe,
    description: 'The pulse of the festival. High-impact keynotes and high-stakes startup pitches.',
    highlights: ['Keynote Sessions', 'Founder Stories', 'Startup Pitches', 'Awards Ceremony'],
    image: '/pitch battle.jpg'
  },
  {
    id: 'simulation',
    title: 'Simulation Arena',
    icon: ShieldAlert,
    description: 'Where theory meets friction. Execute under pressure in high-fidelity business simulations.',
    highlights: ['Startup Simulation', 'Product War Room', 'Crisis Decision Making', 'Pitch Prep'],
    image: '/events (4).jpg'
  },
  {
    id: 'pavilion',
    title: 'Innovation Pavilion',
    icon: Briefcase,
    description: 'Connecting talent to the ecosystem. Career growth and product discovery.',
    highlights: ['CV Reviews', 'Mock Interviews', 'Startup Booths', 'Tech Demos'],
    image: '/networking.jpg'
  },
  {
    id: 'creative',
    title: 'Creative Tech Track',
    icon: Paintbrush,
    description: 'Where utility meets artistry. Digital craftsmanship at the speed of light.',
    highlights: ['Digital Art Battle', 'Brand Sprint', 'Creator Lab', 'Content Studio'],
    image: '/events (3).jpg'
  }
];

export function ExperienceZones() {
  const [activeZone, setActiveZone] = useState(ZONES[0]);

  return (
    <Section className="bg-surface py-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-20">
          <h2 className="text-4xl sm:text-6xl font-display font-medium tracking-tight text-primary uppercase mb-8">
            Experience <br />
            <span className="text-on-surface-variant italic font-light text-3xl sm:text-4xl lowercase">Zones & Access.</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Tab Navigation */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            {ZONES.map((zone) => (
              <button
                key={zone.id}
                onClick={() => setActiveZone(zone)}
                className={cn(
                  "p-8 text-left transition-all duration-300 border-l-2 flex items-center justify-between group",
                  activeZone.id === zone.id 
                    ? "border-primary bg-primary/5 text-primary" 
                    : "border-outline-variant/20 hover:border-primary/40 text-on-surface-variant"
                )}
              >
                <div className="flex items-center gap-6">
                   <zone.icon size={20} className={activeZone.id === zone.id ? "text-primary" : "text-primary/40"} />
                   <span className="text-lg font-bold uppercase tracking-widest">{zone.title}</span>
                </div>
                <div className={cn(
                    "h-2 w-2 rounded-full transition-all duration-300",
                    activeZone.id === zone.id ? "bg-primary scale-125" : "bg-primary/20 scale-0 group-hover:scale-75"
                )} />
              </button>
            ))}
          </div>

          {/* Active Zone Detail */}
          <div className="flex-1 min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeZone.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="h-full grid md:grid-cols-2 gap-12"
              >
                <div className="flex flex-col justify-center">
                  <h3 className="text-4xl font-bold text-primary mb-6">{activeZone.title}</h3>
                  <p className="text-on-surface-variant text-lg font-light italic leading-relaxed mb-10">
                    "{activeZone.description}"
                  </p>
                  
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary mb-6">Zone Highlights</h4>
                    <ul className="grid grid-cols-1 gap-4">
                      {activeZone.highlights.map((item, i) => (
                        <li key={i} className="flex items-center gap-4 text-sm font-semibold tracking-wide text-primary">
                          <div className="h-1 w-4 bg-primary/20" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="relative rounded-none overflow-hidden border border-outline-variant/30 h-[400px] md:h-full">
                   <img 
                    src={activeZone.image} 
                    alt={activeZone.title} 
                    className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-1000" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Section>
  );
}
