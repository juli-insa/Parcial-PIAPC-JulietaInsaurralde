const HEAD_COLOR = 0x880e4f;
const THORAX_COLOR = 0xe91e63;
const ABDOMEN_COLOR = 0xe91e63;
const ABDOMEN_BAND = 0xf8bbd0;
const EYE_COLOR = 0x1a1a1a;
const LEG_COLOR = 0xad1457;
const ANTENNA_COLOR = 0xad1457;
const CROWN_COLOR = 0xf1c40f;

export default class QueenAnt {
  constructor(scene, maze, tileSize, radius = 16) {
    this.scene = scene;
    this.maze = maze;
    this.tileSize = tileSize;
    this.radius = radius;
    this.position = maze.queen;
    this.x = this.position.col * tileSize + tileSize / 2;
    this.y = this.position.row * tileSize + tileSize / 2;
    this.graphics = scene.add.graphics();
    this.draw();
  }

  draw() {
    const g = this.graphics;
    const x = this.x;
    const y = this.y;
    g.clear();

    // patas (6)
    g.lineStyle(2.5, LEG_COLOR, 1);
    for (const side of [-1, 1]) {
      for (let i = -1; i <= 1; i++) {
        const sx = x + i * 3;
        g.lineBetween(sx, y - 2, sx - 4, y + side * 6);
      }
    }

    // abdomen grande (hacia la derecha, alejado del borde)
    g.fillStyle(ABDOMEN_COLOR, 1);
    g.fillEllipse(x + 7, y + 1, 16, 13);
    g.fillStyle(ABDOMEN_BAND, 1);
    g.fillEllipse(x + 2, y + 1, 6, 12);
    g.fillEllipse(x + 11, y + 1, 4, 9);

    // tórax
    g.fillStyle(THORAX_COLOR, 1);
    g.fillCircle(x - 1, y, 5.5);

    // cabeza (hacia la izquierda)
    g.fillStyle(HEAD_COLOR, 1);
    g.fillCircle(x - 10, y - 1, 6);

    // antenas
    g.lineStyle(1.5, ANTENNA_COLOR, 1);
    for (const side of [-1, 1]) {
      g.lineBetween(x - 13, y - 4, x - 20, y - 8 + side * 2);
      g.fillCircle(x - 20, y - 8 + side * 2, 1.5);
    }

    // ojos
    g.fillStyle(EYE_COLOR, 1);
    g.fillCircle(x - 13, y - 1, 1.4);
    g.fillCircle(x - 8, y - 1, 1.4);

    // corona distintiva de reina
    g.fillStyle(CROWN_COLOR, 1);
    g.fillTriangle(x - 4, y - 5, x, y - 2, x, y - 8);
    g.fillTriangle(x, y - 2, x + 4, y - 5, x, y - 8);
    g.fillCircle(x - 3, y - 8, 1.4);
    g.fillCircle(x + 3, y - 8, 1.4);

    this.label = this.scene.add
      .text(x, y + this.radius + 8, 'REINA', {
        fontFamily: 'Arial',
        fontSize: '12px',
        color: '#ffffff',
      })
      .setOrigin(0.5);
  }
}