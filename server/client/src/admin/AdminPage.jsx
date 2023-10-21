import { useEffect } from "react";
import { socket } from "../socket";
import Loading from "../components/Loading";
import RefreshButton from "./RefreshButton";
import ResetButton from "./ResetButton";

//Display Game list and current score
// Component function
function AdminPage({ gameList }) {
  useEffect(() => {
    socket.emit("gameListRequest");
  });
  let gameListDisplay = null;

  if (gameList === null) {
    gameListDisplay = <Loading />;
  } else {
    //Show "No Active Game" if there is no active game
    if (gameList.length === 0) {
      gameListDisplay = <h1>No Active Game</h1>;
    } else {
      const listToDisplay = gameList.map((game) => {
        // Adjust the gameList structure a little bit
        // Add two more buttons and add options for the emitting socket event
        return (
          <li key={game.gameId} className="flex justify-center gap-8">
            <div className="w-80 border-2 border-black">
              {game.player1.username} vs {game.player2.username}
            </div>
            <div className="w-40 border-2 border-black text-center">
              {game.player1.score} : {game.player2.score}
            </div>

            <ResetButton
              text="Reset Score"
              options={{
                gameId: game.gameId,
                toReset: "score",
              }}
            />
            <ResetButton
              text="Reset Game"
              options={{
                gameId: game.gameId,
                toReset: "game",
              }}
            />
            <ResetButton
              text="Cancel Game"
              options={{
                gameId: game.gameId,
                toReset: "cancel",
              }}
            />
          </li>
        );
      });
      gameListDisplay = <ul>{listToDisplay}</ul>;
    }
  }

  return (
    <>
      <div className="w-full h-full bg-[url('/iowa-class.jpg')]">
        <div className="w-full h-1/6 align-top flex justify-center">
          <h1 className="">Admin Page</h1>
        </div>
        <div className="flex justify-start">
          <h1 className="ml-24">Match</h1>
          <h1 className="ml-40">Score</h1>
        </div>
        <div className="bg-zinc-100 opacity-50">{gameListDisplay}</div>
        <div className="w-full h-1/6 align-bottom">
          <div className="text-center">
            <RefreshButton />
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminPage;