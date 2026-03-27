import { Section } from '../layout/Section';
import { motion } from 'framer-motion';

const PLACEHOLDER_LOGOS = [
  'TechCorp', 'InnovateX', 'BuildSpace', 'FutureStack', 'Nexus', 'VentureX', 'BuildFlow', 'Innovate Labs'
];

export function Trust() {
  // Triple the logos to ensure the marquee spans the screen width and loops seamlessly
  const marqueeLogos = [...PLACEHOLDER_LOGOS, ...PLACEHOLDER_LOGOS, ...PLACEHOLDER_LOGOS];

  return (
    <Section className="bg-surface overflow-hidden">
      <div className="flex flex-col items-center justify-center space-y-24">
        
        <div className="text-center space-y-12 w-full">
          <p className="text-base font-medium text-on-surface-variant">
            Trusted by builders, creators, and innovators
          </p>
          
          {/* Infinite Marquee Container */}
          <div className="relative w-full overflow-hidden">
            {/* Edge Fades for Premium Look */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />
            
            <motion.div 
              className="flex whitespace-nowrap gap-16 items-center"
              animate={{
                x: [0, -1035], // Adjust based on content width
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {marqueeLogos.map((logo, i) => (
                <div key={i} className="text-2xl font-bold text-on-surface-variant/40 hover:text-primary transition-colors cursor-default select-none">
                  {logo}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Asymmetric Traction Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full max-w-5xl mx-auto px-4">
          {/* Large Primary Image */}
          <div className="md:col-span-7 h-[400px] md:h-[600px] rounded-lg overflow-hidden bg-surface-container-low border border-outline-variant/30 relative group">
            <img src="/traction-1.jpg" alt="Historical Event Experience" className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0" />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-lg pointer-events-none"></div>
          </div>
          
          {/* Right Stacked Secondary Images */}
          <div className="md:col-span-5 flex flex-col gap-4 h-[400px] md:h-[600px]">
             <div className="flex-1 rounded-lg overflow-hidden bg-surface-container-low border border-outline-variant/30 relative group">
               <img src="/traction-2.jpg" alt="Hardware and Collaboration" className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0" />
               <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-lg pointer-events-none"></div>
             </div>
             <div className="flex-1 rounded-lg overflow-hidden bg-surface-container-low border border-outline-variant/30 relative group">
               <img src="/traction-3.jpg" alt="Networking at KTF" className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0" />
               <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-lg pointer-events-none"></div>
             </div>
          </div>
        </div>

      </div>
    </Section>
  );
}
