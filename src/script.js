import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import Stats from 'stats.js';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);
scene.add(camera);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 5);
light.castShadow = true;
scene.add(light);

// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, physicallyCorrectLights: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.castShadow = true;

// Window resize
window.addEventListener('resize', () =>
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.render(scene, camera);
});

// Handle Fullscreen
window.addEventListener('dblclick', () =>
    {
        const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;
    
        if (!fullscreenElement)
        {
            canvas.requestFullscreen();
        }
        else
        {
            if (document.exitFullscreen)
            {
                document.exitFullscreen();
            }
            else if (document.webkitFullscreen)
            {
                document.webkitExitFullscreen();
            }
        }
    });

// Frame rate
const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

// Objects
function createPlanet({ radius, widthSegments, heightSegments, positionX, textures = {}, emissiveColor = null }) 
{
    const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    const materialConfig = { map: new THREE.TextureLoader().load(textures.color) };

    if (textures.normal) {
        materialConfig.normalMap = new THREE.TextureLoader().load(textures.normal);
    }
    if (textures.bump) {
        materialConfig.bumpMap = new THREE.TextureLoader().load(textures.bump);
    }
    if (emissiveColor) {
        materialConfig.emissive = new THREE.Color(emissiveColor);
        materialConfig.emissiveIntensity = 0.5; // Adjust as needed
    }

    const material = new THREE.MeshStandardMaterial(materialConfig);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = positionX;

    // Set shadow properties
    mesh.receiveShadow = true;
    mesh.castShadow = true;

    return mesh;
}

// Earth
const earth = createPlanet({
    radius: 1,
    widthSegments: 32,
    heightSegments: 32,
    positionX: 0,
    textures: {
        color: 'textures/2k_earth_daymap.jpg',
        night: 'textures/2k_earth_nightmap.jpg',
        normal: 'textures/2k_earth_normal_map.tif',
        specular: 'textures/2k_earth_specular_map.tif'
    }
});
scene.add(earth);

// Orbit controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.minDistance = 3;
controls.maxDistance = 10;

// Animation
const clock = new THREE.Clock();
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime();

    // Update objects
    earth.rotation.y = elapsedTime * 0.1;

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    stats.update();
    requestAnimationFrame(tick);
};
tick();
