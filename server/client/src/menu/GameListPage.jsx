import { socket } from "../socket";
import Loading from "../components/Loading";
import { useEffect } from "react";

function GameListPage({
  gameList,
  setSptGameId,
  setP1Info,
  setP2Info,
  setGameStage,
}) {
  useEffect(() => {
    socket.emit("gameListRequest");
  }, []);
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
          <tr key={game.gameId}>
            <td className="border-2 border-orange-950 text-center p-2">
              {`${game.player1.nickname} (${game.player1.username}) vs `}
              {`${game.player2.nickname} (${game.player2.username})`}
            </td>
            <td className="border-2 border-orange-950 text-center p-2">
              {game.player1.score} : {game.player2.score}
            </td>
            <td className="border border-orange-950 p-2">
              <button
                className="p-1 mx-2 rounded-md bg-gradient-to-r from-orange-800 to-orange-700 px-2 py-2 text-sm font-bold text-orange-950 shadow-sm sm:text-1xl hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-950 border-2 border-orange-95"
                onClick={() => {
                  socket.emit("watch", game.gameId);
                  setSptGameId(game.gameId);
                  setP1Info({
                    username: game.player1.username,
                    nickname: game.player1.nickname,
                    level: game.player1.level,
                    profilePicture: game.player1.profilePicture,
                    socketId: game.player1.socketId,
                  });
                  setP2Info({
                    username: game.player2.username,
                    nickname: game.player2.nickname,
                    level: game.player2.level,
                    profilePicture: game.player2.profilePicture,
                    socketId: game.player2.socketId,
                  });
                  setGameStage("spt:watch");
                }}
              >
                Watch!
              </button>
            </td>
          </tr>
        );
      });
      gameListDisplay = (
        <table className="border-collapse border-2 border-orange-950">
          <thead>
            <tr>
              <th className="border-2 border-orange-950 p-2">
                Competing Players
              </th>
              <th className="border-2 border-orange-950 p-2">Scores</th>
              <th className="border-2 border-orange-950 p-2">Watch</th>
            </tr>
          </thead>
          <tbody>{listToDisplay}</tbody>
        </table>
      );
    }
  }
  return (
    <div className="flex flex-col items-center gap-4 p-4 pt-24 min-h-[calc(100%)] w-[calc(100%)] bg-[url('/src/assets/bluebkg.jpg')] dark:bg-[url('/src/assets/darkbluebkg.png')]">
      <h1 className="bg-sky-300 border-2 border-orange-950 font-bold p-2 rounded-md">
        Games
      </h1>
      <div className="bg-sky-200">{gameListDisplay}</div>
      <button
        className="p-2 rounded-md bg-gradient-to-r from-orange-800 to-orange-700 px-2 py-2 text-sm font-bold text-orange-950 shadow-sm sm:text-1xl hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-950 border-2 border-orange-95"
        onClick={() => {
          socket.emit("gameListRequest");
        }}
      >
        Refresh
      </button>
      <button
        className="p-2 rounded-md bg-gradient-to-r from-orange-800 to-orange-700 px-2 py-2 text-sm font-bold text-orange-950 shadow-sm sm:text-1xl hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-950 border-2 border-orange-95"
        onClick={() => {
          setGameStage("menu:lobby");
        }}
      >
        Go back
      </button>
    </div>
  );
}
export default GameListPage;
