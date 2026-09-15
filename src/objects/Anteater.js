const TAIL_COLOR = 0x4e342e;
const BODY_COLOR = 0x795548;
const BELLY_COLOR = 0x8d6e63;
const HEAD_COLOR = 0x6d4c41;
const SNOUT_COLOR = 0x6d4c41;
const NOSE_COLOR = 0x3e2723;
const EAR_COLOR = 0x4e342e;
const LEG_COLOR = 0x4e342e;
const EYE_COLOR = 0x1a1a1a;

export default class Anteater {
  constructor(scene, position, tileSize) {
    this.scene = scene;
    this.position = position;
    this.facing = 'right';
    this.graphics = scene.add.graphics();
    this.draw();
  }

  get snout() {
    const s = this.facing === 'right' ? 1 : -1;
    return { x: this.position.x + 6 + s * 30, y: this.position.y - 6 };
  }

  face(dir) {
    const want = dir === 'left' ? 'left' : 'right';
    if (want !== this.facing) {
      this.facing = want;
      this.draw();
    }
  }

  draw() {
    const g = this.graphics;
    const ox = this.position.x + 6;
    const oy = this.position.y - 4;
    const s = this.facing === 'left' ? -1 : 1;
    const xs = (dx) => ox + s * dx;

    g.clear();

    // cola grande (lado opuesto al hocico)
    g.fillStyle(TAIL_COLOR, 1);
    g.fillCircle(xs(-18), oy + 6, 13);
    g.fillCircle(xs(-13), oy + 9, 9);
    g.fillCircle(xs(-9), oy + 5, 7);

    // cuerpo
    g.fillStyle(BODY_COLOR, 1);
    g.fillCircle(xs(-4), oy + 2, 16);
    g.fillCircle(xs(6), oy + 3, 12);

    // panza clara
    g.fillStyle(BELLY_COLOR, 1);
    g.fillCircle(xs(1), oy + 8, 8);

    // patas
    g.fillStyle(LEG_COLOR, 1);
    for (const leg of [-13, -5, 4, 11]) {
      g.fillRect(xs(leg) - 2, oy + 11, 4, 8);
    }

    // cabeza + hocico alargado
    g.fillStyle(HEAD_COLOR, 1);
    g.fillCircle(xs(12), oy - 2, 11);

    // orejas
    g.fillStyle(EAR_COLOR, 1);
    g.fillCircle(xs(9), oy - 11, 4);
    g.fillCircle(xs(15), oy - 12, 4);

    // hocico: círculos encadenados hasta la nariz
    g.fillStyle(SNOUT_COLOR, 1);
    g.fillCircle(xs(18), oy - 2, 7);
    g.fillCircle(xs(23), oy - 2, 6);
    g.fillCircle(xs(28), oy - 2, 5);

    // nariz
    g.fillStyle(NOSE_COLOR, 1);
    g.fillCircle(xs(31), oy - 2, 3.5);

    // ojo
    g.fillStyle(EYE_COLOR, 1);
    g.fillCircle(xs(10), oy - 6, 2.5);
  }
}