import Phaser from 'phaser';

export default class ControlsScene extends Phaser.Scene {
  constructor() {
    super('ControlsScene');
  }

  create() {
    const { width, height } = this.scale;

    this.add
      .text(width / 2, height / 2 - 150, 'Controles', {
        fontFamily: 'Arial',
        fontSize: '40px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height / 2 - 70, 'Mover la lengua: flechas  ↑ ↓ ← →', {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#ecf0f1',
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height / 2 - 20, 'Solo cuatro direcciones: sin diagonales', {
        fontFamily: 'Arial',
        fontSize: '20px',
        color: '#bdc3c7',
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height / 2 + 30, 'Teclado únicamente', {
        fontFamily: 'Arial',
        fontSize: '20px',
        color: '#bdc3c7',
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height / 2 + 120, 'ENTER inicia la partida', {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#f1c40f',
      })
      .setOrigin(0.5);

    this.input.keyboard.on('keydown-ENTER', () => {
      this.scene.start('GameScene');
    });
  }
}