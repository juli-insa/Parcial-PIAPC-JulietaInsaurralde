import Phaser from 'phaser';
import cellPath from '../game/MazePath.js';
import audio from '../audio/AudioController.js';

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
    this.startCell = maze.entry || {
      col: Math.floor(start.x / tileSize),
      row: Math.floor(start.y / tileSize),
    };
    this._pathKey = null;
    this._path = [];
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

    let blocked = false;
    if (vx !== 0) {
      if (this.canPlace(this.x + vx * deltaSec, this.y)) {
        this.x += vx * deltaSec;
      } else {
        blocked = true;
      }
    }
    if (vy !== 0) {
      if (this.canPlace(this.x, this.y + vy * deltaSec)) {
        this.y += vy * deltaSec;
      } else {
        blocked = true;
      }
    }

    if (vx < 0) this.lastDir = 'left';
    else if (vx > 0) this.lastDir = 'right';
    else if (vy < 0) this.lastDir = 'up';
    else if (vy > 0) this.lastDir = 'down';
    else if (dir === null) this.lastDir = null;

    if (blocked && dir !== null) {
      audio.playThud();
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

  getPathCells(tipCol, tipRow) {
    const key = `${tipCol}:${tipRow}`;
    if (key === this._pathKey) {
      return this._path;
    }
    this._path = cellPath(this.maze, this.startCell, { col: tipCol, row: tipRow });
    this._pathKey = key;
    return this._path;
  }

  draw() {
    const g = this.graphics;
    const tile = this.tileSize;
    g.clear();

    const origin = this.anteater ? this.anteater.snout : { x: this.x, y: this.y };
    const tipCol = Math.floor(this.x / tile);
    const tipRow = Math.floor(this.y / tile);
    const cells = this.getPathCells(tipCol, tipRow);

    const pts = [{ x: origin.x, y: origin.y }];
    for (const c of cells) {
      const px = c.col * tile + tile / 2;
      const py = c.row * tile + tile / 2;
      const lastPt = pts[pts.length - 1];
      if (Math.hypot(px - lastPt.x, py - lastPt.y) < 3) {
        continue;
      }
      pts.push({ x: px, y: py });
    }
    const lastPt = pts[pts.length - 1];
    if (Math.hypot(this.x - lastPt.x, this.y - lastPt.y) >= 3) {
      pts.push({ x: this.x, y: this.y });
    }

    const relaxed = this.lastDir === null;
    const bodyWidth = relaxed ? 9 : 12;

    let drawPts = pts;
    if (relaxed && pts.length >= 3) {
      let total = 0;
      const lens = [];
      for (let i = 1; i < pts.length; i++) {
        const L = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
        lens.push(L);
        total += L;
      }
      const keep = total * 0.85;
      let acc = 0;
      let idx = 0;
      while (idx < lens.length - 1 && acc + lens[idx] < keep) {
        acc += lens[idx];
        idx++;
      }
      const t = lens[idx] > 0 ? (keep - acc) / lens[idx] : 0;
      const cut = {
        x: pts[idx].x + (pts[idx + 1].x - pts[idx].x) * t,
        y: pts[idx].y + (pts[idx + 1].y - pts[idx].y) * t,
      };
      drawPts = pts.slice(0, idx + 1);
      drawPts.push(cut);
    }

    if (drawPts.length < 2) {
      g.fillStyle(TIP_COLOR, 1);
      g.fillCircle(this.x, this.y, this.radius);
      return;
    }

    // contorno
    g.lineStyle(bodyWidth + 4, BODY_EDGE_COLOR, 1);
    for (let i = 1; i < drawPts.length; i++) {
      g.lineBetween(drawPts[i - 1].x, drawPts[i - 1].y, drawPts[i].x, drawPts[i].y);
    }
    g.fillStyle(BODY_EDGE_COLOR, 1);
    for (const p of drawPts) {
      g.fillCircle(p.x, p.y, (bodyWidth + 4) / 2);
    }

    // cuerpo
    g.lineStyle(bodyWidth, BODY_COLOR, 1);
    for (let i = 1; i < drawPts.length; i++) {
      g.lineBetween(drawPts[i - 1].x, drawPts[i - 1].y, drawPts[i].x, drawPts[i].y);
    }
    g.fillStyle(BODY_COLOR, 1);
    for (const p of drawPts) {
      g.fillCircle(p.x, p.y, bodyWidth / 2);
    }

    // punta
    const tip = drawPts[drawPts.length - 1];
    g.fillStyle(TIP_COLOR, 1);
    g.fillCircle(tip.x, tip.y, this.radius * 1.05);
    g.fillStyle(TIP_DARK_COLOR, 1);
    g.fillCircle(tip.x, tip.y, this.radius * 0.45);
  }
}