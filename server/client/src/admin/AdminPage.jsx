import { useState } from "react";

export default function AdminPage() {
  const [nickname, setNickname] = useState("");
  const NicknameSubmit = () => {
    socket.emit("setNickname", nickname);
    setUser((user) => {
      return { ...user, nickname: nickname };
    });
  };
  //This command aim to let user change his/her nickname.
  //The default username in this case should be nickname set in InputNicknamePage, not a blank string.
  
  const profileImage = document.getElementById('profileImage');
  const profileImageInput = document.getElementById('profileImageInput');
  profileImageInput.addEventListener('change', (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const base64Image = e.target.result;
        profileImage.src = base64Image;
      };

      reader.readAsDataURL(selectedFile);
    } else {
      profileImage.src = '';
    }
  });

  return(
  <>
  <div className="backToGame" class="flex w-1/5 h-full">
    <div className="exitButton" class="flex w-20 h-20 align-top">
      <button onClick={() => setGameState("menu:welcome")}>X</button>
    </div>
  </div>
  <div class="flex w-4/5 h-2/5">
    <div className="displayProfile" class="flex w-40">
      <img class="object-center" id="profileImage" src="" alt="Selected Image"></img>
      <br /><p align="center">{user.nickname}</p>
    </div>
    <div className="updateProfileImage" class="flex h-1/5">
      <div class="object-center">
        <p>Change Profile Image</p>
        <input 
          type="file" 
          id="profileImageInput" 
          accept="image/*" /></div>
      </div>
    <div className="updateNickname" class="flex h-1/5">
      <div>
      <p>Change Nickname</p>
    <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="nickname"
      />
      </div>
    </div>
    <div class="flex h-3/5 w-4/5">
      <div className="connectedClient" class="flex w-2/5">
        pass
      </div>
      <div className="winRate" class="flex w-2/5">
        pass
      </div>
    </div>
  </div>
  </>
  //Wait for how to collect connected client list. (Target: write connected clients in form of list.)
  //When a new client connected to the server, the connected client list is appended after, and shown here.
  //Wait for collected win data from game section.
  );
}

