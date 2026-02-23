(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const nodes = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -60px 0px' });
  nodes.forEach((node) => {
    if (node.classList.contains('reveal-stagger')) {
      [...node.children].forEach((child, i) => child.style.setProperty('--i', i));
    }
    io.observe(node);
  });
})();
