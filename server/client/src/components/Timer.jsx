import { useState, useEffect } from "react";
function Timer({ startSeconds, onZero, fired }) {
  const [secondsLeft, setSecondsLeft] = useState(startSeconds);

  useEffect(() => {
    if (secondsLeft === 0) {
      onZero();
      return;
    }
    if (fired) {
      return;
    }
    setTimeout(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);
  }, [secondsLeft, onZero, fired]);
  return (
    <div className="mt-2 text-base leading-7 text-blue-950 font-bold bg-orange-700 rounded-md sm:text-2xl">
      {fired ? "Fired" : secondsLeft}
    </div>
  );
}
export default Timer;
