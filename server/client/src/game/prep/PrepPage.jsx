import React, { useState } from "react";
import "./Grid.css";
import Board from "../../squarenboard/Board";

const Grid = ({ setGameStage }) => {
  const [boardState, setBoardState] = useState(
    new Array(8).fill(0).map(() => new Array(8).fill("blank"))
  );
  const [placementCount, setPlacementCount] = useState(0);
  const maxPlacements = 4;
  const gridSize = 8;
  const [selectionMode, setSelectionMode] = useState("row");
  const numShips = 4 - placementCount;
  const handleClick = (rowIndex, columnIndex) => {
    if (placementCount >= maxPlacements) {
      alert("You have reached the maximum number of placements.");
      return;
    }

    var newGrid = boardState.map(function (row) {
      return row.slice();
    });

    if (selectionMode === "row") {
      if (columnIndex > 4) {
        alert("Invalid battleship placement.");
        return;
      }
      for (let i = 0; i < 4; i++) {
        if (newGrid[rowIndex][columnIndex + i] !== "blank") {
          alert("Battleships should not overlap.");
          return;
        }

        newGrid[rowIndex][columnIndex + i] = `ship${4 - i}`;
      }
    } else {
      if (rowIndex > 4) {
        alert("Invalid battleship placement.");
        return;
      }
      for (let i = 0; i < 4; i++) {
        if (newGrid[rowIndex + i][columnIndex] !== "blank") {
          alert("Battleships should not overlap.");
          return;
        }

        newGrid[rowIndex + i][columnIndex] = `ship${i + 1}r`;
      }
    }
    setBoardState(newGrid);
    setPlacementCount(placementCount + 1);
  };

  const toggleSelectionMode = () => {
    setSelectionMode((prevMode) => (prevMode === "row" ? "column" : "row"));
  };

  return (
    <div className="page-background">
      <Board board={boardState} size="big" onClick={handleClick} />
      <div className="container w-10"></div>
      <div className="rotate-container">
        <button
          className="rounded bg-red-500 rotate-button"
          onClick={toggleSelectionMode}
        >
          <img class="object-right w-14 h-14" url="rotate.png" />
        </button>
        <div className="rounded container bg-red-500 w-2000 h-100">
          {selectionMode}
        </div>
      </div>
      <div className="color-buttons-container">
        <button
          className="rounded h-10 border-black-100 bg-red-500 hover:bg-red-900"
          onClick={() => {
            setBoardState(
              new Array(8).fill(0).map(() => new Array(8).fill("blank"))
            );
            setPlacementCount(0);
          }}
        >
          Clear Board
        </button>
        <div className="container w-60 h-60 bg-blue-500">
          {Array(numShips)
            .fill(0)
            .map(() => (
              <button className="mx-5 flex rounded bg-blue-500 border-blue-700 hover:bg-blue-600 active-bg-blue-700 focus-outline-none focus-ring focus-ring-blue-300">
                <img className="color-button w-full h-full object-contain" />
              </button>
            ))}
        </div>
        <div className="container flex h-10">
          <button
            className="flex-1 rounded border-black-100 bg-green-500 hover:bg-green-900"
            onClick={() => {
              setGameStage("game:battle");
            }}
          >
            Confirm
          </button>

          <button
            className="flex-1rounded border-black-100 bg-red-500 hover:bg-red-900"
            onClick={() => {
              setGameStage("menu:lobby");
            }}
          >
            Leave Match
          </button>
        </div>
      </div>
    </div>
  );
};

export default Grid;
