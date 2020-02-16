// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.




// const { upKey, rightKey, downKey, leftKey, shootKey, debug } = require('./controls');

import { canvas, ctx, fps } from './globals.js';
import { shootProjectiles, player, controlPlayer, stopControllingPlayer, PlayerProjectile } from './player.js';
import { playerSprite, playerProjectileSprite } from './sprites.js';
import { enemies } from './eventScript.js';




const drawPlayer = () => {
	// Wait for the sprite sheet to load

	// Load the sprite sheet from an image file
	if (playerSprite) ctx.drawImage(playerSprite, player.x, player.y);

	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.strokeStyle = "red";
	ctx.rect(player.x, player.y, player.width, player.height);
	ctx.stroke();
}


const drawPlayerProjectiles = () => {
	shootProjectiles.forEach((e, i) => {
		if (e.y > 0) {
			if (playerProjectileSprite) ctx.drawImage(playerProjectileSprite, e.x, e.y);

			ctx.beginPath();
			ctx.lineWidth = "1";
			ctx.strokeStyle = "red";
			ctx.rect(e.x, e.y, e.width, e.height);
			ctx.stroke();
			e.y -= e.speed;
		} else {
			shootProjectiles.splice(shootProjectiles[i], 1);
		}

	});
}


// draw enemies
const drawEnemies = () => {
	enemies.forEach((enemy) => {
	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.strokeStyle = "red";
	ctx.rect(enemy.x, enemy.y, enemy.width, enemy.height);
	ctx.stroke();
	})

}


const frame = () => {
	// 	clear canvas
	// console.log('frame')
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// 	move player
	drawPlayer();
	drawEnemies();
	if (shootProjectiles.length != 0) {
		drawPlayerProjectiles();
	}
}

//animate
setInterval(frame, fps);

window.addEventListener('keydown', controlPlayer);
window.addEventListener('keyup', stopControllingPlayer);