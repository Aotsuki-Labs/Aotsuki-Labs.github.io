atob('dXNlIHN0' + 'cmljdA==');
document.addEventListener(atob('RE9NQ29udGVu' + 'dExvYWRlZA=='), () => {
_0xefd34b();
_0xcc0ad8();
_0x6b8cce();
_0xac8f4e();
_0x381b7e();
});
function _0xefd34b() {
const _0xbcf6a0 = document.getElementById(atob('YmctY2' + 'FudmFz'));
if (!_0xbcf6a0) return;
const _0xe1a31a = _0xbcf6a0.getContext('2d');
let _0x2843ea, _0xa8a5de;
const _0xaddde8 = () => {
_0x2843ea = _0xbcf6a0.width = window.innerWidth;
_0xa8a5de = _0xbcf6a0.height = window.innerHeight;
};
window.addEventListener(atob('cmVz' + 'aXpl'), _0xaddde8);
_0xaddde8();
const GRID = 80; 
let scrollY = 0;
const PARTICLE_COUNT = 60;
const _0x8e828e = Array.from({ length: PARTICLE_COUNT }, () => ({
x: Math.random() * 2000,
y: Math.random() * 2000,
vx: (Math.random() - 0.5) * 0.15,
vy: (Math.random() - 0.5) * 0.15,
r: Math.random() * 1.2 + 0.3,
a: Math.random() * 0.3 + 0.05,
}));
let _0xd126fd = 0;
const SCAN_SPEED = 0.4;
window.addEventListener(atob('c2Ny' + 'b2xs'), () => { scrollY = window.scrollY; });
let frameCount = 0;
const _0xbecfbe = () => {
_0xe1a31a.clearRect(0, 0, _0x2843ea, _0xa8a5de);
const offsetY = (scrollY * 0.3) % GRID;
const offsetX = 0;
_0xe1a31a.strokeStyle = atob('cmdiYSgyNTUsMjU1' + 'LDI1NSwwLjAyOCk=');
_0xe1a31a.lineWidth = 1;
for (let x = (offsetX % GRID); x < _0x2843ea; x += GRID) {
_0xe1a31a.beginPath();
_0xe1a31a.moveTo(x, 0);
_0xe1a31a.lineTo(x, _0xa8a5de);
_0xe1a31a.stroke();
}
for (let y = (_0xa8a5de - offsetY % GRID); y > 0; y -= GRID) {
_0xe1a31a.beginPath();
_0xe1a31a.moveTo(0, y);
_0xe1a31a.lineTo(_0x2843ea, y);
_0xe1a31a.stroke();
}
_0xe1a31a.fillStyle = atob('cmdiYSgyNTUsMjU1' + 'LDI1NSwwLjA4KQ==');
for (let x = (offsetX % GRID); x < _0x2843ea; x += GRID) {
for (let y = (_0xa8a5de - offsetY % GRID); y > 0; y -= GRID) {
_0xe1a31a.beginPath();
_0xe1a31a.arc(x, y, 1, 0, Math.PI * 2);
_0xe1a31a.fill();
}
}
_0xd126fd += SCAN_SPEED;
if (_0xd126fd > _0xa8a5de) _0xd126fd = 0;
const scanGrad = _0xe1a31a.createLinearGradient(0, _0xd126fd - 80, 0, _0xd126fd + 80);
scanGrad.addColorStop(0, atob('cmdiYSgyNTUsMj' + 'U1LDI1NSwwKQ=='));
scanGrad.addColorStop(0.5, atob('cmdiYSgyNTUsMjU1' + 'LDI1NSwwLjA0KQ=='));
scanGrad.addColorStop(1, atob('cmdiYSgyNTUsMj' + 'U1LDI1NSwwKQ=='));
_0xe1a31a.fillStyle = scanGrad;
_0xe1a31a.fillRect(0, _0xd126fd - 80, _0x2843ea, 160);
_0xe1a31a.strokeStyle = atob('cmdiYSgyNTUsMjU1' + 'LDI1NSwwLjA2KQ==');
_0xe1a31a.lineWidth = 1;
_0xe1a31a.beginPath();
_0xe1a31a.moveTo(0, _0xd126fd);
_0xe1a31a.lineTo(_0x2843ea, _0xd126fd);
_0xe1a31a.stroke();
_0x8e828e.forEach(p => {
p.x += p.vx;
p.y += p.vy;
if (p.x < 0) p.x = _0x2843ea;
if (p.x > _0x2843ea) p.x = 0;
if (p.y < 0) p.y = _0xa8a5de;
if (p.y > _0xa8a5de) p.y = 0;
_0xe1a31a.fillStyle = `rgba(255,255,255,${p.a})`;
_0xe1a31a.beginPath();
_0xe1a31a.arc(p.x, p.y, p.r, 0, Math.PI * 2);
_0xe1a31a.fill();
});
frameCount++;
requestAnimationFrame(_0xbecfbe);
};
_0xbecfbe();
}
const _0xf4dcb4 = {
home: atob('bmF2LW' + 'hvbWU='),
about: atob('bmF2LW' + 'Fib3V0'),
products: atob('bmF2LXBy' + 'b2R1Y3Rz'),
hardware: atob('bmF2LXBy' + 'b2R1Y3Rz'),
kalix: atob('bmF2LXBy' + 'b2R1Y3Rz'),
roadmap: atob('bmF2LXJv' + 'YWRtYXA='),
auth: atob('bmF2LW' + 'xvZ2lu'),
dashboard: atob('bmF2LWRhc2' + 'hib2FyZA=='),
};
let _0x6da5f7 = null;
let _0x977da9 = null;
function _0xcc0ad8() {
_0x977da9 = new IntersectionObserver((entries) => {
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
if (!target || !_0xf4dcb4.hasOwnProperty(target)) return;
if (link.href && (link.href.startsWith(atob('aHR0' + 'cA==')) && !link.href.startsWith(location.origin))) return;
e.preventDefault();
_0xdbecbb(target);
_0xdabafb();
});
window.addEventListener(atob('cG9wc3' + 'RhdGU='), () => {
const hash = location.hash.replace('#', '') || atob('aG9t' + 'ZQ==');
_0xdbecbb(hash, false);
});
const initial = location.hash.replace('#', '') || atob('aG9t' + 'ZQ==');
_0xdbecbb(initial, false);
}
function _0xdbecbb(pageId, pushState = true) {
if (!_0xf4dcb4.hasOwnProperty(pageId)) pageId = atob('aG9t' + 'ZQ==');
if (pageId === atob('ZGFzaG' + 'JvYXJk')) pageId = atob('YXV0' + 'aA==');
if (pageId === _0x6da5f7) return;
document.querySelectorAll(atob('LnBh' + 'Z2U=')).forEach(pg => {
pg.classList.remove(atob('YWN0' + 'aXZl'), atob('cGFnZS1l' + 'bnRlcg=='));
pg.style.display = atob('bm9u' + 'ZQ==');
});
const target = document.getElementById(atob('cGFn' + 'ZS0=') + pageId);
if (!target) { _0xdbecbb(atob('aG9t' + 'ZQ=='), pushState); return; }
target.style.display = atob('Ymxv' + 'Y2s=');
target.classList.remove(atob('aGlk' + 'ZGVu')); 
target.classList.add(atob('YWN0' + 'aXZl'));
void target.offsetWidth;
target.classList.add(atob('cGFnZS1l' + 'bnRlcg=='));
if (_0x977da9) {
document.querySelectorAll(atob('LmZhZG' + 'UtdXA=')).forEach(el => {
el.classList.remove(atob('dmlzaW' + 'JsZQ=='));
_0x977da9.unobserve(el);
});
}
requestAnimationFrame(() => {
target.querySelectorAll(atob('LmZhZG' + 'UtdXA=')).forEach(el => {
_0x977da9 && _0x977da9.observe(el);
});
const footer = document.getElementById(atob('c2l0ZS1m' + 'b290ZXI='));
if (footer) footer.querySelectorAll(atob('LmZhZG' + 'UtdXA=')).forEach(el => _0x977da9 && _0x977da9.observe(el));
});
document.querySelectorAll(atob('Lm5hdi1s' + 'aW5rcyBh')).forEach(a => a.classList.remove(atob('YWN0' + 'aXZl')));
const navId = _0xf4dcb4[pageId];
if (navId) { const el = document.getElementById(navId); if (el) el.classList.add(atob('YWN0' + 'aXZl')); }
window.scrollTo(0, 0);
if (pushState) history.pushState({ page: pageId }, '', '#' + pageId);
_0x6da5f7 = pageId;
const titles = {
home: atob('QW90c3VraSBMYWJzIFx1MjAxNCBFbmdpbm' + 'VlcmluZyBVbmlmaWVkIEV4Y2VsbGVuY2U='),
about: atob('QWJvdXQgXHUyMDE0IE' + 'FvdHN1a2kgTGFicw=='),
products: atob('UHJvZHVjdHMgXHUyMDE0' + 'IEFvdHN1a2kgTGFicw=='),
hardware: atob('SGFyZHdhcmUgXHUyMDE0' + 'IEFvdHN1a2kgTGFicw=='),
kalix: atob('S0FMSVggdjEgXHUyMDE0' + 'IEFvdHN1a2kgTGFicw=='),
roadmap: atob('Um9hZG1hcCBcdTIwMT' + 'QgQW90c3VraSBMYWJz'),
auth: atob('TG9naW4gXHUyMDE0IE' + 'FvdHN1a2kgTGFicw=='),
dashboard: atob('RGFzaGJvYXJkIFx1MjAx' + 'NCBBb3RzdWtpIExhYnM='),
};
document.title = titles[pageId] || atob('QW90c3Vr' + 'aSBMYWJz');
}
function _0x6b8cce() {
const btn = document.getElementById(atob('aGFtYn' + 'VyZ2Vy'));
const mNav = document.getElementById(atob('bW9iaWxl' + 'LW5hdg=='));
if (!btn || !mNav) return;
btn.addEventListener(atob('Y2xp' + 'Y2s='), () => {
const isOpen = btn.classList.toggle(atob('b3Bl' + 'bg=='));
if (isOpen) {
mNav.classList.add(atob('b3Bl' + 'bg=='));
mNav.style.display = atob('Zmxl' + 'eA==');
} else {
_0xdabafb();
}
});
}
function _0xdabafb() {
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
function _0xac8f4e() {
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
function _0x381b7e() {
const GOOGLE_CLIENT_ID = atob('WU9VUl9HT09HTEVfQ0' + 'xJRU5UX0lEX0hFUkU=');
if (GOOGLE_CLIENT_ID === atob('WU9VUl9HT09HTEVfQ0' + 'xJRU5UX0lEX0hFUkU=')) {
console.warn(atob('R29vZ2xlIExvZ2luOiBDbGllbnQgSUQgbm90IHNldC4gUmVwbGFjZS' + 'BZT1VSX0dPT0dMRV9DTElFTlRfSURfSEVSRSBpbiBzY3JpcHQuanMu'));
}
if (window.google && google.accounts) {
google.accounts.id.initialize({
client_id: GOOGLE_CLIENT_ID,
callback: _0x254905,
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
setTimeout(_0x381b7e, 500);
}
}
function _0x254905(response) {
if (!response.credential) return;
try {
const payload = JSON.parse(atob(response.credential.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
console.log(atob('R29vZ2xlIFVzZX' + 'IgRGVjb2RlZDo='), payload);
alert(`Welcome, ${payload.name}! Logged in as ${payload.email}. (Demo only — no backend session established)`);
} catch (e) {
console.error(atob('RXJyb3IgZGVjb2Rpbm' + 'cgR29vZ2xlIEpXVDo='), e);
}
}