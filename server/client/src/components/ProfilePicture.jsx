function ProfilePicture({ picture, size }) {
  const pictureSrc = `/src/assets/${picture}.png`;
  return (
    <img
      src={pictureSrc}
      alt="Profile Picture"
      className={`rounded-lg ${size === "big" ? "w-16 h-16" : "w-8 h-8"}`}
    />
  );
}
export default ProfilePicture;
