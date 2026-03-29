import { Section } from '../layout/Section';
import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, Handshake, Briefcase, Trophy } from 'lucide-react';

const OUTCOMES = [
  { icon: CheckCircle2, title: 'Real-World Experience', desc: 'Execute under real-world pressure constraints and industry-standard workflows.' },
  { icon: TrendingUp, title: 'Industry Exposure', desc: 'Get your professional profile and technical skills in front of top ecosystem leads.' },
  { icon: Handshake, title: 'Network Connections', desc: 'Build lasting relationships with founders, specialized builders, and strategists.' },
  { icon: Briefcase, title: 'Portfolio Projects', desc: 'Walk away with verified projects and case studies for your professional portfolio.' },
  { icon: Trophy, title: 'Recognition & Awards', desc: 'Compete for the ecosystem recognition and high-stakes rewards for the top performers.' }
];

export function ExperienceOutcomes() {
  return (
    <Section className="bg-surface py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-6xl font-display font-medium tracking-tight text-primary uppercase mb-8">
            The Result of <br />
            <span className="text-secondary italic">Execution.</span>
          </h2>
          <p className="text-on-surface-variant text-lg font-light leading-relaxed">
            You don't just attend KTF. You walk away with tangible strategic assets.
          </p>
        </div>

        <div className="grid gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {OUTCOMES.map((outcome, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex gap-8 group"
            >
              <div className="flex-shrink-0 h-12 w-12 bg-primary/5 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 rounded-none">
                <outcome.icon size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-3 uppercase tracking-tighter">{outcome.title}</h3>
                <p className="text-on-surface-variant text-sm font-light italic leading-relaxed">
                  {outcome.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
