import { playerProjectiles, player } from '../player.js';
import { collisionDetection } from '../collisionDetection.js';
import { canvas } from '../globals.js';

let enemyProjectiles = [];
let enemies = [];

class Enemy {
    constructor() {
        this.dead = false;
        this.health = null;
        this.x = null;
        this.y = null;
        this.width = null;
        this.height = null;
        this.behaving = false;
        this.sprite = null;
    }
    checkCollision() {
        playerProjectiles.forEach((projectile) => {
            if (collisionDetection(projectile, this)) {
                this.health--;
            }
        });
        if (this.health <= 0) this.dead = true;
    }

}

class EnemyProjectile {
    constructor({ x, y, height, width, speed, trajectory }) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.speed = speed;
        this.dead = false;
        if (typeof trajectory === 'object') {
            if ((trajectory.x === 0 || trajectory.x) && (trajectory.y === 0 || trajectory.y)) {
                this.trajectory = trajectory;
            } else {
                throw (`trajectory must have keys {x, y}`);
            }

        } else {
            throw (`trajectory must be an Object. Currently its ${typeof trajectory}`);
        }

    }
    move() {
        this.x = this.x + this.speed * this.trajectory.x;
        this.y = this.y + this.speed * this.trajectory.y;

        if (this.x < 0
            || this.y < 0
            || this.x > canvas.width
            || this.y > canvas.height) {
            this.dead = true;
        }
    }
    checkCollision() {
        if (collisionDetection(this, player)) {
            this.dead = true;
            player.dead = true;
        }
    }
}



class Swarm {
    constructor() {

    }
}

class Worm {
    constructor() {

    }
}

class Striker {
    constructor() {

    }
}



export { Enemy, EnemyProjectile, enemies, enemyProjectiles }