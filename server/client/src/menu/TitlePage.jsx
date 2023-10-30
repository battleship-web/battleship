import PropTypes from "prop-types";

export default function TitlePage({ setGameStage }) {
  return (
    <>
      <main className="grid h-screen w-screen place-items-center  px-6 py-24 sm:py-32 lg:px-8 bg-cover"
        style={{
          backgroundImage: "url('/src/assets/bluebkg.jpg')",
          backgroundSize: "100% 100%",}}>
        <div className="text-center">
        <div className="text-center bg-cover bg-opacity-50 px-40 py-40 items-center "
        style={{
          backgroundImage: "url('/src/assets/scroll.png')",
          backgroundSize: "100% 100%",}}>
            <h1 className="mt-4 text-12xl font-mono font-bold tracking-tight bg-gradient-to-r from-orange-950 via-orange-700 to-orange-950 inline-block text-transparent bg-clip-text sm:text-6xl ">
              Battleship
            </h1>
            <p className="mt-2 text-3x1 font-semibold leading-7 text-blue-800 sm:text-2xl ">
              legacy of &quot;Warship&quot;
            </p>
          </div>
          <div className="mt-5 flex items-center justify-center gap-x-6 ">
            <button
              className="rounded-md bg-gradient-to-r from-orange-800 to-orange-700 px-12 py-2.5 text-sm font-bold border-2 border-orange-950 text-orange-950 shadow-sm sm:text-2xl hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-950"
              onClick={() => setGameStage("menu:login")}
            >
              Begin
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

TitlePage.propTypes = {
  setGameStage: PropTypes.func,
};
