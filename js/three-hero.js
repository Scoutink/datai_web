(function () {
  const canvas = document.getElementById('hero-canvas');
  const hero = document.getElementById('hero');
  if (!canvas || !hero || !window.THREE) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setClearColor(0xDDEEFF, 1);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 50);
  camera.position.z = 7;
  const group = new THREE.Group();
  scene.add(group);

  const mobile = () => window.innerWidth < 768;
  const planes = [];
  function populate() {
    while (group.children.length) group.remove(group.children[0]);
    planes.length = 0;
    const count = mobile() ? 20 : 40;
    const lineCount = mobile() ? 7 : 15;
    for (let i = 0; i < count; i++) {
      const color = i % 2 ? 0xffffff : 0x2196f3;
      const opacity = i % 2 ? 0.7 : 0.12;
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.65), new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide }));
      const r = 10 * Math.random();
      const t = Math.random() * Math.PI * 2;
      mesh.position.set(Math.cos(t) * r, Math.abs(Math.sin(t) * r), (Math.random() - 0.5) * 8);
      mesh.userData = { phase: Math.random() * Math.PI * 2, spin: 0.0001 + Math.random() * 0.0004, baseY: mesh.position.y };
      group.add(mesh);
      planes.push(mesh);
      const wire = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.65), new THREE.MeshBasicMaterial({ color: 0x1565c0, wireframe: true, transparent: true, opacity: 0.15 }));
      wire.position.copy(mesh.position);
      group.add(wire);
    }
    for (let i = 0; i < lineCount; i++) {
      const a = planes[Math.floor(Math.random() * planes.length)].position;
      const b = planes[Math.floor(Math.random() * planes.length)].position;
      const geo = new THREE.BufferGeometry().setFromPoints([a, b]);
      const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0x90CAF9, opacity: 0.2, transparent: true }));
      group.add(line);
    }
  }
  populate();

  function resize() {
    const rect = hero.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', () => { resize(); populate(); });

  let mouseX = 0, mouseY = 0, raf;
  window.addEventListener('mousemove', (e) => {
    if (mobile() || reduce) return;
    mouseX = (e.clientX / window.innerWidth - 0.5) * 0.6;
    mouseY = (e.clientY / window.innerHeight - 0.5) * -0.6;
  });

  let running = true;
  function animate(time) {
    if (!running) return;
    raf = requestAnimationFrame(animate);
    if (reduce) return;
    group.rotation.y += 0.0002;
    planes.forEach((mesh) => {
      mesh.position.y = mesh.userData.baseY + Math.sin(time * 0.001 + mesh.userData.phase) * 0.15;
      mesh.rotation.z += mesh.userData.spin;
    });
    if (!mobile()) {
      camera.position.x += (mouseX - camera.position.x) * 0.04;
      camera.position.y += (mouseY - camera.position.y) * 0.04;
    }
    renderer.render(scene, camera);
  }

  function setRunning(next) {
    if (next && !running) { running = true; animate(performance.now()); }
    if (!next && running) { running = false; cancelAnimationFrame(raf); }
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => setRunning(entry.isIntersecting));
  }, { threshold: 0 });
  observer.observe(hero);
  animate(performance.now());
})();
