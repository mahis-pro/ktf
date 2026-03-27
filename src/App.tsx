import { Hero } from './components/sections/Hero';
import { Trust } from './components/sections/Trust';
import { Differentiation } from './components/sections/Differentiation';
import { ExperienceZones } from './components/sections/ExperienceZones';
import { EventFlow } from './components/sections/EventFlow';
import { TargetAudience } from './components/sections/TargetAudience';
import { Collaboration } from './components/sections/Collaboration';
import { Highlights } from './components/sections/Highlights';
import { Sponsorship } from './components/sections/Sponsorship';
import { FinalCTA } from './components/sections/FinalCTA';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body selection:bg-primary/30 selection:text-primary overflow-x-hidden max-w-full">
      <Navbar />
      <main>
        <Hero />
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
      <Footer />
    </div>
  );
}

export default App;
