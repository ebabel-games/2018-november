'use strict';

/**
 * `PlayGame`
 * Main Phaser scene to play the game.
 */
class PlayGame extends Phaser.Scene {
  constructor() {
    super('PlayGame');
  }

  // Phaser function to preload all assets.
  preload() {
    this.load.image('logo', 'assets/logo.png');
  }

  // Phaser function to instantiate all game elements.
  create() {
    this.add.image(400, 300, 'logo');

    // Now the game is ready, so hide the loading screen.
    document.getElementById('loading').style.display = 'none';
  }
}

module.exports = PlayGame;
