import Board from "../squarenboard/Board";
import { socket } from "../socket";
import { useEffect, useState } from "react";
import Timer from "./Timer";
import bombPic from "../assets/bomb.png";
import ProfilePicture from "./ProfilePicture";
import Emote from "./Emote";

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
  emote,
  setEmote,
  opponentEmote,
}) {
  const [fired, setFired] = useState(false);
  const [bombSelected, setBombSelected] = useState(false);
  const [bombUsed, setBombUsed] = useState(false);

  const emotes = ["thumbsup", "thumbdown", "happy", "angry", "ohno"];
  const handleOpponentBoardClick = (rowIndex, columnIndex, state) => {
    if (state !== "blank" || turn !== socket.id || fired) {
      return;
    }
    if (bombSelected) {
      socket.emit("fire", { x: columnIndex, y: rowIndex, bomb: true });
      setBombUsed(true);
      setBombSelected(false);
    } else {
      socket.emit("fire", { x: columnIndex, y: rowIndex, bomb: false });
    }
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
      <div className="text-center bg-[length:100%_100%] bg-[url('/src/assets/scroll.png')] dark:bg-[url('/src/assets/darkscroll.png')] items-center mb-6 relative isolate overflow-hidden px-20 py-40">
        {turn === socket.id ? (
          <Timer startSeconds={10} onZero={handleZero} fired={fired} />
        ) : (
          <h1 className="mt-2 text-base leading-7 text-blue-950 font-bold bg-orange-700 rounded-md sm:text-2xl">
            Opponent&apos;s Turn
          </h1>
        )}
        <div className="mt-5 text-center">
          <div className="flex justify-between">
            <div className="flex gap-1 items-center">
              <div className="flex flex-col">
                <span className="inline-flex items-center rounded-md bg-red-200 px-2 py-1 text-lg font-bold text-red-950 border-2 border-red-950">
                  General {opponentInfo.nickname}
                </span>
                {opponentInfo.level ? (
                  <div className="items-center rounded-md bg-red-200 px-2 py-1 text-lg font-bold text-red-950 border-2 border-red-950">
                    Lvl: {opponentInfo.level}
                  </div>
                ) : null}
              </div>

              <div>
                <ProfilePicture
                  picture={opponentInfo.profilePicture}
                  size="big"
                />
              </div>
              <span className="inline-flex items-center rounded-md bg-red-200 px-2 py-1 text-base font-bold text-red-950 border-2 border-red-950">
                POINT {opponentScore}
              </span>
              <span className="inline-flex items-center rounded-md bg-red-200 px-2 py-1 text-base font-bold text-red-950 border-2 border-red-950">
                No. of Hits: {numHitOnPlayerBoard}
              </span>
            </div>
            <div className="flex gap-1 items-center mr-14">
              <div className="flex flex-col">
                <span className="inline-flex items-center rounded-md bg-green-200 px-2 py-1 text-xl font-bold text-green-950 border-2 border-green-950">
                  General {user.nickname}
                </span>
                {user.level ? (
                  <div className="items-center rounded-md bg-green-200 px-2 py-1 text-lg font-bold text-red-950 border-2 border-red-950">
                    Lvl: {user.level}
                  </div>
                ) : null}
              </div>

              <div>
                <ProfilePicture picture={user.profilePicture} size="big" />
              </div>
              <span className="inline-flex items-center rounded-md bg-green-200 px-2 py-1 text-base font-bold text-green-950 border-2 border-green-950">
                POINT {playerScore}
              </span>
              <span className="inline-flex items-center rounded-md bg-green-200 px-2 py-1 text-base font-bold text-green-950 border-2 border-green-950">
                No. of Hits: {numHitOnOpponentBoard}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-2 mb-12">
          <div className="flex flex-row">
            <div className="mr-2">
              <Board
                board={opponentBoard}
                onClick={handleOpponentBoardClick}
                size="small"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex flex-col items-center">
                <h1 className="font-bold">{`${opponentInfo.nickname}'s Emote`}</h1>
                {opponentEmote ? (
                  <Emote emote={opponentEmote} />
                ) : (
                  <div className="w-12 h-12">None</div>
                )}
              </div>
              <h1 className="text-orange-950 sm:text-8xl font-bold">vs</h1>
              <div className="flex flex-col items-center">
                <h1 className="font-bold">{`${user.nickname}'s Emote`}</h1>
                {emote ? (
                  <Emote emote={emote} />
                ) : (
                  <div className="w-12 h-12">None</div>
                )}
              </div>
            </div>

            <div className="ml-2">
              <Board board={playerBoard} onClick={() => {}} size="small" />
            </div>
            <div className="flex flex-col">
              <button
                className={`self-start ml-3 mb-3 ${
                  bombSelected
                    ? "bg-green-400 rounded border-2 border-green-700"
                    : "bg-blue-400 rounded border-2 border-blue-700"
                } ${
                  bombUsed ? "bg-red-400 rounded border-2 border-red-700" : ""
                }`}
                onClick={() => {
                  if (bombUsed) {
                    return;
                  }
                  setBombSelected(!bombSelected);
                }}
              >
                <img src={bombPic} className="w-12 h-12" />
              </button>
              {emotes.map((emote, index) => (
                <button
                  key={index}
                  className="ml-3"
                  onClick={() => {
                    setEmote(emote);
                    socket.emit("sendEmote", emote);
                  }}
                >
                  <Emote emote={emote} />
                </button>
              ))}
            </div>
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
