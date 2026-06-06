/* ================================================
   DESIGN.JS — Graphic Design Portfolio
   ================================================ */
'use strict';
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const mob = () => window.innerWidth < 768 || !window.matchMedia('(hover:hover)').matches;

(function initLoader() {
  const l = $('#loader');
  if (!l) return;
  function hide() { l.classList.add('out'); document.body.style.overflow = ''; }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(hide, 900));
  else setTimeout(hide, 900);
})();

(function initCurtain() {
  const curtain = $('#curtain'); if (!curtain) return;
  const panels = curtain.querySelectorAll('.curtain-panel');
  if (sessionStorage.getItem('jv_nav')) {
    sessionStorage.removeItem('jv_nav');
    panels.forEach(p => { p.style.cssText = 'transform:translateY(0);transition:none'; });
    curtain.classList.add('active');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      panels.forEach((p, i) => { p.style.cssText = ''; p.style.transitionDelay = (i * 65) + 'ms'; p.style.transform = 'translateY(100%)'; });
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

(function initCursor() {
  if (mob()) return;
  const c = $('#cursor'); if (!c) return;
  let mx=-300,my=-300,cx=-300,cy=-300;
  document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
  const lerp=(a,b,t)=>a+(b-a)*t;
  (function tick(){ cx=lerp(cx,mx,.13); cy=lerp(cy,my,.13); c.style.transform=`translate(calc(${cx}px - 50%), calc(${cy}px - 50%))`; requestAnimationFrame(tick); })();
  $$('a,button,.gal-item,.img-skeleton').forEach(el => {
    el.addEventListener('mouseenter', ()=>c.classList.add('hov'));
    el.addEventListener('mouseleave', ()=>c.classList.remove('hov'));
  });
})();

(function initNav() {
  const nav=$('#nav'),burger=$('#navBurger'),drawer=$('#navDrawer');
  if (!nav) return;
  window.addEventListener('scroll', ()=>nav.classList.toggle('scrolled', window.scrollY>40), {passive:true});
  if (burger&&drawer) {
    burger.addEventListener('click', ()=>{
      const o=drawer.classList.toggle('open');
      burger.classList.toggle('open',o);
      document.body.style.overflow=o?'hidden':'';
    });
    drawer.querySelectorAll('.drawer-link').forEach(l=>l.addEventListener('click',()=>{
      drawer.classList.remove('open'); burger.classList.remove('open'); document.body.style.overflow='';
    }));
  }
})();

(function initReveal() {
  const els = $$('.scroll-reveal,.reveal-line'); if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const d = parseInt(e.target.dataset.ri||0);
        setTimeout(()=>e.target.classList.add('vis'), d*80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold:.12, rootMargin:'0px 0px -40px 0px' });
  els.forEach((el,i)=>{ el.dataset.ri=i%5; obs.observe(el); });
})();

(function initFilter() {
  const btns = $$('.fb'), rows = $$('.proj[data-cat]');
  if (!btns.length) return;
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      rows.forEach(row => {
        row.classList.toggle('filtered-out', f!=='all' && row.dataset.cat!==f);
      });
      $$('.gal-item[data-cat]').forEach(item => {
        item.style.opacity = (f==='all'||item.dataset.cat===f)?'':'0.12';
        item.style.pointerEvents = (f==='all'||item.dataset.cat===f)?'':'none';
      });
    });
  });
  // Re-apply filter text after lang change
  document.addEventListener('langchange', () => {
    btns.forEach(b => { if(b.dataset.key) b.textContent = Lang.get(b.dataset.key); });
  });
})();

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
