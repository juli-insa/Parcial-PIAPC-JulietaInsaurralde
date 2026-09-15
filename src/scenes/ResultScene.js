import Phaser from 'phaser';

const COL = {
  base: 0x5d4037,
  band: 0x6d4c41,
  ground: 0x3e2723,
  groundLight: 0x4e342e,
  grain: 0x795548,
  cream: 0xfff3e0,
  creamSoft: 0xffe0b2,
  gold: 0xf1c40f,
  goldDark: 0xf39c12,
  dark: 0x2b1a16,
  leaf: 0x81c784,
  leafDark: 0x4caf50,
  stone: 0x9e9e9e,
  stoneDark: 0x757575,
  mound: 0x6d4c41,
  moundDark: 0x4a3732,
  tunnel: 0x1f1512,
  antHead: 0x880e4f,
  antBody: 0xe91e63,
  body: 0x795548,
  belly: 0x8d6e63,
  tail: 0x4e342e,
  head: 0x6d4c41,
  nose: 0x3e2723,
  tongue: 0xf1948a,
  tongueTip: 0xe74c3c,
  green: 0x2ecc71,
  red: 0xef5350,
};

export default class ResultScene extends Phaser.Scene {
  constructor() {
    super('ResultScene');
  }

  create(data) {
    const { width, height } = this.scale;
    const victory = !!(data && data.result === 'victory');
    const timeLeft =
      data && typeof data.timeRemaining === 'number' ? data.timeRemaining : 0;

    this.drawBackground(width, height);

    if (victory) {
      this.drawVictory(width, height, timeLeft);
    } else {
      this.drawDefeat(width, height);
    }

    const prompt = this.add
      .text(width / 2, 548, 'PRESIONA ENTER PARA INTENTAR DE NUEVO', {
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
      this.scene.start('GameScene');
    });
  }

  drawBackground(width, height) {
    const groundY = 470;
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
      [40, 505],
      [150, 570],
      [300, 545],
      [470, 555],
      [620, 570],
      [790, 545],
      [860, 575],
    ]) {
      g.fillRect(x, y, 5, 4);
      g.fillRect(x + 11, y + 7, 4, 3);
    }
  }

  drawVictory(width, height, timeLeft) {
    this.add
      .text(width / 2, 140, '¡CAPTURASTE A LA REINA!', {
        fontFamily: 'Arial',
        fontSize: '50px',
        fontStyle: 'bold',
        color: '#f1c40f',
        stroke: '#2b1a16',
        strokeThickness: 8,
      })
      .setOrigin(0.5);

    const badge = this.add.graphics();
    badge.fillStyle(COL.goldDark, 1);
    badge.fillRoundedRect(width / 2 - 160, 200, 320, 58, 14);
    badge.fillStyle(COL.gold, 1);
    badge.fillRoundedRect(width / 2 - 156, 205, 312, 50, 12);
    this.add
      .text(width / 2, 230, `Tiempo restante: ${timeLeft.toFixed(1)} s`, {
        fontFamily: 'Arial',
        fontSize: '26px',
        fontStyle: 'bold',
        color: '#3e2723',
      })
      .setOrigin(0.5);

    this.drawQueenMini(646, 400);
    this.drawMound(668, 470);
    this.drawAnteaterMini(165, 470);

    const g = this.add.graphics();
    g.lineStyle(9, COL.tongue, 1);
    g.lineBetween(202, 450, 596, 380);
    g.fillStyle(COL.tongue, 1);
    g.fillCircle(596, 380, 12);
    g.fillStyle(COL.tongueTip, 1);
    g.fillCircle(596, 380, 5);

    const sparkle = this.add.graphics();
    sparkle.fillStyle(COL.gold, 1);
    sparkle.fillCircle(596, 380, 8);
    this.tweens.add({
      targets: sparkle,
      scale: { from: 0.6, to: 1.6 },
      alpha: { from: 0.9, to: 0.2 },
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: 'Quad.InOut',
    });

    for (const [x, y] of [
      [300, 280],
      [390, 220],
      [520, 250],
      [680, 300],
      [330, 360],
      [720, 350],
      [250, 320],
      [760, 230],
    ]) {
      const dot = this.add.graphics();
      dot.fillStyle(COL.gold, 1);
      dot.fillCircle(x, y, 4);
      this.tweens.add({
        targets: dot,
        alpha: { from: 0.1, to: 1 },
        scale: { from: 0.5, to: 1.3 },
        duration: 450 + (x % 280),
        yoyo: true,
        repeat: -1,
        delay: x % 400,
      });
    }
  }

  drawDefeat(width, height) {
    this.add
      .text(width / 2, 140, '¡SE ACABÓ EL TIEMPO!', {
        fontFamily: 'Arial',
        fontSize: '50px',
        fontStyle: 'bold',
        color: '#ef5350',
        stroke: '#2b1a16',
        strokeThickness: 8,
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, 220, 'El tiempo llegó a 0 antes de alcanzar a la reina', {
        fontFamily: 'Arial',
        fontSize: '20px',
        color: '#ffe0b2',
        stroke: '#2b1a16',
        strokeThickness: 3,
      })
      .setOrigin(0.5);

    this.drawClock(430, 338);
    this.drawEmptyMound(668, 470);

    const g = this.add.graphics();
    g.fillStyle(COL.stone, 1);
    g.fillCircle(200, 496, 15);
    g.fillCircle(214, 508, 10);
    g.fillStyle(COL.stoneDark, 1);
    g.fillCircle(200, 496, 7);
    g.fillStyle(COL.leafDark, 1);
    g.fillEllipse(322, 526, 30, 12);

    for (const [x, y] of [
      [280, 300],
      [560, 250],
      [700, 320],
      [360, 370],
      [620, 390],
      [250, 380],
    ]) {
      const dot = this.add.graphics();
      dot.fillStyle(COL.stone, 1);
      dot.fillCircle(x, y, 3.5);
      this.tweens.add({
        targets: dot,
        alpha: { from: 0.1, to: 0.9 },
        duration: 500 + (x % 260),
        yoyo: true,
        repeat: -1,
        delay: x % 420,
      });
    }
  }

  drawMound(cx, groundY) {
    const g = this.add.graphics();
    g.fillStyle(COL.mound, 1);
    g.fillEllipse(cx, groundY, 190, 95);
    g.fillStyle(COL.moundDark, 1);
    g.fillEllipse(cx - 16, groundY + 4, 160, 74);
    g.fillStyle(COL.tunnel, 1);
    g.fillEllipse(cx - 36, groundY + 8, 30, 22);
  }

  drawEmptyMound(cx, groundY) {
    const g = this.add.graphics();
    g.fillStyle(COL.stone, 1);
    g.fillEllipse(cx, groundY, 180, 88);
    g.fillStyle(COL.stoneDark, 1);
    g.fillEllipse(cx - 14, groundY + 4, 150, 68);
    g.fillStyle(COL.tunnel, 1);
    g.fillEllipse(cx - 32, groundY + 8, 28, 20);
  }

  drawQueenMini(x, y) {
    const g = this.add.graphics();

    g.fillStyle(COL.antHead, 1);
    g.fillCircle(x - 8, y, 5);
    g.fillStyle(COL.antBody, 1);
    g.fillCircle(x - 1, y, 4);
    g.fillStyle(COL.antBody, 1);
    g.fillEllipse(x + 9, y + 1, 13, 9);

    g.lineStyle(1.5, COL.antHead, 1);
    g.lineBetween(x - 11, y - 3, x - 18, y - 8);
    g.lineBetween(x - 11, y - 3, x - 16, y - 9);

    g.fillStyle(COL.gold, 1);
    g.fillTriangle(x - 4, y - 6, x, y - 3, x, y - 9);
    g.fillTriangle(x, y - 3, x + 4, y - 6, x, y - 9);

    g.lineStyle(1.5, COL.antBody, 1);
    for (const side of [-1, 1]) {
      g.lineBetween(x - 7, y + 4, x - 10, y + 7 + side * 2);
      g.lineBetween(x + 1, y + 4, x - 2, y + 7 + side * 2);
    }
  }

  drawAnteaterMini(cx, groundY) {
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

  drawClock(cx, cy) {
    const g = this.add.graphics();
    g.fillStyle(COL.moundDark, 1);
    g.fillCircle(cx, cy, 46);
    g.lineStyle(4, COL.creamSoft, 1);
    g.strokeCircle(cx, cy, 45);

    g.lineStyle(3, COL.creamSoft, 1);
    g.lineBetween(cx, cy - 45, cx, cy - 38);
    g.lineBetween(cx, cy + 45, cx, cy + 38);
    g.lineBetween(cx - 45, cy, cx - 38, cy);
    g.lineBetween(cx + 45, cy, cx + 38, cy);

    const hand = this.add.graphics();
    hand.setPosition(cx, cy);
    hand.fillStyle(COL.gold, 1);
    hand.fillRect(-4, -36, 8, 36);
    hand.fillCircle(0, 0, 6);
    this.tweens.add({
      targets: hand,
      angle: 360,
      duration: 2000,
      repeat: -1,
      ease: 'Linear',
    });
  }
}