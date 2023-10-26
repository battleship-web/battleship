import Board from "../squarenboard/Board";
import { socket } from "../socket";
function Score({
  handleClickInstruction,
  user,
  setGameStage,
  board,
  turn,
  scores,
  opponentInfo,
}) {
  let playerScore = null;
  let opponentScore = null;
  if (scores[0].socketId === socket.id) {
    playerScore = scores[0].score;
    opponentScore = scores[1].score;
  } else {
    playerScore = scores[1].score;
    opponentScore = scores[0].score;
  }
  return (
    <main className="text-center">
      <div className="text-center items-center mb-6 relative isolate overflow-hidden bg-[url(https://thumbs.dreamstime.com/b/iron-background-threadbare-rusty-steel-covering-rivet-44688853.jpg)] px-10 py-4 shadow-2xl sm:rounded-3xl">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-yellow-500 sm:text-5xl">
          BATTLESHIP{" "}
        </h1>
        <div className="mt-2 text-base leading-7 text-white font-bold bg-blue-600 rounded-md sm:text-2xl">
          Timer
        </div>
        <div className="mt-8 text-center items-center">
          <div className="flex-row">
            <div className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-1x1 font-bold text-red-700">
              General {opponentInfo.nickname}
            </div>
            <span className="inline-flex ml-10 mr-20 items-center rounded-md bg-red-50 px-2 py-1 text-1x1 font-bold text-red-700">
              POINT {playerScore}
            </span>
            <span className="inline-flex ml-20 mr-10 items-center rounded-md bg-green-50 px-2 py-1 text-1x1 font-bold text-green-700">
              General {user.nickname}
            </span>
            <span className="inline-flex  items-center rounded-md bg-green-50 px-2 py-1 text-1x1 font-bold text-green-700">
              POINT {opponentScore}
            </span>
          </div>
        </div>
        <div className="mt-2 mb-12">
          <div className="flex flex-row">
            <h1 className="mr-2">
              <Board board={opponentboard} onClick={onClick} size="big" />
            </h1>
            <h1 className="mt-20 text-orange-500 sm:text-8xl font-bold">vs</h1>
            <h1 className="ml-2">
              <Board board={board} onClick={onClick} size="small" />
            </h1>
          </div>
        </div>
      </div>

      <button
        className="mt-6 rounded-md bg-gradient-to-r from-blue-600 to-sky-500 px-2 py-2 text-sm font-bold text-white shadow-sm sm:text-1xl hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border-2 border-gray-400"
        onClick={handleClickInstruction}
      >
        Instruction
      </button>
    </main>
  );
}
export default Score;
