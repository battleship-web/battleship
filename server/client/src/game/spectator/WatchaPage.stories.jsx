import WatchPage from "./WatchPage";

export default {
  component: WatchPage,
  title: "Game watching page",
};

const p1Info = { nickname: "Alice", socketId: "1" };
const p2Info = { nickname: "Bob", socketId: "2" };
const p1Score = 3;
const p2Score = 1;
const turn = "1";
const gameId = "gameid:1";

const p1Board = [
  ["blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank"],
  ["blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank"],
  ["ship1r", "blank", "blank", "blank", "blank", "blank", "blank", "blank"],
  ["ship2r", "blank", "ship4", "ship3", "ship2", "ship1", "blank", "blank"],
  ["ship3r", "blank", "blank", "blank", "blank", "blank", "blank", "blank"],
  ["ship4r", "blank", "blank", "blank", "blank", "blank", "blank", "blank"],
  ["blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank"],
  ["blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank"],
];

const p2Board = [
  ["blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank"],
  ["blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank"],
  ["ship1r", "blank", "blank", "blank", "blank", "blank", "blank", "blank"],
  ["ship2r", "blank", "blank", "blank", "blank", "blank", "blank", "blank"],
  ["hit", "blank", "blank", "blank", "blank", "blank", "blank", "blank"],
  ["ship4r", "blank", "blank", "blank", "blank", "blank", "blank", "blank"],
  ["blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank"],
  ["blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank"],
];

export const Default = {
  args: {
    p1Info: p1Info,
    p2Info: p2Info,
    p1Board: p1Board,
    p2Board: p2Board,
    turn: turn,
    gameId: gameId,
    p1Score: p1Score,
    p2Score: p2Score,
  },
};
