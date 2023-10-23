import { PropTypes } from "prop-types";

function InviteRefused({ handleBack }) {
  return (
    <div className="absolute w-200 h-60 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-20 py-5 bg-[url(https://thumbs.dreamstime.com/b/iron-background-threadbare-rusty-steel-covering-rivet-44688853.jpg)] bg-opacity-50 shadow-2xl sm:rounded-3xl border-2 border-slate-400 flex justify-center items-center ">
      <h1 className="mb-8 text-12xl font-mono font-bold tracking-tight text-red-500 sm:text-4xl animate-pulse ">
        Refused
      </h1>
      <button
        className="absolute bg-gradient-to-r from-sky-500 to-blue-600 rounded mt-20  p-1 px-6 py-2 text-sm font-bold text-white shadow-sm sm:text-1xl border-2 border-slate-400"
        onClick={handleBack}
      >
        choose your new opponent
      </button>
    </div>
  );
}
export default InviteRefused;

InviteRefused.propTypes = {
  handleBack: PropTypes.func.isRequired,
};
