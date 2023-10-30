import Board from "../squarenboard/Board";
import { socket } from "../socket";
import { useEffect, useState } from "react";
import Timer from "./Timer";
function Score({
  handleClickInstruction,
  user,
  playerBoard,
  opponentBoard,
  setOpponentBoard,
  turn,
  playerScore,
  opponentScore,
  opponentInfo,
  numHitOnPlayerBoard,
  numHitOnOpponentBoard,
  handleQuitGame,
  setGameStage,
}) {
  const [fired, setFired] = useState(false);
  const handleOpponentBoardClick = (rowIndex, columnIndex, state) => {
    if (state !== "blank" || turn !== socket.id || fired) {
      return;
    }
    socket.emit("fire", { x: columnIndex, y: rowIndex });
    const newBoard = opponentBoard.map((row) => row.slice());
    newBoard[rowIndex][columnIndex] = "selected";
    setOpponentBoard(newBoard);
    setFired(true);
  };

  const handleZero = () => {
    if (fired) {
      return;
    }
    let gotValidPos = false;
    let ranX = null;
    let ranY = null;
    while (!gotValidPos) {
      ranX = Math.floor(Math.random() * 8);
      ranY = Math.floor(Math.random() * 8);
      if (opponentBoard[ranY][ranX] === "blank") {
        gotValidPos = true;
      }
    }
    socket.emit("fire", { x: ranX, y: ranY });
    const newBoard = opponentBoard.map((row) => row.slice());
    newBoard[ranY][ranX] = "selected";
    setOpponentBoard(newBoard);
    setFired(true);
  };

  useEffect(() => {
    if (turn === socket.id) {
      setFired(false);
    }
  }, [turn]);

  return (
    <main className="text-center">
     <div className="text-center items-center mb-6 relative isolate overflow-hidden px-20 py-40"
        style={{
          backgroundImage: "url('/src/assets/scroll.png')",
          backgroundSize: "100% 100%",}}>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-orange-950 sm:text-5xl pt-5">
          BATTLESHIP{" "}
        </h1>
        {turn === socket.id ? (
          <Timer startSeconds={20} onZero={handleZero} fired={fired} />
        ) : (
          <h1 className="mt-2 text-base leading-7 text-blue-950 font-bold bg-orange-700 rounded-md sm:text-2xl">
            Opponent&apos;s Turn
          </h1>
        )}
        <div className="mt-8 text-center items-center">
          <div className="flex-row">
            <div className="inline-flex mr-10 items-center rounded-md bg-red-200 px-2 py-1 text-1x1 font-bold text-red-950 border-2 border-red-950">
              General {opponentInfo.nickname}
            </div>
            <span className="inline-flex items-center rounded-md bg-red-200 px-2 py-1 text-1x1 font-bold text-red-950 border-2 border-red-950">
              POINT {opponentScore}
            </span>
            <span className="inline-flex ml-10 mr-20 items-center rounded-md bg-red-200 px-2 py-1 text-1x1 font-bold text-red-950 border-2 border-red-950">
              No. of Hits: {numHitOnPlayerBoard}
            </span>
            <span className="inline-flex ml-20 mr-10 items-center rounded-md bg-green-200 px-2 py-1 text-1x1 font-bold text-green-950 border-2 border-green-950">
              General {user.nickname}
            </span>
            <span className="inline-flex mr-10 items-center rounded-md bg-green-200 px-2 py-1 text-1x1 font-bold text-green-950 border-2 border-green-950">
              POINT {playerScore}
            </span>
            <span className="inline-flex items-center rounded-md bg-green-200 px-2 py-1 text-1x1 font-bold text-green-950 border-2 border-green-950">
              No. of Hits: {numHitOnOpponentBoard}
            </span>
          </div>
        </div>
        <div className="mt-2 mb-12">
          <div className="flex flex-row">
            <h1 className="mr-2">
              <Board
                board={opponentBoard}
                onClick={handleOpponentBoardClick}
                size="big"
              />
            </h1>
            <h1 className="mt-20 text-orange-950 sm:text-8xl font-bold">vs</h1>
            <h1 className="ml-2">
              <Board board={playerBoard} onClick={() => {}} size="big" />
            </h1>
          </div>
        </div>
      </div>

      <button
        className="mt-6 rounded-md bg-gradient-to-r from-orange-800 to-orange-700 px-2 py-2 text-sm font-bold text-orange-950 shadow-sm sm:text-1xl hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-950 border-2 border-orange-950 mr-5"
        onClick={handleClickInstruction}
      >
        Instructions
      </button>
      <button
        className="mt-6 rounded-md bg-gradient-to-r from-red-500 to-red-600 px-2 py-2 text-sm font-bold text-red-900 shadow-sm sm:text-1xl hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-900 border-2 border-red-900"
        onClick={() => {
          socket.emit("quit");
          handleQuitGame();
          setGameStage("menu:lobby");
        }}
      >
        Leave Match
      </button>
    </main>
  );
}
export default Score;
