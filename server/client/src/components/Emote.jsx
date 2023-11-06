function Emote({ emote }) {
  const emoteSrc = `/src/assets/${emote}-nobkg.png`;
  return <img src={emoteSrc} alt="Emote" className="w-12 h-12" />;
}
export default Emote;
