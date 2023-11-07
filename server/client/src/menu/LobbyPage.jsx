import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Inviting from "../components/Inviting";
import InviteeLeft from "../components/InviteeLeft";
import InviteAccepted from "../components/InviteAccepted";
import InviteRefused from "../components/InviteRefused";
import IncomingInvite from "../components/IncomingInvite";
import { socket } from "../socket";
import { PropTypes } from "prop-types";

function LobbyPage({
  clientList,
  username,
  setGameStage,
  inviteeLeft,
  inviteAccepted,
  inviteRefused,
  setInviteAccepted,
  setInviteRefused,
  setInviteeLeft,
  incomingInvite,
  setIncomingInvite,
  inviting,
  setInviting,
  setOpponentInfo,
}) {
  const [inviteeInfo, setInviteeInfo] = useState(null);

  const handleBack = () => {
    setInviting(false);
    setInviteeLeft(null);
    setInviteAccepted(null);
    setInviteRefused(null);
    setInviteeInfo(null);
  };

  const handleBattle = () => {
    setGameStage("game:gamerule");
    setInviting(false);
    setInviteeLeft(null);
    setInviteAccepted(null);
    setInviteRefused(null);
    setOpponentInfo(inviteeInfo);
  };

  function handleInvite(opponentSocketId, opponentNickname, opponentUsername) {
    setInviting(true);
    setInviteeInfo({
      socketId: opponentSocketId,
      nickname: opponentNickname,
      username: opponentUsername,
    });
    socket.emit("invite", opponentSocketId);
  }

  function acceptInvitation(
    opponentSocketId,
    opponentNickname,
    opponentUsername
  ) {
    socket.emit("acceptInvite", opponentSocketId);
    setOpponentInfo({
      socketId: opponentSocketId,
      nickname: opponentNickname,
      username: opponentUsername,
    });
    setGameStage("game:gamerule");
    setIncomingInvite(null);
  }

  function refuseInvitation(opponentSocketId) {
    socket.emit("refuseInvite", opponentSocketId);
    setIncomingInvite(null);
  }

  useEffect(() => {
    socket.emit("clientListRequest");
  }, []);

  let display = null;

  if (incomingInvite !== null) {
    display = (
      <h1>
        <IncomingInvite
          acceptInvitation={() => {
            acceptInvitation(
              incomingInvite.socketId,
              incomingInvite.nickname,
              incomingInvite.username
            );
          }}
          refuseInvitation={() => {
            refuseInvitation(incomingInvite.socketId);
          }}
          opponentNickname={incomingInvite.nickname}
          opponentUsername={incomingInvite.username}
        />
      </h1>
    );
  } else {
    if (inviting) {
      if (inviteeLeft !== null) {
        display = (
          <h1>
            <InviteeLeft handleBack={handleBack} />
          </h1>
        );
      } else if (inviteRefused !== null) {
        if (inviteeLeft !== null) {
          display = (
            <h1>
              <InviteeLeft handleBack={handleBack} />
            </h1>
          );
        } else {
          display = (
            <h1>
              <InviteRefused handleBack={handleBack} />
            </h1>
          );
        }
      } else if (inviteAccepted !== null) {
        if (inviteeLeft !== null) {
          display = (
            <h1>
              <InviteeLeft handleBack={handleBack} />
            </h1>
          );
        } else {
          display = (
            <h1>
              <InviteAccepted handleBattle={handleBattle} />
            </h1>
          );
        }
      } else {
        display = (
          <h1>
            <Inviting />
          </h1>
        );
      }
    } else {
      if (clientList === null) {
        display = (
          <h1>
            <Loading />
          </h1>
        );
      } else {
        const clientExcludingMe = clientList.filter((client) => {
          return client.username !== username;
        });

        if (clientExcludingMe.length === 0) {
          display = (
            <h1 className="text-12xl font-mono font-bold tracking-tight text-orange-950 sm:text-3xl animate-pulse ">
              No other online players who are free...
            </h1>
          );
        } else {
          const listToDisplay = clientExcludingMe.map((client) => {
            return (
              <li
                className="flex justify-center text-12xl font-mono font-bold tracking-tight text-orange-950 sm:text-3xl text-center bg-opacity-50 px-10 py-3"
                style={{
                  backgroundImage: "url('/src/assets/scroll.png')",
                  backgroundSize: "100% 100%",
                }}
                key={client.username}
              >
                <h2 className="my-3 mr-5 text-blue-950">General</h2>
                <h1 className="my-3 mr-5 ">{client.nickname}</h1>
                <h2 className="my-3 mr-5">({client.username})</h2>
                {client.level ? (
                  <h2 className="my-3">Lv:{client.level}</h2>
                ) : null}
                <button
                  className="mx-6 bg-gradient-to-r from-orange-600 to-orange-700 rounded mt-2 mb-2 p-1 px-6 py-2 text-sm font-bold text-orange-950 shadow-sm sm:text-1xl border-2 border-orange-950"
                  onClick={() => {
                    handleInvite(
                      client.socketId,
                      client.nickname,
                      client.username
                    );
                  }}
                >
                  Fight!
                </button>
              </li>
            );
          });
          display = <ul>{listToDisplay}</ul>;
        }
      }
    }
  }

  return (
    <main
      className="grid h-screen w-screen place-items-center px-6 py-24 sm:py-32 lg:px-8 bg-cover"
      style={{
        backgroundImage: "url('/src/assets/bluebkg.jpg')",
        backgroundSize: "100% 100%",
      }}
    >
      <div className="text-center">
        <div
          className="text-center bg-cover bg-opacity-50 px-10 py-10 items-center "
          style={{
            backgroundImage: "url('/src/assets/wood.png')",
            backgroundSize: "100% 100%",
          }}
        >
          {display}
        </div>
        <div>
          <button
            className="mx-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded mt-2 mb-2 p-1 px-6 py-2 text-sm font-bold text-orange-950 shadow-sm sm:text-2xl border-2 border-orange-950"
            onClick={() => {
              socket.emit("clientListRequest");
            }}
          >
            Refresh
          </button>
        </div>
      </div>
    </main>
  );
}
export default LobbyPage;

LobbyPage.propTypes = {
  clientList: PropTypes.array,
  username: PropTypes.string,
  setGameStage: PropTypes.func,
  inviteeLeft: PropTypes.string,
  inviteAccepted: PropTypes.string,
  inviteRefused: PropTypes.string,
  setInviteAccepted: PropTypes.func,
  setInviteRefused: PropTypes.func,
  setInviteeLeft: PropTypes.func,
  inviting: PropTypes.bool,
  incomingInvite: PropTypes.object,
  setInviting: PropTypes.func,
  setIncomingInvite: PropTypes.func,
};
