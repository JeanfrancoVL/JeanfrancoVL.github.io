/* ================================================
   EDITOR.JS — Video & Web Development Portfolio
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

// ——— CANVAS MESH (Hero) ———
(function initCanvas() {
    const canvas = $('#heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, animId, time = 0;

    function resize() {
        const parent = canvas.parentElement;
        W = canvas.width  = parent.offsetWidth;
        H = canvas.height = parent.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const orbs = [
        { x:.2,  y:.3,  r:.5, ax:.00010, ay:.00008, c:'rgba(60,30,120,0.20)' },
        { x:.75, y:.6,  r:.55, ax:-.00008,ay:.00011, c:'rgba(196,162,101,0.10)' },
        { x:.5,  y:.0,  r:.4, ax:.00007, ay:-.00009, c:'rgba(30,20,80,0.18)' },
        { x:.9,  y:.15, r:.3, ax:-.00012,ay:.00005, c:'rgba(196,162,101,0.07)' },
    ];

    function draw() {
        ctx.clearRect(0, 0, W, H);
        orbs.forEach(orb => {
            const cx = (orb.x + Math.sin(time * orb.ax * 1000) * .1) * W;
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

    let mx = -200, my = -200, cx = -200, cy = -200;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    function lerp(a, b, t) { return a + (b - a) * t; }
    (function tick() {
        cx = lerp(cx, mx, .14);
        cy = lerp(cy, my, .14);
        cursor.style.transform = `translate(calc(${cx}px - 50%), calc(${cy}px - 50%))`;
        requestAnimationFrame(tick);
    })();

    $$('a, button, .cap-card, .video-item, .sg-item, .bp-step').forEach(el => {
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

// ——— TAB SYSTEM ———
(function initTabs() {
    const btns = $$('.tab-btn');
    const sections = $$('.service-section[data-tab-section]');
    if (!btns.length) return;

    // Update active tab based on scroll position
    const tabBar = $('#tabBar');
    const navH   = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '72');
    const tabH   = tabBar ? tabBar.offsetHeight : 44;
    const offset  = navH + tabH + 40;

    function getActiveSection() {
        let active = null;
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= offset) active = section;
        });
        return active;
    }

    function updateActivTab() {
        const active = getActiveSection();
        if (!active) return;
        const tabId = active.dataset.tabSection;
        btns.forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
    }

    window.addEventListener('scroll', updateActivTab, { passive: true });

    // Click tabs to scroll
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            const target = document.getElementById(tabId);
            if (!target) return;

            const rect   = target.getBoundingClientRect();
            const scrollY = window.scrollY + rect.top - offset + 10;
            window.scrollTo({ top: scrollY, behavior: 'smooth' });

            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
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
    }, { threshold: .1, rootMargin: '0px 0px -50px 0px' });

    els.forEach((el, i) => {
        if (!el.dataset.delay) el.dataset.delay = i % 5;
        obs.observe(el);
    });
})();

// ——— SERVICE TITLE CLIP REVEAL (scroll-triggered) ———
(function initClipReveals() {
    const titles = $$('.clip-reveal-js');
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

// ——— DISCORD MOCK TYPING ANIMATION ———
(function initDiscordTyping() {
    const input = $('.dm-input-bar');
    if (!input) return;

    const messages = [
        'Message #general',
        'Welcome to the community!',
        'Check our #events channel',
        'Drop a message below...',
    ];
    let msgIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let pausing = false;

    function type() {
        if (pausing) return;
        const current = messages[msgIdx];

        if (!deleting) {
            charIdx++;
            input.textContent = current.slice(0, charIdx);
            if (charIdx === current.length) {
                pausing = true;
                setTimeout(() => { pausing = false; deleting = true; }, 2000);
            }
        } else {
            charIdx--;
            input.textContent = current.slice(0, charIdx);
            if (charIdx === 0) {
                deleting = false;
                msgIdx = (msgIdx + 1) % messages.length;
                pausing = true;
                setTimeout(() => { pausing = false; }, 400);
            }
        }
        setTimeout(type, deleting ? 40 : 70);
    }

    // Only start when visible
    const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            type();
            obs.disconnect();
        }
    }, { threshold: .5 });
    const section = $('#community');
    if (section) obs.observe(section);
})();

// ——— CAPABILITY CARDS STAGGER ———
(function initCapCards() {
    const cards = $$('.cap-card');
    cards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity .6s ${i * 80}ms var(--ease-out), transform .6s ${i * 80}ms var(--ease-out)`;
    });

    const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            cards.forEach(card => {
                card.style.opacity = '1';
                card.style.transform = 'none';
            });
            obs.disconnect();
        }
    }, { threshold: .2 });

    const grid = $('.capabilities-grid');
    if (grid) obs.observe(grid);
})();

// ——— BRAND PROCESS STAGGER ———
(function initBrandProcess() {
    const steps = $$('.bp-step');
    steps.forEach((step, i) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(16px)';
        step.style.transition = `opacity .5s ${i * 120}ms var(--ease-out), transform .5s ${i * 120}ms var(--ease-out)`;
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

// ——— CODE PREVIEW HIGHLIGHT PULSE ———
(function initCodePulse() {
    const preview = $('.code-preview');
    if (!preview) return;

    const lines = preview.querySelectorAll('.code-line');
    let current = 0;

    function pulse() {
        lines.forEach((l, i) => {
            l.style.background = i === current ? 'rgba(196,162,101,.06)' : '';
            l.style.transition = 'background .3s';
        });
        current = (current + 1) % lines.length;
    }

    const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            setInterval(pulse, 900);
            obs.disconnect();
        }
    }, { threshold: .5 });
    obs.observe(preview);
})();

// ——— SMOOTH SCROLL for anchor links ———
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
        '%cVideo & Web Portfolio\n%cJeanfranco Velasquez',
        'color:#C4A265;font-size:14px;font-weight:300;',
        'color:#5E5650;font-size:11px;'
    );
}
