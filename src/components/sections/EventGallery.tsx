import { motion } from 'framer-motion';
import { Section } from '../layout/Section';
import { cn } from '../../lib/utils';

const GALLERY_ITEMS = [
  {
    title: "Digital Art Showdown",
    category: "CREATIVE TRACK",
    image: "/events (3).jpg",
    className: "md:col-span-8 md:row-span-2",
    description: "Witness the fusion of tech and imagination in our high-stakes digital art competition."
  },
  {
    title: "Pitch Battle",
    category: "STARTUP ARENA",
    image: "/pitch battle.jpg",
    className: "md:col-span-4 md:row-span-1",
    description: "Founders go head-to-head in the ultimate simulation of a VC war room."
  },
  {
    title: "Global Networking",
    category: "ECOSYSTEM",
    image: "/networking.jpg",
    className: "md:col-span-4 md:row-span-1",
    description: "Forge strategic partnerships with the brightest minds in the African tech ecosystem."
  }
];

export function EventGallery() {
  return (
    <Section className="bg-background pb-32">
      <div className="mb-20">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-0.5 w-8 bg-primary/20" />
          <span className="text-[10px] font-mono tracking-widest text-primary/60 uppercase">Ecosystem In Motion</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-display font-medium tracking-tight text-primary leading-[1.1]">
          A Festival of Execution.<br />
          <span className="text-on-surface-variant italic font-light">Capture the Pulse.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px] md:auto-rows-[350px]">
        {GALLERY_ITEMS.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            className={cn(
              "group relative overflow-hidden rounded-[32px] border border-outline-variant/30 flex flex-col justify-end p-8",
              item.className
            )}
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
               <img 
                src={item.image} 
                alt={item.title} 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-60" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <span className="text-[10px] font-mono tracking-widest text-primary/60 uppercase mb-2 block">{item.category}</span>
              <h3 className="text-2xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">{item.title}</h3>
              <p className="text-on-surface-variant text-sm max-w-sm font-light leading-relaxed hidden md:block opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
