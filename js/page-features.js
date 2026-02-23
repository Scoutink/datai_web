(function () {
  const container = document.getElementById('features-container');
  if (!container) return;

  fetch('data/features.json')
    .then((response) => response.json())
    .then((items) => {
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
    })
    .catch(() => {
      container.innerHTML = '<p class="meta">Unable to load feature data.</p>';
    });
})();
