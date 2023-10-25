import ScorepointPage from "./ScorepointPage";


const user ={username: "nigth", nickname: "butt"}
export default {
  component: ScorepointPage,
  title: "ScorepointPage",
  tags: ["autodocs"],
};

export const Default = {
  args: {
    instruction: false,
    user:user
  }
};

export const Instruction = {
  args: {
    instruction: true,
    user:user
  }
};
