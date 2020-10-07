// level 2
var x = 0;
var y = 0;
var items;
var engine;
var engineOff;
var engineOn;
var door;
var door_open = false;
var startDoor_open = false;
var powerOn = false;
var power;
var startDoor;
var startPad;
var startTouchPad = false;

var startPowerSupply;
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
    // also a placeholder for objects that will be removed
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

    // tutorial section
    for (x = 0; x < 10; x += 15){
        platforms.create(x, 200, 'backwall');
    }
    for (x = 204; x < 350; x += 15){
        platforms.create(x, 200, 'backwall');
    }

    // will delete eventually, so added to platforms group (does not matter where it is stored)
    startDoor = platforms.create(101, 200, 'engine_door').setScale(2);
    startPad = this.physics.add.sprite(350, 140, 'powerPad');

    for (y = 0; y < 150; y += 15){
        platforms.create(400, y, 'sideWall');
    }

    for (x = 23; x < 830; x += 46){
        platforms.create(x, 0, 'wall').setScale(1).refreshBody();
    }
    player = this.physics.add.sprite(50, 130, 'character').setScale(.25);
    
    
    // powersupply sprite
    startPowerSupply = this.physics.add.sprite(150, 120, 'powerSource', 2);
    
    // engine
    engine = this.physics.add.staticGroup();
    engineOff = engine.create(600, 200, 'powerSource');

    // engine door
    door = this.physics.add.sprite(600, 16, 'engine_door').setScale(2);
    // door.create(300, 20, 'engine_door');

    items = this.physics.add.group();

    items.create(650, 450, 'box');

    // engine battery

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
        frames: this.anims.generateFrameNumbers('engine_door', { start: 0, end: 11 }),
        frameRate: 10,
        repeat: 0
    });
    this.anims.create({
        key: 'engineOn',
        frames: this.anims.generateFrameNumbers('powerSource', { start: 0, end: 2 }),
        frameRate: 4,
        repeat: 0
    });
    // start pad animation
    this.anims.create({
        key: 'startPadOn',
        frames: this.anims.generateFrameNumbers('powerPad', { start: 0, end: 1 }),
        frameRate: 4,
        repeat: 0
    });

    cursors = this.input.keyboard.createCursorKeys();
    //door border
    let border_door = this.physics.add.sprite(600, 20);
    border_door.width = 32;
    border_door.height = 28;//(29, 26);
    //power source border
    let border_power = this.physics.add.sprite(600, 200);
    border_power.width = 40;
    border_power.height = 30;


    // door open function
    function doorOpen(){
        if (door_open == false){
            door.anims.play('open', true);
            door_open = true;
        }
    }
    //start door open function
    // function startDoorOpen(){
    //     if (startDoor_open == false){
    //         platforms.remove(startDoor);
    //         startDoor.setVisible(false);
    //         startDoor = this.physics.add.sprite(104, 200, 'engine_door').setScale(1.5);
    //         startDoor.anims.play('open', true);
    //         startDoor_open = true;
    //     }
    // }
    //power source on
    function engineOn(){
        if ((cursors.space.isDown) && (!powerOn)){
            power = this.physics.add.sprite(600, 200, 'powerSource')
            engine.remove(engineOff);
            engineOff.setVisible(false);
            power.anims.play('engineOn', true);
            console.log('yes');
            this.physics.add.collider(player, power);
            powerOn = true;
        }
    }

    // start pad on
    //power source on
    function startPadOnFunc(){
        if(!startTouchPad){
        startPad.anims.play('startPadOn', true);
            startTouchPad = true;
        }
        if (startDoor_open == false){
            platforms.create(350, 140, 'powerSource', 2);
            startPowerSupply.setVisible(false);
            platforms.remove(startDoor);
            startDoor.setVisible(false);
            startDoor = this.physics.add.sprite(104, 200, 'engine_door').setScale(2);
            startDoor.anims.play('open', true);
            startDoor_open = true;
        }
    }


    this.physics.add.collider(player, items);
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, door);
    this.physics.add.collider(player, engine);
    this.physics.add.collider(player, startPowerSupply);
    
    // powersupply is clipping through wall, collision not working?
    this.physics.add.collider(platforms, startPowerSupply);
    this.physics.add.overlap(player, border_door, doorOpen, null, this);
    this.physics.add.overlap(player, border_power, engineOn, null, this);
    this.physics.add.overlap(startPowerSupply, startPad, startPadOnFunc, null, this);
}

// update
update(){
//    if(!overlap(startPad, player)){
//        startTouchPad = false;
//    }
    //startTouchPad = false;
    //make the object moveable
    items.setVelocityX(0);
    items.setVelocityY(0);
    player.setVelocityX(0);
    player.setVelocityY(0);
    startPowerSupply.setVelocityX(0);
    startPowerSupply.setVelocityY(0);

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
            // player.anims.play('up', true)
        }
    else if (cursors.down.isDown){
        player.setVelocityY(360);
        // player.anims.play('down', true)
    }
    else{
      player.anims.play('Idle',true)
    }
    if (powerOn){
        power.setVelocityX(0);
        power.setVelocityY(0);
    }
}
}
