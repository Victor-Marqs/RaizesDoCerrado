import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { TextReveal } from '@/components/ui/text-reveal-animation';

const principles = [
  ['01', 'Biodiversidade', 'Reconhecer cada espécie como parte de uma teia viva e interdependente.'],
  ['02', 'Saberes Tradicionais', 'Aprender com comunidades guardiãs e respeitar a origem dos conhecimentos.'],
  ['03', 'Ciência Responsável', 'Investigar com rigor, transparência e compromisso com a saúde coletiva.'],
  ['04', 'Conservação', 'Proteger habitats, espécies e culturas para o presente e para o futuro.'],
] as const;

export function HeroScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const cardWidth = useTransform(scrollYProgress, [0, 0.78], ['20rem', 'min(86vw, 74rem)']);
  const cardHeight = useTransform(scrollYProgress, [0, 0.78], ['25rem', 'min(72vh, 42rem)']);
  const cardRadius = useTransform(scrollYProgress, [0, 0.78], ['1.75rem', '1rem']);
  const cardTilt = useTransform(scrollYProgress, [0, 0.78], [15, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0.45, 0.68], [1, 0]);
  const detailOpacity = useTransform(scrollYProgress, [0.7, 0.88], [0, 1]);
  const detailY = useTransform(scrollYProgress, [0.7, 0.88], [24, 0]);

  return (
    <section ref={sectionRef} id="inicio" className="relative h-[185vh] bg-[#030504] text-botanical-text">
      <div className="sticky top-0 h-svh overflow-hidden" style={{ perspective: '1000px' }}>
        <div className="absolute inset-0 bg-[#030504]" />
        <img src="/assets/hero-dark.png" alt="" className="pointer-events-none absolute inset-0 size-full scale-110 object-cover opacity-25 blur-md" />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div style={{ width: cardWidth, height: cardHeight, borderRadius: cardRadius, rotateX: cardTilt, transformOrigin: 'center bottom' }} className="relative overflow-hidden border border-botanical-accent/50 shadow-[0_26px_80px_rgba(0,0,0,.62)]">
            <img src="/assets/hero-dark.png" alt="Composição de espécies medicinais do Cerrado" draggable={false} className="size-full scale-105 object-cover object-center brightness-[.64] saturate-[.82]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,5,4,.08),rgba(3,5,4,.7))]" />
            <motion.div style={{ opacity: detailOpacity, y: detailY }} className="absolute inset-0 grid content-center gap-7 p-7 md:p-12">
              <div><p className="font-interface text-[.63rem] uppercase tracking-[.2em] text-botanical-accent">01 · Princípios</p><h2 className="mt-4 font-editorial text-[clamp(2.8rem,5.6vw,5.8rem)] leading-[.85] tracking-[-.055em]">Conhecimento vivo,<br /><span className="italic">preservação necessária.</span></h2></div>
              <div className="grid gap-3 sm:grid-cols-2">
                {principles.map(([number, title, text], index) => <motion.article key={number} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08, duration: 0.4 }} className="border-t border-white/20 pt-3"><span className="font-interface text-[.62rem] text-botanical-accent">{number}</span><h3 className="mt-2 font-editorial text-2xl">{title}</h3><p className="mt-1 font-interface text-xs leading-relaxed text-botanical-text/70">{text}</p></motion.article>)}
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div style={{ opacity: titleOpacity }} className="pointer-events-none absolute inset-0 z-10">
          <p className="absolute left-1/2 top-[18%] -translate-x-1/2 whitespace-nowrap font-interface text-[.6rem] uppercase tracking-[.22em] text-botanical-accent">Acervo etnobotânico brasileiro · 2026</p>
          <h1 className="absolute left-[7%] top-1/2 max-w-[42vw] -translate-y-[75%] font-editorial text-[clamp(3.1rem,6.3vw,7.1rem)] leading-[.84] tracking-[-.06em]"><TextReveal text="Plantas que" /><br /><TextReveal text="guardam" delay={0.16} /></h1>
          <h1 className="absolute right-[7%] top-1/2 max-w-[42vw] -translate-y-[8%] text-right font-editorial text-[clamp(3.1rem,6.3vw,7.1rem)] leading-[.84] tracking-[-.06em]"><span className="italic"><TextReveal text="a memória" delay={0.3} /></span><br /><TextReveal text="do Brasil." delay={0.46} /></h1>
        </motion.div>

        <motion.p style={{ opacity: titleOpacity }} className="absolute bottom-9 left-1/2 z-10 -translate-x-1/2 font-interface text-[.58rem] uppercase tracking-[.18em] text-botanical-accent">Role para revelar</motion.p>
      </div>
    </section>
  );
}
