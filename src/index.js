'use strict';

/**
 * @author       Thomas Amar <hello@ebabel.eu>
 * @copyright    2018 eBabel Games
 * @license      {@link https://github.com/ebabel-games/2018-november/blob/master/LICENSE|GPL-3.0 License}
 */

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
    this.add.image(400, 300, 'logo');
  }

  // Get focus in case the game is in an iframe.
  window.focus();

  // Handle resizing the whole game while preserving aspect ratio.
  resizeGame(game);
  window.addEventListener('resize', debounce(() => {
    resizeGame(game);
  }, C.debounceDelay));
});
