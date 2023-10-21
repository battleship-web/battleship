import { useEffect } from "react";
import Loading from "../components/Loading";
import RefreshButton from "./RefreshButton";
import ResetButton from "./ResetButton";

//Display Game list and current score
// Component function
function AdminPage({gameList, gameID, score}) {
  useEffect(() => {
    socket.emit("gameListRequest");
  });
  let gameListDisplay = null;
  if (socket.on("gameList")) {
    if (gameList === null) {
      gameListDisplay = <Loading />;
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

  
  

  return(
    <>
    <div className="background" class="w-full h-full bg-[url('/iowa-class.jpg')]">
      <div className="adminPage" class="w-full h-1/6 align-top">
        <h1 align="center">Admin Page</h1>
      </div>
      <div class="px-28 h-4/6 bg-zinc-100 opacity-50">
        {gameListDisplay}
      </div>
      <div className="footer" class="w-full h-1/6 align-bottom">
        <div className="refreshButton" class="object-center">
          <RefreshButton />
        </div>
      </div>
    </div>
  </>
  );
}
export default AdminPage
