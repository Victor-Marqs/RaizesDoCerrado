import { motion } from 'framer-motion';
import { ThreeDMarquee } from '@/components/ui/three-d-marquee';

const botanicalImages = ['/assets/arnica-dark.png', '/assets/barbatimao-dark.png', '/assets/cagaita-dark.png', '/assets/carqueja-dark.png', '/assets/copaiba-dark.png', '/assets/espinheira-santa-dark.png', '/assets/guarana-dark.png', '/assets/ipe-roxo-dark.png', '/assets/jatoba-dark.png', '/assets/mangaba-dark.png', '/assets/pequi-dark.png', '/assets/sucupira-dark.png'];

export function ArchiveMotionSection() {
  return (
    <section className="relative isolate min-h-[48rem] overflow-hidden bg-[#060807]/95 px-6 py-28 text-botanical-text md:px-10 md:py-40">
      <ThreeDMarquee images={botanicalImages} />
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="flex min-h-[30rem] flex-col justify-between gap-7 md:flex-row md:items-end">
          <div><p className="font-interface text-[.65rem] uppercase tracking-[.19em] text-botanical-accent">Arquivo em movimento</p><h2 className="mt-5 max-w-xl font-editorial text-[clamp(3.4rem,5.7vw,5.7rem)] leading-[.88] tracking-[-.055em]">Espécies que atravessam <span className="italic">o território.</span></h2></div>
          <p className="max-w-xs font-interface text-sm leading-relaxed text-botanical-muted">Uma visão contínua do acervo: formas, folhas, sementes e memórias que conectam os biomas brasileiros.</p>
        </motion.div>
      </div>
    </section>
  );
}
