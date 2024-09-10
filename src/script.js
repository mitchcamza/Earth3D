import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import Stats from 'stats.js';
import earthVertexShader from './shaders/earth/earth.vert';
import earthFragmentShader from './shaders/earth/earth.frag';
import atmosphereVertexShader from './shaders/atmosphere/atmosphere.vert';
import atmosphereFragmentShader from './shaders/atmosphere/atmosphere.frag';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-3.2, 2.9, -1.2).normalize();
camera.lookAt(0, 0, 0);
scene.add(camera);

// Lights
const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
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
renderer.setClearColor(0x000000, 1);

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
// document.body.appendChild(stats.dom);

// Textures
const textureLoader = new THREE.TextureLoader();
const maxAnisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);

const earthDayTexture = textureLoader.load('textures/2k_earth_daymap.jpg');
earthDayTexture.colorSpace = THREE.SRGBColorSpace;
earthDayTexture.anisotropy = maxAnisotropy;

const earthNightTexture = textureLoader.load('textures/night.jpg');
earthNightTexture.colorSpace = THREE.SRGBColorSpace;
earthNightTexture.anisotropy = maxAnisotropy;

const earthSpecularCloudsTexture = textureLoader.load('textures/earth/specularClouds.jpg')
earthSpecularCloudsTexture.anisotropy = maxAnisotropy;

const earthBumpTexture = textureLoader.load('textures/8081_earthbump4k.jpg');
earthBumpTexture.anisotropy = maxAnisotropy;

const earthMetalnessTexture = textureLoader.load('textures/8081_earthspec4k.jpg');
earthMetalnessTexture.anisotropy = maxAnisotropy;

const flareTexture0 = textureLoader.load('textures/lensflare0.png');
const flareTexture1 = textureLoader.load('textures/lensflare1.png');

// Earth
const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
const earthMaterial = new THREE.ShaderMaterial({    
    vertexShader: earthVertexShader,
    fragmentShader: earthFragmentShader,
    uniforms: {
        uDayTexture: new THREE.Uniform(earthDayTexture),
        uNightTexture: new THREE.Uniform(earthNightTexture),
        uSpecularCloudsTexture: new THREE.Uniform(earthSpecularCloudsTexture),
        uSunDirection: new THREE.Uniform(new THREE.Vector3(1, 1, 1).normalize()),
        uAtmosphereDayColor: new THREE.Uniform(new THREE.Color(0x9fd8ff)),
        uAtmosphereNightColor: new THREE.Uniform(new THREE.Color(0x050c1f)),
    },
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earthMaterial.bumpMap = earthBumpTexture;
earthMaterial.bumpScale = 3.0;
earthMaterial.metalnessMap = earthMetalnessTexture;
earthMaterial.metalness = 0.1;
earthMaterial.roughness = 0.6;
earth.position.x = 0;
earth.rotation.x = THREE.MathUtils.degToRad(23.5);
scene.add(earth);

// Atmosphere
const atmosphereMaterial = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    transparent: true,
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    uniforms: 
    {
        uSunDirection: new THREE.Uniform(new THREE.Vector3(1, 1, 1).normalize()),
        uAtmosphereDayColor: new THREE.Uniform(new THREE.Color(0x9fd8ff)),
        uAtmosphereTwilightColor: new THREE.Uniform(new THREE.Color(0x050c1f)),
    },
});
const atmosphere = new THREE.Mesh(earthGeometry, atmosphereMaterial);
atmosphere.scale.set(1.025, 1.025, 1.025);
scene.add(atmosphere);

// Sun
const sunSpherical = new THREE.Spherical(1, Math.PI * 0.5, 0.5);
const sunDirection = new THREE.Vector3();
const debugSun = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.1, 2),
    new THREE.MeshBasicMaterial({ })
);
scene.add(debugSun);

const updateSun = () =>
{
    // Sun direction
    sunDirection.setFromSpherical(sunSpherical);

    // Debug
    debugSun.position
        .copy(sunDirection)
        .multiplyScalar(5);

    // Uniforms
    earthMaterial.uniforms.uSunDirection.value.copy(sunDirection);
    atmosphereMaterial.uniforms.uSunDirection.value.copy(sunDirection);
};
updateSun();


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

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    stats.update();
    requestAnimationFrame(tick);
};
tick();