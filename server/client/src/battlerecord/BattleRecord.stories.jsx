import BattleRecord from "./BattleRecord";

export default {
  component: BattleRecord,
  title: "Battle History",
  tags: ["autodocs"],
};
const record = [
  {
    gameId: "id1",
    time: new Date("August 19, 2023 23:15:30 GMT+07:00"),
    win: true,
    opponent: {
      nickname: "Bob",
      username: "bob",
      role: "registered user",
      level: 5,
      profilePicture: "dog",
    },
  },
  {
    gameId: "id2",
    time: new Date("August 18, 2023 23:10:47 GMT+07:00"),
    win: false,
    opponent: {
      nickname: "test",
      username: "tester",
      role: "guest",
      level: undefined,
      profilePicture: "elephant",
    },
  },
  {
    gameId: "id3",
    time: new Date("August 19, 2023 23:15:30 GMT+07:00"),
    win: true,
    opponent: {
      nickname: "Bob",
      username: "bob",
      role: "registered user",
      level: 5,
      profilePicture: "dog",
    },
  },
  {
    gameId: "id4",
    time: new Date("August 19, 2023 23:15:30 GMT+07:00"),
    win: true,
    opponent: {
      nickname: "Bob",
      username: "bob",
      role: "registered user",
      level: 5,
      profilePicture: "dog",
    },
  },
  {
    gameId: "id5",
    time: new Date("August 19, 2023 23:15:30 GMT+07:00"),
    win: true,
    opponent: {
      nickname: "Bob",
      username: "bob",
      role: "registered user",
      level: 5,
      profilePicture: "dog",
    },
  },
  {
    gameId: "id6",
    time: new Date("August 19, 2023 23:15:30 GMT+07:00"),
    win: true,
    opponent: {
      nickname: "Bob",
      username: "bob",
      role: "registered user",
      level: 5,
      profilePicture: "dog",
    },
  },
  {
    gameId: "id7",
    time: new Date("August 19, 2023 23:15:30 GMT+07:00"),
    win: true,
    opponent: {
      nickname: "Bob",
      username: "bob",
      role: "registered user",
      level: 5,
      profilePicture: "dog",
    },
  },
  {
    gameId: "id8",
    time: new Date("August 19, 2023 23:15:30 GMT+07:00"),
    win: true,
    opponent: {
      nickname: "Bob",
      username: "bob",
      role: "registered user",
      level: 5,
      profilePicture: "dog",
    },
  },
];

const record2 = Array(16)
  .fill()
  .map((_, index) => ({
    gameId: `id${index}`,
    time: new Date("August 19, 2023 23:15:30 GMT+07:00"),
    win: true,
    opponent: {
      nickname: "Bob",
      username: "bob",
      role: "registered user",
      level: 5,
      profilePicture: "dog",
    },
  }));
export const Default = {
  args: {
    record: record,
  },
};

export const Long = {
  args: {
    record: record2,
  },
};
export const Loading = {
  args: {
    record: null,
  },
};

export const NoHistory = {
  args: {
    record: [],
  },
};
