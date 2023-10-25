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

  const display = isLoading ? (
    <Loading />
  ) : (
    <div className="text-center">
      <div className="text-center  bg-[url(https://thumbs.dreamstime.com/b/iron-background-threadbare-rusty-steel-covering-rivet-44688853.jpg)] bg-opacity-50 px-10 py-4 shadow-2xl sm:rounded-3xl border-2 border-slate-400">
        <div className="flex flex-col items-start">
          <label className="text-gray-300 font-bold" htmlFor="username">
            username:
          </label>
          <input
            className="border-2 border-slate-500"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start">
          <label className="text-gray-300 font-bold" htmlFor="password">
            password:
          </label>
          <input
            className="border-2 border-slate-500"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <span className="text-slate-200">{socketError}</span>
      </div>
      <button
        className="bg-gradient-to-r from-blue-600 to-sky-500 rounded mt-2 mb-2 p-1 px-12 py-2 text-sm font-bold text-white shadow-sm sm:text-1xl"
        onClick={handleLogin}
      >
        Submit
      </button>
      <button
        className="mx-2 bg-gradient-to-r from-sky-500 to-blue-600 rounded mt-2 mb-2 p-1 px-6 py-2 text-sm font-bold text-white shadow-sm sm:text-1xl"
        onClick={handleGuest}
      >
        Play as a guest
      </button>
    </div>
  );
  return (
    <main className="grid h-screen w-screen place-items-center bg-[url(https://wallpapercave.com/wp/wp2874399.jpg)] px-6 py-24 sm:py-32 lg:px-8 bg-cover">
      {display}
    </main>
  );
}
export default LoginPage;
