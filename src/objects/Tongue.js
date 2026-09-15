import Phaser from 'phaser';

const BODY_COLOR = 0xf1948a;
const BODY_EDGE_COLOR = 0xc0392b;
const TIP_COLOR = 0xe74c3c;
const TIP_DARK_COLOR = 0x922b21;

export default class Tongue {
  constructor(scene, maze, start, tileSize, radius = 10, speed = 220, anteater = null) {
    this.scene = scene;
    this.maze = maze;
    this.tileSize = tileSize;
    this.radius = radius;
    this.speed = speed;
    this.anteater = anteater;
    this.x = start.x;
    this.y = start.y;
    this.activeDirs = [];
    this.lastDir = null;
    this.graphics = scene.add.graphics();
    this.bindKeys();
    this.draw();
  }

  get direction() {
    return this.lastDir;
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

    if (vx < 0) this.lastDir = 'left';
    else if (vx > 0) this.lastDir = 'right';
    else if (vy < 0) this.lastDir = 'up';
    else if (vy > 0) this.lastDir = 'down';
    else if (dir === null) this.lastDir = null;

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
    const g = this.graphics;
    g.clear();

    const origin = this.anteater ? this.anteater.snout : { x: this.x, y: this.y };
    const dx = this.x - origin.x;
    const dy = this.y - origin.y;
    const dist = Math.hypot(dx, dy);

    if (dist < 2) {
      g.fillStyle(TIP_COLOR, 1);
      g.fillCircle(this.x, this.y, this.radius);
      return;
    }

    // contraída (sin tecla): un poco más corta y fina
    const relaxed = this.lastDir === null;
    const bodyLen = relaxed ? dist * 0.85 : dist;
    const ex = origin.x + (dx / dist) * bodyLen;
    const ey = origin.y + (dy / dist) * bodyLen;
    const bodyWidth = relaxed ? 9 : 12;

    // cuerpo alargado de la lengua
    g.lineStyle(bodyWidth, BODY_COLOR, 1);
    g.lineBetween(origin.x, origin.y, ex, ey);
    g.fillStyle(BODY_COLOR, 1);
    g.fillCircle(origin.x, origin.y, bodyWidth / 2);
    g.fillCircle(ex, ey, bodyWidth / 2);

    // contorno sutil
    g.lineStyle(1.5, BODY_EDGE_COLOR, 0.35);
    g.lineBetween(origin.x, origin.y, ex, ey);

    // punta reconocible
    g.fillStyle(TIP_COLOR, 1);
    g.fillCircle(ex, ey, this.radius * 1.1);
    g.fillStyle(TIP_DARK_COLOR, 1);
    g.fillCircle(ex, ey, this.radius * 0.45);
  }
}