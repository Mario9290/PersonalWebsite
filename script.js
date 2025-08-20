// Smooth scrolling + active nav + mobile menu + reveal animations + progress bar

// Smooth scroll for internal links
function scrollToHash(hash) {
  const el = document.querySelector(hash);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (href.length > 1) {
      e.preventDefault();
      scrollToHash(href);
      // close mobile nav if open
      closeMobileNav();
    }
  });
});

// Brand button shortcut
document.querySelectorAll('[data-scroll-to]').forEach(btn => {
  btn.addEventListener('click', () => scrollToHash(btn.getAttribute('data-scroll-to')));
});

// Mobile nav toggle
const toggleBtn = document.querySelector(".nav-toggle");
const nav = document.getElementById("site-nav");

function openMobileNav(){
  nav.classList.add("open");
  toggleBtn.setAttribute("aria-expanded", "true");
}
function closeMobileNav(){
  nav.classList.remove("open");
  toggleBtn.setAttribute("aria-expanded", "false");
}
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
    expanded ? closeMobileNav() : openMobileNav();
  });
}

// Active nav link highlight using IntersectionObserver
const sections = ["home","about","projects","experience","skills","resume","contact"]
  .map(id => document.getElementById(id))
  .filter(Boolean);

const navLinks = Array.from(document.querySelectorAll(".site-nav .nav-link"));
const byHash = hash => navLinks.find(a => a.getAttribute("href") === hash);

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const link = byHash(`#${entry.target.id}`);
      if (!link) return;
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    }
  });
}, { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 });

sections.forEach(sec => io.observe(sec));

// Reveal animations
const revealEls = document.querySelectorAll(".reveal-up");
const revealIO = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      obs.unobserve(entry.target); // reveal once
    }
  });
}, { threshold: 0.08, rootMargin: "0px 0px -5% 0px" });

revealEls.forEach(el => revealIO.observe(el));

// Scroll progress bar
const progress = document.querySelector(".scroll-progress span");
function onScroll() {
  const scrolled = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const pct = Math.min(100, Math.max(0, (scrolled / height) * 100));
  if (progress) progress.style.width = pct + "%";
}
window.addEventListener("scroll", onScroll);
onScroll();

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();