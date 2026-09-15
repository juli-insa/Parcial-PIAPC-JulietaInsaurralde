import Phaser from 'phaser';
import TitleScene from './scenes/TitleScene.js';
import ControlsScene from './scenes/ControlsScene.js';
import GameScene from './scenes/GameScene.js';
import ResultScene from './scenes/ResultScene.js';

const config = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 900,
  height: 600,
  backgroundColor: '#1a1a2e',
  scene: [TitleScene, ControlsScene, GameScene, ResultScene],
};

new Phaser.Game(config);