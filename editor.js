/* ================================================
   EDITOR.JS — Video & Web Development Portfolio
   ================================================ */
'use strict';

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const mob = () => window.innerWidth < 768 || !window.matchMedia('(hover:hover)').matches;

/* ——— LOADER ——— */
(function initLoader() {
  const l = $('#loader');
  if (!l) return;
  function hide() { l.classList.add('out'); document.body.style.overflow = ''; }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(hide, 900));
  } else {
    setTimeout(hide, 900);
  }
})();

/* ——— CURTAIN ——— */
(function initCurtain() {
  const curtain = $('#curtain');
  if (!curtain) return;
  const panels = curtain.querySelectorAll('.curtain-panel');

  if (sessionStorage.getItem('jv_nav')) {
    sessionStorage.removeItem('jv_nav');
    panels.forEach(p => { p.style.cssText = 'transform:translateY(0);transition:none'; });
    curtain.classList.add('active');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      panels.forEach((p, i) => {
        p.style.cssText = '';
        p.style.transitionDelay = (i * 65) + 'ms';
        p.style.transform = 'translateY(100%)';
      });
      setTimeout(() => curtain.classList.remove('active'), 900);
    }));
  }

  $$('.page-link').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      e.preventDefault();
      curtain.classList.add('active');
      sessionStorage.setItem('jv_nav', '1');
      setTimeout(() => { window.location.href = href; }, 720);
    });
  });
})();

/* ——— CANVAS HERO ——— */
(function initCanvas() {
  const canvas = $('#heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, t = 0, raf;

  function resize() {
    const p = canvas.parentElement;
    W = canvas.width  = p.offsetWidth  || window.innerWidth;
    H = canvas.height = p.offsetHeight || window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const orbs = [
    { bx:.18, by:.32, rx:.10, ry:.08, r:.50, c:[72,35,165],   a:.26 },
    { bx:.78, by:.62, rx:.08, ry:.10, r:.48, c:[196,162,101],  a:.16 },
    { bx:.52, by:.06, rx:.07, ry:.06, r:.38, c:[48,18,110],    a:.22 },
    { bx:.06, by:.80, rx:.09, ry:.07, r:.34, c:[196,162,101],  a:.10 },
  ];

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const s = t * .0008;
    orbs.forEach((o, i) => {
      const cx = (o.bx + Math.sin(s + i * 1.3) * o.rx) * W;
      const cy = (o.by + Math.cos(s + i * 0.9) * o.ry) * H;
      const r  = o.r * Math.max(W, H);
      const g  = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      const [R, G, B] = o.c;
      g.addColorStop(0,   `rgba(${R},${G},${B},${o.a})`);
      g.addColorStop(.55, `rgba(${R},${G},${B},${o.a * .35})`);
      g.addColorStop(1,   `rgba(${R},${G},${B},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    });
    t++;
    raf = requestAnimationFrame(draw);
  }
  draw();
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf); else draw();
  });
})();

/* ——— CURSOR ——— */
(function initCursor() {
  if (mob()) return;
  const c = $('#cursor');
  if (!c) return;
  let mx = -300, my = -300, cx = -300, cy = -300;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  const lerp = (a, b, t) => a + (b - a) * t;
  (function tick() {
    cx = lerp(cx, mx, .13);
    cy = lerp(cy, my, .13);
    c.style.transform = `translate(calc(${cx}px - 50%), calc(${cy}px - 50%))`;
    requestAnimationFrame(tick);
  })();
  $$('a,button,.yt-card,.cap,.sg-item,.bp-step,.web-card').forEach(el => {
    el.addEventListener('mouseenter', () => c.classList.add('hov'));
    el.addEventListener('mouseleave', () => c.classList.remove('hov'));
  });
})();

/* ——— NAV ——— */
(function initNav() {
  const nav    = $('#nav');
  const burger = $('#navBurger');
  const drawer = $('#navDrawer');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  if (burger && drawer) {
    burger.addEventListener('click', () => {
      const open = drawer.classList.toggle('open');
      burger.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    drawer.querySelectorAll('.drawer-link').forEach(l => {
      l.addEventListener('click', () => {
        drawer.classList.remove('open');
        burger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
})();

/* ——— SCROLL REVEAL ——— */
(function initReveal() {
  const els = $$('.scroll-reveal, .reveal-line');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const d = parseInt(entry.target.dataset.ri || 0);
        setTimeout(() => entry.target.classList.add('vis'), d * 80);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: .1, rootMargin: '0px 0px -40px 0px' });
  els.forEach((el, i) => {
    el.dataset.ri = i % 6;
    obs.observe(el);
  });
})();

/* ——— SERVICE TITLE REVEAL (scroll-triggered clip-path) ——— */
(function initTitleReveal() {
  const titles = $$('.reveal-line-js');
  if (!titles.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.clipPath = 'inset(0 0% 0 0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: .2 });
  titles.forEach(t => {
    t.style.clipPath = 'inset(0 100% 0 0)';
    t.style.transition = 'clip-path .9s cubic-bezier(.16,1,.3,1)';
    obs.observe(t);
  });
})();

/* ——— TAB BAR (scroll spy + click) ——— */
(function initTabs() {
  const btns     = $$('.tab');
  const sections = $$('.svc-sec[data-tab-section]');
  const tabBar   = $('#tabBar');
  if (!btns.length || !sections.length) return;

  const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '72');
  const tabH = tabBar ? tabBar.offsetHeight : 48;
  const offset = navH + tabH + 32;

  function getActive() {
    let active = null;
    sections.forEach(s => {
      if (s.getBoundingClientRect().top <= offset) active = s;
    });
    return active;
  }

  window.addEventListener('scroll', () => {
    const a = getActive();
    if (!a) return;
    const id = a.dataset.tabSection;
    btns.forEach(b => b.classList.toggle('active', b.dataset.tab === id));
  }, { passive: true });

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.tab);
      if (!target) return;
      const top = window.scrollY + target.getBoundingClientRect().top - offset + 8;
      window.scrollTo({ top, behavior: 'smooth' });
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Sync tab labels after language change
  document.addEventListener('langchange', () => {
    btns.forEach(b => {
      if (b.dataset.key) b.textContent = Lang.get(b.dataset.key);
    });
  });
})();

/* ================================================
   YOUTUBE PLAYER SYSTEM
   - Click thumbnail → open modal with iframe embed
   - Auto-detects reel (vertical) vs horizontal
   - ESC key + backdrop click to close
   - Stops video on close
   ================================================ */
(function initYouTube() {
  const modal     = $('#ytModal');
  const backdrop  = $('#ytBackdrop');
  const closeBtn  = $('#ytClose');
  const embedWrap = $('#ytEmbedWrap');
  if (!modal || !embedWrap) return;

  let currentCard = null;

  /* Open player */
  function openVideo(card) {
    const ytid    = card.dataset.ytid;
    const title   = card.dataset.title || 'Video';
    const isReel  = card.classList.contains('reel');

    if (!ytid || ytid.includes('ID')) {
      alert('Este video aún no tiene un ID de YouTube configurado.\nEdita el data-ytid en editor.html.');
      return;
    }

    // Build embed URL with autoplay + privacy-enhanced mode
    const src = `https://www.youtube-nocookie.com/embed/${ytid}?autoplay=1&rel=0&modestbranding=1&color=white`;

    embedWrap.innerHTML = `<iframe
      src="${src}"
      title="${title}"
      allow="autoplay; fullscreen; picture-in-picture"
      allowfullscreen
      loading="eager"
    ></iframe>`;

    // Vertical layout for reels
    embedWrap.classList.toggle('vertical', isReel);

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    currentCard = card;

    // Focus close button for accessibility
    setTimeout(() => closeBtn && closeBtn.focus(), 350);
  }

  /* Close player */
  function closeVideo() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    // Small delay so fade-out completes before killing iframe
    setTimeout(() => {
      embedWrap.innerHTML = '';
      embedWrap.classList.remove('vertical');
    }, 380);
    currentCard = null;
  }

  /* Attach click handlers to all YT cards */
  function attachCards() {
    $$('.yt-card').forEach(card => {
      // Avoid duplicate listeners
      if (card.dataset.ytBound) return;
      card.dataset.ytBound = '1';

      card.addEventListener('click', () => openVideo(card));

      // Keyboard accessibility
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openVideo(card);
        }
      });
    });
  }
  attachCards();

  /* Close triggers */
  closeBtn  && closeBtn.addEventListener('click', closeVideo);
  backdrop  && backdrop.addEventListener('click', closeVideo);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeVideo();
  });
})();

/* ——— STAGGER CAPABILITY CARDS ——— */
(function initCapStagger() {
  const cards = $$('.cap');
  if (!cards.length) return;
  cards.forEach((c, i) => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(18px)';
    c.style.transition = `opacity .55s ${i * 75}ms var(--ease-out), transform .55s ${i * 75}ms var(--ease-out)`;
  });
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      cards.forEach(c => { c.style.opacity = '1'; c.style.transform = 'none'; });
      obs.disconnect();
    }
  }, { threshold: .15 });
  const grid = $('.caps-grid');
  if (grid) obs.observe(grid);
})();

/* ——— STAGGER BRAND PROCESS ——— */
(function initBrandStagger() {
  const steps = $$('.bp-step');
  if (!steps.length) return;
  steps.forEach((s, i) => {
    s.style.opacity = '0';
    s.style.transform = 'translateY(14px)';
    s.style.transition = `opacity .5s ${i * 110}ms var(--ease-out), transform .5s ${i * 110}ms var(--ease-out)`;
  });
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      steps.forEach(s => { s.style.opacity = '1'; s.style.transform = 'none'; });
      obs.disconnect();
    }
  }, { threshold: .15 });
  const wrap = $('.brand-process');
  if (wrap) obs.observe(wrap);
})();

/* ——— STAGGER YT CARDS on scroll ——— */
(function initCardReveal() {
  const cards = $$('.yt-card');
  if (!cards.length) return;
  cards.forEach((c, i) => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(18px)';
    c.style.transition = `opacity .5s ${(i % 5) * 60}ms var(--ease-out), transform .5s ${(i % 5) * 60}ms var(--ease-out)`;
  });
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'none';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: .08 });
  cards.forEach(c => obs.observe(c));
})();

/* ——— LANGUAGE ——— */
document.addEventListener('DOMContentLoaded', () => Lang.init());

/* ====================================================
   SAFETY FALLBACK: force-show all reveal elements
   after 3 seconds in case IO fires late or fails
   ==================================================== */
setTimeout(() => {
  document.querySelectorAll('.scroll-reveal,.reveal-line').forEach(el => {
    el.classList.add('vis');
  });
  document.querySelectorAll('.reveal-line-js').forEach(el => {
    el.style.clipPath = 'inset(0 0% 0 0)';
  });
}, 3000);
