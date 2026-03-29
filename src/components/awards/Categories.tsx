import { Section } from '../layout/Section';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Rocket, Lightbulb, Paintbrush, Cpu, Heart, Star } from 'lucide-react';

const CATEGORIES = [
  {
    icon: Rocket,
    title: 'Best Startup Team',
    desc: 'Recognizing the most cohesive team demonstrating agility, execution, and synergy.',
    eligibility: 'Open to all registered startup teams within the simulation tracks.'
  },
  {
    icon: Lightbulb,
    title: 'Innovation Excellence',
    desc: 'Awarded to the most disruptive technical solution from the innovation pavilion.',
    eligibility: 'Registered innovators and tech-demo participants.'
  },
  {
    icon: Paintbrush,
    title: 'Creative Tech Excellence',
    desc: 'Celebrating the fusion of high-end design and technical implementation.',
    eligibility: 'Participants of the Digital Art Battle and Brand Sprints.'
  },
  {
    icon: Cpu,
    title: 'Best Product Execution',
    desc: 'For the product that is closest to production-ready under pressure constraints.',
    eligibility: 'Founders and product leads across all simulation tracks.'
  },
  {
    icon: Heart,
    title: 'Community Impact Award',
    desc: 'Recognizing a project or builder that focuses on technical social utility.',
    eligibility: 'All participants.'
  },
  {
    icon: Star,
    title: 'Rising Talent Award',
    desc: 'The best-performing individual student demonstrating exceptional growth.',
    eligibility: 'Active students from participating institutions.'
  }
];

export function AwardCategories() {
  return (
    <Section className="bg-background py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-24 text-center max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-6xl font-display font-medium tracking-tight text-primary leading-[1.1] uppercase mb-8">
            Award <br />
            <span className="text-secondary italic">Categories.</span>
          </h2>
          <p className="text-on-surface-variant text-lg font-light leading-relaxed">
            Structured excellence across six unique tracks, celebrating technical leadership 
            at every level of the ecosystem.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <Card className="p-12 h-96 flex flex-col justify-between border-outline-variant/30 hover:border-primary/40 transition-all duration-500 rounded-none bg-surface shadow-sm group">
                 <div className="flex justify-between items-start mb-12">
                    <div className="h-14 w-14 bg-primary/5 flex items-center justify-center border border-primary/10 rounded-none group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:-rotate-6">
                       <cat.icon size={24} />
                    </div>
                    <span className="text-[10px] font-bold text-secondary tracking-[0.4em] uppercase">Phase_01</span>
                 </div>
                 
                 <div>
                    <h3 className="text-3xl font-bold text-primary mb-6 leading-tight uppercase tracking-tighter">{cat.title}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant/40 mb-12">Eligibility: {cat.eligibility}</p>
                    <p className="text-on-surface-variant text-sm font-light italic leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                       {cat.desc}
                    </p>
                 </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
