'use strict';

/**
 * @author       Thomas Amar <hello@ebabel.eu>
 * @copyright    2018 eBabel Games
 * @license      {@link https://github.com/ebabel-games/2018-november/blob/master/LICENSE|GPL-3.0 License}
 */

import * as C from './constants';
import pwa from './utils/pwa';
import resizeGame from './utils/resize-game';
import debounce from './utils/debounce';
import BootGame from './modules/boot-game';
import PlayGame from './modules/play-game';

// The whole game is enclosed in an anonymous function that runs once all code is loaded.
window.addEventListener('load', () => {
  // Progressive Web App (PWA) configuration.
  pwa();

  // Phaser configuration.
  const config = {
    type: Phaser.AUTO,
    width: C.gameWidth,
    height: C.gameHeight,
    backgroundColor: C.colors0x[0][4],
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: C.gravity },
        debug: C.debug,
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

// Listen for the installation prompt.
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();

  // Stash the event so it can be triggered later.
  deferredPrompt = e;

  // Update UI notify the player they can add to home screen.
  document.getElementById('install-banner').style.display = 'block';
});

document.getElementById('install-button').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('install-banner').style.display = 'none';

  // Show the prompt.
  deferredPrompt.prompt();

  // Wait for the player to respond to the prompt.
  deferredPrompt.userChoice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        deferredPrompt = null;
      }
    });
});
