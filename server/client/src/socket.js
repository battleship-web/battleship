import { io } from "socket.io-client";

const URL =
  import.meta.env.VITE_APP_ENV === "production"
    ? undefined
    : "http://localhost:4000";

export const socket = io(URL, {
  autoConnect: false,
});
