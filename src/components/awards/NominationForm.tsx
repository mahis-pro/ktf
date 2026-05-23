import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const CATEGORIES = [
  'Brand Designer of the Year',
  'UI/UX Designer of the Year',
  'Motion Designer of the Year',
  'Tech Content Creator of the Year',
  'Tech Writer of the Year',
  'No-Code Developer of the Year',
  'Open Source Contributor of the Year',
  'Cybersecurity Enthusiast of the Year',
  'Tech Marketer of the Year',
  'Product Manager of the Year',
  'The Ecosystem Wildcard'
];

export function NominationForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'already_registered' | 'error'>('idle');
  const [formData, setFormData] = useState({
    nominatorType: 'someone_else', // 'myself' | 'someone_else'
    nomineeName: '',
    nomineeInstagram: '',
    nomineePhone: '',
    nomineeEmail: '',
    category: '',
    wildcardTitle: '',
    proofOfWork: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxELX7EKWltAeT2iJ1whdED3eTeZbg9PNsu0389VZt-Zk7lYMxYySVbw5pQPZxFuybG/exec';

    try {
      const payload = {
        'Timestamp': new Date().toLocaleString(),
        'Nominator Type': formData.nominatorType === 'myself' ? 'I am nominating myself' : 'I am nominating someone else',
        'Full Name': formData.nomineeName,
        'Instagram Handle': formData.nomineeInstagram,
        'Phone Number': formData.nomineePhone,
        'Email Address': formData.nomineeEmail,
        'Award Category': formData.category,
        'Wildcard Title': formData.category === 'The Ecosystem Wildcard' ? formData.wildcardTitle : '',
        'Proof of Work': formData.proofOfWork,
        'track': 'Award Nomination'
      };

      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();

      if (responseText.includes('Already Registered')) {
        setStatus('already_registered');
      } else {
        setStatus('success');
      }
    } catch (error) {
      console.error('Nomination sync failed:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div id="nomination-form" className="max-w-4xl mx-auto px-4 py-40 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
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
            onClick={() => {
              setFormData({
                nominatorType: 'someone_else',
                nomineeName: '',
                nomineeInstagram: '',
                nomineePhone: '',
                nomineeEmail: '',
                category: '',
                wildcardTitle: '',
                proofOfWork: ''
              });
              setStatus('idle');
            }}
          >
            Submit Another Nomination
          </Button>
        </motion.div>
      </div>
    );
  }

  if (status === 'already_registered') {
    return (
      <div id="nomination-form" className="max-w-4xl mx-auto px-4 py-40 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-16 border border-secondary/20 bg-surface-container-low text-center"
        >
          <div className="h-20 w-20 bg-secondary flex items-center justify-center rounded-none mx-auto mb-12">
            <CheckCircle2 size={40} className="text-white" />
          </div>
          <h2 className="text-4xl font-display font-medium text-secondary uppercase mb-6">Already Registered</h2>
          <p className="text-on-surface-variant text-lg font-light leading-relaxed mb-12">
            It looks like the email address "{formData.nomineeEmail}" has already been used to submit a nomination. 
            You are good to go! Please proceed to the next steps.
          </p>
          <Button 
            size="lg" 
            className="px-12 h-16 rounded-none uppercase tracking-[0.2em] font-bold text-xs"
            onClick={() => {
              setFormData({
                nominatorType: 'someone_else',
                nomineeName: '',
                nomineeInstagram: '',
                nomineePhone: '',
                nomineeEmail: '',
                category: '',
                wildcardTitle: '',
                proofOfWork: ''
              });
              setStatus('idle');
            }}
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
           <p className="text-on-surface-variant text-lg font-light leading-relaxed max-w-xl mx-auto italic">
              Submit your nomination or self-nomination. The council will audit all submitted work.
           </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-16">
          {/* Nominator Type Selector */}
          <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-widest text-primary/80 block">Who are you nominating?</label>
            <div className="grid sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, nominatorType: 'myself' })}
                className={`p-6 border text-left rounded-none transition-all duration-300 ${
                  formData.nominatorType === 'myself'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-outline-variant/30 bg-surface-container-low text-on-surface-variant/70 hover:border-outline-variant/60'
                }`}
              >
                <span className="block text-sm font-bold uppercase tracking-wider mb-1">I am nominating myself</span>
                <span className="block text-xs font-light opacity-80 leading-relaxed">Submit a self-nomination to highlight your work and credentials.</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, nominatorType: 'someone_else' })}
                className={`p-6 border text-left rounded-none transition-all duration-300 ${
                  formData.nominatorType === 'someone_else'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-outline-variant/30 bg-surface-container-low text-on-surface-variant/70 hover:border-outline-variant/60'
                }`}
              >
                <span className="block text-sm font-bold uppercase tracking-wider mb-1">I am nominating someone else</span>
                <span className="block text-xs font-light opacity-80 leading-relaxed">Nominate an outstanding peer, colleague, or builder in the ecosystem.</span>
              </button>
            </div>
          </div>

          {/* Nominee Info */}
          <div className="space-y-10">
            <div className="grid md:grid-cols-2 gap-10">
              
              <div className="space-y-3 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-primary/80 block">Full Name of Nominee</label>
                <p className="text-[11px] text-on-surface-variant/60 font-light -mt-2 leading-relaxed">
                  Please ensure exact spelling for social media graphics and plaque printing.
                </p>
                <input
                  required
                  type="text"
                  value={formData.nomineeName}
                  onChange={(e) => setFormData({ ...formData, nomineeName: e.target.value })}
                  placeholder="EX: JOHN BUILDER"
                  className="w-full bg-surface-container-low border border-outline-variant/30 p-6 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-primary font-bold transition-all rounded-none uppercase text-sm"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-primary/80 block">Nominee's Instagram Handle</label>
                <p className="text-[11px] text-on-surface-variant/60 font-light -mt-2 leading-relaxed">
                  Needed for tag verification and notification during the voting phase.
                </p>
                <input
                  required
                  type="text"
                  value={formData.nomineeInstagram}
                  onChange={(e) => setFormData({ ...formData, nomineeInstagram: e.target.value })}
                  placeholder="EX: @USERNAME"
                  className="w-full bg-surface-container-low border border-outline-variant/30 p-6 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-primary font-bold transition-all rounded-none uppercase text-sm"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-primary/80 block">Nominee's Phone Number (WhatsApp)</label>
                <p className="text-[11px] text-on-surface-variant/60 font-light -mt-2 leading-relaxed">
                  To contact the nominee directly if they clear the council review stage.
                </p>
                <input
                  required
                  type="tel"
                  value={formData.nomineePhone}
                  onChange={(e) => setFormData({ ...formData, nomineePhone: e.target.value })}
                  placeholder="EX: +234 812 345 6789"
                  className="w-full bg-surface-container-low border border-outline-variant/30 p-6 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-primary font-bold transition-all rounded-none text-sm"
                />
              </div>

              <div className="space-y-3 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-primary/80 block">Nominee's Email Address</label>
                <p className="text-[11px] text-on-surface-variant/60 font-light -mt-2 leading-relaxed">
                  For official festival notifications and invitation letters.
                </p>
                <input
                  required
                  type="email"
                  value={formData.nomineeEmail}
                  onChange={(e) => setFormData({ ...formData, nomineeEmail: e.target.value })}
                  placeholder="EX: NOMINEE@COMPANY.COM"
                  className="w-full bg-surface-container-low border border-outline-variant/30 p-6 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-primary font-bold transition-all rounded-none text-sm"
                />
              </div>

            </div>
          </div>

          {/* Award Selection */}
          <div className="space-y-10">
            <div className="space-y-10">
              
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-primary/80 block">Select the Award Category</label>
                <p className="text-[11px] text-on-surface-variant/60 font-light -mt-2 leading-relaxed">
                  Select the category that best aligns with the nominee's core execution and expertise.
                </p>
                <div className="relative">
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline-variant/30 p-6 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-primary font-bold transition-all appearance-none cursor-pointer rounded-none uppercase tracking-wider text-xs pr-12"
                  >
                    <option value="">SELECT A CATEGORY</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none text-primary/60">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Conditional Wildcard Title Field */}
              <AnimatePresence>
                {formData.category === 'The Ecosystem Wildcard' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden space-y-3"
                  >
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/80 block">Proposed Award Title</label>
                    <p className="text-[11px] text-on-surface-variant/60 font-light -mt-2 leading-relaxed">
                      E.g., Hardware Innovator of the Year, Campus Bot Developer, Tech Photographer of the Year.
                    </p>
                    <input
                      required={formData.category === 'The Ecosystem Wildcard'}
                      type="text"
                      value={formData.wildcardTitle}
                      onChange={(e) => setFormData({ ...formData, wildcardTitle: e.target.value })}
                      placeholder="EX: TECH PHOTOGRAPHER OF THE YEAR"
                      className="w-full bg-surface-container-low border border-outline-variant/30 p-6 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-primary font-bold transition-all rounded-none uppercase text-sm"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Proof of Work */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-primary/80 block">Proof of Work</label>
                <p className="text-[11px] text-on-surface-variant/60 font-light -mt-2 leading-relaxed">
                  Provide direct links (GitHub, Behance, Figma, website) or a concise description verifying outstanding execution.
                </p>
                <textarea
                  required
                  rows={5}
                  value={formData.proofOfWork}
                  onChange={(e) => setFormData({ ...formData, proofOfWork: e.target.value })}
                  placeholder="EX: HTTPS://PORTFOLIO.IO or DETAILS OF COMPLETED INITIATIVES..."
                  className="w-full bg-surface-container-low border border-outline-variant/30 p-6 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-primary font-light transition-all resize-none rounded-none text-sm leading-relaxed"
                />
              </div>

            </div>
          </div>

          {/* Submit */}
          <div className="pt-12 flex flex-col items-center">
            {status === 'error' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4 text-red-600 mb-8 font-bold text-sm">
                 <AlertCircle size={18} />
                 <span>Sync failed. Please check your connection and try again.</span>
              </motion.div>
            )}
            <Button 
                type="submit" 
                size="lg" 
                loading={status === 'loading'}
                className="w-full sm:w-auto px-20 h-20 bg-primary text-white hover:bg-primary/90 rounded-none uppercase tracking-[0.3em] font-bold text-sm shadow-2xl shadow-primary/20 transition-all duration-300 transform hover:scale-105"
            >
              Submit Nomination
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
