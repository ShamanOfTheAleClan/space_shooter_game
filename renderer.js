// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.




// const { upKey, rightKey, downKey, leftKey, shootKey, debug } = require('./controls');

import { canvas, ctx, fps } from './data/globals.js';
import { playerProjectiles, player } from './data/player.js';
import { controlPlayer, stopControllingPlayer } from './data/controls.js';
import { playerSprite, playerProjectileSprite } from './data/sprites.js';
import { enemies } from './data/enemies/enemies.js';
import './data/eventScriptLog.js';


const checkCollisions = () => {
	if (playerProjectiles.length > 0) {
		enemies.forEach((enemy) => {
			enemy.checkCollision();
		})
	}
}

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
	playerProjectiles.forEach((e, i) => {
		if (e.y > 0 && e.dead === false) {
			if (playerProjectileSprite) ctx.drawImage(playerProjectileSprite, e.x, e.y);

			ctx.beginPath();
			ctx.lineWidth = "1";
			ctx.strokeStyle = "red";
			ctx.rect(e.x, e.y, e.width, e.height);
			ctx.stroke();
			e.moveProjectile();
		} else {
			playerProjectiles.splice(playerProjectiles[i], 1);
		}

	});
}


// draw enemies
const drawEnemies = () => {
	enemies.forEach((enemy, i) => {
		if (!enemy.dead) {
			ctx.beginPath();
			ctx.lineWidth = "1";
			ctx.strokeStyle = "red";
			ctx.rect(enemy.x, enemy.y, enemy.width, enemy.height);
			ctx.stroke();
		} else {
			enemies.splice(enemies[i], 1);
		}
	})

}



const frame = () => {
	// 	clear canvas
	// console.log('frame')
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// 	move player
	checkCollisions();
	drawPlayer();
	drawEnemies();
	if (playerProjectiles.length != 0) {
		drawPlayerProjectiles();
	}
}

//animate
setInterval(frame, fps);

window.addEventListener('keydown', controlPlayer);
window.addEventListener('keyup', stopControllingPlayer);