'use strict';

/**
 * @author       Thomas Amar <hello@ebabel.eu>
 * @copyright    2018 eBabel Games
 * @license      {@link https://github.com/ebabel-games/2018-november/blob/master/LICENSE|GPL-3.0 License}
 */

import * as C from './constants';
import resizeGame from './utils/resize-game';
import debounce from './utils/debounce';
import BootGame from './modules/boot-game';
import PlayGame from './modules/play-game';

// The whole game is enclosed in an anonymous function that runs once all code is loaded.
window.addEventListener('load', () => {
  // Phaser configuration.
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: C.colors[0][0],
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: false,
      },
    },
    scene: [
      BootGame,
      PlayGame,
    ],
  };

  // Phaser main game object.
  const game = new Phaser.Game(config);

  // Get focus in case the game is in an iframe.
  window.focus();

  // Handle resizing the whole game while preserving aspect ratio.
  resizeGame(game);
  window.addEventListener('resize', debounce(() => {
    resizeGame(game);
  }, C.debounceDelay));
});
