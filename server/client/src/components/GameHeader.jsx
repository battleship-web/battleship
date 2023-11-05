import { useAudio } from "../utils/sound";
import { useEffect } from "react";
function GameHeader({ gameStage, isDarkMode, setIsDarkMode }) {
  const urls = [
    "/src/assets/OpeningMusic.wav",
    "/src/assets/Music.wav",
    "/src/assets/VictoryMusic.wav",
    "/src/assets/DefeatedMusic.wav",
  ];
  const [soundOn, toggle, changeMusic] = useAudio(urls);

  let currentTrack = null;
  if (
    gameStage === "game:prep" ||
    gameStage === "game:battle" ||
    gameStage === "spt:watch"
  ) {
    currentTrack = 1;
  } else if (gameStage === "game:win") {
    currentTrack = 2;
  } else if (gameStage === "game:lose") {
    currentTrack = 3;
  } else {
    currentTrack = 0;
  }

  let currentTrackText = null;
  switch (currentTrack) {
    case 0:
      currentTrackText = "Normal Theme";
      break;
    case 1:
      currentTrackText = "Battle Theme";
      break;
    case 2:
      currentTrackText = "Victory Theme";
      break;
    case 3:
      currentTrackText = "Defeated Theme";
      break;
  }
  useEffect(() => {
    changeMusic(currentTrack);
  }, [currentTrack, changeMusic]);
  return (
    <nav className="flex gap-2 items-center border border-orange-900 bg-orange-300 p-1">
      <h1 className="">Now Playing: {currentTrackText}</h1>
      <button
        className="bg-orange-600 border border-orange-700 rounded p-1"
        onClick={() => {
          toggle(currentTrack);
        }}
      >
        {soundOn ? "Pause" : "Play"}
      </button>
      <button
        onClick={() => {
          setIsDarkMode(!isDarkMode);
        }}
      >
        Set Dark Mode
      </button>
    </nav>
  );
}
export default GameHeader;
