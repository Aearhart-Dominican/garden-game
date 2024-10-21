let garden = new Phaser.Scene("Game")

garden.init = function() {}

garden.preload = function() {
    this.load.image('pot', 'assets/pot.png')
}

garden.create = function() {
    this.pots = this.add.group()

    for (x = 24; x < config.width; x += 32) {
        for (y = 24; y < config.height; y += 32) {
            this.pots.create(x, y, 'pot')
        }
    }

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

