import { motion } from 'framer-motion';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';

const principles = [
  ['01', 'Biodiversidade', 'Reconhecer cada espécie como parte de uma teia viva e interdependente.'],
  ['02', 'Saberes Tradicionais', 'Aprender com comunidades guardiãs e respeitar a origem dos conhecimentos.'],
  ['03', 'Ciência Responsável', 'Investigar com rigor, transparência e compromisso com a saúde coletiva.'],
  ['04', 'Conservação', 'Proteger habitats, espécies e culturas para o presente e para o futuro.'],
] as const;

const reveal = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } };

export function PrinciplesSection() {
  return (
    <section id="objetivos" className="bg-[#080a09]/95 text-botanical-text">
      <ContainerScroll titleComponent={<motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} variants={reveal}><p className="font-interface text-[.65rem] uppercase tracking-[.19em] text-botanical-accent">01 · Princípios</p><h2 className="mt-6 font-editorial text-[clamp(3.4rem,5.7vw,5.7rem)] leading-[.88] tracking-[-.055em]">Conhecimento vivo,<br /><span className="italic">preservação necessária.</span></h2><p className="mx-auto mt-7 max-w-md font-interface text-sm leading-relaxed text-botanical-muted">O Cerrado não é um inventário estático. Cada espécie carrega relações entre território, memória e formas de cuidado.</p></motion.div>}>
        <div className="grid h-full content-center gap-2 bg-[#0b0e0b] p-6 md:grid-cols-2 md:gap-0 md:p-10">
          {principles.map(([number, title, description], index) => <motion.article key={number} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: index * 0.08 }} className="border-t border-white/15 p-5 md:p-7"><span className="font-interface text-[.62rem] text-botanical-accent">{number}</span><h3 className="mt-3 font-editorial text-3xl tracking-[-.035em]">{title}</h3><p className="mt-3 font-interface text-sm leading-relaxed text-botanical-muted">{description}</p></motion.article>)}
        </div>
      </ContainerScroll>
    </section>
  );
}
