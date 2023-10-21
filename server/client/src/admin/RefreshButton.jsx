import { socket } from "../socket";

export default function RefreshButton() {
  return (
    <button
      onClick={() => {
        //Re-fetch game list using gameListRequest
        socket.emit("gameListRequest");
      }}
      className="bg-white text-green-700 border-2 border-green-300"
    >
      Refresh
    </button>
  );
}
