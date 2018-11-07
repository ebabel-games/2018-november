'use strict';

/**
 * `PlayGame`
 * Main Phaser scene to play the game.
 */
class PlayGame extends Phaser.Scene {
  constructor() {
    super('PlayGame');
  }

  create() {
    console.log('Start to play the Game...');
  }
}

module.exports = PlayGame;
