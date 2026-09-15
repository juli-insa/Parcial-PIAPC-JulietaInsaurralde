import Phaser from 'phaser';
import Maze from '../game/Maze.js';
import level1 from '../levels/level1.js';
import Anteater from '../objects/Anteater.js';
import Tongue from '../objects/Tongue.js';
import Bug, { ROUTES } from '../objects/Bug.js';
import QueenAnt from '../objects/QueenAnt.js';
import audio from '../audio/AudioController.js';

const TILE = 30;
const TIME_LIMIT = 60;

const CORRIDOR_COLOR = 0x5d4037;
const CORRIDOR_DOT_COLOR = 0x6d4c41;
const WALL_EDGE_COLOR = 0x4e342e;
const WALL_COLOR = 0x795548;
const WALL_HI_COLOR = 0x8d6e63;
const ENTRY_LIGHT_COLOR = 0xa1887f;
const ENTRY_STONE_COLOR = 0x6d4c41;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    this.timeRemaining = TIME_LIMIT;
    this.gameOver = false;
    this.bugContacts = new Set();

    this.maze = new Maze(level1);
    this.drawMaze();
    this.drawEntrance();
    this.queen = new QueenAnt(this, this.maze, TILE);

    this.hudTimer = this.add.text(10, 6, `Tiempo: ${TIME_LIMIT}`, {
      fontFamily: 'Arial',
      fontSize: '22px',
      color: '#ffffff',
    });

    const startX = level1.entry.col * TILE + TILE / 2;
    const startY = level1.entry.row * TILE + TILE / 2;

    this.anteater = new Anteater(this, { x: startX, y: startY }, TILE);
    this.tongue = new Tongue(this, this.maze, { x: startX, y: startY }, TILE, 10, 220, this.anteater);
    this.bugs = ROUTES.map((route) => new Bug(this, this.maze, TILE, route));
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
    for (const bug of this.bugs) {
      bug.update(delta);
    }
    this.handleBugCollisions();
    if (this.gameOver) {
      return;
    }
    this.handleQueenCollision();
  }

  handleQueenCollision() {
    if (this.gameOver) {
      return;
    }
    if (!(this.timeRemaining > 0)) {
      return;
    }

    const tongue = this.tongue;
    const queen = this.queen;
    const distance = Math.hypot(tongue.x - queen.x, tongue.y - queen.y);
    if (distance < tongue.radius + queen.radius) {
      this.victory();
    }
  }

  victory() {
    this.gameOver = true;
    audio.playVictory();
    this.scene.start('ResultScene', {
      result: 'victory',
      timeRemaining: this.timeRemaining,
    });
  }

  handleBugCollisions() {
    for (const bug of this.bugs) {
      const tongue = this.tongue;
      const distance = Math.hypot(tongue.x - bug.x, tongue.y - bug.y);
      const inContact = distance < tongue.radius + bug.radius;

      if (inContact && !this.bugContacts.has(bug)) {
        this.timeRemaining = Math.max(0, this.timeRemaining - 5);
        this.hudTimer.setText(`Tiempo: ${Math.ceil(this.timeRemaining)}`);
        audio.playBugHit();
        if (this.timeRemaining <= 0) {
          this.endGame();
          return;
        }
      }

      if (inContact) {
        this.bugContacts.add(bug);
      } else {
        this.bugContacts.delete(bug);
      }
    }
  }

  endGame() {
    this.gameOver = true;
    audio.playDefeat();
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

    // textura de tierra en corredores (patrón determinista)
    graphics.fillStyle(CORRIDOR_DOT_COLOR, 1);
    for (let row = 0; row < this.maze.height; row++) {
      for (let col = 0; col < this.maze.width; col++) {
        if (!this.maze.isWalkable(col, row)) {
          continue;
        }
        const hash = (col * 2654435761) ^ ((row + 1) * 40503);
        if ((hash & 7) === 0) graphics.fillRect(col * TILE + 6, row * TILE + 7, 3, 3);
        if ((hash & 9) === 0) graphics.fillRect(col * TILE + 20, row * TILE + 20, 3, 3);
        if ((hash & 11) === 0) graphics.fillRect(col * TILE + 12, row * TILE + 25, 3, 3);
      }
    }

    // paredes: borde oscuro + cuerpo + centro claro (profundidad)
    for (const [color, inset] of [
      [WALL_EDGE_COLOR, 0],
      [WALL_COLOR, 3],
      [WALL_HI_COLOR, 6],
    ]) {
      graphics.fillStyle(color, 1);
      for (let row = 0; row < this.maze.height; row++) {
        for (let col = 0; col < this.maze.width; col++) {
          if (this.maze.isWall(col, row)) {
            graphics.fillRect(
              col * TILE + inset,
              row * TILE + inset,
              TILE - inset * 2,
              TILE - inset * 2
            );
          }
        }
      }
    }
  }

  drawEntrance() {
    const x = level1.entry.col * TILE + TILE / 2;
    const y = level1.entry.row * TILE + TILE / 2;
    const graphics = this.add.graphics();

    // montículo de tierra removida sobre el acceso
    graphics.fillStyle(ENTRY_LIGHT_COLOR, 1);
    graphics.fillCircle(x, y - TILE / 2 + 3, TILE * 0.42);

    // piedritas que marcan el acceso
    graphics.fillStyle(ENTRY_STONE_COLOR, 1);
    graphics.fillCircle(x - TILE * 0.32, y + TILE * 0.12, 3);
    graphics.fillCircle(x + TILE * 0.3, y - TILE * 0.25, 3);
    graphics.fillCircle(x + TILE * 0.15, y + TILE * 0.18, 2.2);
  }
}