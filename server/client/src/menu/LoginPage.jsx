import Loading from "../components/Loading";
import { socket } from "../socket";
import { useState } from "react";
function LoginPage({ socketError, setSocketError, isLoading, setIsLoading }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    socket.emit("login", { username: username, password: password });
    setUsername("");
    setPassword("");
    setSocketError(null);
    setIsLoading(true);
  };

  const handleGuest = () => {
    socket.emit("login", { username: "guest", password: "" });
    setUsername("");
    setPassword("");
    setSocketError(null);
    setIsLoading(true);
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col p-2 border-2 border-slate-500 bg-slate-200 rounded">
      <div className="flex flex-col items-start">
        <label className="text-gray-600 font-bold" htmlFor="username">
          username:
        </label>
        <input
          className="border-2 border-slate-700"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="flex flex-col items-start">
        <label className="text-gray-600 font-bold" htmlFor="password">
          password:
        </label>
        <input
          className="border-2 border-slate-700"
          type="text"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col items-start">
        <button
          className="bg-slate-300 border-2 border-slate-500 rounded mt-2 mb-2 p-1"
          onClick={handleLogin}
        >
          Submit
        </button>
        <span>{socketError}</span>
        <button
          className="bg-slate-300 border-2 border-slate-500 rounded mt-2 mb-2 p-1"
          onClick={handleGuest}
        >
          Play as a guest
        </button>
      </div>
    </div>
  );
}
export default LoginPage;
