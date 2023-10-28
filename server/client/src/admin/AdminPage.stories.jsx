import AdminPage from "./AdminPage";

export default {
  component: AdminPage,
  title: "Admin Page",
  tags: ["autodocs"],
};

const clientList1 = [
  {
    nickname: "Alice",
    username: "alice123",
    socketId: "mock-socket-id-1",
    gameId: "mock-id-1",
  },
  {
    nickname: "Bob",
    username: "bob456",
    socketId: "mock-socket-id-2",
    gameId: "mock-id-1",
  },
  {
    nickname: "Eve",
    username: "eve13432",
    socketId: "mock-socket-id-3",
    gameId: "mock-id-2",
  },
  {
    nickname: "Trudy",
    username: "trudy555",
    socketId: "mock-socket-id-4",
    gameId: "mock-id-2",
  },
  {
    username: "guest:mock-guest-id-1",
    socketId: "mock-socket-id-5",
  },
];

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

<<<<<<< HEAD
=======

>>>>>>> refs/remotes/origin/main
const gameList2 = [
  {
    gameId: "mock-id-1",
    player1: {
      nickname: "King",
      username: "king112",
      socketId: "mock-socket-id-1",
      score: 4,
    },
    player2: {
      nickname: "Jack",
      username: "jack420",
      socketId: "mock-socket-id-2",
      score: 1,
    },
  },
  {
    gameId: "mock-id-2",
    player1: {
      nickname: "Queen",
      username: "queen13432",
      socketId: "mock-socket-id-3",
      score: 8,
    },
    player2: {
      nickname: "Ten",
      username: "ten10",
      socketId: "mock-socket-id-4",
      score: 1,
    },
  },
  {
    gameId: "mock-id-3",
    player1: {
      nickname: "Ace",
      username: "ace6184",
      socketId: "mock-socket-id-5",
      score: 4,
    },
    player2: {
      nickname: "Drop",
      username: "drop69",
      socketId: "mock-socket-id-6",
      score: 4,
    },
  },
];

export const Default = {
  args: {
    clientList: [],

    gameList: [],
  },
};

export const PopulatedSample1 = {
  args: {
    gameList: gameList1,
    clientList: clientList1,
  },
};

export const PopulatedSample2 = {
  args: {
    gameList: gameList2,
  },
};

export const PopulatedSample2 = {
  args: {
    gameList: gameList2,
  },
};