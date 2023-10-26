import { useState, useEffect } from "react";
import { socket } from "./socket";
import AdminPage from "./admin/AdminPage";
import TitlePage from "./menu/TitlePage";
import LoginPage from "./menu/LoginPage";
import InputNicknamePage from "./menu/InputNicknamePage";
import WelcomePage from "./menu/WelcomePage";
import LobbyPage from "./menu/LobbyPage";
import PrepPage from "./game/prep/PrepPage";
import GamerulePage from "./game/battle/GamerulePage";
import ScorepointPage from "./game/battle/ScorepointPage";
import NotFoundPage from "./notfound/NotFoundPage";
import LosePage from "./game/battle/losePage";
import WinPage from "./game/battle/winPage";

function App() {
  const [gameStage, setGameStage] = useState("menu:title");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clientList, setClientList] = useState(null);
  const [allClientList, setAllClientList] = useState(null);
  const [socketError, setSocketError] = useState(null);
  const [inviteAccepted, setInviteAccepted] = useState(null);
  const [inviteRefused, setInviteRefused] = useState(null);
  const [inviteeLeft, setInviteeLeft] = useState(null);
  const [inviting, setInviting] = useState(false);
  const [incomingInvite, setIncomingInvite] = useState(null);
  const [gameList, setGameList] = useState(null);
  const [instruction, setInstruction] = useState(false);
  const [turn, setTurn] = useState(null);
  const [scores, setScores] = useState(null);
  const [opponentInfo, setOpponentInfo] = useState(null);
  const [playerBoard, setPlayerBoard] = useState(null);

  let page = null;
  useEffect(() => {
    const onLoginResponse = (data) => {
      if (data.success) {
        setUser(data.message);
        if (data.message.role === "admin") {
          setGameStage("admin");
        } else if (data.message.nickname) {
          setGameStage("menu:welcome");
        } else {
          setGameStage("menu:nickname");
        }
        setIsLoading(false);
      } else {
        setSocketError(data.message);
        setIsLoading(false);
      }
    };

    const handleStartSignal = (message) => {
      setTurn(message.turn);
      setScores(message.scoreboard);
    };

    const cleanup = () => {
      socket.off("loginResponse", onLoginResponse);
      socket.off("clientList", setClientList);
      socket.off("allClientList", setAllClientList);
      socket.off("incomingInvite", setIncomingInvite);
      socket.off("inviteeLeft", setInviteeLeft);
      socket.off("inviteAccepted", setInviteAccepted);
      socket.off("inviteRefused", setInviteRefused);
      socket.off("startSignal", handleStartSignal);
      socket.off("gameList", setGameList);
      socket.disconnect();
    };
    socket.on("loginResponse", onLoginResponse);
    socket.on("clientList", setClientList);
    socket.on("allClientList", setAllClientList);
    socket.on("incomingInvite", setIncomingInvite);
    socket.on("inviteeLeft", setInviteeLeft);
    socket.on("inviteAccepted", setInviteAccepted);
    socket.on("inviteRefused", setInviteRefused);
    socket.on("startSignal", handleStartSignal);
    socket.on("gameList", setGameList);

    window.addEventListener("beforeunload", cleanup);

    return () => {
      window.removeEventListener("beforeunload", cleanup);
    };
  }, []);
  switch (gameStage) {
    case "menu:title":
      page = <TitlePage setGameStage={setGameStage} />;
      break;
    case "menu:login":
      page = (
        <LoginPage
          socketError={socketError}
          setSocketError={setSocketError}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      );
      break;
    case "menu:nickname":
      page = (
        <InputNicknamePage setGameStage={setGameStage} setUser={setUser} />
      );
      break;
    case "menu:welcome":
      page = <WelcomePage user={user} setGameStage={setGameStage} />;
      break;
    case "menu:lobby":
      page = (
        <LobbyPage
          clientList={clientList}
          username={user.username}
          setGameStage={setGameStage}
          inviteeLeft={inviteeLeft}
          inviteAccepted={inviteAccepted}
          inviteRefused={inviteRefused}
          setInviteeLeft={setInviteeLeft}
          setInviteAccepted={setInviteAccepted}
          setInviteRefused={setInviteRefused}
          inviting={inviting}
          incomingInvite={incomingInvite}
          setInviting={setInviting}
          setIncomingInvite={setIncomingInvite}
          setOpponentInfo={setOpponentInfo}
        />
      );
      break;
    case "game:prep":
      page = <PrepPage setPlayerBoard={setPlayerBoard} />;
      break;
    case "game:gamerule":
      page = <GamerulePage setGameStage={setGameStage} />;
      break;
    case "game:lose":
      page = <LosePage setGameStage={setGameStage} />;
      break;
    case "game:win":
      page = <WinPage setGameStage={setGameStage} />;
      break;
    case "game:battle":
      page = (
        <ScorepointPage
          instruction={instruction}
          setInstruction={setInstruction}
          user={user}
          setGameStage={setGameStage}
          turn={turn}
          scores={scores}
          opponentInfo={opponentInfo}
          board={playerBoard}
        />
      );
      break;
    case "admin":
      page = <AdminPage clientList={allClientList} gameList={gameList} />;
      break;
    default:
      page = <NotFoundPage />;
  }
  return page;
}
export default App;
