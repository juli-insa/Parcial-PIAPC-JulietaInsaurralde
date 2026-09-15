import Phaser from 'phaser';
import audio from '../audio/AudioController.js';

const COL = {
  base: 0x5d4037,
  band: 0x6d4c41,
  ground: 0x3e2723,
  groundLight: 0x4e342e,
  grain: 0x795548,
  mound: 0x6d4c41,
  moundDark: 0x4a3732,
  tunnel: 0x1f1512,
  leaf: 0x81c784,
  leafDark: 0x4caf50,
  stone: 0x9e9e9e,
  stoneDark: 0x757575,
  cream: 0xfff3e0,
  creamSoft: 0xffe0b2,
  gold: 0xf1c40f,
  dark: 0x2b1a16,
  antHead: 0x880e4f,
  antBody: 0xe91e63,
  body: 0x795548,
  belly: 0x8d6e63,
  tail: 0x4e342e,
  head: 0x6d4c41,
  nose: 0x3e2723,
  bugShell: 0x283747,
  bugSpot: 0x85929e,
  bugHead: 0x17202a,
};

const PARTICLES = [
  { x: 120, y: 380, r: 3 },
  { x: 250, y: 520, r: 2.5 },
  { x: 370, y: 300, r: 3 },
  { x: 510, y: 440, r: 2 },
  { x: 640, y: 350, r: 3 },
  { x: 760, y: 510, r: 2.5 },
  { x: 830, y: 390, r: 2.5 },
  { x: 95, y: 480, r: 2 },
];

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  create() {
    const { width, height } = this.scale;
    const groundY = 470;

    this.drawBackground(width, height, groundY);
    this.drawMoundWithQueen(770, groundY);
    this.drawAnteater(150, groundY);
    this.spawnWalkingBug();
    this.spawnParticles();

    this.add
      .text(width / 2, 168, 'CAPTURA A LA REINA', {
        fontFamily: 'Arial',
        fontSize: '58px',
        fontStyle: 'bold',
        color: '#fff3e0',
        stroke: '#2b1a16',
        strokeThickness: 9,
      })
      .setOrigin(0.5);

    const bar = this.add.graphics();
    bar.fillStyle(COL.gold, 1);
    bar.fillRoundedRect(width / 2 - 160, 214, 320, 6, 3);

    const prompt = this.add
      .text(width / 2, 330, 'PRESIONA ENTER PARA COMENZAR', {
        fontFamily: 'Arial',
        fontSize: '27px',
        fontStyle: 'bold',
        color: '#f1c40f',
        stroke: '#2b1a16',
        strokeThickness: 5,
      })
      .setOrigin(0.5);
    this.tweens.add({
      targets: prompt,
      scale: { from: 1, to: 1.07 },
      duration: 900,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.InOut',
    });

    const frame = this.add.graphics();
    frame.lineStyle(3, COL.cream, 0.35);
    frame.strokeRoundedRect(10, 10, width - 20, height - 20, 16);

    this.input.keyboard.on('keydown-ENTER', () => {
      audio.init();
      audio.startMusic();
      this.scene.start('ControlsScene');
    });
  }

  drawBackground(width, height, groundY) {
    const g = this.add.graphics();

    g.fillStyle(COL.base, 1);
    g.fillRect(0, 0, width, height);

    g.fillStyle(COL.band, 1);
    for (let i = 0; i < 8; i++) {
      g.fillRect(0, 60 + i * 52, width, 14);
    }

    g.fillStyle(COL.ground, 1);
    g.fillRect(0, groundY, width, height - groundY);
    g.fillStyle(COL.groundLight, 1);
    g.fillRect(0, groundY - 4, width, 12);

    g.fillStyle(COL.grain, 1);
    for (const [x, y] of [
      [30, 545],
      [120, 570],
      [300, 555],
      [470, 548],
      [620, 568],
      [780, 550],
      [850, 575],
    ]) {
      g.fillRect(x, y, 5, 4);
      g.fillRect(x + 11, y + 7, 4, 3);
    }

    g.fillStyle(COL.stone, 1);
    g.fillCircle(80, groundY + 26, 16);
    g.fillCircle(96, groundY + 40, 11);
    g.fillStyle(COL.stoneDark, 1);
    g.fillCircle(80, groundY + 26, 8);

    g.fillStyle(COL.leaf, 1);
    g.fillEllipse(660, groundY + 66, 34, 14);
    g.fillEllipse(318, groundY + 84, 28, 12);
    g.fillStyle(COL.leafDark, 1);
    g.fillEllipse(660, groundY + 66, 6, 10);
    g.fillEllipse(318, groundY + 84, 5, 8);
  }

  drawMoundWithQueen(cx, groundY) {
    const g = this.add.graphics();
    g.fillStyle(COL.mound, 1);
    g.fillEllipse(cx, groundY, 190, 95);
    g.fillStyle(COL.moundDark, 1);
    g.fillEllipse(cx - 16, groundY + 4, 160, 74);
    g.fillStyle(COL.tunnel, 1);
    g.fillEllipse(cx - 36, groundY + 8, 30, 22);
    this.drawQueen(g, cx - 8, groundY - 62);
  }

  drawQueen(g, x, y) {
    g.fillStyle(COL.antHead, 1);
    g.fillCircle(x - 7, y, 5);
    g.fillStyle(COL.antBody, 1);
    g.fillCircle(x - 1, y, 4);
    g.fillStyle(COL.antBody, 1);
    g.fillEllipse(x + 9, y + 1, 13, 9);

    g.lineStyle(1.5, COL.antHead, 1);
    g.lineBetween(x - 10, y - 3, x - 17, y - 8);
    g.lineBetween(x - 10, y - 3, x - 15, y - 9);

    g.fillStyle(COL.gold, 1);
    g.fillTriangle(x - 4, y - 6, x, y - 3, x, y - 9);
    g.fillTriangle(x, y - 3, x + 4, y - 6, x, y - 9);

    g.lineStyle(1.5, COL.antBody, 1);
    for (const side of [-1, 1]) {
      g.lineBetween(x - 6, y + 4, x - 9, y + 7 + side * 2);
      g.lineBetween(x + 2, y + 4, x - 1, y + 7 + side * 2);
    }
  }

  drawAnteater(cx, groundY) {
    const g = this.add.graphics();

    g.fillStyle(COL.body, 1);
    g.fillCircle(cx - 26, groundY - 16, 13);
    g.fillCircle(cx - 18, groundY - 14, 8);
    g.fillStyle(COL.body, 1);
    g.fillCircle(cx - 4, groundY - 18, 16);
    g.fillStyle(COL.belly, 1);
    g.fillCircle(cx, groundY - 14, 8);

    g.fillStyle(COL.tail, 1);
    for (const dx of [-12, -4, 5, 11]) {
      g.fillRect(cx + dx - 2, groundY - 6, 4, 8);
    }

    g.fillStyle(COL.head, 1);
    g.fillCircle(cx + 14, groundY - 20, 10);
    g.fillCircle(cx + 20, groundY - 20, 7);
    g.fillCircle(cx + 26, groundY - 20, 5.5);
    g.fillCircle(cx + 32, groundY - 20, 4);
    g.fillStyle(COL.nose, 1);
    g.fillCircle(cx + 34, groundY - 20, 2.8);

    g.fillStyle(COL.tail, 1);
    g.fillCircle(cx + 10, groundY - 29, 4);
    g.fillStyle(COL.dark, 1);
    g.fillCircle(cx + 12, groundY - 23, 2.3);
  }

  spawnWalkingBug() {
    const bug = this.add.graphics();
    this.drawBugShape(bug);
    bug.setPosition(70, 540);
    this.tweens.add({
      targets: bug,
      x: { from: 70, to: 330 },
      duration: 5200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.InOut',
    });
  }

  drawBugShape(g) {
    g.lineStyle(2, COL.bugHead, 1);
    for (const side of [-1, 1]) {
      for (let i = -1; i <= 1; i++) {
        g.lineBetween(i * 5, 3, i * 5 - 3, 7 + side * 3);
      }
    }
    g.fillStyle(COL.bugShell, 1);
    g.fillCircle(0, 0, 8);
    g.fillStyle(COL.bugSpot, 1);
    g.fillCircle(0, 0, 3);
    g.fillStyle(COL.bugHead, 1);
    g.fillCircle(6, -1, 4);
    g.lineStyle(1.5, COL.bugHead, 1);
    g.lineBetween(8, -3, 14, -7);
    g.lineBetween(8, -3, 12, -8);
  }

  spawnParticles() {
    for (const p of PARTICLES) {
      const dot = this.add.graphics();
      dot.fillStyle(COL.cream, 0.55);
      dot.fillCircle(p.x, p.y, p.r);
      this.tweens.add({
        targets: dot,
        y: p.y - 80,
        duration: 3400,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.InOut',
        delay: p.x % 500,
      });
    }
  }
}