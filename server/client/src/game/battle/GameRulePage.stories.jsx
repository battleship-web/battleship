import GameRulePage from "./GameRulePage";

export default {
  component: GameRulePage,
  title: "GamerulePage",
  tags: ["autodocs"],
};

const user = { nickname: "Noey", username: "Yolo" };
export const Default = {
  args: {
    user: user,
  },
};
