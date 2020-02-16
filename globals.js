const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const fps = Math.round(1000/60);

const collisionDetection = (projectile, target) => {
    const px1 = projectile.x;
    const px2 = projectile.x + projectile.width;
    const tx1 = target.x;
    const tx2 = target.x + target.width;

    if (projectile.y <= target.y) {
        if (
            // if projectile left corner is within target
            (px1 >= tx1 && px1 <= tx2)
            // or if projectile right corner is within target
            || (px2 >= tx1 && px2 <= tx2)
            // or if projectile is bigger than target and latter is within projectile
            || (px1 <= tx1 && px2 >= tx2)
        ) {
            projectile.dead = true;
            return true
        }
    }
    return false
}


export { canvas, ctx, fps, collisionDetection }