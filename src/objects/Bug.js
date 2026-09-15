const OUTER_COLOR = 0x283747;
const SPOT_COLOR = 0x85929e;

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
    const graphics = this.graphics;
    graphics.clear();
    graphics.fillStyle(OUTER_COLOR, 1);
    graphics.fillCircle(this.x, this.y, this.radius);
    graphics.fillStyle(SPOT_COLOR, 1);
    graphics.fillCircle(this.x, this.y, this.radius * 0.4);
  }
}

export { ROUTE };