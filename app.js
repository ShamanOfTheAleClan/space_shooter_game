


// const { drawPlayer, shootProjectiles, controlPlayer, stopControllingPlayer } = require('./player');
// const { ctx, canvas, fps } = require('./globals');


// const frame = () => {
//     // 	clear canvas
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     // 	move player
//     drawPlayer();

//     if (shootProjectiles.length != 0) {
//         shootProjectiles.forEach((e) => {
//             if (e.y > 0) {
//                 ctx.save();
//                 ctx.scale(0.1, 0.1);
//                 ctx.translate(e.x, e.y);
//                 ctx.rotate(Math.PI * 1.25);
//                 ctx.fillStyle = '#aaa';
//                 //#0a475c
//                 ctx.fill(shootBlastBeam.shape);
//                 ctx.restore();
//                 e.y -= 200;
//             } else {
//                 shootProjectiles.splice(shootProjectiles.indexOf(e), 1);
//             }

//         });
//     }
// }



// //animate
// setInterval(frame, fps);

// window.addEventListener('keydown', controlPlayer);
// window.addEventListener('keyup', stopControllingPlayer);

// const { upKey, rightKey, downKey, leftKey, shootKey, debug } = require('./controls');



const canvas = document.getElementById('canvas');


const fps = Math.round(1000/30);
const upKey = 73; 		// I
const rightKey = 76; 	// L
const downKey = 75; 	// K
const leftKey = 74; 	// J
const shootKey = 81;	// Q
const debug = 68;			// D

let ctx = canvas.getContext('2d');
let player = {
	shape: new Path2D('M512 43.3V15.5C512 7.1 505.2.3 496.8.3H468A258 258 0 00285 75.6L273 87.7l-82.8-7.5a75.9 75.9 0 00-38 6.3L38.6 72.2c-4.6-.5-9.3 1-12.6 4.4L4.5 98c-6 6-6 15.6 0 21.5l53.7 53.8-10 10c-6 6-6 15.6 0 21.6l32.2 32.2L69 248.7a15.2 15.2 0 00-4.5 10.7c-6.2 2.2-12 5.8-17 10.8-13 13-38.7 72.9-46.3 90.9a15.2 15.2 0 0019.9 20c18-7.7 78-33.4 91-46.4 4.9-5 8.5-10.8 10.7-17 3.9 0 7.8-1.5 10.7-4.5l11.5-11.4 64.5 64.5-11.4 11.4a15.2 15.2 0 00-4.5 10.8 45.5 45.5 0 00-17 10.8c-13 13-38.8 72.8-46.3 90.9a15.2 15.2 0 0019.9 19.9c18-7.6 77.9-33.3 90.9-46.3 5-5 8.5-10.8 10.7-17 4 0 7.8-1.5 10.8-4.5l11.4-11.5 32.7 32.7c6 6 15.6 6 21.5 0l10-10 53.9 53.7c6 6 15.5 6 21.5 0l21.5-21.5c3.3-3.3 5-8 4.3-12.6l-14.2-113.7a76 76 0 006.3-37.9L424 238l11.8-11.8A259 259 0 00512 43.3zm-324.6 67.2l57.6 5.2-38 38c-17-8-38-5-52 9l-53 53-21.6-21.5 70.6-70.6a45.5 45.5 0 0136.4-13.1zM79.7 151.9l-43-43 5.5-5.5 76.5 9.5-39 39zm10.8 161.3c-4.2 4-23.3 13.8-45.6 24.1 10.3-22.3 20-41.4 24-45.6a15.2 15.2 0 0121.6 21.5zm32.3-32.3l-21.5-21.5 75.2-75.3a15.2 15.2 0 0121.6 21.6l-75.3 75.2zm96.8 161.4c-4.2 4-23.3 13.8-45.6 24 10.3-22.2 20-41.4 24-45.5a15.2 15.2 0 1121.6 21.5zm32.2-32.3l-21.5-21.5 75.3-75.3a15.2 15.2 0 0121.5 21.5L251.8 410zm65.7 21.2l-22-21.9 53.1-53c14.1-14.2 17-35.1 9-52l38.3-38.4 5.3 58.4a45.5 45.5 0 01-13.1 36.4l-70.6 70.5zm85.3 43.8l-43-43 39-39 9.5 76.5-5.5 5.5zM336 282.8c-17-8-37.9-5.1-51.9 8.9l-53 53-21.6-21.4 53-53.1a15.2 15.2 0 00-21.4-21.5l-53.1 53-21.5-21.4 53-53.1c14.2-14.1 17-35 9-52 86.1-86 81-81.2 88.2-87.6l107 107c-6.5 7.2-1.6 2.1-87.7 88.2zm5-214c37-24.7 80.9-38 127-38h13.6v12.5c0 45-14 89.5-39.2 127L340.9 69z'),
	x: 3000,
	y: 6500,
	movingSpeed: 30,
}
let shootBlast = {
	shape: new Path2D('M256 16c-72 0-120 48.094-120 96.093 0 48.416 24.277 66.635 51.563 112.5-3.476 47.475-3.75 111.834-3.75 199.218 15.588-51.96 28.137-91.943 38.437-121.406C236.71 347.18 249.23 407.97 256 495.997c6.77-88.027 19.288-148.818 33.75-193.593 10.3 29.462 22.85 69.444 38.438 121.407 0-87.915-.21-152.607-3.75-200.156C351.563 178.276 376 160.274 376 112.09 376 64.09 328 16 256 16zm0 47.813c39.765 0 72.188 26.863 72.188 60 0 13.097-5.516 25.29-14.063 35.156-10.095-33.71-27.39-46.876-58.125-46.876s-48.03 13.167-58.125 46.875c-8.547-9.866-14.063-22.06-14.063-35.158 0-33.136 32.423-60 72.188-60z'),
	movingSpeed: 50,
}

let shootBlastBeam = {
	shape: new Path2D('M23.018 20.705l135.64 163.623-107.33-32.39 168.79 111.326L82.784 224.11l192.51 111.87-130.525-1.76 282.08 126.116c13.913 7.198 28.182 13.638 42.728 19.246l2.297.885 20.797 9.3-16.895-37.82c-3.67-9.115-7.69-18.094-12.03-26.926L338.312 144.24l1.094 129.362L228.352 82.393l38.482 136.49L155.906 50.668l31.684 106.467L23.018 20.705zm225.148 225.178c94.262 38.75 169.608 116.195 208.152 207.924-91.01-40.827-168.835-115.908-208.152-207.924z'),
	
}
let drawPlayer = () => {
	ctx.save();
	ctx.scale(0.1,0.1);
	ctx.translate(player.x, player.y);
	ctx.rotate(5.48);
	ctx.fillStyle = '#aaa';
	ctx.fill(player.shape);
	
	ctx.restore();
}

let moveUp = null;
let moveDown = null;
let moveRight = null;
let moveLeft = null;
let shoot = null;
let shootProjectiles = [];

class Enemy {
	constructor() {
		
	}
}

class LaserBeam {
	constructor(){
		this.x = player.x + 360;
		this.y = player.y - 300;
		this.movingSpeed = 1000;
	}
}

let controlPlayer = (e) =>{
	switch(e.keyCode) {
		case upKey: 
			if (moveUp == null){
				moveUp = setInterval( () =>{
				if (player.y > 400 ) player.y -= player.movingSpeed;
				},10)
			}
		break;
			
		case downKey : 
			if (moveDown == null){
				moveDown = setInterval( () =>{
				if (player.y < 7000) player.y += player.movingSpeed;
			},10)}
		break;
			
		case rightKey :
			if (moveRight == null) {
				moveRight = setInterval(() => {
				if (player.x < 6620) player.x += player.movingSpeed;
				},10)
			}
			break;
			
		case leftKey :
			if (moveLeft == null) {
				moveLeft = setInterval(() => {
				if (player.x > -350) player.x -= player.movingSpeed;
				},10)
			}
		break;
			
		case shootKey :
			if (shoot == null) {
				shoot = setInterval(() => {
					let x = new LaserBeam();
					shootProjectiles.push(x);
				},150);
				drawShootBlast = () => {
						let opacity = 0;
						
						// if (opacity < 1 && powerUp == null) {
							// powerUp = setInterval(() => {
								// opacity +=0.001;
								ctx.save();
								ctx.scale(0.1,0.1);
								ctx.translate(player.x + 615, player.y - 300);
								ctx.rotate(3.141);
								let gradient = ctx.createLinearGradient(0, 0, 0, 170);
								gradient.addColorStop(0, 'rgb(15, 107, 138)');
								gradient.addColorStop(1, 'rgb(7, 73, 95)');
								ctx.fillStyle = gradient;
								ctx.fill(shootBlast.shape);
								ctx.restore();
							// },50)
						// }
						// } else {
						// 	ctx.save();
						// 	ctx.scale(0.1,0.1);
						// 	ctx.translate(player.x + 615, player.y - 300);
						// 	ctx.rotate(3.141);
						// 	let gradient = ctx.createLinearGradient(0, 0, 0, 170);
						// 	gradient.addColorStop(0, 'rgba(15, 107, 138, 1)');
						// 	gradient.addColorStop(1, 'rgba(7, 73, 95, 1)');
						// 	ctx.fillStyle = gradient;
						// 	ctx.fill(shootBlast.shape);
						// 	ctx.restore();
						// }

					
					// TODO make it pulse while shooting
					setInterval(()=>{},20);
					
					}
				// console.log(shootProjectiles);
			}
			break;
		case debug :
			console.log(player.x, player.y);
	}
}


let stopControllingPlayer = (e) => {
	switch(e.keyCode) {
		case upKey:
			clearInterval(moveUp)
			moveUp = null;
		break;
			
		case downKey:
			clearInterval(moveDown)
			moveDown = null;
		break;
			
		case rightKey:
			clearInterval(moveRight);
			moveRight = null;
		break;
			
		case leftKey:
			clearInterval(moveLeft);
			moveLeft = null;
		break;
			
		case shootKey:
			clearInterval(shoot);
			shoot = null;
		break;
	}
}
const frame = () => {
// 	clear canvas
	// console.log('frame')
	ctx.clearRect(0, 0, canvas.width, canvas.height);
// 	move player
	drawPlayer();
	// if (shoot != null) drawShootBlast();
	// drawShootBlastBeam();
		if(shootProjectiles.length!= 0) {
		shootProjectiles.forEach((e) =>{
			if (e.y>0) {
						ctx.save();
						ctx.scale(0.1, 0.1);
						ctx.translate(e.x, e.y);
						ctx.rotate(Math.PI*1.25);
						ctx.fillStyle = '#aaa';
				//#0a475c
						ctx.fill(shootBlastBeam.shape);
						ctx.restore();
						e.y -= 200;
			} else {
				shootProjectiles.splice(shootProjectiles.indexOf(e),1);
			}

					}
			)
		}
}

//animate
setInterval(frame,fps)

window.addEventListener('keydown', controlPlayer);
window.addEventListener('keyup', stopControllingPlayer)