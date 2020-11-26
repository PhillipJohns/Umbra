class Scene4 extends Phaser.Scene {
    constructor()
    {
        super('Scene4');


    }
    create(){
        this.add.image(390, 300, 'victory').setScale(.30);
        //make player
        player = this.physics.add.sprite(390, 300, 'character').setScale(.25);

        this.add.text(170, 440, "I saved the ship!!!", { fontSize: '42px', fill: '#999' }).setVisible(true);
    }
}
