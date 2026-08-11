import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { TextReveal } from '@/components/ui/text-reveal-animation';

export function HeroScroll() {
  const openScanner = () => document.getElementById('openScannerBtnHero')?.click();

  return (
    <section id="inicio" className="relative overflow-hidden bg-botanical-background text-botanical-text">
      <div className="pointer-events-none absolute inset-0 opacity-25">
        <img src="/assets/hero-dark.png" alt="" className="size-full object-cover object-center blur-sm" />
      </div>
      <ContainerScroll
        titleComponent={
          <div className="relative z-10 px-2">
            <p className="mb-5 font-interface text-[0.66rem] uppercase tracking-[0.22em] text-botanical-accent">Acervo etnobotânico brasileiro · 2026</p>
            <h1 className="font-editorial text-[clamp(3.7rem,8.2vw,8.2rem)] leading-[0.82] tracking-[-0.055em] text-botanical-text">
              <TextReveal text="Plantas que guardam" />
              <br />
              <span className="italic"><TextReveal text="a memória do Brasil." delay={0.32} /></span>
            </h1>
          </div>
        }
      >
        <div className="relative size-full">
          <img src="/assets/hero-dark.png" alt="Composição de espécies medicinais do Cerrado" className="size-full object-cover object-center brightness-75 saturate-90" draggable={false} />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/50 to-transparent px-6 pb-7 pt-28 text-left md:px-10 md:pb-10">
            <p className="max-w-xl font-interface text-sm leading-relaxed text-botanical-text/80 md:text-base">Um arquivo educativo sobre plantas medicinais do Cerrado e do Brasil, conectando biodiversidade, saberes tradicionais e ciência responsável.</p>
            <div className="mt-6 flex flex-wrap items-center gap-5">
              <a href="#catalogo" className="inline-flex min-h-11 items-center bg-botanical-text px-5 font-interface text-xs font-medium text-[#080a08] transition-transform hover:-translate-y-0.5">Explorar o acervo <span className="ml-6" aria-hidden="true">↗</span></a>
              <button type="button" onClick={openScanner} className="border-b border-botanical-accent pb-2 font-interface text-xs text-botanical-accent">Identificar espécie <span className="ml-4" aria-hidden="true">→</span></button>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
