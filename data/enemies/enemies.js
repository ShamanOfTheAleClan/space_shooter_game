import { playerProjectiles } from '../player.js';
import { collisionDetection } from '../collisionDetection.js';

class Enemy {
    constructor() {
        this._behaviour = function() {}
        this.dead = false;
        this.health = null;
        this.x = null;
        this.y = null;
        this.width = null;
        this.height = null;
    }
    get behaviour() {
        this._behaviour;
    }
    set behaviour(payload) {
        if (typeof payload === 'function') {
            this._behaviour = payload
        } else {
            console.error(`'behaviour' must be a function. Currently its '${typeof payload}'`);
        }
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
    constructor({x, y, height, width, speed, trajectory}) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.speed = speed;
        this.dead = false;
        if (typeof trajectory === 'object') {
            if ((trajectory.x === 0 || trajectory.x) && (trajectory.y === 0 ||trajectory.y)) {
                this.trajectory = trajectory;
            } else {
                throw(`trajectory must have keys {x, y}`);
            }
            
        } else {
            throw(`trajectory must be an Object. Currently its ${typeof trajectory}`);
        }
        
    }
    moveProjectile() {
        this.x = this.x + this.speed * this.trajectory.x;
        this.y = this.y + this.speed * this.trajectory.y;
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
        this.health = 10;
        this.projectiles = [];
        this._behaviour = function() {
            setInterval(() => {
                let state = 0;
                
                const shoot = (trajectory) => {
                    // trajectories
                    // -------
                    // |1 2 3|
                    // |8 # 4|
                    // |7 6 5|
                    // -------
                    new EnemyProjectile({
                        x: null,
                        y: null,
                        height: 10,
                        width: 10,
                        speed: 5,
                        trajectory: {
                            x: undefined,
                            y: undefined
                        }
                    })
                }

                if (state === 0) {
                    // diagonical

                }

                if (state === 1) {
                    // horizontal/vertical
                }
            },4000);
        }
    }
}

class Striker {
    constructor() {

    }
}

let enemies = [];

export { Mine, enemies }