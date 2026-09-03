// ============================================
// PRE-LOADER - FORCE HIDE
// ============================================
const preloader = document.getElementById('preloader');
if (preloader) {
    preloader.style.display = 'none';
}

// ============================================
// 3D SCENE (NO CSS IMPORT)
// ============================================
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

const canvas = document.getElementById('canvas');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050510);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1, 6);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;
controls.maxPolarAngle = Math.PI / 2.2;
controls.minDistance = 2;
controls.maxDistance = 12;
controls.target.set(0, 0.5, 0);

// Lighting
const ambientLight = new THREE.AmbientLight(0x222244, 0.5);
scene.add(ambientLight);

const keyLight = new THREE.DirectionalLight(0xffeedd, 3);
keyLight.position.set(5, 8, 6);
keyLight.castShadow = true;
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0x4488ff, 0.8);
fillLight.position.set(-5, 3, -4);
scene.add(fillLight);

const rimLight = new THREE.DirectionalLight(0xffffff, 1.5);
rimLight.position.set(-3, 5, 8);
scene.add(rimLight);

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.ShadowMaterial({ opacity: 0.3 })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -0.5;
floor.receiveShadow = true;
scene.add(floor);

// Main Object
const mainGeo = new THREE.TorusKnotGeometry(0.8, 0.3, 128, 32);
const mainMat = new THREE.MeshPhysicalMaterial({
    color: 0xffd700,
    metalness: 0.9,
    roughness: 0.1,
    envMapIntensity: 1.5,
    clearcoat: 0.2,
    clearcoatRoughness: 0.3,
});
const mainMesh = new THREE.Mesh(mainGeo, mainMat);
mainMesh.position.set(0, 1.5, 0);
mainMesh.castShadow = true;
scene.add(mainMesh);

// Ring 1
const ringGeo = new THREE.TorusGeometry(0.5, 0.05, 32, 64);
const ringMat = new THREE.MeshPhysicalMaterial({
    color: 0x0066ff,
    metalness: 0.8,
    roughness: 0.2,
    transparent: true,
    opacity: 0.8,
});
const ring = new THREE.Mesh(ringGeo, ringMat);
ring.position.set(-1.5, 2.2, 0);
ring.rotation.x = 0.5;
ring.rotation.z = 0.3;
scene.add(ring);

// Ring 2
const ring2Mat = new THREE.MeshPhysicalMaterial({
    color: 0xff8800,
    metalness: 0.9,
    roughness: 0.15,
});
const ring2 = new THREE.Mesh(ringGeo, ring2Mat);
ring2.position.set(1.5, 2.5, -0.5);
ring2.rotation.x = 0.8;
ring2.rotation.z = -0.5;
ring2.scale.set(0.7, 0.7, 0.7);
scene.add(ring2);

// Spheres
const sphereGroup = new THREE.Group();
const sphereMat = new THREE.MeshPhysicalMaterial({
    color: 0xff4466,
    metalness: 0.7,
    roughness: 0.2,
    emissive: 0xff2244,
    emissiveIntensity: 0.1,
});
for (let i = 0; i < 12; i++) {
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), sphereMat);
    const angle = (i / 12) * Math.PI * 2;
    const radius = 1.6;
    sphere.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius + 1.5, 0);
    sphere.castShadow = true;
    sphereGroup.add(sphere);
}
scene.add(sphereGroup);

// Cube
const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x88ccff,
    metalness: 0.1,
    roughness: 0.05,
    transparent: true,
    opacity: 0.4,
});
const cube = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), glassMat);
cube.position.set(-0.5, 2.8, 1);
cube.castShadow = true;
scene.add(cube);

// Icosahedron
const icoMat = new THREE.MeshPhysicalMaterial({
    color: 0x44ff88,
    metalness: 0.5,
    roughness: 0.2,
    emissive: 0x22ff66,
    emissiveIntensity: 0.05,
});
const ico = new THREE.Mesh(new THREE.IcosahedronGeometry(0.25, 0), icoMat);
ico.position.set(0.8, 2.6, -1);
ico.castShadow = true;
scene.add(ico);

// 3D Text
const fontLoader = new FontLoader();
fontLoader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', function (font) {
    const geo = new TextGeometry('3D Web Experiences', {
        font: font,
        size: 0.6,
        height: 0.15,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.01,
    });
    geo.computeBoundingBox();
    const box = geo.boundingBox;
    const centerX = (box.max.x + box.min.x) / 2;
    geo.translate(-centerX, 0, 0);

    const mat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.9,
        roughness: 0.1,
        emissive: 0x0066ff,
        emissiveIntensity: 0.05,
        envMapIntensity: 1.5,
    });
    const textMesh = new THREE.Mesh(geo, mat);
    textMesh.position.set(0, -0.2, 0);
    textMesh.castShadow = true;
    scene.add(textMesh);
});

// Particles
const particlesCount = 2000;
const positions = new Float32Array(particlesCount * 3);
const colors = new Float32Array(particlesCount * 3);
const sizes = new Float32Array(particlesCount);
for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 40;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
    const color = new THREE.Color().setHSL(0.6 + Math.random() * 0.3, 0.5, 0.5 + Math.random() * 0.5);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
    sizes[i] = 0.02 + Math.random() * 0.06;
}
const particleGeo = new THREE.BufferGeometry();
particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
const particleMat = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
});
const particles = new THREE.Points(particleGeo, particleMat);
scene.add(particles);

// Mouse Glow
const mouse = { x: 0, y: 0 };
const glowLight = new THREE.PointLight(0x0066ff, 0, 5);
glowLight.position.set(0, 0, 0);
scene.add(glowLight);

window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    glowLight.position.x = mouse.x * 3;
    glowLight.position.y = mouse.y * 2 + 1;
    glowLight.intensity = 30;
});

window.addEventListener('mouseleave', () => {
    glowLight.intensity = 0;
});

// Animation
const clock = new THREE.Clock();
function animate() {
    const time = clock.getElapsedTime();
    mainMesh.rotation.x = time * 0.2;
    mainMesh.rotation.y = time * 0.3;
    mainMesh.position.y = 1.5 + Math.sin(time * 0.5) * 0.1;
    ring.rotation.x = time * 0.4;
    ring.rotation.y = time * 0.6;
    ring.position.y = 2.2 + Math.sin(time * 0.6 + 1) * 0.1;
    ring2.rotation.x = time * 0.5 + 0.5;
    ring2.rotation.y = time * 0.7 + 0.3;
    ring2.position.y = 2.5 + Math.sin(time * 0.4 + 2) * 0.1;
    sphereGroup.rotation.z = time * 0.3;
    sphereGroup.position.y = 1.5 + Math.sin(time * 0.5) * 0.1;
    cube.position.y = 2.8 + Math.sin(time * 0.7) * 0.2;
    cube.rotation.x = time * 0.3;
    cube.rotation.y = time * 0.5;
    ico.position.y = 2.6 + Math.sin(time * 0.5 + 1.5) * 0.2;
    ico.rotation.x = time * 0.4;
    ico.rotation.z = time * 0.6;
    particles.rotation.y = time * 0.01;
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();

// Resize
window.addEventListener('resize', () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
});

console.log('🚀 3D Portfolio loaded!');