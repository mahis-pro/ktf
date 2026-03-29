import { Hero } from '../components/sections/Hero';
import { EventGallery } from '../components/sections/EventGallery';
import { Trust } from '../components/sections/Trust';
import { Differentiation } from '../components/sections/Differentiation';
import { ExperienceZones } from '../components/sections/ExperienceZones';
import { EventFlow } from '../components/sections/EventFlow';
import { TargetAudience } from '../components/sections/TargetAudience';
import { Collaboration } from '../components/sections/Collaboration';
import { Highlights } from '../components/sections/Highlights';
import { Sponsorship } from '../components/sections/Sponsorship';
import { FinalCTA } from '../components/sections/FinalCTA';

export function Home() {
  return (
    <main>
      <Hero />
      <EventGallery />
      <Trust />
      <Differentiation />
      <ExperienceZones />
      <EventFlow />
      <TargetAudience />
      <Collaboration />
      <Highlights />
      <Sponsorship />
      <FinalCTA />
    </main>
  );
}
