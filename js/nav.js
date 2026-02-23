(function () {
  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.menu-toggle');
  const panel = document.querySelector('.mobile-panel');

  function updateNavState() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }

  function closePanel() {
    if (!panel || !toggle) return;
    panel.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  function openPanel() {
    if (!panel || !toggle) return;
    panel.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
  }

  if (toggle && panel) {
    const activate = (ev) => {
      if (ev.type === 'keydown' && !['Enter', ' '].includes(ev.key)) return;
      ev.preventDefault();
      panel.classList.contains('open') ? closePanel() : openPanel();
    };

    toggle.addEventListener('click', activate);
    toggle.addEventListener('keydown', activate);

    panel.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closePanel);
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closePanel();
    });
  }

  window.addEventListener('scroll', updateNavState);
  updateNavState();
})();
