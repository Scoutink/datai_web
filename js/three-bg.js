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

  const pointer = { x: 0, y: 0 };
  const meshes = [];

  function populate() {
    while (group.children.length) group.remove(group.children[0]);
    meshes.length = 0;

    const mobile = window.innerWidth < 768;
    const planeCount = mobile ? 14 : 38;
    for (let i = 0; i < planeCount; i++) {
      const material = new THREE.MeshBasicMaterial({
        color: i % 2 ? 0xc8e6ff : 0x0e5ba8,
        transparent: true,
        opacity: i % 2 ? 0.18 : 0.1,
        side: THREE.DoubleSide
      });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.65), material);
      mesh.position.set((Math.random() - 0.5) * 14, (Math.random() - 0.5) * 9, (Math.random() - 0.5) * 9);
      mesh.userData = { drift: Math.random() * Math.PI * 2 };
      group.add(mesh);
      meshes.push(mesh);
    }
  }

  function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }

  populate();
  resize();
  window.addEventListener('resize', () => { resize(); populate(); });

  window.addEventListener('mousemove', (event) => {
    pointer.x = (event.clientX / window.innerWidth - 0.5) * 0.6;
    pointer.y = (event.clientY / window.innerHeight - 0.5) * -0.5;
  });

  function animate(time = 0) {
    requestAnimationFrame(animate);
    if (reduce) return;

    group.rotation.y += 0.00035 + pointer.x * 0.0012;
    group.rotation.x += pointer.y * 0.0006;

    meshes.forEach((mesh, idx) => {
      mesh.position.y += Math.sin(time * 0.00035 + mesh.userData.drift + idx) * 0.0006;
      mesh.material.opacity = idx % 2 ? 0.2 + Math.abs(pointer.x) * 0.08 : 0.1 + Math.abs(pointer.y) * 0.09;
    });

    renderer.render(scene, camera);
  }

  animate();
})();
