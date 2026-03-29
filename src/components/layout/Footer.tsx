import { Section } from './Section';

export function Footer() {
  return (
    <footer className="bg-background">
      <Section className="py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 border-b border-surface-container-low pb-12">
          <div className="lg:col-span-2">
            <img src="/ktf.png" alt="KWASU Tech Festival Logo" className="h-12 w-auto object-contain mb-8 filter grayscale hover:grayscale-0 transition-all duration-300" />
            <p className="text-on-surface-variant max-w-sm">From Campus to Industry. <br/>The ultimate tech ecosystem simulation.</p>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Event</h4>
            <ul className="space-y-2 text-on-surface-variant">
              <li>June 2026</li>
              <li>KWASU Campus</li>
              <li>Malete, Kwara State</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Connect</h4>
            <ul className="space-y-2 text-on-surface-variant">
              <li><a href="#" className="hover:text-primary transition-colors">Twitter / X</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-on-surface-variant">© 2026 KWASU Tech Festival. All rights reserved.</p>
          <p className="text-sm text-on-surface-variant">Organized by <span className="text-primary font-medium">Malete Tech Forum</span></p>
        </div>
      </Section>
    </footer>
  );
}
