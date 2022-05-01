let camera, scene, renderer, cube, controls, rocket, textureLoader;
const size = 100,
    divisions = 50;
let xIncrease = true;

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

    textureLoader = new THREE.TextureLoader();
    // Init renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });

    // Set size (whole window)
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Render to canvas element
    document.body.appendChild(renderer.domElement);

    rocket = createRocket();
    scene.add(rocket);

    // Position camera
    camera.position.z = 5;
    const gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper);

    camera.position.set(0, 20, 100);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();
}

function createRocket() {
    const group = new THREE.Group();

    const cylinderHeight = 10,
        sharedRadius = 2;
    //  radius, height, raidal segments
    const coneGeometry = new THREE.ConeGeometry(sharedRadius, 10, 32);
    const rainbowTexture = textureLoader.load(
        "textures/ranbow.jpg"
    );
    const coneMaterial = new THREE.MeshBasicMaterial({ map: rainbowTexture });

    const cone = new THREE.Mesh(coneGeometry, coneMaterial);

    // rad top, bottom, height, segments
    const cylinderGeometry = new THREE.CylinderGeometry(
        sharedRadius,
        sharedRadius,
        cylinderHeight,
        32
    );

    // Add texture -
    const texture = new THREE.TextureLoader().load("textures/texture1.jpg");

    //Create material with texture
    const materialCylinder = new THREE.MeshBasicMaterial({ map: texture });

    const cylinder = new THREE.Mesh(cylinderGeometry, materialCylinder);

    cone.position.y = cylinder.position.y + cylinderHeight;

    // RingGeometry(innerRadius : Float, outerRadius : Float, thetaSegments : Integer, phiSegments : Integer, thetaStart : Float, thetaLength : Float)
    const ringGeometry = new THREE.RingGeometry(sharedRadius, 5, 9, 8, 1);
    const ringMaterial = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        color: 800000,
    });

    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    // ring.rotation.set(new THREE.Vector3(0, 0, Math.PI / 2));
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -3.5;

    group.add(cone);
    group.add(cylinder);
    group.add(ring);
    return group;
}

// Draw the scene every time the screen is refreshed
function animate() {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
    wiggleRocket();
    // rocket.rotation.z += 0.01;
}

function wiggleRocket() {
    if (rocket.rotation.x > 1) {
        xIncrease = false;
    } else if (rocket.rotation.x < -1) {
        xIncrease = true;
    }

    if (xIncrease) {
        rocket.rotation.x += 0.01;
    } else {
        rocket.rotation.x -= 0.01;
    }

    rocket.rotation.y += 0.01;

    console.log(`x ${rocket.rotation.x}`);
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
