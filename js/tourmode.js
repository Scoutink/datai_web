export function setupTourMode({ state, chapters, contentById, openCard, goToChapter }) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function applyChapter(id) {
    if (!state.tourModeEnabled) return;
    const chapterMeta = chapters.find((c) => c.id === id);
    if (!chapterMeta) return;
    openCard(id, chapterMeta.recommendedCardKey, { scrollIntoView: true });
    const row = document.querySelector(`[data-chapter-id="${id}"] .cards-row`);
    row?.querySelectorAll('.feature-card').forEach((c) => c.classList.toggle('recommended', c.dataset.key === chapterMeta.recommendedCardKey));
    const rec = contentById.get(id)?.cards?.find((c) => c.key === chapterMeta.recommendedCardKey);
    if (row && !row.querySelector('.coach-mark')) {
      const m = document.createElement('div');
      m.className = 'coach-mark';
      if (reduced) m.style.animation = 'none';
      m.textContent = `This chapter: start here → ${rec?.title || chapterMeta.recommendedCardKey}`;
      row.appendChild(m);
    }
  }

  function next() {
    const idx = chapters.findIndex((c) => c.id === state.activeChapterId);
    const n = chapters[Math.min(chapters.length - 1, idx + 1)];
    goToChapter(n.id);
    openCard(n.id, n.recommendedCardKey);
  }

  return { applyChapter, next };
}
