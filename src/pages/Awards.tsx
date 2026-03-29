import { motion } from 'framer-motion';
import { AwardHero } from '../components/awards/Hero';
import { AwardAbout } from '../components/awards/About';
import { AwardCategories } from '../components/awards/Categories';
import { AwardCriteria } from '../components/awards/Criteria';
import { NominationForm } from '../components/awards/NominationForm';
import { AwardCTA } from '../components/awards/AwardCTA';

export function Awards() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-background min-h-screen"
    >
      <AwardHero />
      <AwardAbout />
      <AwardCategories />
      <AwardCriteria />
      <NominationForm />
      <AwardCTA />
    </motion.main>
  );
}
