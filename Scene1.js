var x = 0;
var y = 0;

// 9/27/2020
var items;
var inZone = false;
var npc;
var info;
var info2;
var text1;
var npc_text;
var player1 = {name: "name1", inventory: []};
var npc1 = {name: "npc1", dialogue: {1: 'Can you find my box?', 2: 'Thank you!'}};
var graphics;
var box;
var door;
var doorOpen = false;
var timer;
// coordinates
var sprite_x;
var sprite_y;
var spriteCoord;


// items
var box_added = false;

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
    this.load.image('background', 'sprite/bedroom.png');
    this.load.image('wall', 'Interior/Wall.png');
    this.load.image('bbackground', 'sprite/bbackground.png');
    this.load.image('sideWall', 'Interior/SideWall.png');
    this.load.spritesheet('door', 'sprite/doorr.png', {frameWidth: 225, frameHeight: 480});
    // add item image
    // 28 X 24
    this.load.image('box', 'Free/Items/Boxes/Box1/Idle.png')

    // add the npc
    this.load.image('npc1', 'sprite/npcidle.png');

    // level 2 assets
    this.load.image('engine_room', 'engine_interior.png');
    this.load.spritesheet('engine_door', 'sprite/door.png', {frameWidth: 500, frameHeight: 225});
    this.load.spritesheet('powerSource', 'sprite/powersource.png', {frameWidth: 185, frameHeight: 280});
    this.load.spritesheet('fixbattery', 'sprite/fixbattery.png', {frameWidth: 165, frameHeight: 255});
    this.load.image('battery', 'sprite/battery.png');
    this.load.image('backwall', 'BackWall.png');
    this.load.image('button', 'Free/Menu/Buttons/Achievements.png');

}

create(){
    //create event timer


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
    this.add.image(400,300,'background').setScale(.37 );
    // door = platforms.create(780, 275, 'door').setScale(.15);
    door = this.physics.add.sprite(775, 275, 'door').setScale(.25);

    //Game Text
    graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(25, 525, 750, 500).setVisible(false);
    text1 = this.add.text(50, 545, 'You picked up the box!', { fontSize: '32px', fill: '#999' }).setVisible(false);
    info = this.add.text(350, 60, 'Spacebar to interact', { fontSize: '32px', fill: '#900' });
    info2 = this.add.text(350, 90, 'Shift to end message', { fontSize: '32px', fill: '#900' });

    //Make Character

    npc_text = this.add.text(50, 545, 'Hello there! Welcome to the tutorial!', { fontSize: '32px', fill: '#999' }).setVisible(false);
    player = this.physics.add.sprite(300, 150, 'character').setScale(.25);
    player.setSize(120, 250);
    player.setOffset(70, 220);
    
    // show the Spirtes X and Y coord
    spriteCoord = this.add.text(50, 50, 'The sprites X and Y: ', { fontSize: '18px', fill: '#900' });

    // border sprite
    let border_sprite = this.physics.add.sprite(300, 300);
    border_sprite.width = 32;
    border_sprite.height = 28;//(29, 26);

    // border npc
    let border = this.physics.add.sprite(200, 150);
    border.width = 36;
    border.height = 36;//(29, 26);

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
        frames: this.anims.generateFrameNumbers('door', { start: 0, end: 6 }),
        frameRate: 10,
        repeat: 0
    });
    cursors = this.input.keyboard.createCursorKeys();
    var isSpaceDown = cursors.space.isDown;
    this.physics.add.collider(player, platforms);


    // make npc 1
    npc = this.physics.add.staticGroup();
    npc.create(200, 150, 'npc1').setScale(.25);
    npc.width = 32;
    npc.height = 32;

    //Make item
    // Player collision causes item to become white
    // Spacebar starts item interaction
    items = this.physics.add.staticGroup();

    box = items.create(300, 300, 'box');

//    this.physics.add.collider(player, items);
    items.setTint(0xff0000)
    this.physics.add.overlap(player, border_sprite, gameItem, null, this);
    this.physics.add.overlap(player, border, gameNpc, null, this);
    this.physics.add.overlap(player, border_door, gameDoor, null, this);

    // function to overlap item

    function gameItem(){
        inZone = true;
        items.setTint(0x777777);
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
            }
            else{
                npc_text.setText(npc1.dialogue[1]);
                npc_text.setVisible(true);
                graphics.setVisible(true);
            }
            this.physics.pause();
        }
    }
    //door function
    function gameDoor(){
        console.log('123');
        // door = this.physics.add.sprite(780, 275, 'door').setScale(.15);
        if(cursors.space.isDown){
            console.log('space');
            door.anims.play('open2', true);
            timer = this.time.delayedCall(1000, changeScene, null, this);

    }
}
    function changeScene(){
        // 
        this.scene.start('Scene3');
    }


    // player collides w/item
    this.physics.add.collider(player, items);
    this.physics.add.collider(player, npc);
}


// update function
update(){
    // keep track of the sprite X and Y
    spriteCoord.setText('Sprite X: ' + parseFloat(player.x).toFixed(2) + " Sprite Y: " + parseFloat(player.y).toFixed(2));
    
    
    player.setVelocityX(0);
    player.setVelocityY(0);

    // resumes game after text is read
    if(cursors.shift.isDown){
            text1.setVisible(false);
            npc_text.setVisible(false);
            graphics.setVisible(false);
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
