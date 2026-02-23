(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.classList.add('is-visible');
          if (el.classList.contains('reveal-children')) {
            [...el.children].forEach((child, idx) => {
              child.style.transitionDelay = `${idx * 80}ms`;
            });
          }
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.16 }
  );


  function scanDynamic() {
    document.querySelectorAll('.reveal:not(.obs), .reveal-children:not(.obs)').forEach((el) => {
      el.classList.add('obs');
      revealObserver.observe(el);
    });
    document.querySelectorAll('.media-frame:not(.media-ready)').forEach((frame) => {
      frame.classList.add('media-ready');
      wireMediaFallback(frame);
    });
  }

  scanDynamic();

  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  const counters = document.querySelectorAll('.stat-counter');
  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = el.dataset.target || '0';
        if (target.includes('<') || target.includes('∞')) {
          el.textContent = target;
          observer.unobserve(el);
          return;
        }

        const numeric = parseFloat(target);
        const suffix = target.replace(/[\d.]/g, '');
        const duration = reduceMotion ? 0 : 1800;
        const start = performance.now();

        function tick(now) {
          const progress = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
          const value = numeric * easeOutExpo(progress);
          el.textContent = `${Math.round(value)}${suffix}`;
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    },
    { threshold: 0.35 }
  );
  counters.forEach((counter) => counterObserver.observe(counter));

  document.querySelectorAll('.timeline-item').forEach((item, idx) => {
    item.style.transform = `translateX(${idx % 2 ? '20px' : '-20px'})`;
  });

  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');
    if (!trigger || !panel) return;

    trigger.addEventListener('click', () => {
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove('open');
          const otherPanel = other.querySelector('.faq-panel');
          if (otherPanel) otherPanel.style.maxHeight = null;
        }
      });

      const open = item.classList.toggle('open');
      panel.style.maxHeight = open ? `${panel.scrollHeight}px` : null;
    });
  });

  function wireMediaFallback(frame) {
    const media = frame.querySelector('img, video');
    if (!media) return;

    const markLoaded = () => frame.classList.add('is-loaded');

    if (media.tagName === 'IMG') {
      if (media.complete && media.naturalWidth > 0) markLoaded();
      media.addEventListener('load', markLoaded);
      media.addEventListener('error', () => frame.classList.remove('is-loaded'));
    } else {
      media.addEventListener('loadeddata', markLoaded);
      media.addEventListener('error', () => frame.classList.remove('is-loaded'));
    }
  }

  scanDynamic();
  document.addEventListener('featuresRendered', scanDynamic);
})();
