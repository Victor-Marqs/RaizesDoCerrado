import { motion } from 'framer-motion';

const principles = [
  ['01', 'Biodiversidade', 'Reconhecer cada espécie como parte de uma teia viva e interdependente.'],
  ['02', 'Saberes Tradicionais', 'Aprender com comunidades guardiãs e respeitar a origem dos conhecimentos.'],
  ['03', 'Ciência Responsável', 'Investigar com rigor, transparência e compromisso com a saúde coletiva.'],
  ['04', 'Conservação', 'Proteger habitats, espécies e culturas para o presente e para o futuro.'],
] as const;

const reveal = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } };

export function PrinciplesSection() {
  return (
    <section id="objetivos" className="bg-[#080a09] px-6 py-28 text-botanical-text md:px-10 md:py-40">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[.9fr_1.1fr] md:gap-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} variants={reveal}>
          <p className="font-interface text-[.65rem] uppercase tracking-[.19em] text-botanical-accent">01 · Princípios</p>
          <h2 className="mt-6 font-editorial text-[clamp(3.4rem,5.7vw,5.7rem)] leading-[.88] tracking-[-.055em]">Conhecimento vivo,<br /><span className="italic">preservação necessária.</span></h2>
          <p className="mt-7 max-w-md font-interface text-sm leading-relaxed text-botanical-muted">O Cerrado não é um inventário estático. Cada espécie carrega relações entre território, memória e formas de cuidado.</p>
        </motion.div>
        <div className="border-t border-white/10">
          {principles.map(([number, title, description], index) => (
            <motion.article key={number} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.55, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }} variants={reveal} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-white/10 py-7 md:grid-cols-[4.5rem_1fr]">
              <span className="font-interface text-xs text-botanical-accent">{number}</span>
              <div><h3 className="font-editorial text-3xl tracking-[-.035em]">{title}</h3><p className="mt-3 max-w-md font-interface text-sm leading-relaxed text-botanical-muted">{description}</p></div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
