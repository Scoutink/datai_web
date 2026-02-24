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

  async function firstAvailable(candidates) {
    for (const src of candidates) {
      try {
        const res = await fetch(src, { method: 'HEAD' });
        if (res.ok) return src;
      } catch (_) {
        // continue
      }
    }
    return null;
  }

  function candidatesFor(src) {
    const out = [src];
    if (/\.png$/i.test(src)) out.push(src.replace(/\.png$/i, '.PNG'));
    if (/\.jpg$/i.test(src)) out.push(src.replace(/\.jpg$/i, '.JPG'));
    if (/\.jpeg$/i.test(src)) out.push(src.replace(/\.jpeg$/i, '.JPEG'));
    return [...new Set(out)];
  }

  async function handleAsset(el, isVideo = false) {
    const src = el.getAttribute('src');
    const resolved = await firstAvailable(candidatesFor(src));

    if (resolved) {
      if (resolved !== src) el.src = resolved;
      return;
    }

    if (isVideo) {
      const wrap = el.closest('.video-frame');
      el.remove();
      wrap.insertAdjacentHTML('afterbegin', `<div class="video-placeholder"><div class="play-icon"></div><div>${src.split('/').pop()}</div></div>`);
      return;
    }

    const frame = el.closest('.img-frame');
    el.remove();
    frame.innerHTML = `<div class="asset-placeholder">${src.split('/').pop()}<br/>asset placeholder</div>`;
  }

  document.querySelectorAll('img[data-asset]').forEach((img) => { handleAsset(img); });
  document.querySelectorAll('video[data-asset]').forEach((video) => { handleAsset(video, true); });
})();
