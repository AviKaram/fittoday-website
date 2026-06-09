/* FitToday — Shared JavaScript
   Handles mobile nav, scroll reveal, count-up stats, and newsletter form.
   This file is included on every page. */

// Mobile nav
const hamburger = document.getElementById('hamburger');
const mobileNav  = document.getElementById('mobileNav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => mobileNav.classList.toggle('open'));
}
function closeMobile() {
  if (mobileNav) mobileNav.classList.remove('open');
}

// Scroll reveal
const reveals    = document.querySelectorAll('.reveal');
const revealObs  = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.08 });
reveals.forEach(el => revealObs.observe(el));
setTimeout(() => document.querySelectorAll('#hero .reveal').forEach(el => el.classList.add('visible')), 80);

// Count-up stat animation (used on homepage hero)
const countObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && e.target.dataset.count) {
      const target = parseInt(e.target.dataset.count);
      const suffix = e.target.dataset.suffix || '';
      const start  = performance.now();
      const dur    = 1800;
      (function tick(now) {
        const p   = Math.min((now - start) / dur, 1);
        const val = Math.floor((1 - Math.pow(1 - p, 3)) * target);
        e.target.textContent = val >= 1000 ? (val / 1000).toFixed(0) + 'K' + suffix : val + suffix;
        if (p < 1) requestAnimationFrame(tick);
      })(performance.now());
      countObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));
