import { plantsData } from './plantsData.js';

/**
 * Raízes do Cerrado - Lógica Principal da Aplicação
 * Acervo e Herbário Digital — Feira de Ciências
 */

// Estado global da aplicação
const state = {
  currentBiome: 'Todos',
  currentMacroRegion: 'Todos',
  searchQuery: '',
  selectedPlant: null,
  isScanning: false,
  selectedSampleImage: 'assets/arnica_do_campo.png',
  selectedSamplePlantId: 'arnica-do-campo'
};

const MACRO_REGIONS = [
  {
    code: '1',
    name: 'Norte',
    states: 'AC, AP, AM, PA, RO, RR e TO',
    description: 'Florestas úmidas, campos e zonas de transição abrigam uma farmacopeia marcada pela biodiversidade amazônica e pelos saberes indígenas.'
  },
  {
    code: '2',
    name: 'Nordeste',
    states: 'AL, BA, CE, MA, PB, PE, PI, RN e SE',
    description: 'Da Caatinga ao Cerrado e à faixa atlântica, a flora medicinal revela estratégias de resistência ao calor, à seca e à sazonalidade.'
  },
  {
    code: '3',
    name: 'Sudeste',
    states: 'ES, MG, RJ e SP',
    description: 'Matas, serras e campos rupestres reúnem espécies do Cerrado e da Mata Atlântica em uma longa tradição de quintais e raizeiros.'
  },
  {
    code: '4',
    name: 'Sul',
    states: 'PR, RS e SC',
    description: 'Florestas subtropicais e campos do Pampa preservam espécies adaptadas ao frio e práticas medicinais transmitidas entre gerações.'
  },
  {
    code: '5',
    name: 'Centro-Oeste',
    states: 'DF, GO, MT e MS',
    description: 'Coração do Cerrado e do Pantanal, a região concentra frutos, cascas, folhas e resinas centrais na medicina popular brasileira.'
  }
];

// Curadoria inicial do acervo por macrorregião. Cada clique revela apenas
// espécies associadas editorialmente àquela região — não toda a área de
// ocorrência geográfica da planta.
const REGION_ARCHIVE = {
  '1': ['guarana', 'copaiba', 'jatoba'],
  '2': ['mangaba', 'carqueja', 'cagaita'],
  '3': ['ipe-roxo'],
  '4': ['espinheira-santa', 'carqueja', 'ipe-roxo'],
  '5': ['pequizeiro', 'barbatimao', 'jatoba', 'sucupira-do-cerrado']
};

// Uma espécie pode ocorrer em vários biomas. O acervo a apresenta pelo
// contexto ecológico da macrorregião selecionada no mapa.
const REGION_CONTEXT = {
  '1': { label: 'Amazônia', description: 'Floresta amazônica e saberes da região Norte.' },
  '2': { label: 'Caatinga', description: 'Caatinga, sertões e zonas de transição do Nordeste.' },
  '3': { label: 'Mata Atlântica', description: 'Mata Atlântica, serras e campos rupestres do Sudeste.' },
  '4': { label: 'Pampa e Mata das Araucárias', description: 'Campos sulinos e florestas com araucárias do Sul.' },
  '5': { label: 'Cerrado e Pantanal', description: 'Savana do Cerrado e paisagens alagáveis do Centro-Oeste.' }
};

const REGION_SPECIMEN_BIOMES = {
  '1': { guarana: 'Amazônia', copaiba: 'Amazônia', jatoba: 'Amazônia' },
  '2': { mangaba: 'Caatinga', carqueja: 'Caatinga', cagaita: 'Caatinga' },
  '3': { 'ipe-roxo': 'Mata Atlântica' },
  '4': { 'espinheira-santa': 'Mata das Araucárias', carqueja: 'Pampa', 'ipe-roxo': 'Mata Atlântica' },
  '5': { pequizeiro: 'Cerrado', barbatimao: 'Cerrado', jatoba: 'Cerrado', 'sucupira-do-cerrado': 'Cerrado e Pantanal' }
};

// Fotografias editoriais usadas no acervo. As pranchas originais continuam
// disponíveis dentro dos dossiês como documentação botânica.
const darkPhotoMap = {
  'arnica-do-campo': 'assets/arnica-dark.png',
  'barbatimao': 'assets/barbatimao-dark.png',
  'cagaita': 'assets/cagaita-dark.png',
  'carqueja': 'assets/carqueja-dark.png',
  'jatoba': 'assets/jatoba-dark.png',
  'mangaba': 'assets/mangaba-dark.png',
  'pequizeiro': 'assets/pequi-dark.png',
  'copaiba': 'assets/copaiba-dark.png',
  'guarana': 'assets/guarana-dark.png',
  'ipe-roxo': 'assets/ipe-roxo-dark.png',
  'espinheira-santa': 'assets/espinheira-santa-dark.png',
  'sucupira-do-cerrado': 'assets/sucupira-dark.png'
};

// SVG Ilustrações Botânicas Fallback para plantas com vetor
const plantSVGMap = {
  'mangaba_svg': `<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#EFECE4"/><circle cx="100" cy="95" r="45" fill="#C88320" opacity="0.85"/><circle cx="120" cy="85" r="15" fill="#9E4B27" opacity="0.4"/><path d="M100 30 Q120 10 140 25 T130 50 Z" fill="#57635A"/><path d="M70 50 Q50 30 40 55 T75 70 Z" fill="#1B2B22"/><text x="100" y="168" font-family="Fraunces, serif" font-size="13" font-weight="600" fill="#1B2B22" text-anchor="middle">Hancornia speciosa</text></svg>`,
  'pequizeiro_svg': `<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#FAF8F3"/><circle cx="100" cy="100" r="50" fill="#C88320" opacity="0.9"/><circle cx="100" cy="100" r="32" fill="#9E4B27"/><path d="M100 68 L100 132 M68 100 L132 100 M77 77 L123 123 M123 77 L77 123" stroke="#FAF8F3" stroke-width="2" stroke-linecap="round"/><text x="100" y="170" font-family="Fraunces, serif" font-size="13" font-weight="600" fill="#1B2B22" text-anchor="middle">Caryocar brasiliense</text></svg>`,
  'copaiba_svg': `<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#EFECE4"/><path d="M100 20 C140 70 160 120 100 170 C40 120 60 70 100 20 Z" fill="#57635A" opacity="0.8"/><path d="M100 20 L100 170" stroke="#1B2B22" stroke-width="1.5"/><text x="100" y="185" font-family="Fraunces, serif" font-size="13" font-weight="600" fill="#1B2B22" text-anchor="middle">Copaifera langsdorffii</text></svg>`,
  'guarana_svg': `<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#FAF2E3"/><circle cx="100" cy="95" r="42" fill="#9E4B27"/><circle cx="100" cy="95" r="24" fill="#FAF8F3"/><circle cx="100" cy="95" r="12" fill="#1B2B22"/><text x="100" y="165" font-family="Fraunces, serif" font-size="13" font-weight="600" fill="#1B2B22" text-anchor="middle">Paullinia cupana</text></svg>`,
  'ipe_roxo_svg': `<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#F5EAE4"/><ellipse cx="100" cy="95" rx="45" ry="35" fill="#7D381A" opacity="0.85"/><path d="M80 75 Q100 50 120 75 T100 120 Z" fill="#9E4B27"/><text x="100" y="165" font-family="Fraunces, serif" font-size="13" font-weight="600" fill="#1B2B22" text-anchor="middle">Handroanthus impetiginosus</text></svg>`,
  'espinheira_santa_svg': `<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#EFECE4"/><path d="M100 30 L120 60 L145 65 L125 90 L135 125 L100 105 L65 125 L75 90 L55 65 L80 60 Z" fill="#1B2B22"/><text x="100" y="165" font-family="Fraunces, serif" font-size="13" font-weight="600" fill="#1B2B22" text-anchor="middle">Monteverdia ilicifolia</text></svg>`,
  'sucupira_svg': `<svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#FAF2E3"/><ellipse cx="100" cy="95" rx="38" ry="52" fill="#C88320" transform="rotate(-15 100 95)"/><path d="M70 70 Q100 90 130 110" stroke="#7D381A" stroke-width="2.5" stroke-linecap="round"/><text x="100" y="170" font-family="Fraunces, serif" font-size="13" font-weight="600" fill="#1B2B22" text-anchor="middle">Pterodon emarginatus</text></svg>`
};

export function initializeLegacyFeatures() {
  initNavbar();
  initBrazilMap();
  initBiomeFilters();
  initSearch();
  initModals();
  initScannerSimulator();
  renderPlants();
  initAnimeMotion();
}

/* ========================================================================== 
   ANIMAÇÕES EDITORIAIS — ANIME.JS
   ========================================================================== */
const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
const motionEnabled = () => Boolean(window.anime?.animate);

function runMotion(targets, parameters) {
  if (!motionEnabled() || !targets) return null;
  return window.anime.animate(targets, parameters);
}

function initScrollExpansionHero() {
  const hero = document.querySelector('.hero');
  const media = document.querySelector('.hero-expansion-media');
  const copy = document.querySelector('.hero-expansion-copy');
  if (!hero || !media || !copy) return;

  let progress = 0;
  let expanded = false;
  let touchY = null;

  const render = () => {
    const mobile = window.innerWidth < 700;
    const minWidth = mobile ? 248 : 330;
    const minHeight = mobile ? 340 : 420;
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;
    const width = minWidth + (maxWidth - minWidth) * progress;
    const height = minHeight + (maxHeight - minHeight) * progress;
    const gap = (mobile ? 72 : 102) + progress * (mobile ? 150 : 430);

    hero.style.setProperty('--hero-progress', progress.toFixed(3));
    hero.style.setProperty('--hero-tilt', `${18 * (1 - progress)}deg`);
    hero.style.setProperty('--hero-scale', `${1.05 - progress * .05}`);
    media.style.width = `${width}px`;
    media.style.height = `${height}px`;
    media.style.borderRadius = `${30 * (1 - progress)}px`;
    copy.style.opacity = String(Math.max(0, 1 - progress * 1.1));
    media.style.borderWidth = `${Math.max(0, 1 - progress)}px`;
    copy.querySelector('.hero-title-left').style.transform = `translateX(calc(-50% - ${gap}px))`;
    copy.querySelector('.hero-title-right').style.transform = `translateX(calc(50% + ${gap}px))`;

    if (progress >= 1 && !expanded) {
      expanded = true;
      hero.classList.add('is-expanded');
      runMotion('.hero-content > *', {
        opacity: [0, 1],
        translateY: ['18px', '0px'],
        delay: window.anime?.stagger?.(90, { start: 80 }) || 0,
        duration: 680,
        ease: 'out(4)'
      });
    }
  };

  const setProgress = delta => {
    if (expanded) return;
    progress = Math.max(0, Math.min(1, progress + delta));
    render();
  };

  initHeroTextReveal(copy);

  window.addEventListener('wheel', event => {
    if (expanded || window.scrollY > 3) return;
    event.preventDefault();
    setProgress(event.deltaY * .00135);
  }, { passive: false });

  window.addEventListener('touchstart', event => {
    touchY = event.touches[0]?.clientY ?? null;
  }, { passive: true });

  window.addEventListener('touchmove', event => {
    if (expanded || window.scrollY > 3 || touchY === null) return;
    const nextY = event.touches[0]?.clientY ?? touchY;
    event.preventDefault();
    setProgress((touchY - nextY) * .0044);
    touchY = nextY;
  }, { passive: false });

  window.addEventListener('touchend', () => { touchY = null; }, { passive: true });
  window.addEventListener('resize', render, { passive: true });
  render();
}

function initHeroTextReveal(container) {
  container.querySelectorAll('.hero-expansion-title').forEach(title => {
    let index = 0;
    const fragment = document.createDocumentFragment();
    [...title.childNodes].forEach(node => {
      if (node.nodeType !== Node.TEXT_NODE) {
        fragment.append(node.cloneNode(true));
        return;
      }
      [...node.textContent].forEach(character => {
        const letter = document.createElement('span');
        letter.className = 'hero-letter';
        letter.style.setProperty('--letter-index', index++);
        letter.textContent = character === ' ' ? '\u00a0' : character;
        fragment.append(letter);
      });
    });
    title.replaceChildren(fragment);
  });
}

function initAnimeMotion() {
  if (!motionEnabled()) {
    document.documentElement.dataset.animeMotion = 'unavailable';
    return;
  }
  document.documentElement.dataset.animeMotion = 'active';

  runMotion('.navbar-container > *', {
    opacity: [0, 1],
    translateY: ['-10px', '0px'],
    delay: window.anime.stagger(70),
    duration: 560,
    ease: 'out(4)'
  });
  const revealTargets = [
    '.objectives-intro > .section-number',
    '.objectives-intro > h2',
    '.objectives-intro > p:last-child',
    '.objective-block',
    '.catalog-heading > div',
    '.catalog-heading > p',
    '.regions-explorer',
    '.search-bar-row',
    '.biome-tabs-container',
    '.archive-cta-content > svg',
    '.archive-cta-content > h2',
    '.archive-cta-content > p',
    '.archive-cta-content > .btn',
    '.footer-grid'
  ];

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || entry.target.dataset.motionRevealed) return;
      entry.target.dataset.motionRevealed = 'true';
      runMotion(entry.target, {
        opacity: [0, 1],
        translateY: ['26px', '0px'],
        duration: 760,
        ease: 'out(4)'
      });
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.16 });

  document.querySelectorAll(revealTargets.join(',')).forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(26px)';
    revealObserver.observe(element);
  });

  bindMotionInteractions(document);
}

function bindMotionInteractions(scope) {
  if (!motionEnabled()) return;
  scope.querySelectorAll('button, .specimen-card').forEach(element => {
    if (element.dataset.motionBound) return;
    element.dataset.motionBound = 'true';
    element.addEventListener('pointerdown', () => runMotion(element, {
      scale: [1, 0.975, 1],
      duration: 260,
      ease: 'out(4)'
    }));
  });
}

function animateSpecimenCards(grid) {
  if (!motionEnabled()) return;
  const cards = [...grid.querySelectorAll('.specimen-card')];
  if (!cards.length) return;
  cards.forEach(card => { card.style.opacity = '0'; });
  runMotion(cards, {
    opacity: [0, 1],
    translateY: ['28px', '0px'],
    scale: [0.985, 1],
    delay: window.anime.stagger(72, { start: 40 }),
    duration: 680,
    ease: 'out(4)'
  });
  runMotion(cards.map(card => card.querySelector('.specimen-img')).filter(Boolean), {
    scale: [1.055, 1],
    delay: window.anime.stagger(72, { start: 40 }),
    duration: 980,
    ease: 'out(3)'
  });
  bindMotionInteractions(grid);
}

function animateRegionSelection(previousCode, currentCode) {
  if (!motionEnabled()) return;
  if (currentCode !== 'Todos') {
    const region = document.querySelector(`.region-shape[data-code="${currentCode}"]`);
    const boundaries = document.querySelector(`.state-boundaries[data-region-code="${currentCode}"]`);
    runMotion(region, {
      opacity: [0.6, 1],
      duration: 420,
      ease: 'out(4)'
    });
    runMotion(boundaries, {
      opacity: [0, 1],
      strokeDashoffset: [26, 0],
      duration: 940,
      delay: 100,
      ease: 'out(3)'
    });
  } else if (previousCode !== 'Todos') {
    const boundaries = document.querySelector(`.state-boundaries[data-region-code="${previousCode}"]`);
    runMotion(boundaries, {
      opacity: [1, 0],
      strokeDashoffset: [0, 26],
      duration: 340,
      ease: 'out(2)'
    });
  }
}

function animateModalEntrance(container) {
  runMotion(container, {
    opacity: [0, 1],
    scale: [0.975, 1],
    translateY: ['20px', '0px'],
    duration: 520,
    ease: 'out(4)'
  });
}

/* ========================================================================== 
   MAPA INTERATIVO DAS MACRORREGIÕES BRASILEIRAS
   ========================================================================== */
function initBrazilMap() {
  const svgElement = document.getElementById('brazilMap');
  const mapWrap = document.querySelector('.brazil-map-wrap');
  if (!svgElement || !mapWrap) return;
  const tooltip = document.getElementById('mapTooltip');
  svgElement.querySelectorAll('.region-shape').forEach(path => {
    const code = path.dataset.code;
    const region = getRegionByCode(code);
    path.setAttribute('aria-label', `${region.name}: ${getRegionPlantCount(region.name)} espécies documentadas`);
    path.addEventListener('pointerenter', event => {
      svgElement.querySelectorAll('.region-shape.is-hovered').forEach(regionPath => regionPath.classList.remove('is-hovered'));
      path.classList.add('is-hovered');
      showMapTooltip(event, code, tooltip, mapWrap);
    });
    path.addEventListener('pointermove', event => showMapTooltip(event, code, tooltip, mapWrap));
    path.addEventListener('pointerleave', () => {
      path.classList.remove('is-hovered');
      hideMapTooltip(tooltip);
    });
    path.addEventListener('click', () => selectMacroRegion(code));
    path.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectMacroRegion(code);
      }
    });
  });
  updateRegionInterface();
}

function getRegionByCode(code) {
  return MACRO_REGIONS.find(region => region.code === String(code));
}

function getRegionPlantCount(regionName) {
  const region = MACRO_REGIONS.find(item => item.name === regionName);
  return region ? (REGION_ARCHIVE[region.code] || []).length : 0;
}

function getRegionalBiome(plant, regionCode) {
  return REGION_SPECIMEN_BIOMES[regionCode]?.[plant.id] || plant.region;
}

function selectMacroRegion(code) {
  const previousCode = state.currentMacroRegion;
  const normalizedCode = String(code);
  state.currentMacroRegion = state.currentMacroRegion === normalizedCode ? 'Todos' : normalizedCode;
  state.currentBiome = 'Todos';
  updateRegionInterface();
  animateRegionSelection(previousCode, state.currentMacroRegion);
  initBiomeFilters();
  renderPlants();
}

function updateRegionInterface() {
  const selectedRegion = getRegionByCode(state.currentMacroRegion);
  const map = document.getElementById('brazilMap');

  map?.classList.toggle('has-selection', Boolean(selectedRegion));
  if (map) map.dataset.activeRegion = selectedRegion?.code || '';
  document.querySelector('.states-layer')?.setAttribute('aria-hidden', String(!selectedRegion));
  document.querySelectorAll('.region-shape').forEach(path => {
    const isSelected = path.dataset.code === state.currentMacroRegion;
    path.classList.toggle('is-selected', isSelected);
    path.setAttribute('aria-pressed', String(isSelected));
  });
}

function showMapTooltip(event, code, tooltip, mapWrap) {
  if (!tooltip) return;
  const region = getRegionByCode(code);
  const regionalContext = REGION_CONTEXT[code];
  const bounds = mapWrap.getBoundingClientRect();
  tooltip.innerHTML = `<strong>${region.name}</strong><span>${regionalContext.label} · ${getRegionPlantCount(region.name)} espécies</span>`;
  tooltip.style.left = `${event.clientX - bounds.left + 14}px`;
  tooltip.style.top = `${event.clientY - bounds.top + 14}px`;
  tooltip.classList.add('is-visible');
  tooltip.setAttribute('aria-hidden', 'false');
}

function hideMapTooltip(tooltip) {
  tooltip?.classList.remove('is-visible');
  tooltip?.setAttribute('aria-hidden', 'true');
}

/* ==========================================================================
   ANIMAÇÃO DO JATOBÁ NO HERO (GSAP SCROLLTRIGGER)
   ========================================================================== */
function initJatobaAnimation() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const section = document.querySelector(".hero");
    const imgFechado = document.querySelector(".jatoba-fechado");
    const imgAberto = document.querySelector(".jatoba-aberto");
    const wrapper = document.querySelector(".jatoba-wrapper");
    const text = document.querySelector(".jatoba-text");

    if (section && imgFechado && imgAberto && wrapper) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        }
      });

      tl
        .to(imgFechado, { opacity: 0, duration: 1 }, 0)
        .to(imgAberto, { opacity: 1, duration: 1 }, 0)
        .to(wrapper, { scale: 1.08, duration: 1.2, ease: "power1.inOut" }, 0)
        .to(wrapper, { rotation: -5, duration: 1.2, ease: "power1.inOut" }, 0)
        .to(imgAberto, { y: -10, duration: 1 }, 0.2);

      if (text) {
        tl.to(text, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.7);
      }
    }
  }
}

/* ==========================================================================
   NAVEGAÇÃO E MENU MOBILE
   ========================================================================== */
function initNavbar() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }
}

/* ==========================================================================
   FILTROS DE BIOMA (ABAS EDITORIAIS)
   ========================================================================== */
function initBiomeFilters() {
  const biomeContainer = document.getElementById('biomeFilters');
  if (!biomeContainer) return;

  const selectedRegion = getRegionByCode(state.currentMacroRegion);
  const regionalPlants = selectedRegion
    ? plantsData.filter(plant => REGION_ARCHIVE[selectedRegion.code]?.includes(plant.id))
    : plantsData;

  biomeContainer.innerHTML = BIOMES.map(biome => {
    const count = biome.id === 'Todos' 
      ? regionalPlants.length 
      : regionalPlants.filter(p => p.region === biome.id || p.regionsSecondary?.includes(biome.id)).length;

    return `
      <button class="biome-tab-btn ${biome.id === state.currentBiome ? 'active' : ''}" data-biome="${biome.id}">
        <span>${biome.name}</span>
        <span class="tab-count">(${count})</span>
      </button>
    `;
  }).join('');

  biomeContainer.querySelectorAll('.biome-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selected = e.currentTarget.getAttribute('data-biome');
      state.currentBiome = selected;
      
      biomeContainer.querySelectorAll('.biome-tab-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');

      renderPlants();
    });
  });
  bindMotionInteractions(biomeContainer);
}

/* ==========================================================================
   BUSCA EM TEMPO REAL
   ========================================================================== */
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('searchClearBtn');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.toLowerCase().trim();
    
    if (clearBtn) {
      if (state.searchQuery.length > 0) {
        clearBtn.classList.add('visible');
      } else {
        clearBtn.classList.remove('visible');
      }
    }

    renderPlants();
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      state.searchQuery = '';
      clearBtn.classList.remove('visible');
      renderPlants();
      searchInput.focus();
    });
  }
}

/* ==========================================================================
   RENDERIZAÇÃO DOS CARTÕES DE ESPÉCIMES
   ========================================================================== */
function renderPlants() {
  const grid = document.getElementById('plantsGrid');
  const counter = document.getElementById('resultsCounter');
  if (!grid) return;

  const selectedRegion = getRegionByCode(state.currentMacroRegion);
  document.querySelector('.search-bar-row')?.classList.remove('is-map-selection');
  document.querySelector('.biome-tabs-container')?.classList.remove('is-map-selection');
  grid.classList.toggle('is-map-selection', Boolean(selectedRegion));

  if (!selectedRegion) {
    if (counter) counter.textContent = 'Selecione uma região do mapa para consultar as espécies.';
    grid.innerHTML = '';
    return;
  }

  // Skeleton Loader breve
  grid.innerHTML = Array(4).fill(0).map(() => `
    <div class="skeleton-card">
      <div class="skeleton-img"></div>
      <div class="skeleton-line" style="width: 60%"></div>
      <div class="skeleton-line" style="width: 40%"></div>
      <div class="skeleton-line" style="width: 85%"></div>
    </div>
  `).join('');

  setTimeout(() => {
    const featuredIds = REGION_ARCHIVE[selectedRegion.code] || [];
    const filtered = plantsData.filter(plant => featuredIds.includes(plant.id));
    const regionalContext = REGION_CONTEXT[selectedRegion.code];

    if (counter) {
      counter.textContent = `${selectedRegion.name} · ${regionalContext.label} — ${filtered.length} ${filtered.length === 1 ? 'espécime documentado' : 'espécimes documentados'}`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-results-box">
          <h3 class="empty-title">Nenhum espécime localizado</h3>
          <p class="empty-desc">Não foram encontrados registros para "${state.searchQuery}" no bioma selecionado. Refine o termo de busca ou altere o filtro de bioma.</p>
          <button class="btn btn-secondary" id="resetSearchBtn">Restaurar Todos os Espécimes</button>
        </div>
      `;

      document.getElementById('resetSearchBtn')?.addEventListener('click', () => {
        state.currentBiome = 'Todos';
        state.currentMacroRegion = 'Todos';
        state.searchQuery = '';
        document.getElementById('searchInput').value = '';
        document.getElementById('searchClearBtn')?.classList.remove('visible');
        updateRegionInterface();
        initBiomeFilters();
        renderPlants();
      });
      return;
    }

    grid.innerHTML = filtered.map(plant => {
      const regionalBiome = getRegionalBiome(plant, selectedRegion.code);
      let imageElementHTML = '';
      const editorialPhoto = darkPhotoMap[plant.id];
      if (editorialPhoto) {
        imageElementHTML = `<img src="${editorialPhoto}" alt="Retrato botânico de ${plant.namePopular}" class="specimen-img" loading="lazy" />`;
      } else if (plant.image.endsWith('.png')) {
        imageElementHTML = `<img src="${plant.image}" alt="${plant.namePopular}" class="specimen-img" loading="lazy" />`;
      } else {
        const svgKey = plant.image.split('/')[1];
        imageElementHTML = plantSVGMap[svgKey] || `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:2rem;background:var(--color-paper-surface);color:var(--color-ink-muted)">HERBÁRIO</div>`;
      }

      return `
        <div class="specimen-card" data-id="${plant.id}" role="button" tabindex="0" aria-label="Consultar dossiê de ${plant.namePopular}">
          <div class="specimen-img-container">
            ${imageElementHTML}
            <span class="specimen-tag-bar">${regionalBiome} · ${plant.family}</span>
          </div>
          <div class="specimen-card-body">
            <div class="specimen-names">
              <h3 class="specimen-popular">${plant.namePopular}</h3>
              <p class="specimen-scientific">${plant.nameScientific}</p>
            </div>
            <p class="specimen-desc">${plant.shortDesc}</p>
            <div class="specimen-card-footer">
              <span>${plant.code || 'Acervo botânico'}</span>
              <span class="specimen-action-link">Consultar dossiê ↗</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.specimen-card').forEach(card => {
      const openFn = () => {
        const id = card.getAttribute('data-id');
        openPlantModal(id);
      };

      card.addEventListener('click', openFn);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openFn();
        }
      });
    });
    animateSpecimenCards(grid);
  }, 200);
}

/* ==========================================================================
   MODAL DE DOSSIÊ BOTÂNICO
   ========================================================================== */
function initModals() {
  const modalOverlay = document.getElementById('plantModal');
  const closeBtn = document.getElementById('closeModalBtn');

  if (closeBtn && modalOverlay) {
    closeBtn.addEventListener('click', closePlantModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closePlantModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePlantModal();
      closeScannerModal();
    }
  });
}

function openPlantModal(plantId) {
  const plant = plantsData.find(p => p.id === plantId);
  if (!plant) return;

  state.selectedPlant = plant;
  const modalOverlay = document.getElementById('plantModal');
  const modalBody = document.getElementById('plantModalBody');
  if (!modalOverlay || !modalBody) return;

  let heroImageHTML = '';
  if (plant.image.endsWith('.png')) {
    heroImageHTML = `<img src="${plant.image}" alt="${plant.namePopular}" class="dossier-img" />`;
  } else {
    const svgKey = plant.image.split('/')[1];
    heroImageHTML = `<div style="height:340px;width:100%">${plantSVGMap[svgKey] || ''}</div>`;
  }

  modalBody.innerHTML = `
    <div class="dossier-header-grid">
      ${heroImageHTML}
      <div class="dossier-meta-padding">
        <span class="dossier-accession-code">REGISTRO DE ACERVO BOTÂNICO • ${plant.code || 'ESP-000'}</span>
        <h2 class="dossier-popular-name">${plant.namePopular}</h2>
        <p class="dossier-scientific-name">${plant.nameScientific}</p>
        
        <div class="dossier-facts-list">
          <p><strong>Bioma Principal:</strong> ${plant.region}</p>
          <p><strong>Família Botânica:</strong> ${plant.family}</p>
          <p><strong>Órgão Utilizado:</strong> ${plant.partUsed}</p>
          <p><strong>Status de Conservação:</strong> ${plant.conservationStatus}</p>
        </div>
      </div>
    </div>

    <div class="dossier-body-content">
      <div class="dossier-sections-grid">
        <div class="dossier-box">
          <span class="dossier-num-label">01. CARACTERÍSTICAS TAXONÔMICAS</span>
          <h4>Morfologia Botânica</h4>
          <p>${plant.characteristics}</p>
        </div>

        <div class="dossier-box">
          <span class="dossier-num-label">02. OCORRÊNCIA NATURAL</span>
          <h4>Distribuição & Habitat</h4>
          <p>${plant.occurrence}</p>
        </div>

        <div class="dossier-box">
          <span class="dossier-num-label">03. USO TRADICIONAL REGISTRADO</span>
          <h4>Medicina Popular</h4>
          <p>${plant.traditionalUse}</p>
        </div>

        <div class="dossier-box dossier-box-curiosity">
          <span class="dossier-num-label">04. NOTAS ETNOBOTÂNICAS</span>
          <h4>Curiosidades & Ciência</h4>
          <p>${plant.curiosities}</p>
        </div>

        <div class="dossier-box dossier-box-caution">
          <span class="dossier-num-label">05. DIRETRIPES DE USO & PRECAUÇÕES</span>
          <h4>Contraindicações</h4>
          <p>${plant.precautions}</p>
        </div>

        <div class="dossier-box">
          <span class="dossier-num-label">06. DOCUMENTAÇÃO CIENTÍFICA</span>
          <h4>Fontes & Referências</h4>
          <p>${plant.sources}</p>
        </div>
      </div>
    </div>
  `;

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  animateModalEntrance(document.querySelector('.modal-dossier-container'));
}

function closePlantModal() {
  const modalOverlay = document.getElementById('plantModal');
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   SIMULADOR DE IDENTIFICAÇÃO TAXONÔMICA (INSTRUMENTO DE PESQUISA)
   ========================================================================== */
function initScannerSimulator() {
  const openScannerBtn = document.getElementById('openScannerBtn');
  const openScannerBtnHero = document.getElementById('openScannerBtnHero');
  const scannerModal = document.getElementById('scannerModal');
  const closeScannerBtn = document.getElementById('closeScannerBtn');
  const startScanBtn = document.getElementById('startScanBtn');

  if (openScannerBtn) openScannerBtn.addEventListener('click', openScannerModal);
  if (openScannerBtnHero) openScannerBtnHero.addEventListener('click', openScannerModal);
  if (closeScannerBtn) closeScannerBtn.addEventListener('click', closeScannerModal);

  if (scannerModal) {
    scannerModal.addEventListener('click', (e) => {
      if (e.target === scannerModal) closeScannerModal();
    });
  }

  document.querySelectorAll('.sample-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.sample-btn').forEach(b => b.classList.remove('active'));
      const target = e.currentTarget;
      target.classList.add('active');

      const plantId = target.getAttribute('data-plant-id');
      const imgSrc = target.getAttribute('data-img-src');

      state.selectedSamplePlantId = plantId;
      state.selectedSampleImage = imgSrc;

      const previewArea = document.getElementById('scannerPreviewArea');
      if (previewArea) {
        previewArea.innerHTML = `
          <img src="${imgSrc}" class="technical-viewport-img" alt="Amostra Selecionada" />
          <div class="crosshair-overlay">
            <div class="crosshair-line-h"></div>
            <div class="crosshair-line-v"></div>
          </div>
        `;
      }

      document.getElementById('scanResultCard')?.classList.remove('active');
    });
  });

  if (startScanBtn) {
    startScanBtn.addEventListener('click', runScannerSimulation);
  }
}

function openScannerModal() {
  const scannerModal = document.getElementById('scannerModal');
  if (scannerModal) {
    scannerModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    animateModalEntrance(scannerModal.querySelector('.modal-dossier-container'));
  }
}

function closeScannerModal() {
  const scannerModal = document.getElementById('scannerModal');
  if (scannerModal) {
    scannerModal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function runScannerSimulation() {
  if (state.isScanning) return;
  state.isScanning = true;

  const startScanBtn = document.getElementById('startScanBtn');
  const resultCard = document.getElementById('scanResultCard');

  if (startScanBtn) {
    startScanBtn.disabled = true;
    startScanBtn.textContent = 'Analisando características morfológicas...';
  }

  if (resultCard) {
    resultCard.classList.remove('active');
  }

  setTimeout(() => {
    state.isScanning = false;

    if (startScanBtn) {
      startScanBtn.disabled = false;
      startScanBtn.textContent = 'Iniciar Análise Taxonômica';
    }

    const matchedPlant = plantsData.find(p => p.id === state.selectedSamplePlantId) || plantsData[0];

    if (resultCard) {
      resultCard.innerHTML = `
        <div style="display:flex;align-items:center;gap:1rem">
          <div style="width:44px;height:44px;background:var(--color-paper);border:1px solid var(--color-border);overflow:hidden">
            <img src="${darkPhotoMap[matchedPlant.id] || (matchedPlant.image.endsWith('.png') ? matchedPlant.image : 'assets/arnica-dark.png')}" style="width:100%;height:100%;object-fit:cover" alt="${matchedPlant.namePopular}" />
          </div>
          <div>
            <span style="font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--color-barro);font-weight:700">Correspondência Taxonômica</span>
            <h4 style="font-size:1.1rem;color:var(--color-ink-dark);margin:0">${matchedPlant.namePopular}</h4>
            <p style="font-family:var(--font-serif);font-style:italic;font-size:0.85rem;color:var(--color-barro-dark);margin:0">${matchedPlant.nameScientific}</p>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:0.8rem">
          <span style="font-size:0.8rem;color:var(--color-ink-muted);font-weight:600">Similaridade: 98,6%</span>
          <button class="btn btn-primary" id="viewScannedPlantBtn" style="padding:0.5rem 1rem;font-size:0.82rem">Consultar Dossiê</button>
        </div>
      `;
      resultCard.classList.add('active');
      runMotion(resultCard, {
        opacity: [0, 1],
        translateY: ['16px', '0px'],
        duration: 460,
        ease: 'out(4)'
      });

      document.getElementById('viewScannedPlantBtn')?.addEventListener('click', () => {
        closeScannerModal();
        openPlantModal(matchedPlant.id);
      });
    }
  }, 1200);
}
