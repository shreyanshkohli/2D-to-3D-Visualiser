//imports
import * as THREE from 'C:/Users/Kohli/Downloads/04-local-server (1)/node_modules/three';
console.log(THREE);
import { OrbitControls } from 'C:/Users/Kohli/Downloads/04-local-server (1)/node_modules/three/examples/jsm/controls/OrbitControls.js';

//screen sizes
const sizes = {
    width : 900,
    height : 800
};

//canvas
const canvas = document.querySelector('canvas.webgl');

//scene
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xbfe3dd );

//camera
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,1000);
scene.add(camera);

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
const planeShape = new THREE.PlaneGeometry(8,8);
const planeMaterial = new THREE.MeshBasicMaterial({
    map : textureLoader.load('floor texture.jpg'),
    side : THREE.DoubleSide
});
const plane = new THREE.Mesh(planeShape,planeMaterial);
plane.rotation.x = 0.5*Math.PI;
plane.position.set(0,0,0)
scene.add(plane);

//light
const light = new THREE.AmbientLight( 0x404040 ); 
scene.add( light );

//wall shape
const shape = new THREE.BoxGeometry(1,1,0.1);
const material = new THREE.MeshBasicMaterial({
    map : textureLoader.load('wall texture.jpg')
});

//floor map data
var floorMap = [
    [1,1,1,1,1,1],
    [1,0,0,0,0,1],
    [1,0,0,0,0,1],
    [1,1,1,1,1,1]
];
let length = 0;
let height = 0;
for(let i=0; i<floorMap.length; i++) {
    length++;
}
for(let j=0; j<floorMap[length-1].length; j++) {
    height++;
}

const wall = new THREE.Group();

for(let x=0; x<length; x++) {
    for(let z=0; z<height; z++) {
        if(floorMap[x][z]==1) {
            let cube = new THREE.Mesh(shape,material);
            // if(z==1 || z==2 || z==3 || z==4) {
            //     cube.rotation.y = 0.5*Math.PI;
            //     if(x==0) {
            //         cube.position.set(x-0.4-1.5,0.5,z-1.5);
            //     }
            //     else {
            //         cube.position.set(x+0.4-1.5,0.5,z-1.5);
            //     }
            // }
            // else {
            //     if(z==0) {
            //         cube.position.set(x-1.5,0.5,z+0.5-1.5);
            //     }
            //     else {
            //         cube.position.set(x-1.5,0.5,z-0.5-1.5);
            //     }
            // }
            cube.position.set(x-0.4-1.5,0.5,z-1.5);
            wall.add(cube);
        }
    }
}
//walls group
scene.add(wall);

//render
camera.position.set(0,1,3);
function render() {
    controls.update();
    renderer.render(scene,camera);
}
renderer.setAnimationLoop(render);