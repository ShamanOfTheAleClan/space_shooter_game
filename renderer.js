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
import { playerSprite, playerProjectileSprite, mineProjectileSprite, mineSprite } from './data/sprites.js';
import { enemies, enemyProjectiles } from './data/enemies/enemies.js';
import './data/scripts/eventScriptLog.js';





const checkCollisions = () => {
	if (playerProjectiles.length > 0) {
		for (let i = 0; i < enemies.length; i++) {
			enemies[i].checkCollision();
		}
	}
	if (enemyProjectiles.length > 0) {
		for (let i = 0; i < enemyProjectiles.length; i++) {
			enemyProjectiles[i].checkCollision()
		}
	}
	// const myWorker = new Worker('collisionDetection.js');
	// if (playerProjectiles.length > 0) {
	// 	for (let i = 0; i < enemies.length; i++) {
	// 		myWorker.postMessage(enemies[i]);
	// 	}
	// }
	// if (enemyProjectiles.length > 0) {
	// 	for (let i = 0; i < enemyProjectiles.length; i++) {
	// 		myWorker.postMessage(enemyProjectiles[i]);
	// 	}
	// }
}

const collectDead = () => {

}

const drawPlayer = () => {
	// Wait for the sprite sheet to load

	// Load the sprite sheet from an image file
	if (!player.dead) {
		if (playerSprite) ctx.drawImage(playerSprite, player.x, player.y);
		// ctx.beginPath();
		// ctx.lineWidth = "1";
		// ctx.strokeStyle = "red";
		// ctx.rect(player.x, player.y, player.width, player.height);
		// ctx.stroke();
	}
}


const drawPlayerProjectiles = () => {
	// optimise without using for cycle
	for (let i = 0; i < playerProjectiles.length; i++) {
		let e = playerProjectiles[i]
		if (e.y > 0 && !e.dead) {
			if (playerProjectileSprite) ctx.drawImage(playerProjectileSprite, e.x, e.y);
			e.moveProjectile();
			// ctx.beginPath();
			// ctx.lineWidth = "1";
			// ctx.strokeStyle = "red";
			// ctx.rect(e.x, e.y, e.width, e.height);
			// ctx.stroke();

		} else {
			playerProjectiles.splice(playerProjectiles.indexOf(e), 1);
		}

	}

}

// draw enemies
const drawEnemies = () => {
	for (let i = 0; i < enemies.length; i++) {
		if (!enemies[i].dead) {
			switch (enemies[i].sprite) {
				case 'mine':
					if (mineSprite) ctx.drawImage(mineSprite, enemies[i].x, enemies[i].y);
					break;
			}

			// ctx.beginPath();
			// ctx.lineWidth = "1";
			// ctx.strokeStyle = "red";
			// ctx.rect(enemy.x, enemy.y, enemy.width, enemy.height);
			// ctx.stroke();
		} else {
			enemies.splice(enemies.indexOf(enemy), 1);
		}
	}


}

const drawEnemyProjectiles = () => {
	for (let i = 0; i < enemyProjectiles.length; i++) {
		if (!enemyProjectiles[i].dead) {
			enemyProjectiles[i].move();
			if (mineProjectileSprite) ctx.drawImage(mineProjectileSprite, enemyProjectiles[i].x, enemyProjectiles[i].y);
			// ctx.beginPath();
			// ctx.lineWidth = "1";
			// ctx.strokeStyle = "red";
			// ctx.rect(projectile.x, projectile.y, projectile.width, projectile.height);
			// ctx.stroke();

		} else {
			enemyProjectiles.splice(enemyProjectiles.indexOf(enemyProjectiles[i]), 1);
		}

	}
	enemyProjectiles.forEach((projectile) => {

	})
}


const frame = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawPlayer();
	drawEnemies();
	if (playerProjectiles.length != 0) {
		drawPlayerProjectiles();
	}
	if (enemyProjectiles.length > 0) {
		drawEnemyProjectiles();
	}
	checkCollisions();
	window.requestAnimationFrame(frame)
}
window.requestAnimationFrame(frame)


window.addEventListener('keydown', controlPlayer);
window.addEventListener('keyup', stopControllingPlayer);