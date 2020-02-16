import { playerProjectiles } from './player.js';
import { collisionDetection } from './globals.js';

class Enemy {
    constructor() {
        this.dead = false;
        this.health = null;
        this.x = null;
        this.y = null;
        this.width = null;
        this.height = null;

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



class Swarm {
    constructor() {

    }
}

class Worm {
    constructor() {

    }
}

class Mine extends Enemy {
    constructor() {
        super();
        this.x = 455;
        this.y = 100;
        this.width = 50;
        this.height = 50;
        this.shootingTrajectory = 0;
        // this.movingPatern = ;
        this.health = 10;

    }
}

console.log(new Mine());

class Striker {
    constructor() {

    }
}

let enemies = [];

export { Mine, enemies }