/* A demonstration of the three.js module's capabilities.
   This program renders two cubes on the screen and makes them
   spin, while one orbits the other.

   The code here is adapted from the following sites:
   https://threejsfundamentals.org/threejs/lessons/threejs-fundamentals.html
   https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene
*/

// first create the scene
const scene = new THREE.Scene();

// next the renderer
// to display the animation in a canvas element that's inserted into the body
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// now the camera
// to create the camera, the aspect ratio of the scene, field of view (in degrees)
// and the outer bounds of the clipping plane are needed
const fieldOfView = 75;
const aspectRatio = window.innerWidth/window.innerHeight;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
// set camera position (so that the whole scene is viewable)
camera.position.z = 7;


// add light to the scene, to make the cube shine
const colour = 0xFFFFFF;
const intensity = 1;
const light = new THREE.DirectionalLight(colour, intensity);
light.position.set(-1, 2, 10);
scene.add(light);

// now to create the cubes
// the second cube will be moving, so the x-axis coordinate
// and whether its moving right (boolean) are also stored
const stillCube = newCube(2, 2, 2, 0x22ffaa);
const movingCube = newCube(1,1,1,0xaa22ff);

// this is to track the directions the moving cube will move in
let moveRight = false; // moving along x-axis
let moveForwards = false; // moving along z-axis
let moveUp = false; // moving along y-axis

// move one of the cubes to the right so that it isn't inside the cente cube
movingCube.position.x = 5;

// finally, render the scene
animate();


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
function sceneMove() {
  // this rotates the cubes
  // the larger one spins slower than the smaller one
  stillCube.rotation.x += 0.01;
  stillCube.rotation.y += 0.01;

  movingCube.rotation.x += 0.03;
  movingCube.rotation.y += 0.03;

  // one of the cube is going to be moving orbiting the other

  // this is the bound limits (of the orbit)
  const rightBound = 5;
  const leftBound = -5;
  const forwardBound = 5;
  const backBound = -5;
  const upBound = 2;
  const downBound = -2;


  // this is how fast it's moving
  let speed = 0.02;

  // to move it along the x-axis
  // check if it's moving right
  if (moveRight == true) {
    // have we hit the right boundary yet?
    if (movingCube.position.x >= rightBound){
      // now it should move left
      moveRight = false;
    } else {
      // keep moving to the right
      movingCube.position.x += speed;
    }
  } else if (moveRight == false){
    // it's moving left
    // have we hit the left boundary yet?
    if (movingCube.position.x <= leftBound){
      // now it should move to the right
      moveRight = true;
    } else {
      // keep moving to the left
      movingCube.position.x -= speed;
    }
  }

  // to move it along the z-axis
  // check if it's moving forwards
  if (moveForwards == true) {
    // have we hit the forwards boundary yet?
    if (movingCube.position.z >= forwardBound){
      // now it should move back
      moveForwards = false;
    } else {
      // keep moving towards the camera
      movingCube.position.z += speed;
    }
  } else if (moveForwards == false){
    // it's moving away from the camera
    // have we hit the back boundary yet?
    if (movingCube.position.z <= backBound){
      // now it should move forwards
      moveForwards = true;
    } else {
      // keep moving backwards
      movingCube.position.z -= speed;
    }
  }

  // to move it along the y-axis
  // is it moving up?
  if (moveUp == true) {
    // have we hit the upper boundary yet?
    if (movingCube.position.y >= upBound){
      // now it should move down
      moveUp = false;
    } else {
      // keep moving upwards
      movingCube.position.y += speed;
    }
  } else if (moveUp == false){
    // it's moving down
    // have we hit the lower boundary yet?
    if (movingCube.position.y <= downBound){
      // now it should move up
      moveUp = true;
    } else {
      // keep moving downwards
      movingCube.position.y -= speed;
    }
  }
}

// this is the animation loop, what is rendered each page refresh
// it takes in the renderer, scene and the camera
function animate(){
  // call the browser to render on refresh
  requestAnimationFrame(animate);

  // generating the next frame of animation
  sceneMove();

  // and render the frame to the sceen
  renderer.render(scene, camera);
}
