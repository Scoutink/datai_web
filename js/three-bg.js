export function setupThreeBackground({ dimmed }) {
  const canvas = document.getElementById('three-bg');
  if (!window.THREE || !canvas) return { setDimmed: () => {} };
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(52, innerWidth / innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(2, devicePixelRatio));
  renderer.setSize(innerWidth, innerHeight);
  camera.position.z = 28;

  const planes = [];
  const count = innerWidth < 800 ? 10 : 18;
  for (let i = 0; i < count; i += 1) {
    const geo = new THREE.PlaneGeometry(3.2, 4.2);
    const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(`hsl(${200 + (i * 6)}, 65%, ${72 + (i % 8)}%)`), transparent: true, opacity: 0.26 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set((Math.random() - 0.5) * 42, (Math.random() - 0.5) * 26, (Math.random() - 0.5) * 30);
    mesh.rotation.z = Math.random() * Math.PI;
    mesh.userData.speed = 0.001 + Math.random() * 0.0025;
    planes.push(mesh);
    scene.add(mesh);
  }

  let mouseX = 0;
  if (matchMedia('(pointer:fine)').matches) {
    addEventListener('mousemove', (e) => { mouseX = (e.clientX / innerWidth - 0.5) * 0.9; });
  }

  let last = 0;
  function animate(t) {
    if (reduced || document.hidden) return;
    if (t - last < 33) { requestAnimationFrame(animate); return; }
    last = t;
    planes.forEach((p, i) => {
      p.position.y += Math.sin(t * p.userData.speed + i) * 0.01;
      p.rotation.z += p.userData.speed * 0.35;
      p.position.x += mouseX * 0.003;
    });
    camera.position.x += (mouseX - camera.position.x) * 0.04;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  if (!reduced) requestAnimationFrame(animate);
  addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });

  function setDimmed(isDim) { canvas.style.opacity = isDim ? '0.16' : (dimmed ? '0.16' : '0.52'); }

  return { setDimmed };
}
