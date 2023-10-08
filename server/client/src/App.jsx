import { useState, useEffect } from "react";
import { socket } from "./socket";
import AdminPage from "./admin/AdminPage";
import TitlePage from "./menu/TitlePage";
import InputNicknamePage from "./menu/InputNicknamePage";
import WelcomePage from "./menu/WelcomePage";
import ChooseOpponentPage from "./menu/ChooseOpponentPage";
import PrepPage from "./game/prep/PrepPage";
import BattlePage from "./game/battle/BattlePage";
import NotFoundPage from "./notfound/NotFoundPage";

function App() {
  const [gameStage, setGameStage] = useState("menu:title");
  const [user, setUser] = useState(null);
  let page = null;
  useEffect(() => {
    function onReceiveClientId(clientId) {
      setUser((user) => {
        return { ...user, clientId: clientId };
      });
    }

    socket.on("clientId", onReceiveClientId);

    return () => {
      socket.off("clientId", onReceiveClientId);
    };
  }, []);
  switch (gameStage) {
    case "menu:title":
      page = <TitlePage setGameStage={setGameStage} />;
      break;
    case "menu:nickname":
      socket.connect();
      page = (
        <InputNicknamePage
          setGameStage={setGameStage}
          user={user}
          setUser={setUser}
        />
      );
      break;
    case "menu:welcome":
      page = <WelcomePage user={user} />;
      break;
    case "menu:opponent":
      page = <ChooseOpponentPage />;
      break;
    case "game:prep":
      page = <PrepPage />;
      break;
    case "game:battle":
      page = <BattlePage />;
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
