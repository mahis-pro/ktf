import { Section } from '../layout/Section';

const HIGHLIGHTS = [
  { text: 'Live Pitch Battles', image: '/pitch battle.jpg' },
  { text: 'Digital Art Showdown', image: '/events (3).jpg' },
  { text: 'Brand Sprint Challenge', image: '/events.jpeg' },
  { text: 'Gaming & Tech Installations', image: '/events (4).jpg' },
  { text: 'Networking Mixers', image: '/networking.jpg' }
];

export function Highlights() {
  return (
    <Section className="bg-surface overflow-hidden">
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-primary mb-4 sm:text-4xl">Experience Highlights</h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">Not a seminar. A festival of technology, creativity, and execution.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {HIGHLIGHTS.map((item, i) => (
          <div key={i} className={`group relative flex h-48 sm:h-64 cursor-pointer flex-col justify-end overflow-hidden rounded-lg bg-surface-container-low p-6 transition-colors border border-on-surface-variant/10 ${i === 0 ? 'sm:col-span-2' : ''} ${i === HIGHLIGHTS.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
            
            <div className="absolute inset-0 z-0">
              <img src={item.image} alt={item.text} className="h-full w-full object-cover grayscale opacity-20 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent" />
            </div>

            <h3 className="relative z-10 text-xl font-bold text-primary transition-colors group-hover:text-secondary">{item.text}</h3>
          </div>
        ))}
      </div>
    </Section>
  );
}
