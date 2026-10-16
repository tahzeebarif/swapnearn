import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '../utils/animations';

export default function SectionHeading({ title, subtitle, center = true }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={`mb-8 ${center ? 'text-center' : ''}`}
    >
      <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 text-sm text-gray-500 sm:text-base">{subtitle}</p>}
      <span className={`mt-3 block h-0.5 w-14 bg-accent ${center ? 'mx-auto' : ''}`} />
    </motion.div>
  );
}
