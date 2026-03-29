import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Check, ArrowRight, X, AlertTriangle, Layers, Zap, PenTool, Briefcase } from 'lucide-react';
import { cn } from '../lib/utils';

// TYPES
interface Permit {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  badge?: string;
  externalLink: string;
  requiresPreForm?: boolean;
  icon: any;
  limit?: string;
}

const PERMITS: Permit[] = [
  {
    id: 'general',
    title: 'General Access',
    description: 'The foundation for your KTF experience. Access to all main stages and public arena.',
    benefits: [
      'Main Arena Access',
      'Exhibition Hall Entry',
      'Main Stage Keynotes',
      'Standard Networking'
    ],
    externalLink: 'https://luma.com/ifg61xmu',
    icon: Layers
  },
  {
    id: 'simulation',
    title: 'Simulation Access',
    description: 'High-stakes problem solving. Join the deep-tech arena for real-world challenges.',
    benefits: [
      'Startup Simulation',
      'Product War Room',
      'Team Challenges',
      'Priority Mentorship'
    ],
    badge: 'Limited Slots',
    limit: '45/50 remaining',
    externalLink: 'https://luma.com/ifg61xmu',
    requiresPreForm: true,
    icon: Zap
  },
  {
    id: 'creative',
    title: 'Creative Access',
    description: 'Experience Tech through the lens of design and brand identity.',
    benefits: [
      'Design Battles',
      'Brand Sprint',
      'Creator Lab',
      'Creative Workshop'
    ],
    badge: 'Limited Slots',
    limit: '28/40 remaining',
    externalLink: 'https://luma.com/ifg61xmu',
    requiresPreForm: true,
    icon: PenTool
  },
  {
    id: 'career',
    title: 'Career Access',
    description: 'Bridge the gap between skill and scale. Dedicated focus on your career trajectory.',
    benefits: [
      'CV Review',
      'Mock Interviews',
      'Portfolio Sessions',
      'Talent Pool Inclusion'
    ],
    externalLink: 'https://luma.com/ifg61xmu',
    requiresPreForm: true,
    icon: Briefcase
  }
];

const ZONES = [
  { name: 'Main Arena', general: true, simulation: true, creative: true, career: true },
  { name: 'Simulation Arena', general: false, simulation: true, creative: false, career: false },
  { name: 'Creative Track', general: false, simulation: false, creative: true, career: false },
  { name: 'Career Lab', general: false, simulation: false, creative: false, career: true },
  { name: 'Exhibition Booths', general: true, simulation: true, creative: true, career: true },
];

export function Register() {
  const [selectedPermit, setSelectedPermit] = useState<Permit | null>(null);
  const [showPreForm, setShowPreForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: '',
    skillLevel: ''
  });

  const handlePermitAction = (permit: Permit) => {
    if (permit.requiresPreForm) {
      setSelectedPermit(permit);
      setShowPreForm(true);
    } else {
      // Redirect logic for simple registration
      window.location.href = permit.externalLink;
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // REPLACE THIS with your actual Google Apps Script Web App URL
    const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxELX7EKWltAeT2iJ1whdED3eTeZbg9PNsu0389VZt-Zk7lYMxYySVbw5pQPZxFuybG/exec';
    
    try {
      const payload = {
        'Timestamp': new Date().toLocaleString(),
        'Full Name': formData.fullName,
        'Email Address': formData.email,
        'Primary Role': formData.role,
        'Skill Level': formData.skillLevel,
        'track': selectedPermit?.title || 'Unknown'
      };

      console.log('Synchronizing data with KTF Master Sheet...', payload);
      
      // We use 'no-cors' mode for Google Apps Script to prevent cross-origin errors 
      // when sending the request (as it returns a redirect)
      await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

    } catch (error) {
      console.error('Data synchronization failed:', error);
    } finally {
      // Redirect after attempting to save
      if (selectedPermit) {
        window.location.href = selectedPermit.externalLink;
      }
    }
  };

  return (
    <div className="bg-background pt-32 pb-24 min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="container mx-auto px-4 mb-24 max-w-7xl">
        <div className="max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-primary/60 uppercase">Registration Terminal v1.02</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            Choose Your Access.<br /> 
            <span className="text-on-surface-variant font-light">Experience Tech Your Way.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-on-surface-variant mb-12 max-w-xl font-light leading-relaxed"
          >
            The KWASU Tech Festival uses an Access Permit system designed to align with your specific expertise and goals. 
            Select how you want to interact with the experience.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
             <Button 
                size="lg" 
                className="rounded-none px-10 h-16 uppercase tracking-[0.2em] font-bold"
                onClick={() => document.getElementById('permits')?.scrollIntoView({ behavior: 'smooth' })}
              >
               Select Your Permit
             </Button>
          </motion.div>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="bg-surface-container-low py-24 mb-24 border-y border-outline-variant/20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'Choose access type', desc: 'Identify which permit aligns with your festival goals.' },
              { step: '02', title: 'Select focus', desc: 'Commit to a specific experience track or workshop.' },
              { step: '03', title: 'Register externally', desc: 'Complete your permit on our secure platform.' }
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="text-[10px] font-mono text-primary/40 mb-2">{step.step} // STEP</div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-on-surface-variant font-light border-l-2 border-primary/10 pl-4">{step.desc}</p>
                {idx < 2 && (
                  <ArrowRight className="hidden md:block absolute -right-6 top-8 text-primary/10 h-6 w-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ACCESS PERMIT CARDS */}
      <section id="permits" className="container mx-auto px-4 mb-32 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 uppercase tracking-tighter">Available Access Permits</h2>
          <div className="h-1 w-20 bg-secondary mx-auto mb-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PERMITS.map((permit) => {
            const Icon = permit.icon;
            return (
              <motion.div 
                key={permit.id}
                whileHover={{ y: -8 }}
                className="group relative flex flex-col bg-surface border border-outline-variant/40 p-10 hover:border-primary/40 transition-all duration-500"
              >
                {permit.badge && (
                  <div className="absolute top-0 right-0 bg-secondary text-white text-[10px] px-3 py-1 font-mono uppercase tracking-widest">
                    {permit.badge}
                  </div>
                )}
                
                <div className="mb-8 p-4 bg-surface-container-low w-fit group-hover:bg-primary transition-colors duration-500 group-hover:text-white">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 group-hover:text-secondary transition-colors">{permit.title}</h3>
              <p className="text-on-surface-variant mb-8 font-light min-h-[4rem]">{permit.description}</p>
              
              <div className="flex-grow space-y-4 mb-10">
                {permit.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-on-surface/80">
                    <Check size={14} className="text-secondary" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {permit.limit && (
                <div className="mb-8">
                   <div className="flex justify-between text-[10px] font-mono text-primary/60 mb-2 uppercase tracking-wider">
                      <span>Available Seats</span>
                      <span>{permit.limit}</span>
                   </div>
                   <div className="h-0.5 w-full bg-surface-container-highest">
                      <div className="h-full bg-secondary" style={{ width: permit.id === 'simulation' ? '90%' : '70%' }} />
                   </div>
                </div>
              )}
              
              <Button 
                onClick={() => handlePermitAction(permit)}
                variant={permit.requiresPreForm ? 'secondary' : 'primary'}
                className="w-full rounded-none h-12 uppercase tracking-widest text-xs font-bold"
              >
                {permit.requiresPreForm ? 'Apply to Participate' : 'Claim Permit'}
              </Button>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 4. ZONE ACCESS MAPPING */}
      <section className="container mx-auto px-4 mb-32 max-w-7xl">
        <div className="mb-12">
          <h2 className="text-3xl uppercase tracking-tighter mb-4">Zone Access Mapping</h2>
          <p className="text-on-surface-variant font-light italic">Technical breakdown of permit permissions across festival infrastructure.</p>
        </div>

        <div className="overflow-x-auto border border-outline-variant/30">
          <table className="w-full text-left font-body border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30">
                <th className="py-6 px-8 text-xs font-mono uppercase tracking-widest text-primary/60">Functional Zone</th>
                {PERMITS.map(p => (
                  <th key={p.id} className="py-6 px-4 text-center text-xs font-mono uppercase tracking-widest text-primary/60 break-words max-w-[100px]">
                    {p.id}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ZONES.map((zone, i) => (
                <tr key={zone.name} className={cn("border-b border-outline-variant/10 hover:bg-surface-container-low/30 transition-colors", i % 2 === 0 ? "bg-white" : "bg-transparent")}>
                  <td className="py-6 px-8 font-bold text-primary">{zone.name}</td>
                  {PERMITS.map(p => (
                    <td key={p.id} className="py-6 px-4 text-center">
                      {(zone as any)[p.id] ? (
                        <div className="inline-flex items-center justify-center h-4 w-4 bg-secondary/10 text-secondary rounded-full">
                          <Check size={10} strokeWidth={4} />
                        </div>
                      ) : (
                        <div className="w-1.5 h-1.5 bg-outline-variant/20 mx-auto rounded-full" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. VALUE REINFORCEMENT */}
      <section className="bg-primary text-white py-32 mb-24">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-white text-4xl mb-12 uppercase tracking-[0.1em]">Why the Permit System?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-left">
            <div>
              <h4 className="text-secondary font-mono tracking-widest text-xs mb-4 uppercase">Structured Experience</h4>
              <p className="text-white/70 font-light leading-relaxed">
                By selecting a permit, you aren't just buying a ticket; you're committing to a specific focus. 
                This allows us to curate environments where like-minded professionals and creatives can collaborate 
                without the noise of generic event structures.
              </p>
            </div>
            <div>
              <h4 className="text-secondary font-mono tracking-widest text-xs mb-4 uppercase">Quality Control</h4>
              <p className="text-white/70 font-light leading-relaxed">
                Specialized tracks like Simulation and Creative have limited capacities to ensure high-impact 
                interactions. This "intentional friction" ensures that every participant in a room is there to build, 
                not just watch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="container mx-auto px-4 text-center mb-32 max-w-7xl">
         <div className="border border-outline-variant/40 px-6 py-16 sm:p-24 bg-surface-container-low relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-32 bg-primary" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-5xl mb-8 uppercase tracking-tighter">Step Into the Experience.</h2>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto px-16 h-16 rounded-none uppercase tracking-widest font-bold"
                  onClick={() => window.location.href = '/register?type=general'}
                >
                  Register Now
                </Button>
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="w-full sm:w-auto px-16 h-16 rounded-none uppercase tracking-widest font-bold bg-transparent"
                  onClick={() => document.getElementById('permits')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Explore Permits
                </Button>
              </div>
            </div>
         </div>
      </section>

      {/* CONDITIONAL PRE-FORM MODAL */}
      <AnimatePresence>
        {showPreForm && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
              onClick={() => setShowPreForm(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-surface p-10 shadow-2xl overflow-hidden border border-outline-variant/30"
            >
              {/* Decorative accent */}
              <div className="absolute top-0 right-0 p-8 opacity-5">
                {selectedPermit && (() => {
                  const Icon = selectedPermit.icon;
                  return <Icon size={120} />;
                })()}
              </div>

              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="text-[10px] font-mono tracking-widest text-secondary mb-1 uppercase">Action Required</div>
                  <h3 className="text-2xl font-bold uppercase">{selectedPermit?.title} Intake</h3>
                </div>
                <button onClick={() => setShowPreForm(false)} className="hover:text-secondary transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="bg-surface-container-low p-4 mb-8 flex gap-4 items-center border border-outline-variant/20">
                <AlertTriangle className="text-secondary" size={20} />
                <p className="text-xs text-on-surface-variant font-light">
                  This track requires a brief profile sync before completing your permit on the external system.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                   <label className="block text-[10px] uppercase font-mono tracking-widest text-primary/60 mb-2">Full Name</label>
                   <input 
                    required
                    className="w-full bg-white border border-outline-variant/40 px-4 h-12 focus:border-primary outline-none transition-colors" 
                    placeholder="Enter your legal name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                   />
                </div>

                <div>
                   <label className="block text-[10px] uppercase font-mono tracking-widest text-primary/60 mb-2">Email Address</label>
                   <input 
                    required
                    type="email"
                    className="w-full bg-white border border-outline-variant/40 px-4 h-12 focus:border-primary outline-none transition-colors" 
                    placeholder="you@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                   />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-widest text-primary/60 mb-2">Primary Role</label>
                    <select 
                      required
                      className="w-full bg-white border border-outline-variant/40 px-4 h-12 focus:border-primary outline-none transition-colors"
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                    >
                      <option value="">Select Role</option>
                      <option value="developer">Professional Developer</option>
                      <option value="designer">UI/UX Designer</option>
                      <option value="content-creator">Content Creator</option>
                      <option value="video-editor">Video Editor</option>
                      <option value="photographer">Photographer</option>
                      <option value="artist">Digital Artist / Illustrator</option>
                      <option value="founder">Startup Founder</option>
                      <option value="investor">Ecosystem Professional</option>
                      <option value="student">Student / Emerging Talent</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-widest text-primary/60 mb-2">Skill Level</label>
                    <select 
                      required
                      className="w-full bg-white border border-outline-variant/40 px-4 h-12 focus:border-primary outline-none transition-colors"
                      value={formData.skillLevel}
                      onChange={(e) => setFormData({...formData, skillLevel: e.target.value})}
                    >
                      <option value="">Select Level</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Button 
                    type="button"
                    variant="secondary"
                    onClick={() => setShowPreForm(false)}
                    className="flex-1 h-14 rounded-none uppercase tracking-widest font-bold"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-[2] h-14 rounded-none uppercase tracking-widest font-bold"
                  >
                    Continue
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
