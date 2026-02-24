export function renderJumpMap({ chapters, onJump, onClose }) {
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.innerHTML = `<div class="overlay-card" role="dialog" aria-modal="true" aria-label="Jump Map" tabindex="-1">
    <h2>Jump to Chapter</h2>
    <div class="jump-grid">${chapters.map((ch) => `
      <button class="btn card jump-card" data-id="${ch.id}"><strong>${ch.num}</strong> ${ch.icon}<br>${ch.title}</button>`).join('')}</div>
  </div>`;

  const card = overlay.querySelector('.overlay-card');

  function close() {
    overlay.remove();
    document.removeEventListener('keydown', onKey);
    onClose();
  }

  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  card.addEventListener('click', (e) => e.stopPropagation());
  overlay.querySelectorAll('[data-id]').forEach((b) => b.addEventListener('click', () => { onJump(b.dataset.id); close(); }));

  const onKey = (e) => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onKey);
  setTimeout(() => card.focus(), 0);
  return overlay;
}
