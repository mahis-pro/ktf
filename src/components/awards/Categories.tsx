import { Section } from '../layout/Section';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { 
  Palette, 
  Layers, 
  Zap, 
  Tv, 
  BookOpen, 
  Cpu, 
  GitBranch, 
  Shield, 
  TrendingUp, 
  Briefcase, 
  Rocket 
} from 'lucide-react';

const CATEGORIES = [
  {
    icon: Palette,
    title: 'Brand Designer of the Year',
    desc: 'Exceptional visual identities, logos, and design systems.'
  },
  {
    icon: Layers,
    title: 'UI/UX Designer of the Year',
    desc: 'User research, clean wireframes, and high-fidelity interactive prototypes.'
  },
  {
    icon: Zap,
    title: 'Motion Designer of the Year',
    desc: 'UI animations, kinetic typography, and premium video effects.'
  },
  {
    icon: Tv,
    title: 'Tech Content Creator of the Year',
    desc: 'Educational tech videos, threads, or posts across social media.'
  },
  {
    icon: BookOpen,
    title: 'Tech Writer of the Year',
    desc: 'High-quality technical documentation, deep-dive newsletters, or engineering blogs.'
  },
  {
    icon: Cpu,
    title: 'No-Code Developer of the Year',
    desc: 'Building functional, high-performance web/mobile platforms using visual tools.'
  },
  {
    icon: GitBranch,
    title: 'Open Source Contributor of the Year',
    desc: 'Building in public, fixing bugs, and maintaining public GitHub repos.'
  },
  {
    icon: Shield,
    title: 'Cybersecurity Enthusiast of the Year',
    desc: 'Ethical hacking, Capture The Flag dominance, and security awareness.'
  },
  {
    icon: TrendingUp,
    title: 'Tech Marketer of the Year',
    desc: 'Growth hacking, social media management, and event registration loops.'
  },
  {
    icon: Briefcase,
    title: 'Product Manager of the Year',
    desc: 'Handling product roadmaps, user research, and team coordination.'
  },
  {
    icon: Rocket,
    title: 'The Ecosystem Wildcard',
    desc: 'Propose a completely unique, unlisted award title.'
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
            Celebrating technical leadership, precise execution, and digital craftsmanship across the ecosystem.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
            >
              <Card className="p-8 h-full flex flex-col justify-between border border-outline-variant/30 hover:border-primary/50 transition-all duration-300 rounded-none bg-surface shadow-sm group min-h-[220px]">
                 <div className="flex justify-between items-start mb-6">
                    <div className="h-12 w-12 bg-primary/5 flex items-center justify-center border border-primary/10 rounded-none group-hover:bg-primary group-hover:text-white transition-all duration-300">
                       <cat.icon size={20} className="text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                 </div>
                 
                 <div>
                    <h3 className="text-xl font-bold text-primary mb-4 leading-tight uppercase tracking-tight">{cat.title}</h3>
                    <p className="text-on-surface-variant text-sm font-light leading-relaxed">
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
