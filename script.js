/* ======== script.js ======== */
/* Effets modernes sans changer tes couleurs ===== */

/* --- Effet : header devient compact au scroll --- */
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

/* --- Apparition douce au défilement --- */
const revealElements = document.querySelectorAll('.intro, .welcome-section');

const revealOnScroll = () => {
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

/* --- Formulaire contact : message de confirmation --- */
const contactForm = document.getElementById('contactForm');
const confirmation = document.getElementById('confirmationMessage');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    if (confirmation) confirmation.style.display = 'block';
    contactForm.reset();
  });
}

// ====== MENU ACTIVE ANIMATION ======
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function() {
    document.querySelectorAll("nav a").forEach(a => a.classList.remove("active"));
    this.classList.add("active");
  });
});

// ====== FADE-IN EFFECT ON SCROLL ======
const faders = document.querySelectorAll(".content-box, .intro, .cours-section");
const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("appear");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// ====== SMOOTH SCROLL TO TOP BUTTON ======
const scrollBtn = document.createElement("button");
scrollBtn.innerHTML = "↑";
scrollBtn.className = "scroll-top-btn";
document.body.appendChild(scrollBtn);

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 200 ? "block" : "none";
});
