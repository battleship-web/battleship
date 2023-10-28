// Board.stories.js
import Board from "./Board";

export default {
  component: Board,
  title: "Board",
};

export const BlankBoard = () => {
  const board = [...Array(8)].map(() => Array(8).fill("blank"));
  return <Board board={board} size="big" />;
};
export const SelectedBoard = () => {
  const boardSelected = [...Array(8)].map(() => Array(8).fill("selected"));
  return <Board board={boardSelected} />;
};
export const TestBoard = () => {
  const testboard = [
    ["blank", "blank", "hit", "blank", "blank", "blank", "blank", "blank"],
    ["blank", "blank", "blank", "blank", "blank", "blank", "selected", "blank"],
    ["ship1r", "blank", "blank", "blank", "blank", "blank", "blank", "blank"],
    ["ship2r", "blank", "ship4", "ship3", "ship2", "ship1", "blank", "blank"],
    ["ship3r", "blank", "blank", "blank", "blank", "blank", "blank", "blank"],
    ["ship4r", "blank", "blank", "blank", "blank", "blank", "blank", "blank"],
    ["blank", "blank", "blank", "blank", "blank", "blank", "miss", "blank"],
    ["blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank"],
  ];
  return <Board board={testboard} />;
};
