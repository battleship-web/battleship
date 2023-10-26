import React, { useState } from "react";
import "./Grid.css";

const Grid = () => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [buttonImage, setButtonImage] = useState("ship.png");

  const [placementCount, setPlacementCount] = useState(0); // Counter for placements
  const maxPlacements = 4; // Maximum number of placements allowed

  const handleButtonClick = () => {
    setIsButtonClicked(true);
    setButtonImage("gray_ship.png"); // Gray image
  };

  const gridSize = 8;
  const [gridItems, setGridItems] = useState(
    Array(gridSize * gridSize).fill(null)
  );
  const [selectionMode, setSelectionMode] = useState("row");
  const [numXToPlace, setNumXToPlace] = useState(4); // Set to 4

  const objectToPlace = "X";

  const handleSquareClick = (index) => {
    if (placementCount >= maxPlacements) {
      alert("You have reached the maximum number of placements.");
      return;
    }

    const newGridItems = [...gridItems];

    const row = Math.floor(index / gridSize);
    const column = index % gridSize;

    if (row >= gridSize - numXToPlace + 1 && selectionMode !== "row") {
      alert(
        `You cannot place a ${numXToPlace}-size ship below the ${
          gridSize - numXToPlace + 1
        }th row.`
      );
      return;
    }

    if (
      ((numXToPlace === 3 && column >= gridSize - 2) ||
        (numXToPlace === 4 && column >= gridSize - 3) ||
        (numXToPlace === 5 && column >= gridSize - 4)) &&
      selectionMode === "row"
    ) {
      alert(
        `You cannot place a ${numXToPlace}-size ship after the ${
          gridSize - numXToPlace + 1
        }th column.`
      );
      return;
    }

    for (let i = 0; i < numXToPlace; i++) {
      if (newGridItems[index + i] === objectToPlace) {
        alert(`Battleships should not overlap`);
        return;
      }
    }

    if (newGridItems[index] !== objectToPlace) {
      if (selectionMode === "row") {
        for (let i = 0; i < numXToPlace; i++) {
          if (newGridItems[index + i] !== objectToPlace) {
            newGridItems[index + i] = objectToPlace;
          }
        }
      } else {
        const columnIndex = index;
        for (let i = 0; i < numXToPlace; i++) {
          if (newGridItems[columnIndex + i * gridSize] !== objectToPlace) {
            newGridItems[columnIndex + i * gridSize] = objectToPlace;
          }
        }
      }
      setPlacementCount(placementCount + 1); // Increase placement count
    }

    setGridItems(newGridItems);
  };

  const toggleSelectionMode = () => {
    setSelectionMode((prevMode) => (prevMode === "row" ? "column" : "row"));
  };

  const toggleNumXToPlace = () => {
    setNumXToPlace((prevNum) => (prevNum === 5 ? 3 : prevNum + 1));
  };

  const gridSquares = gridItems.map((item, index) => {
    const isEvenRow = Math.floor(index / gridSize) % 2 === 0;
    const isEvenCol = index % 2 === 0;
    const backgroundColor = isEvenRow
      ? isEvenCol
        ? "teal"
        : "lightblue"
      : isEvenCol
      ? "lightblue"
      : "teal";

    const squareStyle = {
      backgroundColor: backgroundColor,
    };

    return (
      <div
        key={`square-${index}`}
        className={`square ${
          selectionMode === "column" ? "column-selection" : ""
        }`}
        onClick={() => handleSquareClick(index)}
        style={squareStyle}
      >
        {item}
      </div>
    );
  });

  return (
    <div className="page-background">
      <div className="align-middle grid-page">
        <div className="grid-container">{gridSquares}</div>
      </div>
      <div className="rotate-container">
        <button
          className="bg-teal-200 rotate-button"
          onClick={toggleSelectionMode}
        >
          <img class="object-right w-14 h-14" url="rotate.png" />
        </button>
        <div className="container bg-teal-200 w-2000 h-100">
          {selectionMode}
        </div>
      </div>
      <div className="color-buttons-container">
        <span>Place your Battleships!</span>
        <div className="container bg-blue-200 w-10">
          {/* <button className="rotate-button" onClick={toggleSelectionMode}>
            <img class="object-right w-10 h-10" url="rotate.png" />
          </button>
          <div className="container bg-teal-200 w-2000 h-100">
            {selectionMode}
          </div> */}
        </div>
        <button class="rounded border bg-blue-500 border-blue-700 hover:bg-blue-600 active-bg-blue-700 focus-outline-none focus-ring focus-ring-blue-300">
          <img class="color-button w-full h-full object-contain" />
        </button>
        <button class="rounded border bg-blue-500 border-blue-700 hover:bg-blue-600 active-bg-blue-700 focus-outline-none focus-ring focus-ring-blue-300">
          <img class="color-button w-full h-full object-contain" />
        </button>
        <button class="rounded border bg-blue-500 border-blue-700 hover:bg-blue-600 active-bg-blue-700 focus-outline-none focus-ring focus-ring-blue-300">
          <img class="color-button w-full h-full object-contain" />
        </button>
        <button class="rounded border bg-blue-500 border-blue-700 hover:bg-blue-600 active-bg-blue-700 focus-outline-none focus-ring focus-ring-blue-300">
          <img class="color-button w-full h-full object-contain" />
        </button>
        <button class="rounded border bg-red-500 hover:bg-red-900">
          Leave Match
        </button>
        {/* <button class="rounded border border-blue-700 color-button shift-left hover:bg-blue-600 active-bg-blue-700 focus-outline-none focus-ring focus-ring-blue-300"></button> */}
      </div>
    </div>
  );
};

export default Grid;
