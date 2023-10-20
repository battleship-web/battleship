import PropTypes from "prop-types";

export default function TitlePage({ setGameStage }) {
  return (
    <>
        <main className="grid min-h-full place-items-center bg-[url(https://wallpapercave.com/wp/wp2874399.jpg)] px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <div className="text-center bg-[url(https://thumbs.dreamstime.com/b/iron-background-threadbare-rusty-steel-covering-rivet-44688853.jpg)] bg-opacity-50 px-10 py-4 shadow-2xl sm:rounded-3xl border-2 border-slate-400">
                <h1 className="mt-4 text-12xl font-mono font-bold tracking-tight bg-gradient-to-r from-red-600 via-orange-500 to-red-500 inline-block text-transparent bg-clip-text sm:text-6xl ">Battleship</h1>
                <p className="mt-2 text-3x1 font-semibold leading-7 text-gray-300 sm:text-2xl">legacy of "Warship"</p>
            </div>
                <div className="mt-5 flex items-center justify-center gap-x-6">
                  <a href="#" className="rounded-md bg-gradient-to-r from-blue-600 to-sky-500 px-12 py-2.5 text-sm font-bold text-white shadow-sm sm:text-2xl hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    <button onClick={() => setGameStage("menu:login")}>Begin</button>
                  </a>
                </div>
          </div>
        </main>
    </>
  )
}


TitlePage.propTypes = {
  setGameStage: PropTypes.func,
};
