/* ==============================================
   VARIABLES & RESET
============================================== */
:root {
    /* Paleta principal - Azul eléctrico + Cyan + Magenta */
    --primary: #00F5FF;
    --secondary: #FF006E;
    --accent: #8338EC;
    --blue: #3A86FF;
    
    /* Gradientes dinámicos */
    --gradient-1: linear-gradient(135deg, #00F5FF 0%, #3A86FF 50%, #8338EC 100%);
    --gradient-2: linear-gradient(135deg, #FF006E 0%, #8338EC 100%);
    --gradient-3: linear-gradient(135deg, #00F5FF 0%, #FF006E 100%);
    
    /* Backgrounds */
    --bg-dark: #0A0E27;
    --bg-darker: #050816;
    --bg-card: rgba(255, 255, 255, 0.03);
    
    /* Text */
    --text-primary: #FFFFFF;
    --text-secondary: #B4B4C6;
    --text-muted: #6E7191;
    
    /* Effects */
    --glow: 0 0 40px rgba(0, 245, 255, 0.5);
    --glow-pink: 0 0 40px rgba(255, 0, 110, 0.5);
    --shadow-lg: 0 20px 60px rgba(0, 0, 0, 0.5);
    
    /* Transitions */
    --transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-bounce: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
    overflow-x: hidden;
}

body {
    font-family: 'Sora', sans-serif;
    background: var(--bg-darker);
    color: var(--text-primary);
    line-height: 1.6;
    overflow-x: hidden;
}

body.mobile {
    cursor: auto;
}

body.mobile * {
    cursor: auto !important;
}

::selection {
    background: var(--primary);
    color: var(--bg-darker);
}

/* ==============================================
   CURSOR PERSONALIZADO
============================================== */
.cursor-dot,
.cursor-outline {
    pointer-events: none;
    position: fixed;
    border-radius: 50%;
    z-index: 10000;
    mix-blend-mode: difference;
    display: none;
}

@media (min-width: 969px) and (hover: hover) {
    .cursor-dot,
    .cursor-outline {
        display: block;
    }
    
    body {
        cursor: none;
    }
}

.cursor-dot {
    width: 8px;
    height: 8px;
    background: var(--primary);
    box-shadow: var(--glow);
}

.cursor-outline {
    width: 40px;
    height: 40px;
    border: 2px solid var(--primary);
    transition: transform 0.15s ease, opacity 0.3s ease;
}

.cursor-outline.expand {
    transform: scale(2);
    opacity: 0.5;
}

/* ==============================================
   PARTÍCULAS DE FONDO
============================================== */
#particles {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    opacity: 0.3;
    pointer-events: none;
}

/* ==============================================
   NAVBAR
============================================== */
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 1.5rem 0;
    background: rgba(10, 14, 39, 0.8);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0, 245, 255, 0.1);
    transition: var(--transition);
}

.navbar.scrolled {
    padding: 1rem 0;
    background: rgba(10, 14, 39, 0.95);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.nav-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--text-primary);
    text-decoration: none;
    position: relative;
    transition: var(--transition);
}

.logo-bracket {
    color: var(--primary);
    font-weight: 400;
}

.logo:hover {
    transform: translateY(-2px);
    text-shadow: var(--glow);
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 3rem;
}

.nav-link {
    color: var(--text-secondary);
    text-decoration: none;
    font-weight: 500;
    font-size: 0.95rem;
    position: relative;
    transition: var(--transition);
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: 100%;
    height: 2px;
    background: var(--gradient-1);
    transition: var(--transition);
}

.nav-link:hover {
    color: var(--primary);
}

.nav-link:hover::after {
    transform: translateX(-50%) scaleX(1);
}

.nav-toggle {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
}

.nav-toggle span {
    width: 28px;
    height: 3px;
    background: var(--primary);
    border-radius: 2px;
    transition: var(--transition);
}

/* ==============================================
   HERO SECTION
============================================== */
.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding: 8rem 0 4rem;
}

.hero::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    height: 800px;
    background: radial-gradient(circle, rgba(0, 245, 255, 0.15) 0%, transparent 70%);
    animation: pulse 4s ease-in-out infinite;
    pointer-events: none;
}

@keyframes pulse {
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
    50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.8; }
}

.hero-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 3rem;
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 4rem;
    align-items: center;
    position: relative;
    z-index: 1;
}

.hero-content {
    animation: fadeInUp 1s ease both;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(40px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.hero-label {
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.6rem 1.5rem;
    background: var(--bg-card);
    border: 1px solid rgba(0, 245, 255, 0.2);
    border-radius: 50px;
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin-bottom: 2rem;
    backdrop-filter: blur(10px);
}

.glowing-dot {
    width: 8px;
    height: 8px;
    background: var(--primary);
    border-radius: 50%;
    box-shadow: var(--glow);
    animation: blink 2s ease infinite;
}

@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
}

.hero-title {
    font-family: 'Space Grotesk', sans-serif;
    margin-bottom: 2rem;
}

.title-small {
    display: block;
    font-size: 1.2rem;
    font-weight: 400;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
    animation: slideInLeft 0.8s ease 0.2s both;
}

@keyframes slideInLeft {
    from {
        opacity: 0;
        transform: translateX(-30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.title-main {
    display: block;
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 800;
    line-height: 1;
    margin-bottom: 0.2rem;
    animation: slideInRight 0.8s ease 0.4s both;
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.title-gradient {
    display: block;
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 800;
    line-height: 1;
    background: var(--gradient-1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: slideInRight 0.8s ease 0.6s both;
}

.hero-description {
    font-size: 1.2rem;
    color: var(--text-secondary);
    max-width: 600px;
    margin-bottom: 3rem;
    line-height: 1.8;
    animation: fadeIn 1s ease 0.8s both;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.highlight {
    color: var(--primary);
    font-weight: 600;
}

.hero-stats {
    display: flex;
    gap: 3rem;
    margin-bottom: 3rem;
    animation: fadeIn 1s ease 1s both;
}

.stat {
    text-align: center;
}

.stat-number {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 3rem;
    font-weight: 800;
    background: var(--gradient-1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
}

.stat-label {
    font-size: 0.9rem;
    color: var(--text-muted);
    margin-top: 0.5rem;
}

.stat-divider {
    width: 1px;
    background: linear-gradient(to bottom, transparent, var(--primary), transparent);
}

.hero-buttons {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    animation: fadeIn 1s ease 1.2s both;
}

/* ==============================================
   BUTTONS
============================================== */
.btn {
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1rem 2rem;
    border-radius: 50px;
    font-weight: 600;
    font-size: 1rem;
    text-decoration: none;
    transition: var(--transition);
    position: relative;
    overflow: hidden;
    border: none;
    cursor: pointer;
    font-family: 'Sora', sans-serif;
}

.btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50px;
    transition: transform 0.5s ease;
    z-index: 0;
}

.btn:hover::before {
    transform: translate(-50%, -50%) scale(1);
}

.btn span,
.btn svg {
    position: relative;
    z-index: 1;
}

.btn-primary {
    background: var(--gradient-1);
    color: var(--bg-darker);
    box-shadow: 0 10px 30px rgba(0, 245, 255, 0.3);
}

.btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(0, 245, 255, 0.5);
}

.btn-secondary {
    background: transparent;
    border: 2px solid var(--primary);
    color: var(--primary);
}

.btn-secondary:hover {
    background: rgba(0, 245, 255, 0.1);
    transform: translateY(-3px);
}

.btn-outline {
    background: transparent;
    border: 2px solid var(--text-secondary);
    color: var(--text-secondary);
}

.btn-outline:hover {
    border-color: var(--primary);
    color: var(--primary);
    transform: translateY(-3px);
}

.btn-large {
    padding: 1.3rem 2.5rem;
    font-size: 1.1rem;
}

/* ==============================================
   HERO VISUAL
============================================== */
.hero-visual {
    position: relative;
    min-height: 400px;
    animation: fadeIn 1s ease 1.4s both;
}

.floating-card {
    position: absolute;
    padding: 1.5rem 2rem;
    background: var(--bg-card);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(0, 245, 255, 0.2);
    border-radius: 20px;
    display: flex;
    align-items: center;
    gap: 1rem;
    box-shadow: var(--shadow-lg);
    animation: float 3s ease-in-out infinite;
}

@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}

.card-1 {
    top: 0;
    left: 0;
    animation-delay: 0s;
}

.card-2 {
    top: 30%;
    right: 0;
    animation-delay: 0.5s;
}

.card-3 {
    bottom: 30%;
    left: 10%;
    animation-delay: 1s;
}

.card-4 {
    bottom: 0;
    right: 10%;
    animation-delay: 1.5s;
}

.card-icon {
    font-size: 2rem;
}

.card-text {
    font-weight: 600;
    color: var(--text-primary);
    white-space: nowrap;
}

.scroll-down {
    position: absolute;
    bottom: 3rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-muted);
    font-size: 0.85rem;
    animation: bounce 2s ease infinite;
}

@keyframes bounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(-10px); }
}

.scroll-line {
    width: 2px;
    height: 50px;
    background: linear-gradient(to bottom, var(--primary), transparent);
}

/* ==============================================
   SECTIONS
============================================== */
section {
    padding: 8rem 0;
    position: relative;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 3rem;
}

.section-header {
    margin-bottom: 5rem;
    text-align: center;
}

.section-number {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: var(--primary);
    letter-spacing: 2px;
    margin-bottom: 1rem;
    display: block;
}

.section-title {
    font-family: 'Space Grotesk', sans-serif;
}

.title-line {
    display: block;
    font-size: 1.2rem;
    font-weight: 400;
    color: var(--text-muted);
    margin-bottom: 0.5rem;
}

.title-main {
    display: block;
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    font-weight: 800;
    background: var(--gradient-1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

/* ==============================================
   SOBRE MÍ
============================================== */
.about {
    background: linear-gradient(180deg, var(--bg-darker) 0%, var(--bg-dark) 100%);
}

.about-grid {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 5rem;
    align-items: center;
}

.about-image-wrapper {
    position: relative;
}

.about-image {
    position: relative;
    border-radius: 30px;
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    aspect-ratio: 4/5;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-card);
}

.about-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: var(--transition);
}

.about-image:hover img {
    transform: scale(1.05);
}

.image-frame {
    position: absolute;
    top: -20px;
    right: -20px;
    bottom: 20px;
    left: 20px;
    border: 3px solid var(--primary);
    border-radius: 30px;
    pointer-events: none;
    transition: var(--transition);
}

.about-image:hover .image-frame {
    top: -30px;
    right: -30px;
}

.experience-badge {
    position: absolute;
    bottom: -30px;
    right: 30px;
    padding: 2rem;
    background: var(--gradient-2);
    border-radius: 20px;
    text-align: center;
    box-shadow: var(--shadow-lg);
    animation: float 3s ease-in-out infinite;
}

.badge-number {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 3rem;
    font-weight: 800;
    line-height: 1;
    color: white;
}

.badge-text {
    font-size: 0.9rem;
    color: white;
    margin-top: 0.5rem;
    line-height: 1.3;
}

.about-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.about-text p {
    font-size: 1.1rem;
    color: var(--text-secondary);
    line-height: 1.8;
    margin-bottom: 1.5rem;
}

.lead {
    font-size: 1.3rem !important;
    color: var(--text-primary) !important;
}

.skills-quick {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}

.skill-item {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1rem;
    background: var(--bg-card);
    border: 1px solid rgba(0, 245, 255, 0.1);
    border-radius: 15px;
    transition: var(--transition);
}

.skill-item:hover {
    border-color: var(--primary);
    transform: translateX(5px);
}

.skill-icon {
    font-size: 1.2rem;
    color: var(--primary);
}

/* ==============================================
   PROYECTOS
============================================== */
.projects {
    background: var(--bg-darker);
}

.project-card {
    margin-bottom: 8rem;
    position: relative;
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.8s ease, transform 0.8s ease;
}

.project-card.in-view {
    opacity: 1;
    transform: translateY(0);
}

.project-number {
    position: absolute;
    top: -20px;
    left: 0;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 8rem;
    font-weight: 800;
    background: var(--gradient-1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    opacity: 0.1;
    z-index: 0;
    line-height: 1;
}

.project-badge {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.8rem 1.5rem;
    background: var(--gradient-2);
    color: white;
    border-radius: 50px;
    font-weight: 600;
    font-size: 0.9rem;
    z-index: 2;
}

.project-content {
    display: grid;
    grid-template-columns: 1fr 1.3fr;
    gap: 4rem;
    align-items: center;
    position: relative;
    z-index: 1;
}

.project-content.reverse {
    grid-template-columns: 1.3fr 1fr;
}

.project-content.reverse .project-media {
    order: -1;
}

.project-card.featured {
    padding: 3rem;
    background: var(--bg-card);
    border: 2px solid rgba(0, 245, 255, 0.2);
    border-radius: 30px;
    backdrop-filter: blur(20px);
}

.project-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    background: var(--gradient-1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.project-subtitle {
    font-size: 1.1rem;
    color: var(--primary);
    margin-bottom: 1.5rem;
}

.project-description {
    font-size: 1.1rem;
    color: var(--text-secondary);
    line-height: 1.8;
    margin-bottom: 2rem;
}

.project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-bottom: 2rem;
}

.project-tags span {
    padding: 0.5rem 1.2rem;
    background: rgba(0, 245, 255, 0.1);
    border: 1px solid rgba(0, 245, 255, 0.3);
    border-radius: 50px;
    font-size: 0.85rem;
    color: var(--primary);
    transition: var(--transition);
}

.project-tags span:hover {
    background: rgba(0, 245, 255, 0.2);
    transform: translateY(-2px);
}

.project-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--primary);
    text-decoration: none;
    font-weight: 600;
    transition: var(--transition);
}

.project-link:hover {
    gap: 1rem;
}

.project-media {
    position: relative;
}

.media-wrapper {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    transition: var(--transition);
    background: var(--bg-card);
}

.media-wrapper:hover {
    transform: translateY(-10px);
    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.6);
}

.media-wrapper img,
.media-wrapper video {
    width: 100%;
    height: auto;
    display: block;
}

/* ==============================================
   HABILIDADES
============================================== */
.skills {
    background: linear-gradient(180deg, var(--bg-darker) 0%, var(--bg-dark) 100%);
}

.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
}

.skill-card {
    padding: 2.5rem;
    background: var(--bg-card);
    border: 1px solid rgba(0, 245, 255, 0.1);
    border-radius: 25px;
    backdrop-filter: blur(20px);
    transition: var(--transition);
    opacity: 0;
    transform: translateY(30px);
}

.skill-card.in-view {
    opacity: 1;
    transform: translateY(0);
}

.skill-card:hover {
    border-color: var(--primary);
    transform: translateY(-10px);
    box-shadow: 0 20px 50px rgba(0, 245, 255, 0.2);
}

.skill-icon-wrapper {
    width: 80px;
    height: 80px;
    margin-bottom: 1.5rem;
    background: var(--gradient-1);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
}

.skill-card h3 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.skill-card p {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
}

.skill-level {
    width: 100%;
    height: 8px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    overflow: hidden;
}

.skill-bar {
    height: 100%;
    background: var(--gradient-1);
    width: 0;
    border-radius: 10px;
    transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ==============================================
   GALERÍA
============================================== */
.gallery {
    background: var(--bg-darker);
}

.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
}

.gallery-item {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    height: 350px;
    opacity: 0;
    transform: scale(0.9);
    transition: var(--transition);
}

.gallery-item.in-view {
    opacity: 1;
    transform: scale(1);
}

.gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition);
}

.gallery-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 245, 255, 0.9), rgba(131, 56, 236, 0.9));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: var(--transition);
    padding: 2rem;
    text-align: center;
}

.gallery-item:hover .gallery-overlay {
    opacity: 1;
}

.gallery-item:hover img,
.gallery-item:hover .gallery-placeholder {
    transform: scale(1.1);
}

.gallery-category {
    font-size: 0.85rem;
    font-weight: 600;
    color: white;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 1rem;
}

.gallery-overlay h4 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.5rem;
    color: white;
}

/* ==============================================
   CONTACTO
============================================== */
.contact {
    background: linear-gradient(180deg, var(--bg-dark) 0%, var(--bg-darker) 100%);
}

.contact-grid {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 5rem;
}

.contact-info {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.info-card {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    padding: 1.5rem;
    background: var(--bg-card);
    border: 1px solid rgba(0, 245, 255, 0.1);
    border-radius: 20px;
    backdrop-filter: blur(20px);
    transition: var(--transition);
}

.info-card:hover {
    border-color: var(--primary);
    transform: translateX(10px);
}

.info-icon {
    font-size: 2rem;
}

.info-content h4 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
}

.info-content a,
.info-content p {
    color: var(--text-secondary);
    text-decoration: none;
    transition: var(--transition);
}

.info-content a:hover {
    color: var(--primary);
}

.social-links {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1rem;
}

.social-link {
    padding: 0.8rem 1.5rem;
    background: rgba(0, 245, 255, 0.1);
    border: 1px solid rgba(0, 245, 255, 0.3);
    border-radius: 50px;
    color: var(--primary);
    text-decoration: none;
    font-weight: 500;
    transition: var(--transition);
}

.social-link:hover {
    background: var(--primary);
    color: var(--bg-darker);
    transform: translateY(-3px);
}

.contact-cta {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    background: var(--bg-card);
    border: 2px solid rgba(0, 245, 255, 0.2);
    border-radius: 30px;
    backdrop-filter: blur(20px);
}

.cta-content {
    text-align: center;
}

.cta-content h3 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 2rem;
    margin-bottom: 1rem;
    background: var(--gradient-1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.cta-content p {
    color: var(--text-secondary);
    margin-bottom: 2.5rem;
    font-size: 1.1rem;
}

.cta-buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.footer {
    padding: 3rem 0;
    background: var(--bg-darker);
    border-top: 1px solid rgba(0, 245, 255, 0.1);
}

.footer-content {
    text-align: center;
}

.footer-content p {
    color: var(--text-muted);
    margin-bottom: 0.5rem;
}

.footer-note {
    font-size: 0.9rem;
}

.heart {
    color: var(--secondary);
    animation: heartbeat 1.5s ease infinite;
}

@keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    25% { transform: scale(1.2); }
    50% { transform: scale(1); }
}

/* ==============================================
   RESPONSIVE
============================================== */
@media (max-width: 1200px) {
    .hero-container,
    .about-grid,
    .contact-grid {
        grid-template-columns: 1fr;
        gap: 3rem;
    }
    
    .project-content,
    .project-content.reverse {
        grid-template-columns: 1fr;
    }
    
    .project-content.reverse .project-media {
        order: 0;
    }
    
    .hero-visual {
        min-height: 300px;
    }
}

@media (max-width: 968px) {
    .nav-links {
        position: fixed;
        top: 0;
        right: -100%;
        width: 70%;
        height: 100vh;
        background: rgba(10, 14, 39, 0.98);
        backdrop-filter: blur(20px);
        flex-direction: column;
        padding: 6rem 2rem;
        transition: var(--transition);
        border-left: 1px solid rgba(0, 245, 255, 0.2);
        z-index: 999;
    }
    
    .nav-links.active {
        right: 0;
    }
    
    .nav-toggle {
        display: flex;
        z-index: 1001;
    }
    
    .container {
        padding: 0 2rem;
    }
    
    .nav-container {
        padding: 0 2rem;
    }
    
    section {
        padding: 5rem 0;
    }
    
    .skills-grid {
        grid-template-columns: 1fr;
    }
    
    .hero-stats {
        flex-direction: column;
        gap: 2rem;
        align-items: flex-start;
    }
    
    .stat-divider {
        display: none;
    }
    
    .project-number {
        font-size: 5rem;
    }
}

@media (max-width: 640px) {
    .hero-buttons,
    .cta-buttons {
        flex-direction: column;
        width: 100%;
    }
    
    .btn {
        width: 100%;
        justify-content: center;
    }
    
    .skills-quick {
        grid-template-columns: 1fr;
    }
    
    .gallery-grid {
        grid-template-columns: 1fr;
    }
    
    .hero-visual {
        display: none;
    }
    
    .floating-card {
        padding: 1rem 1.5rem;
        font-size: 0.85rem;
    }
    
    .card-icon {
        font-size: 1.5rem;
    }
}

/* ==============================================
   YOUTUBE VIDEO CON PLACEHOLDER
============================================== */
.video-container {
    position: relative;
    aspect-ratio: 16/9;
    background: var(--bg-card);
    cursor: pointer;
    overflow: hidden;
}

.video-placeholder.active {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(0, 245, 255, 0.1), rgba(131, 56, 236, 0.1));
    border: 2px dashed rgba(0, 245, 255, 0.3);
    border-radius: 20px;
    gap: 1.5rem;
    transition: var(--transition);
    min-height: 400px;
}

.video-placeholder.active:hover {
    background: linear-gradient(135deg, rgba(0, 245, 255, 0.15), rgba(131, 56, 236, 0.15));
    border-color: var(--primary);
    transform: scale(1.02);
}

.video-placeholder svg {
    filter: drop-shadow(0 0 20px rgba(0, 245, 255, 0.5));
    animation: pulse-video 2s ease-in-out infinite;
}

@keyframes pulse-video {
    0%, 100% { 
        transform: scale(1); 
        opacity: 1;
    }
    50% { 
        transform: scale(1.1); 
        opacity: 0.8;
    }
}

.video-placeholder p {
    color: var(--text-secondary);
    font-size: 1.1rem;
    font-weight: 600;
    text-align: center;
    margin: 0;
}

.play-video-btn {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1rem 2rem;
    background: var(--gradient-1);
    color: var(--bg-darker);
    border: none;
    border-radius: 50px;
    font-weight: 600;
    font-size: 1rem;
    font-family: 'Sora', sans-serif;
    cursor: pointer;
    transition: var(--transition);
    box-shadow: 0 10px 30px rgba(0, 245, 255, 0.3);
    position: relative;
    z-index: 1;
}

.play-video-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(0, 245, 255, 0.5);
}

.play-video-btn svg {
    filter: none;
    animation: none;
}

.youtube-iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 20px;
}

.video-placeholder.hidden {
    display: none;
}

@media (max-width: 768px) {
    .video-placeholder.active {
        min-height: 300px;
    }
    
    .video-placeholder svg {
        width: 60px;
        height: 60px;
    }
    
    .video-placeholder p {
        font-size: 0.95rem;
    }
    
    .play-video-btn {
        padding: 0.8rem 1.5rem;
        font-size: 0.9rem;
    }
}

/* ==============================================
   GOOGLE DRIVE PROJECT PLACEHOLDER
============================================== */
.drive-container {
    position: relative;
    aspect-ratio: 16/9;
    background: var(--bg-card);
}

.drive-placeholder {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(0, 245, 255, 0.1), rgba(58, 134, 255, 0.1));
    border: 2px dashed rgba(0, 245, 255, 0.3);
    border-radius: 20px;
    gap: 1.5rem;
    padding: 2rem;
    min-height: 400px;
    transition: var(--transition);
}

.drive-placeholder:hover {
    background: linear-gradient(135deg, rgba(0, 245, 255, 0.15), rgba(58, 134, 255, 0.15));
    border-color: var(--primary);
    transform: scale(1.02);
}

.drive-placeholder svg {
    filter: drop-shadow(0 0 20px rgba(0, 245, 255, 0.5));
    animation: pulse-video 2s ease-in-out infinite;
}

.drive-placeholder p {
    color: var(--text-secondary);
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
    margin: 0;
}

.drive-stats {
    display: flex;
    gap: 3rem;
    margin-top: 1rem;
}

.drive-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
}

.drive-stat strong {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 2rem;
    font-weight: 800;
    background: var(--gradient-1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.drive-stat span {
    font-size: 0.85rem;
    color: var(--text-muted);
}

@media (max-width: 768px) {
    .drive-placeholder {
        min-height: 300px;
        padding: 1.5rem;
    }
    
    .drive-placeholder svg {
        width: 80px;
        height: 80px;
    }
    
    .drive-stats {
        gap: 2rem;
    }
    
    .drive-stat strong {
        font-size: 1.5rem;
    }
}
