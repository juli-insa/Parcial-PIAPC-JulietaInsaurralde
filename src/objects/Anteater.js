import Phaser from 'phaser';

const BODY_COLOR = 0x6d4c41;
const HEAD_COLOR = 0x8d6e63;

export default class Anteater {
  constructor(scene, position, tileSize) {
    this.scene = scene;
    this.position = position;
    this.graphics = scene.add.graphics();
    this.draw(tileSize);
  }

  draw(tileSize) {
    const graphics = this.graphics;
    const x = this.position.x;
    const y = this.position.y;

    graphics.clear();
    graphics.fillStyle(BODY_COLOR, 1);
    graphics.fillCircle(x - tileSize * 0.4, y, tileSize * 0.38);
    graphics.fillCircle(x - tileSize * 0.1, y, tileSize * 0.28);
    graphics.fillStyle(HEAD_COLOR, 1);
    graphics.fillCircle(x, y, tileSize * 0.18);

    this.label = this.scene.add
      .text(x - tileSize * 0.35, y + tileSize * 0.55, 'OSO', {
        fontFamily: 'Arial',
        fontSize: '12px',
        color: '#ffffff',
      })
      .setOrigin(0.5);
  }
}