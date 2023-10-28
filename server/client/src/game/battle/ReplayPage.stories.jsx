import ReplayPage from "./ReplayPage";

export default {
  component: ReplayPage,
  title: "replay page",
  tags: ["autodocs"],
};

export const Accepted = {
  args: {
    text: "Your opponent also wants a rematch!",
  },
};

export const Rejected = {
  args: {
    text: "Your opponent escaped!",
  },
};
