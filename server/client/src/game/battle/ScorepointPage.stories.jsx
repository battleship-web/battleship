import ScorepointPage from "./ScorepointPage";

const user = {
  username: "nigth",
  nickname: "butt",
  level: 7,
  profilePicture: "dog",
};
const opponentInfo = {
  username: "alice134",
  nickname: "Alice",
  level: 5,
  profilePicture: "cat",
};
const board = [
  ["blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank"],
  ["blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank"],
  ["ship1r", "blank", "blank", "blank", "blank", "blank", "blank", "blank"],
  ["ship2r", "blank", "ship4", "ship3", "ship2", "ship1", "blank", "blank"],
  ["ship3r", "blank", "blank", "blank", "blank", "blank", "blank", "blank"],
  ["ship4r", "blank", "blank", "blank", "blank", "blank", "blank", "blank"],
  ["blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank"],
  ["blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank"],
];

export default {
  component: ScorepointPage,
  title: "ScorepointPage",
  tags: ["autodocs"],
};

export const Default = {
  args: {
    instruction: false,
    user: user,
    turn: "socket-id-1",
    playerScore: 3,
    opponentScore: 2,
    opponentInfo: opponentInfo,
    playerBoard: board,
    playerBoardFireResults: [],
    opponentBoardFireResults: [],
    winner: null,
    emote: "happy",
    opponentEmote: "angry",
  },
};

export const TurnNull = {
  args: {
    instruction: false,
    user: user,
    turn: null,
    playerScore: 3,
    opponentScore: 2,
    opponentInfo: opponentInfo,
    playerBoard: board,
    playerBoardFireResults: [],
    opponentBoardFireResults: [],
    winner: null,
  },
};

export const Instruction = {
  args: {
    instruction: true,
    user: user,
    turn: "socket-id-1",
    playerScore: 3,
    opponentScore: 2,
    opponentInfo: opponentInfo,
    playerBoard: board,
    playerBoardFireResults: [],
    opponentBoardFireResults: [],
    winner: null,
  },
};
