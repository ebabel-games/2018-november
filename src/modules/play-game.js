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
      score: 0,
      scoreText: null,
      bombs: null,
      gameOver: false,
      gameOverText: null,
      firstPlay: true,
    };
  }

  create() {
    // Static element: the Sky.
    this.add.image(400, 300, 'sky');

    // Bouncing stars to collect.
    this.EG.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 14, y: 60, stepX: 70 }
    });
    this.EG.stars.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    // Static platforms.
    this.EG.platforms = this.physics.add.staticGroup();
    this.EG.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.EG.platforms.create(600, 400, 'ground');
    this.EG.platforms.create(50, 250, 'ground');
    this.EG.platforms.create(730, 220, 'ground');
    this.physics.add.collider(this.EG.stars, this.EG.platforms);

    // Setup main player sprite.
    const playerX = (this.EG.firstPlay) ? C.playerStartX : this.EG.player.x;  // Default x position of player or previous game x position.
    const playerY = (this.EG.firstPlay) ? C.playerStartY : this.EG.player.y;  // Same for y.
    this.EG.player = this.physics.add.sprite(playerX, playerY, 'dude');
    this.EG.player.body.setGravityY(30);
    this.EG.player.setBounce(0.2);
    this.EG.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.EG.player, this.EG.platforms);

    // Check if player overlaps a star.
    this.physics.add.overlap(this.EG.player, this.EG.stars, this.collectStar, null, this);

    // Bombs that can kill the player.
    this.EG.bombs = this.physics.add.group();
    this.physics.add.collider(this.EG.bombs, this.EG.platforms);
    this.physics.add.collider(this.EG.player, this.EG.bombs, this.hitBomb, null, this);

    // Setup animations of the player sprite.
    if (this.EG.firstPlay) {
      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
      });
      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
      });
    }

    // Setup the score display.
    this.EG.scoreText = this.add.text(8, 4, 'Score: 0', {
      fontSize: '32px',
      fill: '#FFD060',
    });

    // Game Over text to display when player loses.
    this.EG.gameOverText = this.add.text(132, 200, 'Game Over', {
      fontFamily: C.headerFontFamily,
      fontSize: '120px',
      fontWeight: 'bold',
      fill: C.colors[1][3],
      stroke: C.colors[2][0],
      strokeThickness: 12,
    });
    this.EG.gameOverText.visible = false;

    // Setup keyboard handling.
    this.EG.cursors = this.input.keyboard.createCursorKeys();
  }

  // When the player has lost and the game is paused, prevent the keyboard from trying to move, which can lock the player in a given direction.
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
    this.EG.score = 0;
    this.EG.gameOver = false;
    this.EG.firstPlay = false;
  }

  // Game loop function that gets called continuously unless a game over.
  update() {
    if (this.EG.gameOver) {
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
      this.EG.player.setVelocityX(-160);
      this.EG.player.anims.play('left', true);
    } else if (this.EG.cursors.right.isDown) {
      this.EG.player.setVelocityX(160);
      this.EG.player.anims.play('right', true);
    } else {
      this.EG.player.setVelocityX(0);
      this.EG.player.anims.play('turn');
    }

    if (this.EG.cursors.up.isDown && this.EG.player.body.touching.down) {
      this.EG.player.setVelocityY(-330);
    }
  }

  // Player collects a star that it overlaps.
  collectStar(player, star) {
    star.disableBody(true, true);
    this.EG.score += 10;
    this.EG.scoreText.setText('Score: ' + this.EG.score);

    // When all stars have been collected, add a new bomb and respawn all stars.
    if (this.EG.stars.countActive(true) === 0) {
      this.EG.stars.children.iterate((child) => {
        child.enableBody(true, child.x, 0, true, true);
      });

      // Spawn the new bomb either in the right or left part of the scene, where the player isn't.
      const x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
      const bomb = this.EG.bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;
    }
  }

  // Player has hit a bomb.
  hitBomb(player, bomb) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    bomb.setScale(2);
    this.EG.gameOver = true;
  }
}

export default PlayGame;
