import { Section } from '../layout/Section';
import { Users, Braces, PaintBucket, GitMerge } from 'lucide-react';

export function Collaboration() {
  return (
    <Section className="bg-background pb-32 overflow-hidden">
      <div className="mb-16 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary mb-6 lg:text-4xl">
            Where Creatives and Developers Build Together
          </h2>
          <p className="text-lg text-on-surface-variant mb-8 leading-relaxed">
            The era of isolated silos is over. KTF simulates modern, agile workspaces where designers and engineers commit to the same vision in real-time.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4 inline-flex items-center justify-center rounded-lg bg-surface-container-highest p-3 text-secondary">
                <Braces className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-primary font-semibold mb-1">Engineering</h4>
                <p className="text-sm text-on-surface-variant">Building robust, scalable logic and integrations.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4 inline-flex items-center justify-center rounded-lg bg-surface-container-highest p-3 text-secondary">
                <PaintBucket className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-primary font-semibold mb-1">Design</h4>
                <p className="text-sm text-on-surface-variant">Crafting seamless, high-converting user experiences.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Visual diagram wrapper */}
          <div className="rounded-lg bg-surface-container-low p-8 border border-outline-variant">
            <div className="flex items-center justify-between mb-16 relative">
              <div className="absolute top-1/2 left-0 w-full h-px bg-outline-variant -z-10 -translate-y-1/2"></div>
              
              <div className="flex flex-col items-center bg-surface-container-low px-4">
                <div className="h-16 w-16 rounded-lg bg-surface border border-outline-variant flex items-center justify-center mb-3">
                  <PaintBucket className="h-8 w-8 text-on-surface" />
                </div>
                <span className="text-sm font-semibold text-on-surface-variant">UI/UX</span>
              </div>
              
              <div className="flex flex-col items-center bg-surface-container-low px-4">
                <div className="h-16 w-16 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-3 text-primary">
                  <GitMerge className="h-8 w-8" />
                </div>
                <span className="text-xs font-bold text-primary">Merge</span>
              </div>

              <div className="flex flex-col items-center bg-surface-container-low px-4">
                <div className="h-16 w-16 rounded-lg bg-surface border border-outline-variant flex items-center justify-center mb-3">
                  <Braces className="h-8 w-8 text-on-surface" />
                </div>
                <span className="text-sm font-semibold text-on-surface-variant">DEV</span>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center bg-surface px-6 py-4 rounded-lg border border-outline-variant w-full text-center">
                <Users className="h-6 w-6 text-primary mb-2" />
                <span className="text-sm font-semibold text-primary">Hybrid Team Structure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
