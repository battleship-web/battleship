import BrightnessButton from "../../darkmode/BrightnessButton";
function OpponentQuitPage({ handleOkay }) {
  return (
    <main className="grid w-screen min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8 bg-cover"
        style={{
          backgroundImage: "url('/src/assets/bluebkg.jpg')",
          backgroundSize: "100% 100%",}}>
      <div className="text-center py-10 px-10"
        style={{
          backgroundImage: "url('/src/assets/scroll.png')",
          backgroundSize: "100% 100%",}}>
        <h1 className="font-bold text-orange-950 text-lg">
          Your opponent quit!
        </h1>
        <button
          className="rounded-md bg-gradient-to-r from-orange-700 to-orange-800 px-2 py-2 text-sm font-bold text-orange-950 shadow-sm sm:text-1xl border-2 border-orange-950 hover:bg-orange-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-950 mt-4"
          onClick={handleOkay}
        >
          Okay
        </button>
      </div>
      <div className="text-right" style={{ position: "absolute", bottom: "0", right: "0" }}>
            <BrightnessButton />
          </div>
    </main>
  );
}
export default OpponentQuitPage;