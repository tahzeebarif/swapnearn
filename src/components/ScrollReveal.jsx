/**
 * ScrollReveal.jsx
 * Drop-in wrapper that animates children when they scroll into view.
 *
 * Usage:
 *   <ScrollReveal>
 *     <SomeSection />
 *   </ScrollReveal>
 *
 *   <ScrollReveal variant="slideLeft" delay={0.2}>
 *     <Card />
 *   </ScrollReveal>
 */

import { motion } from 'framer-motion';
import { fadeUp, fadeIn, slideLeft, slideRight, scaleUp, viewportOnce } from '../utils/animations';

const variants = { fadeUp, fadeIn, slideLeft, slideRight, scaleUp };

export default function ScrollReveal({
  children,
  variant  = 'fadeUp',
  delay    = 0,
  className = '',
  as        = 'div',
}) {
  const chosen = variants[variant] || fadeUp;

  const adjusted = {
    hidden:  chosen.hidden,
    visible: {
      ...chosen.visible,
      transition: {
        ...chosen.visible?.transition,
        delay,
      },
    },
  };

  const Tag = motion[as] || motion.div;

  return (
    <Tag
      variants={adjusted}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={className}
    >
      {children}
    </Tag>
  );
}
