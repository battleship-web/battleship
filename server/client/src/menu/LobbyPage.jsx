import { useEffect } from "react";
import Loading from "../components/Loading";
import Inviting from "../components/Inviting";
import InviteeLeft from "../components/InviteeLeft";
import InviteAccepted from "../components/InviteAccepted";
import InviteRefused from "../components/InviteRefused";
import IncommingInvite from "../components/IncommingInvite";
import { socket } from "../socket";


function LobbyPage({
  clientList, 
  username,
  setGameStage,
  inviteeLeft, 
  inviteAccepted,
  inviteRefused, 
  setInviteAccepted, 
  setInviteRefused, 
  setInviteeLeft, 
  inviting, 
  incomingInvite, 
  setInviting, 
  setIncomingInvite,
}) {

  const handleBack = () => {
      setInviting(false);
      setInviteeLeft(null);
      setInviteAccepted(null);
      setInviteRefused(null);
  };

  const handleBattle = () => {
    setGameStage("game:battle");
    setInviting(false);
    setInviteeLeft(null);
    setInviteAccepted(null);
    setInviteRefused(null);
  };

  function handleInvite() {
    setInviting(true);
    socket.emit("invite", client.socketId);
  }

  function acceptInvitation() {
    socket.emit("accept", user.socketId);
    setGameStage("game:battle");
    setIncomingInvite(null);
  }

  function refuseInvitation() {
    socket.emit("refuse", user.socketId);
    setIncomingInvite(null);
  }


  useEffect(() => {
    socket.emit("clientListRequest");
  }, []);

  let display = null;

  if (incomingInvite !== null) {
    display = <h1><IncommingInvite acceptInvitation={acceptInvitation} refuseInvitation={refuseInvitation}/></h1>; 
  } else{
    if (inviting) {
      if (inviteeLeft !== null){
        display = <h1><InviteeLeft handleBack={handleBack} /></h1>;
      } else if (inviteRefused !== null) {
        if (inviteeLeft !== null) {
          display = <h1><InviteeLeft handleBack={handleBack} /></h1>;
        } else{
          display = <h1><InviteRefused handleBack={handleBack}/></h1>;
        };
      } else if(inviteAccepted !== null) {
        if (inviteeLeft !== null) {
          display = <h1><InviteeLeft handleBack={handleBack} /></h1>;
        } else{
          display = <h1><InviteAccepted handleBattle={handleBattle} /></h1>;
        };
      } else {
        display = <h1><Inviting /></h1>;
      };
    } else {
      if (clientList === null) {
          display = <h1><Loading  /></h1>;
      } else {
        const clientExcludingMe = clientList.filter((client) => {
          return client.username !== username;
        });

        if (clientExcludingMe.length === 0) {
          display = <h1 className="text-12xl font-mono font-bold tracking-tight text-gray-100 sm:text-3xl animate-pulse ">No other online player...</h1>;
        } else {
          const listToDisplay = clientExcludingMe.map((client) => {
            return (
              <li className="flex justify-center text-12xl font-mono font-bold tracking-tight text-gray-100 sm:text-3xl text-center bg-[url(https://thumbs.dreamstime.com/b/iron-background-threadbare-rusty-steel-covering-rivet-44688853.jpg)] bg-opacity-50 px-10 py-2 shadow-2xl sm:rounded-3xl border-2 border-slate-400" key={client.username}>
                <h2 className="my-3 mr-5 text-yellow-300">General</h2>
                <h1 className="my-3 mr-5 ">{client.nickname}</h1>
                <h2 className="my-3">({client.username})</h2>
                  <button className="mx-6 bg-gradient-to-r from-sky-500 to-blue-600 rounded mt-2 mb-2 p-1 px-6 py-2 text-sm font-bold text-white shadow-sm sm:text-1xl border-2 border-slate-400"
                    onClick={handleInvite}
                  >
                    Fight
                  </button>
              </li>
            );
          });
          display = <ul>{listToDisplay}</ul>;
        }
      }
    }
  }

  return (
    <main className="grid min-h-full place-items-center bg-[url(https://images.theconversation.com/files/162016/original/image-20170322-31176-2q8pz6.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip)] px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <div className="text-center bg-[url(https://thumbs.dreamstime.com/b/iron-background-threadbare-rusty-steel-covering-rivet-44688853.jpg)] bg-opacity-50 px-20 py-10 shadow-2xl sm:rounded-3xl border-2 border-slate-400">
        {display}
        </div>
        <div>
          <button
            className="mx-4 bg-gradient-to-r from-sky-500 to-blue-600 rounded mt-2 mb-2 p-1 px-6 py-2 text-sm font-bold text-white shadow-sm sm:text-2xl border-2 border-slate-400"
            onClick={handleInvite}
          >
            Refresh
          </button>
        </div>
      </div>
    </main>
  );
}
export default LobbyPage;
