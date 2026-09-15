const OUTER_COLOR = 0xe91e63;
const INNER_COLOR = 0xf8bbd0;

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
    const graphics = this.graphics;
    graphics.clear();
    graphics.fillStyle(OUTER_COLOR, 1);
    graphics.fillCircle(this.x, this.y, this.radius);
    graphics.fillStyle(INNER_COLOR, 1);
    graphics.fillCircle(this.x, this.y, this.radius * 0.5);

    this.label = this.scene.add
      .text(this.x, this.y + this.radius + 10, 'REINA', {
        fontFamily: 'Arial',
        fontSize: '14px',
        color: '#ffffff',
      })
      .setOrigin(0.5);
  }
}