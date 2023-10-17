function WelcomePage({ user, setGameStage }) {
  const onhandleClick = () => {
    setGameStage("menu:lobby");
  };
  return (
    <div>
      <h1>{`Welcome ${user.nickname} (${user.username})`}</h1>
      <button
        className="bg-slate-300 border-2 border-slate-600"
        onClick={onhandleClick}
      >
        Next
      </button>
    </div>
  );
}
export default WelcomePage;
