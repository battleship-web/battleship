import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { socket } from "../socket";
import ProfilePicture from "../components/ProfilePicture";

function LeaderBoard({ leaderboard, setGameStage }) {
  const [sorting, setSorting] = useState("byWins");
  let sortName = null;
  switch (sorting) {
    case "byWins":
      sortName = "Number of Rounds Won";
      break;
    case "byWinRatio":
      sortName = "Win Ratio";
      break;
    case "byLevel":
      sortName = "Level";
      break;
  }

  useEffect(() => {
    socket.emit("requestLeaderboard", sorting);
  }, [sorting]);

  let display = null;
  if (!leaderboard) {
    display = <Loading />;
  } else if (leaderboard.length === 0) {
    display = <h1>No Player in the leaderboard</h1>;
  } else {
    display = leaderboard.map((entry, index) => (
      <tr key={entry.username} className="font-semibold">
        <td className="border-2 border-orange-950 text-center p-2">
          {index + 1}
        </td>
        <td className="border-2 border-orange-950 text-center p-2">{`${entry.nickname} (${entry.username})`}</td>
        <td className="border-2 border-orange-950 text-center p-2">
          {entry.level}
        </td>
        <td className="border-2 border-orange-950 text-center p-2 flex justify-center">
          <ProfilePicture picture={entry.profilePicture} size="small" />
        </td>
        <td className="border-2 border-orange-950 text-center p-2">
          {entry.numOfRoundsWon}
        </td>
        <td className="border-2 border-orange-950 text-center p-2">
          {entry.numOfRoundsPlayed}
        </td>
        <td className="border-2 border-orange-950 text-center p-2">
          {entry.numOfRoundsPlayed !== 0
            ? entry.numOfRoundsWon / entry.numOfRoundsPlayed
            : 0}
        </td>
      </tr>
    ));
    display = (
      <table>
        <thead>
          <tr className="">
            <th className="border-2 border-orange-950 text-center p-2">Rank</th>
            <th className="border-2 border-orange-950 text-center p-2">{`Nickname (Username)`}</th>
            <th className="border-2 border-orange-950 text-center p-2">
              Level
            </th>
            <th className="border-2 border-orange-950 text-center p-2">
              Profile Picture
            </th>
            <th className="border-2 border-orange-950 text-center p-2">
              Rounds Won
            </th>
            <th className="border-2 border-orange-950 text-center p-2">
              Rounds Played
            </th>
            <th className="border-2 border-orange-950 text-center p-2">
              Win Ratio
            </th>
          </tr>
        </thead>
        <tbody>{display}</tbody>;
      </table>
    );
  }
  return (
    <div className="h-[calc(100%)] w-[calc(100%)] bg-[url('/src/assets/bluebkg.jpg')] bg-cove px-6 py-24">
      <div className="flex flex-col items-center bg-[url('/src/assets/wood.png')] bg-[length:100%_100%] p-10">
        <h1 className="text-3xl font-extrabold py-3">LeaderBoard</h1>
        <h1 className="font-semibold">Sort by: {sortName}</h1>
        <div>
          <button
            className="mx-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded mt-2 mb-2 p-1 px-6 py-2 text-sm font-bold text-orange-950 shadow-sm sm:text-2xl border-2 border-orange-950"
            onClick={() => {
              setSorting("byWins");
            }}
          >
            Number of Rounds won
          </button>
          <button
            className="mx-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded mt-2 mb-2 p-1 px-6 py-2 text-sm font-bold text-orange-950 shadow-sm sm:text-2xl border-2 border-orange-950"
            onClick={() => {
              setSorting("byWinRatio");
            }}
          >
            Win Ratio
          </button>
          <button
            className="mx-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded mt-2 mb-2 p-1 px-6 py-2 text-sm font-bold text-orange-950 shadow-sm sm:text-2xl border-2 border-orange-950"
            onClick={() => {
              setSorting("byLevel");
            }}
          >
            Level
          </button>
        </div>
        {display}
      </div>
      <div className="flex justify-center">
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
export default LeaderBoard;
