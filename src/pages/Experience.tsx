import { motion } from 'framer-motion';
import { ExperienceHero } from '../components/experience/Hero';
import { ExperiencePhilosophy } from '../components/experience/Philosophy';
import { ExperienceJourney } from '../components/experience/Journey';
import { ExperienceZones } from '../components/experience/Zones';
import { ExperienceActivities } from '../components/experience/Activities';
import { ExperienceCollaboration } from '../components/experience/Collaboration';
import { ExperienceFeatures } from '../components/experience/Features';
import { ExperienceOutcomes } from '../components/experience/Outcomes';
import { ExperienceSnapshot } from '../components/experience/Snapshot';
import { ExperienceCTA } from '../components/experience/ExperienceCTA';

export function Experience() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-background min-h-screen"
    >
      <ExperienceHero />
      <ExperiencePhilosophy />
      <ExperienceJourney />
      <ExperienceZones />
      <ExperienceActivities />
      <ExperienceCollaboration />
      <ExperienceFeatures />
      <ExperienceOutcomes />
      <ExperienceSnapshot />
      <ExperienceCTA />
    </motion.main>
  );
}
