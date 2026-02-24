(function () {
  document.querySelectorAll('.tab-group').forEach((group) => {
    const tabs = [...group.querySelectorAll('.tab-btn')];
    const panels = [...group.querySelectorAll('.tab-panel')];
    function activate(index) {
      tabs.forEach((t, i) => {
        const selected = i === index;
        t.classList.toggle('active', selected);
        t.setAttribute('aria-selected', selected);
        t.tabIndex = selected ? 0 : -1;
        panels[i].classList.toggle('active', selected);
      });
    }
    activate(0);
    tabs.forEach((tab, idx) => {
      tab.addEventListener('click', () => activate(idx));
      tab.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); tabs[(idx + 1) % tabs.length].focus(); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); tabs[(idx - 1 + tabs.length) % tabs.length].focus(); }
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(idx); }
      });
    });
  });
})();
