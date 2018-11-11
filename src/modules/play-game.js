'use strict';

import * as C from '../constants';

/**
 * `PlayGame`
 * Main Phaser scene to play the game.
 */
class PlayGame extends Phaser.Scene {
  constructor() {
    super('PlayGame');

    this.EG = {
      ground: null,
      platforms: null,
      player: null,
      cursors: null,
      stars: null,
      score: C.scoreDefault,
      scoreText: null,
      bombs: null,
      gameOver: false,
      gameOverText: null,
      firstPlay: true,
      audioWin: null,
      audioExplosion: null,
      audioGameOver: null,
    };
  }

  create() {
    // Static element: the Sky.
    this.add.image(C.skyPositionX, C.skyPositionY, C.skyKey);

    // Bouncing stars to collect.
    this.EG.stars = this.physics.add.group({
      key: C.starsKey,
      repeat: C.starsRepeat,
      setXY: {
        x: C.starsPositionX,
        y: C.starsPositionY,
        stepX: C.starsPositionStepX,
      },
    });
    this.EG.stars.children.iterate((child) => 
      child.setBounceY(Phaser.Math.FloatBetween(C.starsMinBounceY, C.starsMaxBounceY))
    );

    // Static ground.
    this.EG.ground = this.physics.add.staticGroup();
    this.EG.ground.create(C.groundX, C.groundY, C.groundKey);
    this.physics.add.collider(this.EG.stars, this.EG.ground);

    // Static platforms.
    this.EG.platforms = this.physics.add.staticGroup();
    this.EG.platforms.create(C.platforms[0][0], C.platforms[0][1], C.platformsKey);
    this.EG.platforms.create(C.platforms[1][0], C.platforms[1][1], C.platformsKey);
    this.EG.platforms.create(C.platforms[2][0], C.platforms[2][1], C.platformsKey);
    this.physics.add.collider(this.EG.stars, this.EG.platforms);

    // Setup main player sprite.
    const playerX = (this.EG.firstPlay) ? C.playerStartX : this.EG.player.x;  // Default x position of player or previous game x position.
    const playerY = (this.EG.firstPlay) ? C.playerStartY : this.EG.player.y;  // Same for y.
    this.EG.player = this.physics.add.sprite(playerX, playerY, C.playerKey);
    this.EG.player.body.setGravityY(C.playerGravity);
    this.EG.player.setBounce(C.playerBounce);
    this.EG.player.setCollideWorldBounds(C.playerCollideWorldBounds);
    this.physics.add.collider(this.EG.player, this.EG.ground);
    this.physics.add.collider(this.EG.player, this.EG.platforms);

    // Check if player overlaps a star.
    this.physics.add.overlap(this.EG.player, this.EG.stars, this.collectStar, null, this);

    // Bombs that can kill the player.
    this.EG.bombs = this.physics.add.group();
    this.physics.add.collider(this.EG.bombs, this.EG.ground);
    this.physics.add.collider(this.EG.bombs, this.EG.platforms);
    this.physics.add.collider(this.EG.bombs, this.EG.bombs);
    this.physics.add.collider(this.EG.player, this.EG.bombs, this.hitBomb, null, this);

    // Setup animations of the player sprite.
    if (this.EG.firstPlay) {
      this.anims.create({
        key: C.playerAnimations.left.key,
        frames: this.anims.generateFrameNumbers(C.playerKey, {
          start: C.playerAnimations.left.start,
          end: C.playerAnimations.left.end,
        }),
        frameRate: C.playerAnimations.left.frameRate,
        repeat: C.playerAnimations.left.repeat,
      });
      this.anims.create({
        key: C.playerAnimations.turn.key,
        frames: [{
          key: C.playerKey,
          frame: C.playerAnimations.turn.frame,
        }],
        frameRate: C.playerAnimations.turn.frameRate,
      });
      this.anims.create({
        key: C.playerAnimations.right.key,
        frames: this.anims.generateFrameNumbers(C.playerKey, {
          start: C.playerAnimations.right.start,
          end: C.playerAnimations.right.end,
        }),
        frameRate: C.playerAnimations.right.frameRate,
        repeat: C.playerAnimations.right.repeat,
      });
    }

    // Setup the score display.
    this.EG.scoreText = this.add.text(
      C.scoreTextPositionX,
      C.scoreTextPositionY,
      C.scoreTextDefault,
      {
        fontFamily: C.headerFontFamily,
        fontSize: C.scoreTextFontSize,
        fill: C.scoreTextFill,
      },
    );

    // Game Over text to display when player loses.
    this.EG.gameOverText = this.add.text(
      C.gameOverTextPositionX,
      C.gameOverTextPositionY,
      C.gameOverTextDefault,
      {
        fontFamily: C.headerFontFamily,
        fontSize: C.gameOverTextFontSize,
        fill: C.gameOverTextFill,
        stroke: C.gameOverTextStroke,
        strokeThickness: C.gameOverTextStrokeThickness,
      }
    );
    this.EG.gameOverText.visible = false;

    // Audio win sound when player collects a star.
    this.EG.audioWin = this.sound.add(C.audioWinKey);

    // Audio explosion sound when player hits a bomb.
    this.EG.audioExplosion = this.sound.add(C.audioExplosionKey);

    // Audio when player loses a game.
    this.EG.audioGameOver = this.sound.add(C.audioGameOverKey);

    // Setup keyboard handling.
    this.EG.cursors = this.input.keyboard.createCursorKeys();

    // Mouse/touch handling.
    this.input.on('pointerdown', (pointer) => {
      this.EG.cursors.right.isDown = (this.EG.player.x < pointer.x);
      this.EG.cursors.left.isDown = (this.EG.player.x > pointer.x);
      this.EG.cursors.up.isDown = (this.EG.player.y - C.playerFrameHeight > pointer.y);
    });
    this.input.on('pointerup', () => this.EG.cursors.up.isDown = false);
  }

  // When the player has lost and the game is paused,
  // prevent the keyboard from trying to move,
  // which can lock the player in a given direction.
  resetKeyboard() {
    this.EG.cursors.left.enabled = false;
    this.EG.cursors.right.enabled = false;
    this.EG.cursors.up.enabled = false;
    this.EG.cursors.down.enabled = false;
    this.EG.cursors.left.reset();
    this.EG.cursors.right.reset();
    this.EG.cursors.up.reset();
    this.EG.cursors.down.reset();
  }

  // The player has lost, reset variables.
  resetGame() {
    this.EG.score = C.scoreDefault;
    this.EG.gameOver = false;
    this.EG.firstPlay = false;
  }

  // Game loop function that gets called continuously unless a game over.
  update() {
    if (this.EG.gameOver) {
      this.EG.audioGameOver.play();
      // Player has lost a game, suspend it and reset.
      this.EG.gameOverText.visible = true;
      this.scene.pause();
      setTimeout(() => {
        this.resetGame();
        this.resetKeyboard();
        this.scene.restart();
      }, C.minimumDelay);
      return;
    }

    if (this.EG.cursors.left.isDown) {
      this.EG.player.setVelocityX(C.playerLeftVelocityX);
      this.EG.player.anims.play(C.playerAnimations.left.key, true);
    } else if (this.EG.cursors.right.isDown) {
      this.EG.player.setVelocityX(C.playerRightVelocityX);
      this.EG.player.anims.play(C.playerAnimations.right.key, true);
    } else {
      this.EG.player.setVelocityX(C.playerTurnVelocityX);
      this.EG.player.anims.play(C.playerAnimations.turn.key);
    }

    if (this.EG.cursors.up.isDown && this.EG.player.body.touching.down) {
      this.EG.player.setVelocityY(C.playerDownVelocityY);
    }

    // Spinning bombs.
    this.EG.bombs.children.entries.map(bomb => bomb.rotation += 0.1);
  }

  // Player collects a star that it overlaps.
  collectStar(player, star) {
    this.EG.audioWin.play();
    star.disableBody(true, true);
    this.EG.score += C.scoreCollectStar;
    this.EG.scoreText.setText(`Score: ${this.EG.score}`);

    // When all stars have been collected, add a new bomb and respawn all stars.
    if (this.EG.stars.countActive(true) === C.starsThresholdSpawnBomb) {
      this.EG.stars.children.iterate((child) => {
        child.enableBody(true, child.x, 0, true, true);
      });

      // Spawn the new bomb either in the right or left part of the scene, where the player isn't.
      const x = (player.x < C.bombMiddleBorder) ?
        Phaser.Math.Between(C.bombMiddleBorder, C.bombRightEdge)
        : Phaser.Math.Between(C.bombLeftEdge, C.bombMiddleBorder);
      const bomb = this.EG.bombs.create(x, C.bombStartPositionY, C.bombKey);
      bomb.setBounce(C.bombBounce);
      bomb.setCollideWorldBounds(C.bombCollideWorldBounds);
      bomb.setVelocity(Phaser.Math.Between(C.bombVelocityMinLower, C.bombVelocityMaxLower), C.bombVelocityMax);
      bomb.allowGravity = C.bombAllowGravity;
    }
  }

  // Player has hit a bomb.
  // Note: second parameter is 'bomb' but I don't need it.
  hitBomb(player) {
    this.EG.audioExplosion.play();
    this.physics.pause();
    player.setTint(C.playerDeadTint);
    player.anims.play(C.playerAnimations.turn.key);
    this.EG.gameOver = true;
  }
}

export default PlayGame;
