function WelcomePage({ user, setGameStage }) {
  const onhandleClick = () => {
    setGameStage("menu:lobby");
  };
  return (
    <main className="grid h-screen place-items-center bg-[url(https://images.theconversation.com/files/162016/original/image-20170322-31176-2q8pz6.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip)] px-6 py-24 sm:py-32 lg:px-8 bg-cover">
      <div className="text-center">
        <div className="text-center bg-[url(https://thumbs.dreamstime.com/b/iron-background-threadbare-rusty-steel-covering-rivet-44688853.jpg)] bg-opacity-50 px-10 py-2 shadow-2xl sm:rounded-3xl border-2 border-slate-400">
          <h1 className="text-12xl font-mono font-bold tracking-tight text-gray-100 sm:text-2xl ">{`Welcome General ${user.nickname} (${user.username})`}</h1>
        </div>
        <div className="text-center bg-[url(https://thumbs.dreamstime.com/b/iron-background-threadbare-rusty-steel-covering-rivet-44688853.jpg)] bg-opacity-50 px-10 py-2 shadow-2xl sm:rounded-3xl border-2 border-slate-400">
          <h1 className="text-12xl font-mono font-bold tracking-tight text-gray-100 sm:text-1xl ">
            ⛴ In the beginning, before humance race was born, before dinosaur
            has extinct, there are only violence. Every single of livingthing
            tried to adapt, survive, and most importance is killing each other.
            Therefore, in every single era, there are war. war to survive, war
            to conqure food, war for mating. Every reason can cause a war.
            Nowadays people have law and rule to minimise conflix between each
            other. However the thrist of war isn&apos;t ga anywhere, it still
            inside of every single human. Since one man name Dr.Necern have
            found gunium particle. The technology of warship is forever changed,
            and the war begun every where. Just to conqure even one more grain
            of sand. And now there are several individuals try to conqure your
            island. But it not that easy because this island have a war ship
            too!!!. Use it general!! Protect this island!!! Conqure the
            world!!!! ⛴
          </h1>
        </div>
        <button
          className="mx-2 bg-gradient-to-r from-sky-500 to-blue-600 rounded mt-2 mb-2 p-1 px-6 py-2 text-sm font-bold text-white shadow-sm sm:text-1xl border-2 border-slate-400"
          onClick={onhandleClick}
        >
          Next
        </button>
      </div>
    </main>
  );
}
export default WelcomePage;
