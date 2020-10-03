// level 2
var x = 0;
var y = 0;

var engine;

class Scene2 extends Phaser.Scene {
    constructor()
    {
        super('Scene2');
    }



// preload
preload(){
    // load background
    // this.load.image('wall', 'Interior/Wall.png');
    // this.load.image('floor', 'Interior/Floor.png');
    // this.load.image('sideWall', 'Interior/SideWall.png');
    
    //this.load.spritesheet('engine_room', 'engine_interior.png');
}

// create
create(){
    //Make background
    let platforms = this.physics.add.staticGroup();
    y = 30
    while (y != 600){
        for (x = 30; x < 850; x += 30){
            this.add.image(x, y, 'floor');
        }
        y += 30
    }
    for (y = 15; y < 700; y += 15){
        platforms.create(10, y, 'sideWall');
    }
    for (y = 15; y < 700; y += 15){
        platforms.create(790, y, 'sideWall');
    }
    for (x = 0; x < 800; x += 15){
        platforms.create(x, 630, 'sideWall');
    }
    for (x = 23; x < 830; x += 46){
        platforms.create(x, 0, 'wall').setScale(1).refreshBody();
    }
    player = this.physics.add.sprite(100, 450, 'character');
    
    // engine
    engine = this.add.image(200, 200, 'engine_room', [15]);
    
    //animations
    this.anims.create({
        key: 'Idle',
        frames: this.anims.generateFrameNumbers('character', {start:0, end: 10}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('right', { start: 0, end: 10 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('left', { start: 0, end: 10 }),
        frameRate: 10,
        repeat: -1
    });
    cursors = this.input.keyboard.createCursorKeys();
}    
    
// update
update(){
    player.setVelocityX(0);
    player.setVelocityY(0);
    if (cursors.right.isDown){
        player.setVelocityX(160);
        player.anims.play('right', true);
    }
    else if (cursors.left.isDown){
        player.setVelocityX(-160);
        player.anims.play('left', true);
    }
    else if (cursors.up.isDown)
        {
            player.setVelocityY(-160);
            // player.anims.play('up', true)
        }
    else if (cursors.down.isDown){
        player.setVelocityY(160);
        // player.anims.play('down', true)
    }
}
}