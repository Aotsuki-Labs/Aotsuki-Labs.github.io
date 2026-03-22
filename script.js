'use strict';
/* ============================================================
   AOTSUKI LABS — script.js
   Single-page tabs · Product switcher · Terminal · Reveal
   ============================================================ */

/* ── Tab navigation ────────────────────────────── */
const Tabs = (() => {
  let current = 'home';

  function switchTo(id, opts = {}) {
    if (id === current && !opts.force) return;

    // Hide current
    const prev = document.getElementById(current);
    if (prev) prev.classList.remove('active');

    // Show new
    const next = document.getElementById(id);
    if (!next) return;
    next.classList.add('active');
    current = id;

    // Update nav links
    document.querySelectorAll('.nt').forEach(a => {
      a.classList.toggle('active', a.getAttribute('data-tab') === id);
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });

    // If products tab with specific product target
    if (id === 'products' && opts.prod) {
      setTimeout(() => switchProd(opts.prod), 50);
    }

    // Trigger reveals on new tab
    setTimeout(() => Reveal.scan(), 50);

    // Re-run terminal if on products tab
    if (id === 'products') {
      setTimeout(() => Terminal.tryRun(), 100);
    }
  }

  function init() {
    // Handle data-tab links (nav)
    document.querySelectorAll('[data-tab]').forEach(el => {
      el.addEventListener('click', e => {
        const tab = el.getAttribute('data-tab');
        if (tab) { e.preventDefault(); switchTo(tab); }
      });
    });

    // Handle data-goto buttons (section CTAs, footer)
    document.querySelectorAll('[data-goto]').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        const tab = el.getAttribute('data-goto');
        const prod = el.getAttribute('data-prod-target');
        switchTo(tab, { prod });
      });
    });

    // Hash on load
    const hash = window.location.hash.replace('#', '');
    const valid = ['home','products','about','capabilities','invest'];
    if (hash && valid.includes(hash)) switchTo(hash, { force: true });
    else switchTo('home', { force: true });
  }

  return { init, switchTo };
})();

/* ── Category switching (Hardware/Software/Networks) ── */
function initCatTabs() {
  const tabs = document.querySelectorAll('.cat-tab');
  const panels = document.querySelectorAll('.cat-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const cat = tab.getAttribute('data-cat');
      tabs.forEach(t => { t.classList.toggle('active', t.getAttribute('data-cat') === cat); t.setAttribute('aria-selected', t.getAttribute('data-cat') === cat); });
      panels.forEach(p => p.classList.toggle('active', p.getAttribute('data-cat-panel') === cat));
      // If switching to hardware, run terminal
      if (cat === 'hardware') setTimeout(() => Terminal.tryRun(), 100);
    });
  });
}

/* ── Product switcher (KALIX v1 / v2) ─────────────── */
function switchProd(id) {
  document.querySelectorAll('.pn-item').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-prod') === id);
  });
  document.querySelectorAll('.prod-detail').forEach(d => {
    d.classList.toggle('active', d.getAttribute('data-prod-detail') === id);
  });
  if (id === 'kalix1') setTimeout(() => Terminal.tryRun(), 100);
}

function initProdNav() {
  document.querySelectorAll('.pn-item').forEach(btn => {
    btn.addEventListener('click', () => switchProd(btn.getAttribute('data-prod')));
  });
}

/* ── Nav scroll behavior ───────────────────────────── */
const Nav = (() => {
  function init() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    const check = () => nav.classList.toggle('top', window.scrollY < 8);
    window.addEventListener('scroll', check, { passive: true });
    check();

    // Burger menu
    const burger = document.getElementById('burger');
    const drawer = document.getElementById('drawer');
    if (burger && drawer) {
      burger.addEventListener('click', () => {
        const open = drawer.classList.toggle('open');
        burger.classList.toggle('open', open);
        burger.setAttribute('aria-expanded', String(open));
        drawer.setAttribute('aria-hidden', String(!open));
      });

      // Close drawer when a tab link inside it is clicked
      drawer.querySelectorAll('[data-tab]').forEach(a => {
        a.addEventListener('click', () => {
          drawer.classList.remove('open');
          burger.classList.remove('open');
          burger.setAttribute('aria-expanded', 'false');
          drawer.setAttribute('aria-hidden', 'true');
        });
      });
    }
  }
  return { init };
})();

/* ── Scroll reveal ─────────────────────────────────── */
const Reveal = (() => {
  let io;

  function scan() {
    const activeTab = document.querySelector('.tab.active');
    if (!activeTab) return;

    const els = activeTab.querySelectorAll('.reveal');
    const vh  = window.innerHeight;

    els.forEach(el => {
      if (el.getBoundingClientRect().top > vh * 0.94) {
        el.classList.add('off');
      }
    });

    els.forEach(el => {
      if (el.classList.contains('off')) io.observe(el);
    });
  }

  function init() {
    io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('off');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

    scan();
    window.addEventListener('scroll', () => {
      const activeTab = document.querySelector('.tab.active');
      if (!activeTab) return;
      activeTab.querySelectorAll('.reveal.off').forEach(el => io.observe(el));
    }, { passive: true });
  }

  return { init, scan };
})();

/* ── Terminal typewriter ───────────────────────────── */
const Terminal = (() => {
  const SCRIPT = [
    { dim: '──────────────────────────────────────────────────' },
    { txt: 'KALIX v1.0  ·  Hardware Intelligence Engine' },
    { txt: 'Aotsuki Labs  ·  2025  ·  WIN64 Portable' },
    { dim: '──────────────────────────────────────────────────' },
    { p:true, txt: 'Initialising kernel interface...' },
    { p:true, ok:true, txt: 'Ring-0 bridge: ESTABLISHED' },
    { p:true, ok:true, txt: 'Thread pool (4 workers): ACTIVE' },
    { dim: '──────────────────────────────────────────────────' },
    { p:true, txt: 'Phase 1 — Component Enumeration' },
    { p:true, ok:true, txt: 'CPU    Intel i9-13900K  20T/12C  [VERIFIED ✓]' },
    { p:true, ok:true, txt: 'MEM[0] SK Hynix 32GB DDR5-6000  [SN MATCH ✓]' },
    { p:true, ok:true, txt: 'MEM[1] SK Hynix 32GB DDR5-6000  [SN MATCH ✓]' },
    { p:true, ok:true, txt: 'GPU    NVIDIA RTX 4090 24GB      [CLEAN ✓]' },
    { p:true, ok:true, txt: 'SSD    Samsung 990 Pro 2TB NVMe  [CLEAN ✓]' },
    { dim: '──────────────────────────────────────────────────' },
    { p:true, txt: 'Phase 2 — Thermal Intelligence' },
    { p:true, ok:true, txt: 'CPU die  42°C   TDP headroom: 67%' },
    { p:true, ok:true, txt: 'GPU core 38°C   Fan: 24%' },
    { p:true, ok:true, txt: 'Throttle events (60s): 0' },
    { dim: '──────────────────────────────────────────────────' },
    { p:true, txt: 'Phase 3 — Integrity Verification' },
    { p:true, ok:true, txt: 'Serials cross-ref: 5/5 MATCHED' },
    { p:true, ok:true, txt: 'Firmware signatures: ALL VALID' },
    { p:true, ok:true, txt: 'SHA-256 manifest: WRITTEN' },
    { dim: '──────────────────────────────────────────────────' },
    { done:true, txt: 'AUDIT COMPLETE — 0.38ms' },
  ];

  let busy = false;

  function run(el) {
    if (busy || !el) return;
    busy = true;
    el.innerHTML = '';
    SCRIPT.forEach((l, i) => {
      setTimeout(() => {
        const d = document.createElement('div');
        d.className = 'tl tin';
        if      (l.done) d.innerHTML = `<span class="tp">›</span> <span class="tdone">${l.txt} <span class="tcur">█</span></span>`;
        else if (l.dim)  { d.className = 'tl tin tdim'; d.textContent = l.dim; }
        else if (l.p)    d.innerHTML = `<span class="tp">›</span> <span class="${l.ok ? 'tok' : ''}">${l.txt}</span>`;
        else             { d.className = 'tl tin tdim'; d.textContent = l.txt; }
        el.appendChild(d);
        el.scrollTop = el.scrollHeight;
        if (i === SCRIPT.length - 1) setTimeout(() => { busy = false; }, 14000);
      }, i * 88 + 200);
    });
  }

  // Short version for hero mini-terminal
  const MINI = [
    '› AUDIT COMPLETE — 0.38ms',
    '› CPU: 20T/12C  [VERIFIED ✓]',
    '› SHA-256 manifest: WRITTEN',
    '› Telemetry calls: ZERO',
  ];
  let miniIdx = 0;

  function initMini() {
    const el = document.getElementById('mini-term');
    if (!el) return;
    function tick() {
      el.innerHTML = MINI.map((l,i) => `<div style="opacity:${i===miniIdx?1:.35}">${l}</div>`).join('');
      miniIdx = (miniIdx + 1) % MINI.length;
    }
    tick();
    setInterval(tick, 2200);
  }

  function tryRun() {
    const el = document.getElementById('prod-term');
    if (el) run(el);
  }

  function init() {
    initMini();
    // Observe prod-term
    const el = document.getElementById('prod-term');
    if (el) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) run(el); });
      }, { threshold: 0.2 });
      io.observe(el);
    }
  }

  return { init, tryRun };
})();

/* ── Boot ──────────────────────────────────────────── */
function boot() {
  Nav.init();
  Tabs.init();
  initCatTabs();
  initProdNav();
  Reveal.init();
  Terminal.init();
}

document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', boot)
  : boot();