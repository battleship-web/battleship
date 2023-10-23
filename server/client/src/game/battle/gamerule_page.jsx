export default function gamerule_page() {
  return (
    <main className="grid min-h-full place-items-center bg-[url(https://t3.ftcdn.net/jpg/04/43/69/32/360_F_443693248_FFOUon01HIYUVLVPFIyhrzDlbmWN8XKq.jpg)] px-6 py-24 sm:py-32 lg:px-8">
    
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
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
                <div className=" text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Game Rule
                        <br />
                        "Instruction"
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        insert game rule there, the score and the point should be link in other page,also the nickname
                        <br />
                        rule1
                        <br />
                        rule2
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                        <a
                            href="#"
                            className="rounded-md bg-blue-400 px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            ←  <span aria-hidden="true">Back</span>
                        </a>
                        <a href="#" className="rounded-md bg-blue-400 px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                            Next <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
                <div className="relative mt-10 h-70 lg:mt-8">
                    <img
                        className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                        src="https://www.battlesheep.com/home/images/arthumbs/arthumb_0.png"
                        alt="App screenshot"
                        width={2000}
                        height={2000} />
                </div>
            </div>
        </div>
 </main>
);
}
