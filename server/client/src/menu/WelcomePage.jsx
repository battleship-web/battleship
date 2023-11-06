function WelcomePage({ user, setGameStage }) {
  const onhandleClick = () => {
    setGameStage("menu:lobby");
  };
  return (
    <main className="grid h-[calc(100%)] w-[calc(100%)] bg-[url('/src/assets/bluebkg.jpg')] place-items-center  px-6  sm:py-32 lg:px-8 bg-cover">
      <div className="text-center">
        <div className="text-center bg-opacity-50 px-10 py-4 items-center bg-[url('/src/assets/wood.png')] bg-[length:100%_100%]">
          <h1 className="text-12xl font-mono font-bold tracking-tight text-orange-950 sm:text-2xl ">{`Welcome General ${user.nickname} (${user.username})`}</h1>
        </div>
        <div className="text-center bg-opacity-50 px-20 py-20 items-center bg-[url('/src/assets/scroll.png')] bg-[length:100%_100%]">
          <h1 className="text-12xl font-mono font-bold tracking-tight text-orange-950 sm:text-1xl ">
            ⛴ In the beginning, before the human race was born, before dinosaurs
            went extinct, there was only violence. Every single living thing
            tried to adapt, survive, and most importantly, kill each other.
            Therefore, in every single era, there are wars. war to survive, war
            to conquer food, war for mating. Every reason can cause a war.
            Nowadays people have law and rule to minimise conflicts between each
            other. However the thirst for war isn&apos;t going anywhere, it is
            still inside of every single human. Since one man named Dr.Necern
            has found gunium particles. The technology of warships is forever
            changed, and wars occur everywhere. Just to conquer even one more
            grain of sand. And now several individuals are trying to conquer
            your island. But it is not that easy because this island has a
            warship too!!!. Use it, general!! Protect this island!!! Conquer the
            world!!!! ⛴
          </h1>
        </div>
        <button
          className="mx-2 bg-gradient-to-r from-orange-700 to-orange-800 rounded mt-2 mb-2 p-1 px-6 py-2 text-sm font-bold text-orange-950 shadow-sm sm:text-1xl border-2 border-orange-950"
          onClick={onhandleClick}
        >
          Next
        </button>
      </div>
    </main>
  );
}
export default WelcomePage;
