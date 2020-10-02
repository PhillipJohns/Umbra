// level 2
var x = 0;
var y = 0;

class Scene2 extends Phaser.Scene {
    constructor()
    {
        super('Scene2');
    }



// preload
preload(){
    // load background
    this.load.image('wall', 'Interior/Wall.png');
    this.load.image('floor', 'Interior/Floor.png');
    this.load.image('sideWall', 'Interior/SideWall.png');
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
}    
    
// update
update(){
    
}