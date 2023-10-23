
export default function winPage({ setGameStage }) {
  return (
    <main className="grid min-h-full place-items-center bg-[url(https://images.theconversation.com/files/162016/original/image-20170322-31176-2q8pz6.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip)] px-6 py-24 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-[url(https://thumbs.dreamstime.com/b/iron-background-threadbare-rusty-steel-covering-rivet-44688853.jpg)] bg-opacity-50 py-2 border-2 border-slate-400 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-4 lg:px-56 lg:pt-0">
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-middle">
            <span className=" bg-white-300 inline-flex items-center text-5xl font-bold  place-items-center layout:center text- center rounded-md bg-gray-50 mx-50 px-20 py-10 text-300  text-gray-600 ring-1 ring-inset ring-gray-500/10">
              YOU WIN !
            </span>
            <div className="  place-items-center  lg:text-middle"></div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-3xl">Congratulations </h1>
            <p className="mt-6 text-base leading-7 text-white">You are supercool among all of the player.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                ← Go back home
                <button onClick={() => setGameStage("menu:lobby")}></button>
              </a>
              <a href="#" className=" rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white">
                start over <span aria-hidden="true">&rarr;</span>
                <button onClick={() => setGameStage("game:prep")}></button>
              </a>        
            </div>
          </div>
        </div>
    </main>
);
}
