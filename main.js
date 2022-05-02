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

function createFins() {
    const numFins = 2;
    const finGroup = new THREE.Group();

    const image_radius = 4;
    const radius = 4;
    const radian_interval = (2.0 * Math.PI) / numFins;
    const center_of_wheel = {
        x: 0,
        y: 0,
    };

    // Load an image file into a custom material
    material = new THREE.MeshBasicMaterial({
        // transparent: true,
        opacity: 1,
    });

    // circle = new THREE.CircleGeometry(image_radius, 0, 0, 6.28);
    // mesh = new THREE.Mesh(circle, material);
    // // mesh.rotation.x = Math.PI / 2;
    // // mesh.rotation.y = Math.PI / 2;
    // mesh.rotation.x = 0;

    // mesh.material.side = THREE.DoubleSide;

    // finGroup.add(mesh);

    return finGroup;
}

function drawTriangle() {
    const shape = new THREE.Shape();

    const x = 0;
    const y = 0;

    shape.moveTo(x - 5, y - 5);
    shape.lineTo(x + 5, y - 5);
    shape.lineTo(x, y + 5);

    const TriangleGeometry = new THREE.ShapeGeometry(shape);

    const material = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        color: 65535, // cian
    });
    const triangle = new THREE.Mesh(TriangleGeometry, material);
    // triangle.rotation.y += 45;
    return triangle;
}

function createRocket() {
    const rocketGroup = new THREE.Group();

    const cylinderHeight = 10,
        sharedRadius = 2;
    //  radius, height, raidal segments
    const coneGeometry = new THREE.ConeGeometry(sharedRadius, 10, 32);
    const rainbowTexture = textureLoader.load("textures/ranbow.jpg");
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
    const texture = new THREE.TextureLoader().load("textures/polkadots.jpg");

    //Create material with texture
    const materialCylinder = new THREE.MeshBasicMaterial({ map: texture });

    const cylinder = new THREE.Mesh(cylinderGeometry, materialCylinder);

    cone.position.y = cylinder.position.y + cylinderHeight;

    // RingGeometry(innerRadius : Float, outerRadius : Float, thetaSegments : Integer, phiSegments : Integer, thetaStart : Float, thetaLength : Float)
    // const ringGeometry = new THREE.RingGeometry(sharedRadius, 5, 9, 8, 1);
    // const ringMaterial = new THREE.MeshBasicMaterial({
    //     side: THREE.DoubleSide,
    //     color: 800000,
    // });

    // const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    // // ring.rotation.set(new THREE.Vector3(0, 0, Math.PI / 2));
    // ring.rotation.x = Math.PI / 2;
    // ring.position.y = -3.5;

    const fin1 = drawTriangle();
    const fin2 = drawTriangle();
    fin2.rotateY(THREE.Math.degToRad(90));
    rocketGroup.add(fin1);
    rocketGroup.add(fin2);
    rocketGroup.add(cone);
    rocketGroup.add(cylinder);
    // rocketGroup.add(ring);

    return rocketGroup;
}

// Draw the scene every time the screen is refreshed
function animate() {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
    wiggleRocket();
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
    // rocket.rotation.z += 0.01;

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
