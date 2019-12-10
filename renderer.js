// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.




// const { upKey, rightKey, downKey, leftKey, shootKey, debug } = require('./controls');

import { canvas, ctx, fps } from './globals.js';
import { shootProjectiles, player, controlPlayer, stopControllingPlayer } from './player.js';





let playerProjectile = {
	shape: new Path2D('M23.018 20.705l135.64 163.623-107.33-32.39 168.79 111.326L82.784 224.11l192.51 111.87-130.525-1.76 282.08 126.116c13.913 7.198 28.182 13.638 42.728 19.246l2.297.885 20.797 9.3-16.895-37.82c-3.67-9.115-7.69-18.094-12.03-26.926L338.312 144.24l1.094 129.362L228.352 82.393l38.482 136.49L155.906 50.668l31.684 106.467L23.018 20.705zm225.148 225.178c94.262 38.75 169.608 116.195 208.152 207.924-91.01-40.827-168.835-115.908-208.152-207.924z'),

}

let image = new Image();
let playerSprite = null;

	image.onload = function () {
		Promise.all([
			// Cut out two sprites from the sprite sheet
			createImageBitmap(image, 0, 0, 390, 300),
		]).then(function (sprites) {
			// Draw each sprite onto the canvas
			playerSprite = sprites[0];

		});
	}
image.src = player.pattern;


let drawPlayer = () => {
	// ctx.save();
	// ctx.scale(0.1,0.1);
	// ctx.translate(player.x, player.y);
	// ctx.rotate(5.48);
	// ctx.fillStyle = '#aaa';
	// ctx.fill(player.shape);

	// Wait for the sprite sheet to load


	// Load the sprite sheet from an image file
	

	if (playerSprite) ctx.drawImage(playerSprite, player.x, player.y);



	// img.src = player.pattern;
	// let newImg = createImageBitmap(player.pattern);
	// let pattern = ctx.createPattern(img, 'no-repeat');


	// ctx.beginPath();
	// ctx.lineWidth = '10';
	// ctx.strokeStyle = 'red';
	// ctx.rect(player.x, player.y, player.width, player.length);
	// ctx.stroke();
	// console.log(player.x, player.y, player.width, player.length);
	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.strokeStyle = "red";
	ctx.rect(player.x, player.y, player.width, player.length);
	// ctx.drawImage(newImg, player.x, player.y);
	ctx.stroke();


	// ctx.fillStyle = pattern;
	// ctx.fillRect(player.x, player.y, player.width, player.length);
	// ctx.drawImage(player.pattern, player.x, player.y);

	// ctx.fillRect(player.x, player.y, player.length, player.width);
	// ctx.restore();
}



class Enemy {
	constructor() {

	}
}




const frame = () => {
	// 	clear canvas
	// console.log('frame')
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// 	move player
	drawPlayer();
	// if (shoot != null) drawShootBlast();
	// drawplayerProjectile();
	if (shootProjectiles.length != 0) {
		shootProjectiles.forEach((e) => {
			if (e.y > 0) {
				ctx.save();
				ctx.scale(0.1, 0.1);
				ctx.translate(e.x, e.y);
				ctx.rotate(Math.PI * 1.25);
				ctx.fillStyle = '#aaa';
				//#0a475c
				ctx.fill(playerProjectile.shape);
				ctx.restore();
				e.y -= 200;
			} else {
				shootProjectiles.splice(shootProjectiles.indexOf(e), 1);
			}

		}
		)
	}
}

//animate
setInterval(frame, fps)

window.addEventListener('keydown', controlPlayer);
window.addEventListener('keyup', stopControllingPlayer)