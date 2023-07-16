import * as THREE from 'three';


import { GLTFLoader } from 'https://unpkg.com/three@0.149.0/examples/jsm/loaders/GLTFLoader.js';
import {clone} from 'https://unpkg.com/three@0.154.0/examples/jsm/utils/SkeletonUtils.js'
//html JUNK
let logo = document.getElementById('logo')
document.getElementById('alfred').onclick = function() {
	logo.classList.toggle('z-index');
}



let homeImg = document.getElementById("jackson").onclick = function() {
	window.open("https://jacksonuptain.github.io/Test-Portfolio2/index.html")
};


//boring scene setup
const scene = new THREE.Scene();

let mixer;

var camera = new THREE.PerspectiveCamera( 30, innerWidth/innerHeight, 0.1, 1000 );
    camera.position.set( 0, 100, -100 );

const renderer = new THREE.WebGLRenderer( {antialias: true} );
    renderer.setSize( innerWidth, innerHeight );
    document.body.appendChild( renderer.domElement );
			
window.addEventListener( "resize", (event) => {
    camera.aspect = innerWidth/innerHeight;
    camera.updateProjectionMatrix( );
    renderer.setSize( innerWidth, innerHeight );
});

renderer.outputColorSpace  = THREE.LinearSRGBColorSpace;
// ground

// a procedurally generated texture grid

var canvas = document.createElement( 'CANVAS' );
    canvas.width = canvas.height = 64;

var context = canvas.getContext( '2d' );
    context.fillStyle = 'black';
    context.fillRect( 0, 0, 64, 64 );
    context.fillStyle = 'black';
    context.fillRect( 1, 1, 62, 62 );
    context.fillStyle = 'blue';
		context.beginPath( )
    context.arc( 32, 0, 5, 0, 2*Math.PI );
    context.arc( 64, 64, 10, 0, 2*Math.PI );
		context.fill( );

var texture = new THREE.CanvasTexture(canvas);
		texture.wrapS = THREE.MirroredRepeatWrapping;
		texture.wrapT = THREE.MirroredRepeatWrapping;
		texture.repeat.set( 100, 100 );

var ground = new THREE.Mesh(
				new THREE.PlaneGeometry( 90, 90 ),
				new THREE.MeshBasicMaterial( {map: texture} )
		);
		ground.rotation.x = -Math.PI/2;
		ground.position.z = -60;
		scene.add( ground );


// next comment


const CAMERA_DISTANCE = 9,
			CAMERA_ALTITUDE = 3,
			AXIS_Y = new THREE.Vector3( 0, 0.5, 0 );


// capture key events
var keyHash = {};

window.addEventListener( 'keydown', (event) => keyHash[event.key] = true );
window.addEventListener( 'keyup', (event) => keyHash[event.key] = false );


// lerping angles need adjusting of cw/ccw lerp direction

function lerpAngle( a, b, k )
{
		if( a-b > Math.PI ) b += 2*Math.PI;
		if( b-a > Math.PI ) a += 2*Math.PI;
			
		return THREE.MathUtils.lerp( a, b, k ) % (2*Math.PI);
}


const InvisMaterial = new THREE.ShadowMaterial();
InvisMaterial.opacity = 0;
// create a cat and its tail

var catSpeed = 0,
		catDir = new THREE.Vector3( 0, 0, -1 ),
		cat = new THREE.Mesh(new THREE.PlaneGeometry( 1, 0.1, 1 ),InvisMaterial),
		tail1 = new THREE.Mesh(
							new THREE.SphereGeometry(0.2),
							new THREE.MeshNormalMaterial()
					),
		tail2 = tail1.clone(),
		tail3 = tail1.clone();
cat.position.y = 0.85;
cat.position.z = -25;
scene.add(cat);




//MODEL SECTION

const clock = new THREE.Clock();
const delta = clock.getDelta();
const modelCharacterURL = "CuteAlienPlayer/scene.gltf";
var modelCharacter;
let modelCharacterCom = {};
animate();
//LIGHTS FOR THE MODELS
const hemiLight = new THREE.HemisphereLight(0x0000FF, 0xFFFFFF, 1);
scene.add(hemiLight);






var loader = new GLTFLoader();
	loader.load( modelCharacterURL, function (gltf) {
		modelCharacter = gltf.scene;
		scene.add(modelCharacter);	
		mixer = new THREE.AnimationMixer(modelCharacter);
		mixer.clipAction( gltf.animations[ 0 ] ).setDuration( 1 ).play();
		console.log(modelCharacter)	;
	}	);

	loader.load( "CuteAlienPlayer/scene.gltf", function (gltf) {
		modelCharacterCom = gltf.scene;
		modelCharacterCom.scale.set(0.5, 0.5, 0.5);
		modelCharacterCom.position.set(0, -15, 0);
		scene.add(modelCharacterCom);
	
	})



//A BUNCH OF MODELS!!
	loader.load("DuckHunt/DuckHunt.gltf", function (gltf) {
		
		const a = gltf.scene;

		a.position.set(-19, 1, -60);
		a.scale.set(0.006, 0.006, 0.006)
		a.rotation.set(0, -45, 0);
		scene.add(a);

		const lightA = new THREE.PointLight(0xFFFFFF, 0.2);
		lightA.position.set = a.position;
		scene.add(lightA);
		console.log(a);
		
	})

const videoID3 = document.getElementById( 'videoTexture3' );
const VideoTexture3 = new THREE.VideoTexture( videoID3 );
videoID3.play();
const videoMaterial3 = new THREE.MeshBasicMaterial({map: VideoTexture3});
const vidPlane3 = new THREE.PlaneGeometry(16, 9);
vidPlane3.scale(0.4, 0.4, 0.4);
const vidMesh3 = new THREE.Mesh(vidPlane3, videoMaterial3);
vidMesh3.position.set(-19, 2.3, -60);
vidMesh3.rotation.set(0, 0.8, 0);
vidMesh3.scale.set(0.35, 0.35, 0.35);
scene.add(vidMesh3);
	//loader.load("arcade_invaders/scene.gltf", function (gltf) {
		//const b = gltf.scene;
		//b.position.set(0, -1, -30);
		//b.scale.set(0.3, 0.3, 0.3)
		//scene.add(b);
	//})
	loader.load("arcade_machine (1)/scene.gltf", function (gltf) {
		const c = gltf.scene;
		c.position.set(-15, 0, -59);
		c.scale.set(0.6, 0.6, 0.6);
		c.rotation.set(0, -44, 0);
		scene.add(c);


		const lightC = new THREE.PointLight(0xFFFFFF, 0.02);
		lightC.position.set = c.position;
		scene.add(lightC);
	})

	loader.load("arcade_machine (2)/scene.gltf", function (gltf) {
		const d = gltf.scene;
		d.position.set(-12, 2, -59);
		d.scale.set(0.6, 0.6, 0.6);
		d.rotation.set(0, 0, 0);
		scene.add(d);

		const distance = 20.0;
		const angle = Math.PI / 4.0;
		const penumbra = 0.5;
		const decay = 1.0;

		const lightD = new THREE.SpotLight(
			0x0000FF, 3.3, distance, angle, penumbra, decay
		);
		lightD.position.set(-12, 8, -48);
		lightD.target.position.set(-12, 2, -59);
		scene.add(lightD);
		scene.add(lightD.target);
	})
	loader.load("asteroids_arcade/scene.gltf", function (gltf) {
		const e = gltf.scene;
		e.position.set(-9.5, 0.8, -58);
		e.scale.set(0.025, 0.025, 0.025);
		e.rotation.set(0, 48, 0);
		e.transparent = false;
		scene.add(e);

		const lightE = new THREE.PointLight(0xFFFFFF, 0.02);
		lightE.position.set = e.position;
		scene.add(lightE);
	})
	loader.load("arcade_machine.glb", function (gltf) {
		const f = gltf.scene;
		f.position.set(-7.4, 2, -62);

		f.scale.set(2.5, 2.5, 2.5);
		scene.add(f);

		const lightF = new THREE.PointLight(0xFF0000, 0.2);
		lightF.position.set = f.position;
		scene.add(lightF);
	})
	//loader.load("arcade_machine.glb", function (gltf) {
	//	gltf.scene.scale.set(0.03, 0.03, 0.03)
	//	const g = gltf.scene;
	//	scene.add(g);
	//})
	loader.load("defender_arcade/scene.gltf", function (gltf) {
		const h = gltf.scene;
		h.scale.set(0.025, 0.025, 0.025);
		h.position.set(-21.5, -0.5, -56);
		h.rotation.set(0, 5, 0);
		scene.add(h);
		const lightH = new THREE.PointLight(0xFFFFFF, 0.01);
		lightH.position.set = h.position;
		scene.add(lightH);

		

	})	

	loader.load("sugar_rush_arcade_machine/scene.gltf", function (gltf) {
		const i = gltf.scene;
		i.position.set(-3, 0, -62)
		i.scale.set(0.45, 0.45, 0.45);
		scene.add(i);
		
		

		
	})
	loader.load("sugar_rush_arcade_machine/scene.gltf", function (gltf) {
		const i = gltf.scene;
		i.position.set(-5.3, 0, -62)
		i.scale.set(0.45, 0.45, 0.45);
		scene.add(i);
		
		

		
	})
//VIDEO TEXTURE

const videoID = document.getElementById( 'videoTexture' );
const VideoTexture = new THREE.VideoTexture( videoID );
videoID.play();
const videoMaterial = new THREE.MeshBasicMaterial({map: VideoTexture});
const vidPlane = new THREE.PlaneGeometry(16, 9);
vidPlane.scale(0.4, 0.4, 0.4);
const vidMesh = new THREE.Mesh(vidPlane, videoMaterial);
vidMesh.position.set(-2.9, 2.85, -61.7);
vidMesh.rotation.set(0, 0, 0);
vidMesh.scale.set(0.3, 0.3, 0.3);
scene.add(vidMesh);


const videoID2 = document.getElementById( 'videoTexture2' );
const VideoTexture2 = new THREE.VideoTexture( videoID2 );
videoID2.play();
const videoMaterial2 = new THREE.MeshBasicMaterial({map: VideoTexture2});
const vidPlane2 = new THREE.PlaneGeometry(16, 9);
vidPlane2.scale(0.4, 0.4, 0.4);

const vidMesh2 = new THREE.Mesh(vidPlane2, videoMaterial2);
vidMesh2.position.set(-5.2, 2.85, -61.7);
vidMesh2.rotation.set(0, 0, 0);
vidMesh2.scale.set(0.3, 0.3, 0.3);
scene.add(vidMesh2);


	/*loader.load("final_fight_arcade/scene.gltf", function (gltf) {
		gltf.scene.scale.set(0.03, 0.03, 0.03)
		const j = gltf.scene;
		scene.add(j);
	})
	loader.load("fnaf_arcades/scene.gltf", function (gltf) {
		gltf.scene.scale.set(0.03, 0.03, 0.03)
		const k = gltf.scene;
		scene.add(k);
	})
	loader.load("ghostbusters_arcade_machine_low-poly/scene.gltf", function (gltf) {
		gltf.scene.scale.set(0.03, 0.03, 0.03)
		const l = gltf.scene;
		scene.add(l);
	})
	loader.load("kirby_arcade/scene.gltf", function (gltf) {
		gltf.scene.scale.set(0.03, 0.03, 0.03)
		const m = gltf.scene;
		scene.add(m);
	})

	loader.load("neo-geo_arcade_cabinet/scene.gltf", function (gltf) {
		gltf.scene.scale.set(0.03, 0.03, 0.03)
		const n = gltf.scene;
		scene.add(n);
	})
	loader.load("pacman_arcade__animation (1)/scene.gltf", function (gltf) {
		gltf.scene.scale.set(0.03, 0.03, 0.03)
		const o = gltf.scene;
		scene.add(o);
	})
	loader.load("claw_arcade_animated_.glb_v1.0_free_low_poly.glb", function (gltf) {

		gltf.scene.scale.set(0.03, 0.03, 0.03)
		const p = gltf.scene;
		scene.add(p);
	})
	loader.load("coke_machine.glb", function (gltf) {
		gltf.scene.scale.set(0.03, 0.03, 0.03)
		const q = gltf.scene;
		scene.add(q);
	})
	loader.load("low_poly_skeeball_machine.glb", function (gltf) {
		gltf.scene.scale.set(0.03, 0.03, 0.03)
		const r = gltf.scene;
		scene.add(r);
		
	})
*/


//Walls

const wallMaterial = new THREE.MeshToonMaterial({color: 0x3333ff});
const wallGeometry = new THREE.BufferGeometry(150, 150, 150);
const wallMesh = new THREE.Mesh(wallGeometry, wallMaterial);

scene.add(wallMesh);














let lastTimestamp = performance.now();

//ANIMATION AND RENDER FUNCTIONS
function animate() {
	
	requestAnimationFrame(animate);
	render();
}

function render() {
	if(mixer) {
		
		mixer.update(0.004);
		
	}
	renderer.render(scene, camera);
}








//gltfLoader.load('DroidPlayer/scene.gltf' , function (gltf)  {

   // const job = gltf.scene;
    
//    mixer2 = new THREE.AnimationMixer(job);
  //  mixer2.clipAction(gltf.animations[0]).play();


 //   mixer2.update( delta );
	
//	console.log("Cat Position",cat.position);

    
//	console.log(job);
//	console.log("Scale",job.scale);
//	console.log("Rotation",job.rotation);
//	console.log("Animations",job.animations);
	
//	var johnSchlitt1 = job.position.x;
//	var johnSchlitt2 = job.position.y;
//	var johnSchlitt3 = job.position.z;

//	console.log("Model Position",johnSchlitt1,johnSchlitt2, johnSchlitt3);
  //  scene.add( job );

	//return johnSchlitt1, johnSchlitt2, johnSchlitt3;
//})
//var johnSchlitt1, johnSchlitt2, johnSchlitt3 = gltf();

//console.log(johnSchlitt3);



const loaderbg = new THREE.CubeTextureLoader();
const texturebg = loaderbg.load([
  "img/JackArcade.png",
  "img/JackArcade.png",
  "img/JackArcade.png",
  "img/JackArcade.png",
  "img/JackArcade.png",
  "img/JackArcade.png"
]);
scene.background = texturebg;



var posx1;
var posy1;
var posz1; 
var rotx;
var roty;
var rotz;

let elapsedTime = 0;
const intervalDuration = 3000;


function animationLoop(timestamp)
{
	
	const deltaTime = timestamp - lastTimestamp;
	lastTimestamp = timestamp;
	elapsedTime += deltaTime;





		// process keys
	
		if( keyHash.ArrowUp || keyHash.ArrowLeft || keyHash.ArrowRight || keyHash.ArrowDown )
		{
				catSpeed = 3;
				catDir.subVectors( cat.position, camera.position ).y = 0;
			
				if( keyHash.ArrowDown )	catDir.applyAxisAngle( AXIS_Y, Math.PI );
				else
				if( keyHash.ArrowLeft )	catDir.applyAxisAngle( AXIS_Y, 1.4 );
				else
				if( keyHash.ArrowRight ) catDir.applyAxisAngle( AXIS_Y, -1.4 );
			
				catDir.normalize( );
		}
		else
				catSpeed *= 0.6;

	
		cat.position.addScaledVector( catDir, catSpeed*0.03 );
		cat.rotation.y = lerpAngle( cat.rotation.y, Math.atan2( catDir.x, catDir.z ) + Math.PI, 0.06 );

		tail1.position.lerp( cat.position, 0.05 );	
		tail2.position.lerp( tail1.position, 0.01 );	
		tail3.position.lerp( tail2.position, 0.01 );	
		camera.position.lerp( tail3.position, 0.01 );
	
		// set camera position
		camera.position.sub( cat.position );
		camera.position.y = 0;
		camera.position.setLength( CAMERA_DISTANCE );
		camera.position.y = CAMERA_ALTITUDE;
		camera.position.add( tail3.position );
		
	var dog = cat.position.x - 0.20;
	var mak = cat.position.y;
	var tag = cat.position.z;
		
		
	if (modelCharacter) {	
		modelCharacter.position.x = dog;
		modelCharacter.position.y = mak;
		modelCharacter.position.z = tag;
			
		var dog1 = cat.rotation.x;
		var mak1 = cat.rotation.y;
		var tag1 = cat.rotation.z;
		var mak1 = mak1 - 3;
		modelCharacter.rotation.x = dog1;
		modelCharacter.rotation.y = mak1;
		modelCharacter.rotation.z = tag1;
		modelCharacter.scale.set(0.5, 0.5, 0.5);
		
		posx1 = dog.toFixed(3);
		posy1 = mak.toFixed(3);
		posz1 = tag.toFixed(3);
		rotx = dog1.toFixed(3);
		roty = mak1.toFixed(3);
		rotz = tag1.toFixed(3);
		
		
		
	}
		// set camera orientation
	if (modelCharacter){
		camera.lookAt( modelCharacter.position.x, (modelCharacter.position.y + 0.4), modelCharacter.position.z - 0.4);
	} else {
		camera.lookAt(cat.position);
	}

	function initGame() {
		const allPlayersRef = firebase.database().ref('players');

		allPlayersRef.on("value", (snapshot) => {
			//Fires when a Value is Changed
			

		})

		allPlayersRef.on('child_added', (snapshot) => {
			//Fires whenever a player is added(Including Yourself)

			const addedPlayer = snapshot.val();

		
			if(addedPlayer.id == playerId) {
				if (elapsedTime >= intervalDuration) {
					//updatePlayerPosition();

					elapsedTime = 0;

					
				}
			
				
				
				
				
				
				
				
			} else if(addedPlayer.id == addedPlayer.id){
				console.log("your in the right place", modelCharacterCom);
				
				if(modelCharacterCom) {
					console.log("Other Players Joined");
					modelCharacterCom.position.x = addedPlayer.x;
					modelCharacterCom.position.y = addedPlayer.y;
					modelCharacterCom.position.z = addedPlayer.z;
					modelCharacterCom.rotation.x = addedPlayer.rotX;
					modelCharacterCom.rotation.y = addedPlayer.rotY;
					modelCharacterCom.rotation.z = addedPlayer.rotZ;
					
				}
					
				
			} else {
				//NOTHING
			}

		})
	}




	let playerRef;
	let playerId;
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			playerId = user.uid;
			playerRef = database.ref(`players/${playerId}`);
			
			
			playerRef.set({
				id: playerId,
				x: posx1,
				y: posy1,
				z: posz1,
				rotX: rotx,
				rotY: roty,
				rotZ: rotz,
			})
			
			
			playerRef.onDisconnect().remove();

			initGame();
			
			
		} else {
			//Your Logged Out
		}
	})
	
	

	
}



const firebaseConfig = {
	apiKey: "AIzaSyCohH_XvA8KDqAPx6yyuxmmRskAPOScd7E",
	authDomain: "d-multiplayer-dbcc3.firebaseapp.com",
	databaseURL: "https://d-multiplayer-dbcc3-default-rtdb.firebaseio.com",
	projectId: "d-multiplayer-dbcc3",
	storageBucket: "d-multiplayer-dbcc3.appspot.com",
	messagingSenderId: "518109708470",
	appId: "1:518109708470:web:a000dc5a133c5d9f606617",
	measurementId: "G-BGZ2T14NFQ"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();
firebase.auth().signInAnonymously().catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(errorCode, errorMessage);
	});


renderer.setAnimationLoop(animationLoop);
