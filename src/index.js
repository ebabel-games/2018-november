import 'phaser';

window.addEventListener('load', () => {
  var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: 0xccccff,
    scene: {
      preload: preload,
      create: create
    }
  };

  var game = new Phaser.Game(config);

  function preload() {
    this.load.image('logo', 'assets/logo.png');
  }

  function create() {
    const logo = this.add.image(400, 300, 'logo');
  }

  const resizeGame = () => {
    const canvas = document.querySelector('body > canvas');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const windowRatio = windowWidth / windowHeight;
    const gameRatio = game.config.width / game.config.height;

    if (windowRatio < gameRatio) {
      canvas.style.width = `${windowWidth}px`;
      canvas.style.height = `${(windowWidth / gameRatio)}px`;
    } else {
      canvas.style.width = `${(windowHeight * gameRatio)}px`;
      canvas.style.height = `${windowHeight}px`;
    }
  }

  window.focus();
  resizeGame();

  window.addEventListener('resize', resizeGame);
});
