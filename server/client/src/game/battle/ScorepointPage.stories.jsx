import ScorepointPage from "./ScorepointPage";


const user ={username: "nigth", nickname: "butt"}
const board = [['blank', 'blank', 'hit', 'blank', 'blank', 'blank', 'blank','blank'],
  ['blank', 'blank', 'blank', 'blank', 'blank', 'blank', 'selected','blank'],
  ['ship1r', 'blank', 'blank', 'blank', 'blank', 'blank', 'blank','blank'],
  ['ship2r', 'blank', 'ship4', 'ship3', 'ship2', 'ship1', 'blank','blank'],
  ['ship3r', 'blank', 'blank', 'blank', 'blank', 'blank', 'blank','blank'],
  ['ship4r', 'blank', 'blank', 'blank', 'blank', 'blank', 'blank','blank'],
  ['blank', 'blank', 'blank', 'blank', 'blank', 'blank', 'miss','blank'],
  ['blank', 'blank', 'blank', 'blank', 'blank', 'blank', 'blank','blank']];
const opponentboard = [['blank', 'blank', 'hit', 'blank', 'blank', 'blank', 'blank','blank'],
  ['blank', 'blank', 'blank', 'blank', 'blank', 'blank', 'selected','blank'],
  ['ship1r', 'miss', 'blank', 'blank', 'blank', 'blank', 'blank','blank'],
  ['ship2r', 'blank', 'blank','blank','ship4', 'ship3', 'ship2', 'ship1'],
  ['ship3r', 'blank', 'blank', 'blank', 'miss', 'blank', 'blank','blank'],
  ['ship4r', 'blank', 'miss', 'blank', 'blank', 'blank', 'blank','blank'],
  ['blank', 'blank', 'blank', 'blank', 'blank', 'blank', 'miss','blank'],
  ['blank', 'blank', 'blank', 'blank', 'blank', 'blank', 'blank','blank']];
export default {
  component: ScorepointPage,
  title: "ScorepointPage",
  tags: ["autodocs"],
};

export const Default = {
  args: {
    instruction: false,
    user: user,
    board: board,
    opponentboard: opponentboard
  }
};


export const Instruction = {
  args: {
    instruction: true,
    user: user,
  }
};
