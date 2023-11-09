import { useState, useEffect } from "react";

export const useAudio = (urls) => {
  const [sources] = useState(
    urls.map((url) => {
      const audio = new Audio(url);
      audio.loop = true;
      return {
        url: url,
        audio: audio,
      };
    })
  );

  const [playing, setPlaying] = useState(
    urls.map((url) => {
      return {
        url: url,
        playing: false,
      };
    })
  );

  const toggle = (targetIndex) => {
    const newPlaying = [...playing];
    const currentIndex = playing.findIndex((p) => p.playing === true);
    if (currentIndex !== -1) {
      newPlaying[currentIndex].playing = false;
    } else {
      newPlaying[targetIndex].playing = true;
    }
    setPlaying(newPlaying);
  };

  const changeMusic = (targetIndex) => {
    const newPlaying = [...playing];
    const currentIndex = playing.findIndex((p) => p.playing === true);
    if (currentIndex === -1 || currentIndex === targetIndex) {
      return;
    }
    newPlaying[currentIndex].playing = false;
    newPlaying[targetIndex].playing = true;
    setPlaying(newPlaying);
  };

  useEffect(() => {
    sources.forEach((source, i) => {
      playing[i].playing ? source.audio.play() : source.audio.pause();
    });
  }, [sources, playing]);

  const soundOn =
    playing.findIndex((p) => p.playing === true) !== -1 ? true : false;

  return [soundOn, toggle, changeMusic];
};
