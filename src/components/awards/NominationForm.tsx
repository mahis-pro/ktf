import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

const CATEGORIES = [
  'Best Startup Team',
  'Innovation Excellence Award',
  'Creative Tech Excellence',
  'Best Product Execution',
  'Community Impact Award',
  'Rising Talent Award'
];

export function NominationForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    nomineeName: '',
    nomineeEmail: '',
    nomineeRole: '',
    category: '',
    projectTitle: '',
    projectDescription: '',
    reasonForNomination: '',
    portfolioLink: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxELX7EKWltAeT2iJ1whdED3eTeZbg9PNsu0389VZt-Zk7lYMxYySVbw5pQPZxFuybG/exec';

    try {
      const payload = {
        'Timestamp': new Date().toLocaleString(),
        'Full Name': formData.nomineeName,
        'Email Address': formData.nomineeEmail,
        'Nominee Role': formData.nomineeRole,
        'Award Category': formData.category,
        'Project Title': formData.projectTitle,
        'Work Description': formData.projectDescription,
        'Impact Reason': formData.reasonForNomination,
        'Portfolio Link': formData.portfolioLink,
        'track': 'Award Nomination'
      };

      await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      setStatus('success');
    } catch (error) {
      console.error('Nomination sync failed:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div id="nomination-form" className="max-w-4xl mx-auto px-4 py-40 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-16 border border-primary/20 bg-surface-container-low text-center"
        >
          <div className="h-20 w-20 bg-primary flex items-center justify-center rounded-none mx-auto mb-12">
            <CheckCircle2 size={40} className="text-white" />
          </div>
          <h2 className="text-4xl font-display font-medium text-primary uppercase mb-6">Nomination Submitted</h2>
          <p className="text-on-surface-variant text-lg font-light leading-relaxed mb-12">
            Your nomination for "{formData.nomineeName}" has been successfully logged into our system. 
            Shortlisted candidates will be contacted via email.
          </p>
          <Button 
            size="lg" 
            className="px-12 h-16 rounded-none uppercase tracking-[0.2em] font-bold text-xs"
            onClick={() => setStatus('idle')}
          >
            Submit Another Nomination
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <section id="nomination-form" className="py-40 bg-background overflow-hidden scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-20 text-center">
           <h2 className="text-4xl sm:text-6xl font-display font-medium tracking-tight text-primary leading-[1.1] uppercase mb-8">
              Nomination <br />
              <span className="text-secondary italic">Registry.</span>
           </h2>
           <p className="text-on-surface-variant text-lg font-light leading-relaxed italic">
             Submission Deadline: April 15, 2026.
           </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-16">
          {/* Nominee Info */}
          <div className="space-y-10">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-secondary border-b border-outline-variant/30 pb-4">01_Nominee_Information</h4>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-primary/60">Full Name</label>
                <input
                  required
                  type="text"
                  value={formData.nomineeName}
                  onChange={(e) => setFormData({ ...formData, nomineeName: e.target.value })}
                  placeholder="EX: JOHN BUILDER"
                  className="w-full bg-surface-container-low border border-outline-variant/30 p-6 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-primary font-bold transition-all"
                />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-primary/60">Email Address</label>
                <input
                  required
                  type="email"
                  value={formData.nomineeEmail}
                  onChange={(e) => setFormData({ ...formData, nomineeEmail: e.target.value })}
                  placeholder="EX: JOHN@BUILDFLOW.IO"
                  className="w-full bg-surface-container-low border border-outline-variant/30 p-6 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-primary font-bold transition-all"
                />
              </div>
              <div className="md:col-span-2 space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-primary/60">Current Role</label>
                <input
                  required
                  type="text"
                  value={formData.nomineeRole}
                  onChange={(e) => setFormData({ ...formData, nomineeRole: e.target.value })}
                  placeholder="EX: LEAD ENGINEER / FOUNDER"
                  className="w-full bg-surface-container-low border border-outline-variant/30 p-6 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-primary font-bold transition-all"
                />
              </div>
            </div>
          </div>

          {/* Submission Info */}
          <div className="space-y-10">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-secondary border-b border-outline-variant/30 pb-4">02_Submission_Details</h4>
            <div className="space-y-10">
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-primary/60">Award Category</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant/30 p-6 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-primary font-bold transition-all appearance-none cursor-pointer"
                >
                  <option value="">SELECT A CATEGORY</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-primary/60">Project / Work Title</label>
                <input
                  required
                  type="text"
                  value={formData.projectTitle}
                  onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                  placeholder="EX: AI-DRIVEN LOGISTICS INFRASTRUCTURE"
                  className="w-full bg-surface-container-low border border-outline-variant/30 p-6 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-primary font-bold transition-all"
                />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-primary/60">Work Description</label>
                <textarea
                  required
                  rows={4}
                  value={formData.projectDescription}
                  onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                  placeholder="Detail the scope and technical complexity of the project..."
                  className="w-full bg-surface-container-low border border-outline-variant/30 p-6 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-primary font-light italic transition-all resize-none"
                />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-primary/60">Why they deserve this nomination?</label>
                <textarea
                  required
                  rows={4}
                  value={formData.reasonForNomination}
                  onChange={(e) => setFormData({ ...formData, reasonForNomination: e.target.value })}
                  placeholder="Explain the impact and alignment with KTF standards..."
                  className="w-full bg-surface-container-low border border-outline-variant/30 p-6 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-primary font-light italic transition-all resize-none"
                />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-primary/60">Portfolio / Support Link (Optional)</label>
                <input
                  type="url"
                  value={formData.portfolioLink}
                  onChange={(e) => setFormData({ ...formData, portfolioLink: e.target.value })}
                  placeholder="EX: HTTPS://PORTFOLIO.IO"
                  className="w-full bg-surface-container-low border border-outline-variant/30 p-6 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-primary font-bold transition-all"
                />
              </div>
            </div>
          </div>

          <div className="pt-12 flex flex-col items-center">
            {status === 'error' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4 text-red-600 mb-8 font-bold">
                 <AlertCircle size={20} />
                 <span>Sync failed. Please check your connection and try again.</span>
              </motion.div>
            )}
            <Button 
                type="submit" 
                size="lg" 
                disabled={status === 'loading'}
                className="w-full sm:w-auto px-20 h-20 bg-primary text-white hover:bg-primary/90 rounded-none uppercase tracking-[0.3em] font-bold text-sm shadow-2xl shadow-primary/20 transition-all duration-300 transform hover:scale-105"
            >
              {status === 'loading' ? (
                <div className="flex items-center gap-4">
                   <Loader2 size={18} className="animate-spin" />
                   <span>Initializing Sync...</span>
                </div>
              ) : 'Submit Nomination'}
            </Button>
            <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.4em] text-on-surface-variant/40">
               *Shortlisted nominees will be contacted via email.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
