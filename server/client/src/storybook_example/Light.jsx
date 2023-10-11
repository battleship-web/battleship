import PropTypes from "prop-types";
import classNames from "classnames";
function Light({ variant = "green" }) {
  let lightClass = classNames("w-8 h-8 p-4 rounded-full", {
    "bg-red-600": variant === "red",
    "bg-yellow-400": variant === "yellow",
    "bg-green-600": variant === "green",
    "bg-blue-600": variant === "blue",
  });
  return <div className={lightClass}></div>;
}

Light.propTypes = {
  variant: PropTypes.string,
};

export default Light;
