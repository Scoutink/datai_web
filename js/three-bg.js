(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas || !window.THREE) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 50);
  camera.position.z = 7;
  const group = new THREE.Group();
  scene.add(group);

  const mobile = window.innerWidth < 768;
  const planeCount = mobile ? 10 : 30;
  for (let i = 0; i < planeCount; i++) {
    const color = i % 2 ? 0xffffff : 0x2196f3;
    const opacity = i % 2 ? 0.25 : 0.05;
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.5, 0.65),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide })
    );
    mesh.position.set((Math.random() - 0.5) * 14, (Math.random() - 0.5) * 9, (Math.random() - 0.5) * 9);
    group.add(mesh);
    const wire = new THREE.Mesh(
      new THREE.PlaneGeometry(0.5, 0.65),
      new THREE.MeshBasicMaterial({ color: 0x90caf9, wireframe: true, transparent: true, opacity: 0.08 })
    );
    wire.position.copy(mesh.position);
    group.add(wire);
  }

  function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);
  let raf;
  let frame = 0;
  function animate() {
    raf = requestAnimationFrame(animate);
    if (reduce) return;
    frame += 1;
    if (frame % 2 !== 0) return;
    group.rotation.y += 0.0001;
    renderer.render(scene, camera);
  }
  animate();
})();
