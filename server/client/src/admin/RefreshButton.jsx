import { socket } from "../socket";

export default function RefreshButton() {
  return (
    <button
      onClick={() => {
        //Re-fetch game list using gameListRequest
        socket.emit("gameListRequest");
        socket.emit("allClientListRequest");
      }}
<<<<<<< HEAD
      className="bg-white text-green-700 border-2 border-green-300"
=======
      className="bg-zinc-100 border-2 border-slate-400 rounded-lg p-2 text-green-700"
>>>>>>> refs/remotes/origin/main
    >
      Refresh
    </button>
  );
}
