import { PropTypes } from "prop-types";


function Loading({ size = 150 }) {
  return (
    <div className="absolute bg-cover top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-opacity-50 flex justify-center items-center "
        style={{
          backgroundImage: "url('/scroll.png')",
          backgroundSize: "100% 100%",}}>
        <div className="animate-pulse px-20 py-20"><div className="mr-2 w-5 h-5 border-8 px-20 py-20 border-t-blue-950 border-b-blue-950 border-r-blue-500 border-l-blue-500 rounded-[50%] animate-spin "></div></div>
      </div>
  );
}
export default Loading;


Loading.propTypes = {
  size: PropTypes.number,
};
