import { motion } from 'framer-motion';
import { PartnersHero } from '../components/partners/Hero';
import { PartnershipPackages } from '../components/partners/Packages';
import { PartnersCTA } from '../components/partners/PartnersCTA';
import { Section } from '../components/layout/Section';

export default function Partners() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-background pt-20"
    >
      <PartnersHero />
      
      <PartnershipPackages />
      
      {/* Narrative Section */}
      <Section className="bg-surface py-32 border-y border-outline-variant/20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl sm:text-5xl font-display font-medium uppercase tracking-tighter mb-12">
            Beyond <span className="text-secondary italic">Visibility.</span>
          </h2>
          <p className="text-xl text-on-surface-variant font-light leading-relaxed italic border-l-2 border-primary/10 pl-8 mx-auto max-w-2xl">
            "At KTF, we believe in radical collaboration. Our partners are not just 
            sponsors—they are co-creators of the technical ecosystem. We provide 
            the platform; you provide the fuel for the next generation of builders."
          </p>
          
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-12 opacity-40 grayscale">
             {/* Logo placeholders - keeping it editorial */}
             <div className="h-12 flex items-center justify-center font-display font-bold text-2xl tracking-tighter">PARTNER_01</div>
             <div className="h-12 flex items-center justify-center font-display font-bold text-2xl tracking-tighter">PARTNER_02</div>
             <div className="h-12 flex items-center justify-center font-display font-bold text-2xl tracking-tighter">PARTNER_03</div>
             <div className="h-12 flex items-center justify-center font-display font-bold text-2xl tracking-tighter">PARTNER_04</div>
          </div>
        </div>
      </Section>
      
      <PartnersCTA />
      
      {/* Footer Accent */}
      <Section className="py-20 bg-background text-center opacity-10">
         <div className="max-w-4xl mx-auto border-t border-primary/20 pt-20">
            <span className="text-[140px] font-display font-black tracking-tighter text-primary select-none opacity-5">PARTNERS</span>
         </div>
      </Section>
    </motion.div>
  );
}
