import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export function ScrollingSerpent() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const offsetY = useTransform(scrollYProgress, [0, 0.5, 1], [-90, 18, 110]);
  const offsetX = useTransform(scrollYProgress, [0, 0.5, 1], [-28, 20, -16]);

  return (
    <motion.div style={{ x: offsetX, y: offsetY }} className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-55" aria-hidden="true">
      <motion.svg animate={reduceMotion ? undefined : { rotate: [0, 0.35, -0.25, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} viewBox="0 0 1440 960" preserveAspectRatio="none" className="size-full overflow-visible" fill="none">
        <defs>
          <linearGradient id="serpent-background" x1="110" y1="40" x2="1280" y2="900" gradientUnits="userSpaceOnUse"><stop stopColor="#53643d" /><stop offset=".45" stopColor="#c48a2a" /><stop offset="1" stopColor="#8d6c2e" /></linearGradient>
          <pattern id="serpent-scales" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M0 9C4 2 14 2 18 9M0 18C4 11 14 11 18 18" stroke="#f0ca67" strokeOpacity=".55" strokeWidth="1.2" fill="none" /></pattern>
          <filter id="serpent-glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <path d="M-110 48C154 178 60 315 330 418C600 522 432 665 706 748C942 820 1072 746 1284 898" stroke="url(#serpent-background)" strokeOpacity=".25" strokeWidth="82" strokeLinecap="round" filter="url(#serpent-glow)" />
        <path d="M-110 48C154 178 60 315 330 418C600 522 432 665 706 748C942 820 1072 746 1284 898" stroke="url(#serpent-background)" strokeWidth="48" strokeLinecap="round" />
        <path d="M-110 48C154 178 60 315 330 418C600 522 432 665 706 748C942 820 1072 746 1284 898" stroke="url(#serpent-scales)" strokeOpacity=".7" strokeWidth="43" strokeLinecap="round" />
        <path d="M-110 48C154 178 60 315 330 418C600 522 432 665 706 748C942 820 1072 746 1284 898" stroke="#f1c65f" strokeOpacity=".34" strokeWidth="3" strokeLinecap="round" />
        <g transform="translate(1284 898) rotate(35)"><ellipse cx="0" cy="0" rx="32" ry="22" fill="#9e792d" /><path d="M-21-5C-5-21 17-21 29-4M-21 6C-5 22 17 22 29 5" stroke="#f0ca67" strokeOpacity=".55" strokeWidth="1.4" fill="none" /><circle cx="13" cy="-8" r="3.2" fill="#060807" /><circle cx="14" cy="-9" r=".8" fill="#f6df92" /><path d="M28 0l31-9M28 0l31 7" stroke="#e0b14a" strokeWidth="2" strokeLinecap="round" /></g>
      </motion.svg>
    </motion.div>
  );
}
