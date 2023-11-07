import { socket } from "../../socket";

function WinnerPage({
  gameId,
  winner,
  p1Info,
  p2Info,
  setGameStage,
  handleSptQuitGame,
}) {
  let winText =
    winner === p1Info.socketId
      ? `${p1Info.nickname} won!`
      : `${p2Info.nickname} won!`;

  const flavorText1 = "Was that a fun game?";

  return (
    <main
      className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8 h-[calc(100%)] w-[calc(100%)] bg-[url('/src/assets/bluebkg.jpg')] dark:bg-[url('/src/assets/darkbluebkg.png')]">
      <div
        className="text-center py-20 px-10 h-[calc(100%)] w-[calc(100%)] bg-[url('/src/assets/scroll.png')] dark:bg-[url('/src/assets/darkscroll.png')]">
        <span
          className={`mt-2 text-12xl font-mono font-bold tracking-tight bg-gradient-to-r $from-lime-900 via-lime-800 to-lime-700 animate-pulse inline-block bg-clip-text sm:text-7xl `}
        >
          {winText}
        </span>
        <div className="  place-items-center  lg:text-middle"></div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight bg-gradient-to-r from-red-600 via-green-500 to-indigo-500 inline-block text-transparent bg-clip-text sm:text-3xl">
          {flavorText1}
        </h1>
        <div className="mt-7 flex items-center justify-center gap-x-6">
          <button
            className="rounded-md bg-gradient-to-r from-orange-800 to-orange-700 px-2 py-2 text-sm font-bold text-orange-950 shadow-sm sm:text-1xl hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-950 border-2 border-orange-950"
            onClick={() => {
              socket.emit("sptLeaveRoom", gameId);
              handleSptQuitGame();
              setGameStage("menu:arena");
            }}
          >
            Leave spectator mode
          </button>
        </div>
      </div>
    </main>
  );
}
export default WinnerPage;
