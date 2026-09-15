import Phaser from 'phaser';

export default class ResultScene extends Phaser.Scene {
  constructor() {
    super('ResultScene');
  }

  create(data) {
    const { width, height } = this.scale;
    const victory = data && data.result === 'victory';

    this.add
      .text(width / 2, height / 2 - 80, victory ? '¡Victoria!' : 'Derrota', {
        fontFamily: 'Arial',
        fontSize: '56px',
        color: victory ? '#2ecc71' : '#e74c3c',
      })
      .setOrigin(0.5);

    this.add
      .text(
        width / 2,
        height / 2,
        victory
          ? `Tiempo restante: ${Number(data.timeRemaining).toFixed(1)} s`
          : 'Se acabó el tiempo',
        { fontFamily: 'Arial', fontSize: '26px', color: '#ecf0f1' }
      )
      .setOrigin(0.5);

    this.add
      .text(width / 2, height / 2 + 90, 'ENTER para jugar de nuevo', {
        fontFamily: 'Arial',
        fontSize: '22px',
        color: '#f1c40f',
      })
      .setOrigin(0.5);

    this.input.keyboard.on('keydown-ENTER', () => {
      this.scene.start('GameScene');
    });
  }
}