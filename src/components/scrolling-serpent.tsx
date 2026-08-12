import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export function ScrollingSerpent() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const offsetY = useTransform(scrollYProgress, [0, 0.5, 1], [-90, 18, 110]);
  const offsetX = useTransform(scrollYProgress, [0, 0.5, 1], [-28, 20, -16]);
  const drawnLength = useTransform(scrollYProgress, [0, 0.1, 1], [0.12, 0.45, 1]);

  return (
    <motion.div style={{ x: offsetX, y: offsetY }} className="pointer-events-none fixed inset-0 z-20 overflow-hidden opacity-35 mix-blend-screen" aria-hidden="true">
      <motion.svg animate={reduceMotion ? undefined : { rotate: [0, 0.35, -0.25, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} viewBox="0 0 1440 960" preserveAspectRatio="none" className="size-full overflow-visible" fill="none">
        <defs>
          <linearGradient id="serpent-background" x1="110" y1="940" x2="1280" y2="40" gradientUnits="userSpaceOnUse"><stop stopColor="#53643d" /><stop offset=".45" stopColor="#c48a2a" /><stop offset="1" stopColor="#8d6c2e" /></linearGradient>
          <filter id="serpent-glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <motion.path d="M-120 910C145 765 54 645 322 548C600 447 410 326 700 234C940 158 1045 248 1278 72" style={{ pathLength: drawnLength }} stroke="url(#serpent-background)" strokeOpacity=".28" strokeWidth="48" strokeLinecap="round" filter="url(#serpent-glow)" />
        <motion.path d="M-120 910C145 765 54 645 322 548C600 447 410 326 700 234C940 158 1045 248 1278 72" style={{ pathLength: drawnLength }} stroke="url(#serpent-background)" strokeWidth="25" strokeLinecap="round" />
        <motion.path d="M-120 910C145 765 54 645 322 548C600 447 410 326 700 234C940 158 1045 248 1278 72" style={{ pathLength: drawnLength }} stroke="#f1c65f" strokeOpacity=".3" strokeWidth="3" strokeLinecap="round" />
        <motion.g style={{ opacity: drawnLength }} transform="translate(1278 72) rotate(-38)"><ellipse cx="0" cy="0" rx="24" ry="16" fill="#9e792d" /><circle cx="8" cy="-5" r="2.5" fill="#060807" /><path d="M20-3l28-10M20-3l28 4" stroke="#e0b14a" strokeWidth="2" strokeLinecap="round" /></motion.g>
      </motion.svg>
    </motion.div>
  );
}
