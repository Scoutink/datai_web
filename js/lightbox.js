const escapeHtml = (s = '') => s.replace(/[&<>"]/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));

export function openLightbox(media, onClose) {
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  const src = media?.src || '';
  const isVideo = media?.type === 'video' || /\.(mp4|webm|ogg)$/i.test(src);
  const inner = isVideo
    ? `<video src="${escapeHtml(src)}" controls autoplay style="width:100%;max-height:78vh" onerror="this.replaceWith(document.createRange().createContextualFragment('<div class=\\'placeholder\\'>Media unavailable</div>'))"></video>`
    : `<img src="${escapeHtml(src)}" alt="${escapeHtml(media?.caption || '')}" style="width:100%;max-height:78vh;object-fit:contain" onerror="this.replaceWith(document.createRange().createContextualFragment('<div class=\\'placeholder\\'>Media unavailable</div>'))">`;
  overlay.innerHTML = `<div class="overlay-card" role="dialog" aria-modal="true" aria-label="Media lightbox"><button class="btn close-lightbox">Close</button>${inner}<p>${escapeHtml(media?.caption || '')}</p></div>`;

  function close() {
    overlay.remove();
    document.removeEventListener('keydown', onKey);
    onClose();
  }

  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  overlay.querySelector('.close-lightbox')?.addEventListener('click', close);
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onKey);
  return overlay;
}
