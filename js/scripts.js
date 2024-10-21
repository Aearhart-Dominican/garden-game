let garden = new Phaser.Scene("Game")

garden.init = function() {}

garden.preload = function() {
    this.load.atlas('pots', 'assets/pot.png', 'assets/pot.json');
}

garden.create = function() {

    this.seeds = 0
    this.seedTimer = 0
    this.seedSpeed = 4000

    this.seedText = this.add.text(10, 185, 'Seeds: 0', { fontSize: '16px', fill: '#fff' });

    this.pots = this.add.group()

    for (x = 24; x < config.width; x += 32) {
        for (y = 24; y < config.height - 64; y += 32) {
            this.pots.create(x, y, 'pots', 'pot0')
        }
    }

    Phaser.Actions.Call(this.pots.getChildren(), function(pot){
        pot.setInteractive();

        pot.age = 0;

        pot.on('pointerdown', potClick);
    }, garden)

}

garden.update = function(time) {
    if(time > this.seedTimer) {
        this.seeds += 1
        this.seedTimer += this.seedSpeed
    }

    this.seedText.setText('Seeds: ' + this.seeds)

    Phaser.Actions.Call(this.pots.getChildren(), potUpdate, this)

}

let config = {
    type: Phaser.AUTO,
    width: 400,
    height: 200,
    scene: garden,
    pixelArt: true,
};

let game = new Phaser.Game(config);

potClick = function() {
    if (garden.seeds > 0) {
        garden.seeds -= 1
        this.age = 1
        this.ageTime = garden.time.now + 10000
    }
}

potUpdate = function(pot) {

    if (garden.time.now > pot.ageTime && pot.age < 5) {
        pot.ageTime += 10000
        pot.age += 1
    }

    switch (pot.age){
        case (1):
            pot.setTexture('pots', 'pot1.png')
            break;
        case (2):
            pot.setTexture('pots', 'pot2.png')
            break;
        case (3):
            pot.setTexture('pots', 'pot3.png')
            break;
        case (4):
            pot.setTexture('pots', 'pot4.png')
            break;
        case (5):
            pot.setTexture('pots', 'pot5.png')
            break;
        default:
            pot.setTexture('pots', 'pot0')
            break;
    }
    
}