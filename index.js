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

/* Fallback: force-show all scroll-reveal after 3s */
setTimeout(() => { $$('.scroll-reveal,.reveal-line').forEach(el => el.classList.add('vis')); }, 3000);

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

/* ── IMMEDIATE FORCE SHOW: all scroll-reveal elements in viewport get .vis ── */
(function immediateShow() {
  function show() {
    document.querySelectorAll('.scroll-reveal, .reveal-line').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight + 100) el.classList.add('vis');
    });
  }
  // Run immediately, at DOMContentLoaded, and after 500ms as fallback
  show();
  document.addEventListener('DOMContentLoaded', show);
  window.addEventListener('load', show);
  setTimeout(show, 500);
  setTimeout(() => {
    document.querySelectorAll('.scroll-reveal, .reveal-line').forEach(el =>
      el.classList.add('vis')
    );
  }, 2000);
})();
