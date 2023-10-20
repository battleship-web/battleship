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
      <main className="grid min-h-full place-items-center bg-[url(https://wallpapercave.com/wp/wp2874399.jpg)] px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <div className="text-center  bg-[url(https://thumbs.dreamstime.com/b/iron-background-threadbare-rusty-steel-covering-rivet-44688853.jpg)] bg-opacity-50 px-0 py-2 shadow-2xl sm:rounded-3xl border-2 border-slate-400">
            <h1 className="mt-0 text-12xl font-mono font-bold tracking-tight bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 inline-block px-2.5 py-1 text-transparent bg-clip-text sm:text-5xl">Input Nickname</h1>
          </div>
          <p className="text-3x1 font-semibold leading-7 text-gray-300 sm:text-2xl">
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="nickname"
              className="mt-5  rounded-md px-2.5 py-1 font-bold text-white shadow-sm sm:text-1xl border-2 border-slate-500"
            />
            <a href="#" className="mx-2 rounded-md bg-gradient-to-r from-blue-600 to-sky-500 px-2.5 py-2.5 text-sm font-bold text-white shadow-sm sm:text-2xl hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <button onClick={onHandleNicknameSubmit}>Submit</button>
            </a>
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
