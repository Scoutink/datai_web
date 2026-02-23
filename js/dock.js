export function renderDock({ container, chapters, activeChapterId, onJump }) {
  container.innerHTML = chapters.map((ch) => `
    <button class="btn dock-chip ${activeChapterId === ch.id ? 'active' : ''}" data-id="${ch.id}">
      <span class="mono">${ch.num}</span> ${ch.icon} ${ch.title}
    </button>`).join('');

  container.querySelectorAll('[data-id]').forEach((btn) => {
    btn.addEventListener('click', () => onJump(btn.dataset.id));
  });
}
