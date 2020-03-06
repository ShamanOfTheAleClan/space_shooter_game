import { enemies, enemyProjectiles } from "./enemies/enemies.js";
import { player, playerProjectiles, PlayerProjectile } from "./player.js";
import { canvas } from "./globals.js";

const upKey = 38; // Up
const rightKey = 39; // Right
const downKey = 40; // Down
const leftKey = 37; // Left
const shootKey = 16; // left Shift
const debug = 68; // D

let moveUp = null;
let moveDown = null;
let moveRight = null;
let moveLeft = null;
let shoot = null;

const controlPlayer = e => {
   switch (e.keyCode) {
      case upKey:
         if (moveUp == null) {
            const move = () => {
               if (player.y > -player.height / 2) player.y -= player.speed;
            };
            moveUp = setInterval(move, 10);
         }
         break;

      case downKey:
         if (moveDown == null) {
            const move = () => {
               if (player.y < canvas.height - player.height / 2)
                  player.y += player.speed;
            };
            moveDown = setInterval(move, 10);
         }
         break;

      case rightKey:
         if (moveRight == null) {
            const move = () => {
               if (player.x < canvas.width - player.width / 2)
                  player.x += player.speed;
            };
            moveRight = setInterval(move, 10);
         }
         break;

      case leftKey:
         if (moveLeft == null) {
            const move = () => {
               if (player.x > -player.width / 2) player.x -= player.speed;
            };
            moveLeft = setInterval(move, 10);
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
         console.log("Enemies: ", enemies);
         console.log("Enemy projectiles", enemyProjectiles);
         console.log("Player ", player);
         console.log("canvas ", canvas);
         document.getElementById("canvas").addEventListener("click", e => {
            console.log("X: ", e.x, "Y: ", e.y);
         });
   }
};

let stopControllingPlayer = e => {
   switch (e.keyCode) {
      case upKey:
         clearInterval(moveUp);
         moveUp = null;
         break;

      case downKey:
         clearInterval(moveDown);
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
};

export {
   upKey,
   rightKey,
   downKey,
   leftKey,
   shootKey,
   debug,
   controlPlayer,
   stopControllingPlayer
};
