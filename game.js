import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO, // Which renderer to use
  width: 25 * 16, // Canvas width in pixels
  height: 25 * 16, // Canvas height in pixels
  parent: "game-container", // ID of the DOM element to add the canvas to
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  scale: {
    mode: Phaser.Scale.FIT
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  }
};

const game = new Phaser.Game(config);

const player = {
  preload: function () {
    this.load.spritesheet('player-idle', 'assets/evil-wizard-2/Sprites/Idle.png', { frameWidth: 48, frameHeight: 48 });
  },
  create: function () {
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('brawler', { frames: [1, 2, 3, 4] }),
      frameRate: 8,
      repeat: -1
    });

    const character = this.add.sprite(600, 370);
    character.play('idle');
  }
}

function preload() {
  // Runs once, loads up assets like images and audio
  this.load.image('world_tiles', 'assets/tiles/oubliette_tileset.png');
  this.load.tilemapTiledJSON('tilemap', 'maps/arena.json');
  player.preload.call(this);
}

function create() {
  // Runs once, after all assets in preload are loaded
  // this.add.image(0, 0, 'world-tiles');

  const map = this.make.tilemap({ key: 'tilemap' });
  const tileset = map.addTilesetImage('oubliette_tileset', 'world_tiles');
  map.createLayer('background', tileset);
  map.createLayer('floor', tileset);
  player.create.call(this);
}

function update(time, delta) {
  // Runs once per frame for the duration of the scene
}
