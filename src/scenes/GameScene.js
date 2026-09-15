import Phaser from 'phaser';
import Maze from '../game/Maze.js';
import level1 from '../levels/level1.js';
import Anteater from '../objects/Anteater.js';
import Tongue from '../objects/Tongue.js';
import Bug from '../objects/Bug.js';

const TILE = 40;
const TIME_LIMIT = 60;
const CORRIDOR_COLOR = 0x3d2b1f;
const WALL_COLOR = 0x8a5a2b;
const ENTRY_COLOR = 0x2ecc71;
const QUEEN_COLOR = 0xe91e63;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    this.timeRemaining = TIME_LIMIT;
    this.gameOver = false;
    this.bugInContact = false;

    this.maze = new Maze(level1);
    this.drawMaze();
    this.drawMarker(level1.entry, ENTRY_COLOR, 'ENTRADA');
    this.drawMarker(level1.queen, QUEEN_COLOR, 'REINA');

    this.hudTimer = this.add.text(10, 10, `Tiempo: ${TIME_LIMIT}`, {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff',
    });

    const startX = level1.entry.col * TILE + TILE / 2;
    const startY = level1.entry.row * TILE + TILE / 2;

    this.anteater = new Anteater(this, { x: startX, y: startY }, TILE);
    this.tongue = new Tongue(this, this.maze, { x: startX, y: startY }, TILE);
    this.bug = new Bug(this, this.maze, TILE);
  }

  update(time, delta) {
    if (this.gameOver) {
      return;
    }

    this.timeRemaining -= delta / 1000;

    if (this.timeRemaining <= 0) {
      this.timeRemaining = 0;
      this.hudTimer.setText(`Tiempo: ${this.timeRemaining}`);
      this.endGame();
      return;
    }

    this.hudTimer.setText(`Tiempo: ${Math.ceil(this.timeRemaining)}`);
    this.tongue.update(delta);
    this.bug.update(delta);
    this.handleBugCollision();
  }

  handleBugCollision() {
    const tongue = this.tongue;
    const bug = this.bug;
    const distance = Math.hypot(tongue.x - bug.x, tongue.y - bug.y);
    const inContact = distance < tongue.radius + bug.radius;

    if (inContact && !this.bugInContact) {
      this.timeRemaining = Math.max(0, this.timeRemaining - 5);
      this.hudTimer.setText(`Tiempo: ${Math.ceil(this.timeRemaining)}`);
      if (this.timeRemaining <= 0) {
        this.endGame();
      }
    }

    this.bugInContact = inContact;
  }

  endGame() {
    this.gameOver = true;
    this.scene.start('ResultScene', { result: 'defeat' });
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