import { type ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type ScrollExpansionHeroProps = {
  mediaSrc: string;
  backgroundSrc: string;
  children: ReactNode;
  expandedContent?: ReactNode;
};

export function ScrollExpansionHero({ mediaSrc, backgroundSrc, children, expandedContent }: ScrollExpansionHeroProps) {
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (expanded) {
        if (event.deltaY < 0 && window.scrollY <= 8) {
          event.preventDefault();
          setExpanded(false);
          setProgress((current) => Math.max(0, current + event.deltaY * 0.00135));
        }
        return;
      }
      if (window.scrollY > 4) return;
      event.preventDefault();
      setProgress((current) => {
        const next = Math.min(1, Math.max(0, current + event.deltaY * 0.00135));
        if (next >= 1) setExpanded(true);
        return next;
      });
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [expanded]);

  const maxWidth = typeof window === 'undefined' ? 1180 : Math.min(window.innerWidth * 0.92, 1180);
  const maxHeight = typeof window === 'undefined' ? 620 : Math.min(window.innerHeight * 0.76, 620);
  const width = 318 + (maxWidth - 318) * progress;
  const height = 404 + (maxHeight - 404) * progress;
  const titleOpacity = Math.max(0, 1 - progress * 2.25);

  return (
    <section className="relative min-h-svh overflow-hidden bg-[#030504]/95 text-botanical-text">
      <motion.img animate={{ opacity: 0.27 * (1 - progress) }} transition={{ duration: 0.08 }} src={backgroundSrc} alt="" className="pointer-events-none absolute inset-0 size-full scale-110 object-cover blur-md" />
      <div className="relative flex min-h-svh items-center justify-center px-4 py-24">
        <motion.div animate={{ width, height, borderRadius: 28 * (1 - progress), rotateX: 16 * (1 - progress) }} transition={{ duration: 0.06, ease: 'linear' }} style={{ transformOrigin: 'center bottom' }} className="relative shrink-0 overflow-hidden border border-botanical-accent/50 shadow-[0_28px_80px_rgba(0,0,0,.62)]">
          <img src={mediaSrc} alt="Composição de espécies medicinais do Cerrado" draggable={false} className="size-full scale-105 object-cover brightness-[.67] saturate-[.82]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,5,4,.08),rgba(3,5,4,.68))]" />
        </motion.div>
        <motion.div animate={{ opacity: titleOpacity }} transition={{ duration: 0.12 }} className="pointer-events-none absolute inset-0 z-10">
          {children}
        </motion.div>
        {expandedContent && <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: expanded ? 1 : 0, y: expanded ? 0 : 18 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0 z-20 grid place-items-center p-6 text-center"><div className="w-[min(88vw,42rem)]">{expandedContent}</div></motion.div>}
        {!expanded && <p className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap font-interface text-[.58rem] uppercase tracking-[.18em] text-botanical-accent">Role para revelar</p>}
      </div>
    </section>
  );
}
