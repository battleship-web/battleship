function Score({handleClickInstruction, user, setGameStage, anaBoard}) {
    return (
        <main className="text-center">
            <div className="mb-6 relative isolate overflow-hidden bg-[url(https://thumbs.dreamstime.com/b/iron-background-threadbare-rusty-steel-covering-rivet-44688853.jpg)] px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-4 lg:px-56 lg:pt-0">
                <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-middle">
                    <div className="  place-items-center  lg:text-middle"></div>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-3xl">BATTLESHIP </h1>
                    <p className="mt-1 text-base leading-7 text-white font-bold">Timer</p>
                    <div className="gap-x-6 mx-3 mt-3 inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                    NICKNAME
                    </div>
                    <span className="inline-flex ml-3 mr-4 items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                    POINT X
                    </span>
                    <span className="inline-flex ml-4 mr-3 items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                    {user.nickname}
                    </span>
                    <span className="inline-flex  items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    POINT X
                    </span>
                    <br />
                    <br />
                    <br />
                    <element class="square" >
                    </element>
                <div className="mt-6 relative isolate overflow-hidden bg-white px-8 py-16 sm:rounded-3xl">
                    {anaBoard}
                </div>
                </div>
            </div>
            <a
            href="#"
            className="mt-6 rounded-md bg-gradient-to-r from-blue-600 to-sky-500 px-2 py-2 text-sm font-bold text-white shadow-sm sm:text-1xl hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border-2 border-gray-400"
            >
            Instruction
            <button onClick={handleClickInstruction}></button>
            </a>
        </main>
    );
  }
  export default Score;