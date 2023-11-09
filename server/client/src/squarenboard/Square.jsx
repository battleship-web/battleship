import PropTypes from "prop-types";
import blankImage from "./blank.png";
import selectedImage from "./selected.png";
import missImage from "./miss.png";
import hitImage from "./hit.png";
import lightHitImage from "./lighthit.png";
import lightMissImage from "./lightmiss.png";
import ship1Image from "./ship1.png";
import ship2Image from "./ship2.png";
import ship3Image from "./ship3.png";
import ship4Image from "./ship4.png";
import ship1rImage from "./ship1r.png";
import ship2rImage from "./ship2r.png";
import ship3rImage from "./ship3r.png";
import ship4rImage from "./ship4r.png";
import shipbig1Image from "./shipbig1.png";
import shipbig2Image from "./shipbig2.png";
import shipbig3Image from "./shipbig3.png";
import shipbig4Image from "./shipbig4.png";
import shipbig5Image from "./shipbig5.png";
import shipbig1rImage from "./shipbig1r.png";
import shipbig2rImage from "./shipbig2r.png";
import shipbig3rImage from "./shipbig3r.png";
import shipbig4rImage from "./shipbig4r.png";
import shipbig5rImage from "./shipbig5r.png";
import shipsmall1Image from "./shipsmall1.png";
import shipsmall2Image from "./shipsmall2.png";
import shipsmall3Image from "./shipsmall3.png";
import shipsmall1rImage from "./shipsmall1r.png";
import shipsmall2rImage from "./shipsmall2r.png";
import shipsmall3rImage from "./shipsmall3r.png";

const Square = ({ state, onClick, size }) => {
  let wh = null;
  if (size === "big") {
    wh = "w-14 h-14";
  } else {
    wh = "w-12 h-12";
  }
  let image = null;
  switch (state) {
    case "blank":
      image = blankImage;
      break;
    case "selected":
      image = selectedImage;
      break;
    case "miss":
      image = missImage;
      break;
    case "hit":
      image = hitImage;
      break;
    case "lightningHit":
      image = lightHitImage;
      break;
    case "lightningMiss":
      image = lightMissImage;
      break;
    case "ship1":
      image = ship1Image;
      break;
    case "ship2":
      image = ship2Image;
      break;
    case "ship3":
      image = ship3Image;
      break;
    case "ship4":
      image = ship4Image;
      break;
    case "ship1r":
      image = ship1rImage;
      break;
    case "ship2r":
      image = ship2rImage;
      break;
    case "ship3r":
      image = ship3rImage;
      break;
    case "ship4r":
      image = ship4rImage;
      break;
    case "shipBig1":
      image = shipbig1Image;
      break;
    case "shipBig2":
      image = shipbig2Image;
      break;
    case "shipBig3":
      image = shipbig3Image;
      break;
    case "shipBig4":
      image = shipbig4Image;
      break;
    case "shipBig5":
      image = shipbig5Image;
      break;
    case "shipBig1r":
      image = shipbig1rImage;
      break;
    case "shipBig2r":
      image = shipbig2rImage;
      break;
    case "shipBig3r":
      image = shipbig3rImage;
      break;
    case "shipBig4r":
      image = shipbig4rImage;
      break;
    case "shipBig5r":
      image = shipbig5rImage;
      break;
    case "shipSmall1":
      image = shipsmall1Image;
      break;
    case "shipSmall2":
      image = shipsmall2Image;
      break;
    case "shipSmall3":
      image = shipsmall3Image;
      break;
    case "shipSmall1r":
      image = shipsmall1rImage;
      break;
    case "shipSmall2r":
      image = shipsmall2rImage;
      break;
    case "shipSmall3r":
      image = shipsmall3rImage;
      break;
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
