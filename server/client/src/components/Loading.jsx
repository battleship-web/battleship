function Loading({ size = 150 }) {
  return (
    <div className="absolute w-screen h-screen top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-500 opacity-80 flex justify-center items-center">
      <div
        style={{ width: `${size}px`, height: `${size}px` }}
        className="animate-spin "
      >
        <div
          className="h-full w-full border-8 border-t-purple-500
       border-b-purple-700 rounded-[50%]"
        ></div>
      </div>
    </div>
  );
}
export default Loading;
