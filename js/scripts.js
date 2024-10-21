let garden = new Phaser.Scene("Game")

garden.init = function() {}

garden.preload = function() {
    this.load.atlas('pots', 'assets/pot.png', 'assets/pot.json');
    this.load.image('buyseed', 'assets/buyseed.png')
    this.load.image('seedbag', 'assets/seedbag.png')
    this.load.image('shovel', 'assets/shovel.png')
    this.load.image('money', 'assets/money.png')
}

garden.create = function() {

    this.active = 1

    this.seeds = 4
    this.seedTimer = 0
    this.seedSpeed = 20000

    this.seedText = this.add.text(10, 185, 'Seeds: 0', { fontSize: '16px', fill: '#fff', resolution: 10, fontFamily: 'helvetica' });

    this.cash = 0;
    this.cashText = this.add.text(100, 185, 'Cash: 0', { fontSize: '16px', fill: '#fff', resolution: 10, fontFamily: 'helvetica' });

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

    this.buy = this.add.sprite(200, 192, 'buyseed')
    this.buy.setInteractive();
    this.buy.on('pointerdown', buySeed)

    this.plant = this.add.sprite(250, 192, 'seedbag')
    this.plant.setInteractive();
    this.plant.on('pointerdown', function(){garden.active = 1})

    this.sell = this.add.sprite(300, 192, 'money')
    this.sell.setInteractive();
    this.sell.on('pointerdown', function(){garden.active = 2})

    this.shovel = this.add.sprite(350, 192, 'shovel')
    this.shovel.setInteractive();
    this.shovel.on('pointerdown', function(){garden.active = 3})

}

garden.update = function(time) {
    if(time > this.seedTimer) {
        this.seeds += 1
        this.seedTimer += this.seedSpeed
    }

    this.seedText.setText('Seeds: ' + this.seeds)
    this.cashText.setText('Cash: ' + this.cash)

    Phaser.Actions.Call(this.pots.getChildren(), potUpdate, this)

    console.log(this.active)
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
    switch (garden.active) {
        case 1:
            plantSeed(this)
            break;
        case 2:
            sellPlant(this)
            break;
        case 3:
            removePlant(this)
            break;
        default:
            plantSeed(this)
            break;
    }
}

plantSeed = function(pot) {
    if (garden.seeds > 0 && pot.age == 0) {
        garden.seeds -= 1
        pot.age = 1
        pot.ageTime = garden.time.now + 5000
    }
}

sellPlant = function(pot) {
    if (pot.age == 5) {
        garden.cash += 30
        pot.age = 0
    }
}

removePlant = function(pot) {
    pot.age = 0
}

buySeed = function() {
    if (garden.cash >= 10) {
        garden.cash -= 10;
        garden.seeds += 1
    }
}

potUpdate = function(pot) {
    setPotAge(pot);   
}

setPotAge = function(pot) {
    if (garden.time.now > pot.ageTime && pot.age < 5 && pot.age != 0) {
        pot.ageTime += 5000
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
