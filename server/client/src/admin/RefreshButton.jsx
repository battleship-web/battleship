import { socket } from "../socket";

export default function RefreshButton() {
  return (
    <button
      onClick={() => {
        //Re-fetch game list using gameListRequest
        socket.emit("gameListRequest");
      }}
      className="bg-zinc-100 border-2 border-slate-400 rounded-lg p-2 text-green-700"
    >
      Refresh
    </button>
  );
}
