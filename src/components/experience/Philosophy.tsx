import { Section } from '../layout/Section';
import { motion } from 'framer-motion';
import { Zap, Cpu, Code, Target } from 'lucide-react';
import { Card } from '../ui/Card';

const PHILOSOPHY_CARDS = [
  {
    icon: Zap,
    title: 'Simulation-Based',
    description: 'We move beyond theory. KTF is a high-stakes environment where every action is a simulation of market realities.'
  },
  {
    icon: Cpu,
    title: 'Real-World Workflows',
    description: 'From Agile to CI/CD, the event is modeled after actual industry systems—not school-level projects.'
  },
  {
    icon: Code,
    title: 'Active Participation',
    description: 'You are an operator, not an observer. Everything you build and pitch is judged against professional metrics.'
  },
  {
    icon: Target,
    title: 'Ecosystem Alignment',
    description: 'A shared language between developers, designers, and founders to bridge communication gaps.'
  }
];

export function ExperiencePhilosophy() {
  return (
    <Section id="philosophy" className="bg-surface pb-32">
      <div className="mb-24 max-w-2xl px-4 lg:px-0">
        <h2 className="text-4xl sm:text-6xl font-display font-medium tracking-tight text-primary leading-[1.1] uppercase mb-8">
          This is not a conference. <br />
          <span className="text-on-surface-variant italic font-light">It’s a live ecosystem.</span>
        </h2>
        <p className="text-on-surface-variant text-lg font-light leading-relaxed">
          Forget passive listening. KWASU Tech Festival is a dynamic environment where 
          builders, creators, and strategists collide to solve real-world problems 
          under professional constraints.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 px-4 lg:px-0">
        {PHILOSOPHY_CARDS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <Card className="p-10 h-full flex flex-col justify-end bg-surface-container-low border-outline-variant/30 hover:shadow-xl transition-all duration-500 group">
              <div className="mb-12 h-14 w-14 bg-white flex items-center justify-center border border-outline-variant/20 rounded-none transform transition-transform group-hover:rotate-12">
                <item.icon size={24} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">{item.title}</h3>
              <p className="text-on-surface-variant text-sm font-light leading-relaxed">
                {item.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
