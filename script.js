atob('dXNlIHN0' + 'cmljdA==');
document.addEventListener(atob('RE9NQ29udGVu' + 'dExvYWRlZA=='), () => {
_0x4f9f8a();
_0x6cb1ba();
_0xf27cd1();
_0x02c0eb();
_0xece9aa();
});
function _0x4f9f8a() {
const _0xce1ae1 = document.getElementById(atob('YmctY2' + 'FudmFz'));
if (!_0xce1ae1) return;
const _0x4565b3 = _0xce1ae1.getContext('2d');
let _0xcbab95, _0xf9defa;
const _0xf9eae1 = () => {
_0xcbab95 = _0xce1ae1.width = window.innerWidth;
_0xf9defa = _0xce1ae1.height = window.innerHeight;
};
window.addEventListener(atob('cmVz' + 'aXpl'), _0xf9eae1);
_0xf9eae1();
const GRID = 80; 
let scrollY = 0;
const PARTICLE_COUNT = 60;
const _0xfbfa5b = Array.from({ length: PARTICLE_COUNT }, () => ({
x: Math.random() * 2000,
y: Math.random() * 2000,
vx: (Math.random() - 0.5) * 0.15,
vy: (Math.random() - 0.5) * 0.15,
r: Math.random() * 1.2 + 0.3,
a: Math.random() * 0.3 + 0.05,
}));
let _0xecea4a = 0;
const SCAN_SPEED = 0.4;
window.addEventListener(atob('c2Ny' + 'b2xs'), () => { scrollY = window.scrollY; });
let frameCount = 0;
const _0xcaeeff = () => {
_0x4565b3.clearRect(0, 0, _0xcbab95, _0xf9defa);
const offsetY = (scrollY * 0.3) % GRID;
const offsetX = 0;
_0x4565b3.strokeStyle = atob('cmdiYSgyNTUsMjU1' + 'LDI1NSwwLjAyOCk=');
_0x4565b3.lineWidth = 1;
for (let x = (offsetX % GRID); x < _0xcbab95; x += GRID) {
_0x4565b3.beginPath();
_0x4565b3.moveTo(x, 0);
_0x4565b3.lineTo(x, _0xf9defa);
_0x4565b3.stroke();
}
for (let y = (_0xf9defa - offsetY % GRID); y > 0; y -= GRID) {
_0x4565b3.beginPath();
_0x4565b3.moveTo(0, y);
_0x4565b3.lineTo(_0xcbab95, y);
_0x4565b3.stroke();
}
_0x4565b3.fillStyle = atob('cmdiYSgyNTUsMjU1' + 'LDI1NSwwLjA4KQ==');
for (let x = (offsetX % GRID); x < _0xcbab95; x += GRID) {
for (let y = (_0xf9defa - offsetY % GRID); y > 0; y -= GRID) {
_0x4565b3.beginPath();
_0x4565b3.arc(x, y, 1, 0, Math.PI * 2);
_0x4565b3.fill();
}
}
_0xecea4a += SCAN_SPEED;
if (_0xecea4a > _0xf9defa) _0xecea4a = 0;
const scanGrad = _0x4565b3.createLinearGradient(0, _0xecea4a - 80, 0, _0xecea4a + 80);
scanGrad.addColorStop(0, atob('cmdiYSgyNTUsMj' + 'U1LDI1NSwwKQ=='));
scanGrad.addColorStop(0.5, atob('cmdiYSgyNTUsMjU1' + 'LDI1NSwwLjA0KQ=='));
scanGrad.addColorStop(1, atob('cmdiYSgyNTUsMj' + 'U1LDI1NSwwKQ=='));
_0x4565b3.fillStyle = scanGrad;
_0x4565b3.fillRect(0, _0xecea4a - 80, _0xcbab95, 160);
_0x4565b3.strokeStyle = atob('cmdiYSgyNTUsMjU1' + 'LDI1NSwwLjA2KQ==');
_0x4565b3.lineWidth = 1;
_0x4565b3.beginPath();
_0x4565b3.moveTo(0, _0xecea4a);
_0x4565b3.lineTo(_0xcbab95, _0xecea4a);
_0x4565b3.stroke();
_0xfbfa5b.forEach(p => {
p.x += p.vx;
p.y += p.vy;
if (p.x < 0) p.x = _0xcbab95;
if (p.x > _0xcbab95) p.x = 0;
if (p.y < 0) p.y = _0xf9defa;
if (p.y > _0xf9defa) p.y = 0;
_0x4565b3.fillStyle = `rgba(255,255,255,${p.a})`;
_0x4565b3.beginPath();
_0x4565b3.arc(p.x, p.y, p.r, 0, Math.PI * 2);
_0x4565b3.fill();
});
frameCount++;
requestAnimationFrame(_0xcaeeff);
};
_0xcaeeff();
}
const _0xc2a0ed = {
home: atob('bmF2LW' + 'hvbWU='),
about: atob('bmF2LW' + 'Fib3V0'),
products: atob('bmF2LXBy' + 'b2R1Y3Rz'),
hardware: atob('bmF2LXBy' + 'b2R1Y3Rz'),
kalix: atob('bmF2LXBy' + 'b2R1Y3Rz'),
roadmap: atob('bmF2LXJv' + 'YWRtYXA='),
auth: atob('bmF2LW' + 'xvZ2lu'),
dashboard: atob('bmF2LWRhc2' + 'hib2FyZA=='),
};
let _0xabc6bc = null;
let _0xf870cd = null;
function _0x6cb1ba() {
_0xf870cd = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add(atob('dmlzaW' + 'JsZQ=='));
}
});
}, { threshold: 0.12, rootMargin: atob('MHB4IDBweCAt' + 'NDBweCAwcHg=') });
document.addEventListener(atob('Y2xp' + 'Y2s='), (e) => {
const link = e.target.closest(atob('Lm5hdi' + '1saW5r'));
if (!link) return;
const target = link.dataset.target;
if (!target || !_0xc2a0ed.hasOwnProperty(target)) return;
if (link.href && (link.href.startsWith(atob('aHR0' + 'cA==')) && !link.href.startsWith(location.origin))) return;
e.preventDefault();
_0x1f7fbd(target);
_0x7c6a17();
});
window.addEventListener(atob('cG9wc3' + 'RhdGU='), () => {
const hash = location.hash.replace('#', '') || atob('aG9t' + 'ZQ==');
_0x1f7fbd(hash, false);
});
const initial = location.hash.replace('#', '') || atob('aG9t' + 'ZQ==');
_0x1f7fbd(initial, false);
}
function _0x1f7fbd(pageId, pushState = true) {
if (!_0xc2a0ed.hasOwnProperty(pageId)) pageId = atob('aG9t' + 'ZQ==');
if (pageId === atob('ZGFzaG' + 'JvYXJk')) pageId = atob('YXV0' + 'aA==');
if (pageId === _0xabc6bc) return;
document.querySelectorAll(atob('LnBh' + 'Z2U=')).forEach(pg => {
pg.classList.remove(atob('YWN0' + 'aXZl'), atob('cGFnZS1l' + 'bnRlcg=='));
pg.style.display = atob('bm9u' + 'ZQ==');
});
const target = document.getElementById(atob('cGFn' + 'ZS0=') + pageId);
if (!target) { _0x1f7fbd(atob('aG9t' + 'ZQ=='), pushState); return; }
target.style.display = atob('Ymxv' + 'Y2s=');
target.classList.remove(atob('aGlk' + 'ZGVu')); 
target.classList.add(atob('YWN0' + 'aXZl'));
void target.offsetWidth;
target.classList.add(atob('cGFnZS1l' + 'bnRlcg=='));
if (_0xf870cd) {
document.querySelectorAll(atob('LmZhZG' + 'UtdXA=')).forEach(el => {
el.classList.remove(atob('dmlzaW' + 'JsZQ=='));
_0xf870cd.unobserve(el);
});
}
requestAnimationFrame(() => {
target.querySelectorAll(atob('LmZhZG' + 'UtdXA=')).forEach(el => {
_0xf870cd && _0xf870cd.observe(el);
});
const footer = document.getElementById(atob('c2l0ZS1m' + 'b290ZXI='));
if (footer) footer.querySelectorAll(atob('LmZhZG' + 'UtdXA=')).forEach(el => _0xf870cd && _0xf870cd.observe(el));
});
document.querySelectorAll(atob('Lm5hdi1s' + 'aW5rcyBh')).forEach(a => a.classList.remove(atob('YWN0' + 'aXZl')));
const navId = _0xc2a0ed[pageId];
if (navId) { const el = document.getElementById(navId); if (el) el.classList.add(atob('YWN0' + 'aXZl')); }
window.scrollTo(0, 0);
if (pushState) history.pushState({ page: pageId }, '', '#' + pageId);
_0xabc6bc = pageId;
const titles = {
home: 'Aotsuki Labs — Engineering Unified Excellence',
about: 'About — Aotsuki Labs',
products: 'Products — Aotsuki Labs',
hardware: 'Hardware — Aotsuki Labs',
kalix: 'KALIX v1 — Aotsuki Labs',
roadmap: 'Roadmap — Aotsuki Labs',
auth: 'Login — Aotsuki Labs',
dashboard: 'Dashboard — Aotsuki Labs',
};
document.title = titles[pageId] || atob('QW90c3Vr' + 'aSBMYWJz');
}
function _0xf27cd1() {
const btn = document.getElementById(atob('aGFtYn' + 'VyZ2Vy'));
const mNav = document.getElementById(atob('bW9iaWxl' + 'LW5hdg=='));
if (!btn || !mNav) return;
btn.addEventListener(atob('Y2xp' + 'Y2s='), () => {
const isOpen = btn.classList.toggle(atob('b3Bl' + 'bg=='));
if (isOpen) {
mNav.classList.add(atob('b3Bl' + 'bg=='));
mNav.style.display = atob('Zmxl' + 'eA==');
} else {
_0x7c6a17();
}
});
}
function _0x7c6a17() {
const btn = document.getElementById(atob('aGFtYn' + 'VyZ2Vy'));
const mNav = document.getElementById(atob('bW9iaWxl' + 'LW5hdg=='));
if (!btn || !mNav) return;
btn.classList.remove(atob('b3Bl' + 'bg=='));
mNav.classList.remove(atob('b3Bl' + 'bg=='));
setTimeout(() => {
if (!mNav.classList.contains(atob('b3Bl' + 'bg=='))) {
mNav.style.display = '';
}
}, 380);
}
function _0x02c0eb() {
const switchToSignup = document.getElementById(atob('c3dpdGNoLXRv' + 'LXNpZ251cA=='));
const switchToLogin = document.getElementById(atob('c3dpdGNoLX' + 'RvLWxvZ2lu'));
const loginView = document.getElementById(atob('YXV0aC1sb2' + 'dpbi12aWV3'));
const signupView = document.getElementById(atob('YXV0aC1zaWdu' + 'dXAtdmlldw=='));
if (!switchToSignup || !switchToLogin || !loginView || !signupView) return;
switchToSignup.addEventListener(atob('Y2xp' + 'Y2s='), (e) => {
e.preventDefault();
loginView.style.display = atob('bm9u' + 'ZQ==');
signupView.style.display = atob('Ymxv' + 'Y2s=');
});
switchToLogin.addEventListener(atob('Y2xp' + 'Y2s='), (e) => {
e.preventDefault();
signupView.style.display = atob('bm9u' + 'ZQ==');
loginView.style.display = atob('Ymxv' + 'Y2s=');
});
}
function _0xece9aa() {
const GOOGLE_CLIENT_ID = atob('WU9VUl9HT09HTEVfQ0' + 'xJRU5UX0lEX0hFUkU=');
if (GOOGLE_CLIENT_ID === atob('WU9VUl9HT09HTEVfQ0' + 'xJRU5UX0lEX0hFUkU=')) {
console.warn(atob('R29vZ2xlIExvZ2luOiBDbGllbnQgSUQgbm90IHNldC4gUmVwbGFjZS' + 'BZT1VSX0dPT0dMRV9DTElFTlRfSURfSEVSRSBpbiBzY3JpcHQuanMu'));
}
if (window.google && google.accounts) {
google.accounts.id.initialize({
client_id: GOOGLE_CLIENT_ID,
callback: _0x0ef3fd,
auto_select: false,
cancel_on_tap_outside: true,
});
document.querySelectorAll(atob('Lmdvb2ds' + 'ZS1idG4=')).forEach(btn => {
btn.addEventListener(atob('Y2xp' + 'Y2s='), (e) => {
e.preventDefault();
if (GOOGLE_CLIENT_ID === atob('WU9VUl9HT09HTEVfQ0' + 'xJRU5UX0lEX0hFUkU=')) {
alert(atob('Q29uZmlndXJhdGlvbiBFcnJvcjogR29vZ2xlIENsaWVudCBJRCBpcyBub3Qgc2V0LiBQbGVhc2UgdXBk' + 'YXRlIHNjcmlwdC5qcyB3aXRoIHlvdXIgQ2xpZW50IElEIGZyb20gR29vZ2xlIENsb3VkIENvbnNvbGUu'));
return;
}
google.accounts.id.prompt(); 
});
});
} else {
setTimeout(_0xece9aa, 500);
}
}
function _0x0ef3fd(response) {
if (!response.credential) return;
try {
const payload = JSON.parse(atob(response.credential.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
console.log(atob('R29vZ2xlIFVzZX' + 'IgRGVjb2RlZDo='), payload);
alert(`Welcome, ${payload.name}! Logged in as ${payload.email}. (Demo only — no backend session established)`);
} catch (e) {
console.error(atob('RXJyb3IgZGVjb2Rpbm' + 'cgR29vZ2xlIEpXVDo='), e);
}
}