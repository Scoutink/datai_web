(function () {
  const trigger = document.getElementById('jump-trigger');
  const panel = document.getElementById('jump-panel');
  trigger?.addEventListener('click', () => panel.classList.toggle('open'));
  document.addEventListener('click', (e) => {
    if (!document.getElementById('jump-nav')?.contains(e.target)) panel?.classList.remove('open');
    if (e.target.closest('.jump-item')) panel?.classList.remove('open');
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') panel?.classList.remove('open'); });

  const switcher = document.querySelector('[data-switcher]');
  if (switcher) {
    const cards = [...switcher.querySelectorAll('.switcher-card')];
    const detail = switcher.querySelector('.switcher-detail');
    function activate(card) {
      cards.forEach((c) => c.classList.toggle('active', c === card));
      detail.textContent = card.dataset.detail;
    }
    cards.forEach((card) => card.addEventListener('click', () => activate(card)));
    activate(cards[0]);
  }

})();
