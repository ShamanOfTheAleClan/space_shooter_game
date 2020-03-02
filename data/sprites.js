const sprites = {
    player: './assets/Player.png',
    playerProjectile: './assets/playerProjectile.png',

}

//Player

let playerSpriteImage = new Image();
let playerSprite = null;

playerSpriteImage.onload = () => {
	Promise.all([
		// Cut out two sprites from the sprite sheet
		createImageBitmap(playerSpriteImage, 0, 0, 97, 75),
	]).then( (sprites) => {
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
		createImageBitmap(playerProjectileSpriteImage, 0, 0, 25, 42),
	]).then(function (sprites) {
		playerProjectileSprite = sprites[0];

	});
}
playerProjectileSpriteImage.src = sprites.playerProjectile;

export { playerSprite, playerProjectileSprite }