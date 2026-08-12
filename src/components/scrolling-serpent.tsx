import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

type Point = { x: number; y: number };

export function ScrollingSerpent() {
  const pathRef = useRef<SVGPathElement>(null);
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const [documentHeight, setDocumentHeight] = useState(4800);
  const [head, setHead] = useState<Point>({ x: 100, y: -100 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateHeight = () => setDocumentHeight(Math.max(document.documentElement.scrollHeight, window.innerHeight * 5));
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  const path = useMemo(() => {
    const h = documentHeight;
    return `M 120 -150 C 1040 ${h * 0.07}, 1160 ${h * 0.13}, 250 ${h * 0.22} C -80 ${h * 0.29}, 1450 ${h * 0.37}, 1130 ${h * 0.46} C 810 ${h * 0.55}, 40 ${h * 0.61}, 340 ${h * 0.7} C 640 ${h * 0.79}, 1410 ${h * 0.85}, 1110 ${h * 0.94} C 900 ${h * 0.99}, 680 ${h + 180}, 770 ${h + 260}`;
  }, [documentHeight]);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const nextProgress = reduceMotion ? 0.08 : Math.max(0, Math.min(1, (value - 0.025) / 0.95));
    setProgress(nextProgress);
    const svgPath = pathRef.current;
    if (!svgPath || nextProgress <= 0.005) return;
    const point = svgPath.getPointAtLength(svgPath.getTotalLength() * nextProgress);
    setHead({ x: point.x, y: point.y });
  });

  const visible = reduceMotion ? 0.12 : progress;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <svg viewBox={`0 0 1440 ${documentHeight}`} preserveAspectRatio="none" className="size-full overflow-visible" fill="none">
        <defs>
          <linearGradient id="cerrado-serpent" x1="80" y1="0" x2="1340" y2={documentHeight} gradientUnits="userSpaceOnUse"><stop stopColor="#6f8050" /><stop offset=".42" stopColor="#b6842f" /><stop offset=".72" stopColor="#53643d" /><stop offset="1" stopColor="#9a7130" /></linearGradient>
          <pattern id="cerrado-scales" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M0 9C4 2 14 2 18 9M0 18C4 11 14 11 18 18" stroke="#f0ca67" strokeOpacity=".62" strokeWidth="1.15" fill="none" /></pattern>
          <filter id="cerrado-serpent-shadow" x="-20%" y="-10%" width="140%" height="120%"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <motion.path ref={pathRef} d={path} style={{ pathLength: visible }} stroke="url(#cerrado-serpent)" strokeOpacity=".16" strokeWidth="92" strokeLinecap="round" filter="url(#cerrado-serpent-shadow)" />
        <motion.path d={path} style={{ pathLength: visible }} stroke="url(#cerrado-serpent)" strokeOpacity=".43" strokeWidth="54" strokeLinecap="round" />
        <motion.path d={path} style={{ pathLength: visible }} stroke="url(#cerrado-scales)" strokeOpacity=".5" strokeWidth="48" strokeLinecap="round" />
        <motion.path d={path} style={{ pathLength: visible }} stroke="#efd075" strokeOpacity=".24" strokeWidth="3" strokeLinecap="round" />
        {visible > 0.005 && <g transform={`translate(${head.x} ${head.y}) rotate(24)`} opacity={Math.min(1, visible * 10)}><ellipse cx="0" cy="0" rx="35" ry="23" fill="#9c7430" /><path d="M-23-6C-5-23 18-23 32-5M-23 7C-5 24 18 24 32 6" stroke="#f0ca67" strokeOpacity=".6" strokeWidth="1.5" fill="none" /><circle cx="14" cy="-9" r="3.4" fill="#060807" /><circle cx="15" cy="-10" r=".85" fill="#f5df91" /><path d="M31 0l31-10M31 0l31 8" stroke="#dcad48" strokeWidth="2" strokeLinecap="round" /></g>}
      </svg>
    </div>
  );
}
