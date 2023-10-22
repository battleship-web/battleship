import { useReducer } from "react";
import WelcomePage from "./WelcomePage";

export default {
  component: WelcomePage,
  title: "WelcomePage",
  tags: ["autodocs"],
};

const user={nickname:"hey",username:"hey.co"}
export const Default = {
  args: {
    user: user
  },
};