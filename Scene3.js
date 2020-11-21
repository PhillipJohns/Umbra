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

// player UI vars
var scoreText;
var toolBoxCount = 0;

// timer
// var timer;

// coordinates
var sprite_x;
var sprite_y;
var spriteCoord;

//Power supplies
var batteries;
var battery1;
var battery2;
var powerPad1;
var powerPad2;
var brokenBattery1;
var brokenBattery2;
var repairKit1;
var repairKit2;
var powerPads
var container;
var cabinets;
var wire;

//Bools
var repairKit1Found = false;
var repairKit2Found = false;
var battery1Touch = false;
var battery2Touch = false;
var powerPad1On = false;
var powerPad2On = false;
var battery1On = false;
var battery2On = false;
var boxGray = false;
var movepad = false;

//Mini Map
var minimap;

//sounds
var doorSound;

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
var finaldoor = false;
var border_door;

//Buttons
var room1Button;
var room2Button;
var room5Button;
var room5Buttonb;

//text
var repairKitText;
var terminalText1;
var terminalText2;
var correctCodeText;
var incorrectCodeText;
var powerDownText;
var notext;

// Scene3 NPCs
var scene3Npc1;
var scene3Npc1Obj = {name: "scene3Npc1Obj", dialogue: {1: "We need to get the terminal running! \nWe can't escape without it.", }};
var scene3Npc1Static;

//coded door array
var doorCode = [];
var codeDoorOpen = false;

// player
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

    //Create text early to define it
    repairKitText = this.add.text(player.x - 400, player.y + 150, 'You picked up the toolbox!', { fontSize: '32px', fill: '#999' }).setVisible(false);
    terminalText1 = this.add.text(player.x - 400, player.y + 150, 'The power in down in this room.', { fontSize: '30px', fill: '#999' }).setVisible(false);
    terminalText2 = this.add.text(player.x - 400, player.y + 150, 'I need to get the power up so I can escape!', { fontSize: '30px', fill: '#999' }).setVisible(false);
    powerDownText = this.add.text(player.x - 400, player.y + 150, 'The Power is down I need to get it working!', { fontSize: '30px', fill: '#999' }).setVisible(false);
    notext = this.add.text(player.x - 400, player.y + 150, 'The door is locked.', { fontSize: '30px', fill: '#999' }).setVisible(false);

    let platforms = this.physics.add.staticGroup();
    // background
    // bg = this.add.image(0, 0, 'background').setScale(6);
    const maze = this.make.tilemap({ key: "maze" });
    const tileset = maze.addTilesetImage("tileset", "tiles");
    const worldLayer = maze.createStaticLayer('Tile Layer 1', tileset, 0, 0);
    worldLayer.setCollisionByProperty({ Collision: true });

    //container
    container = this.add.container();
    container.add(player);

    //wire shelves
    wire = this.physics.add.staticGroup();
    //bottom left room
    for (y = 2425; y < 2650; y += 70){
        wire.create(285, y, 'toolshelf', 1).setScale(.30).setSize(73,75).setOffset(115,130);
    }
    for (y = 2425; y < 2650; y += 70){
        wire.create(648, y, 'toolshelf', 1).setScale(.30).setSize(73,75).setOffset(115,130);
    }
    for (y = 2599; y < 2740; y += 70){
        wire.create(465, y, 'toolshelf', 1).setScale(.30).setSize(73,75).setOffset(115,130);
    }
    // upper left room
    for (x = 584; x < 1200; x += 73){
        wire.create(x, 80, 'toolshelf', 1).setScale(.30).setSize(73,75).setOffset(115,130);
    }
    for (x = 584; x < 815; x += 83){
        wire.create(x, 300, 'toolshelf', 1).setScale(.30).setSize(73,75).setOffset(115,130);
    }
    for (x = 980; x < 1170; x += 86){
        wire.create(x, 300, 'toolshelf', 1).setScale(.30).setSize(73,75).setOffset(115,130);
    }

    //cabinet maze in bottom room
    cabinets = this.physics.add.staticGroup();
    for (x = 900; x < 1370; x += 85){
        cabinets.create(x, 2800, 'cabinet').setScale(.30).setSize(105,30).setOffset(130,195);
    }
    for (x = 990; x < 1370; x += 85){
        cabinets.create(x, 2975, 'cabinet').setScale(.30).setSize(90,90).setOffset(140,135);
    }
    for (x = 930; x < 1475; x += 85){
        cabinets.create(x, 3150, 'cabinet').setScale(.30).setSize(90,90).setOffset(140,135);
    }
    for (x = 1560; x < 2170; x += 85){
        cabinets.create(x, 2800, 'cabinet').setScale(.30).setSize(105,30).setOffset(130,195);
    }
    for (x = 1575; x < 2085; x += 85){
        cabinets.create(x, 2970, 'cabinet').setScale(.30).setSize(90,90).setOffset(140,135);
    }
    for (x = 1592; x < 2170; x += 85){
        cabinets.create(x, 3050, 'cabinet').setScale(.30).setSize(90,90).setOffset(140,135);
    }
    cabinets.create(1410, 3005, 'cabinet').setScale(.30).setSize(90,90).setOffset(140,135);


    //sounds
    doorSound = this.sound.add('doorSound');

    // show the Spirtes X and Y coord
    // spriteCoord = this.add.text(50, 50, 'The sprites X and Y: ', { fontSize: '18px', fill: '#900' });

     //Door buttons
     let button1 = this.add.image(2336, 2480, 'button');
     let borderButton1 = this.physics.add.sprite(2336, 2480).setSize(40, 40);

     // door button 1b
     let button2 = this.add.image(3280, 2480, 'button');
     let borderButton1b = this.physics.add.sprite(3280, 2480).setSize(40, 40);

     // door buttons room 2
     // tiled coordinates = (1632, 2560)
     // added 16 px to Y
     let button3 = this.add.image(1632, 2576, 'button');
     let borderButton2 = this.physics.add.sprite(1632, 2576).setSize(40, 40);

     // button 2b
     let button4 = this.add.image(2224, 3088, 'button');
     let borderButton2b = this.physics.add.sprite(2224, 3088).setSize(40, 40);

     // button 2c
     let button5 = this.add.image(848, 2480, 'button');
     let borderButton2c = this.physics.add.sprite(848, 2480).setSize(40, 40);

     // door buttons room 3
     // tiled coordinates = (1152, 1888)
     // added 16 px to Y
     // added 16 px to X
     let button6 = this.add.image(1040, 2000, 'button');
     let borderButton3 = this.physics.add.sprite(1040, 2000).setSize(40, 40);

     // door buttons room 3b
     // tiled coordinates = (1696, 2208)
     // added 16 px to Y
     // added 16 px to X
     let button7 = this.add.image(1712, 2224, 'button');
     let borderButton3b = this.physics.add.sprite(1712, 2224).setSize(40, 40);

     //Button 4
     let button8 = this.add.image(2704, 1584, 'button');
     let borderButton4 = this.physics.add.sprite(2704, 1584).setSize(40, 40);

     //Button 4b
     let button9 =this.add.image(2736, 2288, 'button');
     let borderButton4b = this.physics.add.sprite(2736, 2288).setSize(40, 40);

     //Button 5
     let button10 = this.add.image(656, 496, 'button');
     let borderButton5 = this.physics.add.sprite(656, 496).setSize(40, 40);

     //Button 5b
     // this.add.image(1712, 1040, 'button');
     // let borderButton5b = this.physics.add.sprite(1712, 1040).setSize(40, 40);

     //Button 6
     // this.add.image(1936, 1040, 'button');
     // let borderButton6 = this.physics.add.sprite(1936, 1040).setSize(40, 40);

     //Button 6b
     let button11 = this.add.image(3280, 656, 'button');
     let borderButton6b = this.physics.add.sprite(3280, 656).setSize(40, 40);

     //Button 6c
     let button12 = this.add.image(754, 1520, 'button');
     let borderButton6c = this.physics.add.sprite(754, 1520).setSize(40, 40);

     //Button 7
     let button13 = this.add.image(3920, 144, 'button');
     let borderButton7 = this.physics.add.sprite(3920, 144).setSize(40, 40);

     //Button 7b
     let button14 = this.add.image(3472, 336, 'button');
     let borderButton7b = this.physics.add.sprite(3472, 336).setSize(40, 40);

     //Coded buttons
     let code1Button = this.add.image(1264, 496, 'code1');
     let code1 = this.physics.add.sprite(1264, 496).setSize(40, 40);
     let code2Button =this.add.image(1328, 496, 'code2');
     let code2 = this.physics.add.sprite(1328, 496).setSize(40, 40);
     let code3Button =this.add.image(1392, 496, 'code3');
     let code3 = this.physics.add.sprite(1392, 496).setSize(40, 40);
     let code4Button =this.add.image(1456, 496, 'code4');
     let code4 = this.physics.add.sprite(1456, 496).setSize(40, 40);

     //move pad arrows
     let arrowrs = this.physics.add.staticGroup();
     let rarrow = arrowrs.create(1410, 3080, 'rarrow');
     let rarrow1 = arrowrs.create(1515, 2880, 'rarrow').setSize(50, 1).setOffset(0,25);

     let arrowus = this.physics.add.staticGroup();
     let uarrow = arrowus.create(1515, 3030, 'uarrow');

     //stop movepads
     let stops = this.physics.add.staticGroup();
     let stop = stops.create(1515, 3080, 'stop').setSize(1, 50).setOffset(53, 0);

     //list of arrows
     let Rarrows = [rarrow];
     let Uarrows = [uarrow];
     let Darrows = [];
     let Larrows = [];
     let Stop = [stop];

    //power supply generation
    batteries = this.physics.add.group();
    battery1 = batteries.create(3904, 1920, 'battery').setScale(.4);
    battery2 = batteries.create(1000, 3045, 'battery').setScale(.4).setSize(130, 80).setOffset(15,155);
    powerPads = this.physics.add.staticGroup();
    powerPad1 = powerPads.create(2688, 2528, 'powerSource').setScale(.4).setSize(74,112).setOffset(60,80);
    powerPad2 = powerPads.create(2150, 2860, 'powerSource').setScale(.4).setSize(74,90).setOffset(60,80);
    brokenBattery1 = platforms.create(128, 2496, 'fixbattery', 0).setScale(.4).setSize(65,95).setOffset(50,75);
    let brokenBattery1Border = this.physics.add.sprite(128, 2496).setSize(70, 100);
    brokenBattery2 = platforms.create(3008, 832, 'fixbattery', 0).setScale(.4).setSize(65,95).setOffset(50,75);
    let brokenBattery2Border = this.physics.add.sprite(3008, 832).setSize(70, 100);
    repairKit1 = platforms.create(3104, 1664, 'box');
    let repairKit1Border = this.physics.add.sprite(3104, 1664).setSize(40, 40);
    repairKit2 = platforms.create(1150, 180, 'toolbox').setScale(.35).setSize(40,40).setOffset(70,80);
    let repairKit2Border = this.physics.add.sprite(1150, 180).setSize(43, 43);

    //Command Terminal (Tells player how to get out of maze)
    let terminalBorder = this.physics.add.sprite(2525, 2640).setSize(80, 80);
    let terminal = platforms.create(2525, 2640, 'terminal');

    function commandTerminal(){
        if (cursors.space.isDown){
            graphics = this.add.graphics();
            graphics.fillStyle(0x000000, 1);
            graphics.fillRect(player.x - 400, player.y + 100, 800, 500).setVisible(true);
            if (!powerPad1On){
                terminalText1 = this.add.text(player.x - 400, player.y + 150, 'The power is down in this room. \nI need to get the power up so I can escape!', { fontSize: '30px', fill: '#999' }).setVisible(true);
                this.physics.pause();
            }
            else{
                terminalText2 = this.add.text(player.x - 400, player.y + 150, 'Escape pod room code is 2413', { fontSize: '30px', fill: '#999' }).setVisible(true);
                this.physics.pause();
            }
        }
    }

    //Add battery to power pad
    function addBattery1() {
        if(!battery1Touch){
            powerPad1.anims.play('engineOn', true);
            battery1Touch = true;
            battery1.setVisible(false);
            batteries.remove(battery1);
            powerPad1On = true;
                scoreText.setText('Toolkits aquired: ' + toolBoxCount);
            }
    }
    function addBattery2() {
        if(!battery2Touch){
            powerPad2.anims.play('engineOn', true);
            battery2Touch = true;
            battery2.setVisible(false);
            batteries.remove(battery2);
            powerPad2On = true;
                scoreText.setText('Toolkits aquired: ' + toolBoxCount);
            }
    }
    //add repair Kit
    function addRepairKit1() {
        if(!repairKit1Found){
            if (cursors.space.isDown){
                repairKit1Found = true;
                platforms.remove(repairKit1);
                repairKit1.setVisible(false);
                graphics = this.add.graphics();
                graphics.fillStyle(0x000000, 1);
                graphics.fillRect(player.x - 400, player.y + 100, 800, 500).setVisible(true);
                repairKitText = this.add.text(player.x - 400, player.y + 150, 'You picked up the toolbox!', { fontSize: '32px', fill: '#999' }).setVisible(true);
                this.physics.pause();
                toolBoxCount+=1;
                scoreText.setText('Toolkits aquired: ' + toolBoxCount);
            }
        }
    }
    function addRepairKit2() {
        if(!repairKit2Found){
            if (cursors.space.isDown){
                repairKit2Found = true;
                platforms.remove(repairKit2);
                repairKit2.setVisible(false);
                graphics = this.add.graphics();
                graphics.fillStyle(0x000000, 1);
                graphics.fillRect(player.x - 400, player.y + 100, 800, 500).setVisible(true);
                repairKitText = this.add.text(player.x - 400, player.y + 150, 'You picked up the toolbox!', { fontSize: '32px', fill: '#999' }).setVisible(true);
                this.physics.pause();
                toolBoxCount+=1;
                scoreText.setText('Toolkits aquired: ' + toolBoxCount);
            }
        }
    }
    //Fix Batteries
    function fixBattery1(){
        if (cursors.space.isDown){
            console.log('Fix Battery')
            if (repairKit1Found){
                brokenBattery1.setFrame(1);
                repairKit1Found = false
                battery1On = true;
                toolBoxCount-=1;
                scoreText.setText('Toolkits aquired: ' + toolBoxCount);

            }
            else if(repairKit2Found){
                brokenBattery1.setFrame(1);
                repairKit2Found = false
                battery1On = true;
                toolBoxCount-=1;
                scoreText.setText('Toolkits aquired: ' + toolBoxCount);
            }
    }
}
    function fixBattery2(){
        if (cursors.space.isDown){
            if (repairKit1Found){
                brokenBattery2.setFrame(1);
                repairKit1Found = false
                battery2On = true;
                toolBoxCount-=1;
                scoreText.setText('Toolkits aquired: ' + toolBoxCount);
            }
            else if(repairKit2Found){
                brokenBattery2.setFrame(1);
                repairKit2Found = false
                battery2On = true;
                toolBoxCount-=1;
                scoreText.setText('Toolkits aquired: ' + toolBoxCount);
            }
        }
    }

    //coded door
    correctCodeText = this.add.text(player.x - 400, player.y + 150, 'Correct!', { fontSize: '30px', fill: '#999' }).setVisible(false);
    incorrectCodeText = this.add.text(player.x - 400, player.y + 150, 'Incorrect code try again!', { fontSize: '30px', fill: '#999' }).setVisible(false);
    function codedDoor(num){
        if (powerPad1On){
            if (!codeDoorOpen){
                graphics = this.add.graphics();
                graphics.fillStyle(0x000000, 1);
                if (num == 2 && cursors.space.isDown && doorCode.includes(2) == false){
                    if (doorCode.length == 0){
                        doorCode.push(2);
                        graphics.fillRect(player.x - 400, player.y + 100, 800, 500).setVisible(true);
                        correctCodeText = this.add.text(player.x - 400, player.y + 150, 'Correct!', { fontSize: '30px', fill: '#999' }).setVisible(true);
                        this.physics.pause();
                    }
                    else{
                        doorCode = [];
                        graphics.fillRect(player.x - 400, player.y + 100, 800, 500).setVisible(true);
                        incorrectCodeText = this.add.text(player.x - 400, player.y + 150, 'Incorrect code try again!', { fontSize: '30px', fill: '#999' }).setVisible(true);
                        this.physics.pause();
                    }
                }
                if (num == 4 && cursors.space.isDown && doorCode.includes(4) == false){
                    if (doorCode[0] == 2 && doorCode.length == 1){
                        doorCode.push(4);
                        graphics.fillRect(player.x - 400, player.y + 100, 800, 500).setVisible(true);
                        correctCodeText = this.add.text(player.x - 400, player.y + 150, 'Correct!', { fontSize: '30px', fill: '#999' }).setVisible(true);
                        this.physics.pause();
                    }
                    else{
                        doorCode = [];
                        graphics.fillRect(player.x - 400, player.y + 100, 800, 500).setVisible(true);
                        incorrectCodeText = this.add.text(player.x - 400, player.y + 150, 'Incorrect code try again!', { fontSize: '30px', fill: '#999' }).setVisible(true);
                        this.physics.pause();
                    }
                }
                if (num == 1 && cursors.space.isDown && doorCode.includes(1) == false){
                    if (doorCode[0] == 2 && doorCode[1] == 4 && doorCode.length == 2){
                        doorCode.push(1);
                        graphics.fillRect(player.x - 400, player.y + 100, 800, 500).setVisible(true);
                        correctCodeText = this.add.text(player.x - 400, player.y + 150, 'Correct!', { fontSize: '30px', fill: '#999' }).setVisible(true);
                        this.physics.pause();
                }
                    else{
                        doorCode = [];
                        graphics.fillRect(player.x - 400, player.y + 100, 800, 500).setVisible(true);
                        incorrectCodeText = this.add.text(player.x - 400, player.y + 150, 'Incorrect code try again!', { fontSize: '30px', fill: '#999' }).setVisible(true);
                        this.physics.pause();
                    }
                }
                if (num == 3 && cursors.space.isDown && doorCode.includes(3) == false){
                    if (doorCode[0] == 2 && doorCode[1] == 4 && doorCode[2] == 1 && doorCode.length == 3){
                        doorCode.push(3);
                        graphics.fillRect(player.x - 400, player.y + 100, 800, 500).setVisible(true);
                        correctCodeText = this.add.text(player.x - 400, player.y + 150, 'Correct!', { fontSize: '30px', fill: '#999' }).setVisible(true);
                        this.physics.pause();
                        codeDoorOpen = true
                        door12.anims.play('openL', true);
                        platforms.remove(door12);
                        doorSound.play();
                }
                    else{
                        doorCode = [];
                        graphics.fillRect(player.x - 400, player.y + 100, 800, 500).setVisible(true);
                        incorrectCodeText = this.add.text(player.x - 400, player.y + 150, 'Incorrect code try again!', { fontSize: '30px', fill: '#999' }).setVisible(true);
                        this.physics.pause();
                    }
            }
            }
        }
        else{
            powerDownText = this.add.text(player.x - 400, player.y + 150, 'The Power is down I need to get it working!', { fontSize: '30px', fill: '#999' }).setVisible(true);
            this.physics.pause();
        }
    }

    // NPC dialogues
    function scene3Npc1Talk(){
        //console.log(test_npc);
        if(cursors.space.isDown){
            //console.log(test_npc.dialogue[1]);
                graphics = this.add.graphics();
                graphics.fillStyle(0x000000, 1);
                graphics.fillRect(player.x - 400, player.y + 100, 800, 500).setVisible(true);
                repairKitText = this.add.text(player.x - 400, player.y + 150, scene3Npc1Obj.dialogue[1], { fontSize: '30px', fill: '#999' }).setVisible(true);
                // terminalText2.setText(scene3Npc1Obj.dialogue[1]);
                // terminalText2.setVisible(true);
                graphics.setVisible(true);
//                console.log(test_npc.dialogue[1]);
                this.physics.pause();
            }
        }



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
    this.anims.create({
        key: 'engineOn',
        frames: this.anims.generateFrameNumbers('powerSource', { start: 2, end: 2 }),
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

    // cursors
    cursors = this.input.keyboard.createCursorKeys();
    let border_door = this.physics.add.sprite(2530, 3175);
    border_door.width = 100;
    border_door.height = 28;

    // scene3 border sprite npc1
    let border_scene3Npc1 = this.physics.add.sprite(2380, 2740).setSize(50, 115).setOffset(-5,0);


    //Test Door
    // Test Value was 2464(56), 2464(15)

    door2 = platforms.create(2520, 2464, 'engine_door').setScale(.35).setSize(170,70).setOffset(170,60);
    //Test2
    door4 = platforms.create(1432, 2554, 'engine_door').setScale(.35).setSize(170,70).setOffset(170,60);
    //Test3
    door5 = platforms.create(1432, 2714, 'engine_door').setScale(.35).setSize(170,70).setOffset(170,80);
    //Test Side door
    // Test value was 2784(22), 2592(56)
    door1 = platforms.create(2811, 2648, 'door').setScale(.35).setSize(70,160).setOffset(65,165);
    //Test Right facing side door
    //Test value was 2208(2), 2592(56)
    door3 = platforms.create(2210, 2648, 'doorL').setScale(.35).setSize(70,160).setOffset(60,165);
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

    //locks door behind player
    this.physics.add.sprite(2530, 3195, 'backdoor').setScale(.35);

    //make player
    player = this.physics.add.sprite(2500, 3100, 'character').setScale(.25);
    player.setSize(120, 250);
    player.setOffset(70, 220);

    // scene3 npc 1
    scene3Npc1 = this.physics.add.staticGroup();
    scene3Npc1.create(2380, 2780, 'npc1').setScale(.25).setFrame(0);
    scene3Npc1Static = this.physics.add.staticSprite(2380, 2740).setSize(45, 60).setOffset(-2,50);
    scene3Npc1.width = 32;
    scene3Npc1.height = 32;

    // open door functions
    function open_door(doorList){
        // console.log(this);
        if (cursors.space.isDown){
            //console.log(this);
            timer = this.time.delayedCall(5000, function(){close_door(doorList)}, null, this);
            //console.log('OpenDoor')
            for(let doorNumber = 0; doorNumber < doorList.length; doorNumber ++){
                if (Hdoors.includes(doorList[doorNumber])){
                    doorSound.play();
                    doorList[doorNumber].anims.play('open', true);
                    platforms.remove(doorList[doorNumber]);
                }
                else if(VdoorsL.includes(doorList[doorNumber])){
                    doorSound.play();
                    doorList[doorNumber].anims.play('openL', true);
                    platforms.remove(doorList[doorNumber]);
                }
                else{
                    doorList[doorNumber].anims.play('openR', true);
                    doorSound.play();
                    platforms.remove(doorList[doorNumber]);
                }
                }
            }
        }

    // Open door to repair kits
    function openRepairKitdoor1(){
        if (powerPad1On && !repairKit1Found){
            if (cursors.space.isDown){
                doorSound.play();
                door7.anims.play('openR', true);
                platforms.remove(door7);
            }
        }
        else if (cursors.space.isDown){
        graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1);
        graphics.fillRect(player.x - 400, player.y + 100, 800, 500).setVisible(true);
        powerDownText = this.add.text(player.x - 400, player.y + 100, 'The Power is down I need to get it working!', { fontSize: '30px', fill: '#999' }).setVisible(true);
        this.physics.pause();
        }
    }

    function openRepairKitdoor2(){
        if (battery1On && !repairKit2Found){
            if (cursors.space.isDown){
                doorSound.play();
                door13.anims.play('open', true);
                platforms.remove(door13);
            }
        }
        else if (cursors.space.isDown){
            graphics = this.add.graphics();
            graphics.fillStyle(0x000000, 1);
            graphics.fillRect(player.x - 400, player.y + 100, 800, 500).setVisible(true);
            powerDownText = this.add.text(player.x - 400, player.y + 100, 'The Power is down I need to get it working!', { fontSize: '30px', fill: '#999' }).setVisible(true);
            this.physics.pause();
        }
    }

    function finalDoor(){
        if (powerPad1On && powerPad2On && battery1On && battery2On && finaldoor == false && cursors.space.isDown){
            doorSound.play();
            finaldoor = true;
            door10.anims.play('open', true);
            platforms.remove(door10);
            timer = this.time.delayedCall(3000, changeScene, null, this);
        }
    }

    // can't go back through the door
    function no(){
      if(cursors.space.isDown){
        notext.setVisible(true);
        graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1);
        graphics.fillRect(player.x - 400, player.y + 100, 800, 500).setVisible(true);
        repairKitText = this.add.text(player.x - 400, player.y + 150, 'The door locked behind us.', { fontSize: '32px', fill: '#999' }).setVisible(true);
        this.physics.pause();
      }
    }

    function arrrow(a){
      movepad = true;
      for(let arrowNum = 0; arrowNum < a.length; arrowNum ++){
          if (Rarrows.includes(a[arrowNum])){
              battery2.setVelocityY(0);
              battery2.setVelocityX(50);
              // battery1.setVelocityX(10);
          }
    } }

    function arruow(a){
      movepad = true;
      for(let arrowNum = 0; arrowNum < a.length; arrowNum ++){
          if (Uarrows.includes(a[arrowNum])){
              battery2.setVelocityY(-50);
          }
    } }

    function stopp(s){
      movepad = true;
      for(let stopNum = 0; stopNum < s.length; stopNum ++){
          if (Stop.includes(s[stopNum])){
              movepad = false;
          }
        }

   }


    function changeScene(){
        this.scene.start('Scene4');
    }

    // Close door function
    function close_door(doorList){
        //console.log('CloseDoor')
        for(let doorNumber = 0; doorNumber < doorList.length; doorNumber ++){
            doorList[doorNumber].setFrame(0);
            platforms.add(doorList[doorNumber]);

        }
    }


    // NPC collision
    this.physics.add.collider(player, scene3Npc1Static);

    //Player Collision
    this.physics.add.collider(player, worldLayer);
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, batteries);
    this.physics.add.collider(player, cabinets);
    this.physics.add.collider(player, wire);
    this.physics.add.collider(player, powerPads);
    this.physics.add.collider(batteries, cabinets);
    this.physics.add.collider(worldLayer, battery1);
    this.physics.add.collider(worldLayer, battery2);
    this.physics.add.collider(platforms, batteries);
    this.physics.add.overlap(player, border_door, no, null, this);

    //movepad right overlap
    this.physics.add.overlap(batteries, arrowrs, function(){arrrow.call(this, [rarrow, uarrow])}, null, this);
    //movepad left overlap
    // this.physics.add.overlap(batteries, arrows, function(){arrrow.call(this, [rarrow, uarrow])}, null, this);
    // //movepad down overlap
    // this.physics.add.overlap(batteries, arrows, function(){arrrow.call(this, [rarrow, uarrow])}, null, this);
    //movepad up overlap
    this.physics.add.overlap(batteries, arrowus, function(){arruow.call(this, [uarrow])}, null, this);
    //stop on movepad
    this.physics.add.overlap(batteries, stops, function(){stopp.call(this, [stop])}, null, this);

    // NPC overlap
    this.physics.add.overlap(player, border_scene3Npc1, scene3Npc1Talk, null, this);

    //Player Overlap
    // Terminal
    this.physics.add.overlap(player, terminalBorder, commandTerminal, null, this);

    // use .call on open_door function to provide context i.e. see below
    this.physics.add.overlap(player, borderButton1, function(){open_door.call(this, [door1, door2, door3])}, null, this);

    // border button 1b
    this.physics.add.overlap(player, borderButton1b, function(){open_door.call(this, [door1])}, null, this);

    // border button 2
    this.physics.add.overlap(player, borderButton2, function(){open_door.call(this, [door4, door5, door6])}, null, this);

    // border button 2b
    this.physics.add.overlap(player, borderButton2b, function(){open_door.call(this, [door5])}, null, this);

    // border button 2c
    this.physics.add.overlap(player, borderButton2c, function(){open_door.call(this, [door6])}, null, this);

    // border button 3
    this.physics.add.overlap(player, borderButton3, function(){open_door.call(this, [door9, door14])}, null, this);

    // border button 3b
    this.physics.add.overlap(player, borderButton3b, function(){open_door.call(this, [door8, door9])}, null, this);

    // border button 4
    this.physics.add.overlap(player, borderButton4, openRepairKitdoor1, null, this);

    // border button 4b
    this.physics.add.overlap(player, borderButton4b, function(){open_door.call(this, [door2])}, null, this);

    // border button 5
    this.physics.add.overlap(player, borderButton5, openRepairKitdoor2, null, this);

    // border button 5b
    // this.physics.add.overlap(player, borderButton5b, function(){open_door.call(this, [door12])}, null, this);

    // border button 6
    // this.physics.add.overlap(player, borderButton6, function(){open_door.call(this, [door12])}, null, this);

    // border button 6b
    this.physics.add.overlap(player, borderButton6b, function(){open_door.call(this, [door11])}, null, this);

    // border button 6c
    this.physics.add.overlap(player, borderButton6c, function(){open_door.call(this, [door14])}, null, this);

    // border button 7
    this.physics.add.overlap(player, borderButton7, finalDoor, null, this);

    // border button 7b
    this.physics.add.overlap(player, borderButton7b, function(){open_door.call(this, [door11])}, null, this);

    //Battery1
    this.physics.add.overlap(battery1, powerPad1, addBattery1, null, this);
    //Battery2
    this.physics.add.overlap(battery2, powerPad2, addBattery2, null, this);

    //RepairKit1
    this.physics.add.overlap(player, repairKit1Border, addRepairKit1, null, this);
    //RepairKit2
    this.physics.add.overlap(player, repairKit2Border, addRepairKit2, null, this);

    //brokenBattery1
    this.physics.add.overlap(player, brokenBattery1Border, fixBattery1, null, this);
    //brokenBattery2
    this.physics.add.overlap(player, brokenBattery2Border, fixBattery2, null, this);

    //door codes
    this.physics.add.overlap(player, code1, function(){codedDoor.call(this, 1)}, null, this);
    this.physics.add.overlap(player, code2, function(){codedDoor.call(this, 2)}, null, this);
    this.physics.add.overlap(player, code3, function(){codedDoor.call(this, 3)}, null, this);
    this.physics.add.overlap(player, code4, function(){codedDoor.call(this, 4)}, null, this);


    //Set up text box
    //Mini Map
    this.minimap = this.cameras.add(590, 5, 200, 160).setZoom(.05).setName('mini');
    this.minimap.setBackgroundColor(0x002244);
    this.minimap.scrollX = 2000;
    this.minimap.scrollY = 1500;

    //object array
    let interactable = [code1Button, code2Button, code3Button, code4Button, button1, button2, button3, button4, button5, button6, button7, button8, button9, button10, button11, button12, button13, button14, battery1, battery2, brokenBattery1, brokenBattery2, repairKit1, repairKit2, powerPad1, powerPad2, terminal]

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
            for (let i = 0; i < interactable.length; i++){
                interactable[i].setTint();
            }
            boxGray = false;
          }
          else{
            for (let i = 0; i < interactable.length; i++){
                interactable[i].setTint(0x999999);
            }
            boxGray = true;
          }
        }
    // UI for score
    //Scoreboard
//    scene3UI = this.add.container(player.x, 50);
//    scene3UIText = this.add.text(player.x, 50, "SCORE: 0", {fontSize: '32px', color: '#000'});
//
//    scene3UI.add(scene3UIText);
//
//    this.tweens.add({
//        targets: scene3UI,
//        x: scene3UI.x + player.x,
//        ease: 'Linear',
//        duration: 1,
//        delay: 1,
//        yoyo: false,
//        repeat: -1
//    });
    scoreText = this.add.text(0, 0, 'Toolkits aquired: 0', {fontSize: '12px' });
    scoreText.scrollFactorX = 0;
    scoreText.scrollFactorY = 0;
    scoreText.setFontSize(24);

}

update(){
    // camera follows the player
    this.cameras.main.startFollow(player);
    //scene3UIText.x = player.body.position.x;

    // keep track of the sprite X and Y
    // spriteCoord.setText('Sprite X: ' + parseFloat(player.x).toFixed(2) + " Sprite Y: " + parseFloat(player.y).toFixed(2));
    console.log(player.x, player.y);
    player.setVelocityX(0);
    player.setVelocityY(0);
    if (movepad == false){
    batteries.setVelocityX(0);
    batteries.setVelocityY(0);
    }



//    if(cursors.shift.isDown){
//        powerSupplyFixedText.setVisible(false);
//        doorFixedText.setVisible(false);
//        toolBoxAcquiredText.setVisible(false);
//        graphics.setVisible(false);
//        this.physics.resume();
//    }
    if(cursors.shift.isDown){
        graphics.setVisible(false);
        repairKitText.setVisible(false);
        terminalText1.setVisible(false);
        terminalText2.setVisible(false);
        correctCodeText.setVisible(false);
        incorrectCodeText.setVisible(false);
        powerDownText.setVisible(false);
        notext.setVisible(false);
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
    // else if (cursors.space.isDown){
    //     container.add(battery1);
    //     console.log(container.count());
    // }
    else{
      player.anims.play('Idle',true)
    }
}


}
