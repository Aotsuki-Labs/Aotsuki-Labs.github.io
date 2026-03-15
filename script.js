'use strict';

/* ================================================================
   THREE.JS — STABLE NEXUS CORE
================================================================ */
const Nexus = (() => {
  let scene, camera, renderer, raf, clock;
  let core, shell, outer, ring1, ring2, pts;
  const M = { x:0, y:0, tx:0, ty:0 };

  function init() {
    const canvas = document.getElementById('bg');
    if (!canvas || typeof THREE === 'undefined') return;

    clock = new THREE.Clock();
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, W()/H(), 0.1, 300);
    camera.position.z = 6.5;

    renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true });
    renderer.setSize(W(), H());
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0, 0);

    buildGeometry();
    buildParticles();
    buildLights();

    window.addEventListener('mousemove', e => {
      M.tx = (e.clientX/W() - .5) * 2;
      M.ty = (e.clientY/H() - .5) * 2;
    }, { passive:true });

    window.addEventListener('resize', () => {
      camera.aspect = W()/H();
      camera.updateProjectionMatrix();
      renderer.setSize(W(), H());
    }, { passive:true });

    raf = requestAnimationFrame(loop);
  }

  function W(){ return window.innerWidth; }
  function H(){ return window.innerHeight; }

  function buildGeometry() {
    // Solid dark inner core
    core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.3, 2),
      new THREE.MeshPhongMaterial({
        color:0x040c14, emissive:0x001018,
        specular:0x00d4ff, shininess:70,
        transparent:true, opacity:.92
      })
    );
    scene.add(core);

    // Primary wireframe
    shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.32, 2),
      new THREE.MeshBasicMaterial({
        color:0x00d4ff, wireframe:true,
        transparent:true, opacity:.16
      })
    );
    scene.add(shell);

    // Outer sparse cage — rotates opposite
    outer = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.82, 1),
      new THREE.MeshBasicMaterial({
        color:0x003d55, wireframe:true,
        transparent:true, opacity:.06
      })
    );
    scene.add(outer);

    // Orbit rings
    const rMat = (op) => new THREE.MeshBasicMaterial({
      color:0x00d4ff, transparent:true, opacity:op
    });
    ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.2,.003,2,100), rMat(.1));
    ring1.rotation.x = Math.PI/2.5;
    scene.add(ring1);

    ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.7,.002,2,100), rMat(.05));
    ring2.rotation.x = Math.PI/4;
    ring2.rotation.z = Math.PI/5;
    scene.add(ring2);
  }

  function buildParticles() {
    const N = 5200;
    const pos = new Float32Array(N*3);
    for (let i=0; i<N; i++) {
      const r  = 2.4 + Math.random()*4;
      const th = Math.random()*Math.PI*2;
      const ph = Math.acos(2*Math.random()-1);
      pos[i*3]   = r*Math.sin(ph)*Math.cos(th);
      pos[i*3+1] = r*Math.sin(ph)*Math.sin(th);
      pos[i*3+2] = r*Math.cos(ph);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos,3));

    const cv = document.createElement('canvas');
    cv.width = cv.height = 24;
    const cx = cv.getContext('2d');
    const gd = cx.createRadialGradient(12,12,0,12,12,12);
    gd.addColorStop(0,'rgba(0,212,255,.9)');
    gd.addColorStop(.45,'rgba(0,150,210,.3)');
    gd.addColorStop(1,'rgba(0,0,0,0)');
    cx.fillStyle = gd; cx.fillRect(0,0,24,24);

    pts = new THREE.Points(geo, new THREE.PointsMaterial({
      size:.038, map:new THREE.CanvasTexture(cv),
      transparent:true, opacity:.55,
      depthWrite:false, blending:THREE.AdditiveBlending
    }));
    scene.add(pts);
  }

  function buildLights() {
    scene.add(new THREE.AmbientLight(0x00d4ff, .04));
    const p1 = new THREE.PointLight(0x00d4ff, 2, 20);
    p1.position.set(3,3,4); scene.add(p1);
    const p2 = new THREE.PointLight(0x0040aa, 1.2, 16);
    p2.position.set(-3,-2,-3); scene.add(p2);
  }

  function loop() {
    raf = requestAnimationFrame(loop);
    const t = clock.getElapsedTime();

    // Smooth mouse with gentle damping
    M.x += (M.tx - M.x) * .042;
    M.y += (M.ty - M.y) * .042;

    // Precise, constant angular velocity — mathematically stable
    const rx = t*.075 + M.y*.24;
    const ry = t*.11  + M.x*.24;

    core.rotation.x = rx; core.rotation.y = ry;
    shell.rotation.x = rx; shell.rotation.y = ry;
    outer.rotation.x = -t*.04; outer.rotation.y = t*.065;
    ring1.rotation.z = t*.06;
    ring2.rotation.z = -t*.04;

    if (pts) {
      pts.rotation.y = t*.022 + M.x*.035;
      pts.rotation.x = t*.011;
    }

    // Very subtle camera float
    camera.position.x += (M.x*.35 - camera.position.x)*.032;
    camera.position.y += (-M.y*.22 - camera.position.y)*.032;
    camera.lookAt(0,0,0);

    renderer.render(scene, camera);
  }

  return { init };
})();


/* ================================================================
   SCROLL REVEAL
   Key fix: items START visible, JS hides them then reveals on scroll
================================================================ */
const ScrollReveal = (() => {
  function init() {
    const els = document.querySelectorAll('.reveal');

    // First pass: hide all reveals that are below the fold
    els.forEach(el => {
      const rect = el.getBoundingClientRect();
      // Only hide if actually below visible area
      if (rect.top > window.innerHeight * 0.95) {
        el.classList.add('hidden');
      }
    });

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Small stagger based on sibling index
          const siblings = [...(entry.target.parentElement?.children || [])].filter(c => c.classList.contains('reveal'));
          const idx = siblings.indexOf(entry.target);
          const delay = Math.min(idx * 80, 320);
          entry.target.style.transitionDelay = delay + 'ms';
          entry.target.classList.remove('hidden');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

    els.forEach(el => {
      if (el.classList.contains('hidden')) io.observe(el);
    });
  }
  return { init };
})();


/* ================================================================
   NAV — solid background on scroll
================================================================ */
const Nav = (() => {
  function init() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    const onScroll = () => nav.classList.toggle('solid', window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }
  return { init };
})();


/* ================================================================
   KALIX TERMINAL — realistic typewriter
================================================================ */
const Terminal = (() => {
  const LINES = [
    { dim: '──────────────────────────────────────────' },
    { txt: 'KALIX v1.0 — Hardware Intelligence Engine' },
    { txt: 'Aotsuki Engineering Collective · 2025' },
    { dim: '──────────────────────────────────────────' },
    { p: true, txt: 'Initialising kernel interface bridge...' },
    { p: true, ok:true, txt: 'Ring-0 bridge: ESTABLISHED' },
    { p: true, ok:true, txt: 'Thread pool (4 workers): ACTIVE' },
    { dim: '──────────────────────────────────────────' },
    { p: true, txt: 'Phase 1 — Component Enumeration' },
    { p: true, ok:true, txt: 'CPU    Intel i9-13900K  20T/12C     [VERIFIED ✓]' },
    { p: true, ok:true, txt: 'MEM[0] SK Hynix 32GB DDR5-6000      [SN MATCH ✓]' },
    { p: true, ok:true, txt: 'MEM[1] SK Hynix 32GB DDR5-6000      [SN MATCH ✓]' },
    { p: true, ok:true, txt: 'GPU    NVIDIA RTX 4090 24GB          [CLEAN ✓]' },
    { p: true, ok:true, txt: 'SSD[0] Samsung 990 Pro 2TB NVMe      [CLEAN ✓]' },
    { p: true, ok:true, txt: 'MOBO   ASUS ROG MAXIMUS Z790         [BIOS v3.4]' },
    { dim: '──────────────────────────────────────────' },
    { p: true, txt: 'Phase 2 — Thermal Intelligence' },
    { p: true, ok:true, txt: 'CPU die    42°C  TDP headroom: 67%' },
    { p: true, ok:true, txt: 'GPU core   38°C  Fan: 24%' },
    { p: true, ok:true, txt: 'VRM zone   51°C  Nominal' },
    { p: true, ok:true, txt: 'Throttle events (60s window): 0' },
    { dim: '──────────────────────────────────────────' },
    { p: true, txt: 'Phase 3 — Integrity Verification' },
    { p: true, ok:true, txt: 'Serial cross-ref: 5/5 MATCHED' },
    { p: true, ok:true, txt: 'Firmware signatures: ALL VALID' },
    { p: true, ok:true, txt: 'SHA-256 manifest: WRITTEN' },
    { dim: '──────────────────────────────────────────' },
    { done: true, txt: 'AUDIT COMPLETE — 0.38ms' },
  ];

  let busy = false;

  function run(el) {
    if (busy) return;
    busy = true;
    el.innerHTML = '';

    LINES.forEach((l, i) => {
      setTimeout(() => {
        const d = document.createElement('div');
        d.className = 'tl tin';
        d.style.animationDelay = '0s';

        if (l.done) {
          d.innerHTML = `<span class="tp">&gt;</span> <span class="tdone">${l.txt} <span class="tcur">█</span></span>`;
        } else if (l.dim) {
          d.className = 'tl tin tdim';
          d.textContent = l.dim;
        } else if (l.p) {
          const cls = l.ok ? 'tok' : '';
          d.innerHTML = `<span class="tp">&gt;</span> <span class="${cls}">${l.txt}</span>`;
        } else {
          d.className = 'tl tin tdim';
          d.textContent = l.txt;
        }

        el.appendChild(d);
        el.scrollTop = el.scrollHeight;
        if (i === LINES.length - 1) {
          setTimeout(() => { busy = false; }, 10000);
        }
      }, i * 100 + 400);
    });
  }

  function init() {
    const el = document.getElementById('term');
    if (!el) return;

    // Run once immediately if visible, otherwise on enter
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) run(el); });
    }, { threshold: 0.2 });
    io.observe(el);
  }
  return { init };
})();


/* ================================================================
   BOOT — run everything
================================================================ */
function boot() {
  Nexus.init();
  Nav.init();
  ScrollReveal.init();
  Terminal.init();
}

document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', boot)
  : boot();