import { useAudio } from "../utils/sound";

function SoundHeader() {
  const [playing, toggle] = useAudio("/src/assets/test.mp3");
  return (
    <nav className="border-2 border-red-500 w-screen h-8">
      <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
    </nav>
  );
}
export default SoundHeader;
