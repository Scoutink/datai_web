export function renderJumpMap({ chapters, onJump, onClose }) {
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.innerHTML = `<div class="overlay-card" role="dialog" aria-modal="true" aria-label="Jump Map">
    <h2>Jump Map</h2>
    <div class="jump-grid">${chapters.map((ch) => `
      <button class="btn card jump-card" data-id="${ch.id}"><strong>${ch.num}</strong> ${ch.icon}<br>${ch.title}</button>`).join('')}</div>
  </div>`;

  function close() { overlay.remove(); onClose(); }
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  overlay.querySelectorAll('[data-id]').forEach((b) => b.addEventListener('click', () => { onJump(b.dataset.id); close(); }));
  const onKey = (e) => { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); } };
  document.addEventListener('keydown', onKey);
  return overlay;
}
