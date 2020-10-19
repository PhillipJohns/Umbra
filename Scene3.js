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
// var timer;

// coordinates
var sprite_x;
var sprite_y;
var spriteCoord;

//doors
var door1;
var door2;
var door3;
var door4;
var door5;
var door6;
var door7;
var door8;
var door9;
var door10;
var door11;
var door12;
var door13;
var door14;
var game = this;

//Buttons
var room1Button;
var room2Button;
var room5Button;
var room5Buttonb;

var player;

// scene 3 code
class Scene3 extends Phaser.Scene {
    constructor()
    {
        super('Scene3');
    }


preload(){
    this.load.image("tiles", "Interior/tileset.png");
    this.load.tilemapTiledJSON("maze", "MazeMap.json");

}

create(){
    // background
    bg = this.add.image(0, 0, 'bbackground').setScale(6);
    const maze = this.make.tilemap({ key: "maze" });
    const tileset = maze.addTilesetImage("tileset", "tiles");
    const worldLayer = maze.createStaticLayer('Tile Layer 1', tileset, 0, 0);
    worldLayer.setCollisionByProperty({ Collision: true });
    
    // show the Spirtes X and Y coord
    spriteCoord = this.add.text(50, 50, 'The sprites X and Y: ', { fontSize: '18px', fill: '#900' });

    //Door buttons
    this.add.image(2336, 2480, 'button');
    let borderButton1 = this.physics.add.sprite(2336, 2480).setSize(40, 40);
    
    // door buttons room 2
    // tiled coordinates = (1632, 2560)
    // added 16 px to Y
    this.add.image(1632, 2576, 'button');
    let borderButton2 = this.physics.add.sprite(1632, 2576).setSize(40, 40);
    
    // door buttons room 3
    // tiled coordinates = (1152, 1888)
    // added 16 px to Y
    // added 16 px to X
    this.add.image(1168, 1904, 'button');
    let borderButton3 = this.physics.add.sprite(1168, 1904).setSize(40, 40);
    
    // door buttons room 3b
    // tiled coordinates = (1696, 2208)
    // added 16 px to Y
    // added 16 px to X
    this.add.image(1712, 2224, 'button');
    let borderButton3b = this.physics.add.sprite(1712, 2224).setSize(40, 40);
    
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
        key: 'openR',
        frames: this.anims.generateFrameNumbers('door', { start: 0, end: 6 }),
        frameRate: 10,
        repeat: 0
    });
    this.anims.create({
        key: 'openL',
        frames: this.anims.generateFrameNumbers('doorL', { start: 0, end: 6 }),
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
    
    

    //Test Door
    // Test Value was 2464(56), 2464(15)
    let platforms = this.physics.add.staticGroup();
    door2 = platforms.create(2520, 2459, 'engine_door').setScale(.35).setSize(170,70).setOffset(170,80);
    //Test2
    door4 = platforms.create(1432, 2554, 'engine_door').setScale(.35).setSize(170,70).setOffset(170,80);
    //Test3
    door5 = platforms.create(1432, 2714, 'engine_door').setScale(.35).setSize(170,70).setOffset(170,80);
    //Test Side door
    // Test value was 2784(22), 2592(56)
    door1 = platforms.create(2806, 2648, 'door').setScale(.35).setSize(70,160).setOffset(80,165);
    //Test Right facing side door
    //Test value was 2208(2), 2592(56)
    door3 = platforms.create(2206, 2648, 'doorL').setScale(.35).setSize(70,160).setOffset(80,165);
    //All door test
    door6 = platforms.create(834, 2648, 'doorL').setScale(.35).setSize(70,160).setOffset(80,165);
    door7 = platforms.create(2934, 1976, 'door').setScale(.35).setSize(70,160).setOffset(80,165);
    door8 = platforms.create(1718, 2072, 'door').setScale(.35).setSize(70,160).setOffset(80,165);
    door9 = platforms.create(1154, 2072, 'doorL').setScale(.35).setSize(70,160).setOffset(80,165);
    door10 = platforms.create(3800, 143, 'engine_door').setScale(.35).setSize(170,70).setOffset(170,80);
    door11= platforms.create(3266, 472, 'door').setScale(.35).setSize(70,160).setOffset(80,165);
    door12 = platforms.create(1718, 792, 'door').setScale(.35).setSize(70,160).setOffset(80,165);
    door13 = platforms.create(856, 495, 'engine_door').setScale(.35).setSize(170,70).setOffset(170,80);
    door14 = platforms.create(568, 1519, 'engine_door').setScale(.35).setSize(170,70).setOffset(170,80);
    //Door position list
    let Hdoors = [door2, door4, door5, door10, door13, door14];
    let VdoorsL = [door3, door6, door9];

    
    // open door functions
    function open_door(doorList){
        // console.log(this);
        if (cursors.space.isDown){
            //console.log(this);
            timer = this.time.delayedCall(5000, function(){close_door(doorList)}, null, this);
            //console.log('OpenDoor')
            for(let doorNumber = 0; doorNumber < doorList.length; doorNumber ++){
                if (Hdoors.includes(doorList[doorNumber])){
                    doorList[doorNumber].anims.play('open', true);
                    platforms.remove(doorList[doorNumber]);
                } 
                else if(VdoorsL.includes(doorList[doorNumber])){
                    doorList[doorNumber].anims.play('openL', true);
                    platforms.remove(doorList[doorNumber]);
                }
                else{
                    doorList[doorNumber].anims.play('openR', true);
                    platforms.remove(doorList[doorNumber]);
                }
                }    
            }
        }


    // Close door function
    function close_door(doorList){
        //console.log('CloseDoor')
        for(let doorNumber = 0; doorNumber < doorList.length; doorNumber ++){
            doorList[doorNumber].setFrame(0);
            platforms.add(doorList[doorNumber]);

        }
    }
         

    //make player
    player = this.physics.add.sprite(2500, 3100, 'character').setScale(.25);
    player.setSize(120, 250);
    player.setOffset(70, 220);

    //Player Collision
    this.physics.add.collider(player, worldLayer);
    this.physics.add.collider(player, platforms);
    

    //Player Overlap
    // use .call on open_door function to provide context i.e. see below
    this.physics.add.overlap(player, borderButton1, function(){open_door.call(this, [door1, door2, door3])}, null, this);
    
    // border button 2
    this.physics.add.overlap(player, borderButton2, function(){open_door.call(this, [door4, door5, door6])}, null, this);
    
    // border button 3
    this.physics.add.overlap(player, borderButton3, function(){open_door.call(this, [door4, door5, door6])}, null, this);
    
    // border button 3b
    this.physics.add.overlap(player, borderButton3b, function(){open_door.call(this, [door4, door5, door6])}, null, this);
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

