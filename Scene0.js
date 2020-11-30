class Scene0 extends Phaser.Scene {
    constructor()
    {
        super('Scene0');

    }
    preload(){
          this.load.image('stars', 'sprite/stars.png');
          this.load.image('umbra', 'sprite/umbra_logo.png');
    }
    create(){
        this.add.image(400, 350, 'stars').setScale(.85);
        this.add.image(400, 200, 'umbra').setScale(.7);
        this.add.text(300, 360, "Umbra", { fontSize: '64px', fill: '#999' }).setVisible(true);
        this.add.text(120, 480, "Press any key to start", { fontSize: '42px', fill: '#999' }).setVisible(true);
        this.input.keyboard.on('keyup', this.changeScene, this);

    }

    changeScene(){
        this.scene.start('Scene1');
    }

    update(){
    }
}
