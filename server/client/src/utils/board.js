export function setBoardFromFireResult(board, setBoard, fireResult) {
  const newBoard = board.map((row) => row.slice());

  if (fireResult.bomb) {
    let arrIndex = 0;
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        if (fireResult.rowIndex + i > 7 || fireResult.columnIndex + j > 7) {
          arrIndex += 1;
          continue;
        }
        if (
          fireResult.hit[arrIndex] &&
          newBoard[fireResult.rowIndex + i][fireResult.columnIndex + j].slice(
            0,
            4
          ) === "ship"
        ) {
          newBoard[fireResult.rowIndex + i][fireResult.columnIndex + j] ===
            "hit";
        } else if (
          !fireResult[arrIndex] &&
          newBoard[fireResult.rowIndex + i][fireResult.columnIndex + j] ===
            "blank"
        ) {
          newBoard[fireResult.rowIndex + i][fireResult.columnIndex + j] ===
            "miss";
        }
        arrIndex += 1;
      }
    }
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
