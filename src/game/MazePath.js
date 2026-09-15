export default function cellPath(maze, from, to) {
  const rows = maze.rows;
  const cols = maze.cols;
  const key = (r, c) => r * cols + c;
  const startKey = key(from.row, from.col);
  const endKey = key(to.row, to.col);

  const dist = new Map([[startKey, 0]]);
  const prev = new Map();
  const queue = [{ r: from.row, c: from.col }];
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  let head = 0;
  let found = startKey === endKey;
  while (head < queue.length && !found) {
    const { r, c } = queue[head++];
    const k = key(r, c);
    const d = dist.get(k);
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      const nk = key(nr, nc);
      if (dist.has(nk) || !maze.isWalkable(nc, nr)) {
        continue;
      }
      dist.set(nk, d + 1);
      prev.set(nk, k);
      if (nk === endKey) {
        found = true;
        break;
      }
      queue.push({ r: nr, c: nc });
    }
  }

  if (!found || startKey === endKey) {
    return startKey === endKey ? [from] : [];
  }

  const cells = [];
  let k = endKey;
  while (k !== startKey) {
    cells.push({ col: k % cols, row: Math.floor(k / cols) });
    k = prev.get(k);
  }
  cells.push({ col: startKey % cols, row: Math.floor(startKey / cols) });
  cells.reverse();
  return cells;
}