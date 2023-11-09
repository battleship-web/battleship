function Emote({ emote }) {
  const emoteSrc = `/${emote}-nobkg.png`;
  return <img src={emoteSrc} alt="Emote" className="w-12 h-12" />;
}
export default Emote;
