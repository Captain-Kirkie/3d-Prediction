let camera, scene, renderer, cube, controls;
const size = 10,
    divisions = 10;
function init() {
    // Init scene
    scene = new THREE.Scene();

    // Init camera (PerspectiveCamera)
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    // Init renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });

    // Set size (whole window)
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Render to canvas element
    document.body.appendChild(renderer.domElement);

    // Init BoxGeometry object (rectangular cuboid)
    const geometry = new THREE.BoxGeometry(3, 3, 3);

    // Create material with color
    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });

    // Add texture -
    // const texture = new THREE.TextureLoader().load('textures/crate.gif');

    // Create material with texture
    // const material = new THREE.MeshBasicMaterial({ map: texture });

    // Create mesh with geo and material
    cube = new THREE.Mesh(geometry, material);
    // Add to scene
    scene.add(cube);

    // Position camera
    camera.position.z = 5;
    const gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper);

    camera.position.set(0, 20, 100);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();
}

// Draw the scene every time the screen is refreshed
function animate() {
    requestAnimationFrame(animate);

    // Rotate cube (Change values to change speed)
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    controls.update();

    renderer.render(scene, camera);
}

function onWindowResize() {
    // Camera frustum aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    // After making changes to aspect
    camera.updateProjectionMatrix();
    // Reset size
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);

init();
animate();
