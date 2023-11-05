import GameHeader from "./GameHeader";

export default {
  component: GameHeader,
  title: "Header",
  tags: ["autodocs"],
};

const user1 = {
  nickname: "Pun",
  username: "pun123",
  profilePicture: "rabbit",
  level: 32,
  exp: 56,
};

const guest = {
  nickname: "Alice",
  username: "guestID",
  profilePicture: "elephant",
};
export const TitlePage = {
  args: {
    gameStage: "menu:lobby",
    user: user1,
  },
};

export const NullUser = {
  args: {
    gameStage: "menu:title",
    user: null,
  },
};

export const Guest = {
  args: {
    gameStage: "game:battle",
    user: guest,
  },
};
