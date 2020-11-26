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
var startDoor;
var startPad;
var startTouchPad = false;
var player;
var mazeDoor;
var mazeDoorOpen;
var toolKitFound;
var toolKit;
var graphics;
var buttonPush = false;
var toolsAdded = false;
var boxGray = false;
// coordinates
var sprite_x;
var sprite_y;
var spriteCoord;

// text variables
var powerSupplyFixedText;
var doorFixedText;
var toolBoxAcquiredText;
var notext;

// power supply is broken, I need a took kit
var powerSupplyFixed = false;

// door to scene 3
// Door is broken, need to fix power supply
var doorFixed = false;
var doorSound;

//npc
var npc;
var npcStatic;
var npc2 = {name: "npc1", dialogue: {1: "Thank you for fixing the power source!\nWe can't get through the next door\nwithout a toolkit to fix that power supply."}};
var npc_text;
// Toolbox to fix powersupply
// I found the toolbox
//var toolBoxAcquired = false;

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

    //sounds
    doorSound = this.sound.add('doorSound');

    // y = 30
    // while (y != 600){
    //     for (x = 30; x < 850; x += 30){
    //
    //     }
    //     y += 30
    // }

    this.add.image(x, y, 'background').setScale(2);
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
    for (x = 211; x < 350; x += 15){
        platforms.create(x, 200, 'backwall');
    }

    let things = this.physics.add.staticGroup();
    let thing = things.create(350, 110, 'box').setVisible(false).setScale(2).refreshBody();
    let thing1 = things.create(350, 140, 'box').setVisible(false).setScale(2).refreshBody();
    startPad = this.physics.add.sprite(350, 130, 'powerSource').setScale(.4);

    for (y = 0; y < 150; y += 15){
        platforms.create(400, y, 'sideWall');
    }

    for (x = 23; x < 830; x += 46){
        platforms.create(x, 0, 'wall').setScale(1).refreshBody();
    }
    // Maze and room
    //left npc
    platforms.create(150, 405, 'sideWall').setScale(.8).setSize(20,120).setOffset(4,11);
    //bottom of npc
    platforms.create(210, 454, 'backwall').setScale(.8);
    platforms.create(315, 454, 'backwall').setScale(.8);
    platforms.create(332, 454 , 'backwall').setScale(.8).setSize(120,20).setOffset(0,4);
    //right of npc
    platforms.create(376, 400, 'sideWall').setScale(.8).setSize(20,120).setOffset(4,12);
    //center maze wall
    platforms.create(480, 500, 'sideWall').setScale(.8).setSize(20,120).setOffset(4,12);
    //top of center maze wall
    platforms.create(440, 352, 'backwall').setScale(.8).setSize(120,20).setOffset(1,4);
    platforms.create(537, 352, 'backwall').setScale(.8).setSize(120,20).setOffset(1,4);
    //right of center maze wall
    platforms.create(580, 415, 'sideWall').setScale(.8).setSize(20,120).setOffset(4,10);

    platforms.create(640, 463, 'backwall').setScale(.8).setSize(120,20).setOffset(1,1);
    for (y = 400; y > 200; y -= 50){
        platforms.create(700, y, 'sideWall');
    }
    platforms.create(670, 190, 'backwall').setScale(.8).setDisplaySize(50, 20).setSize(50,20).setOffset(40, 0);
    platforms.create(650, 141, 'sideWall').setScale(.8).setScale(.8).setSize(20,120).setOffset(4,11);
    platforms.create(650, 90, 'sideWall').setScale(.8).setScale(.8).setSize(20,120).setOffset(4,11);

    //maze doors and buttons
    mazeDoor = platforms.create(744, 188, 'engine_door').setScale(.155).setSize(75,34).setOffset(220,85);
    let button1 = this.add.image(152, 400, 'button');
    let button2 = this.add.image(788, 130, 'button');
    mazeDoorOpen = this.physics.add.sprite(744, 188, 'engine_door').setScale(.15).setSize(75,34).setOffset(220,100).setVisible(false);

    // In-game text for Scene 2
    // black box for text
    graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(0, 480, 850, 500).setVisible(false);

    // text for power supply being broken (middle of room)
    // power supply is broken, I need a took kit
    powerSupplyFixedText = this.add.text(50, 510, 'The power supply is broken.\nI need a tool kit to fix it.', { fontSize: '28px', fill: '#999' }).setVisible(false);

    // door to scene 3
    // Door is broken, need to fix power supply
    doorFixedText = this.add.text(50, 510, 'The door is broken.\nI need the power supply to be on.', { fontSize: '28px', fill: '#999' }).setVisible(false);

    // Toolbox to fix powersupply
    // I found the toolbox
    toolBoxAcquiredText = this.add.text(50, 525, 'You picked up the toolbox!', { fontSize: '32px', fill: '#999' }).setVisible(false);

    //npc text
    npc_text = this.add.text(30, 500, 'You picked up the toolbox!', { fontSize: '28px', fill: '#999' }).setVisible(false);

    //locks door behind player
    notext = this.add.text(50, 500, 'The door is locked.', { fontSize: '28px', fill: '#999' }).setVisible(false);
    // show the Spirtes X and Y coord
    // spriteCoord = this.add.text(50, 50, 'The sprites X and Y: ', { fontSize: '18px', fill: '#900' });

    // powersupply sprite
    startPowerSupply = this.physics.add.sprite(150, 120, 'battery', 2).setScale(.4);

    // engine
    let engine = this.physics.add.staticGroup();
    engineOff = engine.create(500, 150, 'fixbattery').setFrame(0).setScale(.4).setSize(65,95).setOffset(50,75);

    // engine door
    this.physics.add.sprite(70, 12, 'doorBB').setScale(.15);
    door = this.physics.add.sprite(600, 12, 'doorBB').setScale(.15);

    items = this.physics.add.group();
    toolKit = platforms.create(700, 45, 'toolshelf').setFrame(0).setScale(.25).setSize(60,80).setOffset(100,100);

    //object tint timer
    timerr = this.time.addEvent({
    delay: 2500,
    callback: objTint,
    //args: [],
    // callbackScope: thisArg,
    loop: true
    });


    function gameNpc(){
        // console.log("!!!");
        inZone = true;
        //console.info("overlap");
        if(cursors.space.isDown){
            npc_text.setText(npc2.dialogue[1]);
            npc_text.setVisible(true);
            graphics.setVisible(true);
            console.log(npc1.dialogue[1]);
            this.physics.pause();
        }
    }

    function objTint(){
      if (boxGray){
        startPowerSupply.setTint();
        engine.setTint();
        door.setTint();
        toolKit.setTint();
        button1.setTint();
        button2.setTint();
        boxGray = false;
      }
      else{
        startPowerSupply.setTint(0x999999);
        engine.setTint(0x999999);
        door.setTint(0x999999);
        toolKit.setTint(0x999999);
        button1.setTint(0x999999);
        button2.setTint(0x999999);
        boxGray = true;
      }
    }


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
        key: 'openB',
        frames: this.anims.generateFrameNumbers('doorBB', { start: 0, end: 6 }),
        frameRate: 10,
        repeat: 0
    });
    this.anims.create({
        key: 'engineOn',
        frames: this.anims.generateFrameNumbers('powerSource', { start: 2, end: 2 }),
        frameRate: 4,
        repeat: 0
    });
    this.anims.create({
      key: 'tool',
      frames: this.anims.generateFrameNumbers('toolshelf', { start: 0, end: 1 }),
      frameRate: 4,
      repeat: 0
    });
    this.anims.create({
      key: 'fixed',
      frames: this.anims.generateFrameNumbers('fixbattery', { start: 0, end: 1 }),
      frameRate: 4,
      repeat: 0
    });
    // start pad animation
    // this.anims.create({
    //     key: 'fixed',
    //     frames: this.anims.generateFrameNumbers('powerPad', { start: 1, end: 0 }),
    //     frameRate: 4,
    //     repeat: 0
    // });

    cursors = this.input.keyboard.createCursorKeys();
    //door border
    let border_door = this.physics.add.sprite(600, 20);
    border_door.width = 32;
    border_door.height = 28;//(29, 26);

    let border_door1 = this.physics.add.sprite(70, 20);
    border_door1.width = 32;
    border_door1.height = 28;//(29, 26);
    //power source border
    let border_power = this.physics.add.sprite(500, 150);
    // border_power.width = 300;
    // border_power.height = 300;
    border_power.setSize(70,100);
    //border for maze door button
    let borderButton1 = this.physics.add.sprite(152, 400).setSize(30, 30);
    let borderButton2 = this.physics.add.sprite(788, 130).setSize(30, 30);
    //tool kit border
    let kitBorder = this.physics.add.sprite(700, 50).setSize(30, 30);

    // door open function
    function doorOpen(){
        if (door_open == false){
            doorSound.play();
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
        if ((cursors.space.isDown) && (toolKitFound) && (!powerOn)){
            engineOff.anims.play('fixed', true);
            console.log('yes');
            powerOn = true;
        }
        else if ((cursors.space.isDown) && (!toolKitFound)){
            graphics.setVisible(true);
            powerSupplyFixedText.setVisible(true);
            this.physics.pause();
        }
    }

    // start pad on
    //power source on
    function startPadOnFunc(){
        if(!startTouchPad){
        startPad.anims.play('engineOn', true);
            startTouchPad = true;
        }
        if (startDoor_open == false){
          //  platforms.create(350, 140, 'powerSource', 2);
            startPowerSupply.setVisible(false);
            platforms.remove(startDoor);
            startDoor.setVisible(false);
            startDoor = this.physics.add.sprite(104, 197, 'engine_door').setScale(.17);
            startDoor.anims.play('open', true);
            startDoor_open = true;
        }
    }

    function mazeDoorTimer(){
        if (cursors.space.isDown){
            console.log(this);
            platforms.remove(mazeDoor);
            mazeDoor.setVisible(false);
            mazeDoorOpen.setVisible(true);
            doorSound.play();
            mazeDoorOpen.anims.play('open', true);
            timer = this.time.delayedCall(8000, mazeDoorClose, null, this);
        }
    }

    function mazeDoorClose(){
        if (!buttonPush){
            platforms.add(mazeDoor);
            mazeDoor.setVisible(true);
            mazeDoorOpen.setVisible(false);
        }
    }

    function addToolKit(){
        if (cursors.space.isDown && !toolsAdded){
            player1.inventory.push(new Item("Tool Kit", "box", "You've found a tool kit!"));
            toolKit.anims.play('tool', true);
            toolKitFound = true;
            graphics.setVisible(true);
            toolBoxAcquiredText.setVisible(true);
            this.physics.pause();
            toolsAdded = true;
        }
    }

    function mazeDoorFinalOpen(){
        if (cursors.space.isDown && !buttonPush){
            platforms.remove(mazeDoor);
            mazeDoor.setVisible(false);
            mazeDoorOpen.setVisible(true);
            doorSound.play();
            mazeDoorOpen.anims.play('open', true);
            buttonPush = true;
        }
    }

    function exitRoom(){
        if ((cursors.space.isDown) && (powerOn)){
            doorSound.play();
            door.anims.play('openB', true);
            timer = this.time.delayedCall(1000, changeScene, null, this);
        }
        else if((cursors.space.isDown) && (!powerOn)){
            graphics.setVisible(true);
            doorFixedText.setVisible(true);
            this.physics.pause();
        }
    }

    function no(){
      if(cursors.space.isDown){
        notext.setVisible(true);
        graphics.setVisible(true);
        this.physics.pause();
      }
    }

    function changeScene(){
        this.scene.start('Scene3');
    }

    //make player
    player = this.physics.add.sprite(70, 60, 'character').setScale(.25);
    player.setSize(120, 250);
    player.setOffset(70, 220);

    // border npc
    let border = this.physics.add.sprite(240, 330).setSize(50, 115).setOffset(-5,0);
    //npc
    npc = this.physics.add.staticGroup();
    npc.create(250, 375, 'npc1').setScale(.25).setFrame(2);
    npcStatic = this.physics.add.staticSprite(240, 330).setSize(45, 60).setOffset(-2,50);
    npc.width = 32;
    npc.height = 32;

    startDoor = platforms.create(104, 197, 'engine_door').setScale(.185).setSize(75,34).setOffset(215,90);

    this.physics.add.collider(player, items);
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, door);
    this.physics.add.collider(player, engine);
    this.physics.add.collider(player, startPowerSupply);
    this.physics.add.collider(player, things)

    // powersupply is clipping through wall, collision not working?
    this.physics.add.collider(platforms, startPowerSupply);
    this.physics.add.overlap(player, border_door, exitRoom, null, this);
    this.physics.add.overlap(player, border_door1, no, null, this);
    this.physics.add.overlap(player, border_power, engineOn, null, this);
    this.physics.add.overlap(startPowerSupply, startPad, startPadOnFunc, null, this);
    this.physics.add.overlap(player, borderButton1, mazeDoorTimer, null, this);
    this.physics.add.overlap(player, borderButton2, mazeDoorFinalOpen, null, this);
    this.physics.add.overlap(player, kitBorder, addToolKit, null, this);
    this.physics.add.overlap(player, border, gameNpc, null, this);
    this.physics.add.collider(player, npcStatic);

}

// update
update(){
    // keep track of the sprite X and Y
    // spriteCoord.setText('Sprite X: ' + parseFloat(player.x).toFixed(2) + " Sprite Y: " + parseFloat(player.y).toFixed(2));


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

    if(cursors.shift.isDown){
        powerSupplyFixedText.setVisible(false);
        doorFixedText.setVisible(false);
        toolBoxAcquiredText.setVisible(false);
        notext.setVisible(false);
        npc_text.setVisible(false);
        graphics.setVisible(false);
        this.physics.resume();
    }

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
    // if (powerOn){
    //     power.setVelocityX(0);
    //     power.setVelocityY(0);
    // }
}
}
