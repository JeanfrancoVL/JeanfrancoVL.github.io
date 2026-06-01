/* ================================================
   INDEX.JS — Lobby
   ================================================ */
'use strict';

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const mob = () => window.innerWidth < 768 || !window.matchMedia('(hover:hover)').matches;

/* ——— LOADER — fix: use DOMContentLoaded + short delay, not window.load ——— */
(function initLoader() {
  const loader = $('#loader');
  if (!loader) return;
  // Runs as soon as DOM is ready — no waiting for images
  function hide() {
    loader.classList.add('out');
    document.body.style.overflow = '';
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(hide, 900));
  } else {
    setTimeout(hide, 900);
  }
})();

/* ——— CURTAIN TRANSITIONS ——— */
(function initCurtain() {
  const curtain = $('#curtain');
  if (!curtain) return;
  const panels = curtain.querySelectorAll('.curtain-panel');

  function sweepOut() {
    panels.forEach((p, i) => {
      p.style.cssText = 'transform:translateY(0);transition:none';
    });
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

  if (sessionStorage.getItem('jv_nav')) {
    sessionStorage.removeItem('jv_nav');
    sweepOut();
  }

  $$('.page-link').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      e.preventDefault();
      panels.forEach((p, i) => {
        p.style.transitionDelay = (i * 65) + 'ms';
      });
      curtain.classList.add('active');
      sessionStorage.setItem('jv_nav', '1');
      setTimeout(() => { window.location.href = href; }, 720);
    });
  });
})();

/* ——— CANVAS — visible gradient orbs that actually show ——— */
(function initCanvas() {
  const canvas = $('#heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, t = 0, raf;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Orbs with strong, visible colors
  const orbs = [
    { bx:.15, by:.30, rx:.10, ry:.08, r:.52, c:[80,40,180],  a:.28 },
    { bx:.80, by:.65, rx:.08, ry:.10, r:.50, c:[196,162,101], a:.18 },
    { bx:.50, by:.05, rx:.07, ry:.06, r:.40, c:[55,20,120],  a:.24 },
    { bx:.04, by:.82, rx:.09, ry:.07, r:.36, c:[196,162,101], a:.12 },
    { bx:.90, by:.22, rx:.06, ry:.09, r:.32, c:[65,30,150],  a:.20 },
  ];

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const spd = t * .0008;
    orbs.forEach((o, i) => {
      const cx = (o.bx + Math.sin(spd + i * 1.3) * o.rx) * W;
      const cy = (o.by + Math.cos(spd + i * 0.9) * o.ry) * H;
      const r  = o.r * Math.max(W, H);
      const g  = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      const [R, G, B] = o.c;
      g.addColorStop(0,   `rgba(${R},${G},${B},${o.a})`);
      g.addColorStop(.5,  `rgba(${R},${G},${B},${o.a * .4})`);
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
  const cursor = $('#cursor');
  if (!cursor) return;
  let mx = -300, my = -300, cx = -300, cy = -300;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  const lerp = (a, b, t) => a + (b - a) * t;
  (function tick() {
    cx = lerp(cx, mx, .13);
    cy = lerp(cy, my, .13);
    cursor.style.transform = `translate(calc(${cx}px - 50%), calc(${cy}px - 50%))`;
    requestAnimationFrame(tick);
  })();
  const int = $$('a,button,.portal,.skill');
  int.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hov'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hov'));
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

/* ——— COUNTERS ——— */
(function initCounters() {
  const els = $$('.stat-n');
  if (!els.length) return;
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  function run(el) {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const target = parseInt(el.dataset.count, 10);
    const plus   = target >= 10;
    const dur    = 1800;
    const start  = performance.now();
    (function frame(now) {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.floor(easeOut(p) * target) + (plus ? '+' : '');
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = target + (plus ? '+' : '');
    })(start);
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) run(e.target); });
  }, { threshold: .6 });
  els.forEach(el => obs.observe(el));
})();

/* ——— SCROLL REVEAL ——— */
(function initReveal() {
  const els = $$('.scroll-reveal, .reveal-line');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        const i = parseInt(entry.target.dataset.ri || 0);
        setTimeout(() => entry.target.classList.add('vis'), i * 90);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: .12, rootMargin: '0px 0px -50px 0px' });
  els.forEach((el, i) => {
    el.dataset.ri = i % 6;
    obs.observe(el);
  });
})();

/* ——— PARALLAX HERO ——— */
(function initParallax() {
  if (mob()) return;
  const body = $('.hero-body');
  if (!body) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > window.innerHeight) return;
    body.style.transform = `translateY(${y * .18}px)`;
    body.style.opacity   = 1 - (y / window.innerHeight) * 1.3;
  }, { passive: true });
})();

/* ——— LANGUAGE ——— */
document.addEventListener('DOMContentLoaded', () => Lang.init());
