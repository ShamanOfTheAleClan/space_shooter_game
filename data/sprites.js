const sprites = {
    player: './assets/Player.png',
    playerProjectile: './assets/playerProjectile.png',
	enemyProjectileRound: './assets/enemyProjectileRound.png',
	enemyMine: './assets/enemyMine.png'

}

// image pixel to object width ratio 1:3

//Player

let playerSpriteImage = new Image();
let playerSprite = null;

playerSpriteImage.onload = () => {
	Promise.all([
		// Cut out two sprites from the sprite sheet
		createImageBitmap(playerSpriteImage, 0, 0, 32, 25, { resizeWidth: 96, resizeHeight: 75, resizeQuality: 'pixelated' }),
	]).then((sprites) => {
		// Draw each sprite onto the canvas
		playerSprite = sprites[0];

	});
}
playerSpriteImage.src = sprites.player;


//Players projectiles

let playerProjectileSpriteImage = new Image();
let playerProjectileSprite = null;

playerProjectileSpriteImage.onload = () => {
	Promise.all([
		createImageBitmap(playerProjectileSpriteImage, 0, 0, 8, 14, { resizeWidth: 24, resizeHeight: 42, resizeQuality: 'pixelated' }),
	]).then((sprites) => {
		playerProjectileSprite = sprites[0];

	});
}
playerProjectileSpriteImage.src = sprites.playerProjectile;

// Mine

let mineSpriteImage = new Image();
let mineSprite = undefined;

mineSpriteImage.onload = () => {
	Promise.all([
		createImageBitmap(mineSpriteImage, 0, 0, 17, 17, {resizeWidth: 51, resizeHeight: 51, resizeQuality: 'pixelated'}),
	]).then((sprites) => {
		mineSprite = sprites[0];
	})
}
mineSpriteImage.src = sprites.enemyMine;


// Mine projectile

let mineProjectileSpriteImage = new Image();
let mineProjectileSprite = null;

mineProjectileSpriteImage.onload = () => {
	Promise.all([
		createImageBitmap(mineProjectileSpriteImage, 0, 0, 5, 5, {resizeWidth: 15, resizeHeight: 15, resizeQuality: 'pixelated'}), 
	]).then((sprites) => {
		mineProjectileSprite = sprites[0];
	})
}
mineProjectileSpriteImage.src = sprites.enemyProjectileRound;

export { playerSprite, playerProjectileSprite, mineProjectileSprite, mineSprite}