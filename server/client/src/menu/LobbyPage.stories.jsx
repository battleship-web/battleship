import LobbyPage from "./LobbyPage";

export default {
  component: LobbyPage,
  title: "LobbyPage",
  tags: ["autodocs"],
};


// const client={nickname:"hey",username:"hey.milf"}
const user={nickname:"hey",username:"hey.co"}
const clientList = [{nickname:"Leo", username:"leo123",socketId:"test1"},{nickname:"night", username:"night123",socketId:"test2"},{nickname:"punny", username:"king1234",socketId:"test3"},{nickname:"pes", username:"noisy586",socketId:"test4"}]
const clientList2 = []
export const Default = {
  args: {
    inviting: false,
    clientList: clientList,
    username: "leo1234",
    inviteeLeft: null,  
    incomingInvite: null,
  },
};
/// client[(username:, name:) () ]

export const loading = {
  args: {
    clientList: null,
    inviteeLeft: null,  
    username: "leo1234",
    incomingInvite: null,
  },
};

export const Noplayer = {
  args: {
    incomingInvite: null,
    clientList: clientList2,
    inviteeLeft: null,  
    username: "leo1234"
  },
};

export const inviting = {
  args: {
    inviting: true,
    clientList: clientList,
    username: "leo1234",
    incomingInvite: null,
    inviteeLeft: null,  
    inviteAccepted: null,
    inviteRefused: null,
    acceptInvite: null,
    refuseInvite: null,
  },
};

export const inviteeLeft = {
  args: {
    inviting: true,
    clientList: clientList,
    username: "leo1234",
    incomingInvite: null,
    inviteeLeft: "sadasd",
    inviteAccepted: null,
    inviteRefused: null,
  },
};

export const inviteAccepted = {
  args: {
    inviting: true,
    clientList: clientList,
    username: "leo1234",
    incomingInvite: null,
    inviteeLeft: null,
    inviteAccepted: "sadasd",
    inviteRefused: null,
  },
};
export const inviteRefused = {
  args: {
    inviting: true,
    clientList: clientList,
    username: "leo1234",
    incomingInvite: null,
    inviteeLeft: null,
    inviteAccepted: null,
    inviteRefused: "sadasd",
  },
};

export const inviteAcceptedButInviteeLeft = {
  args: {
    inviting: true,
    clientList: clientList,
    username: "leo1234",
    incomingInvite: null,
    inviteeLeft: "sadasd",
    inviteAccepted: null,
    inviteRefused: "sadasd",
  },
};


export const incommingInvite = {
  args: {
    inviting: "sadasd",
    clientList: clientList,
    username: "leo1234",
    incomingInvite: "sadasd",
    inviteeLeft: "sadasd",
    inviteAccepted: "sadasd",
    inviteRefused: "sadasd",
    user: user
  },
};