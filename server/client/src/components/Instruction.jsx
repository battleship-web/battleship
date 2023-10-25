function Instruction(handleClickOut) {
    return (
        <main className="text-center">
        <div className="text-center bg-[url(https://thumbs.dreamstime.com/b/iron-background-threadbare-rusty-steel-covering-rivet-44688853.jpg)] bg-opacity-50 px-10 py-2 shadow-2xl sm:rounded-3xl border-2 border-slate-400">
            <h1 className="text-12xl font-mono font-bold tracking-tight text-gray-100 sm:text-2xl ">Instruction</h1>
          </div>
          <div className="text-center bg-[url(https://thumbs.dreamstime.com/b/iron-background-threadbare-rusty-steel-covering-rivet-44688853.jpg)] bg-opacity-50 px-10 py-2 shadow-2xl sm:rounded-3xl border-2 border-slate-400">
            <h1 className="text-12xl font-mono font-bold tracking-tight text-gray-100 sm:text-1xl ">
              ⛴ 1) ⛴
            </h1>
            <h1 className="text-12xl font-mono font-bold tracking-tight text-gray-100 sm:text-1xl ">
              ⛴ 2) ⛴
            </h1>
            <h1 className="text-12xl font-mono font-bold tracking-tight text-gray-100 sm:text-1xl ">
              ⛴ 3) ⛴
            </h1>
            <h1 className="text-12xl font-mono font-bold tracking-tight text-gray-100 sm:text-1xl ">
              ⛴ 4) ⛴
            </h1>
            <h1 className="text-12xl font-mono font-bold tracking-tight text-gray-100 sm:text-1xl ">
              ⛴ 5) ⛴
            </h1>
          </div>
          <button
            className="mx-2 bg-gradient-to-r from-sky-500 to-blue-600 rounded mt-2 mb-2 p-1 px-6 py-2 text-sm font-bold text-white shadow-sm sm:text-1xl border-2 border-slate-400"
            onClick={handleClickOut}
          >
            Close
          </button>
        </main>
    );
  }
  export default Instruction;