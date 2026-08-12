import { useEffect, useMemo } from 'react';
import staticPage from './legacy/static-page.html?raw';
import { ArchiveMotionSection } from './components/archive-motion-section';
import { HeroScroll } from './components/hero-scroll';
import { PrinciplesSection } from './components/principles-section';
import { ScrollingSerpent } from './components/scrolling-serpent';

type LegacyPage = { header: string; content: string };

function prepareLegacyPage(): LegacyPage {
  const documentFragment = new DOMParser().parseFromString(staticPage, 'text/html');
  documentFragment.querySelector('.hero')?.remove();
  documentFragment.querySelector('.objectives-section')?.remove();
  documentFragment.querySelectorAll('script').forEach((script) => script.remove());

  const header = documentFragment.querySelector('header');
  const headerMarkup = header?.outerHTML ?? '';
  header?.remove();
  documentFragment.querySelector('main')?.removeAttribute('id');

  return { header: headerMarkup, content: documentFragment.body.innerHTML };
}

export default function App() {
  const legacyPage = useMemo(prepareLegacyPage, []);

  useEffect(() => {
    let active = true;
    void import('../js/app.js').then(({ initializeLegacyFeatures }) => {
      if (active) initializeLegacyFeatures();
    });
    return () => { active = false; };
  }, []);

  return (
    <>
      <ScrollingSerpent />
      <div className="relative z-10">
        <div dangerouslySetInnerHTML={{ __html: legacyPage.header }} />
        <HeroScroll />
        <PrinciplesSection />
        <ArchiveMotionSection />
        <div dangerouslySetInnerHTML={{ __html: legacyPage.content }} />
      </div>
    </>
  );
}
