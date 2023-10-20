import { socket } from "../socket"


export default function ResetButton() {
    return (
        <button onClick={socket.emit("initiateReset")} class="bg-white text-red-700">Reset</button>
    );
}