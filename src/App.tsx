import { useEffect, useMemo } from 'react';
import staticPage from './legacy/static-page.html?raw';
import { HeroScroll } from './components/hero-scroll';

type LegacyPage = { header: string; content: string };

function prepareLegacyPage(): LegacyPage {
  const documentFragment = new DOMParser().parseFromString(staticPage, 'text/html');
  documentFragment.querySelector('.hero')?.remove();
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
      <div dangerouslySetInnerHTML={{ __html: legacyPage.header }} />
      <HeroScroll />
      <div dangerouslySetInnerHTML={{ __html: legacyPage.content }} />
    </>
  );
}
