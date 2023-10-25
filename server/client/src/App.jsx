import { useState, useEffect } from "react";
import { socket } from "./socket";
import AdminPage from "./admin/AdminPage";
import TitlePage from "./menu/TitlePage";
import LoginPage from "./menu/LoginPage";
import InputNicknamePage from "./menu/InputNicknamePage";
import WelcomePage from "./menu/WelcomePage";
import LobbyPage from "./menu/LobbyPage";
import PrepPage from "./game/prep/PrepPage";
import BattlePage from "./game/battle/BattlePage";
import GamerulePage from "./game/battle/GamerulePage";
import ScorepointPage from "./game/battle/ScorepointPage";
import NotFoundPage from "./notfound/NotFoundPage";


function App() {
  const [gameStage, setGameStage] = useState("menu:title");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clientList, setClientList] = useState(null);
  const [instruction, setInstruction] = useState(false);

  let page = null;
  useEffect(() => {
    const onLoginResponse = (data) => {
      if (data.success) {
        setUser(data.message);
        if (data.message.nickname) {
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

    const cleanup = () => {
      socket.off("loginResponse", onLoginResponse);
      socket.disconnect();
    };
    socket.on("loginResponse", onLoginResponse);
    socket.on("clientList", setClientList);

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
      page = <LobbyPage clientList={clientList} username={user.username} />;
      break;
    case "game:prep":
      page = <PrepPage />;
      break;
    case "game:gamerule":
      page = <GamerulePage setGameStage={setGameStage}/>;
      break;
    case "game:lose":
      page = <losePage setGameStage={setGameStage}/>;
      break;
    case "game:win":
      page = <winPage setGameStage={setGameStage}/>;
      break;
    case "game:battle":
      page = <BattlePage />;
      break;
    case "game:scorepoint":
      page = <ScorepointPage instruction={instruction} setInstruction={setInstruction} user={user} setGameStage={setGameStage}/>;
      break;
    case "admin":
      page = <AdminPage />;
      break;
    default:
      page = <NotFoundPage />;
  }
  return page;
}
export default App;
