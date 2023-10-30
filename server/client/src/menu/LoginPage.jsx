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
      <div className="text-center bg-opacity-50 px-20 py-10"
        style={{
          backgroundImage: "url('/src/assets/scroll.png')",
          backgroundSize: "100% 100%",}}>
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
    </div>
  );
  return (
    <main className="grid h-screen w-screen place-items-center px-6 py-24 sm:py-32 lg:px-8 bg-cover "
    style={{
      backgroundImage: "url('/src/assets/bluebkg.jpg')",
      backgroundSize: "100% 100%",}}>
      {display}
    </main>
  );
}
export default LoginPage;
