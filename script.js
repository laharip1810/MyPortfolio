/* ═══════════════════════════════════════════════════════════════
   PULLURU LAHARI — Portfolio JavaScript
   Sections: Navbar | Scroll Progress | Typed Text | Fade Animations
             Skill Bars | Achievement Counters | Modals | Contact Form
═══════════════════════════════════════════════════════════════ */

/* ─── DOMContentLoaded ───────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  initNavbar();
  initHamburger();
  initScrollProgress();
  initTyped();
  initFadeObserver();
  initSkillBars();
  initCounters();
  initContactForm();
  setFooterYear();

});

/* ═══════════════════════════════════════════════════════════
   1. NAVBAR — sticky + scroll class
═══════════════════════════════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Smooth close on mobile nav click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const navList = document.getElementById('nav-links');
      const ham = document.getElementById('hamburger');
      navList.classList.remove('open');
      ham.classList.remove('open');
    });
  });

  // Active link highlight on scroll
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  sections.forEach(s => observer.observe(s));
}

/* ═══════════════════════════════════════════════════════════
   2. HAMBURGER MENU
═══════════════════════════════════════════════════════════ */
function initHamburger() {
  const ham = document.getElementById('hamburger');
  const navList = document.getElementById('nav-links');

  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    navList.classList.toggle('open');
  });
}

/* ═══════════════════════════════════════════════════════════
   3. SCROLL PROGRESS BAR
═══════════════════════════════════════════════════════════ */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');

  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    bar.style.width = pct + '%';
  });
}

/* ═══════════════════════════════════════════════════════════
   4. TYPED TEXT EFFECT
   ✏️ EDIT: Change the phrases array to customize typewriter text
═══════════════════════════════════════════════════════════ */
function initTyped() {
  const el = document.getElementById('typed');
  if (!el) return;

  // ✏️ EDIT: Add or remove typing phrases
  const phrases = [
    'Data Structures & Algorithms',
    'Full Stack Development',
    'Problem Solving',
    'Building Scalable Systems',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 80;
  const deleteSpeed = 45;
  const pauseBetween = 1800;

  function type() {
    const current = phrases[phraseIndex];
    const displayed = isDeleting
      ? current.substring(0, charIndex - 1)
      : current.substring(0, charIndex + 1);

    el.textContent = displayed;
    isDeleting ? charIndex-- : charIndex++;

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === current.length) {
      delay = pauseBetween;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  setTimeout(type, 600);
}

/* ═══════════════════════════════════════════════════════════
   5. SCROLL FADE-IN ANIMATIONS
═══════════════════════════════════════════════════════════ */
function initFadeObserver() {
  const items = document.querySelectorAll('.fade-up');

  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings
          const siblings = entry.target.parentElement.querySelectorAll('.fade-up:not(.visible)');
          let delay = 0;
          siblings.forEach(sib => {
            if (sib === entry.target || entry.target.contains(sib)) {
              setTimeout(() => sib.classList.add('visible'), delay);
              delay += 80;
            }
          });
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
  );

  items.forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════════════════════
   6. ANIMATED SKILL BARS
═══════════════════════════════════════════════════════════ */
function initSkillBars() {
  const skillItems = document.querySelectorAll('.skill-item');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const item = entry.target;
          const pct = item.dataset.percent || 0;
          const fill = item.querySelector('.skill-fill');
          if (fill) {
            requestAnimationFrame(() => {
              fill.style.width = pct + '%';
            });
          }
          observer.unobserve(item);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillItems.forEach(item => observer.observe(item));
}

/* ═══════════════════════════════════════════════════════════
   7. ACHIEVEMENT COUNTERS
═══════════════════════════════════════════════════════════ */
function initCounters() {
  const counters = document.querySelectorAll('.ach-counter');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1600;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }

  requestAnimationFrame(update);
}

/* ═══════════════════════════════════════════════════════════
   8. PROJECT MODALS
   openModal() / closeModal() — called from HTML onclick
═══════════════════════════════════════════════════════════ */
const MODAL_ICONS = {
  'PawPulse':            'fa-paw',
  'E-Commerce App':      'fa-shopping-cart',
  'News Classifier':     'fa-newspaper',
  'Restaurant Website':  'fa-utensils',
};

function openModal(card) {
  const overlay  = document.getElementById('project-modal');
  const title    = card.dataset.title    || 'Project';
  const desc     = card.dataset.desc     || '';
  const tech     = card.dataset.tech     || '';
  const live     = card.dataset.live     || '';
  const github   = card.dataset.github   || '';

  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-desc').textContent  = desc;

  // Icon
  const iconEl = document.getElementById('modal-icon');
  const iconClass = MODAL_ICONS[title] || 'fa-cube';
  iconEl.className = `fas ${iconClass}`;

  // Tech chips
  const techEl = document.getElementById('modal-tech');
  techEl.innerHTML = tech
    .split(',')
    .map(t => `<span>${t.trim()}</span>`)
    .join('');

  // Action buttons
  const actionsEl = document.getElementById('modal-actions');
  actionsEl.innerHTML = '';
  if (live) {
    const a = document.createElement('a');
    a.href = live; a.target = '_blank';
    a.className = 'modal-link-live';
    a.innerHTML = '<i class="fas fa-external-link-alt"></i> Live Demo';
    actionsEl.appendChild(a);
  }
  if (github) {
    const a = document.createElement('a');
    a.href = github; a.target = '_blank';
    a.className = 'modal-link-gh';
    a.innerHTML = '<i class="fab fa-github"></i> View Code';
    actionsEl.appendChild(a);
  }

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('project-modal');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Close on overlay backdrop click
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('project-modal');
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
});

/* ═══════════════════════════════════════════════════════════
   9. CONTACT FORM (Frontend UI — no backend)
═══════════════════════════════════════════════════════════ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const note = document.getElementById('form-note');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name    = form.querySelector('#name').value.trim();
    const email   = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      note.textContent = 'Please fill in all required fields.';
      note.style.color = '#c9676a';
      return;
    }

    // ✏️ EDIT: Replace with your form submission logic (Formspree, EmailJS, etc.)
    // Example Formspree: fetch('https://formspree.io/f/YOUR_ID', { method: 'POST', body: new FormData(form) })

    note.textContent = '✓ Message received! I\'ll be in touch soon.';
    note.style.color = '#7a8faa';
    form.reset();

    setTimeout(() => { note.textContent = ''; }, 5000);
  });
}

/* ═══════════════════════════════════════════════════════════
   10. FOOTER YEAR
═══════════════════════════════════════════════════════════ */
function setFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ═══════════════════════════════════════════════════════════
   11. HERO SECTION ENTRANCE ANIMATION
═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(28px)';
    setTimeout(() => {
      heroContent.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 150);
  }
});
