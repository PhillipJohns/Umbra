var flag = false;
var theship;
var text;

class SceneX extends Phaser.Scene {
    constructor()
    {
        super('SceneX');


    }
    preload()
    {
        this.load.spritesheet('ship', 'sprite/ship.png', {frameWidth: 600, frameHeight: 420});
        this.load.image('pod', 'sprite/pod.png');
    }
    create(){
        this.add.image(400, 350, 'stars').setScale(.85);
//        this.add.image(390, 300, 'victory').setScale(.30);
        theship = this.add.sprite(390, 300, 'ship').setScale(.70).setFrame(0);
        this.add.image(600, 350, 'pod').setScale(.45);
        //make player
        text = this.add.text(130, 440, "I escaped!!!\nI didn't fix the ship.\nHopefully everyone is ok...\nPress Shift to continue.", { fontSize: '32px', fill: '#999' }).setVisible(true);
        
        //
        this.anims.create({
        key: 'shipani',
        frames: this.anims.generateFrameNumbers('ship', {start:0, end: 1}),
        frameRate: 10,
        repeat: -1
    });
        cursors = this.input.keyboard.createCursorKeys();
    
    }
    update(){
        if(cursors.shift.isDown && flag == false)
        {
            theship.setFrame(1);
            text.setVisible(false);
            flag = true;
        }
    }
}
