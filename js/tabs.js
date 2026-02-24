(function () {
  document.querySelectorAll('.tab-group').forEach((group, groupIndex) => {
    const tabs = [...group.querySelectorAll('.tab-btn')];
    const panels = [...group.querySelectorAll('.tab-panel')];

    tabs.forEach((tab, idx) => {
      const tabId = `tab-${groupIndex + 1}-${idx + 1}`;
      const panelId = `panel-${groupIndex + 1}-${idx + 1}`;
      tab.id = tabId;
      tab.setAttribute('aria-controls', panelId);
      tab.setAttribute('aria-selected', 'false');
      panels[idx].id = panelId;
      panels[idx].setAttribute('role', 'tabpanel');
      panels[idx].setAttribute('aria-labelledby', tabId);
      panels[idx].hidden = true;
    });

    function activate(index, focus = false) {
      tabs.forEach((tab, i) => {
        const selected = i === index;
        tab.classList.toggle('active', selected);
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
        panels[i].classList.toggle('active', selected);
        panels[i].hidden = !selected;
      });
      if (focus) tabs[index].focus();
    }

    activate(0);

    tabs.forEach((tab, idx) => {
      tab.addEventListener('click', () => activate(idx));
      tab.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); activate((idx + 1) % tabs.length, true); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); activate((idx - 1 + tabs.length) % tabs.length, true); }
        if (e.key === 'Home') { e.preventDefault(); activate(0, true); }
        if (e.key === 'End') { e.preventDefault(); activate(tabs.length - 1, true); }
      });
    });
  });
})();
