/* ================================================
   INDEX.JS — Jeanfranco Velasquez Portfolio Lobby
   ================================================ */

'use strict';

// ——— UTILS ———
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

    // On page load: animate curtain out (it starts neutral, JS reveals from bottom)
    const panels = curtain.querySelectorAll('.curtain-panel');

    // If arriving from a link click, show curtain then sweep out
    const wasTransitioning = sessionStorage.getItem('jv_transitioning');
    if (wasTransitioning) {
        sessionStorage.removeItem('jv_transitioning');
        // Curtain appears covering screen
        panels.forEach(p => {
            p.style.transform = 'translateY(0)';
            p.style.transition = 'none';
        });
        curtain.classList.add('active');

        // Then sweep out downward
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

    // Intercept page-link clicks
    $$('.page-link').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
            e.preventDefault();

            sessionStorage.setItem('jv_transitioning', '1');
            curtain.classList.add('active');

            setTimeout(() => {
                window.location.href = href;
            }, 700);
        });
    });
})();

// ——— CANVAS GRADIENT MESH ———
(function initCanvas() {
    const canvas = $('#heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, animId;
    let time = 0;

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Orbs: x,y in [0,1], r = fraction of screen, color
    const orbs = [
        { x:.15, y:.25, r:.5, ax:.00012, ay:.00009, c:'rgba(100,78,165,0.18)' },
        { x:.80, y:.70, r:.55, ax:-.00009, ay:.00012, c:'rgba(196,162,101,0.10)' },
        { x:.50, y:.05, r:.4, ax:.00008, ay:-.00011, c:'rgba(60,40,100,0.16)' },
        { x:.05, y:.85, r:.35, ax:.00015, ay:-.00008, c:'rgba(196,162,101,0.07)' },
        { x:.90, y:.20, r:.3, ax:-.00010, ay:.00006, c:'rgba(80,55,140,0.14)' },
    ];

    function draw() {
        ctx.clearRect(0, 0, W, H);

        orbs.forEach(orb => {
            const cx = (orb.x + Math.sin(time * orb.ax * 1000) * .12) * W;
            const cy = (orb.y + Math.cos(time * orb.ay * 1000) * .1) * H;
            const r  = orb.r * Math.max(W, H);

            const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
            grd.addColorStop(0, orb.c);
            grd.addColorStop(1, 'transparent');

            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, W, H);
        });

        time++;
        animId = requestAnimationFrame(draw);
    }

    draw();

    // Pause when tab hidden for perf
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) cancelAnimationFrame(animId);
        else draw();
    });
})();

// ——— CUSTOM CURSOR ———
(function initCursor() {
    if (isMobile() || !window.matchMedia('(hover: hover)').matches) return;

    const cursor = $('#cursor');
    if (!cursor) return;

    let mx = -200, my = -200;
    let cx = -200, cy = -200;
    let raf;

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
    });

    function lerp(a, b, t) { return a + (b - a) * t; }

    function tick() {
        cx = lerp(cx, mx, .14);
        cy = lerp(cy, my, .14);
        cursor.style.transform = `translate(calc(${cx}px - 50%), calc(${cy}px - 50%))`;
        raf = requestAnimationFrame(tick);
    }
    tick();

    // Magnetic attraction to interactive elements
    const interactives = $$('a, button, .portal, .stat, .skill-tag');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
})();

// ——— NAVBAR ———
(function initNav() {
    const nav   = $('#nav');
    const burger = $('#navBurger');
    const drawer = $('#navDrawer');
    if (!nav) return;

    // Scroll state
    let lastY = 0;
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        if (y > 40) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        lastY = y;
    }, { passive: true });

    // Mobile menu
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

// ——— ANIMATED COUNTERS ———
(function initCounters() {
    const nums = $$('.stat-n');
    if (!nums.length) return;

    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

    function animateNum(el) {
        if (el.classList.contains('counted')) return;
        el.classList.add('counted');

        const target = parseInt(el.dataset.count, 10);
        if (isNaN(target)) return;

        const plus = target >= 10;
        const dur  = 1800;
        const start = performance.now();

        function frame(now) {
            const t   = Math.min((now - start) / dur, 1);
            const val = Math.floor(easeOut(t) * target);
            el.textContent = val + (plus ? '+' : '');
            if (t < 1) requestAnimationFrame(frame);
            else el.textContent = target + (plus ? '+' : '');
        }
        requestAnimationFrame(frame);
    }

    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) animateNum(e.target);
        });
    }, { threshold: .6 });

    nums.forEach(n => obs.observe(n));
})();

// ——— SCROLL REVEAL ———
(function initReveal() {
    const elements = $$('.fade-in-up');
    if (!elements.length) return;

    const obs = new IntersectionObserver(entries => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay
                    ? parseFloat(entry.target.dataset.delay) * 100
                    : 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: .15,
        rootMargin: '0px 0px -60px 0px'
    });

    elements.forEach((el, i) => {
        el.dataset.delay = el.dataset.delay || i;
        obs.observe(el);
    });
})();

// ——— PARALLAX HERO ———
(function initParallax() {
    if (isMobile()) return;
    const heroBody = $('.hero-body');
    if (!heroBody) return;

    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        const vh = window.innerHeight;
        if (y > vh) return;

        const progress = y / vh;
        heroBody.style.transform = `translateY(${y * .2}px)`;
        heroBody.style.opacity   = 1 - progress * 1.2;
    }, { passive: true });
})();

// ——— PORTAL HOVER ———
(function initPortals() {
    $$('.portal').forEach(portal => {
        portal.addEventListener('mousemove', e => {
            const rect = portal.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            portal.style.setProperty('--mx', (x * 100) + '%');
            portal.style.setProperty('--my', (y * 100) + '%');
        });
    });
})();

// ——— STAGGER PORTAL CHIPS ———
(function initChipAnimation() {
    $$('.portal').forEach(portal => {
        const chips = portal.querySelectorAll('.portal-chips span');
        chips.forEach((chip, i) => {
            chip.style.transitionDelay = (i * 40) + 'ms';
        });
    });
})();

// ——— SMOOTH INTERNAL ANCHORS ———
$$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const id = a.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ——— CONSOLE SIGNATURE ———
if (!isMobile()) {
    console.log(
        '%cJeanfranco Velasquez\n%cGraphic Design · UX/UI · Video · Web\n%cMedellín, Colombia',
        'color:#C4A265;font-size:18px;font-weight:300;letter-spacing:2px;',
        'color:#A09890;font-size:12px;',
        'color:#5E5650;font-size:10px;'
    );
}
