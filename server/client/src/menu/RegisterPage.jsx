import Loading from "../components/Loading";
import { socket } from "../socket";
import { useState } from "react";
import profile1 from "/cat.png";
import profile2 from "/dog.png";
import profile3 from "/pig.png";
import profile4 from "/elephant.png";
import profile5 from "/rabbit.png";

function RegisterPage({
  socketError,
  setSocketError,
  isLoading,
  setIsLoading,
  setGameStage,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [formError, setFormError] = useState(null);

  const profilePictures = [profile1, profile2, profile3, profile4, profile5];

  const handleRegister = () => {
    if (username === "") {
      setFormError("Username can't be empty.");
      return;
    }
    if (username === "guest") {
      setFormError("Username can't be guest.");
      return;
    }
    if (password === "") {
      setFormError("Password can't be empty.");
      return;
    }
    if (password !== rePassword) {
      setFormError("Password and password confirmation does not match.");
      setPassword("");
      setRePassword("");
      return;
    }
    if (nickname === "") {
      setFormError("Nickname can't be empty");
      return;
    }
    if (!selectedPicture) {
      setFormError("Please choose a profile picture.");
      return;
    }
    socket.emit("register", {
      username: username,
      password: password,
      nickname: nickname,
      profilePicture: selectedPicture.slice(1).split(".")[0],
    });
    setPassword("");
    setRePassword("");
    setFormError(null);
    setSocketError(null);
    setIsLoading(true);
  };
  const display = isLoading ? (
    <Loading />
  ) : (
    <div className="text-center">
      <div className="text-center bg-opacity-50 px-20 py-28 flex bg-[url('/src/assets/scroll.png')] dark:bg-[url('/src/assets/darkscroll.png')] bg-[length:100%_100%]">
        <div>
          <h1 className="font-bold text-3xl pb-4">Register</h1>
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
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-start">
            <label className="text-orange-950 font-bold" htmlFor="rePassword">
              confirm password:
            </label>
            <input
              className="border-2 border-blue-950"
              type="password"
              id="rePassword"
              autoComplete="new-password"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-start">
            <label className="text-orange-950 font-bold" htmlFor="nickname">
              nickname:
            </label>
            <input
              className="border-2 border-blue-950"
              type="text"
              id="nickname"
              autoComplete="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <span className="text-blue-950 font-bold">{formError}</span>
          <span className="text-blue-950 font-bold">{socketError}</span>
        </div>

        <div className="ml-5 flex flex-col justify-center flex-wrap">
          {profilePictures.map((picture, index) => (
            <div
              key={index}
              className={`rounded-lg m-1 cursor-pointer ${
                selectedPicture === picture ? "border-4 border-orange-700" : ""
              }`}
              onClick={() => setSelectedPicture(picture)}
            >
              <img
                src={picture}
                alt={`Profile Picture ${index + 1}`}
                className="rounded-lg w-12 h-12"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <button
          className="bg-gradient-to-r from-orange-700 to-orange-600 rounded mt-2 mb-2 p-1 px-12 py-2 text-sm font-bold border-2 border-orange-950 text-orange-950 shadow-sm sm:text-1xl"
          onClick={handleRegister}
        >
          Submit
        </button>
        <button
          className="mx-2 bg-gradient-to-r from-orange-600 to-orange-700 rounded my-2 p-1 px-7 py-2 text-sm font-bold border-2 border-orange-950 text-orange-950 shadow-sm sm:text-1xl"
          onClick={() => {
            setGameStage("menu:login");
          }}
        >
          Back to login
        </button>
      </div>
    </div>
  );
  return (
    <main className="grid h-min-[calc(100%)] w-[calc(100%)] bg-[url('/src/assets/bluebkg.jpg')] place-items-center px-6 py-24 sm:py-32 lg:px-8 bg-cover">
      {display}
    </main>
  );
}
export default RegisterPage;
