import { socket } from "../socket";
// Add custom text and options
export default function ResetButton({ text, options }) {
  return (
    <button
      onClick={() => {
        console.log(text);
        socket.emit("initiateReset", options);
      }}
      className="p-1 mx-2 rounded-md bg-gradient-to-r from-orange-800 to-orange-700 px-2 py-2 text-sm font-bold text-orange-950 shadow-sm sm:text-1xl hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-950 border-2 border-orange-950"
    >
      {text}
    </button>
  );
}
