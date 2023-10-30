import { socket } from "../socket";

export default function RefreshButton() {
  return (
    <button
      onClick={() => {
        //Re-fetch game list using gameListRequest
        socket.emit("gameListRequest");
        socket.emit("allClientListRequest");
      }}
      className="p-2 rounded-md bg-gradient-to-r from-orange-800 to-orange-700 px-2 py-2 text-sm font-bold text-orange-950 shadow-sm sm:text-1xl hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-950 border-2 border-orange-950"
    >
      Refresh
    </button>
  );
}
