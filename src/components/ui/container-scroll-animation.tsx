import { type ReactNode, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type ContainerScrollProps = {
  titleComponent: ReactNode;
  children: ReactNode;
};

export function ContainerScroll({ titleComponent, children }: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], isMobile ? [0.76, 0.98] : [0.86, 1]);
  const titleTranslateY = useTransform(scrollYProgress, [0, 1], [28, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.52, 0.86, 1], [0.2, 0.52, 1, 1]);

  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth <= 768);
    updateViewport();
    window.addEventListener('resize', updateViewport, { passive: true });
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  return (
    <section ref={containerRef} className="relative flex min-h-[58rem] items-start justify-center overflow-hidden px-4 pb-24 pt-24 md:min-h-[78rem] md:px-10 md:pt-32">
      <div className="sticky top-10 flex w-full max-w-6xl flex-col items-center md:top-16" style={{ perspective: '1000px' }}>
        <motion.div style={{ y: titleTranslateY, opacity: titleOpacity }} className="relative z-10 max-w-4xl px-3 text-center">
          {titleComponent}
        </motion.div>
        <motion.div
          style={{ rotateX, scale, transformOrigin: 'center bottom' }}
          className="mt-8 h-[27rem] w-full overflow-hidden rounded-[28px] border border-botanical-accent/50 bg-[#101310] p-2 shadow-[0_24px_75px_rgba(0,0,0,.56)] md:mt-10 md:h-[33rem] md:rounded-[34px] md:p-3"
        >
          <div className="h-full w-full overflow-hidden rounded-[20px] bg-black">
            {children}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
