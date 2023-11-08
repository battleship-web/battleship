function GamerulePage({ setGameStage }) {
  const onhandleClick = () => {
    setGameStage("game:prep");
  };

  return (
    <main className="grid place-items-center bg-cover w-[calc(100%)] min-h-[calc(100%)] bg-[url('/src/assets/bluebkg.jpg')] dark:bg-[url('/src/assets/darkbluebkg.png')] pt-32 pb-24">
      <div className="text-center">
        <div className="text-center bg-opacity-50 px-10 py-10 bg-[url('/src/assets/wood.png')] bg-[length:100%_100%]">
          <h1 className="text-12xl font-mono font-bold tracking-tight text-orange-950 sm:text-2xl ">
            Instructions
          </h1>
        </div>

        <div className="text-center bg-opacity-50 px-10 py-40 bg-[url('/src/assets/scroll.png')] dark:bg-[url('/src/assets/darkscroll.png')] bg-[length:100%_100%]">
          <h1 className="text-12xl font-mono font-bold tracking-tight text-orange-950 sm:text-1xl ">
            {`⛴ 1) Game setup: ⛴`}
          </h1>
          <h1 className="text-12xl font-mono font-bold tracking-tight text-orange-950 sm:text-1xl mx-16">
            Each player has a fleet of 4 battlehips. Choose your battleships on
            the righthandside, selecting their placement to be either on a row
            or column. Place your ships on the grid, forming your fleet. During
            battle, your opponent cannot see your ships and you cannot see
            theirs. Choose your ships and their positions wisely to trick your
            enemy!
          </h1>

          <h1 className="text-12xl font-mono font-bold tracking-tight text-orange-950 sm:text-1xl ">
            {`⛴ 2) Battleship: ⛴`}
          </h1>
          <h1 className="text-12xl font-mono font-bold tracking-tight text-orange-950 sm:text-1xl mx-16">
            There are 2 grids. The one on the left is your opponent&apos;s and
            the one on the right is yours. Each round, you need to attack one
            square of your opponent&apos;s grid seeking to destroy their ships.
            You have 10 seconds to decide on your target. If you manage to hit a
            square of their ships, your missile will appear in a mass of
            destroyed planks. If you miss your shot, your missile will remain in
            empty waters...
          </h1>
          <h1 className="text-12xl font-mono font-bold tracking-tight text-orange-950 sm:text-1xl ">
            {`⛴ 3) Special Events: ⛴`}
          </h1>
          <h1 className="text-12xl font-mono font-bold tracking-tight text-orange-950 sm:text-1xl mx-16">
            Each battle, you may also choose to use one bomb. This special
            missile can hit 4 neighbouring squares and can be used once at any
            point in the game, according to your strategy. But beware, the sea
            is not always calm! Storms may send ligthning strikes to attack you
            or your enemy. They may destroy ships or land in empty waters...
          </h1>
          <h1 className="text-12xl font-mono font-bold tracking-tight text-orange-950 sm:text-1xl ">
            {`⛴ 4) Ultimate goal: ⛴`}
          </h1>
          <h1 className="text-12xl font-mono font-bold tracking-tight text-orange-950 sm:text-1xl mx-16">
            Your ultimate goal is to be the first to destroy all the ships of
            your enemy in order to conquer their fleet and win the battle.
            Choose your fleet and attack strategy wisely, because your opponent
            has the same mission as you!
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
export default GamerulePage;
