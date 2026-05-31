/* ================================================
   DESIGN.JS — Graphic Design Portfolio
   ================================================ */

'use strict';

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const isMobile = () => /Android|iPhone|iPad|iPod|webOS|BlackBerry/i.test(navigator.userAgent);

// ——— LOADER ———
(function initLoader() {
    const loader = $('#loader');
    if (!loader) return;
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.classList.remove('loading');
        }, 1400);
    });
})();

// ——— PAGE TRANSITIONS ———
(function initTransitions() {
    const curtain = $('#curtain');
    if (!curtain) return;
    const panels = curtain.querySelectorAll('.curtain-panel');

    const wasTransitioning = sessionStorage.getItem('jv_transitioning');
    if (wasTransitioning) {
        sessionStorage.removeItem('jv_transitioning');
        panels.forEach(p => {
            p.style.transform = 'translateY(0)';
            p.style.transition = 'none';
        });
        curtain.classList.add('active');
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                panels.forEach((p, i) => {
                    p.style.transition = '';
                    p.style.transitionDelay = (i * 60) + 'ms';
                    p.style.transitionDuration = '.55s';
                    p.style.transitionTimingFunction = 'cubic-bezier(.76,0,.24,1)';
                    p.style.transform = 'translateY(100%)';
                });
                setTimeout(() => {
                    curtain.classList.remove('active');
                    panels.forEach(p => {
                        p.style.transform = '';
                        p.style.transition = '';
                        p.style.transitionDelay = '';
                    });
                }, 900);
            });
        });
    }

    $$('.page-link').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
            e.preventDefault();
            sessionStorage.setItem('jv_transitioning', '1');
            curtain.classList.add('active');
            setTimeout(() => { window.location.href = href; }, 700);
        });
    });
})();

// ——— CUSTOM CURSOR ———
(function initCursor() {
    if (isMobile() || !window.matchMedia('(hover: hover)').matches) return;
    const cursor = $('#cursor');
    if (!cursor) return;

    let mx = -200, my = -200, cx = -200, cy = -200;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    function lerp(a, b, t) { return a + (b - a) * t; }
    function tick() {
        cx = lerp(cx, mx, .14);
        cy = lerp(cy, my, .14);
        cursor.style.transform = `translate(calc(${cx}px - 50%), calc(${cy}px - 50%))`;
        requestAnimationFrame(tick);
    }
    tick();

    $$('a, button, .portal, .gal-item, .visual-frame').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
    document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; });
})();

// ——— NAVBAR ———
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
        drawer.querySelectorAll('.drawer-link').forEach(link => {
            link.addEventListener('click', () => {
                drawer.classList.remove('open');
                burger.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }
})();

// ——— FILTER SYSTEM ———
(function initFilters() {
    const btns = $$('.filter-btn');
    const rows = $$('.project-row[data-category]');
    if (!btns.length || !rows.length) return;

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            rows.forEach(row => {
                if (filter === 'all' || row.dataset.category === filter) {
                    row.classList.remove('filtered-out');
                } else {
                    row.classList.add('filtered-out');
                }
            });

            // Also filter gallery items
            $$('.gal-item[data-cat]').forEach(item => {
                if (filter === 'all' || item.dataset.cat === filter) {
                    item.style.opacity = '';
                    item.style.pointerEvents = '';
                } else {
                    item.style.opacity = '.15';
                    item.style.pointerEvents = 'none';
                }
            });
        });
    });
})();

// ——— SCROLL REVEAL ———
(function initReveal() {
    const els = $$('.fade-in-up');
    if (!els.length) return;

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseFloat(entry.target.dataset.delay || 0) * 80;
                setTimeout(() => entry.target.classList.add('visible'), delay);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: .12, rootMargin: '0px 0px -60px 0px' });

    els.forEach((el, i) => {
        if (!el.dataset.delay) el.dataset.delay = i % 4;
        obs.observe(el);
    });
})();

// ——— CLIP REVEAL ———
// CSS handles .clip-reveal animation on page hero; for project titles we re-trigger on scroll
(function initClipReveal() {
    const els = $$('.project-title.clip-reveal, .project-title .clip-reveal');
    if (!els.length) return;

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.clipPath = 'inset(0 0% 0 0)';
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: .2 });

    // Project titles don't use the CSS animation; we need JS trigger
    $$('.project-row .project-title').forEach(title => {
        // Reset and watch
        title.style.clipPath = 'inset(0 100% 0 0)';
        title.style.transition = 'clip-path .9s cubic-bezier(.16,1,.3,1)';
        obs.observe(title);
    });
    $$('.gallery-title').forEach(title => {
        title.style.clipPath = 'inset(0 100% 0 0)';
        title.style.transition = 'clip-path .9s cubic-bezier(.16,1,.3,1)';
        obs.observe(title);
    });
})();

// ——— STICKY FILTER BAR ———
(function initStickyFilter() {
    const bar = $('#filterBar');
    if (!bar) return;
    const hero = $('.page-hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const heroBottom = hero.getBoundingClientRect().bottom;
        bar.style.position = heroBottom <= 72 ? 'sticky' : '';
        bar.style.top      = heroBottom <= 72 ? '72px'  : '';
        bar.style.zIndex   = heroBottom <= 72 ? '800'   : '';
    }, { passive: true });
})();

// ——— VISUAL FRAME PARALLAX ———
(function initFrameParallax() {
    if (isMobile()) return;
    const frames = $$('.visual-frame');
    if (!frames.length) return;

    window.addEventListener('scroll', () => {
        frames.forEach(frame => {
            const rect = frame.getBoundingClientRect();
            const vh = window.innerHeight;
            if (rect.bottom < 0 || rect.top > vh) return;
            const progress = (vh - rect.top) / (vh + rect.height);
            const shift = (progress - .5) * 30;
            frame.querySelector('.vf-inner').style.transform = `translateY(${shift}px)`;
        });
    }, { passive: true });
})();

// ——— ILLUSTRATION ANIMATION ———
(function initIllustration() {
    const frame = $('.illustration-visual');
    if (!frame) return;

    const shapes = frame.querySelectorAll('.illus-shape');
    let raf;

    frame.addEventListener('mouseenter', () => {
        let t = 0;
        function animate() {
            t += .025;
            shapes.forEach((s, i) => {
                const angle = t + (i * Math.PI / 2);
                const x = Math.sin(angle) * 6;
                const y = Math.cos(angle) * 4;
                s.style.transform = `translate(${x}px, ${y}px) rotate(${Math.sin(t + i) * 8}deg)`;
            });
            raf = requestAnimationFrame(animate);
        }
        animate();
    });

    frame.addEventListener('mouseleave', () => {
        cancelAnimationFrame(raf);
        shapes.forEach(s => { s.style.transform = ''; });
    });
})();

// ——— CONSOLE SIGNATURE ———
if (!isMobile()) {
    console.log(
        '%cGraphic Design Portfolio\n%cJeanfranco Velasquez',
        'color:#C4A265;font-size:14px;font-weight:300;',
        'color:#5E5650;font-size:11px;'
    );
}
