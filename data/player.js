let playerProjectiles = [];

class PlayerProjectile {
    constructor() {
        this.x = player.x + 37;
        this.y = player.y - 50;
        this.height = 42;
        this.width = 24;
        this.speed = 15;
        this.dead = false;
        this.trajectory = { x:0, y:-1 }
    }
    moveProjectile() {
        this.x = this.x + this.speed * this.trajectory.x;
        this.y = this.y + this.speed * this.trajectory.y;
    }
}


let player = {
    x: 455,
    y: 690,
    height: 75,
    width: 96,
    speed: 4,
    dead: false,
}

export { playerProjectiles, player, PlayerProjectile }