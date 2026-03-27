import { useState } from 'react';
import { Section } from '../layout/Section';
import { cn } from '../../lib/utils';
import { Plus, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CARDS = [
  {
    id: '01',
    title: 'Live Startup',
    subtext: 'Simulation Constraint',
    description: 'Build a company in 24 hours. From ideation to deployment under real market constraints.'
  },
  {
    id: '02',
    title: 'Product War Room',
    subtext: 'Crisis Engineering',
    description: 'Solve crisis-level engineering problems with limited resources and tight deadlines.'
  },
  {
    id: '03',
    title: 'Corporate Workflow',
    subtext: 'Agile & CI/CD',
    description: 'Experience enterprise-grade CI/CD and agile development tracks with actual industry leads.'
  },
  {
    id: '04',
    title: 'Creative Battles',
    subtext: 'UX & Speed Runs',
    description: 'Front-end speed runs and UX teardowns. Design the impossible before the clock runs out.'
  }
];

function InteractiveGlassCard({ data, isActive, onToggle }: { data: typeof CARDS[0], isActive: boolean, onToggle: () => void }) {
  return (
    <motion.div
      layout
      transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
      className={cn(
        "relative flex flex-col p-6 rounded-[24px] cursor-pointer overflow-hidden transition-all duration-500 w-full group",
        isActive 
          ? "bg-gradient-to-br from-[#1c1c1c]/90 to-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 text-white min-h-[420px] shadow-[0_16px_40px_-15px_rgba(0,0,0,0.6)]" 
          : "bg-gradient-to-br from-white/70 to-surface/40 backdrop-blur-xl border border-white/60 text-primary min-h-[280px] shadow-[0_8px_20px_-10px_rgba(0,0,0,0.05)] hover:border-black/5"
      )}
      onClick={onToggle}
    >
      <div className="flex justify-between items-start mb-6">
        <motion.span layout="position" className="text-2xl font-bold tracking-tight">{data.id}</motion.span>
        <button 
          className={cn(
            "h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300",
            isActive ? "bg-white/10 hover:bg-white/20 text-white" : "bg-white hover:bg-black/5 text-primary shadow-sm"
          )}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
        >
           {isActive ? <X size={16} /> : <Plus size={16} />}
        </button>
      </div>

      <div className={cn("flex flex-col flex-grow", isActive ? "justify-start mt-2" : "justify-end")}>
        <motion.div layout="position">
          <h3 className="text-2xl font-semibold mb-1 leading-tight">{data.title}</h3>
          <p className={cn("text-xs font-semibold uppercase tracking-widest mb-6", isActive ? "text-white/40" : "text-primary/50")}>
            {data.subtext}
          </p>
        </motion.div>
        
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, opacity: { delay: 0.1 } }}
              className="flex flex-col flex-grow justify-between overflow-hidden"
            >
              <p className="text-sm leading-relaxed text-white/80 mb-8 pt-4">
                {data.description}
              </p>
              
              <div className="mt-auto pt-4 border-t border-white/10">
                <button className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 transition-all px-4 py-2 mt-4 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md border border-white/10 group-hover:border-white/20 w-fit">
                  <span className="ml-2">Get Started</span>
                  <div className="bg-white text-black rounded-full p-1.5 transition-transform group-hover:-rotate-45 ml-4">
                    <ArrowRight size={14} />
                  </div>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function Differentiation() {
  const [activeCard, setActiveCard] = useState<string | null>('02');

  return (
    <Section id="differentiation" className="bg-surface relative overflow-hidden pb-40 scroll-mt-20">
      {/* Ambient premium glassmorphism blobs */}
      <div className="absolute top-1/2 left-1/4 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-blue-400/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mb-20 text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-primary">
          This is not a conference
        </h2>
        <p className="mt-6 text-on-surface-variant max-w-2xl mx-auto text-lg">
          Forget passive listening. It’s an interactive, high-stakes environment where theory meets execution.
        </p>
      </div>

      <div className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-start mx-auto max-w-7xl px-4">
        {CARDS.map((card) => (
          <InteractiveGlassCard 
            key={card.id} 
            data={card} 
            isActive={activeCard === card.id} 
            onToggle={() => setActiveCard(activeCard === card.id ? null : card.id)} 
          />
        ))}
      </div>
    </Section>
  );
}
