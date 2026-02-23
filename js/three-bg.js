(function () {
  const canvas = document.getElementById('three-bg');
  if (!canvas || typeof THREE === 'undefined') return;

  const mobile = window.innerWidth < 768;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 8;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const docCount = mobile ? 30 : 72;
  const fragments = [];
  const clock = new THREE.Clock();

  function randomInSphere(radius) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * Math.PI * 2;
    const phi = Math.acos(2 * v - 1);
    const r = Math.cbrt(Math.random()) * radius;
    return new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    );
  }

  for (let i = 0; i < docCount; i++) {
    const geo = new THREE.PlaneGeometry(0.4, 0.55);
    const color = i % 2 === 0 ? 0x00c9b1 : 0x4f9cf9;
    const fill = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.03 + Math.random() * 0.02, side: THREE.DoubleSide });
    const edge = new THREE.MeshBasicMaterial({ color, transparent: true, wireframe: true, opacity: 0.18, side: THREE.DoubleSide });

    const mesh = new THREE.Mesh(geo, fill);
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(0.43, 0.58), edge);
    mesh.add(glow);

    mesh.position.copy(randomInSphere(12));
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    mesh.userData = {
      rotSpeed: 0.0002 + Math.random() * 0.0008,
      phase: Math.random() * Math.PI * 2,
      baseY: mesh.position.y
    };

    fragments.push(mesh);
    scene.add(mesh);
  }

  const nodeCount = 25;
  const nodes = [];
  const nodeGeo = new THREE.SphereGeometry(0.04, 8, 8);
  for (let i = 0; i < nodeCount; i++) {
    const mat = new THREE.MeshBasicMaterial({ color: i % 2 ? 0x4f9cf9 : 0x00c9b1, transparent: true, opacity: 0.9 });
    const node = new THREE.Mesh(nodeGeo, mat);
    node.position.copy(randomInSphere(9));
    nodes.push(node);
    scene.add(node);
  }

  const positions = [];
  nodes.forEach((node, idx) => {
    const distances = nodes
      .map((other, oIdx) => ({ oIdx, d: oIdx === idx ? Infinity : node.position.distanceTo(other.position) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 2 + Math.round(Math.random()));

    distances.forEach(({ oIdx }) => {
      const other = nodes[oIdx];
      positions.push(node.position.x, node.position.y, node.position.z);
      positions.push(other.position.x, other.position.y, other.position.z);
    });
  });

  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const lineMat = new THREE.LineBasicMaterial({ color: 0x66cfd7, transparent: true, opacity: 0.12 });
  const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(lineSegments);

  let aiLight = null;
  if (document.body.dataset.page === 'ai') {
    aiLight = new THREE.PointLight(0x00c9b1, 0.6, 30);
    aiLight.position.set(0, 0, 3);
    scene.add(aiLight);
  }

  const pointerTarget = { x: 0, y: 0 };
  if (!mobile) {
    window.addEventListener('mousemove', (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      pointerTarget.x = nx * 0.5;
      pointerTarget.y = -ny * 0.5;
    });
  }

  function animate() {
    const t = clock.getElapsedTime();
    requestAnimationFrame(animate);

    scene.rotation.y += 0.0003;
    scene.rotation.x += 0.0001;

    fragments.forEach((mesh) => {
      mesh.rotation.z += mesh.userData.rotSpeed;
      mesh.position.y = mesh.userData.baseY + Math.sin(t + mesh.userData.phase) * 0.12;
    });

    if (!mobile) {
      camera.position.x += (pointerTarget.x - camera.position.x) * 0.05;
      camera.position.y += (pointerTarget.y - camera.position.y) * 0.05;
    }

    if (aiLight) {
      aiLight.intensity = 0.5 + (Math.sin(t * 1.3) + 1) * 0.25;
    }

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();
