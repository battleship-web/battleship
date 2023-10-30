function Instruction(handleClickOut) {
    return (
        <main className="text-center">
        <div className="text-center bg-opacity-50 px-10 py-3 "
        style={{
          backgroundImage: "url('/src/assets/wood.png')",
          backgroundSize: "100% 100%",}}>
            <h1 className="text-12xl font-mono font-bold tracking-tight text-orange-950 sm:text-2xl ">Instructions</h1>
          </div>
          <div className="text-center bg-opacity-50 px-10 py-10 "
        style={{
          backgroundImage: "url('/src/assets/scroll.png')",
          backgroundSize: "100% 100%",}}>
            <h1 className="text-12xl font-mono font-bold tracking-tight text-orange-950 sm:text-1xl ">
              ⛴ 1) ⛴
            </h1>
            <h1 className="text-12xl font-mono font-bold tracking-tight text-orange-950 sm:text-1xl ">
              ⛴ 2) ⛴
            </h1>
            <h1 className="text-12xl font-mono font-bold tracking-tight text-orange-950 sm:text-1xl ">
              ⛴ 3) ⛴
            </h1>
            <h1 className="text-12xl font-mono font-bold tracking-tight text-orange-950 sm:text-1xl ">
              ⛴ 4) ⛴
            </h1>
            <h1 className="text-12xl font-mono font-bold tracking-tight text-orange-950 sm:text-1xl ">
              ⛴ 5) ⛴
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