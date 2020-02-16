import { upKey, rightKey, downKey, leftKey, shootKey, debug } from './controls.js';
import { ctx, canvas } from './globals.js';
import { enemies } from './enemies.js';
import { mine } from './eventScriptLog.js';

let moveUp = null;
let moveDown = null;
let moveRight = null;
let moveLeft = null;
let shoot = null;
let playerProjectiles = [];

class PlayerProjectile {
    constructor() {
        this.x = player.x + 37;
        this.y = player.y - 50;
        this.height = 42;
        this.width = 25;
        this.speed = 15;
        this.dead = false;
    }
}


let player = {
    x: 455,
    y: 690,
    height: 75,
    width: 97,
    speed: 4,
    dead: false,
}


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
            console.log('Mine: ', mine);
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



export { playerProjectiles, player, controlPlayer, stopControllingPlayer, PlayerProjectile }