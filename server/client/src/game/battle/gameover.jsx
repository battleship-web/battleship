
export default function gameover() {
  return (
    <main className="grid min-h-full place-items-center bg-[url(https://t3.ftcdn.net/jpg/04/43/69/32/360_F_443693248_FFOUon01HIYUVLVPFIyhrzDlbmWN8XKq.jpg)] px-6 py-24 sm:py-32 lg:px-8">

    
        <paramiter : centered></paramiter : centered>
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="relative isolate overflow-hidden bg-red-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-4 lg:px-56 lg:pt-0">
                <paramiter : centered></paramiter : centered>
                <svg
                    viewBox="0 0 1024 1024"
                    className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                    aria-hidden="true"
                    
                >
                    <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
                    <defs>
                        <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                            <stop stopColor="#7775D6" />
                            <stop offset={1} stopColor="#E935C1" />
                        </radialGradient>
                    </defs>
                </svg>
                <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-middle">
                <paramiter : centered></paramiter : centered>
          <span className="inline-flex items-center text-5xl place-items-center layout:center text- center rounded-md bg-gray-50 mx-50 px-20 py-10 text-300 font-medium  text-gray-600 ring-1 ring-inset ring-gray-500/10">
          <paramiter : centered></paramiter : centered>
            YOU LOSE
          </span>
          
            <div className="  place-items-center  lg:text-middle"></div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-3xl">better luck next time XP </h1>
          <p className="mt-6 text-base leading-7 text-white">You almost win the game!, keep it up.</p>
                        
                   
                    <br></br>
                    <br></br>
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
        </div>
    
</main>
);
}

