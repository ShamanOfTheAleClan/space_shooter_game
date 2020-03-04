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
		enemies.forEach((enemy) => {
			enemy.checkCollision();
		})
	}
	if (enemyProjectiles.length > 0) {
		enemyProjectiles.forEach((projectile) => {
			projectile.checkCollision();
		})
	}
}

const collectDead = () => {

}

const drawPlayer = () => {
	// Wait for the sprite sheet to load

	// Load the sprite sheet from an image file
	if (!player.dead) {
		if (playerSprite) ctx.drawImage(playerSprite, player.x, player.y);

		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.strokeStyle = "red";
		ctx.rect(player.x, player.y, player.width, player.height);
		ctx.stroke();
	}
}


const drawPlayerProjectiles = () => {
	// optimise without using for cycle
	playerProjectiles.forEach((e) => {
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

	});
}

// draw enemies
const drawEnemies = () => {
	enemies.forEach((enemy) => {
		if (!enemy.dead) {
			switch (enemy.sprite) {
				case 'mine':
					if (mineSprite) ctx.drawImage(mineSprite, enemy.x, enemy.y);
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
	})

}

const drawEnemyProjectiles = () => {
	enemyProjectiles.forEach((projectile) => {
		if (!projectile.dead) {
			projectile.move();
			if (mineProjectileSprite) ctx.drawImage(mineProjectileSprite, projectile.x, projectile.y);
			// ctx.beginPath();
			// ctx.lineWidth = "1";
			// ctx.strokeStyle = "red";
			// ctx.rect(projectile.x, projectile.y, projectile.width, projectile.height);
			// ctx.stroke();
			
		} else {
			enemyProjectiles.splice(enemyProjectiles.indexOf(projectile), 1);
		}
	})
}


const frame = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// 	move player
	drawPlayer();
	drawEnemies();
	if (playerProjectiles.length != 0) {
		drawPlayerProjectiles();
	}
	if (enemyProjectiles.length > 0) {
		drawEnemyProjectiles();
	}
	checkCollisions();
}

//animate
setInterval(frame, fps);

window.addEventListener('keydown', controlPlayer);
window.addEventListener('keyup', stopControllingPlayer);