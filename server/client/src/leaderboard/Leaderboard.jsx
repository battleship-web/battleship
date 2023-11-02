import { useEffect } from "react";
import { Socket } from "../socket";
import SortButton from "./SortButton";

function Leaderboard({leaderboard, user}) {
    useEffect(() => {
        socket.emit("requestLeaderboard");
    });

    let leaderboardDisplay = (
        <table>
            <tr>
                <th className="border-2 border-orange-950 text-center p-2">Nickname</th>
                <th className="border-2 border-orange-950 text-center p-2">Username</th>
                <th className="border-2 border-orange-950 text-center p-2">Level</th>
                <th className="border-2 border-orange-950 text-center p-2">Total Round Won</th>
                <th className="border-2 border-orange-950 text-center p-2">Total Match Won</th>
            </tr>
        </table>
    );

    let dataToDisplay = leaderboard.map((user) => {
        <tr>
            <tr key={user._id}>
            <td className="border-2 border-orange-950 text-center p-2">
              {user.nickname ? user.nickname : "Unknown"}
            </td>
            <td className="border-2 border-orange-950 text-center p-2">
              {user.username}
            </td>
            <td className="border-2 border-orange-950 text-center p-2">
              {user.level}
            </td>
            <td className="border-2 border-orange-950 text-center p-2">
              Round Won
            </td>
            <td className="border-2 border-orange-950 text-center p-2">
              Match Won
            </td>
          </tr>
        </tr>
    })

    return(
        <>
            <div
                className="w-screen min-h-screen flex flex-col items-center gap-4 p-4"
                style={{
                    backgroundImage: "url('/src/assets/bluebkg.jpg')",
                    backgroundSize: "100% 100%",
                }}
            >
                <div className="p-36 flex">
                    <div className="h-44 flex items-center">
                        <h1 className="bg-sky-400  border-4 border-orange-950 font-bold p-2 rounded-md">BATTLE RECORD</h1>
                    </div>
                    <div className="pt-20 pl-36 flex items-center">
                        {leaderboardDisplayDisplay}
                    </div>
                </div>
            </div>
        </>
    );

}
export default Leaderboard;