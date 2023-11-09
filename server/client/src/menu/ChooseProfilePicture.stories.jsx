import ChooseProfilePicture from "./ChooseProfilePicture";

export default {
  component: ChooseProfilePicture,
  title: "ChooseProfilePicture",
  tags: ["autodocs"],
};
const user1 = {
  nickname: "Pun",
  profilePicture: "rabbit",
};
export const Default = {
  args: {
    user: user1,
  },
};

export const NullUser = {
  args: {
    user: null,
  },
};
