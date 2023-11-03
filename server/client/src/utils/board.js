export function setBoardFromFireResult(board, setBoard, fireResult) {
  const newBoard = board.map((row) => row.slice());
  newBoard[fireResult.rowIndex][fireResult.columnIndex] = fireResult.hit
    ? "hit"
    : "miss";
  setBoard(newBoard);
}

export function constructBoard(shipPlacement, fireResults) {
  const board = Array(8)
    .fill()
    .map(() => Array(8).fill("blank"));

  shipPlacement.forEach((ship) => {
    if (ship.rotated) {
      for (let i = 0; i < ship.size; i++) {
        board[ship.y + i][ship.x] = `ship${i + 1}r`;
      }
    } else {
      for (let i = 0; i < ship.size; i++) {
        board[ship.y][ship.x + i] = `ship${ship.size - i}`;
      }
    }
  });

  if (!fireResults) {
    return board;
  }

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      switch (fireResults[i][j]) {
        case "H":
          board[i][j] = "hit";
          break;
        case "M":
          board[i][j] = "miss";
          break;
      }
    }
  }
  return board;
}
