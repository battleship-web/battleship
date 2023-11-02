import { socket } from "../socket";
// Add custom text and options
export default function ResetButton({ text, options }) {
  return (
    <button

      onClick={() => {
        console.log(text);
        socket.emit("initiateReset", options);
      }}
      className="bg-white text-red-700 border-red-400 border-2 rounded-lg mx-2 p-1"
    >
      {text}
    </button>
  );
}
