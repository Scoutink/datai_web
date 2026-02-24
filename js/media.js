(function () {
  const IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'avif'];
  const VIDEO_EXTENSIONS = ['mp4', 'webm', 'ogg', 'mov', 'm4v'];

  function extensionFrom(src = '') {
    const clean = src.split('?')[0].split('#')[0];
    return clean.includes('.') ? clean.split('.').pop().toLowerCase() : '';
  }

  function mediaTypeFor(src) {
    const ext = extensionFrom(src);
    if (VIDEO_EXTENSIONS.includes(ext)) return 'video';
    return 'image';
  }

  function caseCandidates(src) {
    const parts = src.split('.');
    if (parts.length < 2) return [src];
    const ext = parts.pop();
    const base = parts.join('.');
    return [...new Set([src, `${base}.${ext.toLowerCase()}`, `${base}.${ext.toUpperCase()}`])];
  }

  async function resolveAssetSrc(src) {
    for (const candidate of caseCandidates(src)) {
      try {
        const res = await fetch(candidate, { method: 'HEAD' });
        if (res.ok) return candidate;
      } catch (_) {
        // keep trying
      }
    }
    return null;
  }

  function makeModal() {
    const modal = document.createElement('div');
    modal.className = 'asset-modal';
    modal.innerHTML = `
      <div class="asset-modal-backdrop" data-close-modal></div>
      <div class="asset-modal-dialog" role="dialog" aria-modal="true" aria-label="Asset preview">
        <button class="asset-modal-close" aria-label="Close preview" data-close-modal>×</button>
        <div class="asset-modal-content"></div>
      </div>`;
    document.body.appendChild(modal);

    const content = modal.querySelector('.asset-modal-content');
    const closeModal = () => {
      modal.classList.remove('open');
      content.innerHTML = '';
      document.body.classList.remove('modal-open');
    };

    modal.addEventListener('click', (event) => {
      if (event.target.closest('[data-close-modal]')) closeModal();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeModal();
    });

    return { modal, content, open(node) {
      content.innerHTML = '';
      content.appendChild(node);
      modal.classList.add('open');
      document.body.classList.add('modal-open');
    } };
  }

  function setLoadingState(frame, isLoading) {
    frame.classList.toggle('is-loading', isLoading);
    frame.classList.toggle('is-ready', !isLoading);
  }

  function createViewerNode({ type, src, alt }) {
    if (type === 'video') {
      const video = document.createElement('video');
      video.src = src;
      video.controls = true;
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      return video;
    }
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt || 'Asset preview';
    return img;
  }

  async function hydrateAsset(node, modalApi) {
    const originalSrc = node.getAttribute('src');
    const resolvedSrc = await resolveAssetSrc(originalSrc);
    const frame = node.closest('.img-frame, .video-frame');
    if (frame) {
      frame.classList.add('media-frame');
    }

    const loader = document.createElement('div');
    loader.className = 'media-loader';
    loader.innerHTML = '<div class="media-spinner" aria-hidden="true"></div>';
    if (frame) {
      frame.appendChild(loader);
      setLoadingState(frame, true);
    }

    if (!resolvedSrc) {
      if (frame) {
        node.remove();
        loader.remove();
        frame.innerHTML = `<div class="asset-placeholder">${originalSrc.split('/').pop()}<br/>asset unavailable</div>`;
      }
      return;
    }

    const targetType = mediaTypeFor(resolvedSrc);
    let mediaEl = node;

    if ((targetType === 'video' && node.tagName !== 'VIDEO') || (targetType === 'image' && node.tagName !== 'IMG')) {
      mediaEl = document.createElement(targetType === 'video' ? 'video' : 'img');
      [...node.attributes].forEach((attr) => {
        if (attr.name !== 'src') mediaEl.setAttribute(attr.name, attr.value);
      });
      node.replaceWith(mediaEl);
    }

    mediaEl.src = resolvedSrc;
    mediaEl.classList.add('asset-media');
    mediaEl.setAttribute('data-media-kind', targetType);
    if (targetType === 'image') mediaEl.setAttribute('loading', 'lazy');
    mediaEl.style.opacity = '0';

    if (targetType === 'video') {
      mediaEl.muted = true;
      mediaEl.loop = true;
      mediaEl.playsInline = true;
      mediaEl.controls = true;
      mediaEl.preload = 'metadata';
    }

    const onReady = () => {
      loader.remove();
      if (frame) setLoadingState(frame, false);
      mediaEl.style.opacity = '1';
    };

    const onError = () => {
      mediaEl.remove();
      loader.remove();
      if (frame) frame.innerHTML = `<div class="asset-placeholder">${resolvedSrc.split('/').pop()}<br/>asset unavailable</div>`;
    };

    if (targetType === 'video') {
      mediaEl.addEventListener('loadeddata', onReady, { once: true });
      mediaEl.addEventListener('error', onError, { once: true });
    } else {
      mediaEl.addEventListener('load', onReady, { once: true });
      mediaEl.addEventListener('error', onError, { once: true });
    }

    if (!frame) return;

    frame.classList.add('asset-clickable');
    frame.addEventListener('click', () => {
      const viewer = createViewerNode({
        type: targetType,
        src: resolvedSrc,
        alt: mediaEl.getAttribute('alt')
      });
      modalApi.open(viewer);
    });
  }

  const modalApi = makeModal();
  document.querySelectorAll('[data-asset]').forEach((node) => hydrateAsset(node, modalApi));
})();
