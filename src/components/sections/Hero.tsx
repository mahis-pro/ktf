import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export function Hero() {
  return (
    <section className="relative min-h-svh flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Background Subtle Texture/Light */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] right-[5%] h-[500px] w-[500px] rounded-full bg-primary/[0.03] blur-[120px]" />
        <div className="absolute bottom-[10%] left-[5%] h-[400px] w-[400px] rounded-full bg-secondary/[0.02] blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Text Content Area */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Simulation Active — Phase One</span>
              </div>

              <h1 className="leading-[0.85] tracking-[-0.04em] text-on-surface">
                Tech in <br />
                Motion <span className="text-secondary">.</span>
              </h1>
              
              <p className="mt-8 max-w-xl text-xl text-on-surface-variant leading-relaxed">
                This is not a conference. It is an immersive simulation of real-world tech environments, product war rooms, and high-pressure creative battles.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <Button size="lg" className="px-10 h-14 text-base shadow-lg shadow-primary/10">
                  Get Early Access
                </Button>
                <Button variant="secondary" size="lg" className="px-10 h-14 text-base border-outline-variant/30 hover:bg-surface-container-low transition-all">
                  View Schedule
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Hero Image / Multi-layered Visual */}
          <div className="lg:col-span-5 xl:col-span-6 relative flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[500px] lg:max-w-none aspect-square lg:aspect-auto"
            >
              {/* Main Illustration / Image */}
              <div className="relative z-10 rounded-[32px] overflow-hidden border border-outline-variant/20 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.15)] bg-surface-container-low">
                <img 
                  src="/hero.png" 
                  alt="KWASU Tech Festival Visual" 
                  className="w-full h-full object-cover grayscale-[20%] transition-all duration-700 hover:grayscale-0 scale-105 hover:scale-100"
                />
              </div>

              {/* Floating Decorative Elements */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 hidden xl:block z-20"
              >
                <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white shadow-xl max-w-[200px]">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-2">Success Rate</h4>
                  <div className="flex items-end space-x-1">
                    <span className="text-3xl font-bold text-primary">94%</span>
                    <span className="text-xs text-secondary mb-1.5 font-semibold">+12%</span>
                  </div>
                  <div className="mt-4 flex gap-1 items-end h-8">
                     {[30, 60, 45, 80, 55, 90, 75].map((h, i) => (
                       <div key={i} className="flex-1 bg-primary/10 rounded-t-sm" style={{ height: `${h}%` }} />
                     ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -left-10 hidden lg:block z-20"
              >
                <div className="bg-primary p-6 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-white">
                     <span className="text-xs font-bold">KTF</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold tracking-tight">The Simulation</h4>
                    <p className="text-white/50 text-[10px] leading-none">Powered by KTF Labs</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
