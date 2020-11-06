var x = 0;
var y = 0;

// 9/27/2020
var items;
var inZone = false;
var npc;
var info;
var info2;
var info3;
var text1;
var npc_text;
var player1 = {name: "name1", inventory: []};
var npc1 = {name: "npc1", dialogue: {1: "Can you find my box?\nI'll give you a key out.", 2: 'Thank you! Take this key.'}};

// Test npc
var theTestNPC;
var test_npc = {name: "test_npc", dialogue: {1: "We've been hit! We're going down \nwe need to fix the ship before we crash.", }};
var test_npcStatic;

var graphics;
var box;
var door;
var doorOpen = false;
var timer;
var timerr;
var haveKey = false;
var keyText;
var npcStatic;
// coordinates
var sprite_x;
var sprite_y;
var spriteCoord;
var boxGray = false;

// items
var box_added = false;

// sound
var bgm;
var musicStarted = false;
var doorSound;


class Scene1 extends Phaser.Scene {
    constructor()
    {
        super('Scene1');


    }
preload(){
    this.load.spritesheet('character', 'sprite/char2.png', {frameWidth: 239, frameHeight: 500});
    player1.sprite_sheet = 'character';
    //this.load.spritesheet('right', 'Free/Main Characters/Ninja Frog/Run (32x32).png', {frameWidth: 32, frameHeight: 32});
    //this.load.spritesheet('left', 'Free/Main Characters/Ninja Frog/RunL (32x32).png', {frameWidth: 32, frameHeight: 32});
    // this.load.spritesheet('up', 'Free/Main Characters/Ninja Frog/Idle.png', {frameWidth: 32, frameHeight: 32});
    // this.load.spritesheet('down', 'Free/Main Characters/Ninja Frog/Idle.png', {frameWidth: 32, frameHeight: 32});
    this.load.image('background', 'sprite/bbackground.png');
    this.load.image('beds', 'sprite/beds.png');
    this.load.image('wall', 'Interior/Wall.png');
    //this.load.image('bbackground', 'sprite/bbackground.png');
    this.load.image('sideWall', 'Interior/SideWall.png');
    this.load.spritesheet('door', 'sprite/doorr1.png', {frameWidth: 195, frameHeight: 480});
    this.load.spritesheet('doorB', 'sprite/doorr.png',  {frameWidth: 225, frameHeight: 480});
    this.load.spritesheet('doorBB', 'sprite/door.png', {frameWidth: 500, frameHeight: 225});
    // add item image
    // 28 X 24
    this.load.image('box', 'Free/Items/Boxes/Box1/Idle.png')

    // add the npc
    this.load.spritesheet('npc1', 'sprite/npc1.png', {frameWidth: 275, frameHeight: 550});

    // level 2 assets
    this.load.image('engine_room', 'engine_interior.png');
    this.load.spritesheet('engine_door', 'sprite/dooru.png', {frameWidth: 500, frameHeight: 195});
    this.load.spritesheet('powerSource', 'sprite/powersource.png', {frameWidth: 185, frameHeight: 280});
    this.load.spritesheet('fixbattery', 'sprite/fixbattery.png', {frameWidth: 170, frameHeight: 255});
    this.load.image('battery', 'sprite/battery.png');
    this.load.image('backwall', 'BackWall.png');
    this.load.image('button', 'Free/Menu/Buttons/Achievements.png');

    // level 3 assets
    this.load.spritesheet('doorL', 'sprite/doorl1.png', {frameWidth: 195, frameHeight: 480});
    this.load.spritesheet('doorD', 'sprite/doord.png', {frameWidth: 500, frameHeight: 195});

    // load sounds
    this.load.audio('bgm', 'Sounds/darren-curtis-intruder-aboard.mp3');
    this.load.audio('doorSound', 'Sounds/door.mp3');
}

create(){
    //create event timer

    // sound
    bgm = this.sound.add('bgm');
    doorSound = this.sound.add('doorSound');

    let platforms = this.physics.add.staticGroup();
    //Make background
    y = 30
    while (y != 600){
        for (x = 30; x < 850; x += 30){
            this.add.image(x, y, 'floor');
        }
        y += 30
    }
    for (y = 15; y < 700; y += 15){
        platforms.create(45, y, 'sideWall');
    }
    for (y = 15; y < 700; y += 15){
        platforms.create(755, y, 'sideWall');
    }
    for (x = 0; x < 800; x += 15){
        platforms.create(x, 600, 'sideWall');
    }
    for (x = 23; x < 830; x += 46){
        platforms.create(x, 0, 'wall').setScale(1).refreshBody();
    }
    this.add.image(400,300,'background').setScale(.37 );
    this.add.image(400,300,'beds').setScale(.37);
    // door = platforms.create(780, 275, 'door').setScale(.15);
    door = this.physics.add.sprite(775, 275, 'doorB').setScale(.25);

    //Game Text
    graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(0, 500, 850, 500).setVisible(false);
    text1 = this.add.text(50, 545, 'You picked up the box!', { fontSize: '32px', fill: '#999' }).setVisible(false);
    info = this.add.text(50, 505, 'Spacebar to interact', { fontSize: '32px', fill: '#999' }).setVisible(false);
    info3 = this.add.text(50, 525, 'Arrow Keys to move', { fontSize: '32px', fill: '#999' }).setVisible(false);
    info2 = this.add.text(50, 545, 'Shift to end message', { fontSize: '32px', fill: '#999' }).setVisible(false);
    keyText = this.add.text(50, 545, 'I need a key.', { fontSize: '32px', fill: '#999' }).setVisible(false);

    //Make Character

    npc_text = this.add.text(50, 530, 'Hello there! Welcome to the tutorial!', { fontSize: '28px', fill: '#999' }).setVisible(false);
    player = this.physics.add.sprite(300, 150, 'character').setScale(.25);
    player.setSize(120, 250);
    player.setOffset(70, 220);

    //container
    var container = this.add.container();
    container.add(player);

    // show the Spirtes X and Y coord
    // spriteCoord = this.add.text(50, 50, 'The sprites X and Y: ', { fontSize: '18px', fill: '#900' });

    // border sprite
    let border_sprite = this.physics.add.sprite(300, 300).setSize(32, 32);

    // border npc
    let border = this.physics.add.sprite(200, 150).setSize(50, 115).setOffset(-5,0);


    // border for test npc
    let border_testNPC = this.physics.add.sprite(500, 150).setSize(50, 115).setOffset(-5,0);

    // border door
    let border_door = this.physics.add.sprite(750, 275);
    border.width = 36;
    border.height = 36;

    //animations
    this.anims.create({
        key: 'Idle',
        frames: this.anims.generateFrameNumbers('character', {start:6, end: 6}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('character', { start: 3, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('character', { start: 9, end: 11 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('character', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('character', { start: 6, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'open2',
        frames: this.anims.generateFrameNumbers('doorB', { start: 0, end: 6 }),
        frameRate: 10,
        repeat: 0
    });
    cursors = this.input.keyboard.createCursorKeys();
    var isSpaceDown = cursors.space.isDown;
    this.physics.add.collider(player, platforms);


    // make npc 1
    npc = this.physics.add.staticGroup();
    npc.create(200, 190, 'npc1').setScale(.25).setFrame(0);
    npcStatic = this.physics.add.staticSprite(200, 150).setSize(45, 110).setOffset(-2,2);
    npc.width = 32;
    npc.height = 32;

    // test npc
    theTestNPC = this.physics.add.staticGroup();
    theTestNPC.create(510, 190, 'npc1').setScale(.25).setFrame(1);
    test_npcStatic = this.physics.add.staticSprite(500, 150).setSize(45, 110).setOffset(-2,2);
    theTestNPC.width = 32;
    theTestNPC.height = 32;

    //Make item
    // Player collision causes item to become white
    // Spacebar starts item interaction
    items = this.physics.add.staticGroup();

    box = items.create(300, 300, 'box');
    items.create(165, 75, 'box').setVisible(false).setScale(5).refreshBody();
    items.create(415, 75, 'box').setVisible(false).setScale(5).refreshBody();
    items.create(650, 75, 'box').setVisible(false).setScale(5).refreshBody();
    items.create(165, 405, 'box').setVisible(false).setScale(5).refreshBody();
    items.create(415, 405, 'box').setVisible(false).setScale(5).refreshBody();
    items.create(650, 410, 'box').setVisible(false).setScale(5).refreshBody();

//    this.physics.add.collider(player, items);
    // items.setTint(0xff0000)
    this.physics.add.overlap(player, border_sprite, gameItem, null, this);
    this.physics.add.overlap(player, border, gameNpc, null, this);
    this.physics.add.overlap(player, border_door, gameDoor, null, this);

    // test NPC
    this.physics.add.overlap(player, border_testNPC, testNPC, null, this);

    //Tutorial Text function
    timer = this.time.delayedCall(2500, tutorialText, null, this);
    function tutorialText(){
        info.setVisible(true);
        info2.setVisible(true);
        info3.setVisible(true);
        graphics.setVisible(true);
        this.physics.pause();
    }

    this.cameras.main.shake(2000);
    //object tint timer
    timerr = this.time.addEvent({
    delay: 2500,
    callback: objTint,
    //args: [],
    // callbackScope: thisArg,
    loop: true
    });

    function objTint(){
      if (boxGray){
        box.setTint();
        door.setTint();
        boxGray = false;
      }
      else{
        box.setTint(0x999999);
        door.setTint(0x999999);
        boxGray = true;
      }
    }

    // function to overlap item
    function gameItem(){
        inZone = true;
        // items.setTint(0x777777);
        // console.info("overlap");
        if(cursors.space.isDown){
            text1.setVisible(true);
            graphics.setVisible(true);
            if(!box_added){
              player1.inventory.push(new Item("box", "box", text1));
              console.info(player1.inventory);
              box_added = true;
              items.remove(box);
              box.setVisible(false);


            }
            this.physics.pause();
        }
    }

    // NPC function
    function gameNpc(){
        // console.log("!!!");
        inZone = true;
        //console.info("overlap");
        if(cursors.space.isDown){
            if(box_added){
                npc_text.setText(npc1.dialogue[2]);
                npc_text.setVisible(true);
                graphics.setVisible(true);
                console.log(npc1.dialogue[1]);
                haveKey = true;
            }
            else{
                npc_text.setText(npc1.dialogue[1]);
                npc_text.setVisible(true);
                graphics.setVisible(true);
            }
            this.physics.pause();
        }
    }

    // test_npc function
    function testNPC(){
        //console.log(test_npc);
        if(cursors.space.isDown){
            //console.log(test_npc.dialogue[1]);
                npc_text.setText(test_npc.dialogue[1]);
                npc_text.setVisible(true);
                graphics.setVisible(true);
//                console.log(test_npc.dialogue[1]);
                this.physics.pause();
            }
        }
    //door function
    function gameDoor(){
        if (cursors.space.isDown){
            if(haveKey){
                if(cursors.space.isDown){
                    console.log('space');
                    doorSound.play();
                    door.anims.play('open2', true);
                    timer = this.time.delayedCall(1000, changeScene, null, this);
                }
        }
            else{
                graphics.setVisible(true);
                keyText.setVisible(true);
                this.physics.pause();
    }
}
}

    function changeScene(){
        //
        this.scene.start('Scene2');
    }


    // player collides w/item
    this.physics.add.collider(player, items);
    this.physics.add.collider(player, npcStatic);

    // test npc collider
    this.physics.add.collider(player, test_npcStatic);

    // resume music
    bgm.resume();
}

// update function
update(){
    //bgm.play();
    // keep track of the sprite X and Y
    // spriteCoord.setText('Sprite X: ' + parseFloat(player.x).toFixed(2) + " Sprite Y: " + parseFloat(player.y).toFixed(2));


    player.setVelocityX(0);
    player.setVelocityY(0);

    // resumes game after text is read
    if(cursors.shift.isDown){
        // start the music
        if(musicStarted == false){
            bgm.resume();
            bgm.play();
            bgm.setLoop(true)
            musicStarted = true;
        }
            text1.setVisible(false);
            info.setVisible(false);
            info2.setVisible(false);
            info3.setVisible(false);
            npc_text.setVisible(false);
            graphics.setVisible(false);
            keyText.setVisible(false);
            this.physics.resume();
    }

    inZone = false;

//    items.setVelocityX(0);
//    items.setVelocityY(0);

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
            player.anims.play('up', true);
        }
    else if (cursors.down.isDown){
        player.setVelocityY(360);
        player.anims.play('down', true);
    }
    else{
      player.anims.play('Idle',true);
    }
}
}


//// function for item collision
//function getItem(){
//    console.info("hello");
//    //items.tint = "rgba(255, 255, 255)"; //(0xffffff);
//    items.setTint(0xffffff);
//
//}
