import { PropTypes } from "prop-types";

function Loading({ size = 150, text = "" }) {
  return (
    <div className="absolute w-screen h-screen top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-500 bg-opacity-50">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[url(https://thumbs.dreamstime.com/b/iron-background-threadbare-rusty-steel-covering-rivet-44688853.jpg)] bg-opacity-50 shadow-2xl sm:rounded-3xl border-2 border-slate-400 flex  flex-col justify-center items-center p-12">
        <div
          style={{ width: `${size}px`, height: `${size}px` }}
          className="animate-spin"
        >
          <div className="h-full w-full border-8 border-t-blue-500 border-b-blue-500 rounded-[50%] text-12xl font-mono font-bold tracking-tight text-gray-100 sm:text-3xl"></div>
        </div>
        {text ? (
          <h1 className="text-lg mt-3 p-1 text-slate-700 bg-slate-200 rounded">
            {text}
          </h1>
        ) : null}
      </div>
    </div>
  );
}
export default Loading;

Loading.propTypes = {
  size: PropTypes.number,
};
