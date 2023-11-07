import Loading from "../components/Loading";
import { socket } from "../socket";
import { useState } from "react";
function LoginPage({
  socketError,
  setSocketError,
  isLoading,
  setIsLoading,
  setGameStage,
}) {
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
      <div className="text-center bg-opacity-50 px-20 py-10 items-centers bg-[url('/src/assets/scroll.png')] bg-[length:100%_100%] dark:bg-[url('/src/assets/darkscroll.png')]">
        <div className="flex flex-col items-start">
          <label className="text-orange-950 font-bold" htmlFor="username">
            username:
          </label>
          <input
            className="border-2 border-blue-950"
            type="text"
            id="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start">
          <label className="text-orange-950 font-bold" htmlFor="password">
            password:
          </label>
          <input
            className="border-2 border-blue-950"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <span className="text-blue-950">{socketError}</span>
      </div>
      <div className="flex flex-col items-center">
        <button
          className="bg-gradient-to-r from-orange-700 to-orange-600 rounded mt-2 mb-2 p-1 px-12 py-2 text-sm font-bold border-2 border-orange-950 text-orange-950 shadow-sm sm:text-1xl"
          onClick={handleLogin}
        >
          Submit
        </button>
        <button
          className="mx-2 bg-gradient-to-r from-orange-600 to-orange-700 rounded mt-2 mb-2 p-1 px-6 py-2 text-sm font-bold border-2 border-orange-950 text-orange-950 shadow-sm sm:text-1xl"
          onClick={handleGuest}
        >
          Play as a guest
        </button>
        <button
          className="mx-2 bg-gradient-to-r from-orange-600 to-orange-700 rounded mt-2 mb-2 p-1 px-11 py-2 text-sm font-bold border-2 border-orange-950 text-orange-950 shadow-sm sm:text-1xl"
          onClick={() => {
            setGameStage("menu:register");
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
  return (
    <main className="grid box-border h-[calc(100%)] w-[calc(100%)] place-items-center pt-24 bg-[url('/src/assets/bluebkg.jpg')] bg-cover dark:bg-[url('/src/assets/darkbluebkg.png')]">
      {display}
    </main>
  );
}
export default LoginPage;
