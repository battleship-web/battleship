import { useState } from "react";
import "./Grid.css";
import Board from "../../squarenboard/Board";
import shipPic from "../../assets/ship.png";
import rotatePic from "../../assets/rotate.png";
import { socket } from "../../socket";

const Grid = ({ setGameStage, setPlayerBoard, handleQuitGame }) => {
  const [boardState, setBoardState] = useState(
    new Array(8).fill(0).map(() => new Array(8).fill("blank"))
  );
  const [infoTosend, setInfoToSend] = useState([]);
  const [placementCount, setPlacementCount] = useState(0);
  const maxPlacements = 4;
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

    const toAppend = {
      x: columnIndex,
      y: rowIndex,
      size: 4,
      rotated: !(selectionMode === "row"),
    };
    setInfoToSend([...infoTosend, toAppend]);
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
          className="rounded bg-gradient-to-r from-orange-700 to-orange-800 border-2 border-orange-950"
          onClick={toggleSelectionMode}
        >
          <img className="object-right w-14 h-14" src={rotatePic} />
        </button>
        <div className=" text-center text-black font-bold rounded container bg-gradient-to-r from-orange-700 to-orange-800 border-2 border-orange-950 w-2000 h-100">
          {selectionMode}
        </div>
      </div>
      <div className="color-buttons-container">
        <button
          className="h-10 bg-gradient-to-r from-red-500 to-red-600 rounded text-sm font-bold text-red-900 shadow-sm sm:text-1xl border-2 border-red-900 hover:bg-red-800"
          onClick={() => {
            setBoardState(
              new Array(8).fill(0).map(() => new Array(8).fill("blank"))
            );
            setInfoToSend([]);
            setPlacementCount(0);
          }}
        >
          Clear Board
        </button>
        <div className="container w-60 h-60 bg-sky-700">
          {Array(numShips)
            .fill(0)
            .map((_, index) => (
              <button
                key={index}
                className="mx-5 flex rounded bg-blue-500 border-blue-700 hover:bg-blue-600 active-bg-blue-700 focus-outline-none focus-ring focus-ring-blue-300"
              >
                <img
                  className="color-button w-full h-full object-contain"
                  src={shipPic}
                />
              </button>
            ))}
        </div>
        <div className="container flex h-10">
          <button
            className="flex-1 rounded border-2 bg-gradient-to-r border-lime-900 from-green-500 to-green-600 hover:bg-green-800 text-sm font-bold text-lime-900 shadow-sm sm:text-1xl"
            onClick={() => {
              if (placementCount !== 4) {
                alert("Must place all ships before confirming.");
                return;
              }
              socket.emit("placement", infoTosend);
              setPlayerBoard(boardState);
              setGameStage("game:battle");
            }}
          >
            Confirm
          </button>

          <button
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 rounded text-sm font-bold text-red-900 shadow-sm sm:text-1xl border-2 border-red-900 hover:bg-red-800"
            onClick={() => {
              socket.emit("quit");
              handleQuitGame();
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
