import { playerProjectiles, player } from '../player.js';
import { collisionDetection } from '../collisionDetection.js';
import { canvas } from '../globals.js';

let enemyProjectiles = [];

class Enemy {
    constructor() {
        this.dead = false;
        this.health = null;
        this.x = null;
        this.y = null;
        this.width = null;
        this.height = null;
        this.behaving = false;
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

class Mine extends Enemy {
    constructor() {
        super();
        this.x = 455;
        this.y = 100;
        this.width = 50;
        this.height = 50;
        this.shootingTrajectory = 0;
        this.health = 10;
        this.state = 0;
        this.behaviour();
    }
    behaviour = function () {
        if (!this.behaving) {
            this.behaving = true;
            const shoot = (trajectory) => {
                // trajectories
                // 0 ---------> X
                // | |1 2 3|
                // | |8 # 4|
                // | |7 6 5|
                // |
                // V Y
                // 0.707 diagonal

                let trajectories = [];
                if (typeof trajectory === 'number') {
                    trajectories.push(trajectory)
                } else {
                    trajectories = [...trajectory];
                }
                let x = undefined;
                let y = undefined;
                let tX = undefined;
                let tY = undefined;
                for (const t of trajectories) {
                    switch (t) {
                        case 1:
                            x = this.x - 7;
                            y = this.y - 7;
                            tX = -0.707;
                            tY = -0.707;
                            break;
                        case 2:
                            x = this.x + this.width / 2;
                            y = this.y - 10;
                            tX = 0;
                            tY = -1;
                            break;
                        case 3:
                            x = this.x + this.width + 7;
                            y = this.y - 7;
                            tX = 0.707;
                            tY = -0.707;
                            break;
                        case 4:
                            x = this.x + this.width + 10;
                            y = this.y + this.height / 2;
                            tX = 1;
                            tY = 0;
                            break;
                        case 5:
                            x = this.x + this.width + 7;
                            y = this.y + this.height + 7;
                            tX = 0.707;
                            tY = 0.707;
                            break;
                        case 6:
                            x = this.x + this.width / 2;
                            y = this.y + this.height + 10;
                            tX = 0;
                            tY = 1;
                            break;
                        case 7:
                            x = this.x - 7;
                            y = this.y + this.height + 7;
                            tX = -0.707;
                            tY = 0.707;
                            break;
                        case 8:
                            x = this.x - 10;
                            y = this.y + this.height / 2;
                            tX = -1;
                            tY = 0;
                    }

                    enemyProjectiles.push(new EnemyProjectile({
                        x: x,
                        y: y,
                        height: 15,
                        width: 15,
                        speed: 5,
                        trajectory: {
                            x: tX,
                            y: tY
                        }
                    }));
                }


            }
            const shooting = setInterval(() => {
                if (!this.dead) {
                    this.state = this.state === 0 ? 1 : 0;

                    if (this.state === 0) {
                        // diagonal
                        shoot([1, 3, 5, 7]);
                    }

                    if (this.state === 1) {
                        // horizontal/vertical
                        shoot([2, 4, 6, 8]);
                    }
                } else {
                    clearInterval(shooting);
                }
            }, 3000);
        }
    }
}

class Striker {
    constructor() {

    }
}

let enemies = [];

export { Mine, enemies, enemyProjectiles }