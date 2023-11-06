import { useState } from "react";
import "./Grid.css";
import Board from "../../squarenboard/Board";
import shipPic from "../../assets/ship.png";
import shipBigPic from "../../assets/shipbig.png";
import shipSmallPic from "../../assets/shipsmall.png";
import rotatePic from "../../assets/rotate.png";
import { socket } from "../../socket";

const Grid = ({ setGameStage, setPlayerBoard, handleQuitGame }) => {
  const sets = [
    [4, 4, 4, 4],
    [5, 5, 3, 3],
    [4, 3, 3, 3, 3],
    [5, 4, 4, 3],
  ];
  const [boardState, setBoardState] = useState(
    new Array(8).fill(0).map(() => new Array(8).fill("blank"))
  );
  const [infoTosend, setInfoToSend] = useState([]);
  const [selectedSet, setSelectedSet] = useState(0);
  const [placementCount, setPlacementCount] = useState(0);
  const maxPlacements = sets[selectedSet].length;
  const [selectionMode, setSelectionMode] = useState("row");

  const shipArray = [];
  for (let i = placementCount; i < maxPlacements; i++) {
    let shipToPush = null;
    if (sets[selectedSet][i] === 5) {
      shipToPush = <img src={shipBigPic} className="h-12 w-56" />;
    } else if (sets[selectedSet][i] === 4) {
      shipToPush = <img src={shipPic} className="h-12 w-44" />;
    } else if (sets[selectedSet][i] === 3) {
      shipToPush = <img src={shipSmallPic} className="h-12 w-32" />;
    }
    shipArray.push(shipToPush);
  }
  const handleClick = (rowIndex, columnIndex) => {
    if (placementCount >= maxPlacements) {
      alert("You have reached the maximum number of placements.");
      return;
    }

    var newGrid = boardState.map(function (row) {
      return row.slice();
    });

    if (selectionMode === "row") {
      if (columnIndex + sets[selectedSet][placementCount] > 8) {
        alert("Invalid battleship placement.");
        return;
      }
      for (let i = 0; i < sets[selectedSet][placementCount]; i++) {
        if (newGrid[rowIndex][columnIndex + i] !== "blank") {
          alert("Battleships should not overlap.");
          return;
        }
        let shipType = null;
        if (sets[selectedSet][placementCount] === 5) {
          shipType = "shipBig";
        } else if (sets[selectedSet][placementCount] === 4) {
          shipType = "ship";
        } else if (sets[selectedSet][placementCount] === 3) {
          shipType = "shipSmall";
        }
        newGrid[rowIndex][columnIndex + i] = `${shipType}${
          sets[selectedSet][placementCount] - i
        }`;
      }
    } else {
      if (rowIndex + sets[selectedSet][placementCount] > 8) {
        alert("Invalid battleship placement.");
        return;
      }
      for (let i = 0; i < sets[selectedSet][placementCount]; i++) {
        if (newGrid[rowIndex + i][columnIndex] !== "blank") {
          alert("Battleships should not overlap.");
          return;
        }
        let shipType = null;
        if (sets[selectedSet][placementCount] === 5) {
          shipType = "shipBig";
        } else if (sets[selectedSet][placementCount] === 4) {
          shipType = "ship";
        } else if (sets[selectedSet][placementCount] === 3) {
          shipType = "shipSmall";
        }
        newGrid[rowIndex + i][columnIndex] = `${shipType}${i + 1}r`;
      }
    }

    const toAppend = {
      x: columnIndex,
      y: rowIndex,
      size: sets[selectedSet][placementCount],
      rotated: !(selectionMode === "row"),
    };
    setInfoToSend([...infoTosend, toAppend]);
    setBoardState(newGrid);
    setPlacementCount(placementCount + 1);
  };

  const toggleSelectionMode = () => {
    setSelectionMode((prevMode) => (prevMode === "row" ? "column" : "row"));
  };

  const handleShuffleShip = () => {
    const newBoard = Array(8)
      .fill()
      .map(() => Array(8).fill("blank"));
    const newInfoToSend = [];
    let newPlacementCount = 0;
    for (let i = 0; i < sets[selectedSet].length; i++) {
      let toAppend = null;
      const shipLength = sets[selectedSet][newPlacementCount];
      let shipType = null;
      if (shipLength === 5) {
        shipType = "shipBig";
      } else if (shipLength === 4) {
        shipType = "ship";
      } else if (shipLength === 3) {
        shipType = "shipSmall";
      }

      let gotValidPos = false;
      while (!gotValidPos) {
        gotValidPos = true;
        const rotated = Math.random() < 0.5;
        if (rotated) {
          const ranX = Math.floor(Math.random() * 8);
          const ranY = Math.floor(Math.random() * (9 - shipLength));
          for (let j = 0; j < shipLength; j++) {
            if (ranY + j > 7 || newBoard[ranY + j][ranX] !== "blank") {
              gotValidPos = false;
              break;
            }
          }
          if (gotValidPos) {
            for (let j = 0; j < shipLength; j++) {
              newBoard[ranY + j][ranX] = `${shipType}${j + 1}r`;
            }
            toAppend = {
              x: ranX,
              y: ranY,
              size: shipLength,
              rotated: rotated,
            };
          }
        } else {
          const ranX = Math.floor(Math.random() * (9 - shipLength));
          const ranY = Math.floor(Math.random() * 8);
          for (let j = 0; j < shipLength; j++) {
            if (ranX + j > 7 || newBoard[ranY][ranX + j] !== "blank") {
              gotValidPos = false;
              break;
            }
          }
          if (gotValidPos) {
            for (let j = 0; j < shipLength; j++) {
              newBoard[ranY][ranX + j] = `${shipType}${shipLength - j}`;
            }
            toAppend = {
              x: ranX,
              y: ranY,
              size: shipLength,
              rotated: rotated,
            };
          }
        }
      }

      newInfoToSend.push(toAppend);
      newPlacementCount += 1;
    }
    setBoardState(newBoard);
    setInfoToSend(newInfoToSend);
    setPlacementCount(newPlacementCount);
  };

  return (
    <div className="bg-[url('/src/assets/bluebkg.jpg')] bg-cover w-[calc(100%)] h-[calc(100%)] flex items-center justify-center">
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
        <div className="flex">
          {/* eslint-disable-next-line no-unused-vars*/}
          {Array.from(Array(sets.length), (_, index) => (
            <button
              key={index}
              className="rounded bg-purple-600 border border-purple-800 p-1 grow"
              onClick={() => {
                setSelectedSet(index);
                setBoardState(
                  new Array(8).fill(0).map(() => new Array(8).fill("blank"))
                );
                setInfoToSend([]);
                setPlacementCount(0);
              }}
            >
              {index}
            </button>
          ))}
        </div>
        <div className="container w-60 h-60 bg-sky-700">
          {shipArray.map((ship, index) => (
            <button
              key={index}
              className="mx-5 flex rounded bg-blue-500 border-blue-700 hover:bg-blue-600 active-bg-blue-700 focus-outline-none focus-ring focus-ring-blue-300"
            >
              {ship}
            </button>
          ))}
        </div>
        <div className="container flex h-10">
          <button
            className="flex-1 rounded border-2 bg-gradient-to-r border-lime-900 from-green-500 to-green-600 hover:bg-green-800 text-sm font-bold text-lime-900 shadow-sm sm:text-1xl"
            onClick={() => {
              if (placementCount !== maxPlacements) {
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
            className="flex-1 rounded border-2 bg-gradient-to-r border-lime-900 from-blue-500 to-blue-600 hover:bg-blue-800 text-sm font-bold text-blue-900 shadow-sm sm:text-1xl"
            onClick={handleShuffleShip}
          >
            Shuffle
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
