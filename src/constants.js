'use strict';

// Color palette. For more info, see /COLOR_PALETTE.md documentation.
const colors = [
  ['#58BBDC', '#B6E6F7', '#81D0EA', '#36A6CB', '#168DB5'],  // Primary color.
  ['#FFD060', '#FFEBB9', '#FFDC88', '#FFC63D', '#FFBB16'],  // Secondary color (1).
  ['#FF7960', '#FFC4B9', '#FF9A88', '#FF5B3D', '#FF3A16'],  // Secondary color (2).
];

const colors0x = [
  [0x58BBDC, 0xB6E6F7, 0x81D0EA, 0x36A6CB, 0x168DB5],  // Primary color.
  [0xFFD060, 0xFFEBB9, 0xFFDC88, 0xFFC63D, 0xFFBB16],  // Secondary color (1).
  [0xFF7960, 0xFFC4B9, 0xFF9A88, 0xFF5B3D, 0xFF3A16],  // Secondary color (2).
];

module.exports = {
  debug: false,

  scoreDefault: 0,
  scoreCollectStar: 10,

  // The game saves performance by not running code until it stops getting called for at least x milliseconds.
  debounceDelay: 250,

  // The game needs the player to notice something and will not run for x milliseconds.
  minimumDelay: 1500,

  colors,
  colors0x,

  headerFontFamily: '\'Gill Sans\', \'Gill Sans MT\', Calibri, \'Trebuchet MS\', sans-serif',

  gameWidth: 800,
  gameHeight: 600,
  gravity: 300,

  skyKey: 'sky',
  skyAsset: 'assets/sky.svg',
  skyPositionX: 400,
  skyPositionY: 300,

  starsKey: 'star',
  starsAsset: 'assets/star.svg',
  starsRepeat: 11,
  starsPositionX: 14,
  starsPositionY: 60,
  starsPositionStepX: 70,
  starsMinBounceY: 0.4,
  starsMaxBounceY: 0.8,
  starsThresholdSpawnBomb: 0,

  groundPlatformX: 400,
  groundPlatformY: 568,
  groundPlatformScale: 2,

  platformsKey: 'ground',
  platformsAsset: 'assets/platform.webp',
  platforms: [
    [600, 400],
    [50, 250],
    [730, 220],
  ],

  playerKey: 'dude',
  playerAsset: 'assets/dude.png',
  playerFrameWidth: 32,
  playerFrameHeight: 48,
  playerStartX: 100,
  playerStartY: 450,
  playerGravity: 30,
  playerBounce: 0.2,
  playerCollideWorldBounds: true,
  playerLeftVelocityX: -160,
  playerRightVelocityX: 160,
  playerTurnVelocityX: 0,
  playerDownVelocityY: -330,
  playerDeadTint: colors0x[1][0],

  playerAnimations: {
    left: {
      key: 'left',
      start: 0,
      end: 3,
      frameRate: 10,
      repeat: -1,
    },
    turn: {
      key: 'turn',
      frame: 4,
      frameRate: 20,
    },
    right: {
      key: 'right',
      start: 5,
      end: 8,
      frameRate: 10,
      repeat: -1,
    },
  },

  scoreTextPositionX: 8,
  scoreTextPositionY: 4,
  scoreTextDefault: 'Score: 0',
  scoreTextFontSize: '32px',
  scoreTextFill: colors[1][0],

  gameOverTextPositionX: 132,
  gameOverTextPositionY: 200,
  gameOverTextDefault: 'Game Over',
  gameOverTextFontSize: '120px',
  gameOverTextFill: colors[1][3],
  gameOverTextStroke: colors[2][0],
  gameOverTextStrokeThickness: 12,

  bombLeftEdge: 0,
  bombMiddleBorder: 400,
  bombRightEdge: 800,
  bombKey: 'bomb',
  bombAsset: 'assets/bomb.svg',
  bombStartPositionY: 16,
  bombBounce: 1,
  bombCollideWorldBounds: true,
  bombVelocityMinLower: -200,
  bombVelocityMaxLower: 200,
  bombVelocityMax: 20,
  bombAllowGravity: false,

  audioWinKey: 'win',
  audioWinAssets: ['assets/kenney-sounds/coin1.ogg', 'assets/kenney-sounds/coin1.mp3'],
  audioExplosionKey: 'explosion',
  audioExplosionAssets: ['assets/kenney-sounds/explosion1.ogg', 'assets/kenney-sounds/explosion1.mp3'],
  audioGameOverKey: 'gameover',
  audioGameOverKeyAssets: ['assets/kenney-sounds/gameover3.ogg', 'assets/kenney-sounds/gameover3.mp3'],
};
