import { Section } from '../layout/Section';
import { motion } from 'framer-motion';
import { PartnersMarquee } from '../layout/PartnersMarquee';

export function Trust() {
  return (
    <Section className="bg-surface overflow-hidden">
      <div className="flex flex-col items-center justify-center space-y-24">

        <div className="text-center space-y-12 w-full">
          <p className="text-[10px] font-mono tracking-widest text-on-surface-variant uppercase">
             [ Strategic Infrastructure Partners ]
          </p>

          <PartnersMarquee />
        </div>

        {/* Asymmetric Traction Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full max-w-5xl mx-auto px-4">
          {/* Large Primary Image */}
          <div className="md:col-span-7 h-[400px] md:h-[600px] rounded-lg overflow-hidden bg-surface-container-low border border-outline-variant/30 relative group">
            <img src="/pitch battle.jpg" alt="High-Stakes Pitch Battles" className="w-full h-full object-cover transition-all duration-500 hover:scale-105" />
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
              <span className="text-white text-xs font-mono tracking-widest uppercase">Live Arena: Pitch Battles</span>
            </div>
          </div>

          {/* Right Stacked Secondary Images */}
          <div className="md:col-span-5 flex flex-col gap-4 h-[400px] md:h-[600px]">
            <motion.div whileHover={{ y: -5 }} className="flex-1 rounded-lg overflow-hidden bg-surface-container-low border border-outline-variant/30 relative group">
              <img src="/events (4).jpg" alt="Developer Collaboration" className="w-full h-full object-cover transition-all duration-500 hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                <span className="text-white text-xs font-mono tracking-widest uppercase">Workshop: Technical Architecture</span>
              </div>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="flex-1 rounded-lg overflow-hidden bg-surface-container-low border border-outline-variant/30 relative group">
              <img src="/networking.jpg" alt="Ecosystem Networking" className="w-full h-full object-cover transition-all duration-500 hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                <span className="text-white text-xs font-mono tracking-widest uppercase">Ecosystem Networking</span>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </Section>
  );
}
