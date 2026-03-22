'use strict';
/* ============================================================
   AOTSUKI LABS — script.js
   ============================================================ */

/* ── Pages ────────────────────────────────────────── */
const Pages = (() => {
  let cur = 'home';

  function go(id, opts = {}) {
    if (id === cur && !opts.force) return;
    document.getElementById('pg-' + cur)?.classList.remove('active');
    const next = document.getElementById('pg-' + id);
    if (!next) return;
    next.classList.add('active');
    cur = id;

    document.querySelectorAll('.nm').forEach(b =>
      b.classList.toggle('active', b.dataset.go === id));

    window.scrollTo({ top: 0, behavior: 'instant' });
    Reveal.scan();

    if (id === 'products') {
      const prod = opts.prod || 'v1';
      setTimeout(() => switchProd(prod), 30);
    }
  }

  function init() {
    document.addEventListener('click', e => {
      const el = e.target.closest('[data-go]');
      if (!el) return;
      if (el.tagName === 'A') return; // let real links pass
      e.preventDefault();
      go(el.dataset.go, { prod: el.dataset.prod });
    });

    // Product-switch buttons inside v2 panel
    document.addEventListener('click', e => {
      const el = e.target.closest('[data-prod-switch]');
      if (!el) return;
      e.stopPropagation();
      switchProd(el.dataset.prodSwitch);
    });

    go('home', { force: true });
  }

  return { init, go };
})();

/* ── Product tab ──────────────────────────────────── */
function switchProd(id) {
  document.querySelectorAll('.ptab').forEach(b =>
    b.classList.toggle('active', b.dataset.prod === id));
  document.querySelectorAll('.pp').forEach(p =>
    p.classList.toggle('active', p.id === 'pp-' + id));
  if (id === 'v1') setTimeout(() => Terminal.tryStart(), 80);
}

function initProdTabs() {
  document.querySelectorAll('.ptab').forEach(b =>
    b.addEventListener('click', () => switchProd(b.dataset.prod)));
}

/* ── Nav ──────────────────────────────────────────── */
const Nav = (() => {
  function init() {
    const burger = document.getElementById('burger');
    const mnav   = document.getElementById('mnav');
    if (burger && mnav) {
      burger.addEventListener('click', () => {
        const open = mnav.classList.toggle('open');
        burger.classList.toggle('open', open);
        burger.setAttribute('aria-expanded', String(open));
      });
      mnav.querySelectorAll('button').forEach(b => {
        b.addEventListener('click', () => {
          mnav.classList.remove('open');
          burger.classList.remove('open');
        });
      });
    }
  }
  return { init };
})();

/* ── Reveal ───────────────────────────────────────── */
const Reveal = (() => {
  let io;
  function scan() {
    const active = document.querySelector('.pg.active');
    if (!active) return;
    const vh = window.innerHeight;
    active.querySelectorAll('.reveal').forEach(el => {
      if (el.getBoundingClientRect().top > vh * 0.92) {
        el.classList.add('off');
        const parent = el.parentElement;
        if (parent) {
          const sibs = [...parent.querySelectorAll(':scope > .reveal')];
          const idx  = sibs.indexOf(el);
          if (idx > 0) el.style.setProperty('--d', `${Math.min(idx*80,280)}ms`);
        }
        io.observe(el);
      }
    });
  }
  function init() {
    io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.remove('off');
        io.unobserve(e.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    scan();
    window.addEventListener('scroll', () => {
      document.querySelectorAll('.reveal.off').forEach(el => io.observe(el));
    }, { passive: true });
  }
  return { init, scan };
})();

/* ── Terminal ─────────────────────────────────────── */
const Terminal = (() => {
  const S = [
    { dim: '─────────────────────────────────────────────────────' },
    { txt: 'KALIX v1.0  ·  Hardware Intelligence Engine' },
    { txt: 'Aotsuki Labs  ·  2025  ·  WIN64 Portable' },
    { dim: '─────────────────────────────────────────────────────' },
    { p:1, txt: 'Initialising kernel interface bridge...' },
    { p:1, ok:1, txt: 'Ring-0 bridge: ESTABLISHED' },
    { p:1, ok:1, txt: 'Thread pool (4 workers): ACTIVE' },
    { dim: '─────────────────────────────────────────────────────' },
    { p:1, txt: 'Phase 1 — Component Enumeration' },
    { p:1, ok:1, txt: 'CPU    Intel i9-13900K  20T/12C   [VERIFIED ✓]' },
    { p:1, ok:1, txt: 'MEM[0] SK Hynix 32GB DDR5-6000   [SN MATCH ✓]' },
    { p:1, ok:1, txt: 'MEM[1] SK Hynix 32GB DDR5-6000   [SN MATCH ✓]' },
    { p:1, ok:1, txt: 'GPU    NVIDIA RTX 4090 24GB       [CLEAN ✓]' },
    { p:1, ok:1, txt: 'SSD    Samsung 990 Pro 2TB NVMe   [CLEAN ✓]' },
    { p:1, ok:1, txt: 'MOBO   ASUS ROG MAXIMUS Z790      [BIOS v3.4]' },
    { dim: '─────────────────────────────────────────────────────' },
    { p:1, txt: 'Phase 2 — Thermal Intelligence' },
    { p:1, ok:1, txt: 'CPU die   42°C   TDP headroom: 67%' },
    { p:1, ok:1, txt: 'GPU core  38°C   Fan: 24%' },
    { p:1, ok:1, txt: 'Throttle events (60s): 0' },
    { dim: '─────────────────────────────────────────────────────' },
    { p:1, txt: 'Phase 3 — Integrity Verification' },
    { p:1, ok:1, txt: 'Serials cross-ref: 5/5 MATCHED' },
    { p:1, ok:1, txt: 'Firmware signatures: ALL VALID' },
    { p:1, ok:1, txt: 'SHA-256 manifest: WRITTEN' },
    { dim: '─────────────────────────────────────────────────────' },
    { done:1, txt: 'AUDIT COMPLETE — 0.38ms' },
  ];

  let busy = false;

  function run(el) {
    if (busy || !el) return;
    busy = true; el.innerHTML = '';
    S.forEach((l, i) => {
      setTimeout(() => {
        const d = document.createElement('div');
        d.className = 'tl tin';
        if      (l.done) d.innerHTML = `<span class="tp">›</span> <span class="tdone">${l.txt} <span class="tcur">█</span></span>`;
        else if (l.dim)  { d.className='tl tin tdim'; d.textContent=l.dim; }
        else if (l.p)    d.innerHTML = `<span class="tp">›</span><span class="${l.ok?'tok':''}">${l.txt}</span>`;
        else             { d.className='tl tin tdim'; d.textContent=l.txt; }
        el.appendChild(d);
        el.scrollTop = el.scrollHeight;
        if (i === S.length-1) setTimeout(() => { busy=false; }, 15000);
      }, i*90+200);
    });
  }

  function tryStart() {
    run(document.getElementById('term'));
  }

  function init() {
    const el = document.getElementById('term');
    if (!el) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) run(el); });
    }, { threshold: 0.2 });
    io.observe(el);
  }

  return { init, tryStart };
})();

/* ── Boot ─────────────────────────────────────────── */
function boot() {
  Pages.init();
  Nav.init();
  initProdTabs();
  Reveal.init();
  Terminal.init();
}
document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', boot)
  : boot();