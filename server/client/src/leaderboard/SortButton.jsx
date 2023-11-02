import { socket } from "../socket";
// Add custom text and options
export default function SortButton({ options }) {
  return (
    <button

      onClick={() => {
        console.log(text);
        socket.emit("", options);
      }}
      className="bg-white text-red-700 border-red-400 border-2 rounded-lg mx-2 p-1"
    >
      Sort
    </button>
  );
  
}