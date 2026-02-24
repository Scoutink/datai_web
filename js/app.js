import { setupDeck } from './deck.js';
import { renderDock } from './dock.js';
import { renderRibbon } from './ribbon.js';
import { renderJumpMap } from './jumpmap.js';
import { buildSearchIndex, renderSearch } from './search.js';
import { openLightbox } from './lightbox.js';
import { setupTourMode } from './tourmode.js';
import { setupThreeBackground } from './three-bg.js';

const state = {
  activeChapterId: 'ch-1',
  activeCardKey: null,
  drawerOpen: false,
  overlayOpen: null,
  tourModeEnabled: false,
  ribbonScrubbing: false,
};

const app = document.getElementById('app');

const loadJson = (p) => fetch(p).then((r) => r.json());

const escapeHtml = (s = '') => s.replace(/[&<>"]/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));
const isVideoSrc = (src = '') => /\.(mp4|webm|ogg)$/i.test(src);

function normalizeMedia(media, fallbackCaption = 'chapter media') {
  if (!media) return null;
  const src = media.src || '';
  return {
    ...media,
    src,
    type: isVideoSrc(src) ? 'video' : 'image',
    caption: media.caption || fallbackCaption,
  };
}

function buildMediaFallback(src = '') {
  if (!src) return '';
  const lastDot = src.lastIndexOf('.');
  if (lastDot < 0) return src;
  return `${src.slice(0, lastDot)}${src.slice(lastDot).toUpperCase()}`;
}

function mediaNode(media, asString = true) {
  const normalized = normalizeMedia(media);
  if (!normalized) return `<div class="placeholder">No media</div>`;
  const fb = buildMediaFallback(normalized.src);
  const encodedCaption = escapeHtml(normalized.caption);
  const encodedSrc = escapeHtml(normalized.src);
  const encodedFb = escapeHtml(fb);
  const tag = normalized.type === 'video'
    ? `<video src="${encodedSrc}" muted loop playsinline preload="metadata" controlslist="nodownload" onloadeddata="this.parentElement.classList.add('is-ready')" onerror="if(!this.dataset.upperTried && '${encodedFb}' && this.currentSrc !== '${encodedFb}'){this.dataset.upperTried='1';this.src='${encodedFb}';this.load();return;} this.parentElement.innerHTML='<div class=placeholder>Media missing<br>${encodedSrc}</div>'"></video>`
    : `<img src="${encodedSrc}" alt="${encodedCaption}" loading="lazy" onload="this.parentElement.classList.add('is-ready')" onerror="if(!this.dataset.upperTried && '${encodedFb}' && this.currentSrc !== '${encodedFb}'){this.dataset.upperTried='1';this.src='${encodedFb}';return;} this.parentElement.innerHTML='<div class=placeholder>Media missing<br>${encodedSrc}</div>'">`;
  const wrapped = `<div class="media-shell"><div class="media-loader" aria-hidden="true"></div>${tag}</div>`;
  return asString ? wrapped : normalized.src;
}

function tableNode(t) {
  return `<h4>${escapeHtml(t.title)}</h4><table class="data-table"><thead><tr>${t.columns.map((c) => `<th>${escapeHtml(c)}</th>`).join('')}</tr></thead><tbody>${t.rows.map((r) => `<tr>${r.map((c) => `<td>${escapeHtml(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
}

function drawerNode(card, chapterId) {
  const d = card.drawer || {};
  return `<div class="drawer-grid">
    ${(card.body || []).map((p) => `<p>${escapeHtml(p)}</p>`).join('')}
    ${(d.body || []).map((p) => `<p>${escapeHtml(p)}</p>`).join('')}
    ${(d.bullets || []).length ? `<ul>${d.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}</ul>` : ''}
    ${(d.steps || []).length ? `<ol>${d.steps.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}</ol>` : ''}
    ${(d.stepsGroups || []).map((g) => `<section class="steps-group"><h4>${escapeHtml(g.title)}</h4><ol>${(g.steps || []).map((s) => `<li>${escapeHtml(s)}</li>`).join('')}</ol></section>`).join('')}
    ${(d.chips || []).length ? `<div class="chips">${d.chips.map((c) => `<span class="chip">${escapeHtml(c)}</span>`).join('')}</div>` : ''}
    ${(d.tables || []).map(tableNode).join('')}
    ${(d.notes || []).length ? `<h4>Notes</h4><ul>${d.notes.map((n) => `<li>${escapeHtml(n)}</li>`).join('')}</ul>` : ''}
    ${(d.links || []).length ? `<div class="inline-actions">${d.links.map((l) => `<button class="btn link-jump" data-to="${l.to}">${escapeHtml(l.label)}</button>`).join('')}</div>` : ''}
    ${d.media ? `<button class="media-frame" data-media='${JSON.stringify(normalizeMedia(d.media))}' aria-label="Open media">${mediaNode(d.media)}</button>` : ''}
    ${d.sheetTable ? `<button class="btn open-sheet" data-ch="${chapterId}" data-card="${card.key}">Open Table</button>` : ''}
  </div>`;
}

function renderSlide(chMeta, chapterContent) {
  const coverMedia = normalizeMedia(chapterContent.cover.media, chapterContent.title);
  return `<section class="slide" data-chapter-id="${chMeta.id}"><div class="slide-safe">
      <article class="card cover-card">
        <div>
          <h2>${chMeta.num}. ${escapeHtml(chMeta.title)}</h2>
          <p>${escapeHtml(chapterContent.cover.intro)}</p>
          <div class="chips">${chapterContent.cover.takeaways.map((t) => `<span class="chip">${escapeHtml(t)}</span>`).join('')}</div>
        </div>
        <button class="cover-media" data-media='${JSON.stringify(coverMedia)}' aria-label="Open media preview">
          ${mediaNode(coverMedia)}
        </button>
      </article>
      <div class="cards-row" role="tablist" aria-label="Chapter feature sections">${chapterContent.cards.map((c) => `<article class="card feature-card" data-key="${c.key}" tabindex="0" role="tab" aria-selected="false"><h3>${escapeHtml(c.title)}</h3><p>${escapeHtml(c.why)}</p></article>`).join('')}</div>
      <article class="card drawer" data-drawer="${chMeta.id}"><p>Select a feature section to view details.</p></article>
  </div></section>`;
}

function setOverlay(open, threeBg) {
  state.overlayOpen = open;
  document.body.classList.toggle('overlay-open', Boolean(open));
  threeBg.setDimmed(Boolean(open));
}

async function preloadMedia(content) {
  const mediaList = [];
  content.chapters.forEach((chapter) => {
    if (chapter.cover?.media?.src) mediaList.push(chapter.cover.media.src);
    chapter.cards?.forEach((card) => {
      if (card.drawer?.media?.src) mediaList.push(card.drawer.media.src);
    });
  });

  const unique = [...new Set(mediaList)];
  await Promise.allSettled(unique.map((src) => new Promise((resolve) => {
    const normalized = src.startsWith('assets/') ? src : `assets/${src}`;
    if (isVideoSrc(normalized)) {
      const v = document.createElement('video');
      v.preload = 'metadata';
      v.onloadeddata = () => resolve();
      v.onerror = () => resolve();
      v.src = normalized;
      return;
    }
    const i = new Image();
    i.onload = () => resolve();
    i.onerror = () => {
      const fb = buildMediaFallback(normalized);
      if (fb && fb !== normalized) {
        const ii = new Image();
        ii.onload = () => resolve();
        ii.onerror = () => resolve();
        ii.src = fb;
      } else {
        resolve();
      }
    };
    i.src = normalized;
  })));
}

(async function boot() {
  app.innerHTML = `<div class="boot-loader"><div class="spinner"></div><p>Loading manual…</p></div>`;
  const [chapters, content] = await Promise.all([loadJson('data/chapters.json'), loadJson('data/content.json')]);
  await preloadMedia(content);
  const contentById = new Map(content.chapters.map((c) => [c.id, c]));

  app.innerHTML = `
    <header class="topbar">
      <div class="brand"><img src="assets/logo.png" alt="Logo" onerror="this.style.display='none'"><strong>CMR DMS / DocAI Manual</strong></div>
      <div class="current-title"></div>
      <div class="top-actions">
        <button class="btn" data-act="search">🔎 Search</button>
        <button class="btn" data-act="jump">⬚ Chapters</button>
        <button class="btn" data-act="tour">✦ Tour Mode: Off</button>
        <span class="mono progress">01 / 13</span>
      </div>
    </header>
    <nav class="desktop-arrows"><button class="btn" data-act="prev">← Prev</button><button class="btn" data-act="next">Next →</button></nav>
    <main class="deck">${chapters.map((c) => renderSlide(c, contentById.get(c.id))).join('')}</main>
    <section class="ribbon"></section>
    <nav class="dock"></nav>
    <button class="btn next-pill" style="display:none">Next</button>
  `;

  const deckEl = app.querySelector('.deck');
  const titleEl = app.querySelector('.current-title');
  const progressEl = app.querySelector('.progress');
  const ribbonEl = app.querySelector('.ribbon');
  const dockEl = app.querySelector('.dock');
  const tourBtn = app.querySelector('[data-act="tour"]');
  const nextPill = app.querySelector('.next-pill');

  const threeBg = setupThreeBackground({ dimmed: false });

  function getChapter() { return chapters.find((c) => c.id === state.activeChapterId) || chapters[0]; }

  function updateTop() {
    const ch = getChapter();
    const idx = chapters.findIndex((c) => c.id === ch.id) + 1;
    titleEl.textContent = ch.title;
    progressEl.textContent = `${String(idx).padStart(2, '0')} / ${chapters.length}`;
    document.title = `${ch.num}. ${ch.title} — CMR DMS / DocAI Manual`;
    if (location.hash.slice(1) !== ch.id) history.pushState({}, '', `#${ch.id}`);
  }

  function getMediaNode(ch, inRibbon = false) {
    const media = normalizeMedia({ src: `assets/${ch.media}`, caption: ch.title });
    const cls = inRibbon ? 'media-frame' : 'cover-media';
    return `<div class="${cls}">${mediaNode(media)}</div>`;
  }

  function openCard(chapterId, key, opts = {}) {
    const slide = app.querySelector(`[data-chapter-id="${chapterId}"]`);
    if (!slide) return;
    const chapter = contentById.get(chapterId);
    const card = chapter.cards.find((c) => c.key === key);
    if (!card) return;
    slide.querySelectorAll('.feature-card').forEach((c) => {
      const active = c.dataset.key === key;
      c.classList.toggle('active', active);
      c.setAttribute('aria-selected', String(active));
    });
    const drawer = slide.querySelector('.drawer');
    drawer.innerHTML = drawerNode(card, chapterId);
    drawer.querySelectorAll('.link-jump').forEach((b) => b.addEventListener('click', () => navigator.goToChapter(b.dataset.to)));
    drawer.querySelectorAll('.media-frame').forEach((m) => m.addEventListener('click', () => {
      const node = JSON.parse(m.dataset.media);
      setOverlay('lightbox', threeBg);
      document.body.appendChild(openLightbox(normalizeMedia(node), () => setOverlay(null, threeBg)));
    }));
    drawer.querySelectorAll('.open-sheet').forEach((b) => b.addEventListener('click', () => {
      const info = contentById.get(b.dataset.ch).cards.find((c) => c.key === b.dataset.card);
      const t = info.drawer.sheetTable;
      const overlay = document.createElement('div');
      overlay.className = 'overlay';
      overlay.innerHTML = `<div class="overlay-card" role="dialog" aria-modal="true"><h2>${escapeHtml(t.title)}</h2>${tableNode(t)}</div>`;
      setOverlay('sheet', threeBg);
      overlay.addEventListener('click', (e) => { if (e.target === overlay) { overlay.remove(); setOverlay(null, threeBg); } });
      document.body.appendChild(overlay);
    }));
    state.activeCardKey = key;
    state.drawerOpen = true;
    if (opts.scrollIntoView) slide.querySelector(`.feature-card[data-key="${key}"]`)?.scrollIntoView({ behavior: 'smooth', inline: 'center' });
  }

  const tour = setupTourMode({ state, chapters, contentById, openCard, goToChapter: (id) => navigator.goToChapter(id) });

  function rerenderNav() {
    renderDock({ container: dockEl, chapters, activeChapterId: state.activeChapterId, onJump: (id) => navigator.goToChapter(id) });
    renderRibbon({
      container: ribbonEl,
      chapters,
      activeChapterId: state.activeChapterId,
      onJump: (id) => navigator.goToChapter(id),
      getMediaNode,
      onScrubState: (on) => { state.ribbonScrubbing = on; deckEl.style.pointerEvents = on ? 'none' : 'auto'; },
    });
  }

  const navigator = setupDeck({
    deckEl,
    chapters,
    onActiveChange: (id) => {
      state.activeChapterId = id;
      updateTop();
      rerenderNav();
      if (state.tourModeEnabled) tour.applyChapter(id);
    },
  });

  app.querySelectorAll('.cover-media').forEach((m) => m.addEventListener('click', () => {
    const node = JSON.parse(m.dataset.media);
    setOverlay('lightbox', threeBg);
    document.body.appendChild(openLightbox(normalizeMedia(node), () => setOverlay(null, threeBg)));
  }));

  app.querySelectorAll('.feature-card').forEach((card) => {
    const click = () => {
      const slide = card.closest('.slide');
      openCard(slide.dataset.chapterId, card.dataset.key);
    };
    card.addEventListener('click', click);
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter') click(); });
  });

  const searchIndex = buildSearchIndex(chapters, content);
  app.querySelector('[data-act="search"]').addEventListener('click', () => {
    setOverlay('search', threeBg);
    document.body.appendChild(renderSearch({
      index: searchIndex,
      onSelect: (ch, card) => { navigator.goToChapter(ch); setTimeout(() => openCard(ch, card, { scrollIntoView: true }), 220); },
      onClose: () => setOverlay(null, threeBg),
    }));
  });

  app.querySelector('[data-act="jump"]').addEventListener('click', () => {
    const map = renderJumpMap({ chapters, onJump: (id) => navigator.goToChapter(id), onClose: () => setOverlay(null, threeBg) });
    setOverlay('jumpmap', threeBg);
    document.body.appendChild(map);
  });

  app.querySelector('[data-act="prev"]').addEventListener('click', () => navigator.move(-1));
  app.querySelector('[data-act="next"]').addEventListener('click', () => navigator.move(1));

  tourBtn.addEventListener('click', () => {
    state.tourModeEnabled = !state.tourModeEnabled;
    document.body.classList.toggle('tour-on', state.tourModeEnabled);
    tourBtn.textContent = `✦ Tour Mode: ${state.tourModeEnabled ? 'On' : 'Off'}`;
    nextPill.style.display = state.tourModeEnabled ? 'inline-flex' : 'none';
    if (state.tourModeEnabled) tour.applyChapter(state.activeChapterId);
    else app.querySelectorAll('.coach-mark').forEach((n) => n.remove());
  });

  nextPill.addEventListener('click', () => tour.next());

  rerenderNav();
  updateTop();
})();
