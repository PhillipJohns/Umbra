var x = 0;
var y = 0;
class Scene1 extends Phaser.Scene {
    constructor()
    {
        super('Scene1');
        
        
    }
preload(){
    this.load.spritesheet('character', 'Free/Main Characters/Ninja Frog/Idle (32x32).png', {frameWidth: 32, frameHeight: 32});
    this.load.spritesheet('right', 'Free/Main Characters/Ninja Frog/Run (32x32).png', {frameWidth: 32, frameHeight: 32});
    this.load.spritesheet('left', 'Free/Main Characters/Ninja Frog/RunL (32x32).png', {frameWidth: 32, frameHeight: 32});
    this.load.spritesheet('up', 'Free/Main Characters/Ninja Frog/Jump (32x32).png', {frameWidth: 32, frameHeight: 32});
    this.load.image('grass', 'Free/Terrain/Grass.png');
    this.load.image('background', 'Free/Background/Blue.png');
}

create(){
    let platforms = this.physics.add.staticGroup();
    //Make background
    y = 30
    while (y != 600){
        for (x = 30; x < 850; x += 30){
            this.add.image(x, y, 'background');
        }
        y += 30
    }
    for (x = 23; x < 830; x += 46){
        platforms.create(x, 578, 'grass').setScale(1).refreshBody();
    }
    //Make Character
    player = this.physics.add.sprite(100, 450, 'character');

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
    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('up', { start: 0, end: 0 }),
        frameRate: 10,
        repeat: -1
    });
    cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(player, platforms);
}

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
            player.anims.play('up', true)
        }
    else if (cursors.down.isDown){
        player.setVelocityY(160);
    }
}
}