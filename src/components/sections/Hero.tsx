import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

function ScrambledText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [display, setDisplay] = useState(text.replace(/./g, ' '));
  
  useEffect(() => {
    let iteration = 0;
    let interval: any = null;
    
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplay(prev => 
          text.split("").map((char, index) => {
            if (index < iteration) return text[index];
            if (char === " " || char === "\n") return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join("")
        );
        
        if (iteration >= text.length) {
          clearInterval(interval);
        }
        
        iteration += 1 / 3;
      }, 30);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, delay]);

  return <span>{display}</span>;
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background pt-20">
      {/* Moving Technical Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-x-0 top-0 h-full w-full bg-[linear-gradient(to_right,#002519_1px,transparent_1px),linear-gradient(to_bottom,#002519_1px,transparent_1px)] bg-[size:40px_40px] animate-grid-flow" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
      </div>

      {/* Horizontal Scanline */}
      <div className="absolute inset-x-0 h-px bg-secondary/20 shadow-[0_0_15px_rgba(19,108,64,0.5)] z-0 pointer-events-none animate-scanline" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Coordinate Markers (Functional Tech Aesthetic) */}
        <div className="absolute top-0 left-4 hidden xl:block text-[10px] font-mono text-primary/30 uppercase tracking-[0.3em]">
          LAT: 8.4900° N <br /> LONG: 4.5419° E
        </div>
        <div className="absolute top-0 right-4 hidden xl:block text-[10px] font-mono text-primary/30 uppercase tracking-[0.3em] text-right">
          SYS_STATUS: ACTIVE <br /> PHASE: 01_SIMULATION
        </div>

        {/* Core Content Area */}
        <div className="max-w-5xl">
          <motion.h1 
            className="leading-[0.8] tracking-tighter text-primary uppercase font-display text-[15vw] lg:text-[12rem] select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <ScrambledText text="TECH IN" /><br />
            <ScrambledText text="MOTION" delay={600} /><span className="text-secondary opacity-50">.</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.2, ease: "circOut" }}
            className="h-px w-full max-w-md bg-outline-variant/30 my-12"
          />

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.6 }}
            className="mx-auto max-w-2xl text-lg sm:text-2xl text-on-surface-variant leading-relaxed font-body font-light italic"
          >
            "A high-stakes immersive simulation where the brightest minds 
            collide to solve real-world technical problems."
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-16"
          >
            <Button size="lg" className="px-12 h-16 text-sm font-bold uppercase tracking-[0.2em] rounded-none border border-primary hover:bg-primary hover:text-white transition-all duration-300">
              Initiate Access
            </Button>
            <Button variant="secondary" size="lg" className="px-12 h-16 text-sm font-bold uppercase tracking-[0.2em] rounded-none border border-outline-variant/30 hover:border-primary transition-all duration-300">
              Protocol Details
            </Button>
          </motion.div>
        </div>

        {/* Technical Footer (Functional Aesthetic) */}
        <div className="mt-32 w-full max-w-md flex items-center justify-between border-t border-outline-variant/20 pt-4 opacity-40">
           <div className="text-[10px] font-mono tracking-widest">KWASU_TECH_FEST // 2026</div>
           <div className="flex gap-4">
              <div className="h-1 w-1 bg-primary rounded-full animate-pulse" />
              <div className="h-1 w-1 bg-primary rounded-full animate-pulse delay-75" />
              <div className="h-1 w-1 bg-primary rounded-full animate-pulse delay-150" />
           </div>
           <div className="text-[10px] font-mono tracking-widest">VER: 1.0.4-BETA</div>
        </div>
      </div>
    </section>
  );
}
