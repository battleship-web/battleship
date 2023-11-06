import { useEffect } from "react";
import { socket } from "../socket";
import Loading from "../components/Loading";
import RefreshButton from "./RefreshButton";
import ResetButton from "./ResetButton";

//Display Game list and current score
// Component function

function AdminPage({ gameList, clientList }) {
  useEffect(() => {
    socket.emit("gameListRequest");
    socket.emit("allClientListRequest");
  }, []);
  let gameListDisplay = null;
  let numberOfClients = clientList
    ? `(${clientList.length} connected clients)`
    : "loading...";
  let clientListDisplay = null;
  if (clientList === null) {
    clientListDisplay = <Loading />;
  } else {
    if (clientList.length === 0) {
      clientListDisplay = <h1>No Active Client</h1>;
    } else {
      const clientToDisplay = clientList.map((client) => {
        return (
          <tr key={client.username}>
            <td className="border-2 border-orange-950 text-center p-2">
              {client.nickname ? client.nickname : "Unknown"}
            </td>
            <td className="border-2 border-orange-950 text-center p-2">
              {client.username}
            </td>
            <td className="border-2 border-orange-950 text-center p-2">
              {client.gameId ? client.gameId : "-"}
            </td>
          </tr>
        );
      });
      clientListDisplay = (
        <table>
          <thead>
            <tr>
              <th className="border-2 border-orange-950 text-center p-2">
                Nickname
              </th>
              <th className="border-2 border-orange-950 text-center p-2">
                Username
              </th>
              <th className="border-2 border-orange-950 text-center p-2">
                Game ID
              </th>
            </tr>
          </thead>
          <tbody>{clientToDisplay}</tbody>
        </table>
      );
    }
  }

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
              <th className="border-2 border-orange-950 p-2">Buttons</th>
            </tr>
          </thead>
          <tbody>{listToDisplay}</tbody>
        </table>
      );
    }
  }

  return (
    <>
      <div className="min-h-[calc(100%)] w-[calc(100%)] bg-[url('/src/assets/bluebkg.jpg')] flex flex-col items-center gap-4 p-4 pt-16">
        <div className="w-full align-top flex justify-center">
          <h1 className="bg-sky-400  border-4 border-orange-950 font-bold p-2 rounded-md">
            ADMIN PAGE
          </h1>
        </div>
        <h1 className="bg-sky-300 border-2 border-orange-950 font-bold p-2 rounded-md">
          Games
        </h1>
        <div className="bg-sky-200">{gameListDisplay}</div>
        <h1 className="bg-sky-300 border-2 border-orange-950 font-bold p-2 rounded-md">
          Players {numberOfClients}
        </h1>
        <div className="bg-sky-200">{clientListDisplay}</div>
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
