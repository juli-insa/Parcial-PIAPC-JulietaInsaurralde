const TEMPO = 105;
const STEP_DUR = 60 / TEMPO / 4;

const MELODY = [
  0, 523.25, 0, 659.25, 587.33, 0, 783.99, 659.25,
  0, 587.33, 0, 523.25, 0, 659.25, 587.33, 523.25,
];

const BASS = [110.0, 164.81, 110.0, 164.81, 130.81, 164.81, 110.0, 164.81];

class AudioController {
  constructor() {
    this.ctx = null;
    this.musicGain = null;
    this.sfxGain = null;
    this.musicTimer = null;
    this.step = 0;
    this.nextNoteTime = 0;
    this.lastThud = 0;
  }

  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) {
      return;
    }
    this.ctx = new AC();
    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.value = 0.07;
    this.musicGain.connect(this.ctx.destination);
    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.value = 0.4;
    this.sfxGain.connect(this.ctx.destination);
  }

  tone(freq, time, dur, { type = 'sine', gain = 0.5, dest = null, slide = null } = {}) {
    if (!this.ctx) {
      return;
    }
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, time);
    if (slide) {
      osc.frequency.exponentialRampToValueAtTime(slide, time + dur);
    }

    g.gain.setValueAtTime(0.0001, time);
    g.gain.linearRampToValueAtTime(gain, time + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, time + dur);

    osc.connect(g);
    g.connect(dest || this.sfxGain);
    osc.start(time);
    osc.stop(time + dur + 0.05);
  }

  scheduleNext() {
    if (!this.ctx) {
      return;
    }
    while (this.nextNoteTime < this.ctx.currentTime + 0.3) {
      const s = this.step % 16;
      const note = MELODY[s];
      if (note) {
        this.tone(note, this.nextNoteTime, STEP_DUR * 0.9, {
          type: 'triangle',
          gain: 0.045,
          dest: this.musicGain,
        });
      }
      if (s % 4 === 0) {
        const bass = BASS[(this.step / 4) % BASS.length];
        this.tone(bass, this.nextNoteTime, STEP_DUR * 3.4, {
          type: 'sine',
          gain: 0.05,
          dest: this.musicGain,
        });
      }
      this.step++;
      this.nextNoteTime += STEP_DUR;
    }
  }

  startMusic() {
    if (!this.ctx || this.musicTimer) {
      return;
    }
    this.step = 0;
    this.nextNoteTime = this.ctx.currentTime + 0.1;
    this.musicTimer = setInterval(() => this.scheduleNext(), 100);
  }

  stopMusic() {
    if (this.musicTimer) {
      clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
  }

  playClick() {
    if (!this.ctx) {
      return;
    }
    const t = this.ctx.currentTime;
    this.tone(660, t, 0.09, { type: 'square', gain: 0.06, slide: 880 });
  }

  playBugHit() {
    if (!this.ctx) {
      return;
    }
    const t = this.ctx.currentTime;
    this.tone(520, t, 0.14, { type: 'sawtooth', gain: 0.16, slide: 220 });
    this.tone(330, t + 0.1, 0.16, { type: 'sawtooth', gain: 0.12, slide: 160 });
  }

  playVictory() {
    if (!this.ctx) {
      return;
    }
    const t = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((f, i) => {
      this.tone(f, t + i * 0.1, 0.32, { type: 'triangle', gain: 0.14 });
    });
  }

  playDefeat() {
    if (!this.ctx) {
      return;
    }
    const t = this.ctx.currentTime;
    const notes = [196.0, 174.61, 155.56];
    notes.forEach((f, i) => {
      this.tone(f, t + i * 0.22, 0.5, { type: 'sine', gain: 0.16 });
    });
  }

  playThud() {
    if (!this.ctx) {
      return;
    }
    const now = this.ctx.currentTime;
    if (now - this.lastThud < 0.12) {
      return;
    }
    this.lastThud = now;
    this.tone(90, now, 0.12, { type: 'sine', gain: 0.12 });
  }
}

const audio = new AudioController();

export default audio;