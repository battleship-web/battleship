export function setBoardFromFireResult(board, setBoard, fireResult) {
  const newBoard = board.map((row) => row.slice());

  if (fireResult.bomb) {
    newBoard[fireResult.rowIndex][fireResult.columnIndex] = fireResult.hit[0]
      ? "hit"
      : "miss";
    newBoard[fireResult.rowIndex][fireResult.columnIndex + 1] = fireResult
      .hit[1]
      ? "hit"
      : "miss";
    newBoard[fireResult.rowIndex + 1][fireResult.columnIndex] = fireResult
      .hit[2]
      ? "hit"
      : "miss";
    newBoard[fireResult.rowIndex + 1][fireResult.columnIndex + 1] = fireResult
      .hit[3]
      ? "hit"
      : "miss";
  } else {
    newBoard[fireResult.rowIndex][fireResult.columnIndex] = fireResult.hit
      ? "hit"
      : "miss";
  }

  if (fireResult.lightning) {
    newBoard[fireResult.lightningRowIndex][fireResult.lightningColumnIndex] =
      fireResult.lightningHit ? "lightningHit" : "lightningMiss";
  }
  setBoard(newBoard);
}

export function constructBoard(shipPlacement, fireResults) {
  const board = Array(8)
    .fill()
    .map(() => Array(8).fill("blank"));

  shipPlacement.forEach((ship) => {
    let shipType = null;
    if (ship.size === 5) {
      shipType = "shipBig";
    } else if (ship.size === 4) {
      shipType = "ship";
    } else if (ship.size === 3) {
      shipType = "shipSmall";
    }

    if (ship.rotated) {
      for (let i = 0; i < ship.size; i++) {
        board[ship.y + i][ship.x] = `${shipType}${i + 1}r`;
      }
    } else {
      for (let i = 0; i < ship.size; i++) {
        board[ship.y][ship.x + i] = `${shipType}${ship.size - i}`;
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
        case "L":
          board[i][j] = "lightningHit";
          break;
        case "V":
          board[i][j] = "lightningMiss";
          break;
      }
    }
  }
  return board;
}
