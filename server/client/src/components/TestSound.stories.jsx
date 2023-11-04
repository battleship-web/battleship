import TestSound from "./TestSound";
import music from "../assets/test.mp3";

export default {
  component: TestSound,
  title: "Sound",
};

export const Default = {
  args: {
    music: music,
  },
};
