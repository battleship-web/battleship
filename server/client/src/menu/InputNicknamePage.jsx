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
      <h1>Input Nickname:</h1>
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="nickname"
      />
      <button onClick={onHandleNicknameSubmit}>Submit</button>
    </>
  );
}

InputNicknamePage.propTypes = {
  setGameStage: PropTypes.func,
  setUser: PropTypes.func,
};
