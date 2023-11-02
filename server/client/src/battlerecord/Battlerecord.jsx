import { useEffect } from "react";
import { Socket } from "../socket";

function BattleRecord({records, user}) {
    useEffect(() => {
        socket.emit("requestRecord");
    });

    let recordDisplay = null;
    let profileDisplay = null;
    if (records.username === user.username) {
        recordDisplay = (
        <table>
            <tr>
                <td><p className="border-2 border-orange-950 text-center p-2">Nickname: {records.nickname}</p></td>
            </tr>
            <tr>
                <td><p className="border-2 border-orange-950 text-center p-2">Username: {records.username}</p></td>
            </tr>
            <tr>
                <td><p className="border-2 border-orange-950 text-center p-2">Level: {records.level}</p></td>
            </tr>
            <tr>
                <td><p className="border-2 border-orange-950 text-center p-2">Win: {records.win}</p></td>
            </tr>
        </table>
        );
        profileDisplay = (
            <div className="w-full h-full">{user.profilePicture}</div>
        );
    }

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
                        {recordDisplay}
                    </div>
                    <div className="pt-20 pr-36 flex items-center w-48 h-32">
                        {profileDisplay}
                    </div>
                </div>
            </div>
        </>
    );
}
export default BattleRecord