import PropTypes from "prop-types";
import { useState } from "react";
import { socket } from "../socket";
import BrightnessButton from "../darkmode/BrightnessButton";
import profile1 from "../assets/cat.jpg";
import profile2 from "../assets/dog.jpg";
import profile3 from "../assets/pig.jpg";
import profile4 from "../assets/elephant.jpg";
import profile5 from "../assets/rabbit.jpg";

export default function ChooseProfilePicture({ setGameStage, setUser }) {
    const [nickname, setNickname] = useState("");
    const [selectedPicture, setSelectedPicture] = useState(null);
  
    const onHandleNicknameSubmit = () => {
      if (!selectedPicture) {
        alert("Please select a profile picture.");
        return;
      }
      socket.emit("setProfilePicture", selectedPicture);
      setGameStage("menu:welcome");}

    const profilePictures = [
        profile1,
        profile2,
        profile3,
        profile4,
        profile5,
      ];
      return (
        <>
          <main
            className="grid h-screen w-screen place-items-center px-6 py-24 sm:py-32 lg:px-8 bg-cover"
            style={{
              backgroundImage: "url('/src/assets/bluebkg.jpg')",
              backgroundSize: "100% 100%",
            }}
          >
            <div className="text-center">
              <div
                className="text-center bg-cover bg-opacity-50 px-10 py-10 items-center"
                style={{
                  backgroundImage: "url('/src/assets/scroll.png')",
                  backgroundSize: "100% 100%",
                }}
              >
                <h1 className="mt-0 text-12xl font-mono font-bold tracking-tight bg-gradient-to-r from-orange-950 via-orange-900 to-orange-800 inline-block px-2.5 py-1 text-transparent bg-clip-text sm:text-5xl">
                  Choose Profile Picture
                </h1>
              </div>
              <div className="mt-5 flex justify-center flex-wrap">
                {profilePictures.map((picture, index) => (
                  <div
                    key={index}
                    className={`rounded-lg m-2 cursor-pointer ${
                      selectedPicture === picture ? 'border-4 border-orange-700' : ''
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
            <div className="text-right" style={{ position: "absolute", bottom: "0", right: "0" }}>
              <BrightnessButton />
            </div>
          </main>
        </>
      );
    }
    
    ChooseProfilePicture.propTypes = {
      setGameStage: PropTypes.func,
      setUser: PropTypes.func,
    };