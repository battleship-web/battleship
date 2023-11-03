import Loading from "../../components/Loading";
import Board from "../../squarenboard/Board";
import { socket } from "../../socket";
function WatchPage({
  turn,
  gameId,
  p1Score,
  p2Score,
  p1Board,
  p2Board,
  p1Info,
  p2Info,
  handleSptQuitGame,
  setGameStage,
}) {
  const numHitOnP1Board = p1Board
    ? p1Board
        .map((row) =>
          row.reduce((acc, cur) => {
            if (cur === "hit") {
              return acc + 1;
            } else {
              return acc;
            }
          }, 0)
        )
        .reduce((acc, cur) => acc + cur, 0)
    : null;

  const numHitOnP2Board = p2Board
    ? p2Board
        .map((row) =>
          row.reduce((acc, cur) => {
            if (cur === "hit") {
              return acc + 1;
            } else {
              return acc;
            }
          }, 0)
        )
        .reduce((acc, cur) => acc + cur, 0)
    : null;

  let display = null;
  if (!turn) {
    display = <Loading />;
  } else {
    display = (
      <div className="text-center">
        <div
          className="text-center items-center mb-6 relative isolate overflow-hidden px-20 py-40"
          style={{
            backgroundImage: "url('/src/assets/scroll.png')",
            backgroundSize: "100% 100%",
          }}
        >
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-orange-950 sm:text-5xl pt-5">
            BATTLESHIP{" "}
          </h1>
          <h1 className="mt-2 text-base leading-7 text-blue-950 font-bold bg-orange-700 rounded-md sm:text-2xl">
            {turn === p1Info.socketId
              ? `${p1Info.nickname}'s Turn`
              : `${p2Info.nickname}'s Turn`}
          </h1>
          <div className="mt-8 text-center items-center">
            <div className="flex-row">
              <div className="inline-flex mr-10 items-center rounded-md bg-red-200 px-2 py-1 text-1x1 font-bold text-red-950 border-2 border-red-950">
                General {p1Info.nickname}
              </div>
              <span className="inline-flex items-center rounded-md bg-red-200 px-2 py-1 text-1x1 font-bold text-red-950 border-2 border-red-950">
                POINT {p1Score}
              </span>
              <span className="inline-flex ml-10 mr-20 items-center rounded-md bg-red-200 px-2 py-1 text-1x1 font-bold text-red-950 border-2 border-red-950">
                No. of Hits: {numHitOnP2Board}
              </span>
              <span className="inline-flex ml-20 mr-10 items-center rounded-md bg-green-200 px-2 py-1 text-1x1 font-bold text-green-950 border-2 border-green-950">
                General {p2Info.nickname}
              </span>
              <span className="inline-flex mr-10 items-center rounded-md bg-green-200 px-2 py-1 text-1x1 font-bold text-green-950 border-2 border-green-950">
                POINT {p2Score}
              </span>
              <span className="inline-flex items-center rounded-md bg-green-200 px-2 py-1 text-1x1 font-bold text-green-950 border-2 border-green-950">
                No. of Hits: {numHitOnP1Board}
              </span>
            </div>
          </div>
          <div className="mt-2 mb-12">
            <div className="flex flex-row">
              <h1 className="mr-2">
                <Board board={p1Board} onClick={() => {}} size="big" />
              </h1>
              <h1 className="mt-20 text-orange-950 sm:text-8xl font-bold">
                vs
              </h1>
              <h1 className="ml-2">
                <Board board={p2Board} onClick={() => {}} size="big" />
              </h1>
            </div>
          </div>
        </div>

        <button
          className="mt-6 rounded-md bg-gradient-to-r from-red-500 to-red-600 px-2 py-2 text-sm font-bold text-red-900 shadow-sm sm:text-1xl hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-900 border-2 border-red-900"
          onClick={() => {
            socket.emit("sptLeaveRoom", gameId);
            handleSptQuitGame();
            setGameStage("menu:arena");
          }}
        >
          Leave Spectator Mode
        </button>
      </div>
    );
  }
  return (
    <div
      className="grid w-screen min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8 bg-cover"
      style={{
        backgroundImage: "url('/src/assets/bluebkg.jpg')",
        backgroundSize: "100% 100%",
      }}
    >
      {display}
    </div>
  );
}
export default WatchPage;
