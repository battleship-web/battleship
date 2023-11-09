import WinLose from "../../components/WinLose";

export default function WinPage({ setGameStage, handleQuitGame }) {
  return (
    <WinLose
      setGameStage={setGameStage}
      handleQuitGame={handleQuitGame}
      win={true}
    />
  );
}
