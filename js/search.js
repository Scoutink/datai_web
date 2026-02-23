function flattenCardText(card) {
  const drawer = card.drawer || {};
  const chunks = [card.title, card.why, ...(card.body || []), ...(drawer.body || []), ...(drawer.notes || []), ...(drawer.bullets || [])];
  (drawer.steps || []).forEach((s) => chunks.push(s));
  (drawer.stepsGroups || []).forEach((g) => { chunks.push(g.title); (g.steps || []).forEach((s) => chunks.push(s)); });
  (drawer.tables || []).forEach((t) => { chunks.push(t.title); t.rows.forEach((r) => r.forEach((c) => chunks.push(c))); });
  if (drawer.sheetTable) { chunks.push(drawer.sheetTable.title); drawer.sheetTable.rows.forEach((r) => r.forEach((c) => chunks.push(c))); }
  return chunks.join(' ').toLowerCase();
}

export function buildSearchIndex(chapters, content) {
  const byId = new Map(content.chapters.map((c) => [c.id, c]));
  const index = [];
  chapters.forEach((ch) => {
    const cc = byId.get(ch.id);
    cc.cards.forEach((card) => {
      index.push({ chapterId: ch.id, chapterTitle: ch.title, cardKey: card.key, cardTitle: card.title, text: flattenCardText(card) });
    });
  });
  return index;
}

export function renderSearch({ index, onSelect, onClose }) {
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.innerHTML = `<div class="overlay-card" role="dialog" aria-modal="true" aria-label="Search Manual">
    <h2>Search Manual</h2>
    <input class="search-input" placeholder="Search chapters, cards, steps, notes..." />
    <div class="results"></div>
  </div>`;
  const input = overlay.querySelector('input');
  const results = overlay.querySelector('.results');

  function run() {
    const q = input.value.trim().toLowerCase();
    if (!q) { results.innerHTML = ''; return; }
    const hits = index.filter((i) => i.text.includes(q) || i.cardTitle.toLowerCase().includes(q) || i.chapterTitle.toLowerCase().includes(q)).slice(0, 16);
    results.innerHTML = hits.map((h) => {
      const at = h.text.indexOf(q);
      const snippet = at > -1 ? h.text.slice(Math.max(0, at - 40), at + q.length + 80) : h.text.slice(0, 120);
      return `<button class="btn card result" data-ch="${h.chapterId}" data-card="${h.cardKey}"><strong>${h.chapterTitle}</strong> → ${h.cardTitle}<br><small>${snippet}...</small></button>`;
    }).join('') || '<p>No results.</p>';
    results.querySelectorAll('[data-ch]').forEach((r) => r.addEventListener('click', () => { onSelect(r.dataset.ch, r.dataset.card, q); close(); }));
  }
  input.addEventListener('input', run);
  setTimeout(() => input.focus(), 30);

  function close() { overlay.remove(); onClose(); }
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  const onKey = (e) => { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); } };
  document.addEventListener('keydown', onKey);
  return overlay;
}
