import PropTypes from "prop-types";
import { useState } from "react";
import { socket } from "../socket";
import profile1 from "/cat.png";
import profile2 from "/dog.png";
import profile3 from "/pig.png";
import profile4 from "/elephant.png";
import profile5 from "/rabbit.png";

export default function ChooseProfilePicture({ setGameStage, user, setUser }) {
  const [nickname, setNickname] = useState(
    user && user.nickname ? user.nickname : ""
  );
  const [selectedPicture, setSelectedPicture] = useState(
    user && user.profilePicture ? `/${user.profilePicture}.png` : null
  );

  const onHandleNicknameSubmit = () => {
    if (!selectedPicture) {
      alert("Please select a profile picture.");
      return;
    }
    if (nickname === "") {
      alert("Nickname can't be empty.");
      return;
    }
    if (
      selectedPicture === `/${user.profilePicture}.png` &&
      nickname === user.nickname
    ) {
      alert("There is no change.");
      return;
    }
    const profileString = selectedPicture.slice(1).split(".")[0];
    socket.emit("setProfilePicture", profileString);
    socket.emit("setNickname", nickname);
    setUser({ ...user, nickname: nickname, profilePicture: profileString });
    setGameStage("menu:welcome");
  };

  const profilePictures = [profile1, profile2, profile3, profile4, profile5];
  return (
    <>
      <main className="grid box-border h-[calc(100%)] w-[calc(100%)] bg-[url('/src/assets/bluebkg.jpg')] dark:bg-[url('/src/assets/darkbluebkg.png')] place-items-center px-6 py-24 sm:py-32 lg:px-8 bg-cover">
        <div className="text-center">
          <div className="text-center bg-opacity-50 px-10 py-10 items-centers bg-[url('/src/assets/scroll.png')] bg-[length:100%_100%] dark:bg-[url('/src/assets/darkscroll.png')]">
            <h1 className="mt-0 text-12xl font-mono font-bold tracking-tight bg-gradient-to-r from-orange-950 via-orange-900 to-orange-800 inline-block px-2.5 py-1 text-transparent bg-clip-text sm:text-5xl">
              Choose Profile Picture
            </h1>
          </div>
          <div className="mt-5 flex justify-center flex-wrap">
            {profilePictures.map((picture, index) => (
              <div
                key={index}
                className={`rounded-lg m-2 cursor-pointer ${
                  selectedPicture === picture
                    ? "border-4 border-orange-700"
                    : ""
                }`}
                onClick={() => setSelectedPicture(picture)}
              >
                <img
                  src={picture}
                  alt={`Profile Picture ${index + 1}`}
                  className="rounded-lg w-24 h-24"
                />
              </div>
            ))}
          </div>
          <p className="text-3x1 font-semibold leading-7 sm:text-2xl">
            <input
              type="text"
              value={nickname}
              name="nickname"
              onChange={(e) => setNickname(e.target.value)}
              placeholder="nickname"
              className="mt-5 rounded-md px-2.5 py-1 font-bold text-orange-950 shadow-sm sm:text-1xl border-2 border-blue-900"
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

ChooseProfilePicture.propTypes = {
  setGameStage: PropTypes.func,
  setUser: PropTypes.func,
};
