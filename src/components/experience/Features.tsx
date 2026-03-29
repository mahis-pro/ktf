import { Section } from '../layout/Section';
import { motion } from 'framer-motion';
import { RefreshCw, LayoutDashboard, MessageSquareText, FileVideo, Users } from 'lucide-react';
import { Card } from '../ui/Card';

const DYNAMIC_FEATURES = [
  { icon: LayoutDashboard, title: 'Live Scoreboard', desc: 'Real-time performance tracking for all simulations and pitch battles.' },
  { icon: Users, title: 'Audience Voting', desc: 'The crowd decides. Use our live platform to rank the best projects.' },
  { icon: RefreshCw, title: 'Mentor Rotations', desc: 'Dynamic feedback loops with industry leads throughout the challenge.' },
  { icon: MessageSquareText, title: 'Judge Feedback', desc: 'Transparent, high-stakes critiques delivered in real-time.' },
  { icon: FileVideo, title: 'Live Content Lab', desc: 'Our onsite crew documents and creates content in high-speed cycles.' }
];

export function ExperienceFeatures() {
  return (
    <Section className="bg-background py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-20 max-w-2xl">
          <h2 className="text-4xl sm:text-6xl font-display font-medium tracking-tight text-primary leading-[1.1] uppercase mb-8">
            Dynamic <br />
            <span className="text-secondary italic">Infrastructure.</span>
          </h2>
          <p className="text-on-surface-variant text-lg font-light leading-relaxed">
            KTF is connected in real-time. Our infrastructure allows for seamless 
            interaction between participants, mentors, and the audience.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
           {DYNAMIC_FEATURES.map((feature, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: i * 0.1 }}
             >
                <Card className="p-8 h-full bg-surface-container-low border-outline-variant/30 hover:border-primary/20 transition-all duration-500 group">
                   <div className="h-10 w-10 flex items-center justify-center bg-white border border-outline-variant/20 mb-8 rounded-none transition-transform group-hover:rotate-6">
                      <feature.icon size={18} className="text-primary" />
                   </div>
                   <h3 className="text-lg font-bold text-primary mb-4">{feature.title}</h3>
                   <p className="text-xs text-on-surface-variant font-light italic leading-relaxed">
                     {feature.desc}
                   </p>
                </Card>
             </motion.div>
           ))}
        </div>
      </div>
    </Section>
  );
}
