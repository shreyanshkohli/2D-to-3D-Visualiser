import * as THREE from 'three';

import { OrbitControls } from 'C:/Users/Kohli/Downloads/04-local-server (1)/node_modules/three/examples/jsm/controls/OrbitControls.js';

import { GLTFLoader } from 'C:/Users/Kohli/Downloads/04-local-server (1)/node_modules/three/examples/jsm/loaders/GLTFLoader.js';

const buildingLoader = new URL('C:/Users/Kohli/Downloads/04-local-server (1)/scene.gltf', import.meta.url);

//sizes
const sizes = {
    width : 900,
    height : 800
};

//scene
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xbfe3dd );

//camera
const camera = new THREE.PerspectiveCamera(475,sizes.width/sizes.height,0.1,1000);
scene.add(camera);

//canvas
const canvas = document.querySelector('canvas.webgl');

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas : canvas
});
renderer.setSize(sizes.width,sizes.height);
document.body.appendChild(renderer.domElement);

//orbit controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set( 0, 0.5, 0 );
controls.update();
controls.enablePan = false;
controls.enableDamping = true;

//texture loader
const textureLoader = new THREE.TextureLoader();

 //axes helper
 const axesHelper = new THREE.AxesHelper(1);
 scene.add(axesHelper);

 //plane
 const planeGeometry = new THREE.PlaneGeometry(3.5,2.5);
 const planeMaterial = new THREE.MeshBasicMaterial({
     map : textureLoader.load('grass.jpg'), 
     side : THREE.DoubleSide
 });
 const plane = new THREE.Mesh(planeGeometry,planeMaterial);
 plane.rotation.x = 0.5*Math.PI;
 scene.add(plane);

 //objects - wall1
 const shape1 = new THREE.BoxGeometry(3,1.5,0.1);
 const material = new THREE.MeshBasicMaterial({
     map : textureLoader.load('wall texture.jpg')
 });
 const wall1 = new THREE.Mesh(shape1,material);
 wall1.position.set(0,0.75,-1);
 scene.add(wall1);

 //objects - wall2
 const shape2 = new THREE.BoxGeometry(3,1.5,0.1);
 const wall2 = new THREE.Mesh(shape2,material);
 wall2.position.set(0,0.75,1);
 scene.add(wall2);

 //objects - wall3
 const shape3 = new THREE.BoxGeometry(2.1,1.5,0.1);
 const wall3 = new THREE.Mesh(shape3,material);
 wall3.rotation.y = 1.57;
 wall3.position.set(1.5,0.75,0);
 scene.add(wall3);

 //objects - wall4
 const shape4 = new THREE.BoxGeometry(2.1,1.5,0.1);
 const wall4 = new THREE.Mesh(shape4,material);
 wall4.rotation.y = 1.57;
 wall4.position.set(-1.5,0.75,0);
 scene.add(wall4);

//GLTF Loader
var loader = new GLTFLoader();
loader.load(buildingLoader.href, function (gltf) {
    const model = gltf.scene;
        scene.add(model);
        model.position.set(0,-10,0);
    });

//light
const directionalLight = new THREE.DirectionalLight('white',1);
scene.add(directionalLight);

//render scene
camera.position.set(0,1,3);
function animate() {
    controls.update();
    renderer.render(scene,camera);
}
renderer.setAnimationLoop(animate);