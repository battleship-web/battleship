import { Socket, socket } from "../socket";

export default function RefreshButton() {
    return(
        <button onClick={() => {
            socket.emit("Refresh");
        }} class="bg-white text-green-700">Refresh</button>
    );
}