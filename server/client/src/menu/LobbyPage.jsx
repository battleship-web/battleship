import { useEffect } from "react";
import Loading from "../components/Loading";
import { socket } from "../socket";

function LobbyPage({ clientList, username }) {
  useEffect(() => {
    socket.emit("clientListRequest");
  }, []);
  let display = null;
  if (clientList === null) {
    display = <Loading />;
  } else {
    const clientExcludingMe = clientList.filter((client) => {
      return client.username !== username;
    });

    if (clientExcludingMe.length === 0) {
      display = <h1>No other connected client.</h1>;
    } else {
      const listToDisplay = clientExcludingMe.map((client) => {
        return (
          <li className="flex justify-center" key={client.username}>
            <h1 className="mr-5">{client.nickname}</h1>
            <h2>{client.username}</h2>
          </li>
        );
      });
      display = <ul>{listToDisplay}</ul>;
    }
  }
  display = (
    <div>
      {display}
      <div>
        <button
          className="border-2 bg-slate-300 border-slate-700 p-1 m-2"
          onClick={() => {
            socket.emit("clientListRequest");
          }}
        >
          Refresh
        </button>
      </div>
    </div>
  );
  return display;
}
export default LobbyPage;
