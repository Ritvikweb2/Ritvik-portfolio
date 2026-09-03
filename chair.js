import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

// ============================================
// CINEMATIC RELOAD EFFECT
// ============================================
const isReload = performance.navigation.type === 1;

if (isReload) {
    document.body.style.opacity = '0';
    document.body.style.transition = 'none';

    setTimeout(() => {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #05050a;
            z-index: 99999;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            opacity: 1;
            transition: opacity 1s ease;
        `;

        overlay.innerHTML = `
            <div style="text-align: center;">
                <div style="
                    width: 100px;
                    height: 100px;
                    border: 2px solid rgba(255,255,255,0.06);
                    border-radius: 50%;
                    margin: 0 auto 2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: pulseRing 1.5s ease-in-out infinite;
                ">
                    <span style="
                        font-size: 2.5rem;
                        font-weight: 700;
                        color: #0066ff;
                        letter-spacing: 4px;
                        animation: pulseText 1.5s ease-in-out infinite;
                    ">D</span>
                </div>
                <p style="
                    font-family: 'Inter', sans-serif;
                    font-size: 0.7rem;
                    letter-spacing: 4px;
                    opacity: 0.3;
                    color: #fff;
                ">REFRESHING EXPERIENCE</p>
                <div style="
                    width: 160px;
                    height: 2px;
                    background: rgba(255,255,255,0.04);
                    margin: 1.5rem auto 0;
                    overflow: hidden;
                    border-radius: 2px;
                ">
                    <div style="
                        width: 0%;
                        height: 100%;
                        background: #0066ff;
                        animation: progressBar 1.5s ease forwards;
                    "></div>
                </div>
            </div>
            <style>
                @keyframes pulseRing {
                    0%, 100% { transform: scale(1); opacity: 0.3; }
                    50% { transform: scale(1.1); opacity: 1; }
                }
                @keyframes pulseText {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                @keyframes progressBar {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
            </style>
        `;

        document.body.appendChild(overlay);

        setTimeout(() => {
            overlay.style.opacity = '0';
            document.body.style.opacity = '1';
            document.body.style.transition = 'opacity 0.8s ease';

            setTimeout(() => {
                overlay.remove();
            }, 1000);
        }, 2000);
    }, 200);
}

// ============================================
// PRE-LOADER
// ============================================
const preloader = document.getElementById('preloader');
const progressBar = document.querySelector('.preloader-progress');
const statusText = document.querySelector('.preloader-status');
const percentText = document.querySelector('.preloader-percent');
const messages = ['Loading 3D assets...', 'Building scene...', 'Applying lighting...', 'Almost ready...'];
let progress = 0;
let msgIndex = 0;

function updateProgress() {
    progress += 5 + Math.random() * 12;
    if (progress > 100) progress = 100;
    if (progressBar) progressBar.style.width = progress + '%';
    if (percentText) percentText.textContent = Math.round(progress) + '%';

    const newIndex = Math.floor((progress / 100) * (messages.length - 1));
    if (newIndex > msgIndex) {
        msgIndex = newIndex;
        if (statusText) statusText.textContent = messages[msgIndex];
    }

    if (progress < 100) {
        setTimeout(updateProgress, 200 + Math.random() * 300);
    } else {
        if (statusText) statusText.textContent = '✦ Ready';
        if (percentText) percentText.textContent = '100%';
        setTimeout(() => {
            if (preloader) preloader.classList.add('hidden');
        }, 600);
    }
}

if (preloader) {
    preloader.addEventListener('click', () => {
        if (progress < 100) {
            progress = 100;
            if (progressBar) progressBar.style.width = '100%';
            if (percentText) percentText.textContent = '100%';
            if (statusText) statusText.textContent = '✦ Ready';
            setTimeout(() => {
                if (preloader) preloader.classList.add('hidden');
            }, 300);
        }
    });
}



setTimeout(updateProgress, 400);

// ===== ADD THIS LINE =====
// Force hide preloader after 5 seconds (fallback)
setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hidden');
    }
}, 5000);




// ============================================
// CHAIR
// ============================================
const chairContainer = document.getElementById('chair-container');
if (!chairContainer) {
    console.error('Chair container not found');
}

const chairScene = new THREE.Scene();
chairScene.background = new THREE.Color(0x080812);
chairScene.fog = new THREE.Fog(0x080812, 8, 15);

const chairCamera = new THREE.PerspectiveCamera(40, chairContainer.clientWidth / chairContainer.clientHeight, 0.1, 100);
chairCamera.position.set(3.5, 2.5, 5.5);

const chairRenderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: false,
    powerPreference: "high-performance"
});
chairRenderer.setSize(chairContainer.clientWidth, chairContainer.clientHeight);
chairRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
chairRenderer.shadowMap.enabled = true;
chairRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
chairRenderer.toneMapping = THREE.ACESFilmicToneMapping;
chairRenderer.toneMappingExposure = 1.2;
chairRenderer.outputColorSpace = THREE.SRGBColorSpace;
chairContainer.appendChild(chairRenderer.domElement);

const chairControls = new OrbitControls(chairCamera, chairRenderer.domElement);
chairControls.target.set(0, 0.5, 0);
chairControls.enableDamping = true;
chairControls.dampingFactor = 0.05;
chairControls.autoRotate = true;
chairControls.autoRotateSpeed = 1.2;
chairControls.minDistance = 2;
chairControls.maxDistance = 10;
chairControls.maxPolarAngle = Math.PI / 2.1;
chairControls.update();

// Post-processing
const composer = new EffectComposer(chairRenderer);
const renderPass = new RenderPass(chairScene, chairCamera);
composer.addPass(renderPass);
const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(chairContainer.clientWidth, chairContainer.clientHeight),
    0.15, 0.4, 0.85
);
composer.addPass(bloomPass);
const outputPass = new OutputPass();
composer.addPass(outputPass);

// Lighting
const envLight = new THREE.HemisphereLight(0x4488ff, 0x002244, 0.6);
chairScene.add(envLight);
const chAmbient = new THREE.AmbientLight(0x222244, 0.3);
chairScene.add(chAmbient);
const chKey = new THREE.DirectionalLight(0xffeedd, 3);
chKey.position.set(5, 8, 6);
chKey.castShadow = true;
chairScene.add(chKey);
const chFill = new THREE.DirectionalLight(0x4488ff, 0.8);
chFill.position.set(-4, 3, -3);
chairScene.add(chFill);
const chRim = new THREE.DirectionalLight(0xffffff, 1.2);
chRim.position.set(-3, 5, 5);
chairScene.add(chRim);

// Floor
const chFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 12),
    new THREE.MeshStandardMaterial({ color: 0x0a0a18, roughness: 0.2, metalness: 0.9, envMapIntensity: 0.5 })
);
chFloor.rotation.x = -Math.PI / 2;
chFloor.position.y = -0.25;
chFloor.receiveShadow = true;
chairScene.add(chFloor);

const chairGrid = new THREE.GridHelper(10, 20, 0x0066ff, 0x222244);
chairGrid.position.y = -0.24;
chairGrid.material.transparent = true;
chairGrid.material.opacity = 0.15;
chairScene.add(chairGrid);

// Build Chair
const chairGroup = new THREE.Group();

const seatMat = new THREE.MeshPhysicalMaterial({ color: 0xd4a373, roughness: 0.4, metalness: 0.05, clearcoat: 0.1, clearcoatRoughness: 0.4 });
const seat = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.18, 1.4), seatMat);
seat.position.y = 0.4;
seat.castShadow = true;
seat.receiveShadow = true;
chairGroup.add(seat);

const cushionMat = new THREE.MeshPhysicalMaterial({ color: 0xe8c9a0, roughness: 0.85, metalness: 0, clearcoat: 0.05 });
const cushion = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.12, 1.2), cushionMat);
cushion.position.y = 0.56;
cushion.castShadow = true;
cushion.receiveShadow = true;
chairGroup.add(cushion);

const backMat = new THREE.MeshPhysicalMaterial({ color: 0xd4a373, roughness: 0.4, metalness: 0.05, clearcoat: 0.1 });
const back = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.7, 0.1), backMat);
back.position.set(0, 0.85, -0.7);
back.castShadow = true;
back.receiveShadow = true;
chairGroup.add(back);

const backCushionMat = new THREE.MeshPhysicalMaterial({ color: 0xe8c9a0, roughness: 0.85, metalness: 0 });
const backCushion = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.5, 0.08), backCushionMat);
backCushion.position.set(0, 0.85, -0.65);
chairGroup.add(backCushion);

const legMat = new THREE.MeshPhysicalMaterial({ color: 0x888899, roughness: 0.15, metalness: 0.95, envMapIntensity: 1.0 });
const legPositions = [
    {x: -0.5, z: -0.5}, {x: 0.5, z: -0.5},
    {x: -0.5, z: 0.5}, {x: 0.5, z: 0.5}
];
legPositions.forEach(({x, z}) => {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.075, 0.5, 12), legMat);
    leg.position.set(x, 0.2, z);
    leg.castShadow = true;
    chairGroup.add(leg);
    const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.04, 12), legMat);
    foot.position.set(x, 0.02, z);
    chairGroup.add(foot);
});

const armMat = new THREE.MeshPhysicalMaterial({ color: 0x888899, roughness: 0.15, metalness: 0.9, envMapIntensity: 0.8 });
[-0.75, 0.75].forEach(x => {
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.05, 0.65), armMat);
    arm.position.set(x, 0.65, 0);
    arm.castShadow = true;
    chairGroup.add(arm);
    const postMat = new THREE.MeshPhysicalMaterial({ color: 0x777788, roughness: 0.2, metalness: 0.9 });
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.4, 8), postMat);
    post.position.set(x, 0.4, 0.35);
    chairGroup.add(post);
    const post2 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.4, 8), postMat);
    post2.position.set(x, 0.4, -0.35);
    chairGroup.add(post2);
});

const btnMat = new THREE.MeshPhysicalMaterial({ color: 0xc9a87a, roughness: 0.7, metalness: 0 });
[-0.3, 0, 0.3].forEach(x => {
    const btn = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), btnMat);
    btn.position.set(x, 0.61, -0.7);
    btn.scale.y = 0.3;
    chairGroup.add(btn);
});

chairGroup.position.y = 0;
chairScene.add(chairGroup);

const chairMaterials = { seat: seatMat, cushion: cushionMat, back: backMat, backCushion: backCushionMat };

// Chair Particles
const chairParticleCount = 400;
const chairParticleGeo = new THREE.BufferGeometry();
const chairParticlePos = new Float32Array(chairParticleCount * 3);
const chairParticleSizes = new Float32Array(chairParticleCount);
for (let i = 0; i < chairParticleCount; i++) {
    chairParticlePos[i * 3] = (Math.random() - 0.5) * 8;
    chairParticlePos[i * 3 + 1] = (Math.random() - 0.5) * 4 + 0.5;
    chairParticlePos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    chairParticleSizes[i] = 0.01 + Math.random() * 0.03;
}
chairParticleGeo.setAttribute('position', new THREE.BufferAttribute(chairParticlePos, 3));
chairParticleGeo.setAttribute('size', new THREE.BufferAttribute(chairParticleSizes, 1));

const chairParticleMat = new THREE.PointsMaterial({
    size: 0.025,
    color: 0x4488ff,
    transparent: true,
    opacity: 0.3,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
});
const chairParticles = new THREE.Points(chairParticleGeo, chairParticleMat);
chairParticles.position.y = 0;
chairScene.add(chairParticles);

// Chair Color
document.querySelectorAll('#chair .color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('#chair .color-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const color = btn.dataset.color;
        Object.values(chairMaterials).forEach(mat => mat.color.set(color));
        btnMat.color.set(color);
    });
});

// Chair Animation
const clock = new THREE.Clock();

function animateChair() {
    const time = clock.getElapsedTime();
    requestAnimationFrame(animateChair);

    const positions = chairParticles.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + i) * 0.0003;
    }
    chairParticles.geometry.attributes.position.needsUpdate = true;

    chairControls.update();
    composer.render();
}
animateChair();

// Resize
window.addEventListener('resize', () => {
    const w = chairContainer.clientWidth;
    const h = chairContainer.clientHeight;
    chairCamera.aspect = w / h;
    chairCamera.updateProjectionMatrix();
    chairRenderer.setSize(w, h);
    composer.setSize(w, h);
});

console.log('🪑 Chair loaded!');

// ============================================
// CAR
// ============================================
const carContainer = document.getElementById('car-container');
if (!carContainer) {
    console.error('Car container not found');
}

const carScene = new THREE.Scene();
carScene.background = new THREE.Color(0x080812);

const carCamera = new THREE.PerspectiveCamera(30, carContainer.clientWidth / carContainer.clientHeight, 0.1, 100);
carCamera.position.set(4, 2.5, 7);

const carRenderer = new THREE.WebGLRenderer({ antialias: true });
carRenderer.setSize(carContainer.clientWidth, carContainer.clientHeight);
carRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
carRenderer.shadowMap.enabled = true;
carRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
carRenderer.toneMapping = THREE.ACESFilmicToneMapping;
carRenderer.toneMappingExposure = 1.2;
carContainer.appendChild(carRenderer.domElement);

const carControls = new OrbitControls(carCamera, carRenderer.domElement);
carControls.target.set(0, 0.4, 0);
carControls.enableDamping = true;
carControls.dampingFactor = 0.05;
carControls.autoRotate = true;
carControls.autoRotateSpeed = 0.8;
carControls.update();

// Car Lighting
const ca = new THREE.AmbientLight(0x222244, 0.4);
carScene.add(ca);
const ck = new THREE.DirectionalLight(0xffeedd, 3);
ck.position.set(5, 10, 8);
ck.castShadow = true;
carScene.add(ck);
const cf = new THREE.DirectionalLight(0x4488ff, 0.8);
cf.position.set(-6, 4, -4);
carScene.add(cf);
const cr = new THREE.DirectionalLight(0xffffff, 1.2);
cr.position.set(-4, 3, 8);
carScene.add(cr);

// Car Floor
const cf2 = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 12),
    new THREE.MeshStandardMaterial({ color: 0x0a0a18, roughness: 0.2, metalness: 0.9 })
);
cf2.rotation.x = -Math.PI / 2;
cf2.position.y = -0.3;
cf2.receiveShadow = true;
carScene.add(cf2);

// Build Car
const carGroup = new THREE.Group();

const bodyMat = new THREE.MeshPhysicalMaterial({ color: 0xff1a1a, roughness: 0.08, metalness: 0.95, clearcoat: 0.3 });
const body = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.35, 1.0), bodyMat);
body.position.y = 0.35;
body.castShadow = true;
carGroup.add(body);

const bumperMat = bodyMat.clone();
const bumper = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.2, 0.9), bumperMat);
bumper.position.set(-1.1, 0.2, 0);
carGroup.add(bumper);

const rearBumper = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.2, 0.9), bumperMat);
rearBumper.position.set(1.1, 0.2, 0);
carGroup.add(rearBumper);

const cabinMat = new THREE.MeshPhysicalMaterial({ color: 0x1a1a3a, roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.7 });
const cabin = new THREE.Mesh(new THREE.SphereGeometry(0.4, 20, 12), cabinMat);
cabin.scale.set(0.8, 0.25, 0.7);
cabin.position.set(0.1, 0.7, 0);
carGroup.add(cabin);

const wheelMat = new THREE.MeshPhysicalMaterial({ color: 0x111111, roughness: 0.9 });
const rimMat = new THREE.MeshPhysicalMaterial({ color: 0xcccccc, roughness: 0.08, metalness: 0.95 });
const wPos = [
    {x: -0.75, z: -0.6}, {x: 0.75, z: -0.6},
    {x: -0.75, z: 0.6}, {x: 0.75, z: 0.6}
];
wPos.forEach(({x, z}) => {
    const tire = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.08, 16, 24), wheelMat);
    tire.position.set(x, 0.12, z);
    tire.rotation.y = Math.PI / 2;
    tire.castShadow = true;
    carGroup.add(tire);
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.06, 16), rimMat);
    rim.position.set(x, 0.12, z);
    rim.rotation.x = Math.PI / 2;
    carGroup.add(rim);
});

const hlMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, emissive: 0x88ccff, emissiveIntensity: 0.8 });
[[-1.15, -0.2], [-1.15, 0.2]].forEach(([x, z]) => {
    const hl = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 12), hlMat);
    hl.position.set(x, 0.35, z);
    carGroup.add(hl);
});

const tlMat = new THREE.MeshPhysicalMaterial({ color: 0xff0000, emissive: 0xff2200, emissiveIntensity: 0.4 });
[[1.15, -0.2], [1.15, 0.2]].forEach(([x, z]) => {
    const tl = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.06, 0.1), tlMat);
    tl.position.set(x, 0.35, z);
    carGroup.add(tl);
});

const spMat = new THREE.MeshPhysicalMaterial({ color: 0x1a1a1a, roughness: 0.2, metalness: 0.6 });
const sp = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.03, 0.2), spMat);
sp.position.set(1.2, 0.75, 0);
carGroup.add(sp);

carGroup.position.y = 0.1;
carScene.add(carGroup);

const carParts = [bodyMat, bumperMat];

document.querySelectorAll('#car .color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('#car .color-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const color = btn.dataset.color;
        carParts.forEach(mat => mat.color.set(color));
        if (color === '#ff1a1a') cabinMat.color.set('#1a1a3a');
        else if (color === '#0066ff') cabinMat.color.set('#0a1a4a');
        else if (color === '#000000') cabinMat.color.set('#111111');
        else if (color === '#ffffff') cabinMat.color.set('#333355');
    });
});

document.querySelectorAll('.finish-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.finish-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.finish;
        carParts.forEach(mat => {
            if (f === 'metallic') { mat.roughness = 0.08; mat.metalness = 0.95; }
            else if (f === 'matte') { mat.roughness = 0.85; mat.metalness = 0.1; }
            else if (f === 'pearl') { mat.roughness = 0.2; mat.metalness = 0.7; }
        });
    });
});

// Car Particles
const carParticleCount = 200;
const carParticleGeo = new THREE.BufferGeometry();
const carParticlePos = new Float32Array(carParticleCount * 3);
for (let i = 0; i < carParticleCount * 3; i++) {
    carParticlePos[i] = (Math.random() - 0.5) * 10;
}
carParticleGeo.setAttribute('position', new THREE.BufferAttribute(carParticlePos, 3));
const carParticleMat = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x4488ff,
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending,
});
const carParticles = new THREE.Points(carParticleGeo, carParticleMat);
carParticles.position.y = 0.5;
carScene.add(carParticles);

function animateCar() {
    requestAnimationFrame(animateCar);
    carControls.update();
    carRenderer.render(carScene, carCamera);
}
animateCar();

window.addEventListener('resize', () => {
    const w = carContainer.clientWidth;
    const h = carContainer.clientHeight;
    carCamera.aspect = w / h;
    carCamera.updateProjectionMatrix();
    carRenderer.setSize(w, h);
});

console.log('🚗 Car loaded!');
console.log('✅ DREIRAUM — All systems ready');