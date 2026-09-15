const SHELL_COLOR = 0x283747;
const SHELL_GLOSS = 0x5d6d7e;
const HEAD_COLOR = 0x17202a;
const SPOT_COLOR = 0x85929e;
const LEG_COLOR = 0x17202a;
const ANTENNA_COLOR = 0x17202a;
const EYE_COLOR = 0xecf0f1;

const ROUTE = [
  { col: 2, row: 1 },
  { col: 3, row: 1 },
  { col: 4, row: 1 },
  { col: 5, row: 1 },
  { col: 6, row: 1 },
  { col: 7, row: 1 },
  { col: 8, row: 1 },
  { col: 9, row: 1 },
  { col: 8, row: 1 },
  { col: 7, row: 1 },
  { col: 6, row: 1 },
  { col: 5, row: 1 },
  { col: 4, row: 1 },
  { col: 3, row: 1 },
  { col: 2, row: 1 },
];

const ROUTE_A = [
  { col: 21, row: 3 },
  { col: 21, row: 4 },
  { col: 21, row: 5 },
  { col: 21, row: 6 },
  { col: 21, row: 7 },
  { col: 21, row: 8 },
  { col: 21, row: 9 },
  { col: 21, row: 10 },
  { col: 21, row: 11 },
  { col: 21, row: 12 },
  { col: 21, row: 13 },
  { col: 21, row: 14 },
  { col: 21, row: 15 },
  { col: 21, row: 16 },
  { col: 21, row: 15 },
  { col: 21, row: 14 },
  { col: 21, row: 13 },
  { col: 21, row: 12 },
  { col: 21, row: 11 },
  { col: 21, row: 10 },
  { col: 21, row: 9 },
  { col: 21, row: 8 },
  { col: 21, row: 7 },
  { col: 21, row: 6 },
  { col: 21, row: 5 },
  { col: 21, row: 4 },
  { col: 21, row: 3 },
];

const ROUTE_B = [
  { col: 9, row: 13 },
  { col: 10, row: 13 },
  { col: 11, row: 13 },
  { col: 12, row: 13 },
  { col: 13, row: 13 },
  { col: 14, row: 13 },
  { col: 15, row: 13 },
  { col: 16, row: 13 },
  { col: 17, row: 13 },
  { col: 18, row: 13 },
  { col: 19, row: 13 },
  { col: 20, row: 13 },
  { col: 21, row: 13 },
  { col: 22, row: 13 },
  { col: 23, row: 13 },
  { col: 24, row: 13 },
  { col: 25, row: 13 },
  { col: 24, row: 13 },
  { col: 23, row: 13 },
  { col: 22, row: 13 },
  { col: 21, row: 13 },
  { col: 20, row: 13 },
  { col: 19, row: 13 },
  { col: 18, row: 13 },
  { col: 17, row: 13 },
  { col: 16, row: 13 },
  { col: 15, row: 13 },
  { col: 14, row: 13 },
  { col: 13, row: 13 },
  { col: 12, row: 13 },
  { col: 11, row: 13 },
  { col: 10, row: 13 },
  { col: 9, row: 13 },
];

const ROUTE_C = [
  { col: 5, row: 4 },
  { col: 6, row: 4 },
  { col: 7, row: 4 },
  { col: 8, row: 4 },
  { col: 9, row: 4 },
  { col: 9, row: 5 },
  { col: 9, row: 6 },
  { col: 9, row: 7 },
  { col: 9, row: 6 },
  { col: 9, row: 5 },
  { col: 9, row: 4 },
  { col: 8, row: 4 },
  { col: 7, row: 4 },
  { col: 6, row: 4 },
  { col: 5, row: 4 },
];

export default class Bug {
  constructor(scene, maze, tileSize, route = ROUTE, speed = 90, radius = 14) {
    this.scene = scene;
    this.maze = maze;
    this.tileSize = tileSize;
    this.speed = speed;
    this.radius = radius;
    this.route = route.map((point) => ({
      x: point.col * tileSize + tileSize / 2,
      y: point.row * tileSize + tileSize / 2,
    }));
    this.index = 0;
    this.x = this.route[0].x;
    this.y = this.route[0].y;
    this._lastX = this.x;
    this._lastY = this.y;
    this.graphics = scene.add.graphics();
    this.draw();
  }

  get cell() {
    return {
      col: Math.round((this.x - this.tileSize / 2) / this.tileSize),
      row: Math.round((this.y - this.tileSize / 2) / this.tileSize),
    };
  }

  update(delta) {
    const target = this.route[this.index];
    const deltaSec = delta / 1000;
    const dx = target.x - this.x;
    const dy = target.y - this.y;
    const dist = Math.hypot(dx, dy);
    const step = this.speed * deltaSec;

    if (dist <= step) {
      this.x = target.x;
      this.y = target.y;
      this.index = (this.index + 1) % this.route.length;
    } else {
      this.x += (dx / dist) * step;
      this.y += (dy / dist) * step;
    }

    this.draw();
  }

  draw() {
    const g = this.graphics;
    g.clear();

    // dirección de avance (puramente visual)
    const mx = this.x - this._lastX;
    const my = this.y - this._lastY;
    const ml = Math.hypot(mx, my);
    const fx = ml > 0.01 ? mx / ml : 1;
    const fy = ml > 0.01 ? my / ml : 0;
    this._lastX = this.x;
    this._lastY = this.y;

    const hx = this.x + fx * 9;
    const hy = this.y + fy * 9;
    const px = -fy;
    const py = fx;

    // patas (6)
    g.lineStyle(2.5, LEG_COLOR, 1);
    for (const side of [-1, 1]) {
      for (let i = -1; i <= 1; i++) {
        const ax = this.x + px * side * 4 + fx * i * 5;
        const ay = this.y + py * side * 4 + fy * i * 5;
        g.lineBetween(ax, ay, ax + px * side * 8, ay + py * side * 8);
      }
    }

    // caparazón
    g.fillStyle(SHELL_COLOR, 1);
    g.fillCircle(this.x, this.y, this.radius);
    g.fillStyle(SPOT_COLOR, 1);
    g.fillCircle(this.x, this.y, this.radius * 0.4);

    // brillo del caparazón
    g.fillStyle(SHELL_GLOSS, 0.7);
    g.fillCircle(this.x - fy * 4 - 4, this.y + fx * 4 - 4, 4.5);

    // cabeza
    g.fillStyle(HEAD_COLOR, 1);
    g.fillCircle(hx, hy, 6);

    // antenas
    g.lineStyle(1.5, ANTENNA_COLOR, 1);
    for (const side of [-1, 1]) {
      const bend = side * 0.6;
      g.lineBetween(hx, hy, hx + fx * 8 + px * bend * 3, hy + fy * 8 + py * bend * 3);
      g.fillCircle(hx + fx * 8 + px * bend * 3, hy + fy * 8 + py * bend * 3, 1.5);
    }

    // ojos
    g.fillStyle(EYE_COLOR, 1);
    g.fillCircle(hx + px * 2, hy + py * 2, 1.3);
    g.fillCircle(hx - px * 2, hy - py * 2, 1.3);
  }
}

const ROUTES = [ROUTE, ROUTE_A, ROUTE_B, ROUTE_C];

export { ROUTE, ROUTES };