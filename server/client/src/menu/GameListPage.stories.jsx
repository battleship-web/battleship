import GameListPage from "./GameListPage";

export default {
  component: GameListPage,
  title: "Game List Page",
};
const gameList1 = [
  {
    gameId: "mock-id-1",
    player1: {
      nickname: "Alice",
      username: "alice123",
      socketId: "mock-socket-id-1",
      score: 3,
    },
    player2: {
      nickname: "Bob",
      username: "bob456",
      socketId: "mock-socket-id-2",
      score: 0,
    },
  },
  {
    gameId: "mock-id-2",
    player1: {
      nickname: "Eve",
      username: "eve13432",
      socketId: "mock-socket-id-3",
      score: 7,
    },
    player2: {
      nickname: "Trudy",
      username: "trudy555",
      socketId: "mock-socket-id-4",
      score: 12,
    },
  },
];
export const Default = {
  args: {
    gameList: gameList1,
  },
};
