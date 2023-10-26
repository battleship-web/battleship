export default function WinPage({ setGameStage }) {
  return (
    <main className="grid min-h-full place-items-center bg-[url(https://images.theconversation.com/files/162016/original/image-20170322-31176-2q8pz6.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip)] px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center bg-[url(https://thumbs.dreamstime.com/b/iron-background-threadbare-rusty-steel-covering-rivet-44688853.jpg)] py-10 px-10 border-2 border-slate-400 shadow-2xl sm:rounded-3xl">
        <span className="mt-2 text-12xl font-mono font-bold tracking-tight bg-gradient-to-r from-green-600 via-green-500 to-green-400 animate-pulse inline-block text-transparent bg-clip-text sm:text-7xl ">
          VICTORY!
        </span>
        <div className="  place-items-center  lg:text-middle"></div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight bg-gradient-to-r from-red-200 via-green-200 to-indigo-200 inline-block text-transparent bg-clip-text sm:text-3xl">
          Congratulations{" "}
        </h1>
        <p className="mt-3 text-base leading-7 text-white font-bold">
          You are supercool among all of the player.
        </p>
        <div className="mt-7 flex items-center justify-center gap-x-6">
          <button
            className="rounded-md bg-gradient-to-r from-blue-600 to-sky-500 px-2 py-2 text-sm font-bold text-white shadow-sm sm:text-1xl hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => setGameStage("menu:lobby")}
          >
            ← Go back home
          </button>

          <button
            className="rounded-md bg-gradient-to-r from-blue-600 to-sky-500 px-2 py-2 text-sm font-bold text-white shadow-sm sm:text-1xl hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => setGameStage("game:prep")}
          >
            start over <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </main>
  );
}
