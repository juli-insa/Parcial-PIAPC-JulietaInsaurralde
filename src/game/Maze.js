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

  pixelRectOverlapsWall(x, y, width, height, tileSize) {
    const minCol = Math.floor(x / tileSize);
    const maxCol = Math.floor((x + width - 1) / tileSize);
    const minRow = Math.floor(y / tileSize);
    const maxRow = Math.floor((y + height - 1) / tileSize);

    for (let row = minRow; row <= maxRow; row++) {
      for (let col = minCol; col <= maxCol; col++) {
        if (this.isWall(col, row)) {
          return true;
        }
      }
    }
    return false;
  }

  get width() {
    return this.cols;
  }

  get height() {
    return this.rows;
  }
}