function WelcomePage({ user, setGameStage }) {
  const onhandleClick = () => {
    setGameStage("menu:lobby");
  };
  return (
    <main className="grid h-screen w-screen place-items-center  px-6  sm:py-32 lg:px-8 bg-cover"
        style={{
          backgroundImage: "url('/src/assets/bluebkg.jpg')",
          backgroundSize: "100% 100%",}}>
      <div className="text-center">
      <div className="text-center bg-cover bg-opacity-50 px-10 py-4 items-center "
        style={{
          backgroundImage: "url('/src/assets/wood.png')",
          backgroundSize: "100% 100%",}}>
          <h1 className="text-12xl font-mono font-bold tracking-tight text-orange-950 sm:text-2xl ">{`Welcome General ${user.nickname} (${user.username})`}</h1>
        </div>
        <div className="text-center bg-cover bg-opacity-50 px-20 py-20 items-center "
        style={{
          backgroundImage: "url('/src/assets/scroll.png')",
          backgroundSize: "100% 100%",}}>
          <h1 className="text-12xl font-mono font-bold tracking-tight text-orange-950 sm:text-1xl ">
            ⛴ In the world of maritime conquest, where battleships rule the waves and strategic brilliance reigns supreme, you have 
            chosen the symbol of your command. As you embark on this thrilling naval adventure, you are about to become a legendary 
            General of the high seas. With determination and skill, you are about to carve yor name into the annals of Battleship history!
          </h1>

          <h1 className="text-12xl font-mono font-bold tracking-tight text-orange-950 sm:text-1xl ">
          ⛴ Set sail and navigate through treacherous waters, seeking out enemy ships and rival Generals who dare to challenge 
            your fleet. Engage in thrilling battles and outwit your rivals in your mission to discover and conquer the seas. Rise above
            the ranks of other Generals, sinking their ships and capturing their treasures and prestige. But beware, for the sea is 
            unforgiving to all... 
          </h1>

          <h1 className="text-12xl font-mono font-bold tracking-tight text-orange-950 sm:text-1xl ">
          ⛴ So prepare your strategy to win every battle and your fleet to outperform any other General's. May the tides shift in your 
            favour as the fate of the sea is in your hands! Are you ready? Your Battleship adventure awaits!
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
