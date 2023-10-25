import Score from "../../components/Score";
import Instruction from "../../components/Instruction";

function ScorepointPage({instruction, setInstruction, user, setGameStage}) {
  let anaBoard  = <h1>waiting for anaBoard and case</h1>;
  const handleClickInstruction = () => {
    setInstruction(true);
  };
  const handleClickOut = () => {
      setInstruction(false);
  };
  let scorePageDisplay = null
  if (instruction) {
    scorePageDisplay = <h1><Instruction handleClickOut={handleClickOut}/></h1>
  } else {
    scorePageDisplay = <h1><Score handleClickInstruction={handleClickInstruction} user={user} setGameStage={setGameStage} anaBoard={anaBoard}/></h1>
  };


  return (
    <main className="grid min-h-full place-items-center bg-[url(https://images.theconversation.com/files/162016/original/image-20170322-31176-2q8pz6.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip)] px-6 py-24 sm:py-32 lg:px-8">
      {scorePageDisplay}
    </main>
  );
}

export default ScorepointPage;
