import { Section } from '../layout/Section';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

const TIERS = [
  { name: 'Title Partner', desc: 'Own the event identity and main stage.' },
  { name: 'Gold Tier', desc: 'High visibility across all digital and physical assets.' },
  { name: 'Silver Tier', desc: 'Targeted brand placement and activations.' },
  { name: 'Experience Zone', desc: 'Custom, immersive brand booth in the pavilion.' }
];

export function Sponsorship() {
  return (
    <Section className="bg-background">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl mb-6">
            Partner With the Future of Tech Talent
          </h2>
          <p className="text-lg text-on-surface-variant mb-8 leading-relaxed">
            Position your brand at the center of innovation. Align with builders, early adopters, and top-tier talent before they enter the market.
          </p>
          <Link to="/register?type=partner">
            <Button size="lg" className="w-full sm:w-auto">
              Request Sponsorship Deck
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {TIERS.map((tier, i) => (
            <Card key={i} elevation="low" className="p-6">
              <h3 className="text-lg font-bold text-primary mb-2">{tier.name}</h3>
              <p className="text-sm text-on-surface-variant">{tier.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
