// the module for generating and displaying the cubes

// first create the scene
const scene = new THREE.Scene();

/* now the camera
   to create the camera, the aspect ratio of the scene, field of view (in degrees)
   and the outer bounds of the clipping plane are needed */
   const aspectRatio = window.innerWidth/window.innerHeight;
   const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);

// This sets up the renderer, how the scene will be rendered with the camera
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// here, it's added to the html page as a <canvas> element
document.body.appendChild(renderer.domElement);

// let's add some light to the scene, to show that it's 3D
const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);


// and now for the cube
//const geometry = new THREE.BoxGeometry();
//const material = new THREE.MeshPhongMaterial({ color: 0x22ffaa });
//const cube = new THREE.Mesh(geometry, material);
//scene.add(cube);

// now to create the cube
const cube = newCube(2, 2, 2, 0x22ffaa);

camera.position.z = 5;

// a method that helps create new cubes to use in the scene
// takes in the cube's dimensions and colour
// returns the cube
function newCube(boxWidth, boxHeight, boxDepth, colour){
    // first create the box shape
    const cubeGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    // then create the material to put on the box shape
    // it's going to have a glossy look, to show that it's 3D
    const material = new THREE.MeshPhongMaterial({color: colour});

    // combine the shape and material
    const cube = new THREE.Mesh(cubeGeometry, material);

    scene.add(cube);

    return cube;
}

// the actions to take within the animation loop
function sceneMove(){
  // this code is to rotate the cube
  cube.rotation.x += 0.02;
  cube.rotation.y += 0.02;
  cube.rotation.z += 0.05;
}

function animate() {
  requestAnimationFrame( animate );
  sceneMove();
  renderer.render( scene, camera );
}

animate();
