(function () {
  const container = document.getElementById('features-container');
  if (!container) return;

  function render(items) {
    container.innerHTML = '';
    items.forEach((item, index) => {
      const section = document.createElement('article');
      section.className = 'feature-block reveal';

      const imageBlock = `
        <div class="media-frame feature-image" data-media-wrapper>
          <img src="assets/${item.image}" alt="${item.imageCaption}">
          <div class="placeholder">${item.imageCaption}</div>
        </div>`;

      const details = item.details.map((detail) => `<li>${detail}</li>`).join('');
      const textBlock = `
        <div class="feature-copy">
          <p class="eyebrow">${item.manualRef}</p>
          <h3>${item.title}</h3>
          <p class="meta">${item.tagline}</p>
          <p>${item.description}</p>
          <ul>${details}</ul>
        </div>`;

      section.innerHTML = index % 2 === 0 ? `${imageBlock}${textBlock}` : `${textBlock}${imageBlock}`;
      container.appendChild(section);

      const hr = document.createElement('hr');
      hr.className = 'hr';
      container.appendChild(hr);
    });

    document.dispatchEvent(new Event('featuresRendered'));
  }

  fetch('data/features.json')
    .then((response) => {
      if (!response.ok) throw new Error('Feature JSON request failed');
      return response.json();
    })
    .then((items) => render(items))
    .catch(() => {
      if (Array.isArray(window.FEATURES_FALLBACK_DATA) && window.FEATURES_FALLBACK_DATA.length) {
        render(window.FEATURES_FALLBACK_DATA);
        const note = document.createElement('p');
        note.className = 'meta';
        note.style.marginBottom = '16px';
        note.textContent = 'Loaded local fallback feature data. For primary fetch behavior, serve the site via a local/web server.';
        container.prepend(note);
      } else {
        container.innerHTML = '<p class="meta">Unable to load feature data. Ensure data/features.json exists and open the site through a web server.</p>';
      }
    });
})();
