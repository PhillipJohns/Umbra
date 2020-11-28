class Scene0 extends Phaser.Scene {
    constructor()
    {
        super('Scene0');

    }
    create(){
        this.add.text(300, 200, "Umbra", { fontSize: '64px', fill: '#999' }).setVisible(true);
        this.add.text(120, 400, "Press any key to start", { fontSize: '42px', fill: '#999' }).setVisible(true);
        this.input.keyboard.on('keyup', this.changeScene, this);

    }

    changeScene(){
        this.scene.start('Scene1');
    }

    update(){
    }
}
