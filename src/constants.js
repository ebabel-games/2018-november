'use strict';

module.exports = {
  debug: false,

  // The game saves performance by not running code until it stops getting called for at least x milliseconds.
  debounceDelay: 250,

  // The game needs the player to notice something and will not run for x milliseconds.
  minimumDelay: 1500,

  // Color palette. For more info, see /COLOR_PALETTE.md documentation.
  colors: [
    ['#58BBDC', '#B6E6F7', '#81D0EA', '#36A6CB', '#168DB5'],  // Primary color.
    ['#FFD060', '#FFEBB9', '#FFDC88', '#FFC63D', '#FFBB16'],  // Secondary color (1).
    ['#FF7960', '#FFC4B9', '#FF9A88', '#FF5B3D', '#FF3A16'],  // Secondary color (2).
  ],

  headerFontFamily: '\'Gill Sans\', \'Gill Sans MT\', Calibri, \'Trebuchet MS\', sans-serif',

  playerStartX: 100,
  playerStartY: 450,

  gameWidth: 800,
  gameHeight: 600,
  gravity: 300,
};
