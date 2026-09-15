import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    const { width, height } = this.scale;

    this.add
      .text(width / 2, height / 2 - 40, 'El juego comenzó', {
        fontFamily: 'Arial',
        fontSize: '40px',
        color: '#2ecc71',
      })
      .setOrigin(0.5);

    this.add
      .text(
        width / 2,
        height / 2 + 40,
        'Pantalla provisional: el nivel se implementa en bloques posteriores',
        { fontFamily: 'Arial', fontSize: '18px', color: '#7f8c8d' }
      )
      .setOrigin(0.5);

    // TEST (Bloque 2, temporal): mecanismo aislado para verificar ResultScene.
    // No es gameplay. Eliminar cuando exista victoria/derrota real.
    this.input.keyboard.on('keydown-R', () => {
      this.scene.start('ResultScene', { result: 'victory', timeRemaining: 42 });
    });
    this.input.keyboard.on('keydown-T', () => {
      this.scene.start('ResultScene', { result: 'defeat' });
    });
  }
}