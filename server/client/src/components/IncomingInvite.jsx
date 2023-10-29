import { PropTypes } from "prop-types";


function IncomingInvite({ acceptInvitation, refuseInvitation }) {
  return (
    <div className="absolute bg-cover top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-opacity-50 flex justify-center items-center "
        style={{
          backgroundImage: "url('/scroll.png')",
          backgroundSize: "100% 100%",}}>
      <h1 className="mb-8 text-12xl font-mono font-bold tracking-tight text-orange-950 p-1 px-20 py-20 sm:text-4xl animate-pulse ">
        Enemy Approaching! 
      </h1>
      <button
        className="mr-20 absolute bg-gradient-to-r from-green-500 to-green-600 rounded mt-20  p-1 px-3 py-2 text-sm font-bold text-lime-900 shadow-sm sm:text-1xl border-2 border-lime-900"
        onClick={acceptInvitation}
      >
        Accept
      </button>
      <button
        className="ml-20 absolute bg-gradient-to-r from-red-500 to-red-600 rounded mt-20  p-1 px-3 py-2 text-sm font-bold text-red-900 shadow-sm sm:text-1xl border-2 border-red-900"
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
