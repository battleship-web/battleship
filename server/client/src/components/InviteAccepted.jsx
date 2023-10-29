import { PropTypes } from "prop-types";


function InviteAccepted({ handleBattle }) {
  return (
    <div className="absolute bg-cover top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-opacity-50 flex justify-center items-center "
        style={{
          backgroundImage: "url('/scroll.png')",
          backgroundSize: "100% 100%",}}>
      <h1 className="mb-8 text-12xl font-mono font-bold tracking-tight text-lime-900 p-1 px-20 py-20 sm:text-4xl animate-pulse ">
        Accepted
      </h1>
      <button
        className="absolute bg-gradient-to-r from-orange-700 to-orange-800 rounded mt-20  p-1 px-6 py-2 text-sm font-bold text-orange-950 shadow-sm sm:text-1xl border-2 border-orange-950"
        onClick={handleBattle}
      >
        Let's battle!
      </button>
    </div>
  );
}
export default InviteAccepted;


InviteAccepted.propTypes = {
  handleBattle: PropTypes.func.isRequired,
};
