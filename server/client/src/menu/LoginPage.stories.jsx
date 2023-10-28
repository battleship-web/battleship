import LoginPage from "./LoginPage";

export default {
  component: LoginPage,
  title: "LoginPage",
  tags: ["autodocs"],
};

export const Default = {};

export const Error = {
  args: {
    socketError: "Generic error here",
  },
};

export const Loading = {
  args: {
    isLoading: true,
  },
};
