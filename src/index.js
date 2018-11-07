import 'phaser';

import * as C from './constants';
import resizeGame from './modules/resize-game';
import debounce from './modules/debounce';

window.addEventListener('load', () => {
  var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: 0xccccff,
    scene: {
      preload: preload,
      create: create
    }
  };

  var game = new Phaser.Game(config);

  function preload() {
    this.load.image('logo', 'assets/logo.png');
  }

  function create() {
    const logo = this.add.image(400, 300, 'logo');
  }

  // Get focus in case the game is in an iframe.
  window.focus();

  // Handle resizing the whole game while preserving aspect ratio.
  resizeGame(game);
  window.addEventListener('resize', debounce((e) => {
    resizeGame(game);
  }, C.debounceDelay));
});
