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
  debug: (localStorage['debug'] === 'true') ? true : false,

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

  platformKey: 'platform',
  platformAsset: 'assets/platform.svg',
  platformFrameWidth: 32,
  platformFrameHeight: 32,
  platformIsStatic: true,
  // platformsX, platformsY, platformsWidth, and platformsHeight.
  platformsX: 0,
  platformsY: 1,
  platformsWidth: 2,
  platformsHeight: 3,
  platforms: [
    {
      middle: [400, 584, 32 * 25, 32],
    },
    {
      left: [590 - (32 * 7 / 2) - (32 / 2), 435, 32, 32],
      middle: [590, 435, 32 * 7, 32],
      right: [590 + (32 * 7 / 2) + (32 / 2), 435, 32, 32],
    },
    {
      left: [400 - (32 * 3 / 2) - (32 / 2), 282, 32, 32],
      middle: [400, 282, 32 * 3, 32],
      right: [400 + (32 * 3 / 2) + (32 / 2), 282, 32, 32],
    },
    {
      left: [736 - (32 * 2 / 2) - (32 / 2), 252, 32, 32],
      middle: [736, 252, 32 * 2, 32],
      right: [736 + (32 * 2 / 2) + (32 / 2), 252, 32, 32],
    },
    {
      left: [16, 340, 32, 32],
      middle: [48, 340, 32, 32],
      right: [80, 340, 32, 32],
    },
    {
      left: [188, 240, 32, 32],
      middle: [220, 240, 32, 32],
      right: [252, 240, 32, 32],
    },
  ],
  platformsFrameKeyLeft: 0,
  platformsFrameKeyMiddle: 1,
  platformsFrameKeyRight: 2,

  playerKey: 'hero',
  playerAsset: 'assets/hero.png',
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
  playerMaxY: 544,

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
  bombIsCircle: true,

  audioWinKey: 'win',
  audioWinAssets: ['assets/kenney-sounds/coin1.ogg', 'assets/kenney-sounds/coin1.mp3'],
  audioExplosionKey: 'explosion',
  audioExplosionAssets: ['assets/kenney-sounds/explosion1.ogg', 'assets/kenney-sounds/explosion1.mp3'],
  audioGameOverKey: 'gameover',
  audioGameOverKeyAssets: ['assets/kenney-sounds/gameover3.ogg', 'assets/kenney-sounds/gameover3.mp3'],
};
