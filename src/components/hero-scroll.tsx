import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { TextReveal } from '@/components/ui/text-reveal-animation';

export function HeroScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const mediaWidth = useTransform(scrollYProgress, [0, 0.66, 1], ['19rem', '84vw', '100vw']);
  const mediaHeight = useTransform(scrollYProgress, [0, 0.66, 1], ['26rem', '72vh', '100vh']);
  const radius = useTransform(scrollYProgress, [0, 0.66, 1], ['1.8rem', '1.8rem', '0rem']);
  const rotateX = useTransform(scrollYProgress, [0, 0.66], [18, 0]);
  const leftX = useTransform(scrollYProgress, [0, 0.7], [-110, -660]);
  const rightX = useTransform(scrollYProgress, [0, 0.7], [110, 660]);
  const headlineOpacity = useTransform(scrollYProgress, [0.72, 0.92], [1, 0]);
  const detailsOpacity = useTransform(scrollYProgress, [0.58, 0.84], [0, 1]);
  const detailsY = useTransform(scrollYProgress, [0.58, 0.84], [36, 0]);

  const openScanner = () => document.getElementById('openScannerBtnHero')?.click();

  return (
    <section ref={sectionRef} id="inicio" className="relative h-[190vh] bg-[#030504] text-botanical-text md:h-[210vh]">
      <div className="sticky top-0 h-svh overflow-hidden" style={{ perspective: '1000px' }}>
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <img src="/assets/hero-dark.png" alt="" className="size-full scale-110 object-cover blur-md" />
        </div>

        <motion.div
          style={{ width: mediaWidth, height: mediaHeight, borderRadius: radius, rotateX, transformOrigin: 'center bottom' }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-botanical-accent/50 shadow-[0_28px_80px_rgba(0,0,0,.62)]"
        >
          <img src="/assets/hero-dark.png" alt="Composição de espécies medicinais do Cerrado" draggable={false} className="size-full scale-105 object-cover object-center brightness-[.7] saturate-[.82]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,5,4,.05),rgba(3,5,4,.62))]" />
        </motion.div>

        <motion.div style={{ opacity: headlineOpacity }} className="pointer-events-none absolute inset-0 z-10">
          <p className="absolute left-1/2 top-[16%] -translate-x-1/2 whitespace-nowrap font-interface text-[.6rem] uppercase tracking-[.22em] text-botanical-accent md:top-[18%]">
            Acervo etnobotânico brasileiro · 2026
          </p>
          <motion.h1 className="absolute left-1/2 top-1/2 whitespace-nowrap text-right font-editorial text-[clamp(3.4rem,7.2vw,7.8rem)] leading-[.84] tracking-[-.06em] text-botanical-text" style={{ x: leftX, y: '-61%' }}>
            <TextReveal text="Plantas que" />
            <br />
            <TextReveal text="guardam" delay={0.16} />
          </motion.h1>
          <motion.h1 className="absolute left-1/2 top-1/2 whitespace-nowrap font-editorial text-[clamp(3.4rem,7.2vw,7.8rem)] leading-[.84] tracking-[-.06em] text-botanical-text" style={{ x: rightX, y: '-2%' }}>
            <span className="italic"><TextReveal text="a memória" delay={0.3} /></span>
            <br />
            <TextReveal text="do Brasil." delay={0.46} />
          </motion.h1>
        </motion.div>

        <motion.div style={{ opacity: detailsOpacity, y: detailsY }} className="absolute bottom-9 left-1/2 z-20 w-[min(88vw,42rem)] -translate-x-1/2 text-center md:bottom-14">
          <p className="mx-auto max-w-2xl font-interface text-sm leading-relaxed text-botanical-text/85 md:text-base">
            Um arquivo educativo sobre plantas medicinais do Cerrado e do Brasil, conectando biodiversidade, saberes tradicionais e ciência responsável.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-5">
            <a href="#catalogo" className="inline-flex min-h-11 items-center bg-botanical-text px-5 font-interface text-xs font-medium text-[#080a08] transition-transform hover:-translate-y-0.5">Explorar o acervo <span className="ml-6" aria-hidden="true">↗</span></a>
            <button type="button" onClick={openScanner} className="border-b border-botanical-accent pb-2 font-interface text-xs text-botanical-accent">Identificar espécie <span className="ml-4" aria-hidden="true">→</span></button>
          </div>
        </motion.div>

        <motion.p style={{ opacity: headlineOpacity }} className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 font-interface text-[.58rem] uppercase tracking-[.18em] text-botanical-accent md:bottom-12">
          Role para revelar
        </motion.p>
      </div>
    </section>
  );
}
