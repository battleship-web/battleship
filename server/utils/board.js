export function convertBoardStrTo2DArray(boardStr) {
  let board = [];
  let start = 0;
  for (let i = 0; i < 8; i++) {
    board.push(boardStr.slice(start, start + 8));
    start += 8;
  }
  board = board.map((columnStr) => columnStr.split(""));
  board = transpose(board);
  return board;
}

function transpose(array) {
  return array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
}
