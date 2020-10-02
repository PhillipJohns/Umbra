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

// items
var box_added = false;

class Scene1 extends Phaser.Scene {
    constructor()
    {
        super('Scene1');


    }
preload(){
    this.load.spritesheet('character', 'Free/Main Characters/Ninja Frog/Idle (32x32).png', {frameWidth: 32, frameHeight: 32});
    player1.sprite_sheet = 'character';
    this.load.spritesheet('right', 'Free/Main Characters/Ninja Frog/Run (32x32).png', {frameWidth: 32, frameHeight: 32});
    this.load.spritesheet('left', 'Free/Main Characters/Ninja Frog/RunL (32x32).png', {frameWidth: 32, frameHeight: 32});
    // this.load.spritesheet('up', 'Free/Main Characters/Ninja Frog/Idle.png', {frameWidth: 32, frameHeight: 32});
    // this.load.spritesheet('down', 'Free/Main Characters/Ninja Frog/Idle.png', {frameWidth: 32, frameHeight: 32});
    this.load.image('wall', 'Interior/Wall.png');
    this.load.image('floor', 'Interior/Floor.png');
    this.load.image('sideWall', 'Interior/SideWall.png');
    this.load.image('door', 'Free/Background/Pink.png');
    // add item image
    // 28 X 24
    this.load.image('box', 'Free/Items/Boxes/Box1/Idle.png')

    // add the npc
    this.load.image('npc1', 'Scifi Character/jump.png');

}

create(){

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
    this.add.image(800, 200, 'door');
    //Game Text
    graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(25, 525, 750, 500).setVisible(false);
    text1 = this.add.text(50, 545, 'You picked up the box!', { fontSize: '32px', fill: '#999' }).setVisible(false);
    info = this.add.text(350, 60, 'Spacebar to interact', { fontSize: '32px', fill: '#900' });
    info2 = this.add.text(350, 90, 'Shift to end message', { fontSize: '32px', fill: '#900' });

    //Make Character

    npc_text = this.add.text(50, 545, 'Hello there! Welcome to the tutorial!', { fontSize: '32px', fill: '#999' }).setVisible(false);
    player = this.physics.add.sprite(100, 450, 'character');

    // border sprite
    let border_sprite = this.physics.add.sprite(300, 300);
    border_sprite.width = 32;
    border_sprite.height = 28;//(29, 26);

    // border npc
    let border = this.physics.add.sprite(200, 450);
    border.width = 36;
    border.height = 36;//(29, 26);

    // border door
    let border_door = this.physics.add.sprite(750, 200);
    border.width = 36;
    border.height = 36;

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
    // this.anims.create({
    //     key: 'up',
    //     frames: this.anims.generateFrameNumbers('up', { start: 0, end: 3 }),
    //     frameRate: 10,
    //     repeat: -1
    // });
    // this.anims.create({
    //     key: 'down',
    //     frames: this.anims.generateFrameNumbers('down', { start: 0, end: 3 }),
    //     frameRate: 10,
    //     repeat: -1
    // });
    cursors = this.input.keyboard.createCursorKeys();
    var isSpaceDown = cursors.space.isDown;
    this.physics.add.collider(player, platforms);


    // make npc 1
    npc = this.physics.add.staticGroup();
    npc.create(200, 450, 'npc1');
    npc.width = 32;
    npc.height = 32;

    //Make item
    // Player collision causes item to become white
    // Spacebar starts item interaction
    items = this.physics.add.staticGroup();

    items.create(300, 300, 'box');

//    this.physics.add.collider(player, items);
    items.setTint(0xff0000)
    this.physics.add.overlap(player, border_sprite, gameItem, null, this);
    this.physics.add.overlap(player, border, gameNpc, null, this);
    this.physics.add.overlap(player, border_door, gameDoor, null, this);

    // function to overlap item

    // BUG = BOX is still there, even if invisible
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
              items.setVisible(false);

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
        if(cursors.space.isDown){
            console.log('space');
            this.scene.start('Scene2');
    }
}


    // player collides w/item
    this.physics.add.collider(player, items);
    this.physics.add.collider(player, npc);
}


// update function
update(){
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


//// function for item collision
//function getItem(){
//    console.info("hello");
//    //items.tint = "rgba(255, 255, 255)"; //(0xffffff);
//    items.setTint(0xffffff);
//
//}
