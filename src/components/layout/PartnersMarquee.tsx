import { motion } from 'framer-motion';

const PARTNERS = [
  { name: 'KWASU', type: 'image', src: '/kwasu-partner.png' },
  { name: 'MTF', type: 'image', src: '/mtf-partner.png' },
];

export function PartnersMarquee({ isDark = false }: { isDark?: boolean }) {
  // Multiply the logos significantly to ensure seamless looping without gaps
  const marqueeItems = Array(12).fill(PARTNERS).flat();

  return (
    <div className="relative w-full overflow-hidden h-40 flex items-center">
      {/* Edge Fades for Premium Look */}
      <div className={`absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none ${isDark ? 'bg-gradient-to-r from-background to-transparent' : 'bg-gradient-to-r from-surface to-transparent'}`} />
      <div className={`absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none ${isDark ? 'bg-gradient-to-l from-background to-transparent' : 'bg-gradient-to-l from-surface to-transparent'}`} />
      
      <motion.div 
        className="flex whitespace-nowrap gap-40 items-center"
        animate={{
          x: [0, -1200], // Adjust based on content width
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {marqueeItems.map((item, i) => (
          <div key={i} className="flex-shrink-0 flex items-center justify-center">
            <img 
              src={item.src} 
              alt={item.name} 
              className={`h-20 w-auto object-contain hover:scale-110 transition-transform duration-300 cursor-pointer ${isDark ? 'filter brightness-0 invert opacity-60 hover:opacity-100' : 'opacity-80 hover:opacity-100'}`} 
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
