import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

const ZONES = [
  {
    id: 'zone-01',
    title: 'Main Arena',
    role: 'Open to All',
    description: 'Keynotes, founder stories, startup pitches, and award ceremonies. The pulse of the festival.',
    image: '/events.jpg',
  },
  {
    id: 'zone-02',
    title: 'Simulation Arena',
    role: 'War Room',
    description: 'The war room. Focus on startup building, problem solving, and pitching under intense pressure.',
    image: '/events (2).jpg',
  },
  {
    id: 'zone-03',
    title: 'Innovation Pavilion',
    role: 'Connect & Grow',
    description: 'CV reviews, tech demos, startup booths, and the creator lab. Expand your circle.',
    image: '/events (3).jpg',
  }
];

export function ExperienceZones() {
  const [activeZone, setActiveZone] = useState<string>('zone-02');

  return (
    <section id="experience" className="relative min-h-svh overflow-hidden bg-[#050806] flex flex-col items-center justify-center py-32 px-4 scroll-mt-20">
      {/* Ambient neon green orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-emerald-600/10 blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-secondary/10 blur-[80px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Centered heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Experience Zones
          </h2>
          <p className="mt-4 text-base text-white/50 max-w-xl mx-auto italic">
            Three distinct environments built for different stages of the product lifecycle
          </p>
        </div>

        {/* Portrait Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-stretch mx-auto">
          {ZONES.map((zone) => {
            const isActive = activeZone === zone.id;
            return (
              <motion.div
                key={zone.id}
                layout
                onClick={() => setActiveZone(zone.id)}
                className={cn(
                  'relative group cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 border flex flex-col min-h-[500px]',
                  isActive
                    ? 'border-emerald-500/60 shadow-[0_0_60px_-10px_rgba(16,185,129,0.4)] sm:flex-[1.5]'
                    : 'border-white/10 hover:border-white/20'
                )}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={zone.image}
                    alt={zone.title}
                    className={cn(
                      "w-full h-full object-cover transition-all duration-700",
                      isActive ? "scale-105 grayscale-0 opacity-60" : "grayscale opacity-30 group-hover:opacity-40"
                    )}
                  />
                  {/* Gradient Overlay for text legibility */}
                  <div className={cn(
                    "absolute inset-0 transition-opacity duration-500",
                    isActive 
                      ? "bg-gradient-to-t from-[#050806] via-[#050806]/60 to-transparent" 
                      : "bg-[#050806]/40"
                  )} />
                </div>

                {/* Inner top neon line for active */}
                {isActive && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent pointer-events-none z-20" 
                  />
                )}

                <div className="relative z-10 p-8 flex flex-col h-full">
                  {/* Header Text */}
                  <div className="mt-auto">
                    <p className={cn(
                      'text-[10px] font-bold uppercase tracking-[0.2em] mb-2 transition-colors',
                      isActive ? 'text-emerald-400' : 'text-white/30'
                    )}>
                      {zone.role}
                    </p>
                    <h3 className={cn(
                      "text-3xl font-bold text-white leading-tight transition-all duration-500",
                      isActive ? "mb-4" : "mb-0"
                    )}>
                      {zone.title}
                    </h3>

                    {/* Description — visible on active */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <p className="text-sm leading-relaxed text-white/70 max-w-[90%]">
                            {zone.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Bottom neon indicator */}
                  <div className="mt-8">
                    <div className={cn(
                      'h-[1px] w-full transition-all duration-700 origin-left',
                      isActive
                        ? 'bg-gradient-to-r from-emerald-500/60 via-emerald-500/40 to-transparent scale-x-100'
                        : 'bg-white/10 scale-x-0'
                    )} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Global Experience CTA */}
        <div className="mt-20 text-center">
           <Link to="/experience">
              <Button 
                variant="secondary" 
                size="lg" 
                className="px-12 h-14 rounded-none uppercase tracking-[0.2em] font-bold text-xs border-white/20 text-white hover:border-emerald-500 hover:text-emerald-400 transition-all duration-500"
              >
                Explore Detailed Journey
              </Button>
           </Link>
        </div>
      </div>
    </section>
  );
}
