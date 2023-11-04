import Score from "../../components/Score";
import Instruction from "../../components/Instruction";
import Loading from "../../components/Loading";
import { useEffect, useState } from "react";
import { socket } from "../../socket";
import BrightnessButton from "../../darkmode/BrightnessButton";

function ScorepointPage({
  instruction,
  setInstruction,
  user,
  setGameStage,
  turn,
  playerScore,
  opponentScore,
  opponentInfo,
  playerBoard,
  setPlayerBoard,
  playerBoardFireResults,
  opponentBoardFireResults,
  winner,
  setWinner,
  handleQuitGame,
}) {
  const [opponentBoard, setOpponentBoard] = useState(
    new Array(8).fill().map(() => new Array(8).fill("blank"))
  );
  const [numFireOnPlayerBoard, setNumFireOnPlayerBoard] = useState(0);
  const [numFireOnOpponentBoard, setNumFireOnOpponentBoard] = useState(0);

  const numHitOnPlayerBoard = playerBoardFireResults.reduce(
    (accumulator, currentValue) => {
      if (currentValue.hit) {
        return accumulator + 1;
      } else {
        return accumulator;
      }
    },
    0
  );

  const numHitOnOpponentBoard = opponentBoardFireResults.reduce(
    (accumulator, currentValue) => {
      if (currentValue.hit) {
        return accumulator + 1;
      } else {
        return accumulator;
      }
    },
    0
  );

  const handleClickInstruction = () => {
    setInstruction(true);
  };
  const handleClickOut = () => {
    setInstruction(false);
  };

  useEffect(() => {
    if (playerBoardFireResults.length <= numFireOnPlayerBoard) {
      return;
    }
    const newPlayerBoard = playerBoard.map((row) => row.slice());
    const latestFireResult =
      playerBoardFireResults[playerBoardFireResults.length - 1];
    newPlayerBoard[latestFireResult.rowIndex][latestFireResult.columnIndex] =
      latestFireResult.hit ? "hit" : "miss";
    setPlayerBoard(newPlayerBoard);
    setNumFireOnPlayerBoard(numFireOnPlayerBoard + 1);
  }, [
    playerBoard,
    playerBoardFireResults,
    setPlayerBoard,
    numFireOnPlayerBoard,
  ]);

  useEffect(() => {
    if (opponentBoardFireResults.length <= numFireOnOpponentBoard) {
      return;
    }
    const newOpponentBoard = opponentBoard.map((row) => row.slice());
    const latestFireResult =
      opponentBoardFireResults[opponentBoardFireResults.length - 1];
    newOpponentBoard[latestFireResult.rowIndex][latestFireResult.columnIndex] =
      latestFireResult.hit ? "hit" : "miss";
    setOpponentBoard(newOpponentBoard);
    setNumFireOnOpponentBoard(numFireOnOpponentBoard + 1);
  }, [opponentBoard, opponentBoardFireResults, numFireOnOpponentBoard]);

  useEffect(() => {
    if (winner) {
      const wl = winner === socket.id ? "game:win" : "game:lose";
      setGameStage(wl);
      setWinner(null);
    }
  }, [winner, setWinner, setGameStage]);

  let scorePageDisplay = null;
  if (!turn) {
    scorePageDisplay = <Loading />;
  } else if (instruction) {
    scorePageDisplay = (
      <h1>
        <Instruction handleClickOut={handleClickOut} />
      </h1>
    );
  } else {
    scorePageDisplay = (
      <h1>
        <Score
          handleClickInstruction={handleClickInstruction}
          user={user}
          playerBoard={playerBoard}
          opponentBoard={opponentBoard}
          setOpponentBoard={setOpponentBoard}
          turn={turn}
          playerScore={playerScore}
          opponentScore={opponentScore}
          opponentInfo={opponentInfo}
          numHitOnPlayerBoard={numHitOnPlayerBoard}
          numHitOnOpponentBoard={numHitOnOpponentBoard}
          handleQuitGame={handleQuitGame}
          setGameStage={setGameStage}
        />
      </h1>
    );
  }

  return (
    <main className="grid w-screen min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8 bg-cover"
        style={{
          backgroundImage: "url('/src/assets/bluebkg.jpg')",
          backgroundSize: "100% 100%",}}>
      {scorePageDisplay}
      <div className="text-right" style={{ position: "absolute", bottom: "0", right: "0" }}>
            <BrightnessButton />
          </div>
    </main>
  );
}

export default ScorepointPage;
