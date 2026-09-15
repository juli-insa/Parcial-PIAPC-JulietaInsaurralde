export default class Maze {
  constructor(data) {
    this.tiles = data.tiles;
    this.entry = data.entry;
    this.queen = data.queen;
    this.rows = this.tiles.length;
    this.cols = this.tiles[0].length;
  }

  isWall(col, row) {
    if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
      return true;
    }
    return this.tiles[row][col] === 1;
  }

  isWalkable(col, row) {
    return !this.isWall(col, row);
  }

  get width() {
    return this.cols;
  }

  get height() {
    return this.rows;
  }
}