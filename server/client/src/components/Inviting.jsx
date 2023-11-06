function Inviting() {
  return (
    <div className="absolute bg-[length:100%_100%] bg-[url('/src/assets/scroll.png')] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-opacity-50 flex justify-center items-center ">
      <div className="animate-pulse pl-20">
        <div className="mr-2 w-5 h-5 border-8 border-t-orange-600 border-b-orange-600 border-r-yellow-500 border-l-yellow-500 rounded-[50%] animate-spin "></div>
      </div>
      <h1 className="text-12xl font-mono font-bold text-blue-950 p-1 pl-10 pr-20 py-40 sm:text-3xl animate-pulse">
        War Declaration...
      </h1>
    </div>
  );
}
export default Inviting;
