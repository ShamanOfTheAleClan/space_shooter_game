import { enemies, enemyProjectiles } from './enemies/enemies.js';
import { player, playerProjectiles, PlayerProjectile } from './player.js';
import { canvas } from './globals.js';


const upKey = 38; 		// Up
const rightKey = 39; 	// Right
const downKey = 40; 	// Down
const leftKey = 37; 	// Left
const shootKey = 16;	// left Shift
const debug = 68;		// D

let moveUp = null;
let moveDown = null;
let moveRight = null;
let moveLeft = null;
let shoot = null;


let controlPlayer = (e) => {
    switch (e.keyCode) {
        case upKey:
            if (moveUp == null) {
                moveUp = setInterval(() => {
                    if (player.y > 50) player.y -= player.speed;
                }, 10)
            }
            break;

        case downKey:
            if (moveDown == null) {
                moveDown = setInterval(() => {
                    if (player.y < 765) player.y += player.speed;
                }, 10)
            }
            break;

        case rightKey:
            if (moveRight == null) {
                moveRight = setInterval(() => {
                    if (player.x < 950) player.x += player.speed;
                }, 10)
            }
            break;

        case leftKey:
            if (moveLeft == null) {
                moveLeft = setInterval(() => {
                    if (player.x > -50) player.x -= player.speed;
                }, 10)
            }
            break;

        case shootKey:
            if (shoot == null) {
                playerProjectiles.push(new PlayerProjectile());
                shoot = setInterval(() => {
                    playerProjectiles.push(new PlayerProjectile());
                }, 175);

                //     // TODO make it pulse while shooting


                // }
                // console.log(shootProjectiles);
            }
            break;
        case debug:
            console.log(player.x, player.y);
            console.log('Enemies: ', enemies);
            console.log('Enemy projectiles', enemyProjectiles);
            console.log('Player ', player);
            console.log('canvas ', canvas);
    }
}

let stopControllingPlayer = (e) => {
    switch (e.keyCode) {
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

export { upKey, rightKey, downKey, leftKey, shootKey, debug, controlPlayer, stopControllingPlayer }