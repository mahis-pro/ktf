import { Section } from '../layout/Section';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

const SEGMENTS = [
  { 
    role: 'Developers', 
    frontText: 'Build the Core',
    gain: 'Learn enterprise architectures and build under pressure.', 
    why: 'Because real engineering happens when time and resources are scarce.' 
  },
  { 
    role: 'Designers', 
    frontText: 'Craft Experience',
    gain: 'Lead UX strategy for high-stakes products.', 
    why: 'Design is not just visual; it is how the system works and converts.' 
  },
  { 
    role: 'Founders', 
    frontText: 'Scale Vision',
    gain: 'Validate ideas, meet technical co-founders, and pitch.', 
    why: 'Execution is the only metric that matters in the startup ecosystem.' 
  },
  { 
    role: 'Students', 
    frontText: 'Bridge the Gap',
    gain: 'Bridge the gap between campus theory and industry reality.', 
    why: 'Degrees don’t build products. Experience does.' 
  },
  { 
    role: 'Enthusiasts', 
    frontText: 'Fuel Culture',
    gain: 'Immerse in the culture, observe the chaos, and network.', 
    why: 'The best way to predict the future is to watch builders create it.' 
  }
];

function FlipCard({ segment }: { segment: typeof SEGMENTS[0] }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="group perspective-1000 h-[380px] w-full cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        className="relative h-full w-full preserve-3d shadow-sm rounded-lg"
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden rounded-lg border border-outline-variant/30 bg-surface flex flex-col p-8 bg-gradient-to-br from-surface to-surface-container-low">
          <div className="flex justify-between items-start mb-12">
             <div className="h-1px w-8 bg-primary/20" />
             <RefreshCw className="h-4 w-4 text-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="mt-auto">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/40 mb-3">
              {segment.role}
            </h4>
            <h3 className="text-3xl font-bold text-primary leading-tight">
              {segment.frontText}
            </h3>
          </div>
        </div>

        {/* Back Side */}
        <div 
          className="absolute inset-0 backface-hidden rounded-lg border border-primary/20 bg-primary flex flex-col p-8 text-white rotate-y-180"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="mb-8">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-6">
              The Gain
            </h4>
            <p className="text-lg font-medium leading-relaxed">
              {segment.gain}
            </p>
          </div>
          
          <div className="mt-auto border-t border-white/10 pt-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">
              Why it matters
            </h4>
            <p className="text-sm text-white/60 italic leading-relaxed">
              {segment.why}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function TargetAudience() {
  return (
    <Section id="audience" className="bg-background py-32 overflow-hidden scroll-mt-20">
      {/* Background decoration matching premium look */}
      <div className="absolute top-0 right-0 h-[600px] w-[600px] bg-primary/[0.02] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="mb-20 max-w-2xl">
          <h2 className="text-5xl font-bold tracking-tight text-primary mb-6">
            Built for those <br />
            who build the future
          </h2>
          <p className="text-lg text-on-surface-variant leading-relaxed">
            KTF is an ecosystem bringing together the moving parts of tech. 
            We bridge the gap between abstract theory and high-stakes execution.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {SEGMENTS.map((segment, i) => (
            <FlipCard key={i} segment={segment} />
          ))}
        </div>
      </div>
      
      {/* Logos row — Infinite Marquee for Partners */}
      <div className="mt-32 pt-16 border-t border-outline-variant/30 relative overflow-hidden">
        {/* Edge Fades */}
        <div className="absolute left-0 top-16 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-16 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div 
          className="flex whitespace-nowrap gap-24 items-center"
          animate={{
            x: [0, -1200], 
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-24 items-center">
              <div className="text-2xl font-bold text-primary/20">TechCorp</div>
              <div className="text-2xl font-bold text-primary/20">VentureX</div>
              <div className="text-2xl font-bold text-primary/20">BuildFlow</div>
              <div className="text-2xl font-bold text-primary/20">Nexus</div>
              <div className="text-2xl font-bold text-primary/20">Innovate Labs</div>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
