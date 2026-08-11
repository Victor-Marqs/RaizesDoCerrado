import { ScrollExpansionHero } from '@/components/ui/scroll-expansion-hero';
import { TextReveal } from '@/components/ui/text-reveal-animation';

export function HeroScroll() {
  const openScanner = () => document.getElementById('openScannerBtnHero')?.click();

  return (
    <div id="inicio">
      <ScrollExpansionHero mediaSrc="/assets/hero-dark.png" backgroundSrc="/assets/hero-dark.png" expandedContent={<><p className="font-interface text-sm leading-relaxed text-botanical-text/85 md:text-base">Um arquivo educativo sobre plantas medicinais do Cerrado e do Brasil, conectando biodiversidade, saberes tradicionais e ciência responsável.</p><div className="mt-5 flex flex-wrap justify-center gap-5"><a href="#catalogo" className="inline-flex min-h-11 items-center bg-botanical-text px-5 font-interface text-xs font-medium text-[#080a08]">Explorar o mapa <span className="ml-5" aria-hidden="true">↗</span></a><button type="button" onClick={openScanner} className="border-b border-botanical-accent pb-2 font-interface text-xs text-botanical-accent">Identificar espécie <span className="ml-4" aria-hidden="true">→</span></button></div></>}>
        <p className="absolute left-1/2 top-[18%] -translate-x-1/2 whitespace-nowrap font-interface text-[.6rem] uppercase tracking-[.22em] text-botanical-accent">Acervo etnobotânico brasileiro · 2026</p>
        <h1 className="absolute left-[6vw] top-[39%] max-w-[38vw] font-editorial text-[clamp(2.5rem,5.6vw,6.6rem)] leading-[.86] tracking-[-.06em]"><TextReveal text="Plantas que" /><br /><TextReveal text="guardam" delay={0.16} /></h1>
        <h1 className="absolute right-[6vw] top-[53%] max-w-[38vw] text-right font-editorial text-[clamp(2.5rem,5.6vw,6.6rem)] leading-[.86] tracking-[-.06em]"><span className="italic"><TextReveal text="a memória" delay={0.3} /></span><br /><TextReveal text="do Brasil." delay={0.46} /></h1>
      </ScrollExpansionHero>
    </div>
  );
}
