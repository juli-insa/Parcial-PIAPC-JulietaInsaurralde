import Phaser from 'phaser';
import Maze from '../game/Maze.js';
import level1 from '../levels/level1.js';

const TILE = 40;
const CORRIDOR_COLOR = 0x3d2b1f;
const WALL_COLOR = 0x8a5a2b;
const ENTRY_COLOR = 0x2ecc71;
const QUEEN_COLOR = 0xe91e63;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    this.maze = new Maze(level1);
    this.drawMaze();
    this.drawMarker(level1.entry, ENTRY_COLOR, 'ENTRADA');
    this.drawMarker(level1.queen, QUEEN_COLOR, 'REINA');
  }

  drawMaze() {
    const graphics = this.add.graphics();

    graphics.fillStyle(CORRIDOR_COLOR, 1);
    for (let row = 0; row < this.maze.height; row++) {
      for (let col = 0; col < this.maze.width; col++) {
        if (this.maze.isWalkable(col, row)) {
          graphics.fillRect(col * TILE, row * TILE, TILE, TILE);
        }
      }
    }

    graphics.fillStyle(WALL_COLOR, 1);
    for (let row = 0; row < this.maze.height; row++) {
      for (let col = 0; col < this.maze.width; col++) {
        if (this.maze.isWall(col, row)) {
          graphics.fillRect(col * TILE, row * TILE, TILE, TILE);
        }
      }
    }
  }

  drawMarker(position, color, label) {
    const x = position.col * TILE + TILE / 2;
    const y = position.row * TILE + TILE / 2;

    const graphics = this.add.graphics();
    graphics.fillStyle(color, 1);
    graphics.fillCircle(x, y, TILE / 3);

    this.add
      .text(x, y, label, {
        fontFamily: 'Arial',
        fontSize: '14px',
        color: '#ffffff',
      })
      .setOrigin(0.5);
  }
}