import { useAudio } from "../utils/sound";
import { useEffect } from "react";
import ProfilePicture from "./ProfilePicture";

function GameHeader({
  user,
  gameStage,
  setGameStage,
  isDarkMode,
  setIsDarkMode,
}) {
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
    <nav className="flex border border-orange-900 bg-orange-300 dark:bg-orange-800 p-1 justify-between absolute w-[calc(100%)]">
      <div className="flex items-center gap-2">
        {user && user.nickname && user.username ? (
          <h1 className="font-bold text-cyan-800">{`${user.nickname} (${user.username})`}</h1>
        ) : null}
        {user && user.profilePicture ? (
          <button
            onClick={() => {
              if (gameStage === "menu:nickname") {
                setGameStage("menu:lobby");
              } else {
                setGameStage("menu:nickname");
              }
            }}
          >
            <ProfilePicture picture={user.profilePicture} size="big" />
          </button>
        ) : null}
        {user && user.level ? (
          <div className="flex items-center">
            <h1 className="font-bold text-purple-800 mr-2">Lvl:{user.level}</h1>
            <div className="w-56 h-8 border border-purple-800 rounded">
              <div
                className={`bg-purple-500 h-8 rounded text-center py-1`}
                style={{ width: `${user.exp}%` }}
              >
                {user.exp}%
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex items-center gap-2">
        <h1 className="font-semibold">Current Track: {currentTrackText}</h1>
        <button
          className="bg-orange-600 border border-orange-700 rounded p-1"
          onClick={() => {
            toggle(currentTrack);
          }}
        >
          {soundOn ? "Pause" : "Play"}
        </button>
        <button
          className="text-bold dark:text-bold bg-slate-300 dark:bg-slate-800 border border-slate-900 rounded dark:text-slate-300 text-slate-900 p-1"
          onClick={() => {
            setIsDarkMode(!isDarkMode);
          }}
        >
          {isDarkMode ? "Set Light Mode" : "Set Dark Mode"}
        </button>
      </div>
    </nav>
  );
}
export default GameHeader;
