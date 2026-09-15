import Phaser from 'phaser';

const OUTER_COLOR = 0xec7063;
const TIP_COLOR = 0xe74c3c;

export default class Tongue {
  constructor(scene, maze, start, tileSize, radius = 10, speed = 220) {
    this.scene = scene;
    this.maze = maze;
    this.tileSize = tileSize;
    this.radius = radius;
    this.speed = speed;
    this.x = start.x;
    this.y = start.y;
    this.activeDirs = [];
    this.graphics = scene.add.graphics();
    this.bindKeys();
    this.draw();
  }

  bindKeys() {
    const bindings = [
      [Phaser.Input.Keyboard.KeyCodes.UP, 'up'],
      [Phaser.Input.Keyboard.KeyCodes.DOWN, 'down'],
      [Phaser.Input.Keyboard.KeyCodes.LEFT, 'left'],
      [Phaser.Input.Keyboard.KeyCodes.RIGHT, 'right'],
    ];

    for (const [keyCode, dir] of bindings) {
      const key = this.scene.input.keyboard.addKey(keyCode);
      key.on('down', () => this.pressDir(dir));
      key.on('up', () => this.releaseDir(dir));
    }
  }

  pressDir(dir) {
    this.activeDirs = this.activeDirs.filter((d) => d !== dir);
    this.activeDirs.push(dir);
  }

  releaseDir(dir) {
    this.activeDirs = this.activeDirs.filter((d) => d !== dir);
  }

  update(delta) {
    const deltaSec = delta / 1000;
    const dir = this.activeDirs[this.activeDirs.length - 1];

    let vx = 0;
    let vy = 0;
    if (dir === 'left') vx = -this.speed;
    else if (dir === 'right') vx = this.speed;
    else if (dir === 'up') vy = -this.speed;
    else if (dir === 'down') vy = this.speed;

    if (this.canPlace(this.x + vx * deltaSec, this.y)) {
      this.x += vx * deltaSec;
    }
    if (this.canPlace(this.x, this.y + vy * deltaSec)) {
      this.y += vy * deltaSec;
    }

    this.draw();
  }

  canPlace(x, y) {
    const size = this.radius * 2;
    return !this.maze.pixelRectOverlapsWall(
      x - this.radius,
      y - this.radius,
      size,
      size,
      this.tileSize
    );
  }

  draw() {
    const graphics = this.graphics;
    graphics.clear();
    graphics.fillStyle(OUTER_COLOR, 1);
    graphics.fillCircle(this.x, this.y, this.radius);
    graphics.fillStyle(TIP_COLOR, 1);
    graphics.fillCircle(this.x, this.y, this.radius * 0.55);
  }
}