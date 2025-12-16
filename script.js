// Smooth scroll + "slide down" entrance via IntersectionObserver
document.addEventListener('DOMContentLoaded', () => {
  // set year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // nav button scrolling
  document.querySelectorAll('.navbtn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.target;
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  // next buttons
  document.querySelectorAll('.next').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  // reveal animations for elements with .anim
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, {threshold: 0.18});

  document.querySelectorAll('.anim').forEach(el => observer.observe(el));

  // Update active nav button while scrolling
  const sections = Array.from(document.querySelectorAll('.snap-section'));
  const navButtons = Array.from(document.querySelectorAll('.navbtn'));
  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const btn = navButtons.find(b => b.dataset.target === id);
      if (entry.isIntersecting) {
        navButtons.forEach(n => n.classList.remove('active'));
        if (btn) btn.classList.add('active');
      }
    });
  }, {threshold: 0.5});
  sections.forEach(s => activeObserver.observe(s));

  // keyboard accessibility: allow Enter on next buttons
  document.querySelectorAll('.next').forEach(b => {
    b.addEventListener('keyup', (e) => {
      if (e.key === 'Enter' || e.key === ' ') b.click();
    });
  });
});
