/** client/src/utils/threeSceneServiceUtilsCore.ts */

import * as THREE from "three";

export async function initServicesSceneCore(
  container: HTMLElement,
  type: string,
  theme: "dark" | "light"
) {
  const isDark = theme === "dark";
  const shouldPlayIntroSpin = type === "hero";

  // Configuración de colores basados en el tema
  const cubeColor = isDark ? 0xffffff : 0x80000;
  const adornmentColor = isDark ? 0x888888 : 0xaaaaaa;

  // 1. Configuración básica de la escena
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.z = 9;

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // 2. Iluminación Base (Suavizada para resaltar las luces dinámicas)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
  mainLight.position.set(5, 5, 5);
  scene.add(mainLight);

  const fillLight = new THREE.DirectionalLight(0xffffff, 0.2);
  fillLight.position.set(-5, -5, -5);
  scene.add(fillLight);

  // 3. Cubo Minimalista (Mate pero receptivo a la luz)
  const geometry = new THREE.BoxGeometry(3.5, 3.5, 3.5);
  const material = new THREE.MeshStandardMaterial({
    color: cubeColor,
    roughness: 0.65, // Ajustado de 1.0 a 0.65 para que la luz pueda rebotar sutilmente
    metalness: 0.15, // Un toque ligero para realzar los reflejos de color
  });

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // 4. Adornos 3D Sólidos y emisores de luz
  const adornmentsGroup = new THREE.Group();
  scene.add(adornmentsGroup);

  const adornmentGeometries = [
    new THREE.OctahedronGeometry(0.2),
    new THREE.TetrahedronGeometry(0.25),
    new THREE.IcosahedronGeometry(0.15),
  ];

  // Colores vibrantes para los adornos que emitirán luz al cubo
  const lightColors = [0x00e5ff, 0xff3d00, 0xd500f9, 0x00e676];
  let lightIndex = 0;

  // Creamos menos adornos (16) para mantener excelente performance con luces dinámicas
  for (let i = 0; i < 16; i++) {
    const isLightEmitter = i < 4; // Los primeros 4 serán emisores de luz y color
    const currentColor = isLightEmitter ? lightColors[lightIndex++] : adornmentColor;

    // Cada adorno tiene su propio material ahora para manejar los distintos brillos
    const mat = new THREE.MeshStandardMaterial({
      color: currentColor,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false, // Ahora son sólidos en 3D
      emissive: isLightEmitter ? currentColor : 0x000000,
      emissiveIntensity: isLightEmitter ? 2.5 : 0, // Hacemos que "brillen" visualmente
    });

    const geom = adornmentGeometries[Math.floor(Math.random() * adornmentGeometries.length)];
    const mesh = new THREE.Mesh(geom, mat);

    // Distribución esférica alrededor del cubo
    const radius = 4.0 + Math.random() * 2.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);

    mesh.position.x = radius * Math.sin(phi) * Math.cos(theta);
    mesh.position.y = radius * Math.sin(phi) * Math.sin(theta);
    mesh.position.z = radius * Math.cos(phi);

    // Si es un emisor, le agregamos una luz real que afectará al cubo
    if (isLightEmitter) {
      // PointLight(color, intensidad, distancia máxima)
      const pointLight = new THREE.PointLight(currentColor, 15.0, 12);
      mesh.add(pointLight); // Anclada al mesh para que viaje y rote con el adorno
    }

    // Rotación inicial aleatoria
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

    // Velocidad de rotación individual
    mesh.userData = {
      rx: (Math.random() - 0.5) * 0.05,
      ry: (Math.random() - 0.5) * 0.05,
    };

    adornmentsGroup.add(mesh);
  }

  // 5. Lógica de renderizado optimizada (¡Solo renderiza en scroll!)
  let currentRotationY = 0;
  let currentRotationX = 0;
  let targetRotation = window.scrollY * 0.003;
  let isRendering = false;
  let isActive = true;
  const introDurationMs = 3000;
  const introStartTime = performance.now();
  let introRotationY = shouldPlayIntroSpin ? -Math.PI * 2 : 0;

  const easeInOutCubic = (progress: number) =>
    progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;

  const renderLoop = (time = performance.now()) => {
    if (!isActive) return;

    const diff = targetRotation - currentRotationY;
    currentRotationY += diff * 0.08;
    currentRotationX += diff * 0.08;

    if (shouldPlayIntroSpin) {
      const introProgress = Math.min((time - introStartTime) / introDurationMs, 1);
      introRotationY = (1 - easeInOutCubic(introProgress)) * (-Math.PI * 2);
    }

    const totalRotationY = currentRotationY + introRotationY;

    cube.rotation.y = totalRotationY;
    cube.rotation.x = currentRotationX;

    // Los adornos (y sus luces) giran orgánicamente con el scroll
    adornmentsGroup.rotation.y = -totalRotationY * 0.4;
    adornmentsGroup.rotation.z = currentRotationX * 0.2;

    adornmentsGroup.children.forEach((child) => {
      child.rotation.x += child.userData.rx * Math.abs(diff);
      child.rotation.y += child.userData.ry * Math.abs(diff);
    });

    renderer.render(scene, camera);

    if (Math.abs(diff) > 0.0005 || Math.abs(introRotationY) > 0.0005) {
      requestAnimationFrame(renderLoop);
    } else {
      isRendering = false;
    }
  };

  const onScroll = () => {
    targetRotation = window.scrollY * 0.003;

    if (!isRendering) {
      isRendering = true;
      requestAnimationFrame(renderLoop);
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });

  const onResize = () => {
    if (!isActive) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);

    if (!isRendering) {
      renderer.render(scene, camera);
    }
  };

  window.addEventListener("resize", onResize, { passive: true });

  isRendering = true;
  requestAnimationFrame(renderLoop);

  return () => {
    isActive = false;
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);

    if (container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }

    renderer.dispose();
    geometry.dispose();
    material.dispose();

    // Limpiamos dinámicamente cada material creado
    adornmentsGroup.children.forEach((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (child.material instanceof THREE.Material) {
          child.material.dispose();
        }
      }
    });
  };
}
