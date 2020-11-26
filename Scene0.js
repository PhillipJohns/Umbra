class Scene0 extends Phaser.Scene {
    constructor()
    {
        super('Scene0');

    }
    create(){
        this.add.text(300, 200, "Umbra", { fontSize: '64px', fill: '#999' }).setVisible(true);
        cursors = this.input.keyboard.createCursorKeys();
        var key = cursors.space.isDown;
        // this.input.keyboard.on('keydown', function(){this.scene.start('Scene1')});
        // this.input.keyboard.on('keydown', function (event) {
        //
        // changeScene.call(this);
        //
        // });
        // this.add.text();

        function changeScene(){
            this.scene.start('Scene1');
        }

        document.onkeypress = function(){changeScene.call(this);}
        if (cursors.space.isDown){
          this.scene.start('Scene1');
          console.log('ugh');
        }
    }

    update(){
      // function changeScene(){
      //     this.scene.start('Scene1');
      // }
      // if (cursors.space.isDown){
      //   changeScene();
      //   console.log('ugh');
      // }
    }
}
