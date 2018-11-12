'use strict';

import * as C from '../constants';

/**
 * `BootGame`
 * First Phaser scene, to preload all assets.
 */
class BootGame extends Phaser.Scene {
  constructor() {
    super('BootGame');
  }

  // Phaser function to preload all assets.
  preload() {
    // Graphics.
    this.load.image(C.skyKey, C.skyAsset);
    this.load.spritesheet(
      C.platformKey,
      C.platformAsset,
      {
        frameWidth: C.platformFrameWidth,
        frameHeight: C.platformFrameHeight,
      },
    );
    this.load.image(C.starsKey, C.starsAsset);
    this.load.image(C.bombKey, C.bombAsset);
    this.load.spritesheet(
      C.playerKey,
      C.playerAsset,
      {
        frameWidth: C.playerFrameWidth,
        frameHeight: C.playerFrameHeight,
      },
    );

    // Audio.
    this.load.audio(C.audioWinKey, C.audioWinAssets);
    this.load.audio(C.audioExplosionKey, C.audioExplosionAssets);
    this.load.audio(C.audioGameOverKey, C.audioGameOverKeyAssets);
  }

  // Phaser function, here used to activate the play button once the preload has completed its work.
  create() {
    document.getElementById('play-button').addEventListener('click', (e) => {
      e.preventDefault();

      // Hide the loading screen when the player clicks on the enabled Play button.
      document.getElementById('loading').style.display = 'none';

      this.scene.start('PlayGame');
    });

    // Game has finished loading all assets, so it's possible to start playing.
    document.getElementById('play-button').disabled = false;
    document.getElementById('loading-animation').style.display = 'none';
  }
}

export default BootGame;
