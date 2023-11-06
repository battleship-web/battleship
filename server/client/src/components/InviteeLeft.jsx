import { PropTypes } from "prop-types";

function InviteeLeft({ handleBack }) {
  return (
    <div className="absolute bg-[length:100%_100%] bg-[url('/src/assets/scroll.png')] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-opacity-50 flex justify-center items-center ">
      <h1 className="mb-8 text-12xl font-mono font-bold tracking-tight text-blue-950 p-1 px-10 py-20 sm:text-4xl animate-pulse ">
        Enemy Escaped...
      </h1>
      <button
        className="absolute bg-gradient-to-r from-orange-700 to-orange-800 rounded mt-20  p-1 px-6 py-2 text-sm font-bold text-orange-950 shadow-sm sm:text-1xl border-2 border-orange-950"
        onClick={handleBack}
      >
        Choose your new opponent!
      </button>
    </div>
  );
}
export default InviteeLeft;

InviteeLeft.propTypes = {
  handleBack: PropTypes.func.isRequired,
};
