(async function () {
  const chapterList = document.getElementById('chapter-list');
  const jumpList = document.getElementById('jump-panel');
  const counter = document.getElementById('chapter-counter');
  const progress = document.getElementById('sidebar-progress');
  const res = await fetch('data/chapters.json');
  const chapters = await res.json();

  chapters.forEach((ch) => {
    const li = document.createElement('li');
    li.className = 'chapter-item';
    li.dataset.id = ch.id;
    li.innerHTML = `<a href="#${ch.id}"><span class="num-badge">${ch.num}</span><span>${ch.title}</span><span class="complete-dot" aria-hidden="true"></span></a>`;
    chapterList.appendChild(li);

    const a = document.createElement('a');
    a.className = 'jump-item';
    a.href = `#${ch.id}`;
    a.innerHTML = `<span>${ch.num}</span><span>${ch.title}</span>`;
    jumpList.appendChild(a);
  });

  const items = [...document.querySelectorAll('.chapter-item')];
  const sections = [...document.querySelectorAll('.chapter')];
  const map = Object.fromEntries(items.map((it) => [it.dataset.id, it]));

  function setActive(id) {
    const idx = chapters.findIndex((c) => c.id === id);
    items.forEach((it, i) => {
      it.classList.toggle('active', it.dataset.id === id);
      it.classList.toggle('completed', i < idx);
    });
    if (idx >= 0) counter.textContent = `Chapter ${idx + 1} of ${chapters.length}`;
  }

  const io = new IntersectionObserver((entries) => {
    const visible = entries.filter((e) => e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if (visible) setActive(visible.target.id);
  }, { threshold: 0.2 });
  sections.forEach((s) => io.observe(s));

  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = Math.max(0, Math.min(100, (window.scrollY / total) * 100));
    progress.style.width = `${pct}%`;
  }, { passive: true });

  const toggle = document.getElementById('sidebar-toggle');
  const backdrop = document.getElementById('sidebar-backdrop');
  const sidebar = document.getElementById('sidebar');
  const closeDrawer = () => document.body.classList.remove('sidebar-open');
  toggle.addEventListener('click', () => document.body.classList.toggle('sidebar-open'));
  backdrop.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
    if (e.key === 'Tab' && document.body.classList.contains('sidebar-open')) {
      const focusables = sidebar.querySelectorAll('a,button');
      if (!focusables.length) return;
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  chapterList.addEventListener('click', () => { if (window.innerWidth < 1024) closeDrawer(); });
})();
