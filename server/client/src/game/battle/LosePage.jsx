import WinLose from "../../components/WinLose";

export default function LosePage({ setGameStage, handleQuitGame }) {
  return (
    <WinLose
      setGameStage={setGameStage}
      handleQuitGame={handleQuitGame}
      win={false}
    />
  );
}
