import { Section } from '../layout/Section';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Rocket, ShieldPlus, Paintbrush, Zap, Gamepad2, Users } from 'lucide-react';

const ACTIVITIES = [
  { icon: Rocket, title: 'Startup Simulation', label: '24H Build' },
  { icon: ShieldPlus, title: 'Product War Room', label: 'Crisis Mode' },
  { icon: Paintbrush, title: 'Digital Art Battle', label: 'Speed Run' },
  { icon: Zap, title: 'Brand Sprint', label: 'Logo Rush' },
  { icon: Gamepad2, title: 'Gaming Mixers', label: 'E-Sports' },
  { icon: Users, title: 'Networking Mixer', label: 'Meet Founders' }
];

export function ExperienceActivities() {
  return (
    <Section className="bg-background py-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-24 text-center">
           <h2 className="text-4xl sm:text-5xl font-display font-medium tracking-tight text-primary uppercase mb-6">
              Live <br />
              <span className="text-secondary italic">Activities Grid.</span>
           </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ACTIVITIES.map((activity, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="p-10 h-64 flex flex-col justify-between border-outline-variant/30 hover:border-primary/40 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden bg-surface-container-low">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                    <activity.icon size={120} className="text-primary" />
                 </div>
                 
                 <div className="relative z-10">
                    <div className="h-10 w-10 flex items-center justify-center bg-white border border-outline-variant/30 mb-8 rounded-none group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                       <activity.icon size={18} />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-2">{activity.title}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-secondary">{activity.label}</p>
                 </div>
                 
                 <div className="mt-auto relative z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 duration-500">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">View Brief</span>
                    <div className="h-px w-8 bg-primary/40" />
                 </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
