import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 800,
  height: 600,
  backgroundColor: '#000000',
  scene: {
    create() {
      this.add
        .text(400, 300, 'Captura a la Reina', { color: '#ffffff', fontFamily: 'Arial' })
        .setOrigin(0.5);
    },
  },
};

new Phaser.Game(config);