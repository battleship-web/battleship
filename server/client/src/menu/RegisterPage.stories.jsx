import RegisterPage from "./RegisterPage";

export default {
  component: RegisterPage,
  title: "Register Page",
  tags: ["autodocs"],
};

export const Default = {
  args: {
    socketError: null,
    isLoading: false,
  },
};

export const Loading = {
  args: {
    socketError: null,
    isLoading: true,
  },
};

export const Error = {
  args: {
    socketError: "Error from server.",
    isLoading: false,
  },
};
