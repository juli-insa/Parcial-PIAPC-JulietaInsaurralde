import Phaser from 'phaser';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  create() {
    const { width, height } = this.scale;

    this.add
      .text(width / 2, height / 2 - 60, 'Captura a la Reina', {
        fontFamily: 'Arial',
        fontSize: '48px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height / 2 + 40, 'Presiona ENTER para comenzar', {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#f1c40f',
      })
      .setOrigin(0.5);

    this.input.keyboard.on('keydown-ENTER', () => {
      this.scene.start('ControlsScene');
    });
  }
}