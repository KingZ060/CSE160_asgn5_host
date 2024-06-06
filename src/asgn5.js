import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';


document.addEventListener('DOMContentLoaded', main);

// function simpleScene() {    
//     const canvas = document.querySelector('#c');
//     const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
//     renderer.setSize( window.innerWidth, window.innerHeight );

//     const fov = 75;
//     const aspect = 2;  // the canvas default
//     const near = 0.1;
//     const far = 5;
//     const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
//     camera.position.z = 2;
//     const scene = new THREE.Scene();
// 	{
// 		const color = 0xFFFFFF;
// 		const intensity = 3;
// 		const light = new THREE.DirectionalLight( color, intensity );
// 		light.position.set( - 1, 2, 4 );
// 		scene.add( light );
// 	}


//     const boxWidth = 1;
//     const boxHeight = 1;
//     const boxDepth = 1;
//     const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

//     const cubes = []; // just an array we can use to rotate the cubes
//     const loadManager = new THREE.LoadingManager();
//     const loader = new THREE.TextureLoader(loadManager);

//     const materials = [
//         new THREE.MeshBasicMaterial({map: loadColorTexture('../images/East.png')}),
//         new THREE.MeshBasicMaterial({map: loadColorTexture('../images/South.png')}),
//         new THREE.MeshBasicMaterial({map: loadColorTexture('../images/West.png')}),
//         new THREE.MeshBasicMaterial({map: loadColorTexture('../images/North.png')}),
//         new THREE.MeshBasicMaterial({map: loadColorTexture('../images/Middle.png')}),
//         new THREE.MeshBasicMaterial({map: loadColorTexture('../images/Rich.png')}),
//     ];

//     const loadingElem = document.querySelector( '#loading' );
//     const progressBarElem = loadingElem.querySelector( '.progressbar' );

//     loadManager.onLoad = () => {
//         loadingElem.style.display = 'none';
//         const cube = new THREE.Mesh(geometry, materials);
//         scene.add(cube);
//         cubes.push(cube);  // add to our list of cubes to rotate
//     };

//     loadManager.onProgress = (urlOfLastItemLoaded, itemsLoaded, itemsTotal) => {
//         const progress = itemsLoaded / itemsTotal;
//         progressBarElem.style.transform = `scaleX(${progress})`;
//     };
    
//     function loadColorTexture( path ) {
//         const texture = loader.load( path );
//         texture.colorSpace = THREE.SRGBColorSpace;
//         return texture;
//     }

//     function render(time) {
//         time *= 0.001;  // convert time to seconds
        
//         cubes.forEach((cube, ndx) => {
//             const speed = 1 + ndx * .1;
//             const rot = time * speed;
//             cube.rotation.x = rot;
//             cube.rotation.y = rot;
//         });
//         renderer.render(scene, camera);
//         requestAnimationFrame(render);
//     }

//     requestAnimationFrame(render);
// }

// function loadObj() {

// 	const canvas = document.querySelector( '#c' );
// 	const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );
//     renderer.setSize( window.innerWidth, window.innerHeight );

// 	const fov = 45;
// 	const aspect = 2; // the canvas default
// 	const near = 0.1;
// 	const far = 100;
// 	const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
// 	camera.position.set( 0, 10, 20 );

// 	const controls = new OrbitControls( camera, canvas );
// 	controls.target.set( 0, 5, 0 );
// 	controls.update();

// 	const scene = new THREE.Scene();
// 	scene.background = new THREE.Color( 'black' );

// 	{

// 		const planeSize = 40;

// 		const loader = new THREE.TextureLoader();
// 		const texture = loader.load( '../images/checker.png' );
// 		texture.colorSpace = THREE.SRGBColorSpace;
// 		texture.wrapS = THREE.RepeatWrapping;
// 		texture.wrapT = THREE.RepeatWrapping;
// 		texture.magFilter = THREE.NearestFilter;
// 		const repeats = planeSize / 2;
// 		texture.repeat.set( repeats, repeats );

// 		const planeGeo = new THREE.PlaneGeometry( planeSize, planeSize );
// 		const planeMat = new THREE.MeshPhongMaterial( {
// 			map: texture,
// 			side: THREE.DoubleSide,
// 		} );
// 		const mesh = new THREE.Mesh( planeGeo, planeMat );
// 		mesh.rotation.x = Math.PI * - .5;
// 		scene.add( mesh );

// 	}

// 	{

// 		const skyColor = 0xB1E1FF; // light blue
// 		const groundColor = 0xB97A20; // brownish orange
// 		const intensity = 3;
// 		const light = new THREE.HemisphereLight( skyColor, groundColor, intensity );
// 		scene.add( light );

// 	}

// 	{

// 		const color = 0xFFFFFF;
// 		const intensity = 3;
// 		const light = new THREE.DirectionalLight( color, intensity );
// 		light.position.set( 5, 10, 2 );
// 		scene.add( light );
// 		scene.add( light.target );

// 	}

// 	{

// 		const mtlLoader = new MTLLoader();
// 		mtlLoader.load( '../models/windmill/windmill.mtl', ( mtl ) => {
// 			mtl.preload();
//             mtl.materials.Material.side = THREE.DoubleSide;
// 			const objLoader = new OBJLoader();
// 			objLoader.setMaterials( mtl );
// 			objLoader.load( '../models/windmill/windmill.obj', ( root ) => {

// 				scene.add( root );

// 			} );

// 		} );


// 	}

// 	function resizeRendererToDisplaySize( renderer ) {

// 		const canvas = renderer.domElement;
// 		const width = canvas.clientWidth;
// 		const height = canvas.clientHeight;
// 		const needResize = canvas.width !== width || canvas.height !== height;
// 		if ( needResize ) {

// 			renderer.setSize( width, height, false );

// 		}

// 		return needResize;

// 	}

// 	function render() {

// 		if ( resizeRendererToDisplaySize( renderer ) ) {

// 			const canvas = renderer.domElement;
// 			camera.aspect = canvas.clientWidth / canvas.clientHeight;
// 			camera.updateProjectionMatrix();

// 		}

// 		renderer.render( scene, camera );

// 		requestAnimationFrame( render );

// 	}

// 	requestAnimationFrame( render );

// }

function LoadWork() {

	const canvas = document.querySelector( '#c' );
	const renderer = new THREE.WebGLRenderer({
		antialias: true,
		canvas,
		alpha: true,
	  });
    renderer.setSize( window.innerWidth, window.innerHeight );

	const fov = 90;
	const aspect = 2; // the canvas default
	const near = 0.1;
	const far = 100;
	const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
	camera.position.set( -10, 10, 20 );

	const controls = new OrbitControls( camera, canvas );
	controls.target.set( 0, 5, 0 );
	controls.update();

	const scene = new THREE.Scene();
	scene.background = new THREE.Color( 'black' );

	const loader = new THREE.TextureLoader();
	const texture = loader.load(
		'../images/space.jpg',
		() => {
			texture.mapping = THREE.EquirectangularReflectionMapping;
			texture.colorSpace = THREE.SRGBColorSpace;
			scene.background = texture;
		}
	);

	{
		const planeSize = 40;
		const loader = new THREE.TextureLoader();
		const texture = loader.load( '../images/s.png' );
		texture.colorSpace = THREE.SRGBColorSpace;
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.magFilter = THREE.NearestFilter;
		const repeats = planeSize / 40;
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

		const mtlLoader = new MTLLoader();
		mtlLoader.load( '../models/mijonir/mijonir.mtl', ( mtl ) => {
			mtl.preload();
			const objLoader = new OBJLoader();
			objLoader.setMaterials( mtl );
			objLoader.load( '../models/mijonir/mijonir.obj', ( root ) => {
				root.position.set(-1, 0.1, 0);
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
			cube.position.set(5,7,-1);
			scene.add(cube);

			const cube2 = new THREE.Mesh(geometry, materials);
			cube2.position.set(-5,7,-1);
			scene.add(cube2);

			const cube3 = new THREE.Mesh(geometry, materials);
			cube3.position.set(0.5,7,7);
			scene.add(cube3);

			const cube4 = new THREE.Mesh(geometry, materials);
			cube4.position.set(0.5,7,-7);
			scene.add(cube4);

			const cube5 = new THREE.Mesh(geometry, materials);
			cube5.position.set(-5,11,5);
			scene.add(cube5);

			const cube6 = new THREE.Mesh(geometry, materials);
			cube6.position.set(-5,11,-8);
			scene.add(cube6);

			const cube7 = new THREE.Mesh(geometry, materials);
			cube7.position.set(5,11,5);
			scene.add(cube7);

			const cube8 = new THREE.Mesh(geometry, materials);
			cube8.position.set(5,11,-8);
			scene.add(cube8);

			cubes.push(cube);  // add to our list of cubes to rotate
			cubes.push(cube2);
			cubes.push(cube3);
			cubes.push(cube4);
			cubes.push(cube5);
			cubes.push(cube6);
			cubes.push(cube7);
			cubes.push(cube8);

		};
		
		function loadColorTexture( path ) {
			const texture = loader.load( path );
			texture.colorSpace = THREE.SRGBColorSpace;
			return texture;
		}

		const texture = loader.load( '../images/rock.jpg' );
		texture.colorSpace = THREE.SRGBColorSpace;
		const material = new THREE.MeshBasicMaterial( {
			map: texture
		} );

		function makeRocks(x,y,z, direction){
		
			const cube1 = new THREE.Mesh( geometry, material );
			cube1.scale.set(2,2,2);
			const cube2 = new THREE.Mesh( geometry, material );
			cube2.scale.set(2,2,2);
			const cube3 = new THREE.Mesh( geometry, material );
			cube3.scale.set(2,2,2);
			const cube4 = new THREE.Mesh( geometry, material );
			cube4.scale.set(2,2,2);
			const cube5 = new THREE.Mesh( geometry, material );
			cube5.scale.set(2,2,2);
			const cube6 = new THREE.Mesh( geometry, material );
			cube6.scale.set(2,2,2);

			if(direction == 1){
				cube1.position.set(x,y,z);
				cube2.position.set(x+5,y,z);
				cube3.position.set(x+5,y+2,z);
				cube4.position.set(x+10,y,z);
				cube5.position.set(x+10,y+2,z);
				cube6.position.set(x+10,y+4,z);
			}else if(direction == 2){
				cube1.position.set(x,y,z);
				cube2.position.set(x-5,y,z);
				cube3.position.set(x-5,y+2,z);
				cube4.position.set(x-10,y,z);
				cube5.position.set(x-10,y+2,z);
				cube6.position.set(x-10,y+4,z);
			}else if(direction == 3){
				cube1.position.set(x,y,z);
				cube2.position.set(x,y,z+5);
				cube3.position.set(x,y+2,z+5);
				cube4.position.set(x,y,z+10);
				cube5.position.set(x,y+2,z+10);
				cube6.position.set(x,y+4,z+10);
			}else if(direction == 4){
				cube1.position.set(x,y,z);
				cube2.position.set(x,y,z-5);
				cube3.position.set(x,y+2,z-5);
				cube4.position.set(x,y,z-10);
				cube5.position.set(x,y+2,z-10);
				cube6.position.set(x,y+4,z-10);
			}

			scene.add( cube1 );
			scene.add( cube2 );
			scene.add( cube3 );
			scene.add( cube4 );
			scene.add( cube5 );
			scene.add( cube6 );
		}
		makeRocks(-15,1.1,-1, 1);
		makeRocks(15,1.1,-1, 2);
		makeRocks(0.5,1.1,-17, 3);
		makeRocks(0.5,1.1,17, 4);
	}

	// const spheres = []; // just an array we can use to rotate the cubes
	// {
	// 	const radius = 2;  
	// 	const widthSegments = 32; 
	// 	const heightSegments = 32; 
	// 	const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
		
	// 	const loadManager = new THREE.LoadingManager();
	// 	const loader = new THREE.TextureLoader(loadManager);
	// 	const material = new THREE.MeshBasicMaterial({ map: loadColorTexture('../images/Empty.png') });

	// 	loadManager.onLoad = () => {
	// 		const sphere = new THREE.Mesh(geometry, material);
	// 		sphere.position.set(0,13,0);
	// 		scene.add(sphere);
	// 		spheres.push(sphere);  // add to our list of cubes to rotate
	// 	};
	
		
	// 	function loadColorTexture( path ) {
	// 		const texture = loader.load( path );
	// 		texture.colorSpace = THREE.SRGBColorSpace;
	// 		return texture;
	// 	}
	// }

	{
		const radius = 2;
		const heightSegments = 10; 
		const radialSegment = 22;
		const geometry = new THREE.CylinderGeometry(radius, radius, heightSegments, radialSegment);
		
		const loadManager = new THREE.LoadingManager();
		const loader = new THREE.TextureLoader(loadManager);
		const material = new THREE.MeshBasicMaterial( {color: 0x000000} );

		const cylinder = new THREE.Mesh(geometry, material);
		cylinder.position.set(5,5.1,5);
		scene.add(cylinder);

		const cylinder2 = new THREE.Mesh(geometry, material);
		cylinder2.position.set(-5,5.1,5);
		scene.add(cylinder2);

		const cylinder3 = new THREE.Mesh(geometry, material);
		cylinder3.position.set(5,5.1,-7.5);
		scene.add(cylinder3);

		const cylinder4 = new THREE.Mesh(geometry, material);
		cylinder4.position.set(-5,5.1,-7.5);
		scene.add(cylinder4);
	}

	{
		//Idea from https://medium.com/nerd-for-tech/adding-a-custom-star-field-background-with-three-js-79a1d18fd35d
		const getRandomParticelPos = (particleCount) => {
			const arr = new Float32Array(particleCount * 3);
			for (let i = 0; i < particleCount; i++) {
			  arr[i * 3] = (Math.random() - 0.5) * 40;
			  arr[i * 3 + 1] = Math.random() * 10 + 1;
			  arr[i * 3 + 2] = (Math.random() - 0.5) * 40;
			}
			return arr;
		  };

		const geometry = new THREE.BufferGeometry();
		const noOfPoints = 150;
		geometry.setAttribute(
			"position",
			new THREE.BufferAttribute(getRandomParticelPos(noOfPoints), 3)
		);
		const material = new THREE.PointsMaterial({
			size: 0.1
		});
		const cube = new THREE.Points(geometry, material);
		scene.add(cube);
	}

	//Help by Chatgpt
	const stars = createStars(50);
	scene.add(stars);

	function createStars(count) {
		const positions = [];
		const velocities = [];
		for (let i = 0; i < count; i++) {
			positions.push((Math.random() - 0.5) * 40);
			positions.push(Math.random() * 40);
			positions.push((Math.random() - 0.5) * 40);
			velocities.push(0);
			velocities.push(-Math.random() * 0.1 - 0.01);
			velocities.push(0);
		}
		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
		const material = new THREE.PointsMaterial({size: 0.5});
		const points = new THREE.Points(geometry, material);
		points.velocities = velocities;
		return points;
	}

	function updateStars(stars) {
		const positions = stars.geometry.attributes.position.array;
		for (let i = 0; i < positions.length; i += 3) {
			positions[i + 1] += stars.velocities[i + 1];
			if (positions[i + 1] < 0) {
				positions[i + 1] = 40;
			}
		}
		stars.geometry.attributes.position.needsUpdate = true;
	}

	const lightning = createLightning(10);
	scene.add(lightning);

	function createLightning(count) {
		const group = new THREE.Group();
		for (let i = 0; i < count; i++) {
			const material = new THREE.LineBasicMaterial({ color: 0xffff00 });
			const geometry = new THREE.BufferGeometry();
			const positions = new Float32Array(6);
			positions[0] = (Math.random() - 0.5) * 20;
			positions[1] = 20;
			positions[2] = (Math.random() - 0.5) * 20;
			positions[3] = positions[0];
			positions[4] = 0;
			positions[5] = positions[2];
			geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
			const line = new THREE.Line(geometry, material);
			line.visible = false;
			group.add(line);
		}
		return group;
	}

	function updateLightning(lightning) {
		lightning.children.forEach(line => {
			if (Math.random() > 0.98) {
				const positions = line.geometry.attributes.position.array;
				positions[0] = (Math.random() - 0.5) * 20;
				positions[1] = 20;
				positions[2] = (Math.random() - 0.5) * 20;
				positions[3] = positions[0];
				positions[4] = 0;
				positions[5] = positions[2];
				line.geometry.attributes.position.needsUpdate = true;
				line.visible = true;
				setTimeout(() => {
					line.visible = false;
				}, 1000);
			}
		});
	}

	class ColorGUIHelper {
		constructor(object, prop) {
			this.object = object;
			this.prop = prop;
		}

		get value() {
			return `#${this.object[this.prop].getHexString()}`;
		}

		set value(hexString) {
			this.object[this.prop].set(hexString);
		}
	}

	{
		const color1 = 0xFFFFFF;
		const intensity = 1;
		const ambientLight  = new THREE.AmbientLight(color1, intensity);
		scene.add(ambientLight);

		const skyColor = 0xB1E1FF; 
		const groundColor = 0xB97A20;
		const hemiLight = new THREE.HemisphereLight( skyColor, groundColor, intensity );
		scene.add( hemiLight );

		const color2 = 0xFFFFFF;
        const dirLight  = new THREE.DirectionalLight(color2, intensity);
        dirLight.position.set(0, 10, 0);
        dirLight.target.position.set(-5, 0, 0);
        scene.add(dirLight);
        scene.add(dirLight.target);

		const gui = new GUI();

		// GUI for Ambient Light
		const folderA = gui.addFolder("Ambient Light");
		folderA.addColor(new ColorGUIHelper(ambientLight, 'color'), 'value').name('Ambient Light Color');
		folderA.add(ambientLight, 'intensity', 0, 2, 0.01);

		// GUI for Hemisphere Light
		const folderB = gui.addFolder("Hemisphere Light");
		folderB.addColor(new ColorGUIHelper(hemiLight, 'color'), 'value').name('Hemisphere Sky Color');
		folderB.addColor(new ColorGUIHelper(hemiLight, 'groundColor'), 'value').name('Hemisphere Ground Color');
		folderB.add(hemiLight, 'intensity', 0, 2, 0.01);

		// GUI for Directional Light
		const folderC = gui.addFolder("Directional Light");
		folderC.addColor(new ColorGUIHelper(dirLight, 'color'), 'value').name('Directional Light Color');
		folderC.add(dirLight, 'intensity', 0, 2, 0.01);
		

		//Helper for Directional Light
		const helper = new THREE.DirectionalLightHelper(dirLight);
        scene.add(helper);
        function updateLight() {
            dirLight.target.updateMatrixWorld();
            helper.update();
        }
		makeXYZGUI(folderC, dirLight.position, 'position', updateLight);
        makeXYZGUI(folderC, dirLight.target.position, 'target', updateLight);
	}
	


	// {
	// 	const color = 0xFFFFFF;
	// 	const intensity = 1;
	// 	const light = new THREE.AmbientLight(color, intensity);
	// 	scene.add(light);

	// 	const gui = new GUI();
	// 	gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
	// 	gui.add(light, 'intensity', 0, 2, 0.01);
	// }

	// {
	// 	const skyColor = 0xB1E1FF; 
	// 	const groundColor = 0xB97A20;
	// 	const intensity = 1;
	// 	const light = new THREE.HemisphereLight( skyColor, groundColor, intensity );
	// 	scene.add( light );

	// 	const gui = new GUI();
	// 	gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('skyColor');
	// 	gui.addColor(new ColorGUIHelper(light, 'groundColor'), 'value').name('groundColor');
	// 	gui.add(light, 'intensity', 0, 2, 0.01);
	// }

    // {
    //     const color = 0xFFFFFF;
	// 	   const intensity = 1;
    //     const light = new THREE.DirectionalLight(color, intensity);
    //     light.position.set(0, 10, 0);
    //     light.target.position.set(-5, 0, 0);
    //     scene.add(light);
    //     scene.add(light.target);

    //     const helper = new THREE.DirectionalLightHelper(light);
    //     scene.add(helper);

    //     function updateLight() {
    //         light.target.updateMatrixWorld();
    //         helper.update();
    //     }
    //     updateLight();

    //     const gui = new GUI();
    //     gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
    //     gui.add(light, 'intensity', 0, 2, 0.01);

    //     makeXYZGUI(gui, light.position, 'position', updateLight);
    //     makeXYZGUI(gui, light.target.position, 'target', updateLight);
    // }

	function makeXYZGUI(gui, vector3, name, onChangeFn) {
        const folder = gui.addFolder(name);
        folder.add(vector3, 'x', -10, 10).onChange(onChangeFn);
        folder.add(vector3, 'y', 0, 10).onChange(onChangeFn);
        folder.add(vector3, 'z', -10, 10).onChange(onChangeFn);
        folder.open();
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

		// spheres.forEach((sphere, ndx) => {
        //     const speed = 1 + ndx * .1;
        //     const rot = time * speed;
        //     sphere.rotation.x = rot;
        //     sphere.rotation.y = rot;
        // });

		updateStars(stars);
		updateLightning(lightning);

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



