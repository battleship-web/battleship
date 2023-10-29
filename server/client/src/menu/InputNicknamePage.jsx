import PropTypes from "prop-types";
import { useState } from "react";
import { socket } from "../socket";
export default function InputNicknamePage({ setGameStage, setUser }) {
  const [nickname, setNickname] = useState("");
  const onHandleNicknameSubmit = () => {
    socket.emit("setNickname", nickname);
    setUser((user) => {
      return { ...user, nickname: nickname };
    });
    setGameStage("menu:welcome");
  };
  return (
    <>
      <main className="grid h-screen w-screen place-items-center px-6 py-24 sm:py-32 lg:px-8 bg-cover "
        style={{
          backgroundImage: "url('/bluebkg.jpg')",
          backgroundSize: "100% 100%",}}>
        <div className="text-center">
        <div className="text-center bg-cover bg-opacity-50 px-10 py-10 items-center "
        style={{
          backgroundImage: "url('/scroll.png')",
          backgroundSize: "100% 100%",}}>
            <h1 className="mt-0 text-12xl font-mono font-bold tracking-tight bg-gradient-to-r from-orange-950 via-orange-900 to-orange-800 inline-block px-2.5 py-1 text-transparent bg-clip-text sm:text-5xl">
              Input Nickname
            </h1>
          </div>
          <p className="text-3x1 font-semibold leading-7 sm:text-2xl">
            <input
              type="text"
              value={nickname}
              name="nickname"
              onChange={(e) => setNickname(e.target.value)}
              placeholder="nickname"
              className="mt-5  rounded-md px-2.5 py-1 font-bold text-orange-950 shadow-sm sm:text-1xl border-2 border-blue-900"
            />

            <button
              className="mx-2 rounded-md bg-gradient-to-r border-2 border-orange-950 from-orange-700 to-orange-800 px-2.5 py-2.5 text-sm font-bold text-orange-950 shadow-sm sm:text-2xl hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-950"
              onClick={onHandleNicknameSubmit}
            >
              Submit
            </button>
          </p>
        </div>
      </main>
    </>
  );
}

InputNicknamePage.propTypes = {
  setGameStage: PropTypes.func,
  setUser: PropTypes.func,
};
