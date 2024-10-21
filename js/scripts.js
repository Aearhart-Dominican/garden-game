let garden = new Phaser.Scene("Game")

garden.init = function() {}

garden.preload = function() {

}

garden.create = function() {

}

garden.update = function() {

}

let config = {
    type: Phaser.AUTO,
    width: 400,
    height: 200,
    scene: garden,
    pixelArt: true,
};

let game = new Phaser.Game(config);

