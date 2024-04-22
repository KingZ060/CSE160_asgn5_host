import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';

document.addEventListener('DOMContentLoaded', main);

function simpleScene() {    
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
    renderer.setSize( window.innerWidth, window.innerHeight );

    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;
    const scene = new THREE.Scene();
	{
		const color = 0xFFFFFF;
		const intensity = 3;
		const light = new THREE.DirectionalLight( color, intensity );
		light.position.set( - 1, 2, 4 );
		scene.add( light );
	}


    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    const cubes = []; // just an array we can use to rotate the cubes
    const loadManager = new THREE.LoadingManager();
    const loader = new THREE.TextureLoader(loadManager);

    const materials = [
        new THREE.MeshBasicMaterial({map: loadColorTexture('../images/East.png')}),
        new THREE.MeshBasicMaterial({map: loadColorTexture('../images/South.png')}),
        new THREE.MeshBasicMaterial({map: loadColorTexture('../images/West.png')}),
        new THREE.MeshBasicMaterial({map: loadColorTexture('../images/North.png')}),
        new THREE.MeshBasicMaterial({map: loadColorTexture('../images/Middle.png')}),
        new THREE.MeshBasicMaterial({map: loadColorTexture('../images/Rich.png')}),
    ];

    const loadingElem = document.querySelector( '#loading' );
    const progressBarElem = loadingElem.querySelector( '.progressbar' );

    loadManager.onLoad = () => {
        loadingElem.style.display = 'none';
        const cube = new THREE.Mesh(geometry, materials);
        scene.add(cube);
        cubes.push(cube);  // add to our list of cubes to rotate
    };

    loadManager.onProgress = (urlOfLastItemLoaded, itemsLoaded, itemsTotal) => {
        const progress = itemsLoaded / itemsTotal;
        progressBarElem.style.transform = `scaleX(${progress})`;
    };
    
    function loadColorTexture( path ) {
        const texture = loader.load( path );
        texture.colorSpace = THREE.SRGBColorSpace;
        return texture;
    }

    function render(time) {
        time *= 0.001;  // convert time to seconds
        
        cubes.forEach((cube, ndx) => {
            const speed = 1 + ndx * .1;
            const rot = time * speed;
            cube.rotation.x = rot;
            cube.rotation.y = rot;
        });
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

function loadObj() {

	const canvas = document.querySelector( '#c' );
	const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );
    renderer.setSize( window.innerWidth, window.innerHeight );

	const fov = 45;
	const aspect = 2; // the canvas default
	const near = 0.1;
	const far = 100;
	const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
	camera.position.set( 0, 10, 20 );

	const controls = new OrbitControls( camera, canvas );
	controls.target.set( 0, 5, 0 );
	controls.update();

	const scene = new THREE.Scene();
	scene.background = new THREE.Color( 'black' );

	{

		const planeSize = 40;

		const loader = new THREE.TextureLoader();
		const texture = loader.load( '../images/checker.png' );
		texture.colorSpace = THREE.SRGBColorSpace;
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.magFilter = THREE.NearestFilter;
		const repeats = planeSize / 2;
		texture.repeat.set( repeats, repeats );

		const planeGeo = new THREE.PlaneGeometry( planeSize, planeSize );
		const planeMat = new THREE.MeshPhongMaterial( {
			map: texture,
			side: THREE.DoubleSide,
		} );
		const mesh = new THREE.Mesh( planeGeo, planeMat );
		mesh.rotation.x = Math.PI * - .5;
		scene.add( mesh );

	}

	{

		const skyColor = 0xB1E1FF; // light blue
		const groundColor = 0xB97A20; // brownish orange
		const intensity = 3;
		const light = new THREE.HemisphereLight( skyColor, groundColor, intensity );
		scene.add( light );

	}

	{

		const color = 0xFFFFFF;
		const intensity = 3;
		const light = new THREE.DirectionalLight( color, intensity );
		light.position.set( 5, 10, 2 );
		scene.add( light );
		scene.add( light.target );

	}

	{

		const mtlLoader = new MTLLoader();
		mtlLoader.load( '../models/windmill/windmill.mtl', ( mtl ) => {
			mtl.preload();
            mtl.materials.Material.side = THREE.DoubleSide;
			const objLoader = new OBJLoader();
			objLoader.setMaterials( mtl );
			objLoader.load( '../models/windmill/windmill.obj', ( root ) => {

				scene.add( root );

			} );

		} );


	}

	function resizeRendererToDisplaySize( renderer ) {

		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if ( needResize ) {

			renderer.setSize( width, height, false );

		}

		return needResize;

	}

	function render() {

		if ( resizeRendererToDisplaySize( renderer ) ) {

			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();

		}

		renderer.render( scene, camera );

		requestAnimationFrame( render );

	}

	requestAnimationFrame( render );

}

function LoadWork() {

	const canvas = document.querySelector( '#c' );
	const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );
    renderer.setSize( window.innerWidth, window.innerHeight );

	const fov = 45;
	const aspect = 2; // the canvas default
	const near = 0.1;
	const far = 100;
	const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
	camera.position.set( 0, 10, 20 );

	const controls = new OrbitControls( camera, canvas );
	controls.target.set( 0, 5, 0 );
	controls.update();

	const scene = new THREE.Scene();
	scene.background = new THREE.Color( 'black' );

	{
		const planeSize = 40;
		const loader = new THREE.TextureLoader();
		const texture = loader.load( '../images/checker.png' );
		texture.colorSpace = THREE.SRGBColorSpace;
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.magFilter = THREE.NearestFilter;
		const repeats = planeSize / 2;
		texture.repeat.set( repeats, repeats );

		const planeGeo = new THREE.PlaneGeometry( planeSize, planeSize );
		const planeMat = new THREE.MeshPhongMaterial( {
			map: texture,
			side: THREE.DoubleSide,
		} );
		const mesh = new THREE.Mesh( planeGeo, planeMat );
		mesh.rotation.x = Math.PI * - .5;
		scene.add( mesh );

	}

	{

		const skyColor = 0xB1E1FF; // light blue
		const groundColor = 0xB97A20; // brownish orange
		const intensity = 3;
		const light = new THREE.HemisphereLight( skyColor, groundColor, intensity );
		scene.add( light );

	}

	{

		const color = 0xFFFFFF;
		const intensity = 3;
		const light = new THREE.DirectionalLight( color, intensity );
		light.position.set( 5, 10, 2 );
		scene.add( light );
		scene.add( light.target );

	}

	{

		const mtlLoader = new MTLLoader();
		// mtlLoader.load( '../models/windmill/windmill.mtl', ( mtl ) => {
		// 	mtl.preload();
        //     mtl.materials.Material.side = THREE.DoubleSide;
		const objLoader = new OBJLoader();
		// objLoader.setMaterials( mtl );
		objLoader.load( '../models/mijonir/mijonir.obj', ( root ) => {

			scene.add( root );
				// compute the box that contains all the stuff
				// from root and below
				const box = new THREE.Box3().setFromObject(root);
			
				const boxSize = box.getSize(new THREE.Vector3()).length();
				const boxCenter = box.getCenter(new THREE.Vector3());
				function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
					const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
					const halfFovY = THREE.MathUtils.degToRad(camera.fov * .5);
					const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
					
					// compute a unit vector that points in the direction the camera is now
					// from the center of the box
					const direction = (new THREE.Vector3()).subVectors(camera.position, boxCenter).normalize();
					
					// move the camera to a position distance units way from the center
					// in whatever direction the camera was from the center already
					camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));
					
					// pick some near and far values for the frustum that
					// will contain the box.
					camera.near = boxSize / 100;
					camera.far = boxSize * 100;
					
					camera.updateProjectionMatrix();
					
					// point the camera to look at the center of the box
					camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
					}
				// set the camera to frame the box
				frameArea(boxSize * 1.2, boxSize, boxCenter, camera);
			
				// update the Trackball controls to handle the new size
				controls.maxDistance = boxSize * 10;
				controls.target.copy(boxCenter);
				controls.update();
		} );
	}

	const cubes = []; // just an array we can use to rotate the cubes
	{
		const boxWidth = 1;
		const boxHeight = 1;
		const boxDepth = 1;
		const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
		
		const loadManager = new THREE.LoadingManager();
		const loader = new THREE.TextureLoader(loadManager);
	
		const materials = [
			new THREE.MeshBasicMaterial({map: loadColorTexture('../images/East.png')}),
			new THREE.MeshBasicMaterial({map: loadColorTexture('../images/South.png')}),
			new THREE.MeshBasicMaterial({map: loadColorTexture('../images/West.png')}),
			new THREE.MeshBasicMaterial({map: loadColorTexture('../images/North.png')}),
			new THREE.MeshBasicMaterial({map: loadColorTexture('../images/Middle.png')}),
			new THREE.MeshBasicMaterial({map: loadColorTexture('../images/Rich.png')}),
		];
	
		loadManager.onLoad = () => {
			const cube = new THREE.Mesh(geometry, materials);
			cube.position.set(5,3);
			scene.add(cube);
			cubes.push(cube);  // add to our list of cubes to rotate
		};
	
		
		function loadColorTexture( path ) {
			const texture = loader.load( path );
			texture.colorSpace = THREE.SRGBColorSpace;
			return texture;
		}
	}

	const spheres = []; // just an array we can use to rotate the cubes
	{
		const radius = 2;  
		const widthSegments = 32; 
		const heightSegments = 32; 
		const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
		
		const loadManager = new THREE.LoadingManager();
		const loader = new THREE.TextureLoader(loadManager);
		const material = new THREE.MeshBasicMaterial({ map: loadColorTexture('../images/Empty.png') });

		loadManager.onLoad = () => {
			const sphere = new THREE.Mesh(geometry, material);
			sphere.position.set(-5,3,0);
			scene.add(sphere);
			spheres.push(sphere);  // add to our list of cubes to rotate
		};
	
		
		function loadColorTexture( path ) {
			const texture = loader.load( path );
			texture.colorSpace = THREE.SRGBColorSpace;
			return texture;
		}
	}


	{
		const radius = 2;
		const heightSegments = 10; 
		const radialSegment = 22;
		const geometry = new THREE.CylinderGeometry(radius, radius, heightSegments, radialSegment);
		
		const loadManager = new THREE.LoadingManager();
		const loader = new THREE.TextureLoader(loadManager);
		const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
		const cylinder = new THREE.Mesh(geometry, material);
		cylinder.position.set(5,5,5);
		scene.add(cylinder);
	}

	function resizeRendererToDisplaySize( renderer ) {

		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if ( needResize ) {

			renderer.setSize( width, height, false );

		}

		return needResize;

	}

	function render(time) {
		time *= 0.001;  // convert time to seconds
		if ( resizeRendererToDisplaySize( renderer ) ) {

			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();

		}

		cubes.forEach((cube, ndx) => {
            const speed = 1 + ndx * .1;
            const rot = time * speed;
            cube.rotation.x = rot;
            cube.rotation.y = rot;
        });

		spheres.forEach((sphere, ndx) => {
            const speed = 1 + ndx * .1;
            const rot = time * speed;
            sphere.rotation.x = rot;
            sphere.rotation.y = rot;
        });

		renderer.render( scene, camera );

		requestAnimationFrame( render );

	}

	requestAnimationFrame( render );

}

function main() {
    // simpleScene();
	// loadObj();
    LoadWork();
    
}



