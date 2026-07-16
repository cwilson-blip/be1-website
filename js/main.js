// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

// Active nav link
const path = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
});

// Registration payment (PayPal)
const registrationForm = document.getElementById('registration-form');
if (registrationForm) {
  registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const first = document.getElementById('r-first').value.trim();
    const last = document.getElementById('r-last').value.trim();
    const email = document.getElementById('r-email').value.trim();
    const phone = document.getElementById('r-phone').value.trim();
    const church = document.getElementById('r-church').value.trim();
    const group = document.getElementById('r-group').value;

    const params = new URLSearchParams({
      cmd: '_xclick',
      business: 'leishanorwood@gmail.com',
      item_name: 'Be1 Experience 2027 Registration',
      amount: '100.00',
      currency_code: 'USD',
      no_shipping: '1',
      first_name: first,
      last_name: last,
      email: email,
      custom: `Phone: ${phone} | Church: ${church} | Ambassador group: ${group}`,
      return: window.location.href,
      cancel_return: window.location.href
    });

    window.location.href = 'https://www.paypal.com/cgi-bin/webscr?' + params.toString();
  });
}

// Scroll reveal
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
}
