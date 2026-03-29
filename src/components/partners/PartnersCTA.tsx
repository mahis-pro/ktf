import { useState } from 'react';
import { motion } from 'framer-motion';
import { Section } from '../layout/Section';
import { Button } from '../ui/Button';
import { Check, Building, ArrowRight } from 'lucide-react';

export function PartnersCTA() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    interest: 'Sponsorship'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxELX7EKWltAeT2iJ1whdED3eTeZbg9PNsu0389VZt-Zk7lYMxYySVbw5pQPZxFuybG/exec';
    
    try {
      const payload = {
        'Timestamp': new Date().toLocaleString(),
        'Company Name': formData.company,
        'Full Name': formData.name,
        'Email Address': formData.email,
        'Phone Number': formData.phone,
        'Form Type': formData.interest,
        'track': 'Partnership Inquiry'
      };

      await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="partner-contact" className="bg-primary py-32 overflow-hidden text-white">
      <div className="absolute inset-0 pointer-events-none opacity-10">
         <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-repeat" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-4xl sm:text-6xl font-display font-medium uppercase tracking-tighter mb-12 leading-[1.1]">
              Initiate your <br /> <span className="text-secondary italic">Collaboration.</span>
            </h2>
            <p className="text-xl text-white/70 font-light mb-12 max-w-lg italic border-l-2 border-secondary/30 pl-8">
              "We don't just put logos on walls. We build bespoke experiences that 
              integrate your brand into the very fabric of the festival."
            </p>
            
            <div className="space-y-8">
               {[
                 'Custom Activation Strategy',
                 'Direct Access to Tech Talent',
                 'Multi-channel Brand Visibility',
                 'VIP Networking & Direct Leads'
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-4 text-white/80">
                    <div className="h-2 w-2 bg-secondary rounded-full" />
                    <span className="font-medium tracking-wide text-sm uppercase">{item}</span>
                 </div>
               ))}
            </div>
          </div>

          <div className="bg-white p-10 sm:p-16 border border-white/10 rounded-none shadow-2xl relative">
            <div className="absolute top-0 right-0 p-8 opacity-20 text-primary">
               <Building size={80} />
            </div>

            {isSubmitted ? (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="text-center py-20"
               >
                  <div className="h-20 w-20 bg-secondary/10 text-secondary mx-auto flex items-center justify-center rounded-full mb-8">
                     <Check size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-primary uppercase mb-4 tracking-tighter">Inquiry Received</h3>
                  <p className="text-on-surface-variant font-light px-8">
                    Our partnerships team will review your profile and share the 
                    official sponsorship deck within 24 hours.
                  </p>
               </motion.div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-primary uppercase mb-12 tracking-tighter border-b border-primary/10 pb-6">Request the Deck</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Company Name</label>
                      <input 
                        required
                        className="w-full bg-surface-container-low border border-outline-variant/30 px-4 h-14 text-primary focus:border-primary outline-none transition-all placeholder:text-primary/20"
                        placeholder="Organization Inc."
                        value={formData.company}
                        onChange={e => setFormData({...formData, company: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Your Name</label>
                       <input 
                        required
                        className="w-full bg-surface-container-low border border-outline-variant/30 px-4 h-14 text-primary focus:border-primary outline-none transition-all placeholder:text-primary/20"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Work Email</label>
                     <input 
                        required
                        type="email"
                        className="w-full bg-surface-container-low border border-outline-variant/30 px-4 h-14 text-primary focus:border-primary outline-none transition-all placeholder:text-primary/20"
                        placeholder="partnership@company.com"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Primary Interest</label>
                     <select 
                        required
                        className="w-full bg-surface-container-low border border-outline-variant/30 px-4 h-14 text-primary focus:border-primary outline-none transition-all appearance-none cursor-pointer"
                        value={formData.interest}
                        onChange={e => setFormData({...formData, interest: e.target.value})}
                      >
                        <option value="Sponsorship">Direct Sponsorship</option>
                        <option value="Exhibition">Exhibition Space</option>
                        <option value="Media">Media Partnership</option>
                        <option value="Speakers">Speaking Opportunities</option>
                      </select>
                  </div>

                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-20 bg-primary text-white hover:bg-primary/90 rounded-none uppercase tracking-[0.4em] font-bold text-xs mt-8 shadow-2xl transition-all"
                  >
                    {isSubmitting ? 'Architecting...' : 'Submit Inquiry'}
                    <ArrowRight size={16} className="ml-4" />
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
