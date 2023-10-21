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
        return(
          <li key={game.gameID}>
            <h2 class="mr-8">{game.player1} vs {game.player2}</h2>
            <h2 class="mr-40">{game.score}</h2>
            <h2 class="object-right"><ResetButton /></h2>
          </li>
        );
      });
      gameListDisplay = <ul>{listToDisplay}</ul>
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
