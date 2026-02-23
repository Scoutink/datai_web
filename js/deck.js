export function setupDeck({ deckEl, chapters, onActiveChange }) {
  const slideMap = new Map();
  deckEl.querySelectorAll('.slide').forEach((s) => slideMap.set(s.dataset.chapterId, s));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && e.intersectionRatio > 0.6) {
        onActiveChange(e.target.dataset.chapterId, true);
      }
    });
  }, { threshold: [0.6, 0.8] });

  slideMap.forEach((slide) => observer.observe(slide));

  function goToChapter(id, smooth = true) {
    const el = slideMap.get(id);
    if (!el) return;
    el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', inline: 'start', block: 'nearest' });
  }

  document.addEventListener('keydown', (e) => {
    if (e.target.closest('input, textarea')) return;
    if (e.key === 'ArrowRight') move(1);
    if (e.key === 'ArrowLeft') move(-1);
  });

  function move(delta) {
    const active = chapters.findIndex((c) => c.id === getCurrent());
    const next = Math.min(chapters.length - 1, Math.max(0, active + delta));
    goToChapter(chapters[next].id);
  }

  function getCurrent() {
    const x = deckEl.scrollLeft + (deckEl.clientWidth / 2);
    const idx = Math.floor(x / deckEl.clientWidth);
    return chapters[Math.min(chapters.length - 1, Math.max(0, idx))].id;
  }

  window.addEventListener('hashchange', () => {
    const id = location.hash.slice(1);
    if (slideMap.has(id)) goToChapter(id, false);
  });

  const initialHash = location.hash.slice(1);
  if (slideMap.has(initialHash)) setTimeout(() => goToChapter(initialHash, false), 10);

  return { goToChapter, move };
}
