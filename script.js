/**
 * AOTSUKI LABS — CORE SCRIPTS v2
 * Handles: SPA Router, Custom Cursor, Canvas BG, Scroll Animations, Mobile Nav
 */

'use strict';

/* =========================================================================
   INIT
   ========================================================================= */
document.addEventListener('DOMContentLoaded', () => {
    initCanvas();
    initRouter();
    initHamburger();
    initAuthToggle();
    initGoogleLogin();
});

/* =========================================================================
   BACKGROUND CANVAS — SpaceX-style animated grid
   No glow. Just precision lines, dots, and a slow scanning effect.
   ========================================================================= */
function initCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H;
    const resize = () => {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Grid parameters
    const GRID = 80;         // pixels between grid lines
    let scrollY = 0;

    // Floating particles (very sparse, small)
    const PARTICLE_COUNT = 60;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * 2000,
        y: Math.random() * 2000,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r:  Math.random() * 1.2 + 0.3,
        a:  Math.random() * 0.3 + 0.05,
    }));

    // Horizontal scan line
    let scanY = 0;
    const SCAN_SPEED = 0.4;

    // Track scroll for parallax grid offset
    window.addEventListener('scroll', () => { scrollY = window.scrollY; });

    let frameCount = 0;

    const draw = () => {
        ctx.clearRect(0, 0, W, H);

        const offsetY = (scrollY * 0.3) % GRID;
        const offsetX = 0;

        // --- GRID LINES (very subtle) ---
        ctx.strokeStyle = 'rgba(255,255,255,0.028)';
        ctx.lineWidth = 1;

        // Vertical
        for (let x = (offsetX % GRID); x < W; x += GRID) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, H);
            ctx.stroke();
        }
        // Horizontal
        for (let y = (H - offsetY % GRID); y > 0; y -= GRID) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(W, y);
            ctx.stroke();
        }

        // --- GRID INTERSECTION DOTS ---
        ctx.fillStyle = 'rgba(255,255,255,0.08)';
        for (let x = (offsetX % GRID); x < W; x += GRID) {
            for (let y = (H - offsetY % GRID); y > 0; y -= GRID) {
                ctx.beginPath();
                ctx.arc(x, y, 1, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // --- HORIZONTAL SCAN LINE (single, slow, dim) ---
        scanY += SCAN_SPEED;
        if (scanY > H) scanY = 0;
        const scanGrad = ctx.createLinearGradient(0, scanY - 80, 0, scanY + 80);
        scanGrad.addColorStop(0,   'rgba(255,255,255,0)');
        scanGrad.addColorStop(0.5, 'rgba(255,255,255,0.04)');
        scanGrad.addColorStop(1,   'rgba(255,255,255,0)');
        ctx.fillStyle = scanGrad;
        ctx.fillRect(0, scanY - 80, W, 160);

        // Thin scan line itself
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, scanY);
        ctx.lineTo(W, scanY);
        ctx.stroke();

        // --- PARTICLES ---
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = W;
            if (p.x > W) p.x = 0;
            if (p.y < 0) p.y = H;
            if (p.y > H) p.y = 0;

            ctx.fillStyle = `rgba(255,255,255,${p.a})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        });

        frameCount++;
        requestAnimationFrame(draw);
    };

    draw();
}

/* =========================================================================
   SPA ROUTER
   ========================================================================= */

// All known page IDs and which nav-link to mark active
const PAGE_MAP = {
    home:      'nav-home',
    about:     'nav-about',
    products:  'nav-products',
    hardware:  'nav-products',
    kalix:     'nav-products',
    roadmap:   'nav-roadmap',
    auth:      'nav-login',
    dashboard: 'nav-dashboard',
};

let currentPage = null;
let scrollObserver = null;

function initRouter() {
    // Build the IntersectionObserver for fade-up animations
    scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    // Attach click listeners to ALL nav-link elements (both navbar and in-page)
    document.addEventListener('click', (e) => {
        const link = e.target.closest('.nav-link');
        if (!link) return;
        const target = link.dataset.target;
        if (!target || !PAGE_MAP.hasOwnProperty(target)) return;

        // Don't intercept external links
        if (link.href && (link.href.startsWith('http') && !link.href.startsWith(location.origin))) return;

        e.preventDefault();
        navigateTo(target);

        // Close mobile nav if open
        closeMobileNav();
    });

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
        const hash = location.hash.replace('#', '') || 'home';
        navigateTo(hash, false);
    });

    // Initial load
    const initial = location.hash.replace('#', '') || 'home';
    navigateTo(initial, false);
}

function navigateTo(pageId, pushState = true) {
    if (!PAGE_MAP.hasOwnProperty(pageId)) pageId = 'home';
    // Dashboard redirects to auth (no session system yet)
    if (pageId === 'dashboard') pageId = 'auth';
    if (pageId === currentPage) return;

    // Hide all pages - strip classes AND inline style
    document.querySelectorAll('.page').forEach(pg => {
        pg.classList.remove('active', 'page-enter');
        pg.style.display = 'none';
    });

    const target = document.getElementById('page-' + pageId);
    if (!target) { navigateTo('home', pushState); return; }

    // 1. Make visible
    target.style.display = 'block';
    target.classList.remove('hidden'); 
    target.classList.add('active');
    // 2. Force browser to acknowledge the DOM change (reflow)
    void target.offsetWidth;
    // 3. Add animation class — restarts pg-in keyframes
    target.classList.add('page-enter');

    // Reset all fade-up elements globally
    if (scrollObserver) {
        document.querySelectorAll('.fade-up').forEach(el => {
            el.classList.remove('visible');
            scrollObserver.unobserve(el);
        });
    }

    // Re-observe elements only inside the newly active page
    requestAnimationFrame(() => {
        target.querySelectorAll('.fade-up').forEach(el => {
            scrollObserver && scrollObserver.observe(el);
        });
        // Also watch footer
        const footer = document.getElementById('site-footer');
        if (footer) footer.querySelectorAll('.fade-up').forEach(el => scrollObserver && scrollObserver.observe(el));
    });

    // Highlight correct nav link
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    const navId = PAGE_MAP[pageId];
    if (navId) { const el = document.getElementById(navId); if (el) el.classList.add('active'); }

    // Instant scroll to top (avoids visual bleed between pages)
    window.scrollTo(0, 0);

    if (pushState) history.pushState({ page: pageId }, '', '#' + pageId);
    currentPage = pageId;

    const titles = {
        home:      'Aotsuki Labs — Engineering Unified Excellence',
        about:     'About — Aotsuki Labs',
        products:  'Products — Aotsuki Labs',
        hardware:  'Hardware — Aotsuki Labs',
        kalix:     'KALIX v1 — Aotsuki Labs',
        roadmap:   'Roadmap — Aotsuki Labs',
        auth:      'Login — Aotsuki Labs',
        dashboard: 'Dashboard — Aotsuki Labs',
    };
    document.title = titles[pageId] || 'Aotsuki Labs';
}

/* =========================================================================
   HAMBURGER MENU
   ========================================================================= */
function initHamburger() {
    const btn    = document.getElementById('hamburger');
    const mNav   = document.getElementById('mobile-nav');
    if (!btn || !mNav) return;

    btn.addEventListener('click', () => {
        const isOpen = btn.classList.toggle('open');
        if (isOpen) {
            mNav.classList.add('open');
            mNav.style.display = 'flex';
        } else {
            closeMobileNav();
        }
    });
}

function closeMobileNav() {
    const btn  = document.getElementById('hamburger');
    const mNav = document.getElementById('mobile-nav');
    if (!btn || !mNav) return;
    btn.classList.remove('open');
    mNav.classList.remove('open');
    // Hide after transition
    setTimeout(() => {
        if (!mNav.classList.contains('open')) {
            mNav.style.display = '';
        }
    }, 380);
}

/* =========================================================================
   AUTH FORM TOGGLE (Login <-> Sign Up)
   ========================================================================= */
function initAuthToggle() {
    const switchToSignup = document.getElementById('switch-to-signup');
    const switchToLogin  = document.getElementById('switch-to-login');
    const loginView      = document.getElementById('auth-login-view');
    const signupView     = document.getElementById('auth-signup-view');

    if (!switchToSignup || !switchToLogin || !loginView || !signupView) return;

    switchToSignup.addEventListener('click', (e) => {
        e.preventDefault();
        loginView.style.display  = 'none';
        signupView.style.display = 'block';
    });

    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        signupView.style.display = 'none';
        loginView.style.display  = 'block';
    });

    // Also redirect Dashboard link to auth if not logged in
    // (Dashboard currently acts as a placeholder that leads to auth)
}

/* =========================================================================
   GOOGLE LOGIN INTEGRATION
   ========================================================================= */
function initGoogleLogin() {
    // CRITICAL: Replace 'YOUR_GOOGLE_CLIENT_ID_HERE' with your real Google Client ID
    const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID_HERE';

    if (GOOGLE_CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID_HERE') {
        console.warn('Google Login: Client ID not set. Replace YOUR_GOOGLE_CLIENT_ID_HERE in script.js.');
    }

    if (window.google && google.accounts) {
        google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
        });

        // Wire up all custom .google-btn buttons
        document.querySelectorAll('.google-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (GOOGLE_CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID_HERE') {
                    alert('Configuration Error: Google Client ID is not set. Please update script.js with your Client ID from Google Cloud Console.');
                    return;
                }
                google.accounts.id.prompt(); // Show the Google accounts picker
            });
        });

        // Optionally show the One Tap prompt as well
        // google.accounts.id.prompt(); 
    } else {
        // Retry if library not loaded yet
        setTimeout(initGoogleLogin, 500);
    }
}

/**
 * Decodes the Google JWT locally to extract user info (for demo purposes)
 */
function handleCredentialResponse(response) {
    if (!response.credential) return;

    // The credential is a JSON Web Token (JWT)
    // We decode it locally here just to show we have the user data.
    // In production, YOU SHOULD SEND THIS TOKEN TO YOUR BACKEND SERVER.
    try {
        const payload = JSON.parse(atob(response.credential.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
        console.log('Google User Decoded:', payload);

        // Show a welcome message
        alert(`Welcome, ${payload.name}! Logged in as ${payload.email}. (Demo only — no backend session established)`);
        
        // Redirect or update UI state
        // navigateTo('home'); 
    } catch (e) {
        console.error('Error decoding Google JWT:', e);
    }
}
