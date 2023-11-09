function Instruction({ handleClickOut }) {
  return (
    <main className="text-center">
      <div className="text-center bg-opacity-50 px-10 py-10 bg-[url('/src/assets/wood.png')] bg-[length:100%_100%]">
        <h1 className="text-12xl font-mono font-bold tracking-tight text-orange-950 sm:text-2xl ">
          Instructions
        </h1>
      </div>
      <div className="text-center bg-opacity-50 px-40 py-40 bg-[url('/src/assets/scroll.png')] bg-[length:100%_100%] dark:bg-[url('/src/assets/darkscroll.png')]">
        <h1 className="text-12xl font-mono font-bold tracking-tight text-orange-950 sm:text-1xl ">
          {`⛴ 1) Game setup: ⛴`}
        </h1>
        <h1 className="text-12xl font-mono font-bold tracking-tight text-orange-950 sm:text-1xl ">
          Each player has 4 sets of ships to choose from. Select the ship
          placement to be either on a row or column. Place your ships on the
          grid, forming your fleet, or shuffle them! During battle, your
          opponent cannot see your ships and you cannot see theirs. Choose your
          ships and their positions wisely to trick your enemy!
        </h1>

        <h1 className="text-12xl font-mono font-bold tracking-tight text-orange-950 sm:text-1xl ">
          {`⛴ 2) Battleship: ⛴`}
        </h1>
        <h1 className="text-12xl font-mono font-bold tracking-tight text-orange-950 sm:text-1xl ">
          There are 2 grids. The one on the left is your opponent&apos;s and the
          one on the right is yours. Each round, you need to attack one square
          of your opponent&apos;s grid seeking to destroy their ships. You have
          10 seconds to decide on your target. If you manage to hit a square of
          their ships, your missile will appear in a mass of destroyed planks.
          If you miss your shot, your missile will remain in empty waters...
        </h1>
        <h1 className="text-12xl font-mono font-bold tracking-tight text-orange-950 sm:text-1xl ">
          {`⛴ 3) Special Events: ⛴`}
        </h1>
        <h1 className="text-12xl font-mono font-bold tracking-tight text-orange-950 sm:text-1xl ">
          Each battle, you may also choose to use one bomb. This special missile
          can hit 4 neighbouring squares and can be used once at any point in
          the game, according to your strategy. But beware, the sea is not
          always calm! Storms may send ligthning strikes to attack you or your
          enemy. They may destroy ships or land in empty waters...
        </h1>
        <h1 className="text-12xl font-mono font-bold tracking-tight text-orange-950 sm:text-1xl ">
          {`⛴ 4) Ultimate goal: ⛴`}
        </h1>
        <h1 className="text-12xl font-mono font-bold tracking-tight text-orange-950 sm:text-1xl ">
          Your ultimate goal is to be the first to destroy all the ships of your
          enemy in order to conquer their fleet and win the battle. Choose your
          fleet and attack strategy wisely, because your opponent has the same
          mission as you!
        </h1>
      </div>
      <button
        className="mx-2 bg-gradient-to-r from-orange-700 to-orange-800 rounded mt-2 mb-2 p-1 px-6 py-2 text-sm font-bold text-orange-950 shadow-sm sm:text-1xl border-2 border-orange-950"
        onClick={handleClickOut}
      >
        Close
      </button>
    </main>
  );
}
export default Instruction;
