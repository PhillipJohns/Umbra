var player;
var cursors;

// Declare classes for item and NPC

// NPC class
class NPC {
    constructor(name, sprite_sheet, dialogue = {}){
        this.name = name;
        this.sprite_sheet = sprite_sheet;
        this.dialogue = dialogue;
    }
}

// Item class
class Item {
    constructor(name, image, dialogue){
        this.name = name;
        this.image = image;
        this.dialogue = dialogue;
    }
}

// Player class
class Player {
    constructor(){
        this.name = name;
        this.sprite_sheet = sprite_sheet;
        this.inventory = [];
    }
}

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