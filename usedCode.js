//Making doors
door = platforms.create(x, y, 'engine_door').setScale(.15).setSize(75,34).setOffset(220,100);
doorOpen = this.physics.add.sprite(x, y, 'engine_door').setScale(.15).setSize(75,34).setOffset(220,100).setVisible(false);

//Door opening
platforms.remove(door);
door.setVisible(false);
doorOpen.setVisible(true);
door.anims.play('open', true);

//Door open function
function doorOpen(door){
    door.anims.play('open', true);
}
