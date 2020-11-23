class Scene4 extends Phaser.Scene {
    constructor()
    {
        super('Scene4');


    }
    create(){
        this.add.image(x, y, 'victory');
        //make player
        // player = this.physics.add.sprite(70, 60, 'character').setScale(.25);
        // player.setSize(120, 250);
        // player.setOffset(70, 220);
        this.add.text(100, 250, "You've Escaped!!", { fontSize: '62px', fill: '#999' }).setVisible(true);
    }
}
