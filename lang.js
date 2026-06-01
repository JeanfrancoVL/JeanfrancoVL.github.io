/* ================================================
   LANG.JS — Sistema Bilingüe ES / EN
   Incluir antes del JS de cada página
   ================================================ */

const TRANSLATIONS = {
  es: {
    /* NAV */
    'nav.home':    'Inicio',
    'nav.design':  'Diseño Gráfico',
    'nav.video':   'Video y Web',
    'nav.contact': 'Contacto',
    /* HERO */
    'hero.available': 'Disponible para freelance',
    'hero.loc_label': 'Ubicado en',
    'hero.scroll':    'Desplazar',
    /* ROLES */
    'role.design': 'Diseño Gráfico',
    'role.video':  'Edición de Video',
    'role.web':    'Desarrollo Web',
    /* STATS */
    'stat.years':    'Años de\nExperiencia',
    'stat.projects': 'Proyectos\nEntregados',
    'stat.approval': 'Tasa de\nAprobación',
    'stat.award':    'Premio\nNacional',
    /* PORTALS */
    'portals.label':     'Explorar Trabajo',
    'portal.design.h1':  'Diseño',
    'portal.design.h2':  'Gráfico',
    'portal.design.desc':'Identidades de marca, sistemas visuales, UI & UX, editorial, ilustración y dirección creativa.',
    'portal.video.h1':   'Video y',
    'portal.video.h2':   'Desarrollo Web',
    'portal.video.desc': 'Edición de video, gestión de redes sociales, comunidades, branding y proyectos web.',
    /* CHIPS */
    'chip.branding':   'Marca',
    'chip.illus':      'Ilustración',
    'chip.videoed':    'Edición de Video',
    'chip.social':     'Redes Sociales',
    'chip.community':  'Comunidad',
    /* ABOUT */
    'about.label': 'Sobre Mí',
    'about.t1':    'Un diseñador que construye,',
    'about.t2':    'un constructor que diseña.',
    'about.p1':    'Diseñador Gráfico y UX/UI con 3 años de experiencia y una atención obsesiva al detalle. Creo identidades que comunican, interfaces que convierten y contenido que conecta.',
    'about.p2':    'Diseñador premiado a nivel nacional, trabajando con marcas en Latinoamérica y más allá — llevando estrategia, oficio y energía a cada proyecto.',
    /* MARQUEE */
    'marquee.design':     'Diseño Gráfico',
    'marquee.brand':      'Identidad de Marca',
    'marquee.video':      'Edición de Video',
    'marquee.social':     'Redes Sociales',
    'marquee.community':  'Gestión de Comunidades',
    'marquee.web':        'Desarrollo Web',
    'marquee.branding':   'Branding',
    /* CONTACT */
    'contact.tag': 'Creemos juntos',
    'contact.h1':  '¿Tienes un proyecto',
    'contact.h2':  'en mente?',
    /* DESIGN PAGE */
    'page.design.sec':   '01 — Sección de Portafolio',
    'page.design.sub':   'Identidades de marca, sistemas visuales, UI & UX, editorial, ilustración y dirección creativa.',
    'page.back':         'Volver al Inicio',
    'filter.all':        'Todo',
    'filter.branding':   'Marca',
    'filter.ui':         'UI y UX',
    'filter.editorial':  'Editorial',
    'filter.illus':      'Ilustración',
    'gal.title':         'Galería Completa',
    'gal.sub':           'Navega el archivo completo de diseño gráfico.',
    'viewdrive':         'Ver en Google Drive',
    /* EDITOR PAGE */
    'page.video.sec':    '02 — Sección de Portafolio',
    'page.video.sub':    'Edición de video, gestión de redes sociales, comunidades, branding y desarrollo web — el stack completo de producción digital.',
    'tab.video':         'Edición de Video',
    'tab.social':        'Redes Sociales',
    'tab.community':     'Comunidad',
    'tab.branding':      'Branding',
    'tab.web':           'Desarrollo Web',
    'reels.title':       'Reels',
    'horiz.title':       'Videos Horizontales',
    'shorts.title':      'Cortometrajes',
    'tools.label':       'Herramientas',
    'platforms.label':   'Plataformas',
    'stack.label':       'Stack',
    'nextsec':           'Siguiente Sección',
    'prevsec':           'Sección Anterior',
    'worktogether':      '¿Listo para trabajar juntos?',
    'viewgithub':        'Ver en GitHub',
    'viewdrive':         'Ver en Drive',
    'viewsite':          'Ver Sitio Web',
  },
  en: {
    /* NAV */
    'nav.home':    'Home',
    'nav.design':  'Graphic Design',
    'nav.video':   'Video & Web',
    'nav.contact': 'Contact',
    /* HERO */
    'hero.available': 'Available for freelance',
    'hero.loc_label': 'Based in',
    'hero.scroll':    'Scroll',
    /* ROLES */
    'role.design': 'Graphic Design',
    'role.video':  'Video Editing',
    'role.web':    'Web Development',
    /* STATS */
    'stat.years':    'Years of\nExperience',
    'stat.projects': 'Projects\nDelivered',
    'stat.approval': 'Client\nApproval Rate',
    'stat.award':    'National\nAward',
    /* PORTALS */
    'portals.label':     'Explore Work',
    'portal.design.h1':  'Graphic',
    'portal.design.h2':  'Design',
    'portal.design.desc':'Brand identities, visual systems, UI & UX, editorial, illustration, and creative direction.',
    'portal.video.h1':   'Video &',
    'portal.video.h2':   'Web Development',
    'portal.video.desc': 'Video editing, social media management, community building, branding, and web projects.',
    /* CHIPS */
    'chip.branding':   'Branding',
    'chip.illus':      'Illustration',
    'chip.videoed':    'Video Editing',
    'chip.social':     'Social Media',
    'chip.community':  'Community',
    /* ABOUT */
    'about.label': 'About',
    'about.t1':    'A designer who builds,',
    'about.t2':    'a builder who designs.',
    'about.p1':    'Graphic Designer & UX/UI professional with 3 years of experience and an obsessive attention to detail. I create identities that communicate, interfaces that convert, and content that connects.',
    'about.p2':    'National award-winning designer working with brands across Latin America and beyond — bringing strategy, craft, and energy to every project.',
    /* MARQUEE */
    'marquee.design':     'Graphic Design',
    'marquee.brand':      'Brand Identity',
    'marquee.video':      'Video Editing',
    'marquee.social':     'Social Media',
    'marquee.community':  'Community Management',
    'marquee.web':        'Web Development',
    'marquee.branding':   'Branding',
    /* CONTACT */
    'contact.tag': "Let's create together",
    'contact.h1':  'Have a project',
    'contact.h2':  'in mind?',
    /* DESIGN PAGE */
    'page.design.sec':   '01 — Portfolio Section',
    'page.design.sub':   'Brand identities, visual systems, UI & UX design, editorial, illustration, and creative direction.',
    'page.back':         'Back to Home',
    'filter.all':        'All Work',
    'filter.branding':   'Branding',
    'filter.ui':         'UI & UX',
    'filter.editorial':  'Editorial',
    'filter.illus':      'Illustration',
    'gal.title':         'Full Gallery',
    'gal.sub':           'Browse the complete archive of graphic design work.',
    'viewdrive':         'View on Google Drive',
    /* EDITOR PAGE */
    'page.video.sec':    '02 — Portfolio Section',
    'page.video.sub':    'Video editing, social media management, community building, branding, and web development — the full digital production stack.',
    'tab.video':         'Video Editing',
    'tab.social':        'Social Media',
    'tab.community':     'Community',
    'tab.branding':      'Branding',
    'tab.web':           'Web Dev',
    'reels.title':       'Reels',
    'horiz.title':       'Horizontal Videos',
    'shorts.title':      'Short Films',
    'tools.label':       'Tools',
    'platforms.label':   'Platforms',
    'stack.label':       'Stack',
    'nextsec':           'Next Section',
    'prevsec':           'Previous Section',
    'worktogether':      'Ready to work together?',
    'viewgithub':        'View on GitHub',
    'viewdrive':         'View on Drive',
    'viewsite':          'Visit Website',
  }
};

/* ---- Public API ---- */
const Lang = (() => {
  const STORAGE_KEY = 'jv_lang';
  let current = localStorage.getItem(STORAGE_KEY) || 'es';

  function get(key) {
    return (TRANSLATIONS[current] && TRANSLATIONS[current][key]) || key;
  }

  function apply() {
    document.querySelectorAll('[data-key]').forEach(el => {
      const k = el.dataset.key;
      const txt = get(k);
      // preserve child elements — only update text nodes
      if (el.children.length === 0) {
        el.innerHTML = txt.replace(/\n/g, '<br>');
      }
    });
    // Update lang button
    const btn = document.getElementById('langToggle');
    if (btn) btn.textContent = current === 'es' ? 'EN' : 'ES';
    // Update html lang attr
    document.documentElement.lang = current;
    // Dispatch event for JS components that need it
    document.dispatchEvent(new CustomEvent('langchange', { detail: current }));
  }

  function toggle() {
    current = current === 'es' ? 'en' : 'es';
    localStorage.setItem(STORAGE_KEY, current);
    apply();
  }

  function init() {
    apply();
    const btn = document.getElementById('langToggle');
    if (btn) btn.addEventListener('click', toggle);
  }

  return { init, get, toggle, current: () => current };
})();
