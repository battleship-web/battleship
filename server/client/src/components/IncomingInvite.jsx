import { PropTypes } from "prop-types";

function IncomingInvite({
  acceptInvitation,
  refuseInvitation,
  opponentNickname,
  opponentUsername,
}) {
  return (
    <div className="absolute w-300 h-60 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-5 bg-[url(https://thumbs.dreamstime.com/b/iron-background-threadbare-rusty-steel-covering-rivet-44688853.jpg)] bg-opacity-50 shadow-2xl sm:rounded-3xl border-2 border-slate-400 flex justify-center items-center ">
      <h1 className="mb-12 text-12xl font-mono font-bold tracking-tight text-orange-500 sm:text-4xl animate-pulse ">
        !!!Enemy Approaching!!!
        <h2 className="text-base">
          {`${opponentNickname} (${opponentUsername}) is challenging you!`}
        </h2>
      </h1>
      <button
        className="mr-20 absolute bg-gradient-to-r from-green-500 to-green-600 rounded mt-20  p-1 px-3 py-2 text-sm font-bold text-white shadow-sm sm:text-1xl border-2 border-slate-400"
        onClick={acceptInvitation}
      >
        Accept
      </button>
      <button
        className="ml-20 absolute bg-gradient-to-r from-red-500 to-red-600 rounded mt-20  p-1 px-3 py-2 text-sm font-bold text-white shadow-sm sm:text-1xl border-2 border-slate-400"
        onClick={refuseInvitation}
      >
        Refuse
      </button>
    </div>
  );
}
export default IncomingInvite;

IncomingInvite.propTypes = {
  acceptInvitation: PropTypes.func.isRequired,
  refuseInvitation: PropTypes.func.isRequired,
};
