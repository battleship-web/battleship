import Loading from "../components/Loading";
import { useEffect } from "react";
import { socket } from "../socket";
import ProfilePicture from "../components/ProfilePicture";
function BattleRecord({ record, setGameStage }) {
  useEffect(() => {
    socket.emit("requestRecord");
  }, []);
  let display = null;
  if (!record) {
    display = <Loading />;
  } else if (record.length === 0) {
    display = <h1>No Battle History</h1>;
  } else {
    display = record.map((battle) => (
      <li
        key={battle.gameId}
        className="flex gap-3 items-center bg-[url('/src/assets/scroll.png')] bg-[length:100%_100%] px-8 py-10"
      >
        <h1 className="font-semibold">
          {new Date(battle.time).toLocaleTimeString("en-GB")}
        </h1>
        <h1 className="font-semibold">
          {new Date(battle.time).toLocaleDateString("en-GB")}
        </h1>
        {battle.win ? (
          <h1 className="font-extrabold text-green-800 text-2xl">Win</h1>
        ) : (
          <h1 className="font-extrabold text-red-800 text-2xl">Lose</h1>
        )}
        <h1 className="font-semibold">{battle.opponent.nickname}</h1>
        <h1 className="font-semibold">
          {battle.opponent.role === "registered user"
            ? `(${battle.opponent.username})`
            : "(guest)"}
        </h1>
        {battle.opponent.role === "registered user" ? (
          <h1 className="font-semibold">{`Lv:${battle.opponent.level}`}</h1>
        ) : null}
        <ProfilePicture picture={battle.opponent.profilePicture} size="small" />
      </li>
    ));
    display = <ul>{display}</ul>;
  }
  return (
    <div className="h-[calc(100%)] w-[calc(100%)] bg-[url('/src/assets/bluebkg.jpg')] bg-cove px-6 py-24">
      <div className="flex flex-col items-center bg-[url('/src/assets/wood.png')] bg-[length:100%_100%] p-10">
        <h1 className="text-3xl font-extrabold py-3">Battle History</h1>
        {display}
      </div>
      <div className="flex justify-center">
        <button
          className="mx-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded mt-2 mb-2 p-1 px-6 py-2 text-sm font-bold text-orange-950 shadow-sm sm:text-2xl border-2 border-orange-950"
          onClick={() => {
            socket.emit("requestRecord");
          }}
        >
          Refresh
        </button>
        <button
          className="mx-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded mt-2 mb-2 p-1 px-6 py-2 text-sm font-bold text-orange-950 shadow-sm sm:text-2xl border-2 border-orange-950"
          onClick={() => {
            setGameStage("menu:lobby");
          }}
        >
          Go to lobby
        </button>
      </div>
    </div>
  );
}
export default BattleRecord;
