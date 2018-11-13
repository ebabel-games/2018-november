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
      platforms: null,
      player: null,
      cursors: null,
      stars: null,
      score: C.scoreDefault,
      scoreText: null,
      bombs: null,
      gameOver: false,
      gameOverText: null,
      win: false,
      winText: null,
      firstPlay: true,
      audioCollectStar: null,
      audioExplosion: null,
      audioGameOver: null,
      audioWin: null,
      bombSpawnIntervalId: null,
    };
  }

  create() {
    // Static element: the Sky.
    this.add.image(C.skyPositionX, C.skyPositionY, C.skyKey).setScrollFactor(0);

    // Stars to collect.
    this.EG.stars = this.physics.add.staticGroup();
    C.stars.map((data) => {
      const star = this.EG.stars.create(
        data[0],
        data[1],
        C.starsKey,
      );

      if (C.debug) {
        star.setInteractive();
        this.input.setDraggable(star);
      }
    });

    // Group of static platforms.
    this.EG.platforms = this.physics.add.staticGroup();
    C.platforms.map((data) => {
      const platform = this.add.tileSprite(
        data[C.platformsX],
        data[C.platformsY],
        data[C.platformsWidth],
        data[C.platformsHeight],
        C.platformKey,
        data[C.platformsFrame],
      );

      this.EG.platforms.add(platform);

      if (C.debug) {
        platform.setInteractive();
        this.input.setDraggable(platform);
      }
    });
    this.physics.add.collider(this.EG.stars, this.EG.platforms);

    if (C.debug) {
      this.input.on('drag', function(pointer, gameObject, dragX, dragY){
        gameObject.x = dragX;
        gameObject.y = dragY;
        console.log(dragX, dragY);
      });
    }

    // Setup main player sprite.
    const playerX = (this.EG.firstPlay) ? C.playerStartX : this.EG.player.x;  // Default x position of player or previous game x position.
    const playerY = (this.EG.firstPlay) ? C.playerStartY : this.EG.player.y;  // Same for y.
    this.EG.player = this.physics.add.sprite(playerX, playerY, C.playerKey);
    this.EG.player.body.setGravityY(C.playerGravity);
    this.EG.player.setBounce(C.playerBounce);
    this.EG.player.setCollideWorldBounds(C.playerCollideWorldBounds);
    this.physics.add.collider(this.EG.player, this.EG.platforms);

    // Check if player overlaps a star.
    this.physics.add.overlap(this.EG.player, this.EG.stars, this.collectStar, null, this);

    // Bombs that can kill the player.
    this.EG.bombs = this.physics.add.group();
    this.physics.add.collider(this.EG.bombs, this.EG.platforms);
    this.physics.add.collider(this.EG.bombs, this.EG.bombs);
    this.physics.add.collider(this.EG.player, this.EG.bombs, this.hitBomb, null, this);

    // Setup animations of the player sprite.
    if (this.EG.firstPlay) {
      this.anims.create({
        key: C.playerAnimations.left.key,
        frames: this.anims.generateFrameNames(
          C.playerKey,
          {
            frames: C.playerAnimations.left.frames,
          }
        ),
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
        frames: this.anims.generateFrameNames(
          C.playerKey,
          {
            frames: C.playerAnimations.right.frames,
          }
        ),
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
    this.EG.scoreText.setScrollFactor(0);

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
    this.EG.gameOverText.setScrollFactor(0);
    this.EG.gameOverText.visible = false;

    // Level won text to display when player wins.
    this.EG.winText = this.add.text(
      C.winTextPositionX,
      C.winTextPositionY,
      C.winTextDefault,
      {
        fontFamily: C.headerFontFamily,
        fontSize: C.winTextFontSize,
        fill: C.winTextFill,
        stroke: C.winTextStroke,
        strokeThickness: C.winTextStrokeThickness,
      }
    );
    this.EG.winText.setScrollFactor(0);
    this.EG.winText.visible = false;

    // Audio collect star sound when player collects a star.
    this.EG.audioCollectStar = this.sound.add(C.audioCollectStarKey);

    // Audio explosion sound when player hits a bomb.
    this.EG.audioExplosion = this.sound.add(C.audioExplosionKey);

    // Audio when player loses the game.
    this.EG.audioGameOver = this.sound.add(C.audioGameOverKey);

    // Audio when player wins the game.
    this.EG.audioWin = this.sound.add(C.audioWinKey);

    // Setup keyboard handling.
    this.EG.cursors = this.input.keyboard.createCursorKeys();

    // Mouse/touch handling.
    this.input.on('pointerdown', (pointer) => {
      this.EG.cursors.right.isDown = (this.EG.player.x < pointer.x);
      this.EG.cursors.left.isDown = (this.EG.player.x > pointer.x);
      this.EG.cursors.up.isDown = (this.EG.player.y - C.playerFrameHeight > pointer.y);
    });
    this.input.on('pointerup', (pointer) => {
      this.EG.cursors.right.isDown = false;
      this.EG.cursors.left.isDown = false;
      this.EG.cursors.up.isDown = false;

      // In debug mode, output the coordinates of the pointer in the console.
      if (C.debug) console.log(`x: ${pointer.x}, y: ${pointer.y}`); /* eslint no-console: 0 */
    });

    // Set the world bounds.
    this.physics.world.bounds.width = C.worldBoundsWidth;
    this.physics.world.bounds.height = C.worldBoundsHeight;

    // Set the camera to follow the player.
    this.cameras.main.setBounds(0, 0, C.worldBoundsWidth, C.worldBoundsHeight);
    this.cameras.main.startFollow(this.EG.player);

    // At regular intervals, spawn a bomb.
    this.EG.bombSpawnIntervalId = setInterval(() => {
      this.spawnBomb();
    }, C.bombSpawnInterval);

    // Initially, spawn 1 bomb.
    this.spawnBomb();
  }

  spawnBomb() {
    const x = (this.EG.player.x < C.bombMiddleBorder) ?
      Phaser.Math.Between(C.bombMiddleBorder, C.bombRightEdge)
      : Phaser.Math.Between(C.bombLeftEdge, C.bombMiddleBorder);
    const bomb = this.EG.bombs.create(x, C.bombStartPositionY, C.bombKey);
    bomb.setBounce(C.bombBounce);
    bomb.setCollideWorldBounds(C.bombCollideWorldBounds);
    bomb.setVelocity(Phaser.Math.Between(C.bombVelocityMinLower, C.bombVelocityMaxLower), C.bombVelocityMax);
    bomb.allowGravity = C.bombAllowGravity;
  }

  // When the player has lost and the game is paused,
  // prevent the keyboard from trying to move,
  // which can lock the player in a given direction.
  resetKeyboard() {
    this.EG.cursors.left.enabled = false;
    this.EG.cursors.right.enabled = false;
    this.EG.cursors.up.enabled = false;
    this.EG.cursors.space.enabled = false;
    this.EG.cursors.down.enabled = false;
    this.EG.cursors.left.reset();
    this.EG.cursors.right.reset();
    this.EG.cursors.up.reset();
    this.EG.cursors.space.reset();
    this.EG.cursors.down.reset();
  }

  // The player has lost, reset variables.
  resetGame() {
    this.EG.score = C.scoreDefault;
    this.EG.gameOver = false;
    this.EG.win = false;
    this.EG.firstPlay = false;

    // Make sure the player has not been pushed by a bomb below the ground.
    if (this.EG.player.y > C.playerMaxY) this.EG.player.y = C.playerMaxY;
  }

  // Game loop function that gets called continuously unless a game over.
  update() {
    if (this.EG.gameOver) {
      // Player has lost a game, suspend it and reset.
      this.EG.audioGameOver.play();
      this.EG.gameOverText.visible = true;
    }

    if (this.EG.win) {
      // Player has won and will move on to the next level.
      this.EG.audioWin.play();
      this.EG.winText.visible = true;
    }

    if (this.EG.gameOver || this.EG.win) {
      clearInterval(this.EG.bombSpawnIntervalId);
      this.scene.pause();
      setTimeout(() => {
        this.resetGame();
        this.resetKeyboard();
        this.scene.restart();
      }, C.minimumDelay);
      return;
    }

    if (this.EG.cursors.left.isDown) {
      this.EG.player.flipX = false;
      this.EG.player.setVelocityX(C.playerLeftVelocityX);
      this.EG.player.anims.play(C.playerAnimations.left.key, true);
    } else if (this.EG.cursors.right.isDown) {
      this.EG.player.flipX = true;
      this.EG.player.setVelocityX(C.playerRightVelocityX);
      this.EG.player.anims.play(C.playerAnimations.right.key, true);
    } else {
      this.EG.player.setVelocityX(C.playerTurnVelocityX);
      this.EG.player.anims.play(C.playerAnimations.turn.key);
    }

    if ((this.EG.cursors.up.isDown || this.EG.cursors.space.isDown)
      && this.EG.player.body.touching.down) { // Prevent the player from jumping in mid-air. To jump player needs to rest on a hard surface.
      this.EG.player.setVelocityY(C.playerUpVelocityY);
    }

    // Spinning bombs.
    this.EG.bombs.children.entries.map(bomb => bomb.rotation += 0.1);
  }

  // Player collects a star that it overlaps.
  collectStar(player, star) {
    this.EG.audioCollectStar.play();
    star.disableBody(true, true);
    this.EG.score += C.scoreCollectStar;
    this.EG.scoreText.setText(`Score: ${this.EG.score}`);

    // When all stars have been collected, player has won and can move to the next level.
    if (this.EG.stars.countActive(true) === C.starsThresholdSpawnBomb) {
      this.physics.pause();
      this.EG.win = true;
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
