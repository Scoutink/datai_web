const isDesktop = () => window.matchMedia('(hover: hover)').matches;

export function renderRibbon({ container, chapters, activeChapterId, onJump, getMediaNode, onScrubState }) {
  const progress = ((chapters.findIndex((c) => c.id === activeChapterId) + 1) / chapters.length) * 100;
  container.innerHTML = `<div class="ribbon-track"><div class="ribbon-progress" style="width:${progress}%"></div>${chapters.map((ch) => `
    <div class="ribbon-tile ${ch.id === activeChapterId ? 'active' : ''}" data-id="${ch.id}" title="${ch.title}">
      ${getMediaNode(ch, true)}
      <div class="meta"><span class="mono">${ch.num}</span> ${ch.icon}</div>
    </div>`).join('')}</div>`;

  const track = container.querySelector('.ribbon-track');
  const tiles = [...track.querySelectorAll('.ribbon-tile')];

  if (container._onRibbonKey) document.removeEventListener('keydown', container._onRibbonKey);
  tiles.forEach((t) => t.addEventListener('click', () => onJump(t.dataset.id)));

  let scrubbing = false;
  let selectedId = activeChapterId;
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';

  function nearest(clientX) {
    let best = tiles[0]; let bestDist = Infinity;
    tiles.forEach((t) => {
      const r = t.getBoundingClientRect();
      const c = r.left + r.width / 2;
      const d = Math.abs(c - clientX);
      if (d < bestDist) { bestDist = d; best = t; }
    });
    return best;
  }

  function cancelScrub() {
    if (!scrubbing) return;
    scrubbing = false;
    onScrubState(false);
    tooltip.remove();
    renderRibbon({ container, chapters, activeChapterId, onJump, getMediaNode, onScrubState });
  }

  track.addEventListener('pointerdown', (e) => {
    scrubbing = true;
    onScrubState(true);
    track.setPointerCapture(e.pointerId);
    const n = nearest(e.clientX);
    selectedId = n.dataset.id;
    tiles.forEach((t) => t.classList.toggle('active', t === n));
    e.preventDefault();
  });

  track.addEventListener('pointermove', (e) => {
    if (isDesktop() && !scrubbing) {
      const n = nearest(e.clientX);
      tooltip.textContent = `${n.title} · Click to jump`;
      tooltip.style.left = `${e.clientX + 12}px`;
      tooltip.style.top = `${e.clientY - 8}px`;
      if (!document.body.contains(tooltip)) document.body.appendChild(tooltip);
      return;
    }
    if (!scrubbing) return;
    const n = nearest(e.clientX);
    selectedId = n.dataset.id;
    tiles.forEach((t) => t.classList.toggle('active', t === n));
    e.preventDefault();
  });

  track.addEventListener('pointerup', (e) => {
    if (!scrubbing) return;
    scrubbing = false;
    onScrubState(false);
    track.releasePointerCapture(e.pointerId);
    tooltip.remove();
    onJump(selectedId);
  });

  track.addEventListener('pointerleave', () => tooltip.remove());

  const onKey = (e) => {
    if (e.key === 'Escape') cancelScrub();
  };

  container._onRibbonKey = onKey;
  document.addEventListener('keydown', onKey);
}

