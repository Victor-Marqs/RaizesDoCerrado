import { ScrollExpansionHero } from '@/components/ui/scroll-expansion-hero';
import { TextReveal } from '@/components/ui/text-reveal-animation';

export function HeroScroll() {
  return (
    <div id="inicio">
      <ScrollExpansionHero mediaSrc="/assets/hero-dark.png" backgroundSrc="/assets/hero-dark.png" expandedContent={<><h2 className="font-editorial text-[clamp(2.6rem,5vw,4.8rem)] leading-[.9] tracking-[-.05em]">Plantas que guardam<br /><span className="italic">a memória do Brasil.</span></h2><p className="mx-auto mt-4 max-w-xl font-interface text-sm leading-relaxed text-botanical-text/85 md:text-base">Um arquivo educativo sobre plantas medicinais do Cerrado e do Brasil, conectando biodiversidade, saberes tradicionais e ciência responsável.</p></>}>
        <p className="absolute left-1/2 top-[18%] -translate-x-1/2 whitespace-nowrap font-interface text-[.6rem] uppercase tracking-[.22em] text-botanical-accent">Acervo etnobotânico brasileiro · 2026</p>
        <h1 className="absolute left-[6vw] top-[39%] max-w-[38vw] font-editorial text-[clamp(2.5rem,5.6vw,6.6rem)] leading-[.86] tracking-[-.06em]"><TextReveal text="Plantas que" /><br /><TextReveal text="guardam" delay={0.16} /></h1>
        <h1 className="absolute right-[6vw] top-[53%] max-w-[38vw] text-right font-editorial text-[clamp(2.5rem,5.6vw,6.6rem)] leading-[.86] tracking-[-.06em]"><span className="italic"><TextReveal text="a memória" delay={0.3} /></span><br /><TextReveal text="do Brasil." delay={0.46} /></h1>
      </ScrollExpansionHero>
    </div>
  );
}
