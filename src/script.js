import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import Stats from 'stats.js';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5).normalize();
camera.lookAt(0, 0, 0);
scene.add(camera);

// Lights
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(5, 5, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Ambient light
const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
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

// Earth
const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
const earthMaterialConfig = {
    map: new THREE.TextureLoader().load('textures/2k_earth_daymap.jpg'),
    bumpMap: new THREE.TextureLoader().load('textures/8081_earthbump4k.jpg'),
    bumpScale: 3.0,
    metalnessMap: new THREE.TextureLoader().load('textures/8081_earthspec4k.jpg'),
    metalness: 0.1,
    roughness: 0.5,
};
const earthMaterial = new THREE.MeshStandardMaterial(earthMaterialConfig);
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.position.x = 0;
earth.rotation.x = THREE.MathUtils.degToRad(23.5);
earth.receiveShadow = true;
earth.castShadow = true;
scene.add(earth);

// Clouds
const cloudGeometry = new THREE.SphereGeometry(1.02, 32, 32);
const cloudMaterial = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('textures/2k_earth_clouds.jpg'),
    transparent: true,
    opacity: 0.2,
    depthWrite: false,
});
const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
scene.add(cloudMesh);

// Orbit controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.minDistance = 3;
controls.maxDistance = 10;

// Credits
const credits = document.createElement('a');
credits.href = 'https://github.com/mitchcamza/Earth3D';
credits.style.position = 'absolute';
credits.style.bottom = '10px';
credits.style.left = '10px';
credits.style.color = 'white';
credits.style.fontFamily = 'Arial';
credits.style.fontSize = '12px';
credits.innerHTML = 'Credits';
document.body.appendChild(credits);

// Animation
const clock = new THREE.Clock();
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime();

    // Rotate the earth
    earth.rotation.y = elapsedTime * 0.1;

    // Rotate the clouds
    cloudMesh.rotation.y = elapsedTime * 0.11;
    cloudMesh.rotation.x = elapsedTime * 0.001;

    // add axial tilt
    earth.rotation.x = THREE.MathUtils.degToRad(23.5);

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    stats.update();
    requestAnimationFrame(tick);
};
tick();
