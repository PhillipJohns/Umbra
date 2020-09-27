var player;
var cursors;

var config = {
	type: Phaser.AUTO,
	width: 800,
    height: 600,
    scene: [Scene1],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
}

var game = new Phaser.Game(config);
game.scene.start('Scene1');