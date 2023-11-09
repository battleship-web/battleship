import { PropTypes } from "prop-types";

function InviteRefused({ handleBack }) {
  return (
    <div className="absolute bg-[length:100%_100%] dark:bg-[url('/src/assets/darkscroll.png')] bg-[url('/src/assets/scroll.png')] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-opacity-50 flex justify-center items-center ">
      <h1 className="mb-8 text-12xl font-mono font-bold tracking-tight text-red-800 p-1 px-20 py-20 sm:text-4xl animate-pulse ">
        Refused
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
export default InviteRefused;

InviteRefused.propTypes = {
  handleBack: PropTypes.func.isRequired,
};
