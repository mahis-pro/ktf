import { motion } from 'framer-motion';
import { Section } from '../layout/Section';
import { Card } from '../ui/Card';
import { Check, Star, Shield, Zap, Globe } from 'lucide-react';

const PACKAGES = [
  {
    name: 'Headline Partner',
    tier: 'Limited to 1',
    desc: 'The defining presence of the festival. Total brand integration across all experience zones.',
    icon: Star,
    features: [
      'Event Naming Rights',
      'Main Stage Primary Branding',
      'Keynote Slot (15 Mins)',
      'Custom Experience Zone',
      'Premium Media Integration',
      'Unlimited Access Permits'
    ]
  },
  {
    name: 'Gold Partner',
    tier: 'Limited to 3',
    desc: 'Strategic visibility and deep technical engagement with the participant ecosystem.',
    icon: Shield,
    features: [
      'Secondary Stage Branding',
      'Workshop Integration',
      'Large Exhibition Space',
      'Brand Video in Rotations',
      'Social Media Takeover',
      '20 Access Permits'
    ]
  },
  {
    name: 'Silver Partner',
    tier: 'Limited to 5',
    desc: 'Solid brand presence and recruitment access to top-tier technical talent.',
    icon: Zap,
    features: [
      'Arena Wall Branding',
      'Talent Pool Access',
      'Medium Exhibition Space',
      'Logo on Print Assets',
      'Email Newsletter Feature',
      '10 Access Permits'
    ]
  },
  {
    name: 'Experience Zone',
    tier: 'Unlimited',
    desc: 'A dedicated physical presence in the Innovation Pavilion to showcase your products.',
    icon: Globe,
    features: [
      'Standard Booth Space',
      'Lead Collection Tool',
      'Logo on Partners Wall',
      'Digital Program Entry',
      'Networking Mixer Access',
      '5 Access Permits'
    ]
  }
];

export function PartnershipPackages() {
  return (
    <Section id="packages" className="bg-background py-32">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-6xl font-display font-medium uppercase tracking-tighter mb-8 italic">
            Strategic <br /> <span className="text-primary not-italic">Integration.</span>
          </h2>
          <p className="text-on-surface-variant text-lg font-light leading-relaxed">
            Choose how your brand interacts with the future. Our packages are designed 
            to ensure meaningful engagement, not just logo placement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PACKAGES.map((pkg, i) => {
            const Icon = pkg.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group h-full"
              >
                <Card className="h-full flex flex-col p-10 bg-surface border-outline-variant/30 hover:border-primary/40 transition-all duration-500 rounded-none shadow-none">
                  <div className="mb-8 flex justify-between items-start">
                    <div className="p-4 bg-surface-container-low text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                       <Icon size={24} />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-secondary font-bold uppercase">{pkg.tier}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter">{pkg.name}</h3>
                  <p className="text-sm text-on-surface-variant font-light mb-8 italic border-l-2 border-primary/10 pl-4">
                    {pkg.desc}
                  </p>
                  
                  <div className="flex-grow space-y-4 mb-10">
                    {pkg.features.map((feature, j) => (
                      <div key={j} className="flex gap-3 text-xs text-on-surface/80">
                         <Check size={14} className="text-secondary flex-shrink-0" />
                         <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
