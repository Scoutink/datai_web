export function openLightbox(media, onClose) {
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  const inner = media.type === 'video'
    ? `<video src="${media.src}" controls autoplay style="width:100%;max-height:78vh"></video>`
    : `<img src="${media.src}" alt="${media.caption || ''}" style="width:100%;max-height:78vh;object-fit:contain" onerror="this.replaceWith(document.createRange().createContextualFragment('<div class=\'placeholder\'>Media unavailable</div>'))">`;
  overlay.innerHTML = `<div class="overlay-card" role="dialog" aria-modal="true" aria-label="Media lightbox">${inner}<p>${media.caption || ''}</p></div>`;

  function close() { overlay.remove(); onClose(); }
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  const onKey = (e) => { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); } };
  document.addEventListener('keydown', onKey);
  return overlay;
}
