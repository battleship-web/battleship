import React, { useState } from "react";

const BrightnessButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleBrightness = () => {
    const elements = document.querySelectorAll("*");
    elements.forEach((element) => {
      element.style.filter = isDarkMode ? "brightness(100%)" : "brightness(90%)";
    });
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      className="border-2 text-bold border-gray-300 bg-gray-700 text-gray-300 px-4 py-2 rounded"
      onClick={toggleBrightness}
    >
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default BrightnessButton;

