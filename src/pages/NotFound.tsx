import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-[#002519] overflow-hidden text-white pt-20">
      
      {/* Immersive Background grid accent */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
        <div className="absolute inset-x-0 top-0 h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Subtle tech background circle glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Decorative vertical bar accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent to-primary/45" />

      {/* Main Error Container */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center space-y-12">
        
        {/* Technical readout header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-3 text-secondary text-xs font-mono uppercase tracking-[0.45em]"
        >
          <span className="h-1.5 w-1.5 bg-secondary rounded-full animate-ping" />
          <span>System_Error // 404_Path_Unresolved</span>
        </motion.div>

        {/* Giant architectural 404 text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1, ease: 'easeOut' }}
          className="relative select-none"
        >
          <h1 className="text-[120px] sm:text-[180px] font-display font-black leading-none tracking-tighter text-white/5 uppercase">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl sm:text-5xl font-display font-medium tracking-widest text-white uppercase italic">
              Lost In Tech.
            </span>
          </div>
        </motion.div>

        {/* Detailed readout card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="p-8 border border-white/10 bg-white/[0.02] max-w-md mx-auto text-center space-y-4 rounded-none"
        >
          <p className="text-white/70 text-sm font-light leading-relaxed italic">
            "The requested resource was not found. The compiler has returned status code 404. Let's return you to the main registry flow."
          </p>
          
          <div className="pt-2 flex justify-center gap-8 text-[10px] font-mono text-white/35 uppercase tracking-widest border-t border-white/5">
            <span>SYS_REF: 404_VOID</span>
            <span>VER: v2.6.4</span>
          </div>
        </motion.div>

        {/* Return Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="pt-6"
        >
          <Link to="/">
            <Button
              size="lg"
              className="px-16 bg-white text-[#002519] hover:bg-white/95 rounded-none uppercase tracking-[0.25em] font-bold text-xs shadow-2xl transition-all"
            >
              Return to Home
            </Button>
          </Link>
        </motion.div>

      </div>

      {/* Corner Technical accents */}
      <div className="absolute top-10 left-10 text-[9px] font-mono text-white/20 uppercase tracking-widest hidden md:block">
        KTF_SYSTEMS // CORE_VERIFIED
      </div>
      <div className="absolute bottom-10 right-10 text-[9px] font-mono text-white/20 uppercase tracking-widest hidden md:block">
        EXCELLENCE_STARTS_HERE // © 2026
      </div>

    </main>
  );
}
