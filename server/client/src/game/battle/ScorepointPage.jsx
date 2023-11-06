import Score from "../../components/Score";
import Instruction from "../../components/Instruction";
import Loading from "../../components/Loading";
import { useEffect, useState } from "react";
import { socket } from "../../socket";
import { setBoardFromFireResult } from "../../utils/board";

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
  emote,
  setEmote,
  opponentEmote,
}) {
  const [opponentBoard, setOpponentBoard] = useState(
    new Array(8).fill().map(() => new Array(8).fill("blank"))
  );
  const [numFireOnPlayerBoard, setNumFireOnPlayerBoard] = useState(0);
  const [numFireOnOpponentBoard, setNumFireOnOpponentBoard] = useState(0);

  const numHitOnPlayerBoard = playerBoardFireResults.reduce(
    (accumulator, currentValue) => {
      let hitIncrease = 0;
      if (currentValue.bomb) {
        for (let i = 0; i < 4; i++) {
          if (currentValue.hit[i]) {
            hitIncrease += 1;
          }
        }
      } else {
        if (currentValue.hit) {
          hitIncrease += 1;
        }
      }
      if (currentValue.lightning && currentValue.lightningHit) {
        hitIncrease += 1;
      }
      return accumulator + hitIncrease;
    },
    0
  );

  const numHitOnOpponentBoard = opponentBoardFireResults.reduce(
    (accumulator, currentValue) => {
      let hitIncrease = 0;
      if (currentValue.bomb) {
        for (let i = 0; i < 4; i++) {
          if (currentValue.hit[i]) {
            hitIncrease += 1;
          }
        }
      } else {
        if (currentValue.hit) {
          hitIncrease += 1;
        }
      }
      if (currentValue.lightning && currentValue.lightningHit) {
        hitIncrease += 1;
      }
      return accumulator + hitIncrease;
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
    const latestFireResult =
      playerBoardFireResults[playerBoardFireResults.length - 1];
    setBoardFromFireResult(playerBoard, setPlayerBoard, latestFireResult);
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
    const latestFireResult =
      opponentBoardFireResults[opponentBoardFireResults.length - 1];
    setBoardFromFireResult(opponentBoard, setOpponentBoard, latestFireResult);
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
          emote={emote}
          setEmote={setEmote}
          opponentEmote={opponentEmote}
        />
      </h1>
    );
  }

  return (
    <main className="grid box-border min-h-[calc(100%)] w-[calc(100%)] bg-[url('/src/assets/bluebkg.jpg')] place-items-center px-6 py-24 sm:py-32 lg:px-8 bg-cover">
      {scorePageDisplay}
    </main>
  );
}

export default ScorepointPage;
