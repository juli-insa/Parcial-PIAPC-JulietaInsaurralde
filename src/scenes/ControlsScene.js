import Phaser from 'phaser';
import audio from '../audio/AudioController.js';

const COL = {
  base: 0x5d4037,
  band: 0x6d4c41,
  ground: 0x3e2723,
  groundLight: 0x4e342e,
  grain: 0x795548,
  cream: 0xfff3e0,
  creamSoft: 0xffe0b2,
  gold: 0xf1c40f,
  dark: 0x2b1a16,
  padBg: 0x4e342e,
  padBorder: 0xffe0b2,
  btnBg: 0x6d4c41,
  arrow: 0xfff3e0,
  cardBg: 0x4e342e,
  cardBorder: 0xa1887f,
  antHead: 0x880e4f,
  antBody: 0xe91e63,
  bugShell: 0x283747,
  bugSpot: 0x85929e,
  bugHead: 0x17202a,
};

const PARTICLES = [
  { x: 150, y: 430, r: 2.5 },
  { x: 320, y: 520, r: 2 },
  { x: 500, y: 460, r: 3 },
  { x: 700, y: 420, r: 2.5 },
  { x: 830, y: 500, r: 2 },
];

export default class ControlsScene extends Phaser.Scene {
  constructor() {
    super('ControlsScene');
  }

  create() {
    const { width, height } = this.scale;
    const groundY = 532;

    this.drawBackground(width, height, groundY);
    this.spawnParticles();

    this.add
      .text(width / 2, 62, 'CONTROLES', {
        fontFamily: 'Arial',
        fontSize: '44px',
        fontStyle: 'bold',
        color: '#fff3e0',
        stroke: '#2b1a16',
        strokeThickness: 8,
      })
      .setOrigin(0.5);

    this.drawDPad(185, 220);

    this.add
      .text(185, 398, 'Mueve la lengua con las flechas', {
        fontFamily: 'Arial',
        fontSize: '22px',
        fontStyle: 'bold',
        color: '#fff3e0',
        stroke: '#2b1a16',
        strokeThickness: 4,
      })
      .setOrigin(0.5);
    this.add
      .text(185, 430, 'Solo arriba, abajo, izquierda y derecha', {
        fontFamily: 'Arial',
        fontSize: '16px',
        color: '#ffe0b2',
      })
      .setOrigin(0.5);
    this.add
      .text(185, 456, 'Sin diagonales', {
        fontFamily: 'Arial',
        fontSize: '16px',
        fontStyle: 'bold',
        color: '#f1c40f',
      })
      .setOrigin(0.5);

    this.drawCard(600, 122, 320, 92, 'reina', 'Encuentra a la Reina', 'Tu lengua debe tocarla para ganar');
    this.drawCard(600, 232, 320, 92, 'bug', 'Evita los escarabajos', 'Cada contacto te quita 5 segundos');
    this.drawCard(600, 342, 320, 92, 'clock', 'Tienes 60 segundos', 'Llega antes de que se acabe el tiempo');

    const prompt = this.add
      .text(width / 2, 526, 'PRESIONA ENTER PARA INICIAR', {
        fontFamily: 'Arial',
        fontSize: '26px',
        fontStyle: 'bold',
        color: '#f1c40f',
        stroke: '#2b1a16',
        strokeThickness: 5,
      })
      .setOrigin(0.5);
    this.tweens.add({
      targets: prompt,
      scale: { from: 1, to: 1.06 },
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
      audio.playClick();
      this.scene.start('GameScene');
    });
  }

  drawBackground(width, height, groundY) {
    const g = this.add.graphics();

    g.fillStyle(COL.base, 1);
    g.fillRect(0, 0, width, height);

    g.fillStyle(COL.band, 1);
    for (let i = 0; i < 7; i++) {
      g.fillRect(0, 60 + i * 60, width, 14);
    }

    g.fillStyle(COL.ground, 1);
    g.fillRect(0, groundY, width, height - groundY);
    g.fillStyle(COL.groundLight, 1);
    g.fillRect(0, groundY - 4, width, 12);

    g.fillStyle(COL.grain, 1);
    for (const [x, y] of [
      [45, 565],
      [160, 555],
      [340, 582],
      [540, 570],
      [680, 555],
      [820, 578],
      [880, 560],
    ]) {
      g.fillRect(x, y, 5, 4);
      g.fillRect(x + 11, y + 7, 4, 3);
    }
  }

  drawDPad(cx, cy) {
    const g = this.add.graphics();
    g.fillStyle(COL.padBg, 1);
    g.fillRoundedRect(cx - 80, cy - 80, 160, 160, 18);
    g.lineStyle(3, COL.padBorder, 1);
    g.strokeRoundedRect(cx - 80, cy - 80, 160, 160, 18);

    const btns = [
      [0, -57, 'up'],
      [0, 57, 'down'],
      [-57, 0, 'left'],
      [57, 0, 'right'],
    ];
    for (const [dx, dy, dir] of btns) {
      const bx = cx + dx;
      const by = cy + dy;
      g.fillStyle(COL.btnBg, 1);
      g.fillCircle(bx, by, 27);
      g.lineStyle(3, COL.padBorder, 1);
      g.strokeCircle(bx, by, 25);

      g.fillStyle(COL.arrow, 1);
      if (dir === 'up') {
        g.fillTriangle(bx - 10, by + 5, bx + 10, by + 5, bx, by - 13);
        g.fillRect(bx - 5, by + 5, 10, 5);
      } else if (dir === 'down') {
        g.fillTriangle(bx - 10, by - 5, bx + 10, by - 5, bx, by + 13);
        g.fillRect(bx - 5, by - 10, 10, 5);
      } else if (dir === 'left') {
        g.fillTriangle(bx + 5, by - 10, bx + 5, by + 10, bx - 13, by);
        g.fillRect(bx - 10, by - 5, 5, 10);
      } else {
        g.fillTriangle(bx - 5, by - 10, bx - 5, by + 10, bx + 13, by);
        g.fillRect(bx + 5, by - 5, 5, 10);
      }
    }
  }

  drawCard(x, y, w, h, icon, title, sub) {
    const g = this.add.graphics();
    g.fillStyle(COL.cardBg, 1);
    g.fillRoundedRect(x - w / 2, y - h / 2, w, h, 14);
    g.lineStyle(3, COL.cardBorder, 1);
    g.strokeRoundedRect(x - w / 2, y - h / 2, w, h, 14);

    const ix = x - w / 2 + 34;
    if (icon === 'reina') this.drawQueenIcon(g, ix, y);
    else if (icon === 'bug') this.drawBugIcon(g, ix, y);
    else this.drawClockIcon(g, ix, y);

    this.add
      .text(x + 20, y - 16, title, {
        fontFamily: 'Arial',
        fontSize: '20px',
        fontStyle: 'bold',
        color: '#fff3e0',
        stroke: '#2b1a16',
        strokeThickness: 4,
      })
      .setOrigin(0.5);
    this.add
      .text(x + 20, y + 16, sub, {
        fontFamily: 'Arial',
        fontSize: '14px',
        color: '#ffe0b2',
      })
      .setOrigin(0.5);
  }

  drawQueenIcon(g, x, y) {
    g.fillStyle(COL.antHead, 1);
    g.fillCircle(x - 8, y, 6);
    g.fillStyle(COL.antBody, 1);
    g.fillCircle(x - 1, y, 4.5);
    g.fillStyle(COL.antBody, 1);
    g.fillEllipse(x + 9, y + 1, 14, 10);

    g.lineStyle(2, COL.antHead, 1);
    g.lineBetween(x - 12, y - 4, x - 20, y - 10);
    g.lineBetween(x - 12, y - 4, x - 18, y - 11);

    g.fillStyle(COL.gold, 1);
    g.fillTriangle(x - 4, y - 7, x, y - 4, x, y - 11);
    g.fillTriangle(x, y - 4, x + 4, y - 7, x, y - 11);

    g.lineStyle(2, COL.antBody, 1);
    for (const side of [-1, 1]) {
      g.lineBetween(x - 7, y + 4, x - 10, y + 8 + side * 2);
      g.lineBetween(x + 2, y + 4, x - 1, y + 8 + side * 2);
    }
  }

  drawBugIcon(g, x, y) {
    g.lineStyle(2, COL.bugHead, 1);
    for (const side of [-1, 1]) {
      for (let i = -1; i <= 1; i++) {
        g.lineBetween(x + i * 6, y + 3, x + i * 6 - 3, y + 8 + side * 3);
      }
    }
    g.fillStyle(COL.bugShell, 1);
    g.fillCircle(x, y, 10);
    g.fillStyle(COL.bugSpot, 1);
    g.fillCircle(x, y, 4);
    g.fillStyle(COL.bugHead, 1);
    g.fillCircle(x + 7, y, 5);
    g.lineStyle(1.5, COL.bugHead, 1);
    g.lineBetween(x + 9, y - 4, x + 16, y - 9);
    g.lineBetween(x + 9, y - 4, x + 14, y - 10);
  }

  drawClockIcon(g, x, y) {
    g.lineStyle(3, COL.padBorder, 1);
    g.strokeCircle(x, y, 12);
    g.lineStyle(2.5, COL.padBorder, 1);
    g.lineBetween(x, y, x, y - 8);
    g.lineBetween(x, y, x + 6, y + 5);
    g.fillStyle(COL.padBorder, 1);
    g.fillCircle(x, y, 2);
  }

  spawnParticles() {
    for (const p of PARTICLES) {
      const dot = this.add.graphics();
      dot.fillStyle(COL.cream, 0.5);
      dot.fillCircle(p.x, p.y, p.r);
      this.tweens.add({
        targets: dot,
        y: p.y - 70,
        duration: 3200,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.InOut',
        delay: p.x % 400,
      });
    }
  }
}