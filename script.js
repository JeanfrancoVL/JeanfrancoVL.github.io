// ==============================================
// DETECTAR MÓVIL
// ==============================================
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {
    document.body.classList.add('mobile');
}

// ==============================================
// CURSOR PERSONALIZADO (solo desktop con hover)
// ==============================================
if (!isMobile && window.matchMedia('(hover: hover)').matches) {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        function animateCursor() {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;
            
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Expandir cursor en hover
        const hoverElements = document.querySelectorAll('a, button, .gallery-item, .project-media, .skill-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('expand');
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('expand');
            });
        });
    }
}

// ==============================================
// PARTÍCULAS ANIMADAS
// ==============================================
function createParticles() {
    const particles = document.getElementById('particles');
    if (!particles) return;
    
    const particleCount = isMobile ? 20 : 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 1;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${Math.random() > 0.5 ? '#00F5FF' : '#FF006E'};
            border-radius: 50%;
            left: ${left}%;
            top: ${top}%;
            opacity: ${Math.random() * 0.5 + 0.2};
            animation: float ${duration}s ease-in-out infinite;
            animation-delay: ${delay}s;
        `;
        particles.appendChild(particle);
    }
}

// Agregar keyframes para float
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translate(0, 0); }
        25% { transform: translate(10px, -10px); }
        50% { transform: translate(-10px, -20px); }
        75% { transform: translate(-5px, -10px); }
    }
`;
document.head.appendChild(style);

createParticles();

// ==============================================
// NAVBAR SCROLL
// ==============================================
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile menu
if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Cerrar menu al hacer click en un link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Cerrar menu al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// ==============================================
// SMOOTH SCROLL
// ==============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==============================================
// CONTADOR ANIMADO
// ==============================================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    if (isNaN(target)) return;
    
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target < 100 ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target < 100 ? '+' : '');
        }
    }, 16);
}

// Iniciar contadores cuando sean visibles
const statNumbers = document.querySelectorAll('.stat-number');
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            animateCounter(entry.target);
            entry.target.classList.add('counted');
        }
    });
}, observerOptions);

statNumbers.forEach(stat => {
    if (stat) statsObserver.observe(stat);
});

// ==============================================
// INTERSECTION OBSERVER - ANIMACIONES
// ==============================================
const observerConfig = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            
            // Animar barras de habilidades
            if (entry.target.classList.contains('skill-card')) {
                const bar = entry.target.querySelector('.skill-bar');
                if (bar && !bar.classList.contains('animated')) {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width + '%';
                        bar.classList.add('animated');
                    }, 300);
                }
            }
        }
    });
}, observerConfig);

// Observar elementos
document.querySelectorAll('.project-card, .skill-card, .gallery-item').forEach(el => {
    if (el) fadeInObserver.observe(el);
});

// ==============================================
// PARALLAX EN SCROLL (solo desktop)
// ==============================================
if (!isMobile) {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                
                // Parallax en hero
                const heroContent = document.querySelector('.hero-content');
                if (heroContent && scrolled < window.innerHeight) {
                    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                    heroContent.style.opacity = Math.max(0, 1 - (scrolled / 700));
                }
                
                // Parallax en tarjetas flotantes
                const floatingCards = document.querySelectorAll('.floating-card');
                floatingCards.forEach((card, index) => {
                    if (scrolled < window.innerHeight) {
                        const speed = (index + 1) * 0.05;
                        card.style.transform = `translateY(${scrolled * speed}px)`;
                    }
                });
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

// ==============================================
// GALERÍA CON ENLACES A GOOGLE DRIVE
// ==============================================
// Los items de la galería ahora son enlaces (<a>) a Google Drive
// El hover y la animación ya están manejados por CSS
// No necesitamos JavaScript adicional para la galería


// ==============================================
// VIDEOS AUTO-PLAY/PAUSE
// ==============================================
const videos = document.querySelectorAll('video[autoplay]');

if (videos.length > 0) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                video.play().catch(err => console.log('Video autoplay prevented:', err));
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.5 });

    videos.forEach(video => {
        if (video) videoObserver.observe(video);
    });
}

// ==============================================
// LOADING SCREEN
// ==============================================
window.addEventListener('load', () => {
    // Crear loader
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-darker);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        transition: opacity 0.5s ease;
    `;
    
    loader.innerHTML = `
        <div style="text-align: center;">
            <div style="
                width: 60px;
                height: 60px;
                border: 4px solid rgba(0, 245, 255, 0.2);
                border-top: 4px solid var(--primary);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 1.5rem;
                box-shadow: 0 0 40px rgba(0, 245, 255, 0.5);
            "></div>
            <p style="color: var(--primary); font-size: 1.1rem; font-weight: 600;">Cargando experiencia...</p>
        </div>
    `;
    
    // Agregar keyframes para spin
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinStyle);
    
    document.body.insertBefore(loader, document.body.firstChild);
    
    // Ocultar loader después de cargar
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            if (loader.parentNode) {
                loader.remove();
            }
        }, 500);
    }, 1000);
});

// ==============================================
// PREVENIR ERRORES DE CONSOLE
// ==============================================
window.addEventListener('error', (e) => {
    // Silenciar errores de recursos que no se encuentran en modo desarrollo
    if (e.message.includes('404') || e.message.includes('Failed to load resource')) {
        e.preventDefault();
        console.log('Recurso no encontrado (esperado en desarrollo):', e.filename);
    }
});

// ==============================================
// CONSOLE MESSAGE
// ==============================================
if (!isMobile) {
    console.log('%c🚀 Portafolio de Jeanfranco Velasquez', 'color: #00F5FF; font-size: 20px; font-weight: bold;');
    console.log('%c💼 Diseñador Gráfico & UX/UI', 'color: #FF006E; font-size: 14px;');
    console.log('%c✨ Diseñado y desarrollado con pasión', 'color: #8338EC; font-size: 12px;');
}

// ==============================================
// OPTIMIZACIONES FINALES
// ==============================================

// Lazy loading para imágenes
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Fallback para navegadores antiguos
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Mejorar rendimiento del scroll
let lastScrollTop = 0;
const scrollDelta = 5;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (Math.abs(lastScrollTop - scrollTop) <= scrollDelta) {
        return;
    }
    
    lastScrollTop = scrollTop;
}, { passive: true });

// Inicialización completa
console.log('✅ Portfolio inicializado correctamente');

// ==============================================
// YOUTUBE VIDEO PLAYER
// ==============================================
document.querySelectorAll('.video-container').forEach(container => {
    const placeholder = container.querySelector('.video-placeholder');
    const iframe = container.querySelector('.youtube-iframe');
    const playBtn = container.querySelector('.play-video-btn');
    
    if (playBtn && iframe && placeholder) {
        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Cargar video de YouTube
            iframe.src = iframe.dataset.src;
            
            // Ocultar placeholder con animación
            placeholder.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            placeholder.style.opacity = '0';
            placeholder.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                placeholder.classList.add('hidden');
                placeholder.classList.remove('active');
                
                // Mostrar iframe con animación
                iframe.style.display = 'block';
                iframe.style.opacity = '0';
                iframe.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    iframe.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    iframe.style.opacity = '1';
                    iframe.style.transform = 'scale(1)';
                }, 10);
            }, 500);
        });
        
        // También activar con click en todo el placeholder
        placeholder.addEventListener('click', () => {
            playBtn.click();
        });
    }
});
