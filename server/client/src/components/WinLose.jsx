import { socket } from "../socket";

export default function WinLose({ setGameStage, handleQuitGame, win }) {
  const declareText = win ? "VICTORY!" : "DEFEAT!";
  const greenRed = win
    ? "from-lime-900 via-lime-800 to-lime-700"
    : "from-red-800 via-red-700 to-red-600";
  const flavorText1 = win ? "Congratulations" : "Better luck next time ";
  const flavorText2 = win
    ? "You have defeated your enemy!"
    : "You almost got it, maybe try again?";

  return (
    <main
      className="grid min-h-[calc(100%)] w-[calc(100%)] bg-[length:100%_100%] dark:bg-[url('/src/assets/darkbluebkg.png')] bg-[url('/src/assets/bluebkg.jpg')] place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center py-20 px-10 bg-[length:100%_100%] dark:bg-[url('/src/assets/darkscroll.png')] bg-[url('/src/assets/scroll.png')]">
        <span
          className={`mt-2 text-12xl font-mono font-bold tracking-tight bg-gradient-to-r ${greenRed} animate-pulse inline-block text-transparent bg-clip-text sm:text-7xl `}
        >
          {declareText}
        </span>
        <div className="  place-items-center  lg:text-middle"></div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight bg-gradient-to-r from-red-600 via-green-500 to-indigo-500 inline-block text-transparent bg-clip-text sm:text-3xl">
          {flavorText1}
        </h1>
        <p className="mt-3 text-base leading-7 text-orange-950 font-bold">
          {flavorText2}
        </p>
        <div className="mt-7 flex items-center justify-center gap-x-6">
          <button
            className="rounded-md bg-gradient-to-r from-orange-800 to-orange-700 px-2 py-2 text-sm font-bold text-orange-950 shadow-sm sm:text-1xl hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-950 border-2 border-orange-950"
            onClick={() => {
              handleQuitGame();
              socket.emit("replay", false);
              setGameStage("menu:lobby");
            }}
          >
            ← Go back home
          </button>

          <button
            className="rounded-md bg-gradient-to-r  from-orange-800 to-orange-700 px-2 py-2 text-sm font-bold text-orange-950 shadow-sm sm:text-1xl hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-950 border-2 border-orange-950"
            onClick={() => {
              socket.emit("replay", true);
              setGameStage("game:waitForReplay");
            }}
          >
            Start over <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </main>
  );
}
