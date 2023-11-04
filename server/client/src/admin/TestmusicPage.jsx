import Music from "../components/Music.wav";

export default function App() {
    function play() {
        new Audio(Music).play()
        
    }
    return(
        <div className="App">
            <button
             onClick={play} 
             > play sound
             </button>
             </div>
    )
}