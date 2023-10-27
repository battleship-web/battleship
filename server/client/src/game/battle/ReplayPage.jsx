function ReplayPage({ text, handleOkay }) {
  return (
    <main className="grid w-screen min-h-screen place-items-center bg-[url(https://images.theconversation.com/files/162016/original/image-20170322-31176-2q8pz6.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip)] px-6 py-24 sm:py-32 lg:px-8 bg-cover">
      <div className="text-center bg-[url(https://thumbs.dreamstime.com/b/iron-background-threadbare-rusty-steel-covering-rivet-44688853.jpg)] py-10 px-10 border-2 border-slate-400 shadow-2xl sm:rounded-3xl">
        <h1 className="font-bold text-slate-300 text-lg">{text}</h1>
        <button
          className="rounded-md bg-gradient-to-r from-blue-600 to-sky-500 px-2 py-2 text-sm font-bold text-white shadow-sm sm:text-1xl hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4"
          onClick={handleOkay}
        >
          Okay
        </button>
      </div>
    </main>
  );
}
export default ReplayPage;
