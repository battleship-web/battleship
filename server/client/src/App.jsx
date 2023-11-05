import { useState, useEffect } from "react";
import { socket } from "./socket";
import AdminPage from "./admin/AdminPage";
import TitlePage from "./menu/TitlePage";
import LoginPage from "./menu/LoginPage";
import WelcomePage from "./menu/WelcomePage";
import LobbyPage from "./menu/LobbyPage";
import PrepPage from "./game/prep/PrepPage";
import GamerulePage from "./game/battle/GamerulePage";
import ScorepointPage from "./game/battle/ScorepointPage";
import NotFoundPage from "./notfound/NotFoundPage";
import LosePage from "./game/battle/LosePage";
import WinPage from "./game/battle/WinPage";
import Loading from "./components/Loading";
import ReplayPage from "./game/battle/ReplayPage";
import OpponentQuitPage from "./game/battle/OpponentQuitPage";
import RegisterPage from "./menu/RegisterPage";
import GameListPage from "./menu/GameListPage";
import { setBoardFromFireResult, constructBoard } from "./utils/board";
import WatchPage from "./game/spectator/WatchPage";
import WinnerPage from "./game/spectator/WinnerPage";
import GameHeader from "./components/GameHeader";
import ChooseProfilePicture from "./menu/ChooseProfilePicture";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [disconnectedByBacking, setDisconnectedByBacking] = useState(false);
  const [gameStage, setGameStage] = useState("menu:title");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clientList, setClientList] = useState(null);
  const [allClientList, setAllClientList] = useState(null);
  const [socketError, setSocketError] = useState(null);
  const [gameList, setGameList] = useState(null);

  // lobby states
  const [inviteAccepted, setInviteAccepted] = useState(null);
  const [inviteRefused, setInviteRefused] = useState(null);
  const [inviteeLeft, setInviteeLeft] = useState(null);
  const [inviting, setInviting] = useState(false);
  const [incomingInvite, setIncomingInvite] = useState(null);

  // game specific states
  const [instruction, setInstruction] = useState(false);
  const [turn, setTurn] = useState(null);
  const [playerScore, setPlayerScore] = useState(null);
  const [opponentScore, setOpponentScore] = useState(null);
  const [opponentInfo, setOpponentInfo] = useState(null);
  const [playerBoard, setPlayerBoard] = useState(null);
  const [playerBoardFireResults, setPlayerBoardFireResults] = useState([]);
  const [opponentBoardFireResults, setOpponentBoardFireResults] = useState([]);
  const [winner, setWinner] = useState(null);

  // spectated game state
  const [sptGameId, setSptGameId] = useState(null);
  const [sptTurn, setSptTurn] = useState(null);
  const [p1Score, setP1Score] = useState(null);
  const [p2Score, setP2Score] = useState(null);
  const [p1Info, setP1Info] = useState(null);
  const [p2Info, setP2Info] = useState(null);
  const [p1Board, setP1Board] = useState(null);
  const [p2Board, setP2Board] = useState(null);
  const [sptWinner, setSptWinner] = useState(null);

  let page = null;

  function handleQuitGame() {
    setInstruction(false);
    setTurn(null);
    setPlayerScore(null);
    setOpponentScore(null);
    setOpponentInfo(null);
    setPlayerBoard(null);
    setPlayerBoardFireResults([]);
    setOpponentBoardFireResults([]);
    setWinner(null);
  }

  function handleNewGame() {
    setInstruction(false);
    setTurn(null);
    setPlayerBoard(null);
    setPlayerBoardFireResults([]);
    setOpponentBoardFireResults([]);
    setWinner(null);
  }

  function handleSptQuitGame() {
    setSptGameId(null);
    setSptTurn(null);
    setP1Score(null);
    setP2Score(null);
    setP1Info(null);
    setP2Info(null);
    setP1Board(null);
    setP2Board(null);
    setSptWinner(null);
  }

  useEffect(() => {
    function resetAllState() {
      setGameStage("menu:title");
      setUser(null);
      setIsLoading(false);
      setClientList(null);
      setAllClientList(null);
      setSocketError(null);
      setGameList(null);
      setInviteAccepted(null);
      setInviteRefused(null);
      setInviteeLeft(null);
      setInviting(null);
      setIncomingInvite(null);
      setDisconnectedByBacking(true);
      handleQuitGame();
      handleSptQuitGame();
    }

    const onRegisterResponse = (data) => {
      if (data.success) {
        setGameStage("menu:login");
        setIsLoading(false);
      } else {
        setSocketError(data.message);
        setIsLoading(false);
      }
    };
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

    const handleIncomingInvite = (message) => {
      if (inviting || incomingInvite) {
        socket.emit("refuseInvite", message.socketId);
      } else {
        setIncomingInvite(message);
      }
    };
    const handleStartSignal = (message) => {
      setTurn(message.turn);
      if (message.scoreboard[0].socketId === socket.id) {
        setPlayerScore(message.scoreboard[0].score);
        setOpponentScore(message.scoreboard[1].score);
      } else {
        setPlayerScore(message.scoreboard[1].score);
        setOpponentScore(message.scoreboard[0].score);
      }
    };

    const handleFireResult = (result) => {
      if (turn === socket.id) {
        setOpponentBoardFireResults([
          ...opponentBoardFireResults,
          {
            rowIndex: result.y,
            columnIndex: result.x,
            hit: result.hit,
            lightning: result.lightning,
            lightningRowIndex: result.lightningY,
            lightningColumnIndex: result.lightningX,
            lightningHit: result.lightningHit,
            bomb: result.bomb,
          },
        ]);
        setTurn(opponentInfo.socketId);
      } else {
        setPlayerBoardFireResults([
          ...playerBoardFireResults,
          {
            rowIndex: result.y,
            columnIndex: result.x,
            hit: result.hit,
            lightning: result.lightning,
            lightningRowIndex: result.lightningY,
            lightningColumnIndex: result.lightningX,
            lightningHit: result.lightningHit,
            bomb: result.bomb,
          },
        ]);
        setTurn(socket.id);
      }
      setWinner(result.winner);
    };

    const handleReplayConsensus = (consensus) => {
      if (consensus) {
        handleNewGame();
        setGameStage("game:beforeReplay");
      } else {
        handleQuitGame();
        setGameStage("game:beforeLobby");
      }
    };

    const handleOpponentQuit = () => {
      handleQuitGame();
      setGameStage("game:opponentQuit");
    };

    const handleReset = (message) => {
      if (message.toReset === "score") {
        setPlayerScore(0);
        setOpponentScore(0);
      } else if (message.toReset === "game") {
        setSptTurn(null);
        setP1Board(null);
        setP2Board(null);
        setSptWinner(null);
      } else if (message.toReset === "cancel") {
        socket.emit("sptLeaveRoom", sptGameId);
        handleSptQuitGame();
        setGameStage("menu:arena");
      }
    };

    function handleLevelInfo(levelInfo) {
      const { level, exp } = levelInfo;
      setUser({ ...user, level: level, exp: exp });
    }

    function handleSptGameInfo(gameInfo) {
      console.log(gameInfo);
      if (typeof gameInfo === "string") {
        setGameStage("menu:arena");
        handleSptQuitGame();
        return;
      }
      if (gameStage === "spt:winner") {
        setGameStage("spt:watch");
      }
      const constructedP1Board = constructBoard(
        gameInfo.p1OriginalBoard,
        gameInfo.p1BoardFireResults
      );
      const constructedP2Board = constructBoard(
        gameInfo.p2OriginalBoard,
        gameInfo.p2BoardFireResults
      );

      setP1Board(constructedP1Board);
      setP2Board(constructedP2Board);
      setSptTurn(gameInfo.turn);
      setP1Score(gameInfo.p1Score);
      setP2Score(gameInfo.p2Score);
    }

    function handleSptFireResult(result) {
      const formattedResult = {
        rowIndex: result.y,
        columnIndex: result.x,
        hit: result.hit,
        lightning: result.lightning,
        lightningRowIndex: result.lightningY,
        lightningColumnIndex: result.lightningX,
        lightningHit: result.lightningHit,
        bomb: result.bomb,
      };
      if (sptTurn === p1Info.socketId) {
        // fire on player 2's board
        setBoardFromFireResult(p2Board, setP2Board, formattedResult);
        setSptTurn(p2Info.socketId);
      } else {
        // fire on player 1's board
        setBoardFromFireResult(p1Board, setP1Board, formattedResult);
        setSptTurn(p1Info.socketId);
      }
      if (result.winner) {
        setGameStage("spt:winner");
        setSptWinner(result.winner);
      }
    }

    function handleSptGameEnd() {
      setGameStage("menu:arena");
      handleSptQuitGame();
    }

    function handleSptReset(message) {
      if (message.toReset === "score") {
        setP1Score(0);
        setP2Score(0);
      } else if (message.toReset === "game") {
        handleNewGame();
        setGameStage("game:prep");
      } else if (message.toReset === "cancel") {
        handleQuitGame();
        setGameStage("menu:lobby");
      }
    }

    const cleanup = () => {
      if (opponentInfo) {
        socket.emit("quit");
      }
      resetAllState();
      socket.off();
      socket.disconnect();
    };

    if (disconnectedByBacking) {
      socket.connect();
    }
    socket.on("registerResponse", onRegisterResponse);
    socket.on("loginResponse", onLoginResponse);
    socket.on("clientList", setClientList);
    socket.on("allClientList", setAllClientList);
    socket.on("incomingInvite", handleIncomingInvite);
    socket.on("inviteeLeft", setInviteeLeft);
    socket.on("inviteAccepted", setInviteAccepted);
    socket.on("inviteRefused", setInviteRefused);
    socket.on("startSignal", handleStartSignal);
    socket.on("fireResult", handleFireResult);
    socket.on("replayConsensus", handleReplayConsensus);
    socket.on("opponentQuit", handleOpponentQuit);
    socket.on("reset", handleReset);
    socket.on("gameList", setGameList);
    socket.on("sptGameInfo", handleSptGameInfo);
    socket.on("sptFireResult", handleSptFireResult);
    socket.on("sptGameEnd", handleSptGameEnd);
    socket.on("sptReset", handleSptReset);
    socket.on("levelInfo", handleLevelInfo);

    window.addEventListener("pagehide", cleanup);

    return () => {
      socket.off();
      window.removeEventListener("pagehide", cleanup);
    };
  }, [
    inviting,
    incomingInvite,
    turn,
    opponentBoardFireResults,
    playerBoardFireResults,
    opponentInfo,
    disconnectedByBacking,
    sptTurn,
    p1Info,
    p2Info,
    p2Board,
    p1Board,
    gameStage,
    sptGameId,
    user,
  ]);

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
          setGameStage={setGameStage}
        />
      );
      break;
    case "menu:register":
      page = (
        <RegisterPage
          socketError={socketError}
          setSocketError={setSocketError}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setGameStage={setGameStage}
        />
      );
      break;
    case "menu:nickname":
      page = (
        <ChooseProfilePicture
          setGameStage={setGameStage}
          user={user}
          setUser={setUser}
        />
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
    case "menu:arena":
      page = (
        <GameListPage
          gameList={gameList}
          setSptGameId={setSptGameId}
          setP1Info={setP1Info}
          setP2Info={setP2Info}
          setGameStage={setGameStage}
        />
      );
      break;
    case "game:prep":
      page = (
        <PrepPage
          setGameStage={setGameStage}
          setPlayerBoard={setPlayerBoard}
          handleQuitGame={handleQuitGame}
        />
      );
      break;
    case "game:gamerule":
      page = <GamerulePage setGameStage={setGameStage} />;
      break;
    case "game:lose":
      page = (
        <LosePage setGameStage={setGameStage} handleQuitGame={handleQuitGame} />
      );
      break;
    case "game:win":
      page = (
        <WinPage setGameStage={setGameStage} handleQuitGame={handleQuitGame} />
      );
      break;
    case "game:battle":
      page = (
        <ScorepointPage
          instruction={instruction}
          setInstruction={setInstruction}
          user={user}
          setGameStage={setGameStage}
          turn={turn}
          playerScore={playerScore}
          opponentScore={opponentScore}
          opponentInfo={opponentInfo}
          playerBoard={playerBoard}
          setPlayerBoard={setPlayerBoard}
          playerBoardFireResults={playerBoardFireResults}
          opponentBoardFireResults={opponentBoardFireResults}
          winner={winner}
          setWinner={setWinner}
          handleQuitGame={handleQuitGame}
        />
      );
      break;
    case "game:waitForReplay":
      page = <Loading text="Did the opponent escape?" />;
      break;
    case "game:beforeReplay":
      page = (
        <ReplayPage
          text="Your opponent also wants a rematch!"
          handleOkay={() => {
            setGameStage("game:prep");
          }}
        />
      );
      break;
    case "game:beforeLobby":
      page = (
        <ReplayPage
          text="Your opponent escaped!"
          handleOkay={() => {
            setGameStage("menu:lobby");
          }}
        />
      );
      break;
    case "game:opponentQuit":
      page = (
        <OpponentQuitPage
          handleOkay={() => {
            setGameStage("menu:lobby");
          }}
        />
      );
      break;
    case "spt:watch":
      page = (
        <WatchPage
          turn={sptTurn}
          gameId={sptGameId}
          p1Score={p1Score}
          p2Score={p2Score}
          p1Board={p1Board}
          p2Board={p2Board}
          p1Info={p1Info}
          p2Info={p2Info}
          handleSptQuitGame={handleSptQuitGame}
          setGameStage={setGameStage}
        />
      );
      break;
    case "spt:winner":
      page = (
        <WinnerPage
          gameId={sptGameId}
          winner={sptWinner}
          p1Info={p1Info}
          p2Info={p2Info}
          setGameStage={setGameStage}
          handleSptQuitGame={handleSptQuitGame}
        />
      );
      break;
    case "admin":
      page = <AdminPage clientList={allClientList} gameList={gameList} />;
      break;
    default:
      page = <NotFoundPage />;
  }
  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <GameHeader
        user={user}
        gameStage={gameStage}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
      {page}
    </div>
  );
}
export default App;
