class Scene4 extends Phaser.Scene {
    constructor()
    {
        super('Scene4');


    }
    create(){
        this.add.text(100, 250, "You've Escaped!!", { fontSize: '62px', fill: '#999' }).setVisible(true);
    }   
}