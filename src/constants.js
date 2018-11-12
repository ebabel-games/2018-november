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

  // World bounds can be greater than canvas gameWidth and gameHeight,
  // so the camera can move to new areas beyond the initial screen area.
  worldBoundsWidth: 800,
  worldBoundsHeight: 1200,

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
  starsMinBounceY: 0.2,
  starsMaxBounceY: 0.4,
  starsThresholdSpawnBomb: 0,

  platformKey: 'platform',
  platformAsset: 'assets/platform.svg',
  platformFrameWidth: 32,
  platformFrameHeight: 32,
  platformIsStatic: true,
  // platformsX, platformsY, platformsWidth, platformsHeight, and platformsFrame.
  platformsX: 0,
  platformsY: 1,
  platformsWidth: 2,
  platformsHeight: 3,
  platformsFrame: 4,
  platforms: [
    // Ground.
    [400, 1184, 32 * 25, 32, 1],

    // Lowest block.
    [462, 1035, 32, 32, 0],   // 462 = 590 - (32 * 7 / 2) - (32 / 2)
    [590, 1035, 224, 32, 1],  // 224 = 32 * 7
    [718, 1035, 32, 32, 2],   // 718 = 590 + (32 * 7 / 2) + (32 / 2)

    [16, 940, 32, 32, 0],
    [48, 940, 32, 32, 1],
    [80, 940, 32, 32, 2],
    
    [336, 882, 32, 32, 0],
    [400, 882, 96, 32, 1],
    [464, 882, 32, 32, 2],

    [688, 852, 32, 32, 0],
    [736, 852, 64, 32, 1],
    [784, 852, 32, 32, 2],

    [188, 840, 32, 32, 0],
    [220, 840, 32, 32, 1],
    [252, 840, 32, 32, 2],

    // Middle block.
    [462, 735, 32, 32, 0],
    [590, 735, 224, 32, 1],
    [718, 735, 32, 32, 2],

    [16, 640, 32, 32, 0],
    [48, 640, 32, 32, 1],
    [80, 640, 32, 32, 2],
    
    [336, 582, 32, 32, 0],
    [400, 582, 96, 32, 1],
    [464, 582, 32, 32, 2],

    [688, 552, 32, 32, 0],
    [736, 552, 64, 32, 1],
    [784, 552, 32, 32, 2],

    [188, 540, 32, 32, 0],
    [220, 540, 32, 32, 1],
    [252, 540, 32, 32, 2],

    // Upper block.
    [462, 435, 32, 32, 0],
    [590, 435, 224, 32, 1],
    [718, 435, 32, 32, 2],

    [16, 340, 32, 32, 0],
    [48, 340, 32, 32, 1],
    [80, 340, 32, 32, 2],
    
    [336, 282, 32, 32, 0],
    [400, 282, 96, 32, 1],
    [464, 282, 32, 32, 2],

    [688, 252, 32, 32, 0],
    [736, 252, 64, 32, 1],
    [784, 252, 32, 32, 2],

    [188, 240, 32, 32, 0],
    [220, 240, 32, 32, 1],
    [252, 240, 32, 32, 2],
  ],
  platformsFrameKeyLeft: 0,
  platformsFrameKeyMiddle: 1,
  platformsFrameKeyRight: 2,

  playerKey: 'hero',
  playerAsset: 'assets/hero.png',
  playerFrameWidth: 32,
  playerFrameHeight: 48,
  playerStartX: 120,
  playerStartY: 1000,
  playerGravity: 30,
  playerBounce: 0.2,
  playerCollideWorldBounds: true,
  playerLeftVelocityX: -160,
  playerRightVelocityX: 160,
  playerTurnVelocityX: 0,
  playerUpVelocityY: -330,
  playerDeadTint: colors0x[1][0],
  playerMaxY: 544,

  playerAnimations: {
    left: {
      key: 'left',
      frames: [0, 1, 2, 3],
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
      frames: [0, 1, 2, 3],
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
