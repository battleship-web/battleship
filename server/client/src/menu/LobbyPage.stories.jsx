import LobbyPage from "./LobbyPage";

export default {
  component: LobbyPage,
  title: "LobbyPage",
  tags: ["autodocs"],
};

// const client={nickname:"hey",username:"hey.milf"}
const user = { nickname: "hey", username: "hey.co" };
const clientList = [
  {
    nickname: "Leo",
    username: "leo123",
    socketId: "test1",
    level: 3,
    profilePicture: "elephant",
  },
  {
    nickname: "night",
    username: "night123",
    socketId: "test2",
    level: 5,
    profilePicture: "cat",
  },
  {
    nickname: "punny",
    username: "king1234",
    socketId: "test3",
    level: 7,
    profilePicture: "pig",
  },
  { nickname: "pes", username: "noisy586", socketId: "test4", level: 1 },
];
const clientList2 = [];
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

export const Loading = {
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
    username: "leo1234",
  },
};

export const Inviting = {
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

export const InviteeLeft = {
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

export const InviteAccepted = {
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
export const InviteRefused = {
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

export const InviteAcceptedButInviteeLeft = {
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

export const IncomingInvite = {
  args: {
    // inviting: "sadasd",
    clientList: clientList,
    username: "leo1234",
    incomingInvite: {
      socketId: "socketId1",
      nickname: "SadBoy",
      username: "sadboy123",
    },
    inviteeLeft: "sadasd",
    inviteAccepted: "sadasd",
    inviteRefused: "sadasd",
    user: user,
  },
};
