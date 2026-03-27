import { Section } from '../layout/Section';
import { Button } from '../ui/Button';

export function FinalCTA() {
  return (
    <Section className="bg-surface relative overflow-hidden py-32">
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-primary mb-8">
          Don’t Just Attend Tech. <br />
          <span className="text-secondary italic">Experience It.</span>
        </h2>
        
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="px-8 w-full sm:w-auto">Register Interest</Button>
          <Button variant="secondary" size="lg" className="px-8 w-full sm:w-auto">Become a Partner</Button>
        </div>
      </div>
    </Section>
  );
}
