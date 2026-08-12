import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export function ScrollingSerpent() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const [viewportHeight, setViewportHeight] = useState(900);

  useEffect(() => {
    const updateHeight = () => setViewportHeight(window.innerHeight);
    updateHeight();
    window.addEventListener('resize', updateHeight, { passive: true });
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const y = useTransform(scrollYProgress, [0, 0.96], [-160, viewportHeight - 210]);
  const x = useTransform(scrollYProgress, [0, 0.38, 0.72, 1], [8, -20, 15, -8]);
  const pathLength = useTransform(scrollYProgress, [0, 0.08, 1], [0.08, 0.32, 1]);

  return (
    <motion.div style={{ x, y }} className="pointer-events-none fixed right-3 top-0 z-30 hidden w-24 lg:block" aria-hidden="true">
      <motion.svg animate={reduceMotion ? undefined : { rotate: [0, 1.5, -1, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }} viewBox="0 0 120 310" className="w-full overflow-visible" fill="none">
        <defs>
          <linearGradient id="serpent-gold" x1="12" y1="20" x2="105" y2="290" gradientUnits="userSpaceOnUse"><stop stopColor="#d3a23b" /><stop offset=".48" stopColor="#7d8b5a" /><stop offset="1" stopColor="#c48a2a" /></linearGradient>
        </defs>
        <motion.path d="M61 286C96 255 22 230 58 194C95 157 29 132 62 96C88 68 59 46 74 21" style={{ pathLength }} stroke="url(#serpent-gold)" strokeWidth="9" strokeLinecap="round" />
        <motion.path d="M61 286C96 255 22 230 58 194C95 157 29 132 62 96C88 68 59 46 74 21" style={{ pathLength }} stroke="#f2d170" strokeOpacity=".42" strokeWidth="2" strokeLinecap="round" />
        <motion.g style={{ opacity: pathLength }}><ellipse cx="75" cy="19" rx="9" ry="12" fill="#a57427" transform="rotate(26 75 19)" /><circle cx="78" cy="15" r="1.4" fill="#080a08" /><path d="M82 10l7-5M82 10l8 1" stroke="#d3a23b" strokeWidth="1.25" strokeLinecap="round" /></motion.g>
      </motion.svg>
    </motion.div>
  );
}
