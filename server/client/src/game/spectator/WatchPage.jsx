import Loading from "../../components/Loading";
import Board from "../../squarenboard/Board";
import { socket } from "../../socket";
import ProfilePicture from "../../components/ProfilePicture";
import Emote from "../../components/Emote";

function WatchPage({
  turn,
  gameId,
  p1Score,
  p2Score,
  p1Board,
  p2Board,
  p1Info,
  p2Info,
  p1Emote,
  p2Emote,
  handleSptQuitGame,
  setGameStage,
}) {
  const numHitOnP1Board = p1Board
    ? p1Board
        .map((row) =>
          row.reduce((acc, cur) => {
            if (cur === "hit" || cur === "lightningHit") {
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
            if (cur === "hit" || cur === "lightningHit") {
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
        <div className="text-center items-center mb-6 relative isolate overflow-hidden px-20 py-40 bg-[url('/src/assets/scroll.png')] dark:bg-[url('/src/assets/scroll.png')] bg-[length:100%_100%]">
          <h1 className="mt-5 text-base leading-7 text-blue-950 font-bold bg-orange-700 rounded-md sm:text-2xl">
            {turn === p1Info.socketId
              ? `${p1Info.nickname}'s Turn`
              : `${p2Info.nickname}'s Turn`}
          </h1>
          <div className="mt-5 text-center">
            <div className="flex justify-between">
              <div className="flex gap-1 items-center">
                <div className="flex flex-col">
                  <span className="inline-flex items-center rounded-md bg-red-200 px-2 py-1 text-lg font-bold text-red-950 border-2 border-red-950">
                    General {p1Info.nickname}
                  </span>
                  {p1Info.level ? (
                    <div className="items-center rounded-md bg-red-200 px-2 py-1 text-lg font-bold text-red-950 border-2 border-red-950">
                      Lvl: {p1Info.level}
                    </div>
                  ) : null}
                </div>

                <div>
                  <ProfilePicture picture={p1Info.profilePicture} size="big" />
                </div>
                <span className="inline-flex items-center rounded-md bg-red-200 px-2 py-1 text-base font-bold text-red-950 border-2 border-red-950">
                  POINT {p1Score}
                </span>
                <span className="inline-flex items-center rounded-md bg-red-200 px-2 py-1 text-base font-bold text-red-950 border-2 border-red-950">
                  No. of Hits: {numHitOnP2Board}
                </span>
              </div>
              <div className="flex gap-1 items-center mr-14">
                <div className="flex flex-col">
                  <span className="inline-flex items-center rounded-md bg-green-200 px-2 py-1 text-xl font-bold text-green-950 border-2 border-green-950">
                    General {p2Info.nickname}
                  </span>
                  {p2Info.level ? (
                    <div className="items-center rounded-md bg-green-200 px-2 py-1 text-lg font-bold text-red-950 border-2 border-red-950">
                      Lvl: {p2Info.level}
                    </div>
                  ) : null}
                </div>

                <div>
                  <ProfilePicture picture={p2Info.profilePicture} size="big" />
                </div>
                <span className="inline-flex items-center rounded-md bg-green-200 px-2 py-1 text-base font-bold text-green-950 border-2 border-green-950">
                  POINT {p2Score}
                </span>
                <span className="inline-flex items-center rounded-md bg-green-200 px-2 py-1 text-base font-bold text-green-950 border-2 border-green-950">
                  No. of Hits: {numHitOnP1Board}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-2 mb-12">
            <div className="flex flex-row">
              <div className="mr-2">
                <Board board={p1Board} onClick={() => {}} size="big" />
              </div>
              <div className="flex flex-col justify-between">
                <div className="flex flex-col items-center">
                  <h1 className="font-bold">{`${p1Info.nickname}'s Emote`}</h1>
                  {p1Emote ? (
                    <Emote emote={p1Emote} />
                  ) : (
                    <div className="w-12 h-12">None</div>
                  )}
                </div>
                <h1 className="text-orange-950 sm:text-8xl font-bold">vs</h1>
                <div className="flex flex-col items-center">
                  <h1 className="font-bold">{`${p2Info.nickname}'s Emote`}</h1>
                  {p2Emote ? (
                    <Emote emote={p2Emote} />
                  ) : (
                    <div className="w-12 h-12">None</div>
                  )}
                </div>
              </div>
              <div className="ml-2">
                <Board board={p2Board} onClick={() => {}} size="big" />
              </div>
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
    <div className="grid w-[calc(100%)] min-h-[calc(100%)] place-items-center px-6 py-24 sm:py-32 lg:px-8 bg-cover bg-[url('/src/assets/bluebkg.jpg')] dark:bg-[url('/src/assets/darkbluebkg.png')]">
      {display}
    </div>
  );
}
export default WatchPage;
