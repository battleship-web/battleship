import PropTypes from "prop-types";
import blankImage from "./blank.png";
import selectedImage from "./selected.png";
import missImage from "./miss.png";
import hitImage from "./hit.png";
import ship1Image from "./ship1.png";
import ship2Image from "./ship2.png";
import ship3Image from "./ship3.png";
import ship4Image from "./ship4.png";
import ship1rImage from "./ship1r.png";
import ship2rImage from "./ship2r.png";
import ship3rImage from "./ship3r.png";
import ship4rImage from "./ship4r.png";

const Square = ({ state, onClick, size }) => {
  let wh = null;
  if (size === "big") {
    wh = "w-14 h-14";
  } else {
    wh = "w-9 h-9";
  }
  let image = null;
  if (state === "blank") {
    image = blankImage;
  } else if (state === "selected") {
    image = selectedImage;
  } else if (state === "miss") {
    image = missImage;
  } else if (state === "hit") {
    image = hitImage;
  } else if (state === "ship1") {
    image = ship1Image;
  } else if (state === "ship2") {
    image = ship2Image;
  } else if (state === "ship3") {
    image = ship3Image;
  } else if (state === "ship4") {
    image = ship4Image;
  } else if (state === "ship1r") {
    image = ship1rImage;
  } else if (state === "ship2r") {
    image = ship2rImage;
  } else if (state === "ship3r") {
    image = ship3rImage;
  } else if (state === "ship4r") {
    image = ship4rImage;
  }
  return (
    <img
      src={image}
      className={`${wh} border-2 border-orange-950`}
      onClick={onClick}
    />
  );
};

Square.propTypes = {
  state: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Square;
