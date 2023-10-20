import { socket } from "../socket";
// Add custom text and options
export default function ResetButton({ text, options }) {
  return (
    <button
      onClick={socket.emit("initiateReset", options)}
      className="bg-white text-red-700"
    >
      {text}
    </button>
  );
}
