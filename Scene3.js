// global vars
//
//

// door flags
var door1Open  = false;

// background
var bg;

// player X and Y
var x = 0;
var y = 0;


// timer
var timer;

// coordinates
var sprite_x;
var sprite_y;
var spriteCoord;

var player;

// scene 3 code
class Scene3 extends Phaser.Scene {
    constructor()
    {
        super('Scene3');
    }

preload(){
    

}

create(){
    // background
    bg = this.add.image(0, 0, 'bbackground').setScale(4);
    
    // show the Spirtes X and Y coord
    spriteCoord = this.add.text(50, 50, 'The sprites X and Y: ', { fontSize: '18px', fill: '#900' });
    
    // create door sprites
//    let door1 = this.physics.add.sprite(0, 0, 'engine_door').setScale(.5);
//    
//    let door2 = this.physics.add.sprite(250, 0, 'engine_door', 6).setScale(.5);
    
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
    this.anims.create({
        key: 'open',
        frames: this.anims.generateFrameNumbers('engine_door', { start: 0, end: 6 }),
        frameRate: 10,
        repeat: 0
    });
    this.anims.create({
        key: 'close',
        frames: this.anims.generateFrameNumbers('engine_door', { start: 6, end: 0 }),
        frameRate: 10,
        repeat: 0
    });
    // start pad animation
    // this.anims.create({
    //     key: 'fixed',
    //     frames: this.anims.generateFrameNumbers('powerPad', { start: 1, end: 0 }),
    //     frameRate: 4,
    //     repeat: 0
    // });
    
    // cursors
    cursors = this.input.keyboard.createCursorKeys();
    
    //make player
    player = this.physics.add.sprite(50, 130, 'character').setScale(.25);
    player.setSize(120, 250);
    player.setOffset(70, 220);
    
    // open door functions
//    function open_door(){
//        //if (cursors.space.isDown){
//           if(door1Open == false){
//               console.info("door 1 open");
//               door1.anims.play('open', true);
//               door2.anims.play('close', true);
//               door1Open = true;
//           }
//            else{
//               console.info("door 1 close");
//               door1.anims.play('close', true);
//               door2.anims.play('open', true);
//               door1Open = false;
//            }
//        //}
//    }
    
    // timer function
    function openDoorTimer(){
        if(cursors.space.justDown){
            timer = this.time.delayedCall(1000, open_door, null, this);
        }
    }    
    
    // overlap functions
    //this.physics.add.overlap(player, door1, openDoorTimer, null, this);
    
}

update(){
    // camera follows the player
    this.cameras.main.startFollow(player);
    
    // keep track of the sprite X and Y
    spriteCoord.setText('Sprite X: ' + parseFloat(player.x).toFixed(2) + " Sprite Y: " + parseFloat(player.y).toFixed(2));
    
    player.setVelocityX(0);
    player.setVelocityY(0);
    
//    if(cursors.shift.isDown){
//        powerSupplyFixedText.setVisible(false);
//        doorFixedText.setVisible(false);
//        toolBoxAcquiredText.setVisible(false);
//        graphics.setVisible(false);
//        this.physics.resume();
//    }
    
    if (cursors.right.isDown){
        player.setVelocityX(360);
        player.anims.play('right', true);
    }
    else if (cursors.left.isDown){
        player.setVelocityX(-360);
        player.anims.play('left', true);
    }
    else if (cursors.up.isDown)
        {
            player.setVelocityY(-360);
            player.anims.play('up', true)
        }
    else if (cursors.down.isDown){
        player.setVelocityY(360);
        player.anims.play('down', true)
    }
    else{
      player.anims.play('Idle',true)
    }
}  
    
    
}
