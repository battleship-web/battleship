import TitlePage from "./TitlePage";

export default {
  component: TitlePage,
  title: "TitlePage",
  tags: ["autodocs"],
};

function setGameStage(arg){
  console.log(arg)
}
export const Default = {
  args: {
    setGameStage: setGameStage
  }
};